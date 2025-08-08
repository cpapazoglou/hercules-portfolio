document.addEventListener('DOMContentLoaded', () => {
    const menuOptions = document.querySelectorAll('.menu-option');
    const ASSET_BASE = window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
    
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
            
            // Get target page from href attribute (handles relative or absolute URLs)
            const targetPage = selectedOption.getAttribute('href');
            
            // Create lightning effect
            createLightningEffect();
            
            // Play sound
            AudioManager.playSelectSound();
            
            // Navigate after lightning effect
            setTimeout(() => {
                window.location.href = targetPage;
            }, 600);
        }
    }
    
    // Create lightning effect for navigation
    function createLightningEffect() {
        // Create lightning bolt element
        const lightning = document.createElement('div');
        lightning.innerHTML = '⚡';
        lightning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 120px;
            color: #ffcc00;
            z-index: 10000;
            pointer-events: none;
            text-shadow: 0 0 30px #ffcc00, 0 0 60px #ff9900, 0 0 90px #ff6600;
            animation: navigationLightning 0.6s ease-out forwards;
        `;
        
        // Add lightning animation keyframes if not exists
        if (!document.querySelector('#lightning-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'lightning-animation-styles';
            style.textContent = `
                @keyframes navigationLightning {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5);
                        filter: brightness(1);
                    }
                    20% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1.5);
                        filter: brightness(3);
                    }
                    40% {
                        opacity: 0.8;
                        transform: translate(-50%, -50%) scale(1.2);
                        filter: brightness(2);
                    }
                    60% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1.4);
                        filter: brightness(4);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(2);
                        filter: brightness(1);
                    }
                }
                
                @keyframes screenFlash {
                    0% { background: transparent; }
                    10% { background: rgba(255, 204, 0, 0.1); }
                    20% { background: transparent; }
                    30% { background: rgba(255, 204, 0, 0.05); }
                    40% { background: transparent; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create screen flash overlay
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            pointer-events: none;
            animation: screenFlash 0.6s ease-out;
        `;
        
        // Add elements to page
        document.body.appendChild(lightning);
        document.body.appendChild(flash);
        
        // Remove elements after animation
        setTimeout(() => {
            if (lightning.parentNode) lightning.parentNode.removeChild(lightning);
            if (flash.parentNode) flash.parentNode.removeChild(flash);
        }, 600);
    }
    
    // Consolidated audio system
    const AudioManager = {
        // UI/FX sounds
        selectSound: new Audio(ASSET_BASE + 'assets/sounds/select.wav'),
        // Fallback theme file (not auto-played; used only if Web Audio fails)
        themeMusic: new Audio(ASSET_BASE + 'assets/sounds/theme.wav'),

        // State
        useRealAudio: true,
        musicPlaying: false,

        // Web Audio API
        audioContext: null,
        masterGainNode: null,
        delayNode: null,
        feedbackGainNode: null,
        backgroundOscillators: [],
        melodyIntervalId: null,

        init() {
            this.selectSound.addEventListener('error', () => {
                this.useRealAudio = false;
            });

            // Prepare fallback theme
            this.themeMusic.loop = true;
            this.themeMusic.preload = 'auto';
            this.themeMusic.volume = 0.35;
        },

        // Create or reuse AudioContext safely
        ensureAudioContext() {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            return this.audioContext;
        },

        // Play a brief synthetic blip (for navigation/select fallback)
        createSyntheticSound(frequency, gain, duration) {
            try {
                const audioCtx = this.ensureAudioContext();
                const oscillator = audioCtx.createOscillator();
                const blipGain = audioCtx.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
                blipGain.gain.setValueAtTime(gain, audioCtx.currentTime);
                blipGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

                oscillator.connect(blipGain).connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + duration);

                oscillator.addEventListener('ended', () => {
                    try {
                        oscillator.disconnect();
                        blipGain.disconnect();
                    } catch (_) {}
                });
            } catch (_) {
                // Ignore
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

        // Build a simple mythical ambience using Web Audio
        startMythicTheme() {
            try {
                const audioCtx = this.ensureAudioContext();
                if (audioCtx.state === 'suspended') {
                    // Attempt to resume on user gesture
                    audioCtx.resume().catch(() => {});
                }

                // Master gain
                this.masterGainNode = audioCtx.createGain();
                this.masterGainNode.gain.setValueAtTime(0.23, audioCtx.currentTime);

                // Subtle echo to emulate cavernous temple
                this.delayNode = audioCtx.createDelay(1.5);
                this.delayNode.delayTime.setValueAtTime(0.35, audioCtx.currentTime);

                this.feedbackGainNode = audioCtx.createGain();
                this.feedbackGainNode.gain.setValueAtTime(0.25, audioCtx.currentTime);

                // Connect feedback loop: delay -> feedback -> delay
                this.delayNode.connect(this.feedbackGainNode);
                this.feedbackGainNode.connect(this.delayNode);

                // Route: master -> [delay -> feedback] -> destination
                this.masterGainNode.connect(this.delayNode);
                this.masterGainNode.connect(audioCtx.destination);
                this.delayNode.connect(audioCtx.destination);

                // Low drone (two detuned saws for a chorus effect)
                const baseFrequencyHz = 164.81; // E3 ~ Phrygian vibe
                const droneGain = audioCtx.createGain();
                droneGain.gain.setValueAtTime(0.12, audioCtx.currentTime);

                const droneOscA = audioCtx.createOscillator();
                droneOscA.type = 'sawtooth';
                droneOscA.frequency.setValueAtTime(baseFrequencyHz, audioCtx.currentTime);
                droneOscA.detune.setValueAtTime(-7, audioCtx.currentTime);

                const droneOscB = audioCtx.createOscillator();
                droneOscB.type = 'sawtooth';
                droneOscB.frequency.setValueAtTime(baseFrequencyHz, audioCtx.currentTime);
                droneOscB.detune.setValueAtTime(7, audioCtx.currentTime);

                droneOscA.connect(droneGain).connect(this.masterGainNode);
                droneOscB.connect(droneGain);

                droneOscA.start();
                droneOscB.start();

                this.backgroundOscillators.push(droneOscA, droneOscB, droneGain);

                // Soft lead that steps through a Phrygian-like scale
                const leadGain = audioCtx.createGain();
                leadGain.gain.setValueAtTime(0.05, audioCtx.currentTime);

                const leadOsc = audioCtx.createOscillator();
                leadOsc.type = 'sine';
                leadOsc.connect(leadGain).connect(this.masterGainNode);
                leadOsc.start();

                this.backgroundOscillators.push(leadOsc, leadGain);

                // Phrygian scale intervals (in semitones): 0, 1, 3, 5, 7, 8, 10
                const semitone = Math.pow(2, 1 / 12);
                const scaleSemitones = [0, 1, 3, 5, 7, 8, 10];
                let stepIndex = 0;

                const updateLead = () => {
                    const octaveOffset = (stepIndex % 14 === 0) ? 12 : 0; // occasional lift
                    const interval = scaleSemitones[stepIndex % scaleSemitones.length] + octaveOffset;
                    const freq = baseFrequencyHz * Math.pow(semitone, interval);

                    // Gentle glide to next note
                    leadOsc.frequency.cancelScheduledValues(audioCtx.currentTime);
                    leadOsc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.25);

                    // Small swell on note change
                    leadGain.gain.cancelScheduledValues(audioCtx.currentTime);
                    leadGain.gain.setTargetAtTime(0.08, audioCtx.currentTime, 0.2);
                    leadGain.gain.setTargetAtTime(0.05, audioCtx.currentTime + 0.6, 0.6);

                    stepIndex += 1;
                };

                // Start melody updates
                updateLead();
                this.melodyIntervalId = setInterval(updateLead, 1800);

                this.musicPlaying = true;
                return true;
            } catch (error) {
                // Fallback to static file if Web Audio fails
                try {
                    this.themeMusic.currentTime = 0;
                    this.themeMusic.play();
                    this.musicPlaying = true;
                    return true;
                } catch (_) {
                    return false;
                }
            }
        },

        stopMythicTheme() {
            // Stop Web Audio graph if present
            try {
                if (this.melodyIntervalId) {
                    clearInterval(this.melodyIntervalId);
                    this.melodyIntervalId = null;
                }

                this.backgroundOscillators.forEach(node => {
                    try {
                        if (typeof node.stop === 'function') {
                            node.stop(0);
                        }
                        node.disconnect && node.disconnect();
                    } catch (_) {}
                });
                this.backgroundOscillators = [];

                if (this.masterGainNode) {
                    try { this.masterGainNode.disconnect(); } catch (_) {}
                    this.masterGainNode = null;
                }
                if (this.delayNode) {
                    try { this.delayNode.disconnect(); } catch (_) {}
                    this.delayNode = null;
                }
                if (this.feedbackGainNode) {
                    try { this.feedbackGainNode.disconnect(); } catch (_) {}
                    this.feedbackGainNode = null;
                }

                // Also pause fallback theme if it was used
                try { this.themeMusic.pause(); } catch (_) {}

                this.musicPlaying = false;
            } catch (_) {
                this.musicPlaying = false;
            }
        },

        toggleMusic() {
            if (this.musicPlaying) {
                this.stopMythicTheme();
                return '🔈';
            } else {
                const started = this.startMythicTheme();
                return started ? '🔊' : '🔈';
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
    let backButtonMode = false;

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
        // Clear previous selection and back button mode
        listItems.forEach(item => item.classList.remove('keyboard-selected'));
        clearBackButtonSelection();
        
        if (index >= 0 && index < listItems.length) {
            currentListIndex = index;
            listItems[currentListIndex].classList.add('keyboard-selected');
            listNavigationActive = true;
            backButtonMode = false;
            
            // Scroll item into view if needed
            listItems[currentListIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            AudioManager.playNavigationSound();
        }
    }

    // Select back button
    function selectBackButton() {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            // Clear list selection
            listItems.forEach(item => item.classList.remove('keyboard-selected'));
            listNavigationActive = false;
            currentListIndex = -1;
            
            // Clear menu option selection (for contact page)
            menuOptions.forEach(option => option.classList.remove('keyboard-selected'));
            
            // Select back button
            backButton.classList.add('keyboard-selected');
            backButtonMode = true;
            
            AudioManager.playNavigationSound();
        }
    }

    // Clear back button selection
    function clearBackButtonSelection() {
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.classList.remove('keyboard-selected');
        }
        backButtonMode = false;
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
            clearBackButtonSelection();
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
            
            // Get target page from href attribute (handles relative or absolute URLs)
            const targetPage = selectedElement.getAttribute('href');
            
            // Create lightning effect
            createLightningEffect();
            
            // Play sound
            AudioManager.playSelectSound();
            
            // Navigate after lightning effect
            setTimeout(() => {
                window.location.href = targetPage;
            }, 600);
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
        const onContactPage = window.location.pathname.includes('contact.html');
        
        // Handle content page navigation (list items + back button + contact buttons)
        if (onContentPage || onContactPage) {
            const currentBackButton = document.querySelector('.back-button');
            const contactButtons = document.querySelectorAll('.contact-button');
            
            // Create combined navigation array for content pages
            let navigableItems = [...listItems];
            if (currentBackButton) {
                navigableItems.push(currentBackButton);
            }
            
            // For contact page, use menu options + back button
            if (onContactPage) {
                navigableItems = [...menuOptions];
                if (currentBackButton) {
                    navigableItems.push(currentBackButton);
                }
            }
            
            switch(e.key) {
                case 'ArrowDown':
                case 's':
                case 'S':
                case 'j':
                case 'J':
                    e.preventDefault();
                    if (onContactPage) {
                        // Navigate through menu options and back button
                        let nextIndex;
                        if (backButtonMode) {
                            // From back button, go to first menu option
                            nextIndex = 0;
                            updateSelection(nextIndex);
                            clearBackButtonSelection();
                        } else {
                            nextIndex = (currentIndex + 1) % (menuOptions.length + 1);
                            if (nextIndex === menuOptions.length) {
                                // Select back button
                                selectBackButton();
                            } else {
                                updateSelection(nextIndex);
                                clearBackButtonSelection();
                            }
                        }
                        AudioManager.playNavigationSound();
                    } else {
                        // Navigate through list items and back button
                        if (backButtonMode) {
                            // From back button, go to first list item
                            selectListItem(0);
                        } else if (listNavigationActive) {
                            if (currentListIndex === listItems.length - 1) {
                                // From last list item, go to back button
                                selectBackButton();
                            } else {
                                const nextIndex = currentListIndex + 1;
                                selectListItem(nextIndex);
                            }
                        } else {
                            // Start with first list item
                            selectListItem(0);
                        }
                    }
                    break;
                    
                case 'ArrowUp':
                case 'w':
                case 'W':
                case 'k':
                case 'K':
                    e.preventDefault();
                    if (onContactPage) {
                        // Navigate through menu options and back button
                        let prevIndex;
                        if (backButtonMode) {
                            // From back button, go to last menu option
                            prevIndex = menuOptions.length - 1;
                            updateSelection(prevIndex);
                            clearBackButtonSelection();
                        } else {
                            if (currentIndex === 0) {
                                // From first menu option, go to back button
                                selectBackButton();
                            } else {
                                prevIndex = currentIndex - 1;
                                updateSelection(prevIndex);
                                clearBackButtonSelection();
                            }
                        }
                        AudioManager.playNavigationSound();
                    } else {
                        // Navigate through list items and back button
                        if (backButtonMode) {
                            // From back button, go to last list item
                            selectListItem(listItems.length - 1);
                        } else if (listNavigationActive) {
                            if (currentListIndex === 0) {
                                // From first list item, go to back button
                                selectBackButton();
                            } else {
                                const prevIndex = currentListIndex - 1;
                                selectListItem(prevIndex);
                            }
                        } else {
                            // Start with back button
                            selectBackButton();
                        }
                    }
                    break;
                    
                case 'Enter':
                case ' ':
                case 'z':
                case 'Z':
                    e.preventDefault();
                    if (onContactPage) {
                        // On contact page, open the selected link or back button
                        if (backButtonMode && currentBackButton) {
                            // If back button is selected, navigate back
                            AudioManager.playSelectSound();
                            window.location.href = currentBackButton.href;
                        } else if (menuOptions[currentIndex]) {
                            const selectedOption = menuOptions[currentIndex];
                            AudioManager.playSelectSound();
                            // Open external links safely
                            if (selectedOption.target === '_blank') {
                                window.open(selectedOption.href, '_blank', 'noopener,noreferrer');
                            } else {
                                window.location.href = selectedOption.href;
                            }
                        }
                    } else if (listNavigationActive && currentListIndex >= 0) {
                        zoomListItem();
                    } else if (backButtonMode && currentBackButton) {
                        // If back button is selected, trigger it
                        currentBackButton.click();
                    } else if (currentBackButton) {
                        // If nothing is selected, default to back button
                        currentBackButton.click();
                    }
                    break;
                    
                case 'Tab':
                    e.preventDefault();
                    if (onContactPage) {
                        // On contact page, switch to back button
                        selectBackButton();
                    } else if (listNavigationActive) {
                        // Switch to back button mode
                        selectBackButton();
                    } else if (backButtonMode) {
                        // Switch to list navigation
                        selectListItem(0);
                    } else {
                        // Start with list navigation
                        selectListItem(0);
                    }
                    break;
                    
                case 'Escape':
                case 'Backspace':
                    e.preventDefault();
                    if (onContactPage) {
                        // On contact page, go back to menu immediately
                        if (currentBackButton) {
                            currentBackButton.click();
                        }
                    } else if (listNavigationActive) {
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
    musicToggle.innerHTML = '🔈';
    musicToggle.title = 'Toggle Music';
    document.body.appendChild(musicToggle);

    musicToggle.addEventListener('click', () => {
        musicToggle.innerHTML = AudioManager.toggleMusic();
    });
    
    // Keyboard navigation for pages (back to menu)
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        // Add back button click handler
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Play sound
            AudioManager.playSelectSound();
            
            // Get target page from href
            const targetPage = backButton.href;
            
            // Navigate immediately
            window.location.href = targetPage;
        });
        
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