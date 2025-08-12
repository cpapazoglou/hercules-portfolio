import { LitElement, html, css } from 'lit';
import AudioManager from './audio-manager.js';

// Lit Web Component for back button
class BackButton extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
        }

        .back-button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            text-decoration: none;
            border: 2px solid #000;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }

        .back-button:hover {
            background: linear-gradient(135deg, #ffed4e, #ffd700);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }

        .back-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
    `;

    constructor() {
        super();
        this.basePath = this.getBasePath();
    }

    getBasePath() {
        // Determine if we're on a sub-page based on current URL
        const isSubPage = window.location.pathname.includes('/pages/');
        return isSubPage ? '../' : '';
    }

    handleBackClick(e) {
        // Play sound effect
        AudioManager.playSelectSound();
        
        // Check if we're in a SPA context
        const portfolioApp = document.querySelector('portfolio-app');
        if (portfolioApp) {
            e.preventDefault();
            portfolioApp.navigateToPage('home');
        }
        // Otherwise, let the default link behavior handle navigation
    }

    render() {
        return html`
            <a href="${this.basePath}index.html" class="back-button" tabindex="0" @click="${this.handleBackClick}">Back</a>
        `;
    }
}

// Define the custom element
customElements.define('back-button', BackButton);