# Plan: closing the six remaining syllabus gaps

Companion to [`exam-syllabus-audit.md`](./exam-syllabus-audit.md), which is the
evidence. This is the worklist that falls out of it.

Scope is deliberately unchanged: **the same nine jurisdictions already audited**
(Japan, France, USA, UK, Korea, China, Russia, Spain, Germany). No new country
is being read. The audit's own conclusion is that the deck's remaining holes
cluster in one place, and that is what this plan closes:

> The gaps cluster in trial appraisal, not in exotic biases.

Six rows in the consolidated table still read **gap**. Four of them are
**rang A in France**, meaning every French doctor is examined on them, and three
of those four are also officially named in the USMLE outline. That is the
strongest coverage claim available for anything not yet built.

---

## The six, ranked by how much of the blueprint they buy

| # | Trap | JP | FR | US | UK | Why this rank |
|---|---|---|---|---|---|---|
| 1 | Power, type I and type II error | X | **A** | O | X | Rang A **and** officially named in the US. The only gap sitting in two blueprints at full weight. |
| 2 | Allocation concealment | X | **A** | O | X | Rang A (OIC-323-17). Completes the blinding family, whose other half already shipped. |
| 3 | Sponsorship and conflict of interest | X | **A** | T | X | Rang A. Reaches beyond medicine further than anything else on the list. |
| 4 | Cognitive: anchoring, availability, framing | category | X | O | postgrad | Named as a whole category by Japan, officially by the US, and Germany has a psychology catalogue nobody else does. **Needs a new beat**, see below. |
| 5 | Neyman / prevalence-incidence | X | X | T | X | Taught consensus only. Cheap if a source exists, because it reuses `rates`. |
| 6 | Hawthorne effect | X | X | **O** | X | Officially named by the US alone. Hardest to source honestly, see below. |

---

## What each one needs

The house rule from `CLAUDE.md` governs throughout: **build a new data shape
whenever the lesson needs one, never bend a lesson to fit an existing shape.**
Setup and reveal must be two views of the same data. Where I judge an existing
shape sufficient, the reason is stated; where it is not, the new shape is named.

### 1. Power, type I and type II error

**The illusion.** A trial reports "no significant difference" and the reader
concludes the treatments are equivalent. The reveal shows the confidence
interval, which is wide enough to contain a clinically important benefit. The
trap is reading a null result as a negative one.

**Shape.** New: `interval`. This cannot be told with anything on hand. `rates`
draws proportions, `risk` draws one risk against another, and neither can show
that a point estimate is uninformative because of what surrounds it. The whole
lesson lives in the width of an interval, so the interval has to be the mark.
Setup view `estimate` (point estimate plus the p value, which is what the reader
is given); reveal view `interval` (the same estimate with its CI against a
pre-stated margin of clinical importance).

**Source candidates.** An underpowered non-inferiority or negative trial where
the CI is printed and visibly wide. Needs a source that prints the counts, not
just the interval, since numbers are authored once as `observations` and the
rates derived. Check the CONSORT-era reanalyses of small negative surgical
trials first.

### 2. Allocation concealment

**The illusion.** Two arms of a trial that was properly randomised on paper, but
where the person enrolling could see the next assignment. The reveal shows the
baseline table: the sicker patients accumulated in one arm. The trap is that
"randomised" was true and insufficient.

**Shape.** Existing `rates`, with the two arms as strata and a baseline
characteristic as the case mix. This is the Berkson and detection-bias pattern
and it fits without bending: the setup shows the outcome, the reveal shows the
same patients sorted by who they were at entry.

**Source candidates.** Schulz's work on exaggerated effects in inadequately
concealed trials is the canonical evidence, but it is a meta-epidemiological
odds ratio, not head counts. Prefer a single trial with a published baseline
imbalance traceable to an unconcealed sequence. This is the sourcing risk on
this one and it should be settled before any writing.

### 3. Sponsorship and conflict of interest

**The illusion.** Two sets of trials of the same drug reach different
conclusions. The reveal splits them by who paid. The trap is that both sets are
real trials, correctly conducted, and the difference is in what got asked and
what got published.

**Shape.** Existing `rates` with sponsor as the stratum, or possibly `funnel`
if the publication-bias shape is reusable. Decide after the source is fixed,
not before.

**Note.** This is the one on this list that a non-clinical reader will find most
immediately useful, which matters for the `everyday` audience tag.

### 4. Cognitive biases: anchoring, availability, framing

**This is the one that needs design work before it needs a source.**

