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

---

#### SOURCED AND VERIFIED AT SOURCE, 2026-07-30. And it does not need the new shape.

The plan above looked for **one** underpowered trial. The better source is a paper
that counted **seventy-one of them**, which turns the lesson from "here is a wide
interval" into "here is how often this happens", and does it in integers.

**Freiman JA, Chalmers TC, Smith H Jr, Kuebler RR. The importance of beta, the
type II error and sample size in the design and interpretation of the randomized
control trial: survey of 71 "negative" trials.** *New England Journal of
Medicine* 1978;299(13):690-694.

Read from images of the journal page itself, reproduced by the James Lind
Library: the abstract, and Figure 2. Not from a summary.

Seventy-one trials that had all reported no significant difference were
re-examined to see whether they were large enough to have a probability above
0.90 of detecting a 25 and a 50 per cent therapeutic improvement.

| Of the 71 "negative" trials | Count |
|---|---:|
| Risk above 10 per cent of missing a true **25 per cent** improvement | **67** |
| Risk above 10 per cent of missing a true **50 per cent** improvement | **50** |
| 90 per cent confidence interval still allowed a **25 per cent** improvement | **57** |
| 90 per cent confidence interval still allowed a **50 per cent** improvement | **34** |

**Therefore only 4 of the 71 were large enough to rule out a 25 per cent
improvement.** That is the number the puzzle turns on.

**Consistent three ways, which is what stands in for an external cross-check on a
survey like this.** 67 exceeds 50, because a smaller improvement is harder to
detect and so more trials could have missed it. 57 exceeds 34, the same ordering
under the other criterion. And 67 exceeds 57 while 50 exceeds 34, because the
power criterion is the stricter of the two. All three orderings must hold and all
three do.

Figure 2 draws all 71 confidence intervals. Most straddle zero and stretch well
into the region marked "favouring treatment", which is the picture the lesson
needs and is the authors' own.

**The shape decision above is superseded.** No `interval` shape is required.
Groups are "reported that the treatment made no difference" at 71 of 71 and "was
large enough to have shown a 25 per cent improvement" at 4 of 71, over one
stratum, with the setup filtered to the first group by `groupIds` and the reveal
dropping the filter. That is exactly the mechanism `misleading-axis` and
`the-glass-that-was-never-there` already use. Building `interval` may still be
worth doing one day, but this gap no longer waits on it.

**Limits to carry into the provenance note.** This is 1978, and trial design has
improved since, partly because of this paper; the puzzle must say so rather than
imply the state of the field is unchanged. The 71 trials are a survey the authors
assembled rather than a random sample of all negative trials. And "25 per cent
improvement" is a relative improvement in the response rate, not an absolute
percentage-point difference, which is a distinction this deck already teaches in
`relative-risk` and must not blur here.

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

---

#### SHIPPED 2026-07-30 as `randomised-in-name-only`. The sourcing risk was real.

Both candidates the plan named failed for the reason it feared. Schulz gives
odds ratios. And the one clean historical case study, **Kennedy et al., Trials
2017;18:204**, which ran the same surgical trial under sealed envelopes and then
under central telephone randomisation and watched the age imbalance vanish, is
structurally perfect and reports **medians and interquartile ranges**. This deck
authors from counts, so it could not be used as the data. It became the deep
dive instead, where medians are quotable prose.

**The source that worked puts the subversion in the arm sizes themselves.**

Alam N, Oskam E, Stassen PM, et al. Prehospital antibiotics in the ambulance for
sepsis: a multicentre, open label, randomised trial (PHANTASi). *Lancet
Respiratory Medicine* 2018;6(1):40-50.

Randomised 1:1 in blocks of four. 2,672 analysed: **1,535** to antibiotics and
**1,137** to usual care. At 28 days, **120 of 1,535** and **93 of 1,137** died,
relative risk 0.95. Some crews had been opening sealed envelopes and setting
aside the ones that said usual care.

