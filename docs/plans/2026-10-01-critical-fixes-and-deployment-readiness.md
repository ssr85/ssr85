# Critical Fixes & Deployment Readiness Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Resolve all Critical & High-Priority audit findings (live 404 client errors on subpages, sitemap XML root headers, SPA routing rules across hosting platforms), sync all metadata, and prepare a verified production build for deployment.

**Architecture:** 
1. Configure multi-platform hosting fallbacks (`vercel.json` cleanUrls, `public/_redirects`, and `public/.htaccess`) to ensure sub-paths (`/resume`, `/case-studies/*`, `/insights/*`, `/ai-wordpress-development`) resolve with HTTP 200 on all static and dynamic hosting environments.
2. Synchronize `public/sitemap.xml` with dynamic postbuild sitemap standards (removing hash fragments, adding all 18 routes).
3. Validate OpenGraph tags and canonicals across all routes.
4. Execute clean production build and test with the SEO CLI crawler.

**Tech Stack:** React 18, Vite, Vite-React-SSG, Vercel/Netlify routing, SEO CLI.

---

### Task 1: Configure Hosting Server Fallbacks & Clean URLs

**Files:**
- Modify: `vercel.json`
- Create: `public/_redirects`
- Create: `public/.htaccess`

**Step 1: Update `vercel.json`**
Configure `"cleanUrls": true`, `"trailingSlash": false`, and explicit route rewrites so direct navigation to subpages works without 404s.

**Step 2: Add `public/_redirects`**
Add standard SPA fallback for Netlify and Cloudflare Pages.

**Step 3: Add `public/.htaccess`**
Add Apache/LiteSpeed rewrite rules to serve `.html` files automatically and fallback to `index.html`.

---

### Task 2: Synchronize & Clean `public/sitemap.xml`

**Files:**
- Modify: `public/sitemap.xml`

**Step 1: Replace obsolete anchor tags with the authoritative 18 pre-rendered URLs**
Ensure valid `<urlset>` root and standard `<lastmod>`, `<changefreq>`, and `<priority>` elements matching `scripts/postbuild.js`.

---

### Task 3: Execute Production Build & Verify SSG Artifacts

**Files:**
- Build output: `dist/`

**Step 1: Run production build**
Command: `export PATH="/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:/opt/homebrew/bin:$PATH" && pnpm build`
Expected: 16 SSG pages rendered, sitemap updated, 0 errors.

**Step 2: Run local SEO crawl check**
Command: `export PATH="/Users/ssrrattan/.nvm/versions/node/v22.22.0/bin:/opt/homebrew/bin:$PATH" && seo reports run site-crawl --params '{"url":"http://localhost:8080"}' --json`
Expected: 0 High or Critical severity findings.
