// Web Component for loading common scripts
class ScriptLoader extends HTMLElement {
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
}

// Define the custom element
customElements.define('script-loader', ScriptLoader);