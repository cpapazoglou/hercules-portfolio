// Web Component for info popup
class InfoPopup extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="info-button" id="infoButton">ℹ️</div>
            <div class="info-popup" id="infoPopup">
                <div class="info-content">
                    <h3>About This Portfolio</h3>
                    <p>This is the <strong>heroic version</strong> of Charalampos Papazoglou's CV, inspired by the 12 labors of Hercules from Greek mythology.</p>
                    <p>Navigate through the legendary journey of skills, experience, and achievements! 🏛️⚡</p>
                    <button class="close-info" onclick="closeInfo()">×</button>
                </div>
            </div>
        `;
    }
}

// Define the custom element
customElements.define('info-popup', InfoPopup);