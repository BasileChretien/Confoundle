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
  deliberate migration, on a branch, with the upstream guide open.

## The gap nothing here covers

CI proves the project compiles, its tests pass and it builds. It does not prove
the site still **looks** right. A CSS framework can move a colour or change a
default border without failing a single assertion.

Two mitigations, and neither is complete:

1. Cloudflare Pages builds a **preview deployment for every branch**, so any
   dependency PR has a real URL to open before merging.
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
