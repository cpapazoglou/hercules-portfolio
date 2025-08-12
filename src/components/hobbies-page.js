import { LitElement, html, css } from 'lit';

// Lit Web Component for Hobbies page content
class HobbiesPage extends LitElement {
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

        .hobbies-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .hobbies-list li {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 237, 78, 0.05));
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }

        .hobbies-list li:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
            border-color: #ffed4e;
        }

        .hobbies-list li:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
        }

        .hobbies-list li strong {
            color: #ffd700;
            font-size: 20px;
            display: block;
            margin-bottom: 10px;
        }

        .hobbies-list li small {
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

            .hobbies-list li {
                padding: 20px;
            }

            .hobbies-list li strong {
                font-size: 18px;
            }
        }
    `;

    render() {
        return html`
            <div class="container">
                <h1 class="title">Hobbies</h1>
                <p class="description">The legendary pursuits and divine passions that fuel my heroic spirit beyond the realm of coding adventures!</p>
                <ul class="hobbies-list">
                    <li>🎮 <strong>Epic Gaming Adventures</strong><br>
                        <small style="color: #ff9900;">Master of strategy games, RPGs, and indie treasures | Building legendary gaming experiences and exploring virtual realms of infinite possibility!</small>
                    </li>
                    <li>🏛️ <strong>Ancient Greek History & Mythology</strong><br>
                        <small style="color: #ff9900;">Deep passion for the tales of gods and heroes | Studying the epic stories that inspire modern adventures and timeless wisdom!</small>
                    </li>
                    <li>📚 <strong>Technical Reading & Research</strong><br>
                        <small style="color: #ff9900;">Devouring books on software architecture, system design, and emerging technologies | Always questing for new knowledge and divine insights!</small>
                    </li>
                    <li>🎨 <strong>Digital Art & Design</strong><br>
                        <small style="color: #ff9900;">Creating pixel art, UI mockups, and graphic designs | Forging beautiful interfaces and artistic expressions in the digital realm!</small>
                    </li>
                    <li>🏃‍♂️ <strong>Athletic Training & Fitness</strong><br>
                        <small style="color: #ff9900;">Running, weightlifting, and martial arts | Maintaining the physical strength worthy of a legendary hero's coding odyssey!</small>
                    </li>
                    <li>🌍 <strong>Travel & Cultural Exploration</strong><br>
                        <small style="color: #ff9900;">Discovering new lands, cultures, and cuisines | Every journey adds new chapters to the epic tale of worldly experience!</small>
                    </li>
                    <li>🎵 <strong>Music & Audio Engineering</strong><br>
                        <small style="color: #ff9900;">Composing electronic music and sound design | Creating the epic soundtracks for digital adventures and heroic coding sessions!</small>
                    </li>
                </ul>
                <div class="back-button-container">
                    <back-button></back-button>
                </div>
                <keyboard-instructions></keyboard-instructions>
            </div>
        `;
    }
}

// Define the custom element
customElements.define('hobbies-page', HobbiesPage);