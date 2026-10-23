# Project rules
- Single-page portfolio lives in `src/pages/Index.tsx`, styled by plain CSS in `src/portfolio.css` — it mirrors a user-supplied HTML design, so class names follow that design rather than Tailwind.
- All project content is in `src/data/projects.ts` — the user edits it directly, so keep it the single source.
- Canvas art is drawn by `src/lib/scenes.ts` via `SceneCanvas`; add new scene presets there, not inline.
- The opening scene is the non-interactive `attract` preset in `src/lib/scenes.ts`, mounted as `HERO_SHOT` in `src/data/projects.ts`; it plays itself and must never capture keyboard or touch input.
- Contribution breakdowns and duration are optional project data; show them only when supplied rather than inventing portfolio claims from template examples.
- Award entries live in `AWARDS` in `src/data/projects.ts` and render through the Achievements section; copy the ceremony, category and result exactly as the user states them and leave a category blank rather than inventing one.