**Reconciled five ways**, all asserted in the test file: the arms sum to 2,672;
1,535 of 2,672 is 57.4 per cent, matching the 57 per cent reported for this trial
in the methodological literature; 120 of 1,535 and 93 of 1,137 both round to the
printed 8 per cent; and the two rates give the printed relative risk of 0.95.

**Why it is impossible by chance.** Expectation 1,336 per arm, standard deviation
25.9, observed excess 199, so **7.7 standard deviations**. That is deliberately
conservative: blocking in fours constrains imbalance far more tightly than a free
coin toss, so the true departure is larger. The puzzle says "more than seven"
rather than quoting a p value, because the exact tail under blocking is not
something the paper computes.

**The setup shows the allocation, not the outcome, and that ordering is forced.**
The mortality stratum carries 1,535 and 1,137 as its denominators, so showing it
first would print the arm sizes and hand over the answer. A test asserts it.

**Guarded against becoming an accusation.** The crews believed antibiotics helped
and were trying to help patients, which is exactly what concealment exists to
prevent; the investigators found the problem, reported it in the paper, and
retrained the crews. Tests assert the reveal keeps both of those sentences, and
the note records that an unequal ratio proves non-randomness without measuring
prognostic imbalance.

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

---

#### SHIPPED 2026-07-30 as `who-paid-for-the-review`. The block was the abstract, not the paper.

This gap sat blocked for most of a day because the abstract of Barnes & Bero
gives only three of the four cells: 106 reviews, 39 concluding not harmful, 29 of
those 39 industry affiliated. Deriving the fourth from the odds ratio of 88.4 is
reconstruction and was refused. **The full text prints all four**, twice, in the
Results and again in Table 3, and reading it was the whole fix.

|  | Industry affiliated (31) | Not affiliated (75) |
|---|---:|---:|
| Passive smoking harmful | 2 (6%) | 65 (87%) |
| Passive smoking **not** harmful | **29 (94%)** | **10 (13%)** |

**Reconciled seven ways from those four cells alone**, all asserted in the test
file: the arms sum to 106; 39 of 106 is the printed 37 per cent; 67 of 106 the
printed 63; 29 of 39 the printed 74; the four cell percentages are the printed
94, 6, 13 and 87; the crude relative risk is 7.02 against a printed 7.0; the
crude odds ratio is exactly 94.25 against a printed 94.2; and **the chi-square
recomputed from the table is 60.69, which is the paper's own value to both
decimals**. Reproducing a statistic the authors calculated independently is the
strongest check this project has ever had on a transcribed table, and it should
be the standard for any future puzzle built from a printed two by two.

**The plan's design was wrong and the source improved it.** The plan wanted two
sets of drug trials split by sponsor. What the paper actually supports is
sharper: quality was scored **blind** by two trained assessors against a
published instrument, and it did not predict the conclusion. Neither did peer
review, topic or year. In the regression controlling for all four, affiliation
was the only survivor. So the lesson is not "funded people conclude in favour of
their funder", which nobody finds surprising. It is that **the signals a reader
can actually assess carry no information**, and the one that does was undisclosed
in 77 per cent of the articles.

**Shape.** Existing `rates`, no engine change. Setup filtered to a composition
stratum (31/106 against 75/106, which reads as a reassuringly independent
literature and gives the reader the denominators they need), reveal dropping the
filter to add the conclusions. `crownWinner: false`, because neither conclusion
is a win and marking the taller bar would assert a finding.

**The relative risk, not the odds ratio.** The paper prints 94.2 crude and 88.4
adjusted, then says plainly that the two measures diverge because the outcome is
not rare in the affiliated group. The puzzle quotes 7.0. Quoting 88.4 would be
true, cited and thoroughly misleading, which is a lesson this deck already
teaches elsewhere; a test asserts the reveal never mentions it.

