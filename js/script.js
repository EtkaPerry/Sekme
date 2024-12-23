import { translations } from './translation.js';

document.addEventListener('DOMContentLoaded', async () => {
    const elements = {
        bookmarksContainer: document.getElementById('bookmarks'),
        settingsBox: document.getElementById('settings-box'),
        maxBookmarksInput: document.getElementById('max-bookmarks'),
        maxRecentlyUsedItemsInput: document.getElementById('max-recently-used-items'),
        toggleModeButton: document.getElementById('toggle-mode'),
        darkModeIcon: document.getElementById('dark-mode-icon'),
        hideRecentlyUsedCheckbox: document.getElementById('hide-recently-used'),
        hideBookmarksCheckbox: document.getElementById('hide-bookmarks'),
        recentlyUsedSection: document.getElementById('recently-used-section'),
        mostUsedContainer: document.getElementById('most-used'),
        searchEngineSelect: document.getElementById('search-engine'),
        themeColorInput: document.getElementById('theme-color'),
        colorSwatches: document.querySelectorAll('.color-swatch'),
        resetSettingsButton: document.getElementById('reset-settings'),
        lastSelectedColorSwatch: document.getElementById('last-selected-color-swatch'),
        customBookmarksContainer: document.getElementById('custom-bookmarks'),
        hideCustomBookmarksCheckbox: document.getElementById('hide-custom-bookmarks'),
        maxCustomBookmarksInput: document.getElementById('max-custom-bookmarks'),
        addCustomBookmarkButton: document.getElementById('add-custom-bookmark'),
        customBookmarksTitle: document.getElementById('custom-bookmarks-title'),
        addBookmarkModal: document.getElementById('add-bookmark-modal'),
        closeAddBookmarkModalButton: document.getElementById('close-add-bookmark-modal'),
        cancelAddBookmarkButton: document.getElementById('cancel-add-bookmark'),
        addBookmarkForm: document.getElementById('add-bookmark-form'),
        bookmarkUrlInput: document.getElementById('bookmark-url'),
        bookmarkTitleInput: document.getElementById('bookmark-title'),
        backToTopLocationRadios: document.getElementsByName('back-to-top-location'),
        rearrangeSectionsList: document.getElementById('rearrange-sections-list'),
        backToTopButton: document.getElementById('back-to-top'),
        progressCircle: document.querySelector('.progress-bar'),
        progressArrow: document.querySelector('.back-to-top-arrow'),
        mainContent: document.querySelector('.main-content'),
        backgroundOptionRadios: document.getElementsByName('background-option'),
        unsplashCredits: document.getElementById('unsplash-credits'),
        settingsUnsplashAuthorFooter: document.getElementById('settings-unsplash-author-footer'),
        settingsUnsplashPhotoLink: document.getElementById('settings-unsplash-photo-link'),
        uploadLinkContainer: document.getElementById('upload-link-container'),
        uploadFileContainer: document.getElementById('upload-file-container'),
        backgroundLinkInput: document.getElementById('background-link-input'),
        uploadLinkButton: document.getElementById('upload-link-button'),
        backgroundFileInput: document.getElementById('background-file-input'),
        footerUnsplashAuthorFooter: document.getElementById('footer-unsplash-author-footer'),
        footerUnsplashPhotoLink: document.getElementById('footer-unsplash-photo-link'),
        backgroundCreditFooterContainer: document.getElementById('background-credit'),
        pinBackgroundButton: document.getElementById('pin-background-button'),
        logoContainer: document.getElementById('logo-container'),
        logo: document.getElementById('logo'),
        clock: document.getElementById('clock'),
        clockPositionSelect: document.getElementById('clock-position'),
        clockTopRight: document.getElementById('clock-top-right'),
        clockTopLeft: document.getElementById('clock-top-left'),
        clockBottomRight: document.getElementById('clock-bottom-right'),
        clockBottomLeft: document.getElementById('clock-bottom-left'),
        showSecondsCheckbox: document.getElementById('show-seconds'),
        timeFormatSelect: document.getElementById('time-format'),
        settingsButton: document.getElementById('settings-icon'),
        darkModeToggle: document.getElementById('toggle-mode'),
        notification: document.getElementById('notification'),
        searchInput: document.getElementById('search-input'),
        openInNewTabCheckbox: document.getElementById('open-in-new-tab'),
        searchButton: document.getElementById('search-button'),
        exportSettingsButton: document.getElementById('export-settings'),
        importSettingsButton: document.getElementById('import-settings'),
        importSettingsFileInput: document.getElementById('import-settings-file'),
        moreButton: document.getElementById('more-button'),
        backButton: document.getElementById('back-button'),
        creditSection: document.getElementById('credit-section'),
        moreSection: document.getElementById('more-section'),
        settingsContent: document.querySelector('.settings-content'),
        bookmarksTitle: document.getElementById('bookmarks-title'),
        recentlyUsedTitle: document.getElementById('most-used-title'),
        mainFooter: document.getElementById('main-footer'),
        customCssInput: document.getElementById('custom-css-input'),
        saveCustomCssButton: document.getElementById('save-custom-css'),
        resetCustomCssButton: document.getElementById('reset-custom-css'),
        customCssLink: document.getElementById('custom-css-link'),
        menuWidthInput: document.getElementById('menu-width'),
        menuWidthValueSpan: document.getElementById('menu-width-value'),
        centeredToggle: document.getElementById('centered-toggle'),
        staticDynamicWidthToggle: document.getElementById('static-dynamic-width'),
        fixedItemWidthCheckbox: document.getElementById('fixed-item-width'),
        settingsHeadline: document.querySelector('.ayarbaslik'),
        uploadZone: document.getElementById('upload-zone'),
        welcomeModal: document.getElementById('welcome-modal'),
        welcomeModalContinueButton: document.getElementById('welcome-modal-continue'),
        welcomeModalColorSwatches: document.querySelectorAll('#welcome-modal .color-swatch'),
        languageButton: document.getElementById('language-button'),
        languageDropdown: document.getElementById('language-dropdown'),
        currentLanguageFlag: document.getElementById('current-language-flag'),
        languageOptions: document.querySelectorAll('.language-option')
    };

    const root = document.documentElement;
    let customBookmarks = [], maxBookmarks = 21, maxRecentlyUsedItems = 7, maxCustomBookmarks = 7, timeFormat = '24';
    let clockInterval;
    let userLanguage;

    const detectLanguage = () => {
        // First try to get saved language preference
        return new Promise(resolve => {
            chrome.storage.local.get(['language'], (result) => {
                if (result.language) {
                    resolve(result.language);
                    return;
                }

                // If no saved preference, try navigator.languages
                const supportedLanguages = ['en', 'tr', 'de'];
                
                // Check navigator.languages first (returns array of preferred languages)
                const preferredLang = navigator.languages
                    .map(lang => lang.split('-')[0])
                    .find(lang => supportedLanguages.includes(lang));

                // Fallback to navigator.language if no match in navigator.languages
                const fallbackLang = navigator.language.split('-')[0];
                
                // Use found language, fallback, or default to 'en'
                const detectedLang = preferredLang || 
                    (supportedLanguages.includes(fallbackLang) ? fallbackLang : 'en');

                // Save detected language
                chrome.storage.local.set({ language: detectedLang }, () => {
                    resolve(detectedLang);
                });
            });
        });
    };

    const applyTranslations = (lang) => {
        userLanguage = translations[lang] ? lang : 'en';
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[userLanguage][key]) {
                el.textContent = translations[userLanguage][key];
            }
        });

        const elementsToTranslatePlaceholder = document.querySelectorAll('[data-translate-placeholder]');
        elementsToTranslatePlaceholder.forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[userLanguage][key]) {
                el.placeholder = translations[userLanguage][key];
            }
        });

        const elementsToTranslateOptions = document.querySelectorAll('option[data-translate]');
        elementsToTranslateOptions.forEach(option => {
            const key = option.getAttribute('data-translate');
            if (translations[userLanguage][key]) {
                option.textContent = translations[userLanguage][key];
            }
        });
    };

    const translateText = (key) => {
        return translations[userLanguage][key] || key;
    };

    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    const hexToRgb = (hex) => {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(char => char + char).join('');
        const bigint = parseInt(hex, 16);
        return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    };

    const hexToRgba = (hex, alpha) => `rgba(${hexToRgb(hex).r}, ${hexToRgb(hex).g}, ${hexToRgb(hex).b}, ${alpha})`;

    const showNotification = (messageKey) => {
        const message = translateText(messageKey);
        const { notification } = elements;
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 3000);
    };

    const loadScript = (src) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });

    const loadResources = async () => {
        try {
            await loadScript('js/unsplash.js');
        } catch (error) {
            console.error('Error loading resources:', error);
        }
    };

    const initializeDarkMode = () => {
        chrome.storage.local.get(['dark-mode'], (result) => {
            const stored = result['dark-mode'];
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = stored !== undefined ? stored : prefersDark;
            document.body.classList.toggle('dark-mode', isDark);
            elements.darkModeIcon.src = isDark ? 'resim/gns.png' : 'resim/ay.png';
            chrome.storage.local.set({ 'dark-mode': isDark });
        });
    };

    const listenToSystemDarkMode = () => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            chrome.storage.local.get(['dark-mode'], (result) => {
                if (result['dark-mode'] === undefined) {
                    document.body.classList.toggle('dark-mode', e.matches);
                    elements.darkModeIcon.src = e.matches ? 'resim/gns.png' : 'resim/ay.png';
                }
            });
        });
    };

    const initializeTheme = () => {
        chrome.storage.local.get(['theme-color'], (result) => {
            const savedColor = result['theme-color'] || '#333333';
            elements.themeColorInput.value = savedColor;
            root.style.setProperty('--theme-color', savedColor);
            root.style.setProperty('--theme-color-transparent', hexToRgba(savedColor, 0.35));
            root.style.setProperty('--theme-color-rgb', `${hexToRgb(savedColor).r}, ${hexToRgb(savedColor).g}, ${hexToRgb(savedColor).b}`);
            adjustIconColors(savedColor);

            let swatchFound = false;
            elements.colorSwatches.forEach(swatch => {
                if (swatch.dataset.color.toLowerCase() === savedColor.toLowerCase() && swatch.id !== 'last-selected-color-swatch') {
                    selectColorSwatch(swatch);
                    swatchFound = true;
                }
            });

            if (!swatchFound) {
                elements.lastSelectedColorSwatch.style.backgroundColor = savedColor;
                elements.lastSelectedColorSwatch.dataset.color = savedColor;
                selectColorSwatch(elements.lastSelectedColorSwatch);
            } else {
                elements.lastSelectedColorSwatch.classList.remove('selected');
            }
        });
    };

    const adjustIconColors = (color) => {
        const { r, g, b } = hexToRgb(color);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const filterValue = luminance > 0.5 ? 'invert(0%)' : 'invert(100%)';
        document.querySelectorAll('.icon img').forEach(img => img.style.filter = `invert(${filterValue})`);
    };

    const selectColorSwatch = (swatch) => {
        elements.colorSwatches.forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
    };

    const updateThemeColor = (color, isPicker = false) => {
        root.style.setProperty('--theme-color', color);
        root.style.setProperty('--theme-color-transparent', hexToRgba(color, 0.35));
        root.style.setProperty('--theme-color-rgb', `${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}`);
        elements.themeColorInput.value = color;
        chrome.storage.local.set({ 'theme-color': color });
        adjustIconColors(color);
        if (isPicker) {
            elements.lastSelectedColorSwatch.style.backgroundColor = color;
            elements.lastSelectedColorSwatch.dataset.color = color;
            elements.colorSwatches.forEach(swatch => {
                if (swatch.id !== 'last-selected-color-swatch') swatch.classList.remove('selected');
            });
            elements.lastSelectedColorSwatch.classList.add('selected');
        } else {
            elements.lastSelectedColorSwatch.classList.remove('selected');
        }
    };

    const getBookmarksTree = async () => {
        if (chrome?.bookmarks) {
            return new Promise(resolve => chrome.bookmarks.getTree(resolve));
        } else if (browser?.bookmarks) {
            return await browser.bookmarks.getTree();
        }
        console.error('Bookmarks API not available');
        return [];
    };

    const shortenTitle = (title, max = 20) => title.length > max ? `${title.slice(0, max)}...` : title;

    function applyFixedItemWidth(linkElement) {
        chrome.storage.local.get(['fixed-item-width'], (result) => {
            const fixed = result['fixed-item-width'];
            const isFixed = (fixed === undefined) ? true : fixed;
            if (isFixed) {
                linkElement.classList.add('fixed-width');
            } else {
                linkElement.classList.remove('fixed-width');
            }
        });
    }

    const displayBookmarks = (bookmarks) => {
        elements.bookmarksContainer.innerHTML = '';
        let count = 0;
        const addBookmarks = (nodes) => {
            for (const node of nodes) {
                if (node.url && count < maxBookmarks) {
                    const link = document.createElement('a');
                    link.href = node.url;
                    link.className = 'link';
                    link.role = 'listitem';
                    link.innerHTML = `
                    <img class="favicon" src="https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(new URL(node.url).hostname)}" alt="Favicon">
                    <span>${sanitizeHTML(shortenTitle(node.title))}</span>
                    `;
                    applyFixedItemWidth(link);
                    elements.bookmarksContainer.appendChild(link);
                    count++;
                } else if (node.children) {
                    addBookmarks(node.children);
                }
                if (count >= maxBookmarks) break;
            }
        };
        addBookmarks(bookmarks);
    };

    const loadBookmarks = async () => {
        const bookmarks = await getBookmarksTree();
        displayBookmarks(bookmarks);
    };

    const updateRecentlyUsedWebsites = () => {
        chrome.storage.local.get(['recent-websites'], (result) => {
            const recent = result['recent-websites'] || [];
            elements.mostUsedContainer.innerHTML = '';
            recent.slice(0, maxRecentlyUsedItems).forEach(site => {
                const link = document.createElement('a');
                link.href = site.url;
                link.className = 'link';
                link.role = 'listitem';
                link.innerHTML = `
                    <img class="favicon" src="https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(new URL(site.url).hostname)}" alt="Favicon">
                    <span>${sanitizeHTML(shortenTitle(site.title))}</span>
                    <button class="remove-custom-bookmark" title="${translateText('removeRecentlyUsed')}" aria-label="${translateText('removeRecentlyUsed')}">×</button>
                `;
                applyFixedItemWidth(link);
                elements.mostUsedContainer.appendChild(link);
            });
            document.getElementById('no-recent-websites-message').style.display = recent.length ? 'none' : 'block';
        });
    };

    const addToRecentlyUsed = (url, title) => {
        chrome.storage.local.get(['recent-websites'], (result) => {
            let recent = result['recent-websites'] || [];
            recent = recent.filter(site => site.url !== url);
            recent.unshift({ url, title });
            if (recent.length > 50) recent = recent.slice(0, 50);
            chrome.storage.local.set({ 'recent-websites': recent }, () => {
                updateRecentlyUsedWebsites();
            });
        });
    };

    elements.maxRecentlyUsedItemsInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = 7;
        if (value > 30) {
            showNotification('maxRecentlyUsedWebsites');
            value = 30;
        } else if (value < 1) {
            showNotification('minRecentlyUsedWebsites');
            value = 1;
        }
        maxRecentlyUsedItems = Math.min(Math.max(value, 1), 30);
        elements.maxRecentlyUsedItemsInput.value = maxRecentlyUsedItems;
        chrome.storage.local.set({ 'max-recently-used-items': maxRecentlyUsedItems }, () => {
            updateRecentlyUsedWebsites();
        });
    });

    elements.maxBookmarksInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = 21;
        if (value > 210) {
            showNotification('maxBookmarks');
            value = 210;
        } else if (value < 1) {
            showNotification('minBookmarks');
            value = 1;
        }
        maxBookmarks = Math.min(Math.max(value, 1), 210);
        elements.maxBookmarksInput.value = maxBookmarks;
        chrome.storage.local.set({ 'max-bookmarks': maxBookmarks }, () => {
            loadBookmarks();
        });
    });

    elements.maxCustomBookmarksInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = 7;
        if (value > 30) {
            showNotification('maxCustomBookmarks30');
            value = 30;
        } else if (value < 1) {
            showNotification('minCustomBookmarks1');
            value = 1;
        }
        maxCustomBookmarks = Math.min(Math.max(value, 1), 30);
        elements.maxCustomBookmarksInput.value = maxCustomBookmarks;
        chrome.storage.local.set({ 'max-custom-bookmarks': maxCustomBookmarks }, () => {
            loadCustomBookmarks();
        });
    });

    elements.menuWidthInput.addEventListener('input', (e) => {
        const value = e.target.value;
        document.documentElement.style.setProperty('--menu-width', `${value}px`);
        // Update all website containers except search
        document.querySelectorAll('.websites-container, main').forEach(el => {
            el.style.maxWidth = `${value}px`;
        });
        elements.menuWidthValueSpan.textContent = `${value}px`;
    });

    elements.menuWidthInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = 1200;
        if (value > 5000) {
            showNotification('maxMenuWidth');
            value = 5000;
        } else if (value < 500) {
            showNotification('minMenuWidth');
            value = 500;
        }
        document.documentElement.style.setProperty('--menu-width', `${value}px`);
        // Update all website containers except search
        document.querySelectorAll('.websites-container, main').forEach(el => {
            el.style.maxWidth = `${value}px`;
        });
        elements.menuWidthInput.value = value;
        elements.menuWidthValueSpan.textContent = `${value}px`;
        chrome.storage.local.set({ 'menu-width': value }, () => {
            showNotification('menuWidthUpdated');
        });
    });

    elements.fixedItemWidthCheckbox.addEventListener('change', () => {
        const isFixed = elements.fixedItemWidthCheckbox.checked;
        chrome.storage.local.set({ 'fixed-item-width': isFixed }, () => {
            showNotification(isFixed ? 'Fixed width enabled' : 'Fixed width disabled');
            document.querySelectorAll('.link').forEach(link => {
                if (isFixed) {
                    link.classList.add('fixed-width');
                } else {
                    link.classList.remove('fixed-width');
                }
            });
        });
    });

    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key !== 'Enter') return;
        performSearch();
    });

    elements.searchButton.addEventListener('click', () => {
        performSearch();
    });

    function performSearch() {
        const term = elements.searchInput.value.trim();
        if (!term) return;
        chrome.storage.local.get(['selected-search-engine', 'openInNewTab'], (result) => {
            const searchEngine = result['selected-search-engine'] || 'https://www.google.com/search?q=';
            const openInNewTab = result['openInNewTab'] || false;
            const searchURL = `${searchEngine}${encodeURIComponent(term)}`;
            if (openInNewTab) {
                window.open(searchURL, '_blank');
            } else {
                window.location.href = searchURL;
            }
            addToRecentlyUsed(searchURL, `Search: ${term}`);
            elements.searchInput.value = '';
        });
    }

    elements.searchEngineSelect.addEventListener('change', (e) => {
        chrome.storage.local.set({ 'selected-search-engine': e.target.value });
    });

    const toggleVisibility = (checkbox, container, title, displayStyle = 'block') => {
        const isChecked = checkbox.checked;
        container.style.display = isChecked ? 'none' : displayStyle;
        title.style.display = isChecked ? 'none' : 'block';
        const storageKey = checkbox.id;
        const value = isChecked;
        chrome.storage.local.set({ [storageKey]: value });
    };

    elements.hideRecentlyUsedCheckbox.addEventListener('change', () => toggleVisibility(
        elements.hideRecentlyUsedCheckbox,
        elements.recentlyUsedSection,
        elements.recentlyUsedTitle,
        'block'
    ));

    elements.hideBookmarksCheckbox.addEventListener('change', () => toggleVisibility(
        elements.hideBookmarksCheckbox,
        elements.bookmarksContainer,
        elements.bookmarksTitle,
        ''
    ));

    elements.hideCustomBookmarksCheckbox.addEventListener('change', () => toggleVisibility(
        elements.hideCustomBookmarksCheckbox,
        elements.customBookmarksContainer,
        elements.customBookmarksTitle,
        ''
    ));

    elements.settingsButton.addEventListener('click', () => elements.settingsBox.classList.toggle('open'));

    const updateScrollProgress = () => {
        const { scrollTop, scrollHeight, clientHeight } = elements.mainContent;
        const scrollPct = (scrollTop / (scrollHeight - clientHeight)) * 283;
        elements.progressCircle.style.strokeDashoffset = 283 - scrollPct;
        elements.backToTopButton.classList.toggle('show', scrollTop > 100);
    };

    const scrollToTop = () => elements.mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    elements.mainContent.addEventListener('scroll', updateScrollProgress);
    elements.backToTopButton.addEventListener('click', scrollToTop);
    updateScrollProgress();

    const preventInteractions = (el) => {
        ['contextmenu', 'dragstart', 'selectstart'].forEach(evt => el.addEventListener(evt, e => e.preventDefault()));
    };
    preventInteractions(elements.logo);
    preventInteractions(elements.settingsButton);
    preventInteractions(elements.darkModeToggle);

    document.addEventListener('click', (e) => {
        if (!elements.settingsBox.contains(e.target) && !e.target.closest('#settings-icon')) {
            elements.settingsBox.classList.remove('open');
        }
    });

    elements.themeColorInput.addEventListener('input', () => updateThemeColor(elements.themeColorInput.value, true));
    elements.colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            updateThemeColor(swatch.dataset.color, false);
            selectColorSwatch(swatch);
        });
        swatch.addEventListener('keypress', (e) => {
            if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                swatch.click();
            }
        });
    });

    elements.resetSettingsButton.addEventListener('click', () => {
        if (confirm(translateText('areYouSureReset'))) {
            chrome.storage.local.clear(() => {
                window.location.reload();
            });
        }
    });

    const loadCustomBookmarks = () => {
        elements.customBookmarksContainer.innerHTML = '';
        customBookmarks.slice(0, maxCustomBookmarks).forEach(bookmark => {
            const link = document.createElement('a');
            link.href = bookmark.url;
            link.className = 'link';
            link.role = 'listitem';
            link.innerHTML = `
                <img class="favicon" src="https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(new URL(bookmark.url).hostname)}" alt="Favicon">
                <span>${sanitizeHTML(shortenTitle(bookmark.title))}</span>
                <button class="remove-custom-bookmark" title="${translateText('removeBookmark')}" aria-label="${translateText('removeBookmark')}">×</button>
            `;
            applyFixedItemWidth(link);
            elements.customBookmarksContainer.appendChild(link);
        });
        if (customBookmarks.length && !elements.hideCustomBookmarksCheckbox.checked) {
            elements.customBookmarksContainer.style.display = '';
            elements.customBookmarksTitle.style.display = 'block';
        } else {
            elements.customBookmarksContainer.style.display = 'none';
            elements.customBookmarksTitle.style.display = 'none';
        }
    };

    const removeCustomBookmark = (url) => {
        if (confirm(translateText('areYouSureRemoveBookmark'))) {
            customBookmarks = customBookmarks.filter(bm => bm.url !== url);
            chrome.storage.local.set({ 'custom-bookmarks': customBookmarks }, () => {
                loadCustomBookmarks();
                showNotification('bookmarkRemoved');
            });
        }
    };

    const removeRecentlyUsed = (url) => {
        chrome.storage.local.get(['recent-websites'], (result) => {
            let recent = result['recent-websites'] || [];
            if (confirm(translateText('areYouSureRemoveRecentlyUsed'))) {
                recent = recent.filter(site => site.url !== url);
                chrome.storage.local.set({ 'recent-websites': recent }, () => {
                    updateRecentlyUsedWebsites();
                    showNotification('recentlyUsedRemoved');
                });
            }
        });
    };

    const addCustomBookmark = (bookmark) => {
        if (customBookmarks.length >= 30) {
            showNotification('maxCustomBookmarks30');
            return;
        }
        if (customBookmarks.some(bm => bm.url === bookmark.url)) {
            showNotification('bookmarkAlreadyExists');
            return;
        }
        customBookmarks.push(bookmark);
        chrome.storage.local.set({ 'custom-bookmarks': customBookmarks }, () => {
            loadCustomBookmarks();
            showNotification('bookmarkAdded');
        });
    };

    if (chrome?.storage?.local) {
        chrome.storage.local.get(['custom-bookmarks'], (result) => {
            customBookmarks = result['custom-bookmarks'] || [];
            loadCustomBookmarks();
        });

        elements.maxCustomBookmarksInput.addEventListener('change', (e) => {
            let max = parseInt(e.target.value, 10);
            if (isNaN(max)) max = 7;
            if (max > 30) {
                showNotification('maxCustomBookmarks30');
                max = 30;
            } else if (max < 1) {
                showNotification('minCustomBookmarks1');
                max = 1;
            }
            maxCustomBookmarks = Math.min(Math.max(max, 1), 30);
            elements.maxCustomBookmarksInput.value = maxCustomBookmarks;
            chrome.storage.local.set({ 'max-custom-bookmarks': maxCustomBookmarks }, () => {
                loadCustomBookmarks();
            });
        });

        chrome.storage.onChanged.addListener((changes) => {
            if (changes['custom-bookmarks']) {
                customBookmarks = changes['custom-bookmarks'].newValue || [];
                loadCustomBookmarks();
            }
            if (changes['recent-websites']) {
                updateRecentlyUsedWebsites();
            }
            if (changes['custom-css']) {
                applyCustomCss(changes['custom-css'].newValue);
            }
            if (changes['menu-width']) {
                const width = changes['menu-width'].newValue;
                root.style.setProperty('--menu-width', `${width}px`);
                elements.menuWidthInput.value = width;
                elements.menuWidthValueSpan.textContent = `${width}px`;
            }
            if (changes['fixed-item-width']) {
                const fixed = changes['fixed-item-width'].newValue;
                elements.fixedItemWidthCheckbox.checked = fixed;
                document.querySelectorAll('.link').forEach(link => {
                    if (fixed) {
                        link.classList.add('fixed-width');
                    } else {
                        link.classList.remove('fixed-width');
                    }
                });
            }
        });

        const openModal = () => {
            elements.addBookmarkModal.style.display = 'block';
            elements.addBookmarkModal.setAttribute('aria-hidden', 'false');
            elements.addBookmarkModal.querySelector('input').focus();
        };
        const closeModal = () => {
            elements.addBookmarkModal.style.display = 'none';
            elements.addBookmarkForm.reset();
        };
        elements.addCustomBookmarkButton.addEventListener('click', openModal);
        elements.closeAddBookmarkModalButton.addEventListener('click', closeModal);
        elements.cancelAddBookmarkButton.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target === elements.addBookmarkModal) closeModal();
        });
        elements.addBookmarkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const url = elements.bookmarkUrlInput.value.trim();
            const title = elements.bookmarkTitleInput.value.trim();
            if (!url || !title) {
                showNotification('fillUrlAndTitle');
                return;
            }
            try {
                const validURL = new URL(url);
                addCustomBookmark({ url: validURL.href, title });
                closeModal();
            } catch {
                showNotification('invalidUrl');
            }
        });
    } else {
        console.error('Chrome storage is not available.');
    }

    const handleDrag = (e) => {
        e.preventDefault();
        const dragged = document.querySelector('.dragging');
        const over = e.target.closest('li');
        if (dragged && over && dragged !== over) {
            elements.rearrangeSectionsList.insertBefore(dragged, over);
            saveSectionsOrder();
            reorderMainSections();
            updateRearrangeSectionsNumbering();
        }
    };

    const handleDragEnd = () => {
        document.querySelectorAll('li').forEach(li => li.classList.remove('over', 'dragging'));
    };

    const saveSectionsOrder = () => {
        const order = Array.from(elements.rearrangeSectionsList.children).map(li => li.dataset.sectionId);
        chrome.storage.local.set({ 'sections-order': order });
    };

    const reorderMainSections = () => {
        chrome.storage.local.get(['sections-order'], (result) => {
            const order = result['sections-order'] || ['recently-used-section', 'bookmarks', 'custom-bookmarks'];
            order.forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    const titleId = id === 'recently-used-section' ? 'most-used-title' :
                                    id === 'bookmarks' ? 'bookmarks-title' :
                                    id === 'custom-bookmarks' ? 'custom-bookmarks-title' : null;
                    if (titleId) {
                        const title = document.getElementById(titleId);
                        if (title) elements.mainContent.appendChild(title);
                    }
                    elements.mainContent.appendChild(section);
                }
            });
        });
    };

    const updateRearrangeSectionsNumbering = () => {
        Array.from(elements.rearrangeSectionsList.children).forEach((li, index) => {
            const numberSpan = li.querySelector('.section-number');
            if (numberSpan) numberSpan.textContent = `${index + 1}.`;
        });
    };

    const loadSectionsOrder = () => {
        chrome.storage.local.get(['sections-order'], (result) => {
            const order = result['sections-order'] || ['recently-used-section', 'bookmarks', 'custom-bookmarks'];
            elements.rearrangeSectionsList.innerHTML = '';
            order.forEach(id => {
                const li = document.createElement('li');
                li.draggable = true;
                li.dataset.sectionId = id;
                const displayNameKey = {
                    'recently-used-section': 'recentlyUsedWebsites',
                    'bookmarks': 'yourBookmarks',
                    'custom-bookmarks': 'yourCustomBookmarks'
                }[id] || id;
                const displayName = translateText(displayNameKey);
                li.innerHTML = `<span class="section-number">${order.indexOf(id) + 1}.</span><span class="section-name">${displayName}</span>`;
                li.addEventListener('dragstart', () => li.classList.add('dragging'));
                li.addEventListener('dragover', (e) => e.preventDefault());
                li.addEventListener('drop', handleDrag);
                li.addEventListener('dragend', handleDragEnd);
                elements.rearrangeSectionsList.appendChild(li);
            });
            reorderMainSections();
            updateRearrangeSectionsNumbering();
        });
    };

    loadSectionsOrder();

    const applyBackground = (option, data = {}) => {
        switch(option) {
            case 'none':
                document.body.style.backgroundImage = 'none';
                elements.backgroundCreditFooterContainer.style.display = 'none';
                elements.unsplashCredits.style.display = 'none';
                chrome.storage.local.remove(['background-image', 'uploaded-background-image']);
                break;
            case 'unsplash':
                if (window.unsplashImages?.length) {
                    chrome.storage.local.get(['fixed-background-image'], (result) => {
                        const fixed = result['fixed-background-image'];
                        let img = window.unsplashImages.find(img => img.url === fixed) || window.unsplashImages[Math.floor(Math.random() * window.unsplashImages.length)];
                        document.body.style.backgroundImage = `url(${img.url})`;
                        Object.assign(document.body.style, {
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        });
                        setUnsplashCredits(img);
                        if (!result['fixed-background-image']) {
                            chrome.storage.local.set({ 'background-image': img.url });
                        }
                        chrome.storage.local.remove('uploaded-background-image');
                    });
                }
                break;
            case 'upload-link':
            case 'upload-file':
                if (data.url) {
                    document.body.style.backgroundImage = `url(${data.url})`;
                    Object.assign(document.body.style, {
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    });
                    elements.backgroundCreditFooterContainer.style.display = 'none';
                    elements.unsplashCredits.style.display = 'none';
                    chrome.storage.local.set({ 'uploaded-background-image': data.url });
                    chrome.storage.local.remove('background-image');
                } else {
                    chrome.storage.local.get(['uploaded-background-image'], (result) => {
                        if (result['uploaded-background-image']) {
                            document.body.style.backgroundImage = `url(${result['uploaded-background-image']})`;
                            Object.assign(document.body.style, {
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            });
                            elements.backgroundCreditFooterContainer.style.display = 'none';
                            elements.unsplashCredits.style.display = 'none';
                        }
                    });
                }
                break;
            default:
                document.body.style.backgroundImage = 'none';
                elements.backgroundCreditFooterContainer.style.display = 'none';
                elements.unsplashCredits.style.display = 'none';
        }
        chrome.storage.local.set({ 'background-option': option });
    };

    const setUnsplashCredits = (img) => {
        if (img) {
            elements.unsplashCredits.style.display = 'block';
            elements.settingsUnsplashAuthorFooter.href = img.authLink;
            elements.settingsUnsplashAuthorFooter.textContent = img.author;
            elements.settingsUnsplashPhotoLink.href = img.link;
            elements.settingsUnsplashPhotoLink.textContent = 'Unsplash';
            elements.backgroundCreditFooterContainer.style.display = 'block';
            elements.footerUnsplashAuthorFooter.href = img.authLink;
            elements.footerUnsplashAuthorFooter.textContent = img.author;
            elements.footerUnsplashPhotoLink.href = img.link;
            elements.footerUnsplashPhotoLink.textContent = 'Unsplash';
        } else {
            elements.backgroundCreditFooterContainer.style.display = 'none';
        }
    };

    const handleBackgroundOptionChange = (e) => {
        const option = e.target.value;
        applyBackground(option, {});
        ['unsplash', 'upload-link', 'upload-file'].forEach(opt => {
            switch(opt) {
                case 'unsplash':
                    elements.unsplashCredits.style.display = option === 'unsplash' ? 'block' : 'none';
                    break;
                case 'upload-link':
                    elements.uploadLinkContainer.style.display = option === 'upload-link' ? 'block' : 'none';
                    break;
                case 'upload-file':
                    elements.uploadFileContainer.style.display = option === 'upload-file' ? 'block' : 'none';
                    break;
            }
        });
    };

    elements.backgroundOptionRadios.forEach(radio => {
        radio.addEventListener('change', handleBackgroundOptionChange);
    });

    const handleUploadLink = async () => {
        const url = elements.backgroundLinkInput.value.trim();
        if (!url) return showNotification('enterImageUrl');
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Image fetch failed');
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result;
                applyBackground('upload-link', { url: dataUrl });
                showNotification('imageUploadSuccess');
                elements.backgroundLinkInput.value = '';
                chrome.storage.local.remove('fixed-background-image');
                updatePinButtonState(false);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error uploading background from link:', error);
            showNotification('imageUploadFailed');
        }
    };

    const handleUploadFile = () => {
        const file = elements.backgroundFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                applyBackground('upload-file', { url: dataUrl });
                showNotification('imageUploadSuccess');
                chrome.storage.local.remove('fixed-background-image');
                updatePinButtonState(false);
            };
            reader.readAsDataURL(file);
        }
    };

    elements.uploadLinkButton.addEventListener('click', handleUploadLink);
    elements.backgroundFileInput.addEventListener('change', handleUploadFile);

    const initializeUploadZone = () => {
        const { uploadZone, backgroundFileInput } = elements;

        const handleDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.classList.add('dragging');
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.classList.remove('dragging');
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.classList.remove('dragging');

            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    applyBackground('upload-file', { url: dataUrl });
                    showNotification('imageUploadSuccess');
                    chrome.storage.local.remove('fixed-background-image');
                    updatePinButtonState(false);
                };
                reader.readAsDataURL(files[0]);
            } else {
                showNotification('invalidImageFile');
            }
        };

        const handleClick = () => {
            backgroundFileInput.click();
        };

        uploadZone.addEventListener('dragover', handleDragOver);
        uploadZone.addEventListener('dragleave', handleDragLeave);
        uploadZone.addEventListener('drop', handleDrop);
        uploadZone.addEventListener('click', handleClick);
        uploadZone.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        });
    };

    const toggleFixedBackgroundImage = (url) => {
        chrome.storage.local.get(['fixed-background-image'], (result) => {
            if (result['fixed-background-image']) {
                chrome.storage.local.remove('fixed-background-image', () => {
                    updatePinButtonState(false);
                    showNotification('backgroundUnpinned');
                });
            } else {
                chrome.storage.local.set({ 'fixed-background-image': url }, () => {
                    updatePinButtonState(true);
                    showNotification('backgroundPinned');
                });
            }
        });
    };

    const isBackgroundFixed = (callback) => {
        chrome.storage.local.get(['fixed-background-image'], (result) => {
            callback(!!result['fixed-background-image']);
        });
    };

    const getFixedBackgroundImage = (callback) => {
        chrome.storage.local.get(['fixed-background-image'], (result) => {
            callback(result['fixed-background-image']);
        });
    };

    const setFixedBackgroundImage = (url) => {
        chrome.storage.local.set({ 'fixed-background-image': url });
    };

    const removeFixedBackgroundImage = () => {
        chrome.storage.local.remove('fixed-background-image');
    };

    const updatePinButtonState = (isPinned) => {
        elements.pinBackgroundButton.textContent = translateText(isPinned ? 'unpinBackground' : 'pin');
    };

    elements.pinBackgroundButton.addEventListener('click', () => {
        chrome.storage.local.get(['background-image'], (result) => {
            const current = result['background-image'];
            if (current && window.unsplashImages?.some(img => img.url === current)) {
                toggleFixedBackgroundImage(current);
            } else {
                showNotification('noUnsplashImageToPin');
            }
        });
    });

    const initializeBackground = () => {
        chrome.storage.local.get(['background-option', 'background-image', 'fixed-background-image', 'uploaded-background-image'], (result) => {
            const option = result['background-option'] || 'none';
            const savedImage = result['background-image'];
            const fixedImage = result['fixed-background-image'];
            const uploadedImage = result['uploaded-background-image'];
            const radio = Array.from(elements.backgroundOptionRadios).find(r => r.value === option);
            if (radio) {
                radio.checked = true;
                handleBackgroundOptionChange({ target: radio });
            }
            if (option === 'unsplash' && fixedImage) {
                const img = window.unsplashImages.find(img => img.url === fixedImage);
                if (img) {
                    applyBackground('unsplash', {});
                    setUnsplashCredits(img);
                    updatePinButtonState(true);
                }
            } else if ((option === 'upload-link' || option === 'upload-file') && uploadedImage) {
                document.body.style.backgroundImage = `url(${uploadedImage})`;
                Object.assign(document.body.style, {
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                });
                elements.backgroundCreditFooterContainer.style.display = 'none';
                elements.unsplashCredits.style.display = 'none';
            } else if (savedImage && option === 'unsplash') {
                document.body.style.backgroundImage = `url(${savedImage})`;
                Object.assign(document.body.style, {
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                });
            } else {
                document.body.style.backgroundImage = 'none';
            }
        });
    };

    const toggleSettingsSection = (header) => {
        const section = header.parentElement;
        const isExpanded = section.classList.contains('expanded');

        document.querySelectorAll('.settings-section').forEach(sec => {
            sec.classList.remove('expanded');
            sec.classList.add('collapsed');
        });

        if (!isExpanded) {
            section.classList.remove('collapsed');
            section.classList.add('expanded');
        }

        if (section.id === 'credit-section' || section.id === 'more-section') {
            if (section.id === 'credit-section') {
                elements.moreButton.style.display = 'none';
            } else if (section.id === 'more-section') {
                elements.moreButton.style.display = 'none';
            }
            elements.backButton.style.display = 'block';
            elements.resetSettingsButton.style.display = 'none';
            elements.settingsHeadline.style.display = 'none';
        } else {
            elements.resetSettingsButton.style.display = 'block';
            elements.settingsHeadline.style.display = 'block';
        }
    };

    document.querySelectorAll('.settings-header').forEach(header => {
        header.addEventListener('click', () => toggleSettingsSection(header));
        header.setAttribute('tabindex', '0');
        header.addEventListener('keypress', (e) => {
            if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                toggleSettingsSection(header);
            }
        });
    });

    elements.rearrangeSectionsList.addEventListener('keydown', (e) => {
        const li = document.activeElement;
        if (li.tagName.toLowerCase() !== 'li') return;
        if (e.key === 'ArrowUp') {
            const prev = li.previousElementSibling;
            if (prev) {
                elements.rearrangeSectionsList.insertBefore(li, prev);
                saveSectionsOrder();
                reorderMainSections();
                updateRearrangeSectionsNumbering();
                li.focus();
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            const next = li.nextElementSibling;
            if (next) {
                elements.rearrangeSectionsList.insertBefore(next, li);
                saveSectionsOrder();
                reorderMainSections();
                updateRearrangeSectionsNumbering();
                li.focus();
            }
            e.preventDefault();
        }
    });

    const setUnsplashCredit = (img) => {
        if (img) {
            elements.backgroundCreditFooterContainer.style.display = 'block';
            elements.footerUnsplashAuthorFooter.href = img.authLink;
            elements.footerUnsplashAuthorFooter.textContent = img.author;
            elements.footerUnsplashPhotoLink.href = img.link;
            elements.footerUnsplashPhotoLink.textContent = 'Unsplash';
        } else {
            elements.backgroundCreditFooterContainer.style.display = 'none';
        }
    };

    const updateClock = () => {
        const now = new Date();
        const showSeconds = elements.showSecondsCheckbox.checked;
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: showSeconds ? '2-digit' : undefined,
            hour12: timeFormat === '12'
        };
        const timeString = now.toLocaleTimeString([], options);
        elements.clock.textContent = timeString;
        elements.clockTopRight.textContent = timeString;
        elements.clockTopLeft.textContent = timeString;
        elements.clockBottomRight.textContent = timeString;
        elements.clockBottomLeft.textContent = timeString;
    };

    const initializeClock = () => {
        chrome.storage.local.get(['clock-position', 'show-seconds', 'time-format'], (result) => {
            const position = result['clock-position'] || 'none';
            elements.clockPositionSelect.value = position;
            elements.showSecondsCheckbox.checked = result['show-seconds'] || false;
            timeFormat = result['time-format'] || '24';
            elements.timeFormatSelect.value = timeFormat;
            applyClockPosition(position);
            if (position !== 'none') {
                updateClock();
                clockInterval = setInterval(updateClock, 1000);
            }
        });
    };

    const applyClockPosition = (position) => {
        elements.clock.style.display = 'none';
        elements.logo.style.display = 'block';
        elements.clockTopRight.style.display = 'none';
        elements.clockTopLeft.style.display = 'none';
        elements.clockBottomRight.style.display = 'none';
        elements.clockBottomLeft.style.display = 'none';

        switch (position) {
            case 'replace-logo':
                elements.logo.style.display = 'none';
                elements.clock.style.display = 'block';
                break;
            case 'top-right':
                elements.clockTopRight.style.display = 'block';
                break;
            case 'top-left':
                elements.clockTopLeft.style.display = 'block';
                break;
            case 'bottom-right':
                elements.clockBottomRight.style.display = 'block';
                break;
            case 'bottom-left':
                elements.clockBottomLeft.style.display = 'block';
                break;
            default:
                break;
        }
    };

    elements.clockPositionSelect.addEventListener('change', () => {
        const position = elements.clockPositionSelect.value;
        chrome.storage.local.set({ 'clock-position': position }, () => {
            applyClockPosition(position);
            if (position !== 'none') {
                updateClock();
                if (!clockInterval) {
                    clockInterval = setInterval(updateClock, 1000);
                }
            } else {
                clearInterval(clockInterval);
                clockInterval = null;
            }
        });
    });

    elements.showSecondsCheckbox.addEventListener('change', () => {
        const showSeconds = elements.showSecondsCheckbox.checked;
        chrome.storage.local.set({ 'show-seconds': showSeconds }, () => {
            updateClock();
        });
    });

    elements.timeFormatSelect.addEventListener('change', () => {
        timeFormat = elements.timeFormatSelect.value;
        chrome.storage.local.set({ 'time-format': timeFormat }, () => {
            updateClock();
        });
    });

    const initializeLanguage = () => {
        // Set initial language
        chrome.storage.local.get(['language'], (result) => {
            const savedLang = result.language || 'en';
            updateLanguageUI(savedLang);
            applyTranslations(savedLang);
        });

        // Toggle language dropdown
        elements.languageButton.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.languageDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.languageDropdown.contains(e.target) && !elements.languageButton.contains(e.target)) {
                elements.languageDropdown.classList.remove('show');
            }
        });

        // Handle language selection
        elements.languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.dataset.lang;
                chrome.storage.local.set({ language: lang }, () => {
                    updateLanguageUI(lang);
                    applyTranslations(lang);
                    elements.languageDropdown.classList.remove('show');
                    showNotification('languageChanged');
                });
            });
        });
    };

    const updateLanguageUI = (lang) => {
        elements.currentLanguageFlag.src = `resim/bayrak/${lang === 'en' ? 'us' : lang}.svg`;
    };

    const initialize = async () => {
        const lang = await detectLanguage();
        applyTranslations(lang);

        await loadResources();
        initializeDarkMode();
        listenToSystemDarkMode();
        initializeTheme();
        chrome.storage.local.get(['max-bookmarks', 'max-recently-used-items', 'max-custom-bookmarks', 'hide-recently-used', 'hide-bookmarks', 'selected-search-engine', 'openInNewTab', 'hide-custom-bookmarks', 'menu-width', 'fixed-item-width'], (result) => {
            maxBookmarks = parseInt(result['max-bookmarks'], 10) || 21;
            if (maxBookmarks > 210) {
                showNotification('maxBookmarks');
                maxBookmarks = 210;
                chrome.storage.local.set({ 'max-bookmarks': maxBookmarks });
            } else if (maxBookmarks < 1) {
                showNotification('minBookmarks');
                maxBookmarks = 1;
                chrome.storage.local.set({ 'max-bookmarks': maxBookmarks });
            }
            maxBookmarks = Math.min(Math.max(maxBookmarks, 1), 210);
            elements.maxBookmarksInput.value = maxBookmarks;

            maxRecentlyUsedItems = parseInt(result['max-recently-used-items'], 10) || 7;
            if (maxRecentlyUsedItems > 30) {
                showNotification('maxRecentlyUsedWebsites');
                maxRecentlyUsedItems = 30;
                chrome.storage.local.set({ 'max-recently-used-items': maxRecentlyUsedItems });
            } else if (maxRecentlyUsedItems < 1) {
                showNotification('minRecentlyUsedWebsites');
                maxRecentlyUsedItems = 1;
                chrome.storage.local.set({ 'max-recently-used-items': maxRecentlyUsedItems });
            }
            maxRecentlyUsedItems = Math.min(Math.max(maxRecentlyUsedItems, 1), 30);
            elements.maxRecentlyUsedItemsInput.value = maxRecentlyUsedItems;

            maxCustomBookmarks = parseInt(result['max-custom-bookmarks'], 10) || 7;
            if (maxCustomBookmarks > 30) {
                showNotification('maxCustomBookmarks30');
                maxCustomBookmarks = 30;
                chrome.storage.local.set({ 'max-custom-bookmarks': maxCustomBookmarks });
            } else if (maxCustomBookmarks < 1) {
                showNotification('minCustomBookmarks1');
                maxCustomBookmarks = 1;
                chrome.storage.local.set({ 'max-custom-bookmarks': maxCustomBookmarks });
            }
            maxCustomBookmarks = Math.min(Math.max(maxCustomBookmarks, 1), 30);
            elements.maxCustomBookmarksInput.value = maxCustomBookmarks;

            timeFormat = '24';
            elements.timeFormatSelect.value = timeFormat;

            if (result['hide-recently-used']) {
                elements.recentlyUsedSection.style.display = 'none';
                elements.recentlyUsedTitle.style.display = 'none';
                elements.hideRecentlyUsedCheckbox.checked = true;
            }
            if (result['hide-bookmarks']) {
                elements.bookmarksContainer.style.display = 'none';
                elements.bookmarksTitle.style.display = 'none';
                elements.hideBookmarksCheckbox.checked = true;
            }
            if (result['hide-custom-bookmarks']) {
                elements.customBookmarksContainer.style.display = 'none';
                elements.customBookmarksTitle.style.display = 'none';
                elements.hideCustomBookmarksCheckbox.checked = true;
            }
            const savedEngine = result['selected-search-engine'] || 'https://www.google.com/search?q=';
            elements.searchEngineSelect.value = savedEngine;
            const openInNewTab = result['openInNewTab'] || false;
            elements.openInNewTabCheckbox.checked = openInNewTab;

            const menuWidth = parseInt(result['menu-width'], 10) || 1200;
            document.documentElement.style.setProperty('--menu-width', `${menuWidth}px`);
            document.querySelectorAll('.websites-container, main').forEach(el => {
                el.style.maxWidth = `${menuWidth}px`;
            });
            elements.menuWidthInput.value = menuWidth;
            elements.menuWidthValueSpan.textContent = `${menuWidth}px`;

            const fixedItemWidth = (result['fixed-item-width'] === undefined) ? true : result['fixed-item-width'];
            elements.fixedItemWidthCheckbox.checked = fixedItemWidth;

            loadBookmarks();
            updateRecentlyUsedWebsites();
            initializeBackground();
            initializeClock();
            loadCustomCss();

            document.querySelectorAll('.link').forEach(link => {
                if (fixedItemWidth) link.classList.add('fixed-width');
            });
        });

        initializeBackToTopPosition();
        initializeExportImport();

        initializeMoreButton();
        initializeUploadZone();

        chrome.storage.local.get(['theme-color-set'], (result) => {
            if (!result['theme-color-set']) {
                showWelcomeModal();
            }
        });

        elements.welcomeModalColorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                const color = swatch.getAttribute('data-color');
                updateThemeColor(color);
                selectColorSwatch(swatch);
            });
        });

        elements.welcomeModalContinueButton.addEventListener('click', () => {
            chrome.storage.local.set({ 'theme-color-set': true }, () => {
                hideWelcomeModal();
            });
        });

        const isFirstVisit = localStorage.getItem('visited');
        if (!isFirstVisit) {
            showWelcomeModal();
            localStorage.setItem('visited', 'true');
        } else {
        }
        initializeLanguage();
    };

    const showWelcomeModal = () => {
        elements.welcomeModal.style.display = 'block';
        document.getElementById('welcome-screen').style.display = 'block';
        document.getElementById('choose-theme-screen').style.display = 'none';
    };

    document.getElementById('skip-button').addEventListener('click', () => {
        hideWelcomeModal();
        chrome.storage.local.set({ 'theme-color-set': true });
    });

    document.getElementById('quick-install-button').addEventListener('click', () => {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('choose-theme-screen').style.display = 'block';
    });

    document.getElementById('welcome-modal-continue').addEventListener('click', () => {
        hideWelcomeModal();
    });

    const hideWelcomeModal = () => {
        elements.welcomeModal.style.display = 'none';
    };

    initialize().catch(error => console.error('Initialization failed:', error));

    const setBackToTopPosition = (position) => {
        if (position === 'left') {
            elements.backToTopButton.style.right = 'auto';
            elements.backToTopButton.style.left = '40px';
        } else {
            elements.backToTopButton.style.left = 'auto';
            elements.backToTopButton.style.right = '40px';
        }
        chrome.storage.local.set({ 'back-to-top-location': position });
    };

    const initializeBackToTopPosition = () => {
        chrome.storage.local.get(['back-to-top-location'], (result) => {
            const savedPosition = result['back-to-top-location'] || 'right';
            setBackToTopPosition(savedPosition);
            const radio = Array.from(elements.backToTopLocationRadios).find(r => r.value === savedPosition);
            if (radio) radio.checked = true;
        });
    };

    Array.from(elements.backToTopLocationRadios).forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                setBackToTopPosition(e.target.value);
            }
        });
    });

    const initializeOpenInNewTabToggle = () => {
        chrome.storage.local.get(['openInNewTab'], (result) => {
            const isChecked = result['openInNewTab'] || false;
            elements.openInNewTabCheckbox.checked = isChecked;
        });
    };

    elements.openInNewTabCheckbox.addEventListener('change', () => {
        const isChecked = elements.openInNewTabCheckbox.checked;
        chrome.storage.local.set({ 'openInNewTab': isChecked });
    });

    const openLink = (url, title) => {
        chrome.storage.local.get(['openInNewTab'], (result) => {
            const openInNewTab = result['openInNewTab'] || false;
            if (openInNewTab) {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
            addToRecentlyUsed(url, title);
        });
    };

    const setupLinkDelegation = () => {
        const handleLinkClick = (e) => {
            const link = e.target.closest('.link');
            if (link) {
                e.preventDefault();
                const url = link.href;
                const title = link.querySelector('span').textContent;
                openLink(url, title);
            }
        };

        const handleAuxClick = (e) => {
            if (e.button === 1) {
                const link = e.target.closest('.link');
                if (link) {
                    e.preventDefault();
                    const url = link.href;
                    const title = link.querySelector('span').textContent;
                    openLink(url, title);
                }
            }
        };

        elements.bookmarksContainer.addEventListener('click', handleLinkClick);
        elements.bookmarksContainer.addEventListener('auxclick', handleAuxClick);

        elements.mostUsedContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-custom-bookmark')) {
                e.preventDefault();
                e.stopPropagation();
                const link = e.target.closest('.link');
                if (link) {
                    const url = link.href;
                    removeRecentlyUsed(url);
                }
            } else {
                handleLinkClick(e);
            }
        });
        elements.mostUsedContainer.addEventListener('auxclick', handleAuxClick);

        elements.customBookmarksContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-custom-bookmark')) {
                e.preventDefault();
                e.stopPropagation();
                const link = e.target.closest('.link');
                if (link) {
                    const url = link.href;
                    removeCustomBookmark(url);
                }
            } else {
                handleLinkClick(e);
            }
        });
        elements.customBookmarksContainer.addEventListener('auxclick', handleAuxClick);
    };

    setupLinkDelegation();

    elements.toggleModeButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        elements.darkModeIcon.src = isDark ? 'resim/gns.png' : 'resim/ay.png';
        chrome.storage.local.set({ 'dark-mode': isDark });
    });

    initializeOpenInNewTabToggle();

    const initializeExportImport = () => {
        elements.exportSettingsButton.addEventListener('click', () => {
            chrome.storage.local.get(null, (items) => {
                const dataStr = JSON.stringify(items, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sekme-settings.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showNotification('settingsExported');
            });
        });

        elements.importSettingsButton.addEventListener('click', () => {
            elements.importSettingsFileInput.click();
        });

        elements.importSettingsFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const confirmImport = confirm(translateText('confirmImportSettings'));
            if (!confirmImport) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedSettings = JSON.parse(event.target.result);
                    chrome.storage.local.set(importedSettings, () => {
                        showNotification('settingsImported');
                        window.location.reload();
                    });
                } catch (error) {
                    console.error('Error parsing imported settings:', error);
                    showNotification('settingsImportFailed');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });
    };

    const initializeMoreButton = () => {
        const { moreButton, backButton, moreSection, settingsContent, resetSettingsButton } = elements;

        moreButton.addEventListener('click', () => {
            settingsContent.querySelectorAll('.settings-section').forEach(section => {
                if (section.id !== 'more-section') {
                    section.style.display = 'none';
                }
            });
            moreSection.style.display = 'block';
            moreButton.style.display = 'none';
            backButton.style.display = 'block';
            resetSettingsButton.style.display = 'none';
            elements.settingsHeadline.style.display = 'none';
        });

        backButton.addEventListener('click', () => {
            settingsContent.querySelectorAll('.settings-section').forEach(section => {
                if (section.id !== 'more-section') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            moreSection.style.display = 'none';
            moreButton.style.display = 'block';
            backButton.style.display = 'none';
            resetSettingsButton.style.display = 'block';
            elements.settingsHeadline.style.display = 'block';
        });
    };

    const loadCustomCss = () => {
        chrome.storage.local.get(['custom-css'], (result) => {
            const customCss = result['custom-css'] || '';
            applyCustomCss(customCss);
            elements.customCssInput.value = customCss;
        });
    };

    const applyCustomCss = (css) => {
        if (css) {
            if (!document.getElementById('user-custom-css')) {
                const style = document.createElement('style');
                style.id = 'user-custom-css';
                document.head.appendChild(style);
            }
            document.getElementById('user-custom-css').textContent = css;
        } else {
            const style = document.getElementById('user-custom-css');
            if (style) {
                style.textContent = '';
            }
        }
    };

    const saveCustomCss = () => {
        const css = elements.customCssInput.value.trim();
        chrome.storage.local.set({ 'custom-css': css }, () => {
            applyCustomCss(css);
            showNotification('customCssSaved');
        });
    };

    const resetCustomCss = () => {
        if (confirm(translateText('areYouSureResetCustomCss'))) {
            chrome.storage.local.set({ 'custom-css': '' }, () => {
                applyCustomCss('');
                elements.customCssInput.value = '';
                showNotification('customCssReset');
            });
        }
    };

    elements.saveCustomCssButton.addEventListener('click', saveCustomCss);
    elements.resetCustomCssButton.addEventListener('click', resetCustomCss);

    const initializeCustomCssSection = () => {
        initializeCustomCss();
    };

    const originalInitialize = initialize;
    initialize = async () => {
        await originalInitialize();
        initializeCustomCssSection();
        initializeLanguage();
    };

    initialize().catch(error => console.error('Initialization failed:', error));

    const welcomeScreen = document.getElementById('welcome-screen');
    const chooseThemeScreen = document.getElementById('choose-theme-screen');
    const skipButton = document.getElementById('skip-button');
    const quickInstallButton = document.getElementById('quick-install-button');
    const backButton = document.getElementById('back-button');
    const welcomeModalContinueButton = document.getElementById('welcome-modal-continue');

    skipButton.addEventListener('click', hideWelcomeModal);
    quickInstallButton.addEventListener('click', performQuickInstall);
    backButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'block';
        chooseThemeScreen.style.display = 'none';
    });
    welcomeModalContinueButton.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        chooseThemeScreen.style.display = 'block';
    });
});