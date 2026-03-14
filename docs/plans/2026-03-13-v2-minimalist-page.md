# V2 Minimalist Landing Page Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Create a separate, minimalist version of the portfolio at `/v2` using the Stitch mockup as the primary design guide, without affecting the main homepage.

**Architecture:** We will use a "component duplication" approach (Approach 1) combined with a separate data file (Option 2). A new global CSS theme class `.v2-theme` will be added to `index.css` to handle the specific minimalist token overrides.

**Tech Stack:** React, Tailwind CSS, Lucide React (for icons), Framer Motion (for animations).

---

### Task 1: Setup v2Content Data
**Files:**
- Create: `src/data/v2Content.ts`

**Step 1: Create the data file**
Populate `src/data/v2Content.ts` with the text exported from the Stitch mockup.

---

### Task 2: Update index.css with Minimalist Variable Overrides
**Files:**
- Modify: `src/index.css`

**Step 1: Add v2-theme variables**
Define the specific colors (especially `#137fec`) inside a `.v2-theme` scope to avoid affecting the default light/dark themes.

---

### Task 3: Implement V2 Components
**Files:**
- Create: `src/components/V2Header.tsx`
- Create: `src/components/V2Hero.tsx`
- Create: `src/components/V2AtAGlance.tsx`
- Create: `src/components/V2CaseStudies.tsx`
- Create: `src/components/V2Strengths.tsx`
- Create: `src/components/V2Footer.tsx`

**Step 1: Create and style each component**
Base each new component on the original but modify the JSX structure and Tailwind classes to match the Stitch design (cleaner typography, reduced padding, specific minimalist grid).

---

### Task 4: Create V2 Landing Page & Route
**Files:**
- Create: `src/pages/V2Index.tsx`
- Modify: `src/App.tsx`

**Step 1: Create V2Index.tsx**
Assemble the `V2` components in `src/pages/V2Index.tsx`. Wrap the main container in `.v2-theme`.

**Step 2: Add Route to App.tsx**
Add `<Route path="/v2" element={<V2Index />} />` to the routes.

---

### Task 5: Manual Verification
**Step 1: Verify /v2 layout**
Open `/v2` and confirm it matches the Stitch mockup.

**Step 2: Confirm / remains unchanged**
Open `/` and confirm the original site is intact.
