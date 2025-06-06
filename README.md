# Hercules Portfolio

A heroic arcade-themed portfolio website inspired by the legendary Hercules and classic arcade games.

🌐 **Live Site**: [https://cpapazoglou.eu/](https://cpapazoglou.eu/)

## Features

- 🎮 **Arcade Theme**: Retro gaming aesthetics with golden colors and classic styling
- ⌨️ **Keyboard Navigation**: Full keyboard support with arrow keys, WASD, Enter, and Escape
- 🎵 **Background Music**: Heroic theme music with toggle control
- 🎯 **Interactive Elements**: Hover effects, animations, and sound feedback
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🏛️ **Greek Mythology Theme**: Inspired by the twelve labors of Hercules

## Structure

```
src/                        # Source files
├── index.html              # Main portfolio page
├── css/
│   ├── main.css            # Base styles
│   └── arcade.css          # Arcade theme styles
├── js/
│   ├── menu.js             # Navigation and interaction logic
│   └── info.js             # Info button functionality
├── assets/
│   ├── images/
│   │   └── hercules-background.svg
│   └── sounds/
│       ├── theme.wav       # Background music
│       └── select.wav      # Navigation sound
└── pages/
    ├── experience.html     # Professional experience
    ├── education.html      # Educational background
    ├── hobbies.html        # Personal interests
    └── contact.html        # Contact information
```

## How to Run

1. **Live Site**: Visit https://cpapazoglou.eu
2. **Local Development**:
   ```bash
   cd src
   python -m http.server 8000
   # or
   npx live-server
   ```
3. Open your browser to `http://localhost:8000` (or the URL shown by live-server)

## Deployment

The website is automatically deployed to GitHub Pages using the `gh-pages` branch:
- **Source Code**: `main` branch contains the development files in the `src/` folder
- **Live Site**: `gh-pages` branch contains the deployed website files
- **URL**: https://cpapazoglou.eu

### Automatic Deployment (Recommended)

The site automatically deploys when you push to the `main` branch using GitHub Actions.

### Manual Deployment

Use the provided deployment script:
```bash
./deploy.sh
```

Or deploy manually:
```bash
# Work on main branch in src/ folder
git checkout main
# Make your changes...

# Deploy to gh-pages
git checkout gh-pages
cp -r src/* .
git add .
git commit -m "Deploy updates"
git push origin gh-pages
git checkout main
```

## Controls

- **Arrow Keys** or **W/S**: Navigate menu options
- **Enter** or **Space**: Select current option
- **Escape**: Clear selection / Go back
- **Backspace**: Return to main menu (on content pages)
- **Music Button**: Toggle background music on/off

## Theme

The website combines:
- **Greek Mythology**: Hercules theme with references to his twelve labors
- **Arcade Aesthetics**: Golden colors, retro fonts, and classic game-style UI
- **Modern Web Tech**: CSS animations, Web Audio API, responsive design

## Development Journey

This entire project was **initialized, coded, and deployed directly from VS Code** using the **Claude Sonnet 4 AI agent**. From concept to live deployment, every line of code, styling decision, and deployment configuration was created through AI-assisted development within the VS Code environment.

The development process showcased:
- **AI-Driven Development**: Complete project creation using Claude Sonnet 4
- **Integrated Workflow**: Seamless development experience within VS Code
- **Automated Deployment**: GitHub Pages deployment with GitHub Actions
- **Modern Tooling**: Leveraging VS Code's capabilities with AI assistance

This portfolio represents the future of development - where human creativity meets AI efficiency to create legendary digital experiences! 🤖⚡

Created with passion for both ancient mythology and classic arcade gaming! 🏛️🎮
