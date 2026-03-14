# V2 Minimalist Landing Page Design Document

## Objective
Implement a secondary, minimalist version of the portfolio (`/v2`) based on the Stitch mockup, while leaving the existing homepage (`/`) completely unaffected.

## Architecture & Structure
We will use **Approach 1**: duplicating and modifying components to achieve the distinct visual layout without altering the core components used on the main route.

### Routing 
- Add a new route `/v2` in `App.tsx` mapped to a new `V2Index.tsx` page.

### Theming & Styling
- Implement a global `theme-v2` in `src/index.css`.
- Add the necessary CSS variables used in the Stitch mock, notably the primary accent color `#137fec`.
- The new components will use Tailwind utilities and reference the new V2 variables.

### Data Sourcing
- We will use **Option 2**. We'll separate the hardcoded text from the components.
- Create `src/data/v2Content.ts` containing the specific localized text structure observed in the Stitch mockup (e.g., At A Glance, Case Studies, Core Strengths).

### Component Breakdown
1. **`V2Index.tsx`**: The main page container. Applies the `.theme-v2` scope.
2. **`V2Header.tsx`**: A simplified top nav.
3. **`V2Hero.tsx`**: High-contrast, typography-focused hero section.
4. **`V2AtAGlance.tsx`**: Sections detailing Agentic Systems, Technical Leverage, Proven Impact, and Current Thesis.
5. **`V2CaseStudies.tsx`**: Singular focus on the "Lume" project.
6. **`V2Strengths.tsx`**: High-level bulleted strengths.
7. **`V2Footer.tsx`**: Minimal CTA to download the resume or get in touch.

## Next Steps
Transition to `writing-plans` to outline the exact execution steps to build this structure.
