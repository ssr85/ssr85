## Plan: Flight Ticker Animation for Pain Points

### What Changes

Replace the static list of pain points in the Case Studies section with a flight-ticker-style rotating animation. Each pain point will slide up and out while the next one slides in from below, cycling continuously.

### Technical Approach

**1. Add state and auto-rotation logic in `CaseStudies.tsx**`

- Add a `painPointIndex` state that increments on a 2 s interval (reset when `activeTab` changes)
- Display only one pain point at a time using the current index (modulo the array length)

**2. Implement the ticker animation**

- Wrap the pain point text in a fixed-height container with `overflow-hidden`
- Use CSS `@keyframes` for a vertical slide transition (translate Y from below → center → above)
- Apply `key={painPointIndex}` to trigger re-mount animation on each rotation

**3. Add keyframes to `tailwind.config.ts**`

- Add a `ticker-slide` keyframe: slides text from `translateY(100%)` → `0` → stays, then on exit slides to `translateY(-100%)`
- Alternatively, use two keyframes (enter from bottom, exit to top) with React state-driven class toggling

**4. Visual details**

- Keep the accent dot bullet alongside the rotating text
- Maintain same font size/color (`text-xs text-muted-foreground`)
- Container height fixed to one line to create the ticker window effect