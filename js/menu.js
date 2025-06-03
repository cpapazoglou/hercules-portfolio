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
        // Get current navigable elements (including back button if on content page)
        const currentBackButton = document.querySelector('.back-button');
        const contactButtons = document.querySelectorAll('.contact-button');
        const navigableElements = [...menuOptions];
        if (currentBackButton) {
            navigableElements.push(currentBackButton);
        }
        // Add contact buttons if they exist
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
        
        // Add global keyboard shortcut to go back
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Backspace') {
                e.preventDefault();
                backButton.click();
            }
        });
    }
});