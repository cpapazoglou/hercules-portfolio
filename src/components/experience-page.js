import { LitElement, html, css } from 'lit';

// Lit Web Component for Experience page content
class ExperiencePage extends LitElement {
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

        .experience-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .experience-list li {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 237, 78, 0.05));
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .experience-list li:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
            border-color: #ffed4e;
        }

        .experience-list li:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
        }

        .experience-list li strong {
            color: #ffd700;
            font-size: 20px;
            display: block;
            margin-bottom: 10px;
        }

        .experience-list li small {
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

            .experience-list li {
                padding: 20px;
            }

            .experience-list li strong {
                font-size: 18px;
            }
        }
    `;

    render() {
        return html`
            <div class="container">
                <h1 class="title">Experience</h1>
                <p class="description">The twelve legendary labors of my heroic coding odyssey - each epic quest conquered with divine strength, wisdom, and the blessing of the gods!</p>
                <ul class="experience-list">
                    <li>💪 <strong>Epic Achievements of Legend</strong><br>
                        <small style="color: #ff9900;">• <strong>Slayed the Nine-Headed Hydra of Legacy Code</strong> - Achieved <strong>10% faster time-to-market</strong> through divine refactoring!<br>
                        • <strong>Captured the Golden Fleece of Performance</strong> - Unleashed <strong>55% Core Web Vitals boost</strong> with SSR & Lazy Loading magic!<br>
                        • <strong>Tamed the Nemean Lion of Revenue</strong> - Conquered the <strong>$1M ARR milestone</strong> in the WordPress.com Marketplace!</small>
                    </li>
                    <li>⚔️ <strong>Champion of WooCommerce</strong> - Automattic/WooCommerce (Jan 2025 - Apr 2025)<br>
                        <small style="color: #ff9900;">Remote Olympian | United <strong>20 warriors</strong> across <strong>10 kingdoms</strong>, unleashed <strong>55% performance lightning</strong> in Core Web Vitals!</small></li>
                    <li>🏛️ <strong>Golden Fleece Commander</strong> - WordPress.com Marketplace (Aug 2021 - Dec 2024)<br>
                        <small style="color: #ff9900;">Led <strong>5 heroic developers</strong> to capture <strong>$1M ARR treasure</strong> in just <strong>14 moons</strong>, with lightning-fast <strong>3-month conquests</strong>!</small></li>
                    <li>🌟 <strong>Divine UI/UX Architect</strong> - WordPress.com (Jun 2020 - Jul 2021)<br>
                        <small style="color: #ff9900;">Forged legendary interfaces that enchanted users, boosting retention by <strong>13%</strong> with React, PHP, and CSS sorcery!</small></li>
                    <li>⚡ <strong>Lighthouse Guardian</strong> - Senior Lead Developer (Mar 2017 - May 2020)<br>
                        <small style="color: #ff9900;">Athens Citadel | Boosted project might by <strong>25%</strong>, mentored <strong>5 apprentice heroes</strong>, slashed bugs by <strong>23%</strong>!</small></li>
                    <li>🎯 <strong>Master Craftsman of the Web</strong> - Netstudio (Jun 2015 - Feb 2017)<br>
                        <small style="color: #ff9900;">Greek Realm | Forged <strong>24 legendary e-commerce temples</strong> using the ancient arts of Drupal, WordPress, and Shopify!</small></li>
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
customElements.define('experience-page', ExperiencePage);