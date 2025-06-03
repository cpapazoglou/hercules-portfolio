document.addEventListener('DOMContentLoaded', () => {
    const menuOptions = document.querySelectorAll('.menu-option');
    console.log('Found menu options:', menuOptions.length);
    
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
            
            console.log('Keyboard navigating to:', targetPage);
            
            // Play sound
            if (useRealAudio) {
                selectSound.currentTime = 0;
                selectSound.play().catch(() => createSyntheticSelectSound());
            } else {
                createSyntheticSelectSound();
            }
            
            // Navigate after short delay
            setTimeout(() => {
                console.log('Executing navigation to:', targetPage);
                window.location.href = targetPage;
            }, 150);
        }
    }
    
    // Create synthetic audio using Web Audio API
    const createSyntheticSelectSound = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (error) {
            console.log('Synthetic sound failed:', error);
        }
    };
    
    // Load audio files (optional)
    const selectSound = new Audio('assets/sounds/select.wav');
    let useRealAudio = true;
    
    selectSound.addEventListener('error', () => {
        useRealAudio = false;
    });
    
    // Navigation with proper URL construction
    menuOptions.forEach((option, index) => {
        console.log(`Setting up option ${index}:`, option.textContent, 'href:', option.href);
        
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
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
            case 's':
            case 'S':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % menuOptions.length;
                updateSelection(nextIndex);
                playNavigationSound();
                break;
                
            case 'ArrowUp':
            case 'w':
            case 'W':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + menuOptions.length) % menuOptions.length;
                updateSelection(prevIndex);
                playNavigationSound();
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                navigateToSelected();
                break;
                
            case 'Escape':
                // Clear keyboard selection
                menuOptions.forEach(option => {
                    option.classList.remove('keyboard-selected');
                });
                keyboardNavigationActive = false;
                break;
        }
    });
    
    // Play navigation sound (lighter than select sound)
    function playNavigationSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
            
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.05);
        } catch (error) {
            console.log('Navigation sound failed:', error);
        }
    }
    
    // Add music toggle
    const musicToggle = document.createElement('button');
    musicToggle.classList.add('music-toggle');
    musicToggle.innerHTML = '🔊';
    musicToggle.title = 'Toggle Music';
    musicToggle.style.position = 'absolute';
    musicToggle.style.top = '20px';
    musicToggle.style.right = '20px';
    musicToggle.style.width = '50px';
    musicToggle.style.height = '50px';
    musicToggle.style.borderRadius = '50%';
    musicToggle.style.backgroundColor = '#ffcc00';
    musicToggle.style.border = '2px solid #ff0000';
    musicToggle.style.cursor = 'pointer';
    document.body.appendChild(musicToggle);
    
    // Add keyboard navigation instructions
    const instructions = document.createElement('div');
    instructions.classList.add('keyboard-instructions');
    instructions.innerHTML = '⌨️ Use ↑↓ or W/S to navigate, Enter to select';
    instructions.style.position = 'absolute';
    instructions.style.bottom = '20px';
    instructions.style.left = '50%';
    instructions.style.transform = 'translateX(-50%)';
    instructions.style.color = '#ffcc00';
    instructions.style.fontSize = '14px';
    instructions.style.textAlign = 'center';
    instructions.style.opacity = '0.8';
    instructions.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.7)';
    instructions.style.fontFamily = 'Arial, sans-serif';
    instructions.style.padding = '10px';
    instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    instructions.style.borderRadius = '5px';
    instructions.style.backdropFilter = 'blur(3px)';
    document.body.appendChild(instructions);
  
    
    let musicPlaying = false;
    const themeMusic = new Audio('assets/sounds/theme.wav');
    themeMusic.loop = true;
    themeMusic.volume = 0.7;
    
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            themeMusic.pause();
            musicToggle.innerHTML = '🔈';
        } else {
            themeMusic.play().catch(e => console.log('Theme music requires user interaction'));
            musicToggle.innerHTML = '🔊';
        }
        musicPlaying = !musicPlaying;
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
        
        // Add instructions for pages
        const pageInstructions = document.createElement('div');
        pageInstructions.classList.add('keyboard-instructions');
        pageInstructions.innerHTML = '⌨️ Press Escape or Backspace to return to menu';
        pageInstructions.style.position = 'fixed';
        pageInstructions.style.bottom = '20px';
        pageInstructions.style.left = '50%';
        pageInstructions.style.transform = 'translateX(-50%)';
        pageInstructions.style.color = '#ffcc00';
        pageInstructions.style.fontSize = '14px';
        pageInstructions.style.textAlign = 'center';
        pageInstructions.style.opacity = '0.8';
        pageInstructions.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.7)';
        pageInstructions.style.fontFamily = 'Arial, sans-serif';
        pageInstructions.style.padding = '10px';
        pageInstructions.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        pageInstructions.style.borderRadius = '5px';
        pageInstructions.style.backdropFilter = 'blur(3px)';
        pageInstructions.style.zIndex = '1000';
        document.body.appendChild(pageInstructions);
    }
});