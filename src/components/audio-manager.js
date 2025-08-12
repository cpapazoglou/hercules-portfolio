// Audio Manager for Web Components
// Provides sound effects and music functionality across all components

class AudioManagerService {
    constructor() {
        this.ASSET_BASE = window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
        
        // UI/FX sounds
        this.selectSound = new Audio(this.ASSET_BASE + 'assets/sounds/select.wav');
        // Mythical theme track (muted by default; only plays after click)
        this.themeMusic = new Audio(this.ASSET_BASE + 'assets/sounds/mythic-theme.mp3');

        // State
        this.useRealAudio = true;
        this.musicPlaying = false;
        
        this.init();
    }

    init() {
        this.selectSound.addEventListener('error', () => {
            this.useRealAudio = false;
        });

        // Preload select sound to minimize latency
        this.selectSound.preload = 'auto';
        try { this.selectSound.load(); } catch (_) {}

        // Prepare theme
        this.themeMusic.loop = true;
        this.themeMusic.preload = 'auto';
        this.themeMusic.volume = 0.45;
    }

    // Play a brief synthetic blip (fallback)
    createSyntheticSound(frequency, gain, duration) {
        try {
            // Minimal fallback using WebAudio if available
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const audioCtx = new AudioCtx();
            const startTone = () => {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(gain, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
                oscillator.connect(gainNode).connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + duration);
                oscillator.onended = () => {
                    try { oscillator.disconnect(); gainNode.disconnect(); audioCtx.close(); } catch (_) {}
                };
            };
            if (typeof audioCtx.resume === 'function' && audioCtx.state === 'suspended') {
                audioCtx.resume().then(startTone).catch(startTone);
            } else {
                startTone();
            }
        } catch (_) {
            // Ignore
        }
    }

    playSelectSound() {
        if (this.useRealAudio) {
            this.selectSound.currentTime = 0;
            this.selectSound.play().catch(() => this.createSyntheticSound(800, 0.3, 0.1));
        } else {
            this.createSyntheticSound(800, 0.3, 0.1);
        }
    }

    playNavigationSound() {
        this.createSyntheticSound(600, 0.1, 0.05);
    }

    startMythicTheme() {
        try {
            this.themeMusic.currentTime = 0;
            this.themeMusic.play().catch(() => {});
            this.musicPlaying = true;
            return true;
        } catch (_) {
            return false;
        }
    }

    stopMythicTheme() {
        try {
            this.themeMusic.pause();
            this.musicPlaying = false;
        } catch (_) {
            this.musicPlaying = false;
        }
    }

    toggleMusic() {
        if (this.musicPlaying) {
            this.stopMythicTheme();
            return '🔈';
        } else {
            const started = this.startMythicTheme();
            return started ? '🔊' : '🔈';
        }
    }

    // Create lightning effect for navigation
    createLightningEffect() {
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
}

// Create and export singleton instance
const AudioManager = new AudioManagerService();

// Make it globally available for compatibility
window.AudioManager = AudioManager;

export default AudioManager;