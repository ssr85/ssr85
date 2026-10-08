# Implementation Plan: SEO High-Impact Recommendations

> **For Antigravity:** REQUIRED SUB-SKILL: Load `executing-plans` to implement this plan task-by-task.

**Goal:** Implement the three High-Impact recommendations from the SEO Audit: (1) Optimize `"vite react ssg"` striking-distance content & CTR on `/insights/headless-wordpress-vite-architecture`, (2) Establish automated Indexing API & IndexNow execution scripts with `pnpm seo:index`, and (3) Interlink all 11 insight guides with core pillars and the `/tools/architecture-scope-estimator`.

**Architecture:**
- **On-Page / AEO Enhancement:** Enrich `HeadlessWordPressVite.tsx` with targeted H2s, architectural comparison tables (Vite React SSG vs Next.js SSR), benchmark breakdowns, and high-intent meta tags to push GSC position `#15.0` into the top 5 (without raw code samples, focusing on architectural decision criteria).
- **Indexing Tooling:** Add `npm run seo:index` script, enrich `scripts/seo-engine/force-index.ts` with structured reporting, environment checks, and clear guidance for the Google Cloud Web Search Indexing API.
- **Topic Silo Interlinking:** Add contextual cross-linking cards and callout components connecting insight guides to `/tools/architecture-scope-estimator`, `/ai-wordpress-development`, `/n8n-workflows`, and `/custom-business-automation`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite SSG, Google Search Console API, IndexNow.

---

## Tasks

### Task 1: Enhance `HeadlessWordPressVite.tsx` for `"vite react ssg"` Striking-Distance Rank
**Files:**
- Modify: `src/pages/insights/HeadlessWordPressVite.tsx`

**Step 1:** Update metadata with optimized title & meta description targeting `"vite react ssg"`.
**Step 2:** Add Vite SSG vs Next.js architectural comparison matrix and code block.
**Step 3:** Add contextual interlinking badges to `/ai-wordpress-development` and `/tools/architecture-scope-estimator`.

---

### Task 2: Configure Indexing Pipeline Scripts in `package.json` and `force-index.ts`
**Files:**
- Modify: `scripts/seo-engine/force-index.ts`
- Modify: `package.json`

**Step 1:** Add `"seo:index"` and `"seo:sync"` scripts in `package.json`.
**Step 2:** Refine `force-index.ts` to output diagnostic instructions for Google Cloud Indexing API activation while executing full IndexNow pings.
**Step 3:** Test run `pnpm seo:index` and verify 200 response from IndexNow.

---

### Task 3: Implement Contextual Topic Silo Interlinks Across Insight Guides
**Files:**
- Modify: `src/pages/insights/StrikingKeywordInsights.tsx`
- Modify: `src/pages/insights/WooCommercePerformance.tsx`
- Modify: `src/pages/insights/EuGdprCompliance.tsx`
- Modify: `src/pages/insights/CustomCrmSync.tsx`

**Step 1:** Add interactive tool and pillar link blocks with Lucide icons into each guide's summary / CTA section.
**Step 2:** Verify all route links point to valid canonical URLs.

---

### Task 4: Full Production Build Verification
**Files:**
- All modified files

**Step 1:** Run `pnpm build` to ensure error-free SSG static pre-rendering of all 23 HTML pages and sitemap generation.
**Step 2:** Inspect generated `dist/insights/headless-wordpress-vite-architecture.html` to confirm metadata, inlined CSS, and content blocks.

---

## Verification Plan

### Automated Tests / Commands
- `pnpm build` -> Must succeed with exit code 0 and pre-render 23 static pages.
- `pnpm seo:index` -> Must successfully submit 21 URLs to IndexNow network.

### Manual Verification
- Review pre-rendered static HTML files for correct title tags, meta descriptions, and clean link anchors.
