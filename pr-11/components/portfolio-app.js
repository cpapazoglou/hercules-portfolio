import { LitElement, html, css } from 'lit';

// Lit Web Component for main portfolio with client-side routing
class PortfolioApp extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, #001122, #003366);
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 237, 78, 0.1) 0%, transparent 50%),
                url('assets/images/hercules-background.svg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            overflow-y: auto;
        }

        .start-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            padding: 20px;
        }

        .title {
            font-size: 72px;
            color: #ffd700;
            text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
            margin-bottom: 40px;
            font-family: 'Times New Roman', serif;
            text-transform: uppercase;
            letter-spacing: 3px;
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .menu {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 15px;
            padding: 20px 60px;
            z-index: 2;
            max-height: 60vh;
            overflow-y: auto;
        }

        .menu-option {
            display: inline-block;
            margin: 20px;
            padding: 15px 30px;
            font-size: 24px;
            background-color: #ffcc00;
            border: 2px solid #ff0000;
            border-radius: 10px;
            text-decoration: none;
            color: #000;
            transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
            position: relative;
            cursor: pointer;
        }

        .menu-option:hover {
            background-color: #ff9900;
            transform: scale(1.1);
        }

        .menu-option:active {
            background-color: #ffcc00;
            transform: scale(0.95);
        }

        .menu-option.keyboard-selected {
            background-color: #ff9900;
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 204, 0, 0.8), 0 0 40px rgba(255, 153, 0, 0.6);
            animation: keyboardPulse 1.5s infinite;
        }

        @keyframes keyboardPulse {
            0%, 100% {
                box-shadow: 0 0 20px rgba(255, 204, 0, 0.8), 0 0 40px rgba(255, 153, 0, 0.6);
            }
            50% {
                box-shadow: 0 0 30px rgba(255, 204, 0, 1), 0 0 60px rgba(255, 153, 0, 0.8), 0 0 80px rgba(255, 102, 0, 0.4);
            }
        }

        .page-content {
            display: none;
            width: 100%;
            min-height: 100vh;
        }

        .page-content.active {
            display: block;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 48px;
            }

            .menu {
                padding: 15px 40px;
                gap: 10px;
            }

            .menu-option {
                margin: 10px;
                padding: 12px 25px;
                font-size: 20px;
            }
        }
    `;

    static properties = {
        currentPage: { type: String }
    };

    constructor() {
        super();
        this.currentPage = 'home';
    }

    connectedCallback() {
        super.connectedCallback();
        // Listen for keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.handleKeydown.bind(this));
    }

    handleKeydown(e) {
        if (this.currentPage !== 'home') {
            if (e.key === 'Escape') {
                this.navigateToPage('home');
            }
        }
    }

    navigateToPage(page) {
        this.currentPage = page;
        
        // Update browser history
        const newUrl = page === 'home' ? '/' : `#${page}`;
        if (window.location.hash !== newUrl && newUrl !== '/') {
            window.history.pushState({ page }, '', newUrl);
        } else if (newUrl === '/') {
            window.history.pushState({ page }, '', window.location.pathname);
        }
    }

    renderHomePage() {
        return html`
            <div class="start-screen">
                <h1 class="title">Charalampos Papazoglou</h1>
                <div class="menu">
                    <button class="menu-option" @click="${() => this.navigateToPage('experience')}">Experience</button>
                    <button class="menu-option" @click="${() => this.navigateToPage('education')}">Education</button>
                    <button class="menu-option" @click="${() => this.navigateToPage('hobbies')}">Hobbies</button>
                    <button class="menu-option" @click="${() => this.navigateToPage('contact')}">Contact</button>
                </div>
                <keyboard-instructions></keyboard-instructions>
            </div>
        `;
    }

    renderPageContent() {
        switch (this.currentPage) {
            case 'experience':
                return html`<experience-page></experience-page>`;
            case 'education':
                return html`<education-page></education-page>`;
            case 'hobbies':
                return html`<hobbies-page></hobbies-page>`;
            case 'contact':
                return html`<contact-page></contact-page>`;
            default:
                return this.renderHomePage();
        }
    }

    render() {
        return html`
            ${this.currentPage === 'home' ? this.renderHomePage() : ''}
            <div class="page-content ${this.currentPage !== 'home' ? 'active' : ''}">
                ${this.currentPage !== 'home' ? this.renderPageContent() : ''}
            </div>
        `;
    }
}

// Define the custom element
customElements.define('portfolio-app', PortfolioApp);