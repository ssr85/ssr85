# System Memory & Architecture Document (SYSTEM_MEMORY.md)

This document provides system-wide architectural details, directory outlines, and tech stack contexts to guide future AI agents.

## 1. Directory Structure

```
├── .agents/                    # Workspace agent configurations (Rules & Memory)
│   ├── AGENTS.md               # Behavioral constraints and coding rules
│   └── SYSTEM_MEMORY.md        # This architectural context document
├── docs/                       # Project documentation
│   └── plans/                  # Completed implementation plans
├── src/                        # Source files
│   ├── main.tsx                # Client-Server Root Entry (ViteReactSSG)
│   ├── App.tsx                 # Route declarations & provider bindings
│   ├── index.css               # Core styling and Tailwind setup
│   ├── pages/                  # Route level page views (Index, Resume, Case studies)
│   ├── components/             # Reusable and page-specific components
│   ├── hooks/                  # Custom React hooks (useLenis, etc.)
│   └── data/                   # JSON/JS structures containing portfolio details
```

## 2. Rendering & Hydration Architecture

- **Build Pipeline**: The site uses `vite-react-ssg` to compile pages during production.
- **Server Side Generation (SSG)**: Pages (such as `index.html`, `resume.html`, and individual case studies) are fully pre-rendered into static HTML on the build server.
- **Client Hydration**: When a user visits the site, the browser instantly loads the static HTML. After core JavaScript chunks are downloaded, React hydreates the static markup, attaching event listeners and enabling client-side interactions.

### Crucial Hydration Rule

Do not use React lazy-loading for landing page components. Statically import them. Any transition or animation wrapper (e.g. `ScrollAnimationWrapper.tsx`) must check `isMounted` before setting initial styles (like `opacity:0` or scale changes). This ensures that static HTML is fully visible immediately upon delivery, while scroll animations trigger smoothly post-hydration.

## 3. Technology Stack & Key Dependencies

- **Framework**: React 18 & TypeScript
- **CSS Utility**: Tailwind CSS (configured in `tailwind.config.ts` and `postcss.config.js`)
- **Animations**: Framer Motion (imported from `motion/react`)
- **Database/Auth**: Supabase (`@supabase/supabase-js`)
- **State/Caching**: React Query (`@tanstack/react-query`)
- **Layout & Interactions**: next-themes (theme management), lenis (smooth scroll)
- **SSG**: `vite-react-ssg`

## 4. Code Splitting Chunk Strategy

To maintain maximum loading speed, the manual chunks are configured inside `vite.config.ts`:
- **vendor-core**: Core React dependencies (`react`, `react-dom`, `react-router`, `react-router-dom`, `scheduler`)
- **motion**: Animation library (`motion`, `framer-motion`)
- **radix**: Accessibility primitives (`@radix-ui/*`)
- **supabase**: Database engine client (`@supabase/supabase-js`)
- **query**: Network querying client (`@tanstack/react-query`)
- **theme**: Color-theme utility (`next-themes`)
- **ui-vendor**: Interface helpers (`vaul`, `sonner`, `embla`, `cmdk`)
- **lenis**: Scroll easing utility (`lenis`)
- **icons**: Icon definitions (`lucide-react`)
- **charts**: Data visualization (`recharts`, `d3-*`)
