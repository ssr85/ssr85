# Dotted Globe Integration Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Integrate the rotating wireframe dotted globe component into the "Beyond Work" section, just left of the "Global Travel" card, inclined at a 23.5-degree angle, with full support for the project's shadcn structure, TypeScript, and Tailwind CSS.

**Architecture:** We will copy the `wireframe-dotted-globe.tsx` component to the shadcn-compliant directory `src/components/ui/`, install the `d3` visualization library, extend `src/index.css` with converted monochromatic HSL theme variables to maintain Tailwind 3 opacity modifiers, and update `BeyondWork.tsx` to display the tilted globe inside a premium card left of the "Global Travel" card.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS v3, D3.js.

---

## User Review Required

> [!IMPORTANT]
> - **Theme Update (Tailwind 3 Compatibility):** The color theme variables provided in the prompt are written using Tailwind v4 OKLCH functions (e.g. `oklch(0 0 0)`). Since this project is on Tailwind v3.4, raw OKLCH functions directly inside CSS variables will break existing opacity modifiers like `bg-primary/10` and `border-border/50` used in the codebase.
> - **Solution:** We converted these OKLCH colors to standard space-separated HSL raw percentages (e.g. `0 0% 0%` for black) to extend `src/index.css`. This ensures all existing layout styles and opacity classes render correctly without breaking the website.

---

### Task 1: Install D3 Dependencies

Install `d3` and its typescript types as required by the visualization component.

**Files:**
- Modify: [package.json](file:///Users/ssrrattan/Documents/SSR_Website/package.json)

**Step 1: Install packages**
Run: `pnpm add d3 && pnpm add -D @types/d3`
Expected: Installation completes successfully, adding `d3` and `@types/d3` to `package.json`.

**Step 2: Commit**
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install d3 and @types/d3"
```

---

### Task 2: Extend Tailwind 3 Stylesheet

Extend the existing Tailwind 3 variables in `src/index.css` with the monochromatic color values and imports.

**Files:**
- Modify: [index.css](file:///Users/ssrrattan/Documents/SSR_Website/src/index.css:27-106)

**Step 1: Edit CSS Variables**
Update the `:root` and `.dark` blocks in `src/index.css` with the converted monochromatic HSL coordinates:
- Light Mode:
  - `--background: 0 0% 100%`
  - `--foreground: 0 0% 0%`
  - `--card: 0 0% 94%`
  - `--card-foreground: 0 0% 0%`
  - `--popover-foreground: 0 0% 0%`
  - `--primary: 0 0% 0%`
  - `--primary-foreground: 0 0% 100%`
  - `--secondary: 0 0% 50%`
  - `--secondary-foreground: 0 0% 100%`
  - `--muted: 0 0% 94%`
  - `--muted-foreground: 0 0% 0%`
  - `--accent: 0 0% 80%`
  - `--accent-foreground: 0 0% 0%`
  - `--destructive-foreground: 0 0% 100%`
  - `--border: 0 0% 50%`
  - `--input: 0 0% 100%`
  - `--ring: 0 0% 0%`
  - `--sidebar: 0 0% 94%`
  - `--sidebar-foreground: 0 0% 0%`
  - `--sidebar-primary: 0 0% 0%`
  - `--sidebar-primary-foreground: 0 0% 100%`
  - `--sidebar-accent: 0 0% 80%`
  - `--sidebar-accent-foreground: 0 0% 0%`
  - `--sidebar-border: 0 0% 50%`
  - `--sidebar-ring: 0 0% 0%`
- Dark Mode:
  - `--background: 0 0% 0%`
  - `--foreground: 0 0% 100%`
  - `--card: 0 0% 10%`
  - `--card-foreground: 0 0% 100%`
  - `--popover: 0 0% 0%`
  - `--popover-foreground: 0 0% 100%`
  - `--primary: 0 0% 100%`
  - `--primary-foreground: 0 0% 0%`
  - `--secondary: 0 0% 30%`
  - `--secondary-foreground: 0 0% 100%`
  - `--muted: 0 0% 30%`
  - `--muted-foreground: 0 0% 70%`
  - `--accent: 0 0% 30%`
  - `--accent-foreground: 0 0% 100%`
  - `--destructive: 359 69% 30%`
  - `--destructive-foreground: 357 96% 58%`
  - `--border: 0 0% 30%`
  - `--input: 0 0% 30%`
  - `--ring: 0 0% 100%`
  - `--sidebar: 0 0% 10%`
  - `--sidebar-foreground: 0 0% 100%`
  - `--sidebar-primary: 0 0% 100%`
  - `--sidebar-primary-foreground: 0 0% 0%`
  - `--sidebar-accent: 0 0% 30%`
  - `--sidebar-accent-foreground: 0 0% 100%`
  - `--sidebar-border: 0 0% 30%`
  - `--sidebar-ring: 0 0% 100%`

**Step 2: Verify build**
Run: `pnpm build`
Expected: Compile succeeds with new CSS configuration.

**Step 3: Commit**
```bash
git add src/index.css
git commit -m "style: extend global variables with monochrome HSL colors"
```

---

### Task 3: Add Dotted Globe Component

Create the new file `src/components/ui/wireframe-dotted-globe.tsx` with the provided code.

**Files:**
- Create: [wireframe-dotted-globe.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/components/ui/wireframe-dotted-globe.tsx)

**Step 1: Write component code**
Create `src/components/ui/wireframe-dotted-globe.tsx` containing the provided canvas rotating globe code.

**Step 2: Verify typescript compilation**
Run: `pnpm build`
Expected: Compile succeeds without typescript errors.

**Step 3: Commit**
```bash
git add src/components/ui/wireframe-dotted-globe.tsx
git commit -m "feat: add RotatingEarth dotted globe component"
```

---

### Task 4: Integrate Globe in BeyondWork Section

Modify `BeyondWork.tsx` to insert a new card containing the `RotatingEarth` component, inclined at 23.5 degrees, placed to the left of the "Global Travel" card.

**Files:**
- Modify: [BeyondWork.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/components/BeyondWork.tsx)

**Step 1: Edit component code**
- Import `RotatingEarth` from `@/components/ui/wireframe-dotted-globe`.
- In the grid layout, prepend a new `StaggeredCard` containing the `RotatingEarth` container.
- Rotate the globe container/canvas using CSS `transform: rotate(23.5deg)` or the Tailwind `rotate-[23.5deg]` utility class.
- Adjust the grid columns from `md:grid-cols-4` to `lg:grid-cols-5` (or a responsive layout) to cleanly accommodate 5 cards.

**Step 2: Verify typescript compilation and styling**
Run: `pnpm build`
Expected: Build succeeds.

**Step 3: Commit**
```bash
git add src/components/BeyondWork.tsx
git commit -m "feat: integrate rotating dotted globe into beyond-work layout"
```

---

## Verification Plan

### Automated Tests
- Since there are no unit tests, we run the production build command:
  `pnpm build`

### Manual Verification
- Start the local dev server using `pnpm dev`
- Launch a browser subagent using the `@browser-agent` skill to navigate to the homepage and verify the Dotted Globe renders correctly at a 23.5 degrees tilt in the "Beyond Work" section, just left of the "Global Travel" card.
