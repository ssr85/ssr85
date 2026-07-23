## Root cause

The homepage ships **~4 MB of unoptimized images** before any interaction. The single biggest wins are compressing four oversized PNG project covers and the 506 KB logo/favicon. Everything else is secondary.

| Asset | Current | Target | Win |
|---|---|---|---|
| `public/images/projects/skaizen-cover.png` | 993 KB | ~60 KB WebP | -930 KB |
| `public/images/projects/global-market-cover.png` | 801 KB | ~60 KB WebP | -740 KB |
| `public/images/projects/og-hemp-cover.png` | 725 KB | ~60 KB WebP | -665 KB |
| `public/images/projects/automation-cover.png` | 713 KB | ~60 KB WebP | -650 KB |
| `src/assets/SR_LOGO_no_bg.png` | 506 KB | <10 KB WebP | -500 KB |
| `public/favicon.png` | 506 KB | <10 KB PNG (resized) | -500 KB |

**Expected result: initial page weight drops from ~4 MB to ~350 KB** (≈90% reduction). LCP and Time-to-Interactive should improve dramatically, especially on mobile (the user's current viewport is 390 px wide on a 3× DPR device — they're paying full cost for desktop-sized PNGs).

## Changes I'll make

### 1. Compress + convert project cover images
- Re-encode all 4 oversized PNG covers in `public/images/projects/` to **WebP** at max width 1600 px, quality 78.
- Keep the same filenames with `.webp` extension; update the four `image:` references in `src/data/content.ts` to point at the new `.webp` files.
- Also re-encode the three `og-hemp-*.jpg` files (currently ~100 KB each, can be ~30 KB each).

### 2. Shrink the logo
- Re-encode `src/assets/SR_LOGO_no_bg.png` as a properly-sized WebP (max 128 px tall, transparent).
- Update the single import in `src/components/Header.tsx`.

### 3. Shrink the favicon
- Replace `public/favicon.png` with a 64×64 PNG (~5 KB).
- Optionally also write a 192×192 `apple-touch-icon.png` so iOS doesn't reuse the favicon.

### 4. Lazy-load below-the-fold images
- Add `loading="lazy"` and `decoding="async"` to the two `<img>` tags in `src/components/Projects.tsx`.
- Add `loading="eager"` + `fetchpriority="high"` to the header logo (above the fold).

### 5. Light index.html polish
- Add `<meta name="description">` placeholder if not injected via the SEO component (skip if SEO component handles it).
- No preload tags needed — there's no hero image.

## What I will NOT change
- No dependency additions (no `vite-imagetools`, no `sharp` runtime). One-time CLI compression keeps the repo simple.
- No code-splitting or bundle-level changes — the JS isn't the bottleneck.
- No layout, design-system, or component refactors.

## Verification after build mode
- Re-list `public/images/projects/` and `src/assets/` sizes to confirm reductions.
- Optional: drive Playwright at `localhost:8080`, capture the network panel, and report total transferred bytes for `/` before vs after.

If you'd like me to also add a build-time image pipeline (e.g. `vite-imagetools`) for future-proofing, say so and I'll fold that in; otherwise I'll keep this as a focused one-shot compression pass.
