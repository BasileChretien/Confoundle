# Confoundle

Mobile-first, open-source PWA that teaches people to spot flaws in causal/statistical reasoning by fooling them first, then revealing the trick. Atomic experience = one puzzle in four beats: **setup → commit → reveal → lesson**, ending in a shareable card. See [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) for full product context; this repo is the **Phase 0 prototype** (one seed puzzle, generic engine).

## Commands

- `pnpm dev` — dev server (mobile-first; test at a phone-sized viewport)
- `pnpm build` — `tsc` type-check + `vite build` (emits PWA assets)
- `pnpm preview` — serve the production build
- `pnpm test` — Vitest (includes the seed-data paradox proof)
- `pnpm gen:icons` — regenerate PWA PNG icons from the brand motif

pnpm is provisioned via Corepack (`packageManager` is pinned). If `pnpm` isn't on PATH, use `corepack pnpm <cmd>`.

## Architecture

- `src/puzzles/` — the **contract**: `schema.ts` (single zod source of truth → inferred `Puzzle` type), `data/*.ts` (puzzle content), `index.ts` (registry; validates every puzzle at load).
- `src/engine/` — renders **any** puzzle from its data. Beats in `PuzzleFlow.tsx`; views in `SetupView`/`CommitView`/`RevealView`/`LessonView`/`share/ShareCard`. Generic chart via `charts/DataViewRenderer.tsx` → `RateChart.tsx`. **Pure derivation** (aggregate/stratified rates — reused by future Remotion templates) in `charts/rates.ts`.
- `src/app/` — PWA shell (`App.tsx`, `main.tsx`), `i18n.tsx`, `session.ts` (localStorage), `analytics.ts` (no-op stub).

## Conventions (project-specific)

- **Adding a puzzle = one new data file** in `src/puzzles/data/` + a line in `index.ts`. Zero engine changes. A genuinely new data shape adds a `PuzzleData` union member in `schema.ts` and a branch in `DataViewRenderer.tsx`.
- **Numbers are authored once** as raw `observations`; all rates are derived. Never hardcode a percentage that could contradict the counts.
- **Every user-facing string is locale-keyed** (`{ en: … }`). Use `useT()` / `translate()` from `app/i18n`; never inline a bare display string that a puzzle should own.
- **Rigor is existential.** Every puzzle's factual claim needs `provenance` (enforced by schema). Don't oversimplify — see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- **Respect `prefers-reduced-motion`** in any new animation (see `useReducedMotion` / `useCountUp`).
- **No backend, no accounts, no personal data.** Analytics is a no-op stub with fixed funnel event names; keep it that way.

## Stack

Vite + React + TypeScript · Tailwind CSS v3 · vite-plugin-pwa · zod · motion (framer-motion) · html-to-image. Node ≥ 18.
