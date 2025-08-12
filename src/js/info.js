// Info button functionality - now handled by Lit components
// This file is kept for backward compatibility but functionality is moved to components

// Global function for backwards compatibility (if needed)
function closeInfo() {
    // Try to find and interact with the Lit component
    const infoPopup = document.querySelector('info-popup');
    if (infoPopup && infoPopup.closeInfo) {
        infoPopup.closeInfo();
    }
}

// Note: The info popup functionality is now handled by the Lit component 
// with proper encapsulation and reactive properties.
