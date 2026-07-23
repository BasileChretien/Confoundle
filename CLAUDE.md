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
- `src/app/` — PWA shell (`App.tsx`, `main.tsx`), `i18n.tsx`, `session.ts` (localStorage), `analytics.ts` (no-op stub), `auth.tsx` + `AccountPanel.tsx` (optional sign-in).
- `src/srs/` — spaced repetition, scheduled per **skill** not per item. `schedule.ts` (pure stage ladder), `select.ts` (draws a fresh scenario each review), `store.ts` (the `ProgressStore` interface + localStorage), `remoteStore.ts` (the account-backed one + `syncStores`).
- `src/server/` + `functions/api/**` — the account backend. All logic lives in `src/server/` so `tsc` and Vitest cover it; the files under `functions/` are thin adapters. `migrations/0001_accounts.sql` is the D1 schema, and the tests run against that exact file through `node:sqlite`. See [`docs/accounts.md`](./docs/accounts.md).

## Conventions (project-specific)

- **Adding a puzzle = one new data file** in `src/puzzles/data/` + a line in `index.ts`. Zero engine changes. A genuinely new data shape adds a `PuzzleData` union member in `schema.ts` and a branch in `DataViewRenderer.tsx`.
- **Build a new shape whenever the lesson needs one. Never bend a lesson to fit an existing shape.** The whole design rests on setup and reveal being two *views of the same data*, so if a bias cannot be told that way with the shapes on hand, the shape is what is missing, not the puzzle. Lead-time bias needed `timeline` because the claim was "the clock started earlier"; relative-versus-absolute risk needed `risk` because one bar chart cannot be both a proportion of the control risk and a proportion of everybody. A forced fit produces a reveal that just restates the setup, which is worse than the extra file. Adding a shape is: a union member in `schema.ts`, a pure derivation module in `engine/charts/` with a test, a renderer, a `DataViewRenderer` case plus `scopeLabel` entries for the new `DataView` kinds, and a glyph in `share/ShareCard.tsx`. Existing puzzles stay untouched. Extending an *existing* shape follows the same spirit: add optional fields (never `.default()`, which the inferred type makes required and forces edits to every existing puzzle).
- **Numbers are authored once** as raw `observations`; all rates are derived. Never hardcode a percentage that could contradict the counts.
- **Every user-facing string is locale-keyed** (`{ en: … }`). Use `useT()` / `translate()` from `app/i18n`; never inline a bare display string that a puzzle should own.
- **Translations are enforced, not remembered.** `src/app/translations/coverage.test.ts` fails if any authored English string is missing from any of the nine dictionaries, or if the dictionaries drift out of key parity. Dictionaries are keyed by the exact English source text, so a key that differs by one character fails silently at runtime and falls back to English forever: always copy keys programmatically, never retype them. To get the worklist as JSON (the failure message has the same content, but JSON lets a translation pass generate entries by script), drop a throwaway `src/app/translations/_worklist.test.ts` that imports `DICTIONARIES`, `puzzles`, `TEST_ITEMS` and `TAGS`, walks them for every object with a string `en`, and writes `{ locale: missingStrings[] }` via `await import("node:fs")`. Run it, then delete it. It cannot live in the repo permanently because the project carries no `@types/node`. Note that engine chrome (the `scopeLabel` strings, share-card text) is *not* reachable by that walk, so new view kinds need their scope labels translated by hand.
- **Rigor is existential.** Every puzzle's factual claim needs `provenance` (enforced by schema). Don't oversimplify — see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- **Respect `prefers-reduced-motion`** in any new animation (see `useReducedMotion` / `useCountUp`).
- **Accounts are optional and buy exactly one thing.** Signing in makes the SRS schedule follow you between devices. Nothing else syncs, nothing is gated on an account, and a build with no functions behind it hides the panel rather than showing something broken. There is no password column and no plan for one: both sign-in routes prove control of an email address, which is what makes linking them safe. Every field stored is listed in [`docs/data-inventory.md`](./docs/data-inventory.md), and the published policy is `public/privacy.html`. **Adding anything that holds personal data means adding its table to `PERSONAL_TABLES` in `src/server/accounts.ts`**, or erasure will silently leave it behind; the test in `accounts.test.ts` checks that list is complete. Analytics is still a no-op stub with fixed funnel event names; keep it that way, and keep the answers, streaks and scores local.
- **Chrome strings are translated too.** `src/app/ui.ts` (`UI` and `ACCOUNT`) carries all ten locales inline, enforced by `src/app/ui.test.ts`. This is separate from the dictionary coverage test, which only walks puzzles, test items and tags and therefore cannot see interface strings.

## Stack

Vite + React + TypeScript · Tailwind CSS v3 · vite-plugin-pwa · zod · motion (framer-motion) · html-to-image. Node ≥ 18.
