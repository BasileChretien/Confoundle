# Confoundle

**Spot the hidden variable.** A mobile-first, open-source reasoning game that teaches you to catch flaws in causal and statistical arguments — by first fooling you, then showing you the trick.

Each puzzle runs in four beats: **setup → commit → reveal → lesson**, ending in a screenshot-able **share card**. You have to commit to an answer *before* the reveal — the small sting of being caught is the whole point.

This repository is the **Phase 0 prototype**: four fully playable puzzles (Simpson's paradox, the base-rate fallacy, correlation ≠ causation, survivorship bias) on a generic engine, served one-per-day Wordle-style. Each new puzzle is just a data file — the engine renders it, no code changes. See [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) for the full product vision.

---

## Run it

Requires **Node ≥ 18**. The repo pins **pnpm** via `packageManager`, so [Corepack](https://nodejs.org/api/corepack.html) will provision the right version automatically.

```bash
corepack enable          # once, to enable pnpm through Node's Corepack
pnpm install
pnpm dev                 # open the printed localhost URL (use a phone-sized viewport)
```

Other scripts:

```bash
pnpm build        # type-check + production build (PWA assets included)
pnpm preview      # serve the production build locally
pnpm test         # run unit tests (incl. the seed-data paradox proof)
pnpm gen:icons    # regenerate PWA icons from the brand motif
```

> No `pnpm`? Either `corepack enable` (recommended) or run the same scripts with `npm` (`npm install`, `npm run dev`, …).

---

## Deploy

`pnpm build` emits a fully static site to `dist/` — no server, no environment variables, no secrets, nothing collected about the visitor. Host it anywhere that serves static files.

**Cloudflare Pages** is the recommended host (free tier, unlimited bandwidth, global CDN). Two ways:

```bash
# A) Direct upload — live in ~2 minutes, no GitHub needed
pnpm build
pnpm dlx wrangler pages deploy dist --project-name confoundle
#   first run opens a browser to log into your Cloudflare account
```

Or **B) Git-connected** for auto-deploy on push: in the Cloudflare dashboard, *Workers & Pages → Create → Pages → Connect to Git*, then set **build command** `pnpm build` and **output directory** `dist`. Node version is pinned by [`.node-version`](./.node-version); caching/headers come from [`public/_headers`](./public/_headers).

- **No SPA rewrite needed.** Puzzles are addressed with a query string (`?p=<slug>`), not a path, so every request resolves to `index.html` on any static host out of the box.
- **Root vs. sub-path.** The default base path is `/` (root domains, incl. `*.pages.dev`). For a GitHub Pages project site served under `/<repo>/`, build with `--base=/<repo>/` instead.
- **The daily** rotates deterministically by date across the registry, so every visitor sees the same puzzle on the same day.

**Single-file build (no host required).** `SINGLEFILE=1 pnpm exec vite build` inlines everything — JS, CSS, and fonts — into one self-contained `dist-single/index.html` with a built-in puzzle picker. Open it directly, email it, or publish it as-is. (This mode drops the service worker / offline PWA.)

---

## How it's built

- **Vite + React + TypeScript**, **Tailwind CSS**, installable **PWA** (`vite-plugin-pwa`).
- **Puzzles are data.** Each puzzle is a typed file validated by a single **zod** schema; the inferred TypeScript type is the one source of truth.
- **The engine renders any puzzle generically** — no puzzle-specific code. Card image generation is client-side (`html-to-image`); there is no backend.

```
src/
  app/        PWA shell, routing/state, i18n, session (localStorage), analytics stub
  engine/     components that render ANY puzzle from its data + the reveal animation
  puzzles/    the zod schema (the contract), the inferred type, and puzzle data files
```

---

## The puzzle data model

A puzzle is one object validated by [`src/puzzles/schema.ts`](./src/puzzles/schema.ts). The key ideas:

- **Every user-facing string is locale-keyed** (`{ en: "…" }`, other locales optional) — translatable from day one.
- **Numbers live once.** You author raw `observations` (numerator / denominator per group × stratum); the engine *derives* the aggregate and stratified rates. The paradox lives in that derivation, so the pooled result can never disagree with the strata by accident.
- **`data` is discriminated by `type`** (`"rates"` today) so future puzzles can add entirely new chart shapes without touching existing renderers.
- **`provenance` is required** on every puzzle (source + year + URL/DOI). `goDeeperUrl` is optional and kept off the main flow.

Top-level shape (abridged):

| Field | Purpose |
|---|---|
| `id`, `slug`, `category`, `reasoningSkill`, `difficulty` | identity & taxonomy (free kebab strings, so new puzzles need no engine edit) |
| `setup` | headline, framing, question, the `data`, and the `initialView` shown before committing |
| `choices` | options to commit to; flags for `isCorrect` and `isIntuitiveTrap` |
| `reveal` | the confounder name + explanation, and the data `view` that shows the flip |
| `lesson` | the named portable skill + a "you'll see it everywhere" takeaway |
| `share` | card title + two caption framings (competitive / self-deprecating) |
| `provenance` | required citation backing the factual claim |
| `goDeeperUrl` | optional link for the curious |

---

## How to add a puzzle

Adding a puzzle requires **no engine changes** — only a new data file.

1. Create `src/puzzles/data/<your-slug>.ts` exporting a `Puzzle` (import the type from `../schema` for full autocomplete and type-checking).
2. Register it in [`src/puzzles/index.ts`](./src/puzzles/index.ts) (import it and add it to the array). Every puzzle is validated against the schema at load — a malformed or self-contradictory puzzle fails fast in dev, build, and tests.
3. If your puzzle introduces a **new data shape** (not success/total `"rates"`), add a member to the `PuzzleData` union in `schema.ts` and a matching renderer branch in `src/engine/charts/DataViewRenderer.tsx`. Existing puzzles are unaffected.

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) first — the content bar (sourcing, no oversimplification, a politically balanced set) is the point of the project.

---

## Licensing

- **Code:** [MIT](./LICENSE).
- **Puzzle content** (the text and data in `src/puzzles/data/`): **CC-BY-SA 4.0**, so improvements flow back. See [`LICENSE`](./LICENSE).
