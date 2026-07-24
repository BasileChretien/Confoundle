# Keeping dependencies current

The rule: **an update lands automatically only if something independent proves
the project still works.** Everything below exists to make that true rather
than aspirational.

## What runs, and when

| Piece | File | What it does |
|---|---|---|
| CI | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | On every push and every PR: `tsc --noEmit`, the full test suite, then a real production build |
| Dependabot | [`.github/dependabot.yml`](../.github/dependabot.yml) | Opens PRs weekly on Monday, grouped |
| Automerge | [`.github/workflows/automerge.yml`](../.github/workflows/automerge.yml) | Turns on auto-merge for patch and minor PRs, so they land **only** once CI is green |

The build is part of CI on purpose, not just tests. The lesson-page prerender
in `vite.config.ts` runs at build time and nowhere else, so a change that
breaks 170 pages would pass a test-only pipeline untouched.

## What lands by itself and what does not

**Patch and minor: automatic**, once CI passes. Grouped into a single weekly PR
so the repository does not fill with noise.

**Major: never automatic.** Dependabot opens the PR and the workflow comments
on it explaining why it will sit there. Majors are grouped by what breaks
together rather than one per package, which is a lesson from this project's own
history: React 19 could not be upgraded alone, because `@vitejs/plugin-react` 6
refuses to load under Vite 5 and fails with `ERR_PACKAGE_PATH_NOT_EXPORTED`. A
single-package PR would have failed CI for a reason that had nothing to do with
React, and the obvious conclusion drawn from it would have been wrong.

**zod and tailwindcss majors are ignored entirely.** Not because they do not
matter but because they matter most: zod defines the schema every puzzle is
validated against, and Tailwind owns the whole visual system. Both need a
deliberate migration and a human looking at the result. Upgrade them by hand,
on a branch, and read the upstream migration guide first.

## The gap a test suite cannot cover

CI proves the project compiles, its tests pass and it builds. It does not prove
the site still **looks** right. A CSS framework can move a colour or change a
default border without failing a single assertion.

Two mitigations, and it is worth being honest that neither is complete:

1. Cloudflare Pages builds a **preview deployment for every branch**, so any
   dependency PR has a real URL to open before merging.
2. The tests do cover the parts where silence would be most dangerous: the zod
   contract, the rate and timeline derivations, SRS scheduling, and the account
   endpoints driven end to end against real SQLite.

For a major that touches rendering, open the preview and look at it. That is
the check, and no configuration file can do it for you.

## Setup this needs, once, in the repository settings

Both are required. Without the second, auto-merge merges immediately and the
whole gate is decorative:

1. **Settings, General, Pull Requests**: enable **Allow auto-merge**
2. **Settings, Rules** (or Branches): a ruleset on `main` requiring the **CI /
   check** status check to pass before merging

## Doing it by hand

```bash
corepack pnpm outdated
```

```bash
corepack pnpm update --latest
```

Then, always, and in this order, because each catches what the previous one
cannot see:

```bash
corepack pnpm exec tsc --noEmit
```

```bash
corepack pnpm test
```

```bash
corepack pnpm build
```

## Version pins that are not negotiable

- **Node** is pinned in [`.node-version`](../.node-version) and must stay at or
  above 22.13. The pinned pnpm uses `node:sqlite` internally, so an older Node
  fails during `pnpm install` with `ERR_UNKNOWN_BUILTIN_MODULE` before any
  project code runs. The server tests need the same builtin. This file was
  quietly wrong for a long time, because every development machine here runs a
  newer Node and ignores it; only the clean-room CI build exposed it.
- **pnpm** is pinned by `packageManager` in `package.json`, which is what makes
  Corepack give CI, the Cloudflare build image and a laptop the same version.
