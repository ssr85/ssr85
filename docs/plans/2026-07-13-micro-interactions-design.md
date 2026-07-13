# Design Document: High-Impact Micro-Interactions Upgrade

- **Project:** Sarabjeet Rattan Portfolio (`SSR_Website`)
- **Date:** 2026-07-13
- **Author:** Antigravity (AI Pair Programmer)

---

## 🎯 Goal
Upgrade the portfolio's key interactive touchpoints (Hero ticker, Bento grid focus cards, FAQ accordion) to utilize premium, motion-driven animations using Framer Motion (`motion/react`) to match the UIPro styling specification.

---

## 🛠 Proposed Design

### 1. Hero Ticker Animation (`src/components/Hero.tsx`)
- **Current Behavior:** Ticker swaps strings in a raw `setInterval` loop causing sudden layout wiggles and text jumps.
- **New Behavior:** Text items will scroll vertically (slide up and fade in on enter, slide up and fade out on exit) with absolute positioning to prevent wiggles.
- **Tech Spec:**
  - Wrap the ticker index key inside an `<AnimatePresence mode="wait">`.
  - Use `<motion.span>` with:
    - `initial={{ opacity: 0, y: 15 }}`
    - `animate={{ opacity: 1, y: 0 }}`
    - `exit={{ opacity: 0, y: -15 }}`
    - `transition={{ duration: 0.3, ease: "easeInOut" }}`

### 2. Bento Grid Morphing (`src/components/Snapshot.tsx`)
- **Current Behavior:** Bento grid on mobile toggles card expansion instantly with React state, causing abrupt layout reflows.
- **New Behavior:** Cards will morph their dimensions and layout bounds smoothly when clicked.
- **Tech Spec:**
  - Add `layout` attribute to bento cards: `<motion.div layout>`.
  - Use custom transition parameters: `transition={{ type: "spring", stiffness: 350, damping: 30 }}` to coordinate morphing bounds.

### 3. Smooth Spring Accordion (`src/components/ui/accordion.tsx`)
- **Current Behavior:** Accordion uses linear tailwind keyframes that do not adapt dynamically to varying content heights.
- **New Behavior:** Accordion content expands and collapses with a spring flex.
- **Tech Spec:**
  - Modify `@/components/ui/accordion.tsx` to animate height dynamically using Framer Motion.
  - Implement a `motion.div` transition inside the trigger/content layers.

---

## 🔬 Testing and Verification
- Run `pnpm build` to verify pre-rendering compiles with zero SSR warnings.
- Verify HMR runs smoothly on local dev server.
