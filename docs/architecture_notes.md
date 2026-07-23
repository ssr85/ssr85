# Architecture Notes: Dotted Globe & Styling Integration

This document outlines key architectural findings and engineering decisions made during the integration of the rotating wireframe dotted globe component into the "Beyond Work" section.

---

## 1. Directory Structure & shadcn/ui Alignment
* **Finding:** Standard shadcn/ui aliases configured in `components.json` map `@/components/ui` to the actual filesystem path `src/components/ui/` in Vite environments.
* **Impact:** Maintaining components under `src/components/ui/` (rather than root `/components/ui/`) is critical to ensure that shadcn CLI commands (e.g., `pnpm dlx shadcn@latest add ...`) can correctly locate, merge, and update files. Deviations from the workspace alias configuration break automatic compiler resolution and TypeScript imports.

---

## 2. Tailwind v3.4 vs v4 CSS Variables
* **Finding:** Tailwind v3.4 maps CSS variables by wrapping them in the `hsl()` color function within `tailwind.config.ts` (e.g., `primary: "hsl(var(--primary))"`).
* **Problem:** OKLCH color definitions (such as `oklch(0 0 0)` or `oklch(0.396 0.141 25.723)`) are complete CSS color functions. Injecting them directly into Tailwind v3 variables causes browsers to evaluate them as `hsl(oklch(...))`, which is invalid CSS. Additionally, it breaks Tailwind's native opacity modifier resolution (e.g., `bg-primary/10`).
* **Solution:** OKLCH coordinates were converted into raw, space-separated HSL percentages (e.g., `0 0% 0%` for black) inside `src/index.css`. This maintains full compatibility with Tailwind's opacity modifier syntax while preserving the monochromatic theme styling requested.

---

## 3. Background Watermark vs. Foreground Canvas
* **Finding:** Standard canvas-based visualization components typically render with a solid black background mask (`context.fillStyle = "#000000"`) and include absolute overlay controls (e.g., "Drag to rotate").
* **Impact:** If rendered inside/behind other layout containers, solid canvas background colors obscure backdrop filters (like `backdrop-blur`) and card gradients. Moreover, overlay text creates clutter.
* **Solution:** We extended the `RotatingEarth` component with:
  - `transparent?: boolean` (skips the solid ocean fill path, drawing only the landmass outlines and halftone dots).
  - `hideControls?: boolean` (conditionally hides the helper label).
  - Dark/Light mode color detection (`isDark` check) to dynamically scale outline and dot opacities, ensuring high contrast against both light and dark card backgrounds.

---

## 4. Header Illustration Responsive Layout
* **Finding:** To prevent page-level scroll hijacking, any canvas component that handles interactive zooming via `wheel` events must have `pointer-events-none` applied when placed as a decorative section header element.
* **Impact:** Without `pointer-events-none`, a user scrolling the page whose cursor lands on the canvas will find page scrolling blocked because the canvas captures and halts the event via `event.preventDefault()`.
* **Solution:** Wrapped the `RotatingEarth` header element in a container with `pointer-events-none select-none` to guarantee seamless browser scrolling.
