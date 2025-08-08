# Hercules Portfolio - GitHub Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

The Hercules Portfolio is a **static HTML/CSS/JavaScript website** with an arcade-themed Greek mythology design. It features:
- Pure static site (no build process or dependencies)
- Keyboard navigation and interactive elements
- Background music and sound effects
- Responsive design with golden arcade aesthetics
- GitHub Pages deployment with automated CI/CD

## Working Effectively

### Bootstrap and Run Locally

**VALIDATED COMMANDS** (all tested and working):

1. **Python HTTP Server** (RECOMMENDED - fastest startup):
   ```bash
   cd src
   python3 -m http.server 8000
   ```
   - Startup time: ~2 seconds
   - Access at: http://localhost:8000

2. **Live Server with Hot Reload**:
   ```bash
   cd src
   npx live-server --port=8001 --no-browser
   ```
   - Startup time: ~10-15 seconds (includes npm download)
   - Access at: http://localhost:8001
   - Auto-refresh on file changes

3. **PHP Built-in Server**:
   ```bash
   cd src
   php -S localhost:8002
   ```
   - Startup time: ~1 second
   - Access at: http://localhost:8002

4. **Busybox HTTP Server**:
   ```bash
   cd src
   busybox httpd -f -p 8005
   ```
   - Startup time: immediate
   - Access at: http://localhost:8005

### No Build Process Required

- **NO package.json** - This is pure HTML/CSS/JavaScript
- **NO npm install** needed
- **NO build step** required
- **NO dependencies** to install
- Total project size: ~6MB (includes audio assets)

## Deployment

### Automatic Deployment (PRIMARY METHOD)

The site automatically deploys to GitHub Pages when you push to the `main` branch via GitHub Actions (`.github/workflows/deploy.yml`).

**Deployment Flow**:
1. Push changes to `main` branch
2. GitHub Actions automatically copies `src/` contents to `gh-pages` branch
3. Site goes live at https://cpapazoglou.eu/

### Manual Deployment (BACKUP METHOD)

Use the validated deployment script:
```bash
./deploy.sh
```

**What it does**:
- Switches to `gh-pages` branch
- Copies `src/` contents to root
- Commits and pushes changes
- Returns to original branch

## Validation Scenarios

### ALWAYS test these scenarios after making changes:

1. **Basic Navigation Test**:
   ```bash
   cd src && python3 -m http.server 8000
   # Test in browser:
   # - Home page loads correctly
   # - All 4 navigation links work (Experience, Education, Hobbies, Contact)
   # - Back buttons return to home page
   # - CSS and JavaScript load properly
   ```

2. **Keyboard Navigation Test**:
   - Arrow keys navigate menu options
   - Enter key selects current option
   - Escape key returns to main menu (on content pages)
   - Visual selection highlighting works

3. **Asset Loading Test**:
   ```bash
   # Verify all assets are accessible:
   curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/css/main.css    # Should return 200
   curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/js/menu.js     # Should return 200
   curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/assets/CharalamposPapazoglouResume.pdf  # Should return 200
   ```

4. **Audio Feature Test**:
   - Music toggle button (🔈/🔊) works
   - Site loads with music muted by default
   - Audio files are accessible

## Project Structure

```
src/                           # Source files (deployment root)
├── index.html                 # Main portfolio page
├── CNAME                      # GitHub Pages custom domain
├── css/
│   ├── main.css              # Base styles
│   └── arcade.css            # Arcade theme styles
├── js/
│   ├── menu.js               # Navigation and keyboard interaction
│   └── info.js               # Info popup functionality
├── assets/
│   ├── images/
│   │   ├── hercules-background.svg
│   │   └── thunder-favicon.svg
│   ├── sounds/
│   │   ├── mythic-theme.mp3  # Background music (5.8MB)
│   │   ├── select.wav        # Navigation sound
│   │   └── theme.wav         # Alternative sound
│   └── CharalamposPapazoglouResume.pdf
└── pages/
    ├── experience.html        # Professional experience
    ├── education.html         # Educational background  
    ├── hobbies.html          # Personal interests
    └── contact.html          # Contact information
```

## Key Features to Test

### Interactive Elements
- **Menu Navigation**: Arrow keys (↑↓) or WASD to navigate
- **Selection**: Enter or Space to select menu items
- **Back Navigation**: Escape or Backspace to return to main menu
- **Music Control**: Speaker button toggles background audio
- **Info Button**: ℹ️ button shows portfolio information popup

### Browser Compatibility
- Works in all modern browsers
- Responsive design for mobile/tablet/desktop
- JavaScript ES6+ features used
- CSS Grid and Flexbox layouts

## Git Workflow

### Current Repository Structure
- `main` branch: Development work happens here in `src/` folder
- `gh-pages` branch: Auto-generated deployment branch (DO NOT edit manually)
- Custom domain: cpapazoglou.eu (configured via CNAME file)

### Making Changes
1. Work in the `src/` directory on `main` branch
2. Test locally using any of the validated server methods
3. Commit and push to `main` branch
4. GitHub Actions automatically deploys to GitHub Pages

## Common Validation Commands

```bash
# Quick structure check
ls -la src/                    # Verify all main files exist

# File type validation  
file src/index.html           # Should show: HTML document, Unicode text, UTF-8 text
file src/assets/sounds/*.mp3  # Should show: MPEG ADTS audio file
file src/assets/CharalamposPapazoglouResume.pdf  # Should show: PDF document

# Size check
du -sh src/                   # Should show ~6MB total

# Server test (pick one)
cd src && python3 -m http.server 8000     # Fastest startup
cd src && npx live-server --port=8001     # Auto-reload for development
cd src && php -S localhost:8002           # Alternative option
```

## Troubleshooting

### Common Issues
- **404 errors**: Ensure you're running server from `src/` directory
- **CSS not loading**: Check file paths are relative to `src/`
- **JavaScript errors**: Open browser dev tools to check console
- **Audio not playing**: Site loads muted by default, user must enable

### Performance Notes
- Background music file is 5.8MB - largest asset
- Site loads fast (~2 seconds) on local servers
- No external dependencies or CDN resources
- All assets are self-contained

## Development Notes

- **Theme**: Greek mythology + arcade gaming aesthetics
- **Colors**: Golden yellow (#ffd700) primary, dark blue backgrounds
- **Typography**: Custom arcade-style fonts
- **Animations**: CSS transitions and hover effects
- **Audio**: Mythical ambient background music with toggle control
- **Accessibility**: Keyboard navigation fully supported

## Links and External Resources

- **Live Site**: https://cpapazoglou.eu/
- **LinkedIn**: https://www.linkedin.com/in/charalampospapazoglou/
- **GitHub**: https://github.com/cpapazoglou
- **Blog**: https://cpapazoglou.blog/
- **PDF Resume**: Included in assets folder

Always validate your changes by running a local server and testing the complete user journey before committing!