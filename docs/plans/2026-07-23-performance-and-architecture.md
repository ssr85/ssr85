# Performance Optimization & Agentic System Memory Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Resolve the blank-section rendering issue on mobile, optimize bundles for faster page load times, and document the architecture and developer rules for future agents.

**Architecture:** 
1. Replace React lazy-loading with static imports for all fold-sections on the landing page to prevent hydration fallback wipes.
2. Make `ScrollAnimationWrapper` mount-aware so it doesn't output `opacity:0` in pre-rendered static HTML.
3. Optimize Code Splitting in Vite to prevent third-party libraries from bloating the core vendor bundle.
4. Establish `.agents/AGENTS.md` and `.agents/SYSTEM_MEMORY.md` to persist system context, rules, and layout constraints for future AI coding agents.

**Tech Stack:** Vite, React 18, Tailwind CSS, Framer Motion (`motion/react`), `vite-react-ssg`

---

### Task 1: Static Section Loading in landing page (`src/pages/Index.tsx`)

**Files:**
- Modify: [Index.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/pages/Index.tsx)

**Step 1: Write static import changes**
Replace dynamic `lazy` imports with static imports and remove `Suspense` fallbacks around landing page sections.

Lines to replace (lines 9-19):
```typescript
import { Snapshot } from "@/components/Snapshot";
import { CaseStudies } from "@/components/CaseStudies";
import { Strengths } from "@/components/Strengths";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { FAQ } from "@/components/FAQ";
import { BeyondWork } from "@/components/BeyondWork";

const EnquiryModal = lazy(() =>
  import("@/components/EnquiryModal").then((module) => ({ default: module.EnquiryModal }))
);
```

Update return block to render these statically without `<Suspense>` wrappers (keeping `<Suspense>` only for `<EnquiryModal>` and other truly modal-based components if any).

**Step 2: Run verification**
Run: `pnpm build`
Expected: Successful static page build and HTML rendering.

**Step 3: Commit**
Run:
```bash
git add src/pages/Index.tsx
git commit -m "perf: replace lazy imports with static imports for index sections to avoid hydration blank fallbacks"
```

---

### Task 2: Mount-Aware Animation Wrapper (`src/components/ScrollAnimationWrapper.tsx`)

**Files:**
- Modify: [ScrollAnimationWrapper.tsx](file:///Users/ssrrattan/Documents/SSR_Website/src/components/ScrollAnimationWrapper.tsx)

**Step 1: Introduce mounting state checks**
Update `ScrollAnimationWrapper` and `StaggeredCard` to defer the animation's initial `opacity: 0` states until hydration completes on the client.

```tsx
import { ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollAnimationWrapper = ({ children, className = "", delay = 0 }: ScrollAnimationWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={isMounted ? { opacity: 0, y: 24, scale: 0.98 } : undefined}
      whileInView={isMounted ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

Update `StaggeredCard` in the same file using the same `isMounted` pattern.

**Step 2: Run verification**
Run: `pnpm build`
Expected: Pre-rendered `dist/index.html` should show sections with `style=""` or without `opacity: 0` on first load.

**Step 3: Commit**
Run:
```bash
git add src/components/ScrollAnimationWrapper.tsx
git commit -m "perf: make ScrollAnimationWrapper mount-aware to prevent opacity:0 in pre-rendered static HTML"
```

---

### Task 3: Refactor Vite Code Splitting Chunk Strategy (`vite.config.ts`)

**Files:**
- Modify: [vite.config.ts](file:///Users/ssrrattan/Documents/SSR_Website/vite.config.ts)

**Step 1: Refactor manualChunks**
Adjust chunking logic to prevent general React libraries (like `motion/react` and Radix primitives) from being bundled into the core `vendor` package.

Replace `manualChunks` configuration:
```typescript
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("recharts") || id.includes("recharts-scale") || id.includes("d3-")) return "charts";
              if (id.includes("lucide-react")) return "icons";
              if (id.includes("@tanstack/react-query") || id.includes("@tanstack/query-core")) return "query";
              if (id.includes("next-themes")) return "theme";
              if (id.includes("motion") || id.includes("framer-motion")) return "motion";
              if (id.includes("@supabase/supabase-js")) return "supabase";
              if (id.includes("@radix-ui/")) return "radix";
              if (
                id.includes("node_modules/react/") ||
                id.includes("node_modules/react-dom/") ||
                id.includes("node_modules/react-router/") ||
                id.includes("node_modules/react-router-dom/") ||
                id.includes("node_modules/scheduler/")
              ) {
                return "vendor-core";
              }
              if (id.includes("cmdk") || id.includes("vaul") || id.includes("sonner") || id.includes("embla") || id.includes("input-otp")) return "ui-vendor";
            }
          },
```

**Step 2: Run verification**
Run: `pnpm build`
Expected: Vendor bundle should be split. The output should list `dist/assets/vendor-core-*.js` and `dist/assets/motion-*.js`, showing a much smaller core vendor bundle.

**Step 3: Commit**
Run:
```bash
git add vite.config.ts
git commit -m "perf: refine manualChunks chunking logic to prevent bundling Framer Motion and Radix in core vendor"
```

---

### Task 4: Establish Agent Rules and System Memory

**Files:**
- Create: [AGENTS.md](file:///Users/ssrrattan/Documents/SSR_Website/.agents/AGENTS.md)
- Create: [SYSTEM_MEMORY.md](file:///Users/ssrrattan/Documents/SSR_Website/.agents/SYSTEM_MEMORY.md)

**Step 1: Create AGENTS.md**
Define strict workspace-wide rules for future coding agents. Add rules for image generation, code splitting, performance optimization, SEO guidelines, and design aesthetics.

**Step 2: Create SYSTEM_MEMORY.md**
Establish the codebase memory structure containing architecture layout, key directories, tech stack details, and optimization policies.

**Step 3: Commit**
Run:
```bash
git add .agents/AGENTS.md .agents/SYSTEM_MEMORY.md
git commit -m "docs: establish workspace rules and system memory for AI agent workflows"
```
