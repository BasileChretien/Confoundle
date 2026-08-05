# Keeping dependencies current

The rule: **an update lands only if something independent has proved the
project still works.** What follows is how that is enforced here, including the
one place where it cannot be enforced automatically and why.

## The constraint that shapes everything below

The repository is **private on a free plan**. Branch protection and required
status checks are paid features, so GitHub cannot be told "do not merge unless
CI passes". Its auto-merge would therefore have nothing to wait for and would
merge immediately, which is worse than no automation at all: it looks like a
gate and is not one.

So there is **no automerge**, deliberately. Instead the checking is pushed
into the two places that still work on a free private repository:

1. **CI runs on every push and pull request** and tells you plainly whether a
   dependency PR is safe. Merging is then one click, on evidence.
2. **The install itself refuses versions that are too new**, which is the
   protection that matters most for unattended updates and needs nothing from
   GitHub at all.

If this repository ever goes public, or onto a paid plan, required status
checks become available and an automerge workflow is worth adding for patch and
minor updates. Until then, one click a week is the honest design.

## What runs, and when

| Piece | File | What it does |
|---|---|---|
| CI | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | On every push and PR: `tsc --noEmit`, the full test suite, then a real production build |
| Dependabot | [`.github/dependabot.yml`](../.github/dependabot.yml) | Opens grouped PRs weekly on Monday |
| Release-age policy | [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) | Refuses any package version published less than three days ago |

The production build is in CI on purpose, not tests alone. The lesson-page
prerender in `vite.config.ts` runs at build time and nowhere else, so a change
that broke all 170 pages would sail through a test-only pipeline.

## The release-age policy, and why it is the real protection

`minimumReleaseAge: 4320` (three days) means an install will not accept a
version published more recently than that. CI runs `pnpm install
--frozen-lockfile`, so **the policy is checked in CI**, and a Dependabot PR that
bumps to a release published yesterday fails there. That is a genuine automated
supply-chain gate that survives having no branch protection.

The attack it addresses is a maintainer account compromise: a malicious version
is published and is usually caught and pulled within hours. Three days means an
automated weekly update never reaches for something the ecosystem has not had
time to look at.

It bites, and it is supposed to. When this policy was first switched on it
immediately rejected six packages that had just been installed by hand,
including React 19.2.8, published two days earlier. The resolution was to apply
the rule rather than exempt the upgrade: the ranges in `package.json` were
loosened from `^19.2.8` to `^19.2.0` so pnpm could pick the newest **mature**
release, and it settled on 19.2.7. Nothing was lost.

That is why the caret ranges here are deliberately loose. Pinning
`^<newest-possible>` fights the policy for no benefit.

**Postinstall scripts are also off** unless a package is listed under
`allowBuilds`. An install is otherwise arbitrary code execution from every
package in the tree. Only esbuild is allowed, because it genuinely needs to
fetch a platform binary.

If an urgent security patch is younger than three days, install it by hand and
deliberately. The policy is there to restrain automation, not you.

## When the vulnerable package is not one of yours

Every advisory this project has had to answer so far has been against a
**transitive** dependency of the build tooling, never against anything in
`package.json`. That changes how the fix works, in a way worth writing down
because the obvious command silently does nothing.

The reflex is `pnpm update <pkg> --depth Infinity`. That works only when the
locked version has fallen **outside** the parent's declared range. When the
parent's range already permits the patched version, pnpm has nothing to
re-resolve: the lockfile is already valid, so the command reports `Already up
to date` and leaves the vulnerable version exactly where it was. Naming the
version explicitly does not help either. `pnpm update fast-uri@3.1.5 --depth
Infinity` prints the same line.

That is not an edge case. It is the normal shape of a backported security
patch: `ajv` declares `fast-uri: ^3.0.1`, and the fix shipped in 3.1.5, which
that range had always allowed.

So the lever is an `overrides` entry in
[`pnpm-workspace.yaml`](../pnpm-workspace.yaml), which forces a version
regardless of what any parent asked for. Both entries there exist for this
reason and for no other.

**Cap the range unless you have actually checked the next major.** The
`brace-expansion` entry is an open floor, `">=5.0.8"`, and that was safe.
Copying its shape is not always safe. `fast-uri` is capped at `">=3.1.5 <4"`
because upstream backported the fix to the 3.x line and publishes it under the
`three` dist-tag, while `latest` points at a 4.x major that `ajv` has not
adopted. An uncapped floor would have forced that major on `ajv` as a side
effect of a patch, which is a far larger change than the advisory asked for and
one nobody would have reviewed.

An override that resolves to nothing fails quietly, so confirm the fix actually
reached the tree:

```bash
corepack pnpm why fast-uri
```

Overrides are not free. Each one pins a version the ecosystem will eventually
reach on its own, and once a parent requires the patched version itself the
entry becomes dead weight that can hold that package *back*. When `pnpm why`
shows the parent range no longer needs it, delete it.

## What lands by itself and what does not

Nothing lands by itself. Every PR is merged by a person looking at a green
check. Dependabot groups them so that is roughly one decision a week rather
than fifteen:

