# Coding Agent Rules (AGENTS.md)

This file contains strict behavioural constraints and guidelines for all agentic AI coders working in this workspace. Always consult this document before proposing changes.

## 1. General Behavioural Rules

- **Image Generation Constraint**: Under no circumstances should you proactively generate placeholder or preview images using `generate_image` tools unless the USER explicitly requests it with a detailed prompt. Avoid placeholder icons or graphics; use Lucide-react SVGs or existing assets.
- **Workflow Integrity**: Maintain existing inline comments, docstrings, and structure. Do not perform large sweeping refactors that combine unrelated issues. Keep changes isolated to the task goals.
- **Verification First**: Verify that every change compiles successfully. Run `pnpm build` before presenting success claims to the user.

## 2. Performance & Rendering Constraints (CRITICAL)

- **Static Landing Page Sections**: Do NOT use `React.lazy` or `Suspense` dynamic imports to load landing page (above-the-fold or immediate scroll) sections in `Index.tsx`. All main landing page components MUST be statically imported to prevent hydration fallback wipes.
- **Mount-Aware Animations**: Any scroll-based or mounting animations (such as Framer Motion elements using `initial` state) must be mount-aware. Defer applying `initial` styling until after mount (`isMounted === true`) to prevent pre-rendering invisible sections (`opacity: 0`) in static HTML.
- **Code-Splitting Maintenance**: Ensure third-party libraries (e.g. `@supabase/supabase-js`, `motion/react`, `@radix-ui/*`) are mapped to their specific chunks in `vite.config.ts`'s `manualChunks` configuration, rather than letting them merge with `vendor-core`. Keep the core vendor bundle size under `250kB`.
- **Asynchronous Font Loading**: All external web fonts (such as Google Fonts) MUST be loaded asynchronously using the `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" />` pattern with a `<noscript>` stylesheet fallback. Do NOT use standard render-blocking `<link rel="stylesheet">` for external font files.

## 3. Design & Styling Guidelines

- **Vanilla CSS & Tailwind**: Use the preconfigured Tailwind CSS classes. Use tailwind utility classes for layout and spacing. Avoid styling with raw inline styles or introducing ad-hoc stylesheet overrides.
- **Consistent Icons**: Use `lucide-react` for system iconography. Maintain the custom icon mappings configured in Bento and Card configurations.
- **Theme Support**: Design components to render beautifully in both light and dark modes. Use variables that support the next-themes config.

## 4. SEO & Verification

- **Semantic Elements**: Always write semantic HTML5 tags (`<main>`, `<section>`, `<header>`, `<footer>`, `<article>`).
- **SEO Metadata**: Maintain the custom title tags and description metadata generated dynamically via the `<SEO />` component. Do not override or corrupt current metadata configurations.
- **Unique Component IDs**: Ensure interactive elements have unique, descriptive IDs to facilitate automated browser testing and flow automation.
