chrome.history.onVisited.addListener((historyItem) => {
    chrome.storage.local.get(["recentlyUsed"], (result) => {
        let recentlyUsed = result.recentlyUsed || [];

        // Check if the item already exists
        const index = recentlyUsed.findIndex(item => item.url === historyItem.url);

        // Remove the old entry if it exists
        if (index > -1) {
            recentlyUsed.splice(index, 1);
        }

        // Add the new item to the front
        recentlyUsed.unshift({
            url: historyItem.url,
            title: historyItem.title || historyItem.url
        });

        // Limit the list to 5 items
        if (recentlyUsed.length > 5) {
            recentlyUsed.pop();
        }

        // Save the updated recently used list to chrome.storage
        chrome.storage.local.set({ recentlyUsed });
    });
});
