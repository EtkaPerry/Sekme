// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const notification = document.getElementById('notification');

    const showNotification = (message, duration = 3000) => {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    };

    actionButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || !tabs[0]) {
                showNotification('Unable to get current tab information');
                return;
            }

            const currentTab = tabs[0];
            const bookmark = {
                url: currentTab.url,
                title: currentTab.title || 'Untitled'
            };

            // Get existing custom bookmarks
            chrome.storage.local.get(['custom-bookmarks'], (result) => {
                let customBookmarks = result['custom-bookmarks'] || [];

                // Check if URL already exists
                if (customBookmarks.some(bm => bm.url === bookmark.url)) {
                    showNotification('This website is already bookmarked');
                    return;
                }

                // Check maximum limit (30 bookmarks)
                if (customBookmarks.length >= 30) {
                    showNotification('Maximum bookmark limit reached (30)');
                    return;
                }

                // Add new bookmark
                customBookmarks.push(bookmark);

                // Save updated bookmarks
                chrome.storage.local.set({ 'custom-bookmarks': customBookmarks }, () => {
                    if (chrome.runtime.lastError) {
                        showNotification('Error saving bookmark: ' + chrome.runtime.lastError.message);
                    } else {
                        showNotification('Bookmark added successfully!');
                        setTimeout(() => window.close(), 1500);
                    }
                });
            });
        });
    });
});
