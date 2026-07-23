# Confoundle

**Spot the hidden variable.** A mobile-first, open-source reasoning game that teaches you to catch flaws in causal and statistical arguments — by first fooling you, then showing you the trick.

Each puzzle runs in four beats: **setup → commit → reveal → lesson**, ending in a screenshot-able **share card**. You have to commit to an answer *before* the reveal — the small sting of being caught is the whole point.

This repository is the **Phase 0 prototype**: sixteen fully playable puzzles on a generic engine, served one-per-day Wordle-style, in ten languages, plus a **Trap Hunt** item bank of 63 scenarios for testing whether you can spot a flaw when nobody has told you one is there.

The puzzles so far: Simpson's paradox, the base-rate fallacy, correlation vs causation, survivorship bias, the prosecutor's fallacy, the Will Rogers phenomenon, lead-time bias, spectrum bias, Berkson's bias, relative vs absolute risk, confounding by indication, length-time bias, publication bias, intention to treat vs per protocol, recall bias, and immortal time bias.

Which biases a doctor is actually examined on differs sharply by country, and the deck is audited against nine national licensing systems in [`docs/exam-syllabus-audit.md`](./docs/exam-syllabus-audit.md).

Most new puzzles are just a data file; the engine renders them with no code changes. A genuinely new *shape* of data (a timeline rather than a set of rates, say) adds one member to the schema union and one renderer. See [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) for the full product vision and [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the content bar, which is deliberately high.

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

`pnpm build` emits a fully static site to `dist/` — no server, no environment variables, no secrets, nothing collected about the visitor. Host it anywhere that serves static files. The two optional Pages Functions below add a global percentile and accounts; skip them and everything else still works.

**Cloudflare Pages** is the recommended host (free tier, unlimited bandwidth, global CDN). Two ways:

```bash
# A) Direct upload — live in ~2 minutes, no GitHub needed
pnpm run deploy
#   builds, then uploads dist/ via wrangler; first run opens a browser
#   to log into your Cloudflare account
```

> Wrangler is invoked through `npx` (npm's flat layout), not `pnpm dlx` — under
> pnpm's isolated store, wrangler's `miniflare` can't resolve `undici` and
> crashes on startup.

Or **B) Git-connected** for auto-deploy on push: in the Cloudflare dashboard, *Workers & Pages → Create → Pages → Connect to Git*, then set **build command** `pnpm build` and **output directory** `dist`. Node version is pinned by [`.node-version`](./.node-version); caching/headers come from [`public/_headers`](./public/_headers).

### Optional: the global percentile

The results screen can show "you beat X% of players today". It is served by a Pages Function ([`functions/api/score.ts`](./functions/api/score.ts)) that stores **only an anonymous histogram of scores per day**: no names, no identifiers, nothing that can single a player out. Without the binding below the endpoint simply fails and the app hides the line, so the feature is entirely optional and nothing breaks without it.

To enable it:

```bash
npx wrangler kv namespace create SCORES
```

Then in the Cloudflare dashboard open the Pages project and go to **Settings → Functions → KV namespace bindings**, binding the new namespace to the variable name `SCORES` (for Production, and Preview if you use it). Redeploy with `pnpm run deploy`.

### Optional: accounts

Signing in (one click with Google, or a code emailed to you) makes your **spaced-repetition schedule follow you between devices**. That is the only thing it does: nothing is gated on an account, answers and streaks stay on your device either way, and a deployment without the bindings hides the panel entirely.

It runs on **Cloudflare D1**, not KV — the reasoning, along with the full setup runbook, is in [`docs/accounts.md`](./docs/accounts.md). There is **no password column**: both routes prove control of an email address, so there is nothing worth stealing and nothing to reset.

Deletion and export are built in from day one and are in the panel, not behind a support request: **Download my data** returns everything held about you, and **Delete my account** erases it immediately, everywhere, with no grace period. Every field stored is listed in [`docs/data-inventory.md`](./docs/data-inventory.md); the policy users read is [`public/privacy.html`](./public/privacy.html).

### Shareable lesson pages

`pnpm build` also writes **one static page per lesson per language** to `dist/l/<slug>/` (English) and `dist/l/<slug>/<locale>/`, plus a `sitemap.xml`. Sixteen puzzles across ten languages is 160 pages, about 10 KB each.

These are for a case the game itself can't serve: someone is arguing on the internet and you want to hand them **the explanation**, not a puzzle. A link into the game opens something built to fool the reader first, which lands badly when it arrives from the person you're arguing with, and a single-page app returns the same empty shell to the crawler that builds the link preview — so every lesson would unfurl with the same title. Each page carries its own Open Graph and Twitter tags, works with JavaScript off, and links back into the puzzle for anyone who'd rather be fooled first.

The lesson screen has a **Copy link** button that copies the skill, the one-line rule, and the link in the reader's current language.

Absolute URLs (canonical, `hreflang`, Open Graph) are baked at build time. Override the default for a fork or a custom domain:

```bash
SITE_ORIGIN=https://example.org pnpm build
```

- **No SPA rewrite needed.** Puzzles are addressed with a query string (`?p=<slug>`), not a path, so every request resolves to `index.html` on any static host out of the box. The lesson pages are real directories with their own `index.html`, so they work on the same hosts with no configuration.
- **Root vs. sub-path.** The default base path is `/` (root domains, incl. `*.pages.dev`). For a GitHub Pages project site served under `/<repo>/`, build with `--base=/<repo>/` instead.
- **The daily** rotates deterministically by date across the registry, so every visitor sees the same puzzle on the same day.

**Single-file build (no host required).** `SINGLEFILE=1 pnpm exec vite build` inlines everything — JS, CSS, and fonts — into one self-contained `dist-single/index.html` with a built-in puzzle picker. Open it directly, email it, or publish it as-is. (This mode drops the service worker / offline PWA.)

---

## How it's built

- **Vite + React + TypeScript**, **Tailwind CSS**, installable **PWA** (`vite-plugin-pwa`).
- **Puzzles are data.** Each puzzle is a typed file validated by a single **zod** schema; the inferred TypeScript type is the one source of truth.
- **The engine renders any puzzle generically** — no puzzle-specific code. Card image generation is client-side (`html-to-image`).
- **The game needs no server.** `dist/` is a static site and plays fully offline. Two optional Cloudflare Pages Functions sit beside it: the anonymous score histogram, and accounts. Without their bindings the app hides those features rather than breaking.

```
src/
  app/        PWA shell, routing/state, i18n, session (localStorage), analytics stub, sign-in
  engine/     components that render ANY puzzle from its data + the reveal animation
  puzzles/    the zod schema (the contract), the inferred type, and puzzle data files
  srs/        spaced repetition: the schedule, the review picker, and the stores
  server/     account logic (type-checked and unit-tested)
functions/    thin Cloudflare Pages Function adapters over src/server
migrations/   the D1 schema
```

---

## The puzzle data model

A puzzle is one object validated by [`src/puzzles/schema.ts`](./src/puzzles/schema.ts). The key ideas:

- **Every user-facing string is locale-keyed** (`{ en: "…" }`, other locales optional) — translatable from day one.
- **Numbers live once.** You author raw `observations` (numerator / denominator per group × stratum); the engine *derives* the aggregate and stratified rates. The paradox lives in that derivation, so the pooled result can never disagree with the strata by accident.
- **`data` is discriminated by `type`** (`"rates"`, `"frequencies"`, `"causal"`, `"survivorship"`, `"timeline"`, `"risk"`) so a new puzzle can add an entirely new chart shape without touching existing renderers. Build one whenever the lesson needs it: setup and reveal have to be two views of the *same* data, and a lesson forced into the wrong shape produces a reveal that merely restates the setup. See [`docs/risk-shape.md`](./docs/risk-shape.md) for a worked example of that decision.
- **A view can show part of the data.** `initialView` and `reveal.view` accept `groupIds` / `strataIds`, so the setup can show the one slice that creates the illusion and hold the rest back for the reveal. Omit them and the whole figure is drawn.
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
3. Add a test next to it asserting that your data actually produces the effect you claim (see `src/puzzles/data/*.test.ts`). This is the project's habit for a reason: it means a mistyped count fails CI instead of shipping a paradox that isn't one.
4. Add two or three **Trap Hunt** items in [`src/puzzles/testItems.ts`](./src/puzzles/testItems.ts), including at least one where the same kind of reasoning is genuinely *sound*. Without those, players learn that the answer is always "trap".
5. Translate. `pnpm test` fails if any authored English string is missing from any of the nine dictionaries in `src/app/translations/`, or if the dictionaries drift out of key parity.
6. If your puzzle introduces a **new data shape** (not success/total `"rates"`), add a member to the `PuzzleData` union in `schema.ts`, a renderer, a branch in `src/engine/charts/DataViewRenderer.tsx`, and a glyph in `share/ShareCard.tsx`. Existing puzzles are unaffected.

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) first — the content bar (sourcing, no oversimplification, a politically balanced set) is the point of the project.

---

## Licensing

- **Code:** [MIT](./LICENSE).
- **Puzzle content** (the text and data in `src/puzzles/data/`): **CC-BY-SA 4.0**, so improvements flow back. See [`LICENSE`](./LICENSE).
