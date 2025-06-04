#!/bin/bash

# Hercules Portfolio Deployment Script
# Deploys the src/ directory to gh-pages branch

set -e  # Exit on any error

echo "🏛️ Deploying Hercules Portfolio to GitHub Pages..."

# Ensure we're on the main branch
echo "📋 Checking out main branch..."
git checkout main

# Make sure we have the latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Switch to gh-pages branch
echo "🚀 Switching to gh-pages branch..."
if git branch | grep -q "gh-pages"; then
    git checkout gh-pages
else
    git checkout -b gh-pages
fi

# Pull latest gh-pages changes
echo "📥 Pulling latest gh-pages changes..."
git pull origin gh-pages 2>/dev/null || echo "No remote gh-pages branch yet"

# Get latest src files from main branch
echo "📂 Getting latest source files..."
git checkout main -- src/

# Copy src contents to root and clean up
echo "📋 Copying files to deployment directory..."
cp -r src/* .
rm -rf src/

# Stage all changes
echo "📦 Staging changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to deploy"
else
    # Commit with timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo "💾 Committing changes..."
    git commit -m "Deploy update: $TIMESTAMP"
    
    # Push to GitHub
    echo "🚀 Pushing to GitHub Pages..."
    git push origin gh-pages
    
    echo "⚡ Deployment complete! Your site will be available at:"
    echo "🌐 https://cpapazoglou.github.io/hercules-portfolio/"
    echo ""
    echo "🔄 Note: GitHub Pages may take a few minutes to update."
fi

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✨ Deployment process finished!"