The audit already flags it as needing a new beat, and it is right. Every puzzle
in the deck works by showing the reader a dataset and letting them misread it.
A cognitive bias is not a property of a dataset; it is a property of the reader.
Framing cannot be revealed by re-plotting the same numbers, because the numbers
are not where the trick is: the trick is in the sentence that introduced them.

Two candidate designs:

- **The A/B beat.** The reader is shown one framing, commits, and the reveal
  discloses that half the readers saw the other framing and answered
  differently, with the actual split from the published experiment. This makes
  the reader the data point, which is a genuinely new beat and arguably the most
  honest possible demonstration.
- **The two-panel beat.** Both framings side by side after commit, with the
  published response rates under each.

The A/B beat is better and more expensive: it needs a stable per-reader
assignment, and it needs the response split to come from a real experiment
rather than from our own unaudited traffic. Do not let it collect our readers'
answers to produce that number; the analytics is a no-op stub and the reason
that is a promise rather than an accident is worth keeping.

**Source.** Tversky and Kahneman's framing work prints the response
percentages, which is what this needs. The Asian disease problem is the obvious
candidate and its numbers are published.

**Recommendation: schedule this one last** despite ranking fourth, because it is
the only item that changes the engine rather than adding to it.

### 5. Neyman / prevalence-incidence bias

**The illusion.** A case-control study of a risk factor for a rapidly fatal
disease finds the factor protective, because the cases who died fastest never
became cases.

**Shape.** Existing `rates` or `survivorship`. Closely related to immortal time
and survivorship, both already shipped, so **check first that it is genuinely
distinguishable in the reveal.** If the reveal restates one of those, the audit
row should be marked "covered by" rather than a new puzzle being forced. That
judgement should be made honestly before any work starts.

### 6. Hawthorne effect

**The sourcing problem, stated up front.** The original Hawthorne studies do not
support the effect named after them. The illumination experiments have been
reanalysed repeatedly and the productivity pattern largely dissolves. Building a
puzzle whose factual claim is "the Hawthorne studies showed X" would be exactly
the failure this project exists to attack, and the audit's own hard-won lesson
applies: well-known figures were wrong three times in one session.

**Therefore.** Either source it from a modern trial where being observed
measurably changed behaviour and the counts are printed, and treat the
historical study as a cautionary note in the deep-dive rather than as the
data, or **do not ship it and record why**. A documented refusal is a legitimate
outcome here and is more valuable than a weak puzzle.

---

## The pipeline each one goes through

Unchanged from the passes that shipped the last three puzzles, because it
worked:

1. **Source pass.** Find the primary, read the actual tables with institutional
   access, and reconcile every printed figure. Ask of each number: is this
   printed, or derived, and if derived, from what? Reject the source if the
   counts have to be reconstructed by inversion.
2. **Shape decision.** Existing or new. If new: union member in `schema.ts`, a
   pure derivation module in `engine/charts/` with its own test, a renderer, a
   `DataViewRenderer` case, `scopeLabel` entries for the new `DataView` kinds,
   and a glyph in `share/ShareCard.tsx`. Extend existing shapes with **optional**
   fields only, never `.default()`.
3. **Puzzle file** plus `provenance`, plus the deep-dive examples, primary-sourced.
4. **Review items.** Ten `xx-*` Trap Hunt items plus two or three genuinely
   **sound** decoys. The decoys are not optional: without them the answer to
   every item is "trap".
5. **Translation pass.** All nine non-English locales, one subagent per locale,
   keys copied programmatically from a generated JSON worklist and never
   retyped. Roughly 60 strings per puzzle.
6. **Audit row** flipped to shipped, with the source named.

**One PR per puzzle.** The last three passes each ran branch, PR, CI,
CodeRabbit, merge, verify-live, and that cadence is why they are traceable.

## Suggested order

Sourcing risk, not blueprint weight, should drive the order, because a puzzle
that cannot be sourced honestly should be discovered early and cheaply.

1. **Allocation concealment** (2) and **sponsorship** (3) first. Both reuse
   `rates`, both are rang A, and both are one data file each if the source
   holds.
2. **Neyman** (5) next, as a decision rather than a build: settle whether it is
   distinguishable from immortal time and survivorship, and record the answer
   either way.
3. **Power and confidence intervals** (1) next. It is the highest-value gap but
   it needs a new shape, so it costs a shape's worth of work.
4. **Hawthorne** (6): a source hunt with an explicit licence to conclude "no".
5. **Cognitive biases** (4) last, as its own project, because it changes the
   engine.

That closes four rows for certain, one by documented decision, and one by
honest refusal or a new source. The table would then have no unexamined gaps
left in any of the nine jurisdictions.
