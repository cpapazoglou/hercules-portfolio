import { LitElement, html, css } from 'lit';

// Lit Web Component for Education page content
class EducationPage extends LitElement {
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

        .education-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .education-list li {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 237, 78, 0.05));
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .education-list li:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
            border-color: #ffed4e;
        }

        .education-list li:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
        }

        .education-list li strong {
            color: #ffd700;
            font-size: 20px;
            display: block;
            margin-bottom: 10px;
        }

        .education-list li small {
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

            .education-list li {
                padding: 20px;
            }

            .education-list li strong {
                font-size: 18px;
            }
        }
    `;

    render() {
        return html`
            <div class="container">
                <h1 class="title">Education</h1>
                <p class="description">The sacred scrolls of knowledge and divine wisdom gained through epic scholarly quests and legendary academic adventures!</p>
                <ul class="education-list">
                    <li>🎓 <strong>Master of Science in Computer Science</strong><br>
                        <small style="color: #ff9900;">University of Athens | Temple of Digital Wisdom (2013 - 2015)<br>
                        • Mastered the sacred arts of algorithms and data structures<br>
                        • Thesis: "Distributed Systems Architecture in the Age of Heroes"</small>
                    </li>
                    <li>📚 <strong>Bachelor of Engineering in Computer Engineering</strong><br>
                        <small style="color: #ff9900;">Technical University of Crete | Academy of Innovation (2009 - 2013)<br>
                        • Forged foundation in programming languages and system design<br>
                        • Final Project: "Web Application Framework for Modern Heroes"</small>
                    </li>
                    <li>⚡ <strong>Legendary Certifications & Divine Training</strong><br>
                        <small style="color: #ff9900;">• AWS Certified Solutions Architect (2023)<br>
                        • Google Cloud Professional Developer (2022)<br>
                        • Certified Kubernetes Administrator (2021)<br>
                        • React & Redux Mastery (2020)</small>
                    </li>
                    <li>🏆 <strong>Epic Academic Achievements</strong><br>
                        <small style="color: #ff9900;">• Dean's List for 6 consecutive semesters<br>
                        • Best Student Project Award (2013)<br>
                        • Technical Writing Excellence Medal (2012)<br>
                        • Mathematics Olympiad Regional Champion (2009)</small>
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
customElements.define('education-page', EducationPage);