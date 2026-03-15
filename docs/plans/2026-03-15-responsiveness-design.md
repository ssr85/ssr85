# Mobile Responsiveness Enhancements (Option 1)

## Goal
Improve the mobile responsiveness of the SSR Website, specifically focusing on the Hero banner buttons, Case Studies tab navigation, and global typography scaling.

## Proposed Changes

### 1. Hero Banner Buttons
Currently, the Hero banner buttons stack vertically on mobile. This change will make them side-by-side to save vertical space and allow for a tighter layout.
- Rename buttons to **"Let's Connect"** and **"Portfolio"**.
- Update the button container from `flex-col sm:flex-row` to `flex-row justify-center sm:justify-start`.
- Adjust padding and font size for mobile to ensure they fit side-by-side on smaller viewports.

### 2. Case Studies Tab Navigation
The project switcher in the Case Studies section can feel cramped on mobile.
- Add `overflow-x-auto` and `whitespace-nowrap` to the tab container.
- Ensure the tabs remain accessible and swipeable on mobile devices.

### 3. Global Typography Scaling
The current 110% base font size is excellent for desktop but can feel oversized on mobile.
- Move the `html { font-size: 110%; }` rule into a desktop media query (`@media (min-width: 768px)`).
- This will default mobile to 100% scaling, providing a more balanced feel on small screens.

## Verification
- Manual verification using the **browser-agent** to inspect the mobile viewport.
- Take screenshots of the Hero section and Case Studies section on mobile.
- Confirm global font size change by inspecting elements in the browser.
