import { LitElement, html, css } from 'lit';

// Lit Web Component for loading common scripts
class ScriptLoader extends LitElement {
    static styles = css`
        :host {
            display: none;
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

    connectedCallback() {
        super.connectedCallback();
        this.loadScripts();
    }

    loadScripts() {
        // Load menu.js if not already loaded
        if (!document.querySelector('script[src*="menu.js"]')) {
            const menuScript = document.createElement('script');
            menuScript.src = `${this.basePath}js/menu.js`;
            document.head.appendChild(menuScript);
        }

        // Load info.js if not already loaded
        if (!document.querySelector('script[src*="info.js"]')) {
            const infoScript = document.createElement('script');
            infoScript.src = `${this.basePath}js/info.js`;
            document.head.appendChild(infoScript);
        }
    }

    render() {
        return html`<!-- Scripts loaded via connectedCallback -->`;
    }
}

// Define the custom element
customElements.define('script-loader', ScriptLoader);