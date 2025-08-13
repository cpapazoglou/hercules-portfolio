// Standalone Info Popup - Works without module imports

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', () => {
        // Add info button if not already present
        if (!document.querySelector('.info-button')) {
            const infoButton = document.createElement('button');
            infoButton.classList.add('info-button');
            infoButton.innerHTML = 'ℹ️';
            infoButton.title = 'About this portfolio';
            infoButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                border: 2px solid #000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                z-index: 1001;
            `;
            document.body.appendChild(infoButton);
            
            // Create popup element
            const infoPopup = document.createElement('div');
            infoPopup.classList.add('info-popup');
            infoPopup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #001122, #003366);
                border: 3px solid #ffd700;
                border-radius: 15px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                display: none;
                z-index: 1002;
                color: #ffd700;
                text-align: center;
            `;
            
            infoPopup.innerHTML = `
                <div class="info-content">
                    <h3 style="margin: 0 0 15px 0; font-size: 24px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">About This Portfolio</h3>
                    <p style="margin: 10px 0; line-height: 1.6; font-size: 16px;">This is the <strong>heroic version</strong> of Charalampos Papazoglou's CV, inspired by the 12 labors of Hercules from Greek mythology.</p>
                    <p style="margin: 10px 0; line-height: 1.6; font-size: 16px;">Navigate through the legendary journey of skills, experience, and achievements! 🏛️⚡</p>
                    <button class="close-info" style="
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        background: none;
                        border: none;
                        color: #ffd700;
                        font-size: 24px;
                        cursor: pointer;
                        padding: 0;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: color 0.3s ease;
                    ">×</button>
                </div>
            `;
            document.body.appendChild(infoPopup);
            
            const closeButton = infoPopup.querySelector('.close-info');
            
            // Toggle popup on info button click
            infoButton.addEventListener('click', () => {
                if (window.AudioManager) {
                    window.AudioManager.playSelectSound();
                }
                if (infoPopup.style.display === 'none' || !infoPopup.style.display) {
                    infoPopup.style.display = 'block';
                } else {
                    infoPopup.style.display = 'none';
                }
            });
            
            // Close popup on close button click
            closeButton.addEventListener('click', () => {
                if (window.AudioManager) {
                    window.AudioManager.playNavigationSound();
                }
                infoPopup.style.display = 'none';
            });
            
            // Close popup on outside click
            document.addEventListener('click', (e) => {
                if (infoPopup.style.display === 'block' && 
                    !infoPopup.contains(e.target) && 
                    !infoButton.contains(e.target)) {
                    if (window.AudioManager) {
                        window.AudioManager.playNavigationSound();
                    }
                    infoPopup.style.display = 'none';
                }
            });
            
            // Close popup on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && infoPopup.style.display === 'block') {
                    if (window.AudioManager) {
                        window.AudioManager.playNavigationSound();
                    }
                    infoPopup.style.display = 'none';
                }
            });
            
            // Hover effects
            infoButton.addEventListener('mouseenter', () => {
                infoButton.style.transform = 'scale(1.1)';
                infoButton.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
            });
            
            infoButton.addEventListener('mouseleave', () => {
                infoButton.style.transform = 'scale(1)';
                infoButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            
            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.color = '#ffffff';
            });
            
            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.color = '#ffd700';
            });
        }
    });
})();