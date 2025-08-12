// Web Component for back button
class BackButton extends HTMLElement {
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
        this.innerHTML = `
            <a href="${this.basePath}index.html" class="back-button" tabindex="0">Back</a>
        `;
    }
}

// Define the custom element
customElements.define('back-button', BackButton);