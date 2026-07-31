# The hedge option, audited

Opened 2026-07-31, after a direct challenge: **there are lessons where "There is
no way to tell" should be the correct answer, because the information needed to
answer arrives only in the reveal.** This file is the audit, its method, and the
worklist that came out of it. Nothing here is fixed yet.

## What the deck currently does

Of 41 puzzles, **39 offer the hedge** and in **3 it is the correct answer**:
`publication-bias`, `relative-risk`, `spectrum-bias`. The two that do not offer
it at all are `kidney-stones` and `length-time`.

That ratio is itself a finding. A reader who simply never picks the hedge moves
from a one-in-four guess to a one-in-three guess, without reasoning at all. The
hedge was introduced to carry no lexical tell, and it does not, but a
**structural** tell is just as exploitable and this deck has one.

## The sharper problem, which is about correctness rather than balance

The deck's commit beat asks the reader to predict something. A reasoning skill
usually licenses a **direction** and not a **magnitude**. Where the answer
options are coarse bands, that gap is closed honestly: a reader who knows
foot-in-the-door picks the large increase over the small one, and the band is
doing the work of turning a magnitude question into a directional one. That is
fine and most of the deck works this way.

It stops being fine in two situations, and both exist in the deck today.

**Situation one: nothing in the setup licenses any answer.** The question asks
about a population, setting or measurement the reader has been told nothing
about, so no principle gets them there. This is fact recall dressed as
reasoning, and the hedge is the honest answer.

**Situation two: the correct answer runs against what the skill predicts.** The
reveal is a null or a plateau, so a reader applying the lesson correctly is
actively punished for it. This is a real and valuable kind of puzzle, but it
cannot mark a substantive option as correct while the reader's own reasoning
pointed elsewhere with no way to know it would not hold.

## Flagged, in priority order

Each needs the same judgement: can a reader reach the marked answer from the
framing and the setup chart alone, using the skill? If not, either reword the
question so it becomes answerable, or make the hedge correct.

### 1. `illusory-truth`, the one clear failure

**Q:** "Some statements had been shown 27 times. Where did those land?"
**A:** "Barely higher than seeing it once."

The bands are *far higher, roughly in proportion*, *lower, because repetition
breeds suspicion*, *barely higher*, and the hedge. Two of those say higher, so
the discriminator is not direction but whether the curve keeps climbing or
flattens, and **nothing in the setup licenses picking the plateau.** A reader
who has correctly absorbed that repetition breeds belief picks the proportional
band and is marked wrong for reasoning well. That is situation two exactly.

Fix by rewording toward what is actually being asked, which is whether the
effect keeps paying, or by making the hedge correct and letting the reveal
deliver the plateau as the surprise. The second is probably better: noticing
that you have no idea where a dose-response curve flattens is a real skill and
this deck should reward it.

### 2. `hawthorne-effect`, checked and cleared

Flagged first on the strength of its question alone, which asks how big the gap
was in a department the reader has seen no data for, and looks like pure fact
recall. **Reading the framing overturns that.** It says plainly that an
intensive care unit is a closed room where staff work within sight of one
another all day, while an outpatient clinic is not and its staff move between
rooms alone. That licenses the direction: an auditor changes less where you are
already permanently visible. The bands are *about the same*, *smaller*, *far
bigger*, and the hedge, so direction alone picks the answer and the "around four
times" is a gloss on the band rather than the thing being tested.

Recorded because the correction is the useful part. **Judge these on the framing
and the rendered chart, never on the question in isolation**, or you will flag
puzzles that are working and miss ones that are not.

### 3. Magnitude questions where only direction is licensed

`metaphor-framing`, `compliance-sequencing`, `self-applied-label`,
`conjunction-fallacy`, `sponsorship-bias`, `multiple-comparisons`,
`statistical-power`.

These are the weaker cases and most are probably fine, because the answer bands
are coarse enough that the direction picks the band. Each still needs checking
one at a time against the same test. The specific risk is a band boundary that
requires knowing the number, for example distinguishing "about a third" from
"more than half" when the skill only says "more".

## Method for whoever does this

For each puzzle, read **only** `setup.framing` and the data the `initialView`
actually renders, then ask whether the marked answer follows. Use
`restrictRates` or the equivalent derivation to see exactly what the reader is
shown, because several setups filter their chart and the withheld series is
often precisely the information that would settle the question.

Do not fix these by adding qualifiers to the question. A question that has to
say "roughly" and "in this study" to be answerable is usually a question that
should have made the hedge correct.

## Not a defence, but worth stating

Three puzzles do already make the hedge correct, and they are the ones where the
missing information is the whole lesson: unpublished trials in
`publication-bias`, the absent base rate in `relative-risk`, and the untested
population in `spectrum-bias`. That is the pattern to extend. The hedge earns
its place when **noticing that you cannot answer is the skill**, which is a
large share of what this deck is about, and it is currently under-used.