- **Patch and minor**: one grouped PR. If CI is green, merge it.
- **Majors** are grouped by what breaks together, not one PR per package. That
  is a lesson from this project's own history: React 19 could not be upgraded
  alone, because `@vitejs/plugin-react` 6 refuses to load under Vite 5 and dies
  with `ERR_PACKAGE_PATH_NOT_EXPORTED`. A single-package PR would have failed
  CI for a reason that had nothing to do with React, and the obvious conclusion
  drawn from it would have been wrong.
- **zod and tailwindcss majors are ignored entirely.** Not because they matter
  least but because they matter most: zod defines the schema every puzzle is
  validated against, and Tailwind owns the whole visual system. Both need a
  deliberate migration, on a branch, with the upstream guide open. Both went to
  v4 by hand in July 2026, and the Tailwind one is the case for this rule: its
  official codemod is good but not sufficient, and two of the changes that
  mattered most were ones no test could have caught. See the note below.

### What the Tailwind 4 migration actually needed

Recorded because the next major will be similar, and because it shows what the
"ignore, migrate by hand" policy is buying.

The official codemod (`npx @tailwindcss/upgrade`) did the bulk correctly: it
translated the whole `tailwind.config.ts` palette into a CSS `@theme` block
with every class name unchanged, and modernised arbitrary values
(`min-h-[100dvh]` to `min-h-dvh`, `max-w-[17rem]` to `max-w-68`). Three things
it did not do, in ascending order of how quietly they would have broken:

1. **`postcss.config.js` and `autoprefixer` are gone**, replaced by
   `@tailwindcss/vite` in both plugin arrays. Mechanical, and obvious if missed.
2. **Placeholder colour and button cursor changed defaults.** v4 gives buttons
   `cursor: default` and placeholders a different colour. Both restored
   deliberately, the cursor in a base layer.
3. **`outline-none` changed meaning, and this is the one worth remembering.**
   In v3 it emitted a transparent 2px outline, which Windows High Contrast
   turns into a visible focus ring. In v4 that behaviour is called
   `outline-hidden`, and `outline-none` genuinely removes the outline. All 21
   sites here pair it with `focus-visible:ring-*`, and ring utilities are not
   rendered in forced-colors mode, so leaving them as `outline-none` would have
   made keyboard focus **invisible to exactly the users who most depend on it**,
   while compiling, passing all 304 tests and looking perfect in a screenshot.
   Verified afterwards by checking the built CSS really contains
   `@media (forced-colors:active)` for those selectors.

One further trap the research caught before it landed: on some runs the codemod
rewrites the string `"outline"` to `"outline-solid"` in
`src/app/googleSignIn.ts`, where it is the Google Identity Services `theme`
parameter and not a class at all. It compiles and the tests pass. Check that
file after any future Tailwind codemod run.

CSS cost, measured: 21.9 kB raw and 5.47 kB gzip becomes 30.5 kB and 6.77 kB,
from the emitted theme variables, `@property` declarations and `color-mix`
fallbacks. Small next to the main chunk, and worth knowing.

The CSS entry uses `@import 'tailwindcss' source(none)` with explicit `@source`
lines rather than automatic detection, because automatic detection walks up the
directory tree and scans sibling git worktrees under `.claude/`, so a class
deleted on this branch would keep its CSS because another branch still mentions
it.

## The gap nothing here covers

CI proves the project compiles, its tests pass and it builds. It does not prove
the site still **looks** right. A CSS framework can move a colour or change a
default border without failing a single assertion.

Two mitigations, and neither is complete:

1. Cloudflare Pages builds a **preview deployment for every branch**, so any
   dependency PR has a real URL to open before merging.

   A red Pages check is not automatically a red project, and on a dependency PR
   the temptation to assume otherwise is strong. The build clones the repository
   before it installs anything, and that clone can fail on its own: one preview
   here died after seven minutes with `curl 56 GnuTLS recv error` during
   `Cloning repository...`, on a branch whose CI was green, having never reached
   `pnpm install`. Read the log before believing the failure.

   Wrangler will not show it to you. `wrangler pages deployment tail` streams
   Functions logs at runtime, and `wrangler pages deployment list` gives you
   status but no build output. The log lives in the dashboard, under **Workers
   and Pages > confoundle > Deployments >** the deployment **> Build log**,
   which is where the check's own link lands. There is also an API route, if you
   are holding a token with Pages read access:

   ```
   GET /accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs
   ```

   **Retry deployment**, in that same view, tests whether the failure
   reproduces. Be careful what you conclude from a green retry: it shows the
   failure did not happen again, which is evidence and not proof. A flaky
   failure and a real one both sometimes pass on the second run, so it is the
   log that tells you which you had.
2. The tests cover the places where silence would be most dangerous: the zod
   contract, the rate and timeline derivations, SRS scheduling, and the account
   endpoints driven end to end against real SQLite.

For anything touching rendering, open the preview and look at it. That is the
check, and no configuration file can do it for you.

## Doing it by hand

```bash
corepack pnpm outdated
```

```bash
corepack pnpm update --latest
```

Then always, and in this order, because each catches what the previous cannot:

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
  project code runs, and the server tests need the same builtin. This file was
  quietly wrong for a long time, because every development machine here runs a
  newer Node and ignores it. Only the clean-room CI build exposed it, which is
  the argument for having CI at all.
- **pnpm** is pinned by `packageManager` in `package.json`, which is what gives
  CI, the Cloudflare build image and a laptop the same version.
