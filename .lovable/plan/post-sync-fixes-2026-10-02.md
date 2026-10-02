# Post-sync fixes

Commit `622fcb4` is synced and the build is green. Preview verification found two follow-ups:

## 1. Restore the blue "Agentic Studio" retheme
The GitHub sync overwrote the retheme — the preview shows the old emerald palette again.
- Re-apply the cobalt/sky color tokens in `src/index.css` (`:root` cobalt 221 83% 53%, `.dark` sky 199 92% 60%, `--success`, `--glow`)
- Re-apply `success` color + `mono` font family in `tailwind.config.ts`
- Re-apply the slim `Stats.tsx` metric strip and mono badge styles
- Sweep pages/components for leftover emerald/orange classes

## 2. Fix command menu accessibility warning
`CommandMenu.tsx` dialog is missing a `DialogTitle` — add one wrapped in `VisuallyHidden` so screen readers announce it (no visual change).

## Verification
- Typecheck passes
- Playwright check: home page renders in blue theme, Ctrl+K opens the menu with no console warnings