**Guarded against becoming a morality tale.** The lesson's mechanism is that a
review is a chain of individually defensible judgement calls, that "the evidence
remains inconclusive" can be written honestly about almost anything, and that
nobody had to prove passive smoking safe, only keep the question looking open.
Two deep dives take it off tobacco: Bes-Rastrollo 2013 on sugar-sweetened
beverages (a different industry, an unfunded Spanish group with no declared
interests, relative risk 5.0) and Lundh 2017's Cochrane review of 75 papers,
whose finding that sponsored studies are **not** methodologically worse, and are
better blinded, is the general form of what Barnes & Bero saw. One review item
and one clause of `howItWorks` apply the test to a study the reader agrees with,
funded by a campaign group, because a check applied in one direction only is not
a check.

**And the note applies the test to the source.** Barnes & Bero are UCSF tobacco
control researchers with a stake in the answer, Bero is also an author on the
Lundh review, and the note says so. What makes the finding hard to dismiss is the
design rather than the authors: blinded quality scoring, blinded classification
of conclusions, pre-specified affiliation criteria, and survival of the
association when restricted to the highest-quality and to the peer-reviewed
articles.

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

---

#### DECIDED 2026-07-30. NO A/B BEAT. The engine does not need to change, and two thirds of this gap is already shipped.

**The design question is settled, and the answer is neither of the two candidates
above.** The plan's premise was that a cognitive bias is a property of the reader
rather than of a dataset, so demonstrating one would need the reader to become
the data point. That premise is wrong, and the deck has already disproved it
twice:

- **`anchoring`** (puzzle 28) uses the `estimation` shape. Two groups of students
  had five seconds to estimate the same product written in opposite orders, and
  the published median estimates were 512 and 2,250 against a true answer of
  40,320. The bias is in the data because somebody already ran the experiment.
- **`framing-effect`** uses the `framing` shape, with `onewording` at the setup
  and `bothwordings` at the reveal. That *is* the two-panel beat, built and
  shipped.

So the demonstration does not require per-reader assignment, and it must not
collect our readers' answers to produce the split. **Published between-subjects
response distributions are the mechanism**, and the analytics stub stays a no-op.
The A/B beat is hereby dropped rather than deferred: it would buy a nicer
narration of a result the deck can already state from a source, at the cost of
per-reader state, a data-collection question we have promised not to open, and a
number nobody has audited.

**What is actually left of this gap is availability alone.** Anchoring and
framing are shipped; the audit row bundles all three under one heading and is
therefore misleadingly red. Availability needs a source and probably a new shape,
because the lesson is "what you can call to mind against what actually happens",
which is a judged value beside a true value for each of a list of items, and no
current shape holds that. `estimation` is close but carries a single `trueValue`
for two groups estimating one quantity, which is the anchoring design, not this
one.

**Sourcing is open, and the obvious source is not currently readable.**
Lichtenstein, Slovic, Fischhoff, Layman & Combs, "Judged frequency of lethal
events", *J Exp Psychol Hum Learn Mem* 1978;4(6):551-578, is the canonical
demonstration: 660 adults, 41 causes of death, judged frequencies against actual
ones. APA PsycNet serves only the landing page here and its full text is behind
"Get Access", so **the table has not been read and nothing from it may be
authored**. Third-party PDF mirrors of a rights-reserved APA article are not an
acceptable substitute, and record identifiers must not be guessed.

Three routes, in order of preference:

1. **Institutional access to the 1978 paper.** Nagoya may carry APA PsycArticles;
   this needs a signed-in session rather than an anonymous fetch.
2. **A modern replication that is openly available.** Hertwig, Pachur &
   Kurzenhäuser, "Judgments of risk frequencies: tests of possible cognitive
   mechanisms" (2005), has an author copy in the Max Planck repository and is
   arguably the better source for this deck, because it does not merely show the
   misjudgement, it tests whether availability is the mechanism producing it.
3. **The media-coverage angle**, comparing column inches against mortality, which
   makes the mechanism visible rather than inferred but needs its own primary.

**Also worth carrying into the note when it is written.** The paper was published
with a commentary attached, Shanteau, *J Exp Psychol Hum Learn Mem*
1978;4(6):579-581, arguing that a deviation from actual frequency is a response
error and not necessarily a judgemental bias, because the subjects were being
asked about things they had never experienced. That objection is real, it is
printed in the same issue, and a puzzle that teaches this bias should say so.

