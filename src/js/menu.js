document.addEventListener('DOMContentLoaded', () => {
    const menuOptions = document.querySelectorAll('.menu-option');
    
    // Keyboard navigation state
    let currentIndex = 0;
    let keyboardNavigationActive = false;
    
    // Initialize first option as selected
    if (menuOptions.length > 0) {
        updateSelection(0);
    }
    
    // Update visual selection
    function updateSelection(newIndex) {
        // Remove selection from all options
        menuOptions.forEach(option => {
            option.classList.remove('keyboard-selected');
        });
        
        // Add selection to current option
        if (menuOptions[newIndex]) {
            menuOptions[newIndex].classList.add('keyboard-selected');
            currentIndex = newIndex;
            keyboardNavigationActive = true;
        }
    }
    
    // Navigate to selected option
    function navigateToSelected() {
        if (menuOptions[currentIndex]) {
            const selectedOption = menuOptions[currentIndex];
            
            // Get target page from href attribute
            let targetPage = selectedOption.href;
            
            // If href is absolute, make it relative
            if (targetPage.includes('localhost:8000')) {
                targetPage = targetPage.replace('http://localhost:8000/', '');
            }
            
            // Play sound
            AudioManager.playSelectSound();
            
            // Navigate after short delay
            setTimeout(() => {
                window.location.href = targetPage;
            }, 150);
        }    }
    
    // Consolidated audio system
    const AudioManager = {
        // Load audio files (optional)
        selectSound: new Audio('assets/sounds/select.wav'),
        themeMusic: new Audio('assets/sounds/theme.wav'),
        useRealAudio: true,
        musicPlaying: false,
        
        init() {
            this.selectSound.addEventListener('error', () => {
                this.useRealAudio = false;
            });
            this.themeMusic.loop = true;
            this.themeMusic.volume = 0.7;
        },
        
        // Create synthetic audio using Web Audio API
        createSyntheticSound(frequency, gain, duration) {
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
                
                oscillator.start(audioCtx.currentTime);
                oscillator.stop(audioCtx.currentTime + duration);
            } catch (error) {
                // Sound failed silently
            }
        },
        
        playSelectSound() {
            if (this.useRealAudio) {
                this.selectSound.currentTime = 0;
                this.selectSound.play().catch(() => this.createSyntheticSound(800, 0.3, 0.1));
            } else {
                this.createSyntheticSound(800, 0.3, 0.1);
            }
        },
        
        playNavigationSound() {
            this.createSyntheticSound(600, 0.1, 0.05);
        },
        
        toggleMusic() {
            if (this.musicPlaying) {
                this.themeMusic.pause();
                return '🔈';
            } else {
                this.themeMusic.play().catch(e => {
                    // Theme music requires user interaction - fail silently
                });
                return '🔊';
            }
        }
    };
    
    // Initialize audio system
    AudioManager.init();

    // Variables for list item navigation
    let listItems = [];
    let listNavigationActive = false;
    let currentListIndex = -1;
    let isZoomed = false;

    // Initialize list items if on content pages
    function initializeListItems() {
        const lists = document.querySelectorAll('.experience-list, .education-list, .hobbies-list');
        listItems = [];
        lists.forEach(list => {
            const items = list.querySelectorAll('li');
            items.forEach((item, index) => {
                item.setAttribute('tabindex', '0');
                item.setAttribute('data-list-index', listItems.length);
                listItems.push(item);
                
                // Add click handler for list items
                item.addEventListener('click', () => {
                    if (!isZoomed) {
                        selectListItem(listItems.indexOf(item));
                        zoomListItem();
                    } else {
                        exitZoomMode();
                    }
                });
            });
        });
    }

    // Select a list item
    function selectListItem(index) {
        // Clear previous selection
        listItems.forEach(item => item.classList.remove('keyboard-selected'));
        
        if (index >= 0 && index < listItems.length) {
            currentListIndex = index;
            listItems[currentListIndex].classList.add('keyboard-selected');
            listNavigationActive = true;
            
            // Scroll item into view if needed
            listItems[currentListIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            AudioManager.playNavigationSound();
        }
    }

    // Zoom into selected list item
    function zoomListItem() {
        if (currentListIndex >= 0 && !isZoomed) {
            const selectedItem = listItems[currentListIndex];
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.classList.add('zoom-overlay');
            document.body.appendChild(overlay);
            
            // Add zoom class and mode
            selectedItem.classList.add('zoomed');
            document.body.classList.add('zoom-mode');
            overlay.classList.add('active');
            isZoomed = true;
            
            AudioManager.playSelectSound();
            
            // Add click handler to overlay to exit zoom
            overlay.addEventListener('click', exitZoomMode);
        }
    }

    // Exit zoom mode
    function exitZoomMode() {
        if (isZoomed) {
            const zoomedItem = document.querySelector('.zoomed');
            const overlay = document.querySelector('.zoom-overlay');
            
            if (zoomedItem) {
                zoomedItem.classList.remove('zoomed');
            }
            
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            }
            
            document.body.classList.remove('zoom-mode');
            isZoomed = false;
            
            // Clear list navigation state so next escape goes back to menu
            listItems.forEach(item => item.classList.remove('keyboard-selected'));
            listNavigationActive = false;
            currentListIndex = -1;
            
            AudioManager.playNavigationSound();
        }
    }

    // Initialize list items on content pages
    initializeListItems();

    // Navigate to selected option
    menuOptions.forEach((option, index) => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update keyboard selection to clicked item
            updateSelection(index);
            
            // Navigate
            navigateToSelected();
        });
        
        // Remove keyboard selection on mouse hover
        option.addEventListener('mouseenter', () => {
            if (keyboardNavigationActive) {
                updateSelection(index);
            }
        });
    });
    
    // Add click handlers for contact buttons (no navigation, just sound)
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach((button) => {
        button.addEventListener('click', () => {
            AudioManager.playSelectSound();
        });
    });
    
    // Update visual selection for any element array
    function updateSelectionForElements(newIndex, elements) {
        // Remove selection from all elements
        elements.forEach(element => {
            element.classList.remove('keyboard-selected');
        });
        
        // Add selection to current element
        if (elements[newIndex]) {
            elements[newIndex].classList.add('keyboard-selected');
            currentIndex = newIndex;
            keyboardNavigationActive = true;
        }
    }
    
    // Navigate to selected element from any element array
    function navigateToSelectedElement(elements) {
        if (elements[currentIndex]) {
            const selectedElement = elements[currentIndex];
            
            // Get target page from href attribute
            let targetPage = selectedElement.href;
            
            // If href is absolute, make it relative
            if (targetPage.includes('localhost:8000')) {
                targetPage = targetPage.replace('http://localhost:8000/', '');
            }
            
            // Play sound
            AudioManager.playSelectSound();
            
            // Navigate after short delay
            setTimeout(() => {
                window.location.href = targetPage;
            }, 150);
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Handle zoom mode first
        if (isZoomed) {
            switch(e.key) {
                case 'Escape':
                case 'Backspace':
                case 'q':
                case 'Q':
                    e.preventDefault();
                    exitZoomMode();
                    break;
            }
            return; // Don't handle other keys in zoom mode
        }

        // Check if we should use list navigation or menu navigation
        const onContentPage = listItems.length > 0;
        
        // Handle content page navigation (list items + back button + contact buttons)
        if (onContentPage) {
            const currentBackButton = document.querySelector('.back-button');
            const contactButtons = document.querySelectorAll('.contact-button');
            const allNavigableElements = [...listItems];
            if (currentBackButton) {
                allNavigableElements.push(currentBackButton);
            }
            contactButtons.forEach(button => allNavigableElements.push(button));
            
            switch(e.key) {
                case 'ArrowDown':
                case 's':
                case 'S':
                case 'j':
                case 'J':
                    e.preventDefault();
                    if (listNavigationActive) {
                        const nextIndex = (currentListIndex + 1) % listItems.length;
                        selectListItem(nextIndex);
                    } else {
                        // Start list navigation
                        selectListItem(0);
                    }
                    break;
                    
                case 'ArrowUp':
                case 'w':
                case 'W':
                case 'k':
                case 'K':
                    e.preventDefault();
                    if (listNavigationActive) {
                        const prevIndex = (currentListIndex - 1 + listItems.length) % listItems.length;
                        selectListItem(prevIndex);
                    } else {
                        // Start list navigation from last item
                        selectListItem(listItems.length - 1);
                    }
                    break;
                    
                case 'Enter':
                case ' ':
                case 'z':
                case 'Z':
                    e.preventDefault();
                    if (listNavigationActive && currentListIndex >= 0) {
                        zoomListItem();
                    }
                    break;
                    
                case 'Tab':
                    e.preventDefault();
                    // Switch between list navigation and other elements
                    if (listNavigationActive) {
                        // Clear list selection and select back button or contact buttons
                        listItems.forEach(item => item.classList.remove('keyboard-selected'));
                        listNavigationActive = false;
                        currentListIndex = -1;
                        
                        // Select back button if available
                        if (currentBackButton) {
                            currentIndex = allNavigableElements.length - (contactButtons.length > 0 ? contactButtons.length + 1 : 1);
                            updateSelectionForElements(currentIndex, allNavigableElements);
                        }
                    } else {
                        // Start list navigation
                        selectListItem(0);
                    }
                    break;
                    
                case 'Escape':
                case 'Backspace':
                    e.preventDefault();
                    if (listNavigationActive) {
                        // Clear list selection first
                        listItems.forEach(item => item.classList.remove('keyboard-selected'));
                        listNavigationActive = false;
                        currentListIndex = -1;
                        AudioManager.playNavigationSound();
                    } else if (currentBackButton) {
                        // Go back to menu
                        currentBackButton.click();
                    }
                    break;
            }
        } else {
            // Handle main menu navigation
            const currentBackButton = document.querySelector('.back-button');
            const contactButtons = document.querySelectorAll('.contact-button');
            const navigableElements = [...menuOptions];
            if (currentBackButton) {
                navigableElements.push(currentBackButton);
            }
            contactButtons.forEach(button => navigableElements.push(button));
            
            switch(e.key) {
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % navigableElements.length;
                    updateSelectionForElements(nextIndex, navigableElements);
                    AudioManager.playNavigationSound();
                    break;
                    
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + navigableElements.length) % navigableElements.length;
                    updateSelectionForElements(prevIndex, navigableElements);
                    AudioManager.playNavigationSound();
                    break;
                    
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    navigateToSelectedElement(navigableElements);
                    break;
                    
                case 'Escape':
                    // Clear keyboard selection
                    navigableElements.forEach(element => {
                        element.classList.remove('keyboard-selected');
                    });
                    keyboardNavigationActive = false;
                    break;
            }
        }
    });
    
    // Add music toggle
    const musicToggle = document.createElement('button');
    musicToggle.classList.add('music-toggle');
    musicToggle.innerHTML = '🔊';
    musicToggle.title = 'Toggle Music';
    document.body.appendChild(musicToggle);
    
    musicToggle.addEventListener('click', () => {
        musicToggle.innerHTML = AudioManager.toggleMusic();
        AudioManager.musicPlaying = !AudioManager.musicPlaying;
    });
    
    // Keyboard navigation for pages (back to menu)
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        // Make back button keyboard accessible
        backButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                backButton.click();
            }
        });
        
        // Note: Global escape/backspace handling is done in the main keyboard handler above
        // to properly respect zoom mode and list navigation state
    }
});