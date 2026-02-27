# Portfolio Revamp Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio section into an "Executive Brief Carousel" with manual arrow navigation and enhanced project details.

**Architecture:** 
1. Update the data schema in `content.ts` to include `role`, `timeline`, `impact`, and `stats`.
2. Refactor `Projects.tsx` to use index-based state for navigation.
3. Replace `Tabs` with a custom carousel UI featuring `ChevronLeft`/`ChevronRight` arrows and a "Brief Bar."

**Tech Stack:** React, Tailwind CSS, Lucide React, tailwindcss-animate.

---

### Task 1: Update Data Schema

**Files:**
- Modify: `src/data/content.ts`

**Step 1: Add new fields to projects data**
Update the `projects` array to include the new professional detail fields.

```typescript
export const projects = [
  {
    id: "og-hemp",
    name: "OG Hemp",
    category: "Sustainable Enterprise",
    role: "Strategic Advisor",
    timeline: "2021 - Present",
    impact: "Established national distribution network across 15+ states.",
    stats: ["15+ States", "B2B Focus", "300% Growth"],
    description: "Architected the comprehensive go-to-market strategy...",
    highlights: ["Revenue Strategy", "Brand Architecture", "Supply Chain Resilience"],
    images: ["/images/projects/og-hemp-1.jpg", "/images/projects/og-hemp-2.jpg", "/images/projects/og-hemp-3.jpg"],
  },
  // ... apply similar updates to other projects
];
```

**Step 2: Commit data changes**
```bash
git add src/data/content.ts
git commit -m "data: enhance project schema with executive details"
```

---

### Task 2: Refactor Navigation Logic

**Files:**
- Modify: `src/components/Projects.tsx`

**Step 1: Replace Tabs with Index State**
Change the state management from `activeProject` (ID string) to `currentIndex` (number).

```typescript
const [currentIndex, setCurrentIndex] = useState(0);
const project = projects[currentIndex];

const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
```

**Step 2: Implement Navigation Arrows**
Add `ChevronLeft` and `ChevronRight` buttons to the UI.

**Step 3: Commit logic changes**
```bash
git add src/components/Projects.tsx
git commit -m "feat: refactor projects navigation to index-based carousel"
```

---

### Task 3: Implement "Executive Brief" UI

**Files:**
- Modify: `src/components/Projects.tsx`

**Step 1: Add the Brief Bar**
Inside `CardContent`, add a new section for Role, Timeline, and Impact.

```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-border/50">
  <div>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Role</p>
    <p className="text-sm font-medium text-foreground">{project.role}</p>
  </div>
  <div>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Timeline</p>
    <p className="text-sm font-medium text-foreground">{project.timeline}</p>
  </div>
  <div>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Impact</p>
    <p className="text-sm font-medium text-primary">{project.impact}</p>
  </div>
</div>
```

**Step 2: Commit UI updates**
```bash
git add src/components/Projects.tsx
git commit -m "feat: add executive brief bar to project cards"
```

---

### Task 4: Polish & Verified Completion

**Files:**
- Modify: `src/components/Projects.tsx`

**Step 1: Add Transitions and Stepper**
Add `animate-in fade-in slide-in-from-right-4` for smooth entry and a `01/04` indicator.

**Step 2: Verify build**
Run: `npm run build`
Expected: Success

**Step 3: Commit final polish**
```bash
git add src/components/Projects.tsx
git commit -m "style: final polish for portfolio carousel"
```
