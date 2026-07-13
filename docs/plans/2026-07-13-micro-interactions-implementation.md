# High-Impact Micro-Interactions Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the Hero ticker, mobile focus cards, and FAQ accordion to use premium Framer Motion spring transitions.

**Architecture:** Use `motion` components (`motion.span`, `motion.div`) with AnimatePresence and layout props. This enables GPU-accelerated spring animations for fluid, hardware-friendly transitions.

**Tech Stack:** React 18, Tailwind CSS, Framer Motion (`motion/react`)

---

### Task 1: Refactor Hero Ticker (`src/components/Hero.tsx`)

**Files:**
- Modify: [Hero.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/components/Hero.tsx)

**Step 1: Write the ticker change code**
Import `AnimatePresence` and update the ticker header to slide vertically:
```tsx
import { AnimatePresence } from "motion/react";
```
Replace line 87-89:
```tsx
<span className="inline-block min-h-[1.2em] relative overflow-hidden text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary transition-all duration-500">
  <AnimatePresence mode="wait">
    <motion.span
      key={currentTagIndex}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="inline-block"
    >
      {heroTags[currentTagIndex]}
    </motion.span>
  </AnimatePresence>
</span>
```

**Step 2: Run verification**
Run: `pnpm build`
Expected: Successful compile and static render.

**Step 3: Commit**
Run:
```bash
git add src/components/Hero.tsx
git commit -m "feat: animate Hero tagline ticker with Framer Motion slide-fade"
```

---

### Task 2: Implement Mobile Bento Grid Layout Morph (`src/components/Snapshot.tsx`)

**Files:**
- Modify: [Snapshot.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/components/Snapshot.tsx)

**Step 1: Write morphing layout code**
Import `motion` in `Snapshot.tsx` and refactor Card wrappers to use `layout`:
```tsx
import { motion } from "motion/react";
```
Refactor bento card container on mobile to use layout props:
```tsx
<Card
  layout
  key={card.title}
  onClick={() => handleExpand(index)}
  ...
```

**Step 2: Run verification**
Run: `pnpm build`
Expected: Successful compile.

**Step 3: Commit**
Run:
```bash
git add src/components/Snapshot.tsx
git commit -m "feat: add morphic spring layout animation to mobile bento grid expansion"
```

---

### Task 3: Refactor Accordion Component height transitions (`src/components/ui/accordion.tsx`)

**Files:**
- Modify: [accordion.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/components/ui/accordion.tsx)

**Step 1: Refactor Radix accordion content with Framer Motion**
Import `motion` and `AnimatePresence` in `src/components/ui/accordion.tsx` and change `AccordionContent` to animate height dynamically using spring physics.

**Step 2: Run verification**
Run: `pnpm build`
Expected: Successful compile.

**Step 3: Commit**
Run:
```bash
git add src/components/ui/accordion.tsx
git commit -m "feat: replace tailwind css accordion transitions with spring height animation"
```
