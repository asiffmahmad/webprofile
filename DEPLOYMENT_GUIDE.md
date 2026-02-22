# Step-by-Step GitHub Pages Deployment Guide

This guide explains how this project was configured for automatic deployment to GitHub Pages.

## Step 1: Configure Vite Base Path
Since GitHub Pages hosts sites at `https://<username>.github.io/<repository-name>/`, we must tell Vite to use that subfolder as the base path.

**File:** `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/webprofile/', // Must match your repository name
})
```

## Step 2: Install and Configure Deployment Scripts
We use the `gh-pages` package to handle pushing the built files to a separate branch.

1. **Install:**
   ```bash
   npm install gh-pages --save-dev --legacy-peer-deps
   ```

2. **Update `package.json`:**
   Add these scripts to automate the build and deploy process.
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

## Step 3: Automate with GitHub Actions
To avoid running manual commands, we use a GitHub Actions workflow.

**File:** `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install --legacy-peer-deps
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Step 4: Enable Permissions on GitHub
By default, GitHub Actions may not have permission to push to your repository.

1. Go to your repository on GitHub.
2. Click **Settings** > **Actions** > **General**.
3. Scroll to **Workflow permissions**.
4. Select **Read and write permissions**.
5. Click **Save**.

## Step 5: Finalize and Verify
1. Push your changes to the `main` branch.
2. Go to the **Actions** tab in your repository to watch the deployment build.
3. Once finished, your site will be live at:
   `https://asiffmahmad.github.io/webprofile/`
