# Retheme: "Linear / Agentic Studio" (Option 1)

## What the site looks like now
- Colors: teal main color, emerald green second color, orange highlight color. The light theme is the default and a dark theme is also available.
- Homepage: Hero (teal-to-green gradient on the rotating tagline, blurred teal and green glows, grid backdrop), a solid teal Stats banner, Snapshot, Work, Strengths, Services, FAQ, Beyond Work and the Footer.
- More pages have been added since the last audit:
  - 3 service pages (AI WordPress, Custom AI Solutions, Business Automation)
  - 8 Insights articles
  - Case study detail page
- The Insights articles hardcode an `emerald-500` green for "results" labels. That green won't follow a theme change, so it needs separate handling.
- The fonts are Archivo for headings and Space Grotesk for body text. Neither is a default font, so both stay.

## What changes

**1. New color system (the whole site, both themes)**
- Dark: deep carbon background `#090D16`, slightly lighter slate cards, cool hairline borders.
- Light: cool zinc-white background and crisp white cards.
- Main color: cobalt blue `#2563EB` in light, sky `#38BDF8` in dark.
- Second color: cyan/violet, used only for "live agent / AI" signals.
- Orange highlight: removed as a decorative color. The main call-to-action button keeps strong contrast and turns blue.
- Every page that uses the theme colors updates on its own.

**2. Homepage polish**
- Hero:
  - The rotating tagline gets a blue-to-cyan gradient.
  - The two colored glows become one soft blue spotlight.
  - The grid backdrop gets fainter.
  - The "Open For" card gets a monospace label and a hairline border.
- Stats: the solid teal banner becomes a slim metric strip on the page background, with dividers, glowing blue numbers and monospace labels.
- Snapshot, Work, Strengths, Services, Beyond Work: saturated colored pills become muted 1px-border tags in a small monospace font, and the mixed green and orange icon colors become one color.
- Cards: one consistent hover effect, a faint blue border glow, replaces the mixed teal, green and orange effects.

**3. Service pages, Insights and Case Study**
- The hardcoded emerald "result" labels move to a new theme color called "success", a cyan-teal that fits the palette.
- The Case Study page gets the same badge and icon cleanup (it has the most color references, 17).

**4. Unchanged**
- Layouts and content
- The resume print page, which keeps its burgundy sidebar
- The enquiry form behavior
- Fonts
- Animations, which stay subtle

## Technical details
- `src/index.css`: rewrite the `:root` and `.dark` HSL tokens and add `--success` and `--glow` tokens. Replace the hardcoded `.shadow-*` rules with tokenized shadows.
- `tailwind.config.ts`: add the `success` color and `font-mono` (JetBrains Mono, or the system mono stack to avoid a new download).
- Components: `Hero`, `Stats`, `Snapshot`, `Work`, `Strengths`, `Services`, `BeyondWork`, `Footer`, `Header` (accent usages), and `ui/button` (check the accent variant).
- Pages: `CaseStudyDetail`, the 3 service pages, and the 8 Insights articles: change `emerald-500` to `success`.
- Memory: replace the Core color rule (teal/orange/emerald) with the new palette.
- Verify with screenshots of the homepage in light and dark, plus one Insights page and one service page.
