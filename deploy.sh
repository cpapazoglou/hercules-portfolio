#!/bin/bash

# Hercules Portfolio Deployment Script
# Deploys the src/ directory to gh-pages branch

set -e  # Exit on any error

echo "🏛️ Deploying Hercules Portfolio to GitHub Pages..."

# Ensure we're on the main branch
echo "📋 Checking out main branch..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  git checkout main
fi

# Make sure we have the latest changes
echo "📥 Pulling latest changes..."
git pull --ff-only origin main

# Switch to gh-pages branch
echo "🚀 Switching to gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
else
    git checkout -b gh-pages
fi

# Pull latest gh-pages changes
echo "📥 Pulling latest gh-pages changes..."
git pull --ff-only origin gh-pages 2>/dev/null || echo "No remote gh-pages branch yet"

# Sanity check to avoid destructive operations in wrong directory
if [ "$(git rev-parse --abbrev-ref HEAD)" != "gh-pages" ]; then
  echo "❌ Not on gh-pages branch; aborting"
  exit 1
fi

# Preserve CNAME if exists
PRESERVE_CNAME=false
if [ -f CNAME ]; then
  cp CNAME /tmp/CNAME.deploy.$$ && PRESERVE_CNAME=true
fi

# Clean existing files to prevent stale assets, keep .git
echo "🧹 Cleaning old files on gh-pages..."
find . -mindepth 1 -maxdepth 1 \
  ! -name ".git" \
  ! -name ".gitignore" \
  -exec rm -rf {} +

# Get latest src files from main branch
echo "📂 Getting latest source files..."
git checkout main -- src/

# Copy src contents to root and clean up
echo "📋 Copying files to deployment directory..."
cp -r src/* .
rm -rf src/

# Restore CNAME
if [ "$PRESERVE_CNAME" = true ]; then
  mv /tmp/CNAME.deploy.$$ CNAME
fi

# Stage all changes
echo "📦 Staging changes..."
git add -A

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
    echo "🌐 https://cpapazoglou.eu/"
    echo ""
    echo "🔄 Note: GitHub Pages may take a few minutes to update."
fi

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✨ Deployment process finished!"
