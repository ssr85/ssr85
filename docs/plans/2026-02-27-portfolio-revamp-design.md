# Design Document: Portfolio Section Revamp

**Date:** 2026-02-27  
**Topic:** Portfolio Section Revamp (Executive Brief & Carousel Navigation)  
**Status:** Approved

## 1. Executive Summary
The goal is to transition the current "Tabs" based portfolio into a high-end "Executive Brief Carousel." This will provide deeper professional context for each project and introduce manual navigation arrows for a more interactive experience.

## 2. Architecture & Components

### 2.1 Data Layer (`src/data/content.ts`)
We will append the following fields to the `projects` array schema:
- `role`: (string) Professional title during the engagement.
- `timeline`: (string) Duration or dates of the project.
- `impact`: (string) Key quantifiable result or milestone.
- `stats`: (string[]) Brief metrics or high-level indicators.

### 2.2 UI Layer (`src/components/Projects.tsx`)
- **Carousel Engine:** Replace purely state-based tabs with an index-driven carousel logic.
- **Navigation:**
    - `ChevronLeft` and `ChevronRight` buttons positioned floating at the edges of the card.
    - Keyboard support (Left/Right arrows).
    - Dot indicators for project count/position.
- **Content Structure:**
    - **Top:** Existing Category Badge & Title.
    - **Middle:** Description & Industry Highlights.
    - **Bottom (New):** "The Executive Brief" bar containing Role, Timeline, and Impact in a structured grid with Lucide icons.
- **Transitions:** Implement `framer-motion` or standard CSS transitions for smooth horizontal slide-and-fade effects.

## 3. Data Flow
1. User clicks "Next/Prev" or a dot indicator.
2. `activeProjectIndex` state updates.
3. The component calculates the current project data.
4. CSS/Motion transitions trigger for the card content.

## 4. Visual Language
- **Colors:** Maintain the existing HSL-based brand palette (primary/secondary).
- **Icons:** Use Lucide icons: `Briefcase` (Role), `Calendar` (Timeline), `Trophy` (Impact).
- **Typography:** Bold headings for impact, muted text for secondary details.

## 5. Success Criteria
- Portfolio section feels more "professional" and "detailed."
- Navigation is intuitive through both mouse (arrows) and status indicators.
- Responsive layout maintains readability on mobile.
