// Web Component for keyboard instructions
class KeyboardInstructions extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Get custom instructions from attribute or use defaults
        const customInstructions = this.getAttribute('instructions');
        let instructions;
        
        if (customInstructions) {
            instructions = customInstructions;
        } else {
            // Default instructions based on page type
            const isSubPage = window.location.pathname.includes('/pages/');
            instructions = isSubPage 
                ? '⌨️ Arrow Keys: Navigate • Enter: Zoom/Back • Tab: Switch modes • Escape: Back/Exit'
                : '⌨️ Use ↑↓ to navigate, Enter to select';
        }

        this.innerHTML = `
            <div class="keyboard-instructions">
                ${instructions}
            </div>
        `;
    }
}

// Define the custom element
customElements.define('keyboard-instructions', KeyboardInstructions);