// Lit Web Components loader - loads all component definitions
// This replaces the old ComponentLoader class with native Lit Components

// Import audio manager first
import('./audio-manager.js');

// Import all component definitions
import('./head-elements.js');
import('./info-popup.js');
import('./script-loader.js');
import('./back-button.js');
import('./keyboard-instructions.js');

// Import page components for single-page app functionality
import('./experience-page.js');
import('./education-page.js');
import('./hobbies-page.js');
import('./contact-page.js');
import('./portfolio-app.js');

console.log('Lit Web Components loaded successfully');