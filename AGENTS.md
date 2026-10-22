# Project rules
- Single-page portfolio lives in `src/pages/Index.tsx`, styled by plain CSS in `src/portfolio.css` — it mirrors a user-supplied HTML design, so class names follow that design rather than Tailwind.
- All project content is in `src/data/projects.ts` — the user edits it directly, so keep it the single source.
- Canvas art is drawn by `src/lib/scenes.ts` via `SceneCanvas`; add new scene presets there, not inline.
