# Contributing to Confoundle

Confoundle teaches people to reason more carefully. That only works if the tool itself is rigorous and fair. **One confidently-wrong or slanted puzzle hands critics the whole project** — so the content bar is high, on purpose, and matters more than raw volume.

By contributing content you agree to license it under **CC-BY-SA 4.0** (code contributions are **MIT**).

## The content bar (non-negotiable)

Every puzzle must clear all four:

1. **Sourced.** Every factual claim is cited to primary literature in the puzzle's `provenance` (source, year, URL/DOI). No puzzle ships uncited.
2. **Correct *and* not oversimplified.** The statistics must be right — and the puzzle must not swap one tidy-but-false story for another. When the honest answer is "it's complicated" (multiple confounders, measurement bias, a body of evidence rather than one study), **say so**. Teach the reasoning move, never a conclusion the evidence doesn't support.
3. **Politically balanced as a set.** The example set is deliberately non-partisan and, taken together, includes cases where *every* side reasons badly — including ones that challenge the contributors' own priors. A charged example is welcome only if the overall set stays balanced.
4. **Honest framing.** Use only honesty-compatible hooks (surprise, the counterintuitive *aha*, "you'll see it everywhere"). Never anger or oversimplification — those are the engine of what we're fighting.

## Review process

Puzzles go through a lightweight, peer-review-style pipeline before merge:

1. **Draft** — authored as a data file with a claimed lesson (see below).
2. **Source check** — every factual element is cited and the numbers reproduce from the cited source.
3. **Rigor review** — a second reviewer confirms the statistics are correct and not oversimplified.
4. **Neutrality review** — a check on the *balance of the whole set*, not just the one puzzle.
5. **Publish** — with a changelog entry and an easy path to report errors.

## Adding a puzzle (mechanics)

See the ["How to add a puzzle"](./README.md#how-to-add-a-puzzle) section of the README. In short:

1. Add `src/puzzles/data/<slug>.ts` exporting a `Puzzle` (typed against `src/puzzles/schema.ts`).
2. Register it in `src/puzzles/index.ts`.
3. Run `pnpm test` and `pnpm build` — the schema validates every puzzle at load (fails fast on missing provenance, self-contradictory data, etc.). Where practical, add a test asserting your puzzle's data actually produces the effect it teaches (see `src/engine/charts/rates.test.ts` for the seed puzzle's paradox proof).

## Reporting an error

Found a mistake in a puzzle — a wrong number, a misleading framing, a missing nuance? Open an issue. Corrections to content are the most valuable contribution there is; getting the facts right is the entire credibility of the project.
