// Component loader for common HTML elements
class ComponentLoader {
    constructor() {
        this.components = {};
        this.basePath = '';
        this.isSubPage = window.location.pathname.includes('/pages/');
        this.basePath = this.isSubPage ? '../' : '';
    }

    // Register a component template
    registerComponent(name, template) {
        this.components[name] = template;
    }

    // Load a component by name with optional data
    loadComponent(name, data = {}) {
        if (!this.components[name]) {
            console.warn(`Component '${name}' not found`);
            return '';
        }

        let html = this.components[name];
        
        // Simple template replacement
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, data[key]);
        });

        // Replace basePath placeholders
        html = html.replace(/{{basePath}}/g, this.basePath);

        return html;
    }

    // Inject component into DOM element
    injectComponent(elementId, componentName, data = {}) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = this.loadComponent(componentName, data);
        }
    }

    // Initialize common components
    init() {
        this.registerComponents();
        this.loadCommonComponents();
    }

    registerComponents() {
        // Head component for meta tags and links
        this.registerComponent('head', `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/svg+xml" href="{{basePath}}assets/images/thunder-favicon.svg">
            <link rel="stylesheet" href="{{basePath}}css/main.css">
            <link rel="stylesheet" href="{{basePath}}css/arcade.css">
        `);

        // Info popup component
        this.registerComponent('infoPopup', `
            <div class="info-button" id="infoButton">ℹ️</div>
            <div class="info-popup" id="infoPopup">
                <div class="info-content">
                    <h3>About This Portfolio</h3>
                    <p>This is the <strong>heroic version</strong> of Charalampos Papazoglou's CV, inspired by the 12 labors of Hercules from Greek mythology.</p>
                    <p>Navigate through the legendary journey of skills, experience, and achievements! 🏛️⚡</p>
                    <button class="close-info" onclick="closeInfo()">×</button>
                </div>
            </div>
        `);

        // Scripts component
        this.registerComponent('scripts', `
            <script src="{{basePath}}js/menu.js"></script>
            <script src="{{basePath}}js/info.js"></script>
        `);

        // Back button component
        this.registerComponent('backButton', `
            <a href="{{basePath}}index.html" class="back-button" tabindex="0">Back</a>
        `);

        // Keyboard instructions component
        this.registerComponent('keyboardInstructions', `
            <div class="keyboard-instructions">
                {{instructions}}
            </div>
        `);
    }

    loadCommonComponents() {
        // Load head elements
        const headElements = this.loadComponent('head');
        const headNode = document.head;
        if (headNode) {
            // Create a temporary div to parse the HTML
            const temp = document.createElement('div');
            temp.innerHTML = headElements;
            
            // Append each child to head
            Array.from(temp.children).forEach(child => {
                headNode.appendChild(child);
            });
        }
        
        // Load info popup if container exists
        this.injectComponent('infoPopupContainer', 'infoPopup');
        
        // Load scripts if container exists
        this.injectComponent('scriptsContainer', 'scripts');
        
        // Load back button if container exists
        this.injectComponent('backButtonContainer', 'backButton');
        
        // Load keyboard instructions if container exists
        const defaultInstructions = this.isSubPage 
            ? '⌨️ Arrow Keys: Navigate • Enter: Zoom/Back • Tab: Switch modes • Escape: Back/Exit'
            : '⌨️ Use ↑↓ to navigate, Enter to select';
        
        this.injectComponent('keyboardInstructionsContainer', 'keyboardInstructions', {
            instructions: defaultInstructions
        });
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const componentLoader = new ComponentLoader();
    componentLoader.init();
});

// Export for potential use in other scripts
window.ComponentLoader = ComponentLoader;