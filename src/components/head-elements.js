import { LitElement, html, css } from 'lit';

// Lit Web Component for common head elements
class HeadElements extends LitElement {
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
        this.loadHeadElements();
    }

    loadHeadElements() {
        const head = document.head;
        
        // Only add elements if they don't already exist
        if (!head.querySelector('meta[charset]')) {
            const charset = document.createElement('meta');
            charset.setAttribute('charset', 'UTF-8');
            head.appendChild(charset);
        }

        if (!head.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.setAttribute('name', 'viewport');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            head.appendChild(viewport);
        }

        if (!head.querySelector('link[rel="icon"]')) {
            const favicon = document.createElement('link');
            favicon.setAttribute('rel', 'icon');
            favicon.setAttribute('type', 'image/svg+xml');
            favicon.setAttribute('href', `${this.basePath}assets/images/thunder-favicon.svg`);
            head.appendChild(favicon);
        }

        if (!head.querySelector('link[href*="main.css"]')) {
            const mainCSS = document.createElement('link');
            mainCSS.setAttribute('rel', 'stylesheet');
            mainCSS.setAttribute('href', `${this.basePath}css/main.css`);
            head.appendChild(mainCSS);
        }

        if (!head.querySelector('link[href*="arcade.css"]')) {
            const arcadeCSS = document.createElement('link');
            arcadeCSS.setAttribute('rel', 'stylesheet');
            arcadeCSS.setAttribute('href', `${this.basePath}css/arcade.css`);
            head.appendChild(arcadeCSS);
        }
    }

    render() {
        return html`<!-- Head elements loaded via connectedCallback -->`;
    }
}

// Define the custom element
customElements.define('head-elements', HeadElements);