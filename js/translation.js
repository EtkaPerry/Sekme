// The 'translations' constant holds a collection of translations for various languages
const translations = {
    // Defines English ('en') as a language within the translations object
    en: {
        // Main Settings
        "settings": "Settings", // "Settings" label used in the main settings menu for general configuration options.
        "mainS": "Main", // "Main" section header within the settings to group primary settings.
        "menuWidth": "Main Width:", // Label for the slider that adjusts the width of the main application menu.
        "fixedItemWidth": "Fixed Item Width:", // Label for the toggle that enables or disables fixed widths for menu items.

        // Recently Used Websites Section
        "recentlyUsedWebsitesS": "Recently Used Websites", // Section title for managing recently accessed websites.
        "recentlyUsedWebsites": "Recently Used Websites", // Header text displayed above the list of recently used websites.
        "hideRecentlyUsedWebsites": "Hide Recently Used Websites:", // Toggle label to show or hide the recently used websites section.
        "maxRecentlyUsedWebsitesToShow": "Max Recently Used Websites to Show:", // Label for input specifying the maximum number of recently used websites to display.
        "noRecentWebsitesMessage": "If there is any link visited it will be seen here", // Message displayed when no recently used websites are available.

        // Bookmarks Settings
        "bookmarksSettings": "Bookmarks", // Section title for managing bookmarks within the settings.
        "hideBookmarks": "Hide Bookmarks:", // Toggle label to show or hide the bookmarks section.
        "maxBookmarksToShow": "Max Bookmarks to Show:", // Label for input specifying the maximum number of bookmarks to display.
        "yourBookmarks": "Your Bookmarks", // Header for the bookmarks list displayed to the user.

        // Custom Bookmarks
        "customBookmarksSettings": "Custom Bookmarks", // Section title for managing custom bookmarks.
        "hideCustomBookmarks": "Hide Custom Bookmarks:", // Toggle label to show or hide custom bookmarks.
        "maxCustomBookmarksToShow": "Max Custom Bookmarks to Show:", // Label for input specifying the maximum number of custom bookmarks to display.
        "addCustomBookmark": "Add Custom Bookmark", // Button text for adding a new custom bookmark.
        "yourCustomBookmarks": "Your Custom Bookmarks", // Header for the list of custom bookmarks.

        // Sections Management
        "rearrangeSections": "Rearrange Sections", // Label for the feature that allows users to reorder different sections within the application.

        // Theme Settings
        "themeSettings": "Theme Settings", // Section title for customizing the application's theme.
        "themeColor": "Theme Color:", // Label for the color picker used to select the application's primary theme color.
        "predefinedThemes": "Predefined Themes:", // Label above the set of predefined theme color options.

        // Clock Settings
        "clockSettings": "Clock Settings", // Section title for configuring the clock display within the application.
        "clockPosition": "Clock Position:", // Label for the dropdown menu that selects the clock's position on the screen.
        "noClock": "No Clock", // Option to hide the clock entirely.
        "replaceLogo": "Replace Logo", // Option to replace the application's logo with a clock.
        "topRight": "Top Right", // Option to position the clock at the top right corner.
        "topLeft": "Top Left", // Option to position the clock at the top left corner.
        "bottomRight": "Bottom Right", // Option to position the clock at the bottom right corner.
        "bottomLeft": "Bottom Left", // Option to position the clock at the bottom left corner.
        "timeFormat": "Time Format:", // Label for selecting between 24-hour and 12-hour time formats.
        "24Hour": "24-Hour", // Option for a 24-hour time format.
        "12Hour": "12-Hour", // Option for a 12-hour time format.
        "showSeconds": "Show Seconds:", // Toggle label to display or hide seconds in the clock.

        // Background Settings
        "backgroundImage": "Background Image", // Section title for customizing the application's background image.
        "noBackground": "No Background", // Radio option to remove any background image.
        "imageFromUnsplash": "Image from Unsplash", // Radio option to fetch a background image from Unsplash.
        "uploadFromLink": "Upload from Link", // Radio option to specify a background image via a URL link.
        "uploadImage": "Upload Image", // Radio option to upload a background image from local files.
        "photoBy": "Photo by", // Prefix for attributing the photographer when using an Unsplash image.
        "on": "on", // Connector word used in attribution (e.g., "Photo by X on Unsplash").
        "pin": "Pin", // Button text to pin the current background image, preventing automatic changes.
        "upload": "Upload", // Button text to upload a background image either via link or file.
        "dragImageHere": "Drag an image here or click to select", // Instruction text for uploading an image through drag-and-drop or file selection.
        "backgroundChangeSuccess": "Background has been changed successfully", // Notification displayed upon successfully changing the background image.
        "backgroundRemoveSuccess": "Background has been removed successfully", // Notification displayed upon successfully removing the background image.
        "unsplashLoadError": "Failed to load images from Unsplash", // Error message displayed if fetching images from Unsplash fails.

        // Custom CSS
        "customCSSSettings": "Custom CSS", // Section title for adding and managing custom CSS.
        "saveCustomCSS": "Save CSS", // Button text to save the entered custom CSS.
        "resetCustomCSS": "Reset CSS", // Button text to reset the custom CSS to default.
        "resetCssConfirm": "Are you sure you want to reset the custom CSS?", // Confirmation prompt before resetting custom CSS.
        "cssResetSuccess": "Custom CSS has been reset successfully", // Notification displayed upon successfully resetting custom CSS.
        "cssSaveSuccess": "Custom CSS has been saved successfully", // Notification displayed upon successfully saving custom CSS.

        // Export/Import Settings
        "exportImportSettings": "Export & Import Settings", // Section title for exporting and importing application settings.
        "exportSettings": "Export Settings", // Button text to export current settings to a file.
        "importSettings": "Import Settings", // Button text to import settings from a file.

        // Search Functionality
        "selectSearchEngineLabel": "Select Search Engine", // Label for the dropdown menu to select the preferred search engine.
        "searchPlaceholder": "Search...", // Placeholder text in the search input field.
        "search": "Search", // Text displayed on the search button.
        "openInNewTab": "Open in New Tab", // Checkbox label to open search results in a new browser tab.

        // Search Engine Options
        "google": "Google", // Option for Google as a search engine.
        "bing": "Bing", // Option for Bing as a search engine.
        "duckduckgo": "DuckDuckGo", // Option for DuckDuckGo as a search engine.
        "yahoo": "Yahoo", // Option for Yahoo as a search engine.
        "braveSearch": "Brave Search", // Option for Brave Search as a search engine.
        "qwant": "Qwant", // Option for Qwant as a search engine.
        "ecosia": "Ecosia", // Option for Ecosia as a search engine.
        "startpage": "Startpage", // Option for Startpage as a search engine.
        "baidu": "Baidu", // Option for Baidu as a search engine.
        "yandex": "Yandex", // Option for Yandex as a search engine.

        // Bookmark Modal
        "url": "URL:", // Label for the input field where users enter the bookmark's URL.
        "title": "Title:", // Label for the input field where users enter the bookmark's title.
        "bookmarkTip": "Tip: You can also access this feature from the extension menu in the top-right corner of your browser. If you don't see the extension, click the puzzle icon in the top-right corner and pin it for easy access.", // Helpful tip guiding users on how to access the bookmark feature through the browser extension.
        "saveBookmark": "Save Bookmark", // Button text to save the newly added bookmark.
        "cancel": "Cancel", // Button text to cancel the bookmark addition process.

        // More Section
        "more": "More", // Label for accessing additional options or settings.
        "upcomingupdates": "Upcoming Updates", // Heading for the section listing future updates or features.
        "back": "Back", // Label for a button that navigates back to the previous view or section.

        // Footer Elements
        "website": "Website", // Link label directing users to the developer's personal or official website.
        "licensedUnder": "Licensed under", // Text indicating the license under which the application is released.
        "version": "Version", // Label displaying the current version of the application.
        "copyrightNotice": "© 2024 Etka Inc.", // Copyright notice displaying the ownership of the application.

        // Reset Options
        "resetToDefault": "Reset to Default", // Button text to reset all settings to their default values.

        // Notification Messages
        "invalidUrl": "Invalid URL.", // Error message displayed when a user enters an invalid URL.
        "fillUrlAndTitle": "Please fill in both URL and Title.", // Prompt informing users to provide both URL and title when adding a bookmark.
        "bookmarkAdded": "Bookmark added successfully!", // Success message displayed after adding a bookmark.
        "bookmarkRemoved": "Bookmark removed successfully!", // Success message displayed after removing a bookmark.
        "bookmarkAlreadyExists": "Bookmark already exists.", // Warning message indicating the bookmark being added already exists.
        "maxCustomBookmarks": "Maximum number of custom bookmarks reached.", // Warning message when the user tries to add more custom bookmarks than allowed.
        "settingsExported": "Settings exported successfully!", // Confirmation message displayed after successfully exporting settings.
        "settingsImported": "Settings imported successfully!", // Confirmation message displayed after successfully importing settings.
        "settingsImportFailed": "Failed to import settings.", // Error message displayed if importing settings fails.
        "confirmImportSettings": "Are you sure you want to import settings? This will overwrite your current settings.", // Confirmation prompt before importing settings, warning about overwriting existing settings.
        "areYouSureReset": "Are you sure you want to reset all settings to default?", // Confirmation prompt before resetting all settings.
        "areYouSureRemoveBookmark": "Are you sure you want to remove this bookmark?", // Confirmation prompt before removing a bookmark.

        // Additional Notifications
        "recentlyUsedRemoved": "Recently used item removed successfully!", // Notification displayed after removing a recently used item.
        "customCssSaved": "Custom CSS saved successfully!", // Notification displayed after saving custom CSS.
        "customCssReset": "Custom CSS reset successfully!", // Notification displayed after resetting custom CSS.
        "areYouSureResetCustomCss": "Are you sure you want to reset custom CSS?", // Confirmation prompt before resetting custom CSS.
        "maxMenuWidth": "Maximum menu width is 5000px", // Validation message indicating the maximum allowed width for the menu.
        "minMenuWidth": "Minimum menu width is 500px", // Validation message indicating the minimum allowed width for the menu.
        "menuWidthUpdated": "Menu width updated successfully!", // Notification displayed after updating the menu width.
        "backgroundUnpinned": "Background unpinned successfully!", // Notification displayed after unpinning the background image.
        "backgroundPinned": "Background pinned successfully!", // Notification displayed after pinning the background image.
        "unpinBackground": "Unpin", // Button text to unpin the current background image.
        "enterImageUrl": "Please enter an image URL", // Prompt requesting the user to enter a valid image URL for the background.
        "imageUploadSuccess": "Image uploaded successfully!", // Notification displayed after successfully uploading a background image.
        "imageUploadFailed": "Failed to upload image!", // Error notification displayed if image upload fails.

        // Confirmation Messages
        "areYouSureRemoveRecentlyUsed": "Are you sure you want to remove this recently used item?", // Confirmation prompt before removing a recently used website.
        "removeRecentlyUsed": "Remove Recently Used Item", // Label for the action to remove a recently used website.
        "maxRecentlyUsedWebsites": "Maximum recently used items is 30", // Information message indicating the maximum number of recently used websites allowed.
        "minRecentlyUsedWebsites": "Minimum recently used items is 1", // Information message indicating the minimum number of recently used websites required.
        "maxBookmarks": "Maximum bookmarks is 210", // Information message indicating the maximum number of bookmarks allowed.
        "minBookmarks": "Minimum bookmarks is 1", // Information message indicating the minimum number of bookmarks required.
        "maxCustomBookmarks30": "Maximum custom bookmarks is 30", // Information message indicating the maximum number of custom bookmarks allowed.
        "minCustomBookmarks1": "Minimum custom bookmarks is 1", // Information message indicating the minimum number of custom bookmarks required.
        "noUnsplashImageToPin": "No Unsplash image to pin", // Warning message indicating that there is no Unsplash image available to pin as the background.
        "removeBookmark": "Remove Bookmark", // Label for the action to remove a bookmark.
        "Fixed width enabled": "Fixed width enabled", // Notification indicating that fixed width for menu items has been enabled.
        "Fixed width disabled": "Fixed width disabled", // Notification indicating that fixed width for menu items has been disabled.

        // Welcome Modal
        "welcome": "Welcome", // Heading for the welcome modal displayed to new users.
        "looksLikeYouAreNew": "Looks like you are new here", // Introductory text welcoming new users to the application.
        "skip": "Skip", // Button label allowing users to skip the welcome or installation process.
        "quickInstall": "Quick Install", // Button label offering a quick installation option.
        "chooseThemeColor": "Please choose a theme color:", // Prompt asking users to select a theme color during the initial setup.
        "finish": "Finish", // Button text to complete the welcome or installation process.
        "invalidImageFile": "Invalid image file type. Please upload an image file.", // Error message displayed when a user uploads an unsupported image file type.

        // Settings Sections
        "settingsSection": "Settings Section", // Generic label for a settings section, used for organizational purposes.
        "generalSettings": "General Settings", // Section heading for general application settings.
        "appearanceSettings": "Appearance Settings", // Section heading for appearance-related settings.
        "advancedSettings": "Advanced Settings", // Section heading for advanced configuration options.

        // Changelog
        "changelog": "Changelog", // Section heading for displaying the application's changelog.
        "viewChangelog": "View Changelog", // Button or link text that allows users to view detailed changelog information.
    },
};

// Export the 'translations' object so other scripts can use these text labels
export { translations };