### 5. Neyman / prevalence-incidence bias

**The illusion.** A case-control study of a risk factor for a rapidly fatal
disease finds the factor protective, because the cases who died fastest never
became cases.

**Shape.** Existing `rates` or `survivorship`. Closely related to immortal time
and survivorship, both already shipped, so **check first that it is genuinely
distinguishable in the reveal.** If the reveal restates one of those, the audit
row should be marked "covered by" rather than a new puzzle being forced. That
judgement should be made honestly before any work starts.

---

#### JUDGED 2026-07-30. COVERED BY `length-time` AND `survivorship`. Not built.

The check the plan asked for was made against the shipped reveals rather than
from memory, and it fails. Neyman's mechanism is **duration-biased sampling**:
you sample prevalent cases, so cases that end quickly are under-represented, and
an exposure that kills quickly removes its own cases and looks protective.

`length-time` already reveals exactly that, in its own words:

> A test applied every few months catches the slow-growing tumours, because slow
> ones sit in the detectable stage for years waiting to be found, while fast ones
> surface between visits.

That is the same sentence a Neyman puzzle would have to write. And the "you never
see the ones who died" framing is `survivorship`'s reveal, in its own words: *You
only see the survivors.*

**What Neyman adds is a setting, not a reveal.** The case-control study of a fatal
disease is a new costume; the sign reversal, a harmful factor appearing
protective, is striking but the deck already teaches sign reversal in
`kidney-stones`. Building it would put a third name on one reasoning move, which
this project has refused twice before on exactly this ground: attrition against
intention-to-treat, and question wording against framing.

**Decision.** Mark the audit row "covered by length-time and survivorship", and
give readers the setting through the **review bank** instead of a puzzle. Four
scenarios are drafted (`nb-prevalent-cases`, `nb-clinic-attenders` and
`nb-survivor-interviews` as traps against those two skills, plus a sound decoy
`ok-incident-cases` on sampling incident rather than prevalent cases). They are
deliberately **not** in this commit: new item strings need nine translations
each, and they will ride along with the next puzzle's translation pass rather
than triggering one of their own.

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

#### SOURCED 2026-07-30, on the first route. Not a refusal after all.

The plan's worry was that the *historical* studies do not support the effect.
That worry stands and belongs in the deep dive. But the modern effect is real,
large, and measured, and the search was for a source that prints it as counts.
Two candidates failed on number type before one worked, and the failures are
recorded so nobody repeats them.

- **Srigley et al., BMJ Qual Saf 2014;23(12):974-980.** Electronic monitoring on
  transplant units: hand hygiene events ran at **3.75 per dispenser per hour**
  within sight of an auditor against **1.48** with none visible, and **1.07** the
  week before. A threefold effect, beautifully measured, and reported as *rates
  per dispenser-hour*, with the 562,304 dispenses never broken down by condition.
  No proportions, so nothing this deck can author.
- **Eckmanns et al., Infect Control Hosp Epidemiol 2006;27(9):931-934.** 2,808
  indications, compliance **29 per cent** unaware against **45 per cent** aware.
  The per-period denominators are not in the abstract, the full text is paywalled
  and Cambridge reports this institution has no access, and **back-calculating
  the denominators from the confidence-interval widths is exactly the
  reconstruction this project forbids**. Not used.

**The source that works.** Wu K-S, Lee SS-J, Chen J-K, et al. Identifying
heterogeneity in the Hawthorne effect on hand hygiene observation: a cohort study
of overtly and covertly observed results. *BMC Infect Dis* 2018;18:369. Open
access. 31,522 opportunities observed, 4,581 overtly and 26,941 covertly, matched
1:1 into **3,047 pairs**.

**And the counts are decodable, which is not the same as reconstructed.** Table 2
prints pair counts as integers and compliance to one decimal place. For the small
subgroups, exactly one integer numerator produces the printed percentage, so the
count is *determined* by the published data rather than guessed. Verified
computationally:

