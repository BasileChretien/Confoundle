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

## Copyright and other rights (non-negotiable)

Confoundle rests on real findings, which means it constantly touches other
people's published work. The line we hold is **facts yes, expression no**.

**Use freely: the facts.** Counts, rates, sample sizes, dates, what a study
found, what a court decided. Facts and data are not protected by copyright, so
reproducing the handful of figures a puzzle needs is fine, and citing them is
required anyway. Author them once as raw counts and let the engine derive the
percentages.

**Never reproduce: the expression.**
- No sentences lifted from an abstract, paper, press release, book or web page,
  and no close paraphrase that merely reshuffles the original wording.
- No figures, charts, tables-as-images, photographs or illustrations from a
  source. We draw our own charts from the numbers.
- Every `summary`, `framing`, `explanation` and `howItWorks` is written from
  scratch, in the game's own plain voice, and is far shorter than the source.
- If a quotation is genuinely unavoidable, keep it short, put it in quotation
  marks, and attribute it inline. Prefer not to.

**Specific traps we have already hit:**
- **Wikipedia is CC-BY-SA.** Use it only to *find* sources. Then read the
  primary source, cite that, and write our own text. Pasting Wikipedia prose
  would drag its share-alike terms onto our content.
- **Court opinions** (US federal and state) are public domain as government
  edicts, so their text may be quoted freely. Still cite them properly.
- **EU database right** (Directive 96/9/EC) protects substantial extraction from
  a database even where individual facts are free. Taking the few numbers a
  puzzle needs is not substantial extraction; bulk-harvesting a dataset is.
- **Trademarks and logos** belong to their owners. Name a company or product
  only where it is the factual subject, never use its branding.

**Trap Hunt items** are hypothetical scenarios we invent, so they carry no
third-party rights, and that is exactly why they carry no `provenance`. Anything
asserting a real-world finding belongs in a puzzle instead.

**Anyone (or any agent) researching a puzzle** must work from primary sources,
verify every number, and write original prose. "I found the abstract" is not
permission to reuse its sentences. If a number cannot be verified, do not ship
the puzzle; say so instead.

### Can we take numbers from a copyrighted table?

**The numbers, yes. The table, no.**

Facts are not copyrightable. In the US this is settled by *Feist Publications v.
Rural Telephone* (1991), which also rejected the "sweat of the brow" theory: the
effort a team spent collecting data does not create protection over the data.
A published table's counts, sample sizes and rates are facts about the world.
What copyright protects is the table's *expression*: its layout, its caption
prose, any creative selection or arrangement, and the figure as an image.

So, concretely:
- **Allowed:** read the table, extract the counts, re-present them in our own
  chart, and cite the source.
- **Not allowed:** reproduce the table or figure as an image, copy its caption
  text, or clone a distinctive visual design.

This is already how the project works. Puzzles store raw counts and the engine
draws its own chart, so we never embed anyone else's figure.

Two things that sit *outside* copyright and still apply:
- **Access terms.** Reading a paywalled paper through an institutional
  subscription is governed by the library's licence with the publisher, which is
  contract law, not copyright. Extracting a few figures for scholarly or
  educational use is ordinary practice; systematic bulk harvesting is not.
- **EU database right** (96/9/EC). A handful of numbers is not substantial
  extraction. Taking a whole dataset would be.

Practical consequence: copyright is rarely what blocks a puzzle. **Access and
verification are.** If a number cannot be checked against its source, the puzzle
does not ship, no matter how confident the prose sounds.
