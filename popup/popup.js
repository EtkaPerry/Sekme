// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');

    const showNotification = (message) => {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    };

    actionButton.addEventListener('click', () => {
        // Get the current tab
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const activeTab = tabs[0];
            const url = activeTab.url;
            const title = activeTab.title;

            // Get the existing custom bookmarks
            chrome.storage.local.get(['custom-bookmarks'], (result) => {
                let customBookmarks = result['custom-bookmarks'] || [];
                // Check for duplicates
                if (customBookmarks.some(bm => bm.url === url)) {
                    showNotification('Bookmark already exists.');
                    return;
                }

                // Add the new bookmark
                customBookmarks.push({url: url, title: title});
                // Save back to storage
                chrome.storage.local.set({'custom-bookmarks': customBookmarks}, () => {
                    showNotification('Bookmark added successfully!');
                    // Close the popup after adding (optional)
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                });
            });
        });
    });
});
