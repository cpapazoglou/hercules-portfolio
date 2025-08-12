import { LitElement, html, css } from 'lit';

// Lit Web Component for keyboard instructions
class KeyboardInstructions extends LitElement {
    static styles = css`
        :host {
            display: block;
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
        }

        .keyboard-instructions {
            background: rgba(0, 17, 34, 0.9);
            color: #ffd700;
            padding: 10px 20px;
            border: 2px solid #ffd700;
            border-radius: 20px;
            font-size: 14px;
            text-align: center;
            backdrop-filter: blur(5px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            white-space: nowrap;
            min-width: 300px;
        }

        @media (max-width: 768px) {
            .keyboard-instructions {
                font-size: 12px;
                padding: 8px 16px;
                min-width: 250px;
                white-space: normal;
                line-height: 1.3;
            }
        }

        @media (max-width: 480px) {
            .keyboard-instructions {
                font-size: 11px;
                padding: 6px 12px;
                min-width: 200px;
            }
        }
    `;

    static properties = {
        instructions: { type: String }
    };

    constructor() {
        super();
        this.instructions = '';
    }

    connectedCallback() {
        super.connectedCallback();
        
        // Get custom instructions from attribute or use defaults
        const customInstructions = this.getAttribute('instructions');
        
        if (customInstructions) {
            this.instructions = customInstructions;
        } else {
            // Default instructions based on page type
            const isSubPage = window.location.pathname.includes('/pages/');
            this.instructions = isSubPage 
                ? '⌨️ Arrow Keys: Navigate • Enter: Zoom/Back • Tab: Switch modes • Escape: Back/Exit'
                : '⌨️ Use ↑↓ to navigate, Enter to select';
        }
    }

    render() {
        return html`
            <div class="keyboard-instructions">
                ${this.instructions}
            </div>
        `;
    }
}

// Define the custom element
customElements.define('keyboard-instructions', KeyboardInstructions);