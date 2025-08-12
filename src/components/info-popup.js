import { LitElement, html, css } from 'lit';

// Lit Web Component for info popup
class InfoPopup extends LitElement {
    static styles = css`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        }

        .info-button {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            border: 2px solid #000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            pointer-events: auto;
            transition: all 0.3s ease;
            z-index: 1001;
        }

        .info-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }

        .info-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #001122, #003366);
            border: 3px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            display: none;
            pointer-events: auto;
            z-index: 1002;
        }

        .info-popup.show {
            display: block;
        }

        .info-content {
            color: #ffd700;
            text-align: center;
        }

        .info-content h3 {
            margin: 0 0 15px 0;
            font-size: 24px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .info-content p {
            margin: 10px 0;
            line-height: 1.6;
            font-size: 16px;
        }

        .close-info {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: #ffd700;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
        }

        .close-info:hover {
            color: #ffffff;
        }
    `;

    constructor() {
        super();
        this.isPopupOpen = false;
    }

    toggleInfo() {
        this.isPopupOpen = !this.isPopupOpen;
        this.requestUpdate();
    }

    closeInfo() {
        this.isPopupOpen = false;
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="info-button" @click="${this.toggleInfo}">ℹ️</div>
            <div class="info-popup ${this.isPopupOpen ? 'show' : ''}">
                <div class="info-content">
                    <h3>About This Portfolio</h3>
                    <p>This is the <strong>heroic version</strong> of Charalampos Papazoglou's CV, inspired by the 12 labors of Hercules from Greek mythology.</p>
                    <p>Navigate through the legendary journey of skills, experience, and achievements! 🏛️⚡</p>
                    <button class="close-info" @click="${this.closeInfo}">×</button>
                </div>
            </div>
        `;
    }
}

// Define the custom element
customElements.define('info-popup', InfoPopup);