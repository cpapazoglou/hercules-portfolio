# DRY Solutions Research for Hercules Portfolio

## Problem Statement
The HTML files in the portfolio have significant code duplication including head sections, info popups, script tags, and common UI elements. This violates the DRY (Don't Repeat Yourself) principle and makes maintenance difficult.

## 3 Widely Accepted Solutions

### Solution 1: Server-Side Includes (SSI) or PHP Includes

**How it works:**
- Split common HTML sections into separate files (header.php, footer.php, info-popup.php)
- Use server-side include statements to combine files during request
- Example: `<?php include 'components/header.php'; ?>`

**Pros:**
- Simple to implement and understand
- No build process required
- Works with any server supporting includes
- SEO-friendly (server-rendered)

**Cons:**
- Requires server-side language support (PHP, SSI)
- GitHub Pages doesn't natively support PHP
- Would need hosting change or GitHub Actions build step

**Best for:** Sites with existing server-side infrastructure

### Solution 2: Static Site Generator (Jekyll, 11ty, Hugo)

**How it works:**
- Create layout templates with placeholders
- Write content in Markdown or templated HTML
- Build process generates final static HTML files
- Example Jekyll layout: `{% include header.html %}`

**Pros:**
- Industry standard for static sites
- Excellent DRY capabilities with layouts and includes
- GitHub Pages natively supports Jekyll
- Version control friendly
- Great developer experience

**Cons:**
- Requires learning template syntax
- Build step adds complexity
- May require restructuring existing content

**Best for:** Documentation sites, blogs, marketing sites

### Solution 3: JavaScript Component System

**How it works:**
- Create JavaScript modules for common UI components
- Load components dynamically on page load
- Inject HTML using template literals or DOM manipulation
- Example: `loadComponent('header', headerData)`

**Pros:**
- Works with existing static hosting
- No server-side requirements
- Can maintain current file structure
- Allows for dynamic content loading
- Progressive enhancement possible

**Cons:**
- Requires JavaScript enabled
- Potential SEO concerns
- More complex than pure HTML
- May impact initial page load

**Best for:** Interactive web applications, single-page apps

## Recommendation for Hercules Portfolio

Given the current constraints:
- Static HTML site on GitHub Pages
- No build process currently
- Minimal change requirement
- Need to maintain functionality

**Recommended Solution: JavaScript Component System**

This approach allows us to:
1. Keep the static hosting setup
2. Make minimal file structure changes
3. Maintain current functionality
4. Reduce code duplication significantly
5. Allow graceful degradation if JS is disabled

## Implementation Approach

1. Create a `components/` folder with common HTML components
2. Create a simple component loader in JavaScript
3. Refactor existing HTML files to use component loading
4. Maintain fallback content for accessibility