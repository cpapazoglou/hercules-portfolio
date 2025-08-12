import { LitElement, html, css } from 'lit';

// Lit Web Component for Contact page content
class ContactPage extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #ffd700;
            font-family: Arial, sans-serif;
        }

        .title {
            font-size: 48px;
            text-align: center;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
            color: #ffd700;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .description {
            text-align: center;
            font-size: 18px;
            margin-bottom: 40px;
            color: #ffed4e;
            font-style: italic;
            line-height: 1.6;
        }

        .contact-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .contact-list li {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 237, 78, 0.05));
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .contact-list li:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
            border-color: #ffed4e;
        }

        .contact-list li:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
        }

        .contact-list li strong {
            color: #ffd700;
            font-size: 20px;
            display: block;
            margin-bottom: 10px;
        }

        .contact-list li a {
            color: #ff9900;
            text-decoration: none;
            font-size: 16px;
            transition: color 0.3s ease;
        }

        .contact-list li a:hover {
            color: #ffed4e;
            text-shadow: 0 0 10px rgba(255, 237, 78, 0.5);
        }

        .contact-list li small {
            color: #ff9900;
            font-size: 14px;
            line-height: 1.5;
        }

        .back-button-container {
            text-align: center;
            margin-top: 40px;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 36px;
            }

            .container {
                padding: 20px 15px;
            }

            .contact-list li {
                padding: 20px;
            }

            .contact-list li strong {
                font-size: 18px;
            }
        }
    `;

    render() {
        return html`
            <div class="container">
                <h1 class="title">Contact</h1>
                <p class="description">Reach out to the legendary hero for epic collaborations, divine consultations, and heroic coding adventures!</p>
                <ul class="contact-list">
                    <li>📧 <strong>Divine Electronic Scroll</strong><br>
                        <a href="mailto:charalampos.papazoglou@gmail.com">charalampos.papazoglou@gmail.com</a><br>
                        <small>Send forth your messages through the sacred digital realm!</small>
                    </li>
                    <li>💼 <strong>Professional Network Portal</strong><br>
                        <a href="https://www.linkedin.com/in/charalampospapazoglou/" target="_blank">LinkedIn Profile</a><br>
                        <small>Connect on the legendary professional network of heroes!</small>
                    </li>
                    <li>⚡ <strong>Code Repository Sanctuary</strong><br>
                        <a href="https://github.com/cpapazoglou" target="_blank">GitHub Profile</a><br>
                        <small>Witness the epic code adventures and legendary repositories!</small>
                    </li>
                    <li>📝 <strong>Digital Chronicles Blog</strong><br>
                        <a href="https://cpapazoglou.blog/" target="_blank">Personal Blog</a><br>
                        <small>Read the tales of coding wisdom and technical adventures!</small>
                    </li>
                    <li>📄 <strong>Sacred Resume Scroll</strong><br>
                        <a href="assets/CharalamposPapazoglouResume.pdf" target="_blank">Download PDF Resume</a><br>
                        <small>The complete legendary tale in traditional format!</small>
                    </li>
                    <li>🌐 <strong>Digital Portfolio Realm</strong><br>
                        <a href="https://cpapazoglou.eu/" target="_blank">Portfolio Website</a><br>
                        <small>This very heroic domain where legends come to life!</small>
                    </li>
                </ul>
                <div class="back-button-container">
                    <back-button></back-button>
                </div>
                <keyboard-instructions instructions="📧 Ready to connect? Click any link to begin your epic communication quest!"></keyboard-instructions>
            </div>
        `;
    }
}

// Define the custom element
customElements.define('contact-page', ContactPage);