| Row | Pairs | Overt | Covert | Numerators |
|---|---:|---:|---:|---|
| Outpatient department | 133 | 64.7% | 24.1% | **86** and **32**, both unique |
| Intensive care unit | 880 | 80.6% | 69.2% | **709** and **609**, both unique |
| Physician | 619 | 67.9% | 57.4% | **420** and **355**, both unique |
| Nurse | 2,105 | 84.2% | 54.2% | 2 candidates each, **unusable** |
| Overall | 3,047 | 78.2% | 54.6% | 3 candidates each, **unusable** |

**So build on the Location rows and never on the overall row.** A test must assert
the uniqueness, which turns the decoding from a liberty into a checked property.

**And the lesson is better than plain Hawthorne.** Setup shows the ICU pair, 80.6
against 69.2, a gap of 11 points that reads as "being watched barely matters".
The reveal adds the outpatient pair, 64.7 against 24.1, a gap of 41 points. The
effect is nearly four times larger in one setting than the other, so the useful
claim is not that observation changes behaviour but that **how much it changes
behaviour is itself unstable**, which is what makes an audited compliance figure
hard to compare across wards.

#### SHIPPED 2026-07-30 as `when-the-auditor-is-watching`. Decoded, not reconstructed.

Puzzle 34, skill `hawthorne-effect`, tags clinical / research / everyday, on the
existing `rates` shape with `strataAreSeparateSamples` set: the ICU's 880 pairs
and the clinic's 133 are two separate matched samples and must never be pooled.
No schema change, no engine change, one data file and one line in `index.ts`,
exactly as the shape rule intends.

**What the setup shows and what it must not.** The setup is filtered to the
intensive care stratum alone, 709/880 against 609/880, an eleven point gap that
reads as "being watched barely matters". The reveal drops the filter and adds
the clinic, 86/133 against 32/133, forty-one points. Verified in the browser at
375x812 that the setup leaks neither 86/133 nor 32/133.

**Winnability.** Deliberately winnable-but-tempting rather than a trick. The
three wrong options are the three honest intuitions: same size, smaller because
clinics are calmer, and the reused hedge "There is no way to tell" carried over
verbatim from an existing puzzle so it carries no lexical tell. Nothing in the
setup states the clinic's answer, but the framing does say the ICU staff work
"within sight of one another all day" and clinic staff "move between rooms
alone", which is the whole reasoning chain if you notice it.

**The decoding is a checked property, not a liberty.** `hawthorne-effect.test.ts`
recomputes, for each denominator, every integer numerator whose rate rounds to
the printed one decimal place, and asserts the candidate list has length one for
all four figures used. It also asserts the opposite for the two rows the table
prints but this puzzle refuses, 3,047 and 2,105, and that neither denominator
appears anywhere in the data. Independent check: the decoded counts reproduce
the paper's own Hawthorne-effect column at 11.4 and 40.6 percentage points.

**The historical caution is in the lesson, not the data.** The lesson body says
plainly that the illumination experiments have been reanalysed since the original
data resurfaced, that the tidy pattern largely dissolves, and that the effect is
real while "the study it is named after is not that evidence". Srigley 2014 is
the deep dive, where its rates per dispenser-hour are an asset rather than the
disqualification they were as puzzle data: measured by hardware, it kills the
objection that the covert observer was simply missing things.

**Review items.** Ten `he-*` traps and three sound decoys, the decoys being
electronic dispenser counts, routinely collected billing data, and a report that
states its own method and declines to invent a correction. Gap 5's four Neyman
items ride along in the same file, tagged to `length-time-bias` and
`survivorship-bias`, per the covered-by judgement above.

**Limits, in the reveal note.** One hospital; the clinic row rests on 133 pairs,
few enough that forty-one points is imprecise even though its direction is clear;
covert observation has its own practical and ethical difficulties and an observer
who goes unnoticed may also be worse placed to see; and matched pairs are not
randomisation, so residual differences between the compared moments remain
possible.

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
