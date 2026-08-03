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

### 1. `immortal-time`, FIXED 2026-07-31

The hedge is now the correct answer, worded exactly as everywhere else so it
carries no tell, and the person-time option is marked wrong while staying on the
list. The reveal now opens by conceding that both objections were live and that
nothing on the page could settle between them, then delivers the follow-up.

The line that makes it a better puzzle than it was: **spotting a flaw is not the
same as knowing that flaw explains the gap.** A reader who noticed the immortal
time had still not answered "is that gap the drug?", because the size of it was
not on the page. A test pins the answer key, the hedge wording, and the fact
that the rival bias stays on the list.

### 2. `illusory-truth`, flagged and then WITHDRAWN

Flagged as the one clear failure on the reasoning that nothing licenses picking
the plateau over a proportional climb. **That was wrong, and the puzzle's own
test file says why.** The rating scale runs 1 to 6, the baseline is 3.64 and one
showing buys 0.62, so a proportional climb over 27 showings lands at about 20.4.
Far higher is not unlikely, it is **impossible**, and the ceiling rules it out
from the setup alone. With the suspicion option implausible, barely higher
follows by elimination.

The change was written, the suite caught it, and it was reverted.

**This is the second time a working puzzle was flagged by reading its question
in isolation, after `hawthorne-effect` below, and the second time was after
writing the warning about it into this very file.** The method section is not
advice, it is the thing that keeps being got wrong. Read the framing, read the
rendered chart, and read the existing tests, which in both cases already
contained the licensing argument.

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

### 3. `immortal-time`, flagged and agreed

**Q:** "Is that gap the drug?" **A:** "No, some of that time could not contain
a death."

The setup gives the cohort, the exposure definition, and 49 per cent against 71
per cent. Nothing else.

The weak version of the objection is that the reader cannot derive the
mechanism. That version fails: the framing says anyone dispensed the drug **at
any point during follow-up** counts as treated, in a cohort followed from entry,
and that sentence is exactly the tell for immortal time. A reader who knows the
skill can spot it.

**The strong version holds, and it is a different problem.** Two of the four
options are defensible from what the reader has been shown:

- *No, the untreated were sicker to begin with*, which is confounding by
  indication and has its own puzzle in this deck.
- *No, some of that time could not contain a death*, the marked answer.

The setup reports **nothing about baseline characteristics**, so there is no
information with which to prefer one over the other. Both critiques are correct
things to say about this design. The marked answer is correct only because the
reader is expected to guess which lesson they are currently in, which is meta
knowledge about the deck rather than reasoning about the data. And the reveal's
own claim, that half the treated group's follow-up was time in which nobody
could die, is a quantity the setup cannot yield at all.

This is a third failure mode the audit had not named, and it is the most
dangerous because it is invisible from the answer key: **the distractor is also
right.** That grep was run. Only two other puzzles offer a wrong option naming a real
bias, and **both are clean**. In `misclassification` the distractor is recall
bias, and the setup rules it out by showing memory is equally poor in both
groups, which is the whole finding. In `multiple-comparisons` the option is a
magnitude band rather than a rival explanation. So `immortal-time` is the only
instance in the deck, which makes it cheap to fix and worth fixing.

Fix by one of: give the setup a line that rules out the baseline explanation, so
the exposure definition becomes the only live account; or make the hedge correct
and let the reveal show that both were live and only one survives once you look
at the person-time. The second is truer to the lesson.

### 4. The seven magnitude questions, all checked 2026-07-31

Checked one at a time against the framing, the rendered chart and the existing
tests. **One is cleared outright and six share a single structural property**,
which is the finding: this is not six defects, it is one design pattern, and
whether it is acceptable is a decision about how the deck teaches rather than a
bug to be swept.

**`statistical-power`: CLEARED, and it shows what a clean one looks like.** Its
framing says the researchers asked one question only, whether each trial was
large enough to have shown a twenty-five per cent improvement, and its test file
already records the licensing argument in a comment: *the inference the reader
needs is that the question is about size, and if this sentence is ever cut the
hedge becomes defensible.* The licensing is deliberate, stated, and protected.

**The other six all have the same shape.** The answer bands contain **two or
more options pointing the same way**, so the skill picks the direction and then
stops, and nothing in the setup chooses between them:

| Puzzle | The two same-direction bands | What the skill licenses |
|---|---|---|
| `sponsorship-bias` | about twice as often / about seven times | industry concludes it more often |
| `compliance-sequencing` | perhaps a third / more than half | the small favour raises compliance |
| `metaphor-framing` | a couple of points / about seventeen | the metaphor moves something |
| `conjunction-fallacy` | less help than the money / more than the money | talking helps |
| `self-applied-label` | around 48 / roughly 26 / nineteen | the share falls |
| `multiple-comparisons` | small benefit / large benefit | the subgroup was noise |

Two deserve singling out because they fail harder than the others.

**`self-applied-label` is the worst of them.** The skill licenses that the
*share* keeping the promise falls. The correct answer is that the *count* falls,
from 26 to 19, and that requires the share to more than halve while the
denominator nearly doubles. A reader who reasons perfectly to "the share drops"
still cannot get to "fewer countries", and the band that says "more, and a
similar share, around 48" is exactly what a correct directional inference
produces.

**`multiple-comparisons` needs knowledge the setup never supplies.** The reader
is shown one non-significant subgroup and asked what aspirin did in the rest of
the trial. Multiplicity tells them the subgroup is noise; it does not tell them
what the trial found. Answering requires already knowing that aspirin works
after a heart attack, which is real medical knowledge but is not on the page.

**Arithmetic was checked for a ceiling argument in each, of the kind that
cleared `illusory-truth`. There is none.** For `sponsorship-bias`, a two-fold
ratio distributes the stated third of 106 as roughly 16 industry and 19
independent, which is perfectly possible; nothing excludes it. The same holds
across the others.

### DECIDED 2026-08-03: option 1 is off the table

Asked directly whether the deck is willing to mark a well-reasoning player wrong
in order to land a surprise, the answer was **no, that is not the goal.** That
settles it, and it overrides the recommendation made here a day earlier that
four of the six be accepted as they stand.

So every puzzle in the table above needs option 2 or option 3: either the
discriminator goes into the framing, or the hedge becomes correct. The rule now
lives in `CLAUDE.md` so it binds new puzzles too, not only this backlog.

Two of the six were fixed under option 2 before the policy was settled, and both
happen to comply with it: `self-applied-label` and `multiple-comparisons`. Four
remain: `sponsorship-bias`, `compliance-sequencing`, `metaphor-framing` and
`conjunction-fallacy`. Each needs the same treatment, one at a time, framing and
rendered chart and existing tests read together.

### The options as they stood before that decision



Three options, and this file does not choose between them.

1. **Accept it.** The deck is a game as well as a course, coarse bands are how
   it converts a prediction into a click, and being wrong is the pedagogy. This
   is defensible and it is what the deck does today.
2. **Add licensing to the framing**, one puzzle at a time, the way
   `statistical-power` does. Cheapest per puzzle, keeps every answer key, and
   the test comment there is the template.
3. **Make the hedge correct where two same-direction bands exist.** Truest to
   the reasoning, and it would take the hedge from 4 of 39 to 10, which is
   probably past the point where it stops being a tell and starts being one in
   the other direction.

**No puzzle has been changed on the strength of this section.** Given that two
of the first three flags raised in this file turned out to be wrong, a six
puzzle sweep on one reading is exactly the move this audit exists to prevent.

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
