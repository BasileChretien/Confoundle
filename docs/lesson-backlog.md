# Lessons waiting to be drafted

Opened 2026-07-29. The single queue. Everything the two audits turned up, plus
what an open search found, ranked by how close it is to being buildable.

Companions: [`exam-syllabus-audit.md`](./exam-syllabus-audit.md) is the medical
evidence, [`political-education-audit.md`](./political-education-audit.md) is the
political and civic evidence, [`plan-syllabus-gaps.md`](./plan-syllabus-gaps.md)
is the detailed build plan for the six medical trial-appraisal gaps and is **not
duplicated here**. This file is everything else.

## How to read the status column

| Status | Meaning |
|---|---|
| **VERIFIED** | Numbers read off the primary table. Ready to author. |
| **SOURCED** | Primary source identified and its figures seen, but not yet read off the paper's own table. Must be verified at source before authoring. |
| **LEAD** | A citation exists and looks right. Nothing has been read. |
| **BLOCKED** | Wanted, but no source with usable counts has been found. |
| **REJECTED** | Recorded so nobody proposes it twice. Reason given. |

Nothing here may be authored from this file. The project rule stands: read the
table, reconcile more than one way, or do not ship it.

---

## Tier 1: strongest candidates

Ranked. Each one has a named source, a non-partisan subject, and a plausible
two-views-of-one-dataset shape.

### 1. The sample that was too big to be right, 1936

**Status: SOURCED.** The best candidate in this document by some distance.

The *Literary Digest* mailed **10,000,000** ballots for the 1936 US presidential
election and got **2,376,523** back, the largest poll ever taken at that point.
It predicted Landon over Roosevelt by roughly 3 to 2. Roosevelt won with about
61 per cent. Gallup, with a sample in the tens of thousands, got it right.

**Why it is the best one.** The reveal is that the enormous number was the
problem, not the reassurance, which is exactly the deck's shape: one dataset,
two readings, and the intuition that more data is safer dies on contact.
Confoundle has `survivorship` and `publication-bias` as cousins but nothing where
the *respondents chose themselves*. The US framework names this gap explicitly
as "opt-in polling (like on social media)".

**On partisanship.** Weaker than the 1812 gerrymandering solution, because both
modern US parties existed in 1936, but far weaker than a live case: nobody alive
identifies with Alf Landon, and the lesson does not favour either side. It says
who answered a questionnaire, not who was right.

**The rigor trap, which must not be smoothed over.** The popular telling is that
the Digest polled only rich car and telephone owners. Squire's reanalysis found
**sample bias and response bias acting jointly**, using a 1937 Gallup survey that
asked people whether they had taken part. Non-response was the larger part.
Authoring only the folk version would teach a half-truth, which is worse here
than in most puzzles because the half-truth is the famous one.

- Squire P. Why the 1936 *Literary Digest* poll failed. *Public Opinion
  Quarterly* 1988;52(1):125-133.
- Shape: probably `rates`, two strata that are separate samples (poll returns
  against the actual vote), with `strataAreSeparateSamples` set. No new shape.

### 2. The word that put glass on the road

**Status: SOURCED.** Arrived at by way of gaslighting, and much better than
gaslighting.

Loftus and Palmer (1974). Participants watched a film of a car crash. A week
later they were asked whether they had seen any broken glass. There was no
broken glass in the film.

| Verb used a week earlier | Yes | No | N |
|---|---:|---:|---:|
| smashed | 16 | 34 | 50 |
| hit | 7 | 43 | 50 |
| control, no speed question | 6 | 44 | 50 |

**Reconciles three ways** (16+34, 7+43, 6+44 all give 50) and totals 150.

**Why it fits.** Raw counts, so `rates` holds it with nothing invented. Two views
of one dataset: show the "hit" and control rows, which are nearly identical and
read as "the wording changed nothing", then add the "smashed" row. Utterly
non-partisan: it is a film of a car crash. And it teaches something no shipped
puzzle does, which is that a single word can retroactively install a memory of a
thing that was never there. That is a different move from `framing-effect`, which
is about equivalent descriptions of one choice.

**Caveats to carry.** Experiment 1 has **nine** participants per cell, which is
far too small to author from; only Experiment 2 (50 per cell) is usable. The
figures above come from an exam board's reproduction of the tables, not from the
paper, so they are SOURCED and not VERIFIED.

- Loftus EF, Palmer JC. Reconstruction of automobile destruction: an example of
  the interaction between language and memory. *Journal of Verbal Learning and
  Verbal Behavior* 1974;13(5):585-589.

### 3. Everything is significant if you look at enough things

**Status: LEAD.** The largest genuine hole in the deck's statistics coverage.

Confoundle has `publication-bias` and `statistical-significance` but **nothing on
multiplicity**. Named as a goal by the American Statistical Association's GAISE
2016 college guidelines, which call out "multiple testing false positive rates"
as increasingly relevant.

Two candidate sources, both non-partisan and both funny, which matters for a deck
that has to be shared:

- **The dead salmon.** Bennett et al. put a dead Atlantic salmon in an fMRI
  scanner, showed it photographs of humans in social situations, and found
  statistically significant brain activity when no multiple-comparison correction
  was applied. Voxel counts exist. Ig Nobel, 2012.
- **The astrological subgroup.** The ISIS-2 trial reported that aspirin after
  myocardial infarction helped every astrological birth sign except Gemini and
  Libra, deliberately, to show what subgroup analysis does. Real trial, real
  counts, published in the *Lancet* in 1988, and the joke is the authors' own.

The second is the better fit: it is a real clinical dataset with real numerators
and denominators, and the setup can show the Gemini and Libra subgroup honestly
before the reveal shows the whole trial. Needs the paper.

### 4. The map is not the territory, and the projection knows it

**Status: BLOCKED on shape, not on source.**

AP Human Geography makes this **required content**, IMP-1.A.3, quoted verbatim:

> All maps are selective in information; map projections inevitably distort
> spatial relationships in shape, area, distance, and direction.

The deck has `misleading-axis` for charts and nothing at all for maps, even
though a map is the chart form most people meet in an argument. Greenland
against Africa on a Mercator projection is the canonical demonstration: Africa is
roughly fourteen times the area, and on Mercator they look comparable.

**Why it is blocked.** This needs a genuinely new shape (`projection` or `area`),
and the numbers are geodetic constants rather than observations from a study, so
`provenance` has to point at an authority rather than at a finding. That is not
unprecedented in this deck, but it needs deciding rather than stumbling into.

### 5. A lead that is not a lead

**Status: BLOCKED on a source with counts.**

Named as required content by the AP US Government framework: "Accurate sampling
methods, **including calculating a margin of error**". The deck has nothing on
sampling precision at all, which is a real hole for a deck otherwise built on
counts.

The lesson: a poll shows 48 against 45 with a margin of error of 3 points, a
newspaper calls it a lead, and the difference is not distinguishable from zero.
This is a cousin of `statistical-significance` and would need to earn its place
by teaching something that puzzle cannot, most likely that the margin on a
**difference** is wider than the margin on either number, which is the part
almost nobody knows.

---

## Tier 2: named by a curriculum, still needs a source

### 6. The poll that makes the opinion it measures

**Status: BLOCKED.** Named by France, première SES, verbatim:

> Comprendre comment le recours fréquent aux sondages d'opinion contribue à
> forger l'opinion publique

An instrument that changes the thing it measures. The experimental literature is
bandwagon and underdog effects, and it is genuinely hard: the published effects
are small, the outcome is usually a stated preference rather than a count, and
the cleanest demonstrations are in live elections, which is the partisan ground
the project excludes. Wanted, but do not force it.

### 7. Counting crime is counting reporting

**Status: BLOCKED.** Named by France, première SES: "les difficultés de mesure de
la délinquance".

This is `detection-bias` transplanted from medicine to policing. **The risk is
that it is a second name for one reasoning move**, which this project has already
refused twice, for attrition against intention-to-treat and for question wording
against framing. It would have to teach something the medical version cannot. The
strongest version would use a case where recorded crime rose while victimisation
surveys were flat, so the two instruments disagree on the same reality.

### 8. Goodhart, and the measure that stops measuring

**Status: LEAD.** Not named by any curriculum read, but it is the thread running
through several things that are: the French polling item above, the sales-region
and school-catchment items already written into the gerrymandering review bank,
and the whole logic of `more-votes-fewer-seats`.

Campbell's law (Campbell DT, 1976) is the citable form. Needs a case with counts
where a target was hit and the underlying thing did not move.

---

## Tier 3: the nine persuasion techniques, adjudicated

The condition set was: **peer-reviewed scientific backing, and a historical case
old enough that no living party or person is implicated.** Of nine, one yields a
strong new puzzle, two are already shipped in mechanism, five are rejected and
one is held. The rejections are the useful part.

### Overton window: REDIRECT, already shipped in mechanism

The Overton window is a political-consulting concept (Joseph Overton, Mackinac
Center) with no experimental literature of its own. Its mechanism is anchoring,
which shipped as `anchoring`. The nearest real science is Sherif and Hovland's
social judgment theory (assimilation and contrast, latitude of acceptance, 1961),
whose authors are long dead and whose subject is non-partisan. That could support
a *second* puzzle on latitude of acceptance, but only if a source with counts
turns up. Status: LEAD, low priority.

### The Big Lie: REJECT as a separate lesson

The mechanism is repetition-induced truth, shipped as `illusory-truth` on Hasher,
Goldstein and Toppino (1977). Building it again would put a second name on one
reasoning move. The historical anchor is also a political text rather than data,
so there is nothing to count.

### Gaslighting: REDIRECT, and it produced Tier 1 item 2

Gaslighting as interpersonal abuse has a real sociological literature (Sweet,
*American Sociological Review*, 2019) but no countable dataset, and it is a
clinical and abuse topic rather than a reasoning illusion. The mechanism
underneath the "you are misremembering it" move does have a canonical
experimental form with counts, and that is Loftus and Palmer. Build that, and do
not call it gaslighting.

### Firehose of falsehood: REJECT

The primary source is a RAND perspective paper (Paul and Matthews, 2016), which
is not peer-reviewed, and it is explicitly about one named state's propaganda,
which is the Boykoff partisanship ground the project excludes. The mechanism is
`illusory-truth` again, with volume added.

### Whataboutism: REJECT for now, reconsider with a source

It is *tu quoque*, so its pedigree is ancient and entirely non-partisan
(Aristotle, *Sophistical Refutations*). The problem is shape, not politics: a
fallacy of argument structure has no dataset, and the deck's whole premise is
two views of one dataset. Reconsider if an experiment turns up that measures how
a whataboutist reply shifts a judgement, with counts, on non-partisan stimuli.

### Dog whistling: REJECT

The experimental literature is squarely about live racial politics in one
country. There is no historical version with dead parties. This is the clearest
Boykoff rejection on the list.

### Fearmongering: REJECT, and this is the most useful rejection here

The famous result is Janis and Feshbach (1953): 200 high school students, 50 per
group, and net conformity to dental recommendations of roughly 36 per cent in the
minimal-fear group, 22 per cent in the moderate, and **8 per cent in the strong
fear group**. Too much fear backfires. It is in every textbook, both authors are
dead, and the subject is toothbrushing, so it passes every test the project
usually applies.

**It is also contradicted by the current evidence.** Tannenbaum et al. (2015),
*Psychological Bulletin*, meta-analysed 127 studies and 27,372 participants, found
fear appeals effective overall (d = 0.29), and concluded there are **no identified
circumstances under which they backfire**. Building the 1953 result would teach
readers something the literature no longer supports, in a deck whose entire claim
is rigor.

**The salvageable version is a different lesson.** A single striking study that
entered every textbook and did not survive meta-analysis is itself a reasoning
trap, and one this deck is well placed to teach. It is closer to
`publication-bias` than to persuasion, and it would need care not to become a
lesson about one unlucky paper.

### Astroturfing: HOLD, good history and no numbers

Apollonio and Bero (2007), *American Journal of Public Health* 97(3):419-428, on
RJ Reynolds creating "Get Government Off Our Back" in 1994 while keeping its
involvement secret. Tobacco is the ideal non-partisan subject: nobody defends the
industry's front groups. But it is a documents analysis, entirely qualitative,
with no numerator and no denominator. Held until a source turns up that prints
counts, for instance identical letters in a consultation response.

### Wedge issues: REJECT

Inherently about live partisan cleavages, with no historical version whose
parties are extinct and no dataset shape. Nothing to build.

---

## Tier 4: what the nine discipline audits found

Method note first, because it governs how much these are worth. **Geography,
statistics and journalism were read from their governing documents. History and
psychology were checked against their frameworks but not extracted in full.
Literature, pharmacology, epidemiology and foreign languages were not read**; the
document to read is named for each so a later pass can start there.

### Read from the governing document

**Geography.** AP Human Geography CED. Names map projection distortion as
required content (IMP-1.A.3, quoted above) and "scale of analysis" twice. Names
**zero** occurrences of "ecological fallacy" and **zero** of "modifiable areal
unit problem", although the revision industry teaches both under Topic 1.6. So
Confoundle's shipped `ecological-fallacy` sits in the *taught* tier here, not the
*named* tier. Zero correlation, zero causation, zero Mercator. **Yield: Tier 1
item 4.**

**Statistics.** GAISE College Report 2016, American Statistical Association.
Names, as goals: becoming critical consumers of statistically-based results in
popular media; interpreting "what graphs **do and do not** reveal"; the central
role of variability and of randomness; association against causation; confounding;
and **multiple testing false positive rates**. This is the only discipline whose
governing document names most of what Confoundle teaches, which is unsurprising
and reassuring. **Yield: Tier 1 item 3**, and external validation for
`misleading-axis`, `correlation-causation` and `confounding-indication`.

**Journalism.** ACEJMC accrediting standards, the professional values and
competencies every graduate of an accredited US programme must demonstrate. One
of roughly ten reads: "effectively and correctly apply basic numerical and
statistical concepts". **Named, and entirely generic.** No specific error appears
anywhere in the list. This is the same shape as the UK finding in both other
audits: a requirement to be good at something, with nothing named. **Yield: none
directly, but it is the single best argument for the deck's existence.** A
journalism graduate is formally required to handle numbers correctly and is told
nowhere which mistakes to avoid.

### Checked but not extracted in full

**History.** AP World History: Modern names sourcing (point of view, purpose,
audience, historical situation), contextualisation, claims and evidence in
sources, and the three reasoning processes of comparison, causation, and
continuity and change over time. That is **source criticism**, which is a
different skill from Confoundle's: this deck's puzzles are ones where every
source is impeccable and the argument still fails. The same distinction the
Japanese civics finding turned on. History's one genuine contribution is
survivorship in the archive, which is `survivorship` in another costume.

**Psychology.** APA *Guidelines for the Undergraduate Psychology Major* is the
document to extract. Expected to be the richest of all nine on named cognitive
biases, because the medical audit already found Germany's IMPP catalogue uniquely
rich in psychological judgement errors and nobody else's. **This is the highest
priority unread document in the project**, ahead of the five remaining political
jurisdictions.

### Not read, with the document named for a later pass

- **Literature.** AP English Language and Composition CED. Expect rhetoric
  (ethos, pathos, logos) and rhetorical situation, not statistical error. Likely
  low yield, but it is where *audience* and *purpose* are taught explicitly and
  the deck says almost nothing about either.
- **Pharmacology.** British Pharmacological Society core curriculum, and the
  Prescribing Safety Assessment blueprint. Largely subsumed by
  `exam-syllabus-audit.md`, so expect duplication rather than discovery.
- **Epidemiology.** CEPH and ASPPH MPH foundational competencies. Also largely
  subsumed, and the six gaps in `plan-syllabus-gaps.md` already come from here.
- **Foreign languages.** CEFR. Expect a clean negative on reasoning error. The
  one thing worth checking is whether any level descriptor names the risk of
  false friends or of translation shifting a claim's strength, because
  "the study showed" against "l'étude a montré" is a real hedging problem in
  scientific translation and nothing in the deck touches it.

---

## Tier 5: from the open search, not from any curriculum

Three canonical experiments the deck has no equivalent of. All non-partisan, all
with published counts, all with their authors' work decades old.

### 9. The conjunction fallacy

**Status: LEAD.** Tversky and Kahneman (1983). Given a description of Linda,
large majorities rate "bank teller and active in the feminist movement" as more
probable than "bank teller", which is impossible. Reported as percentages of
respondents across several samples, so counts should be recoverable. Completely
non-partisan, instantly shareable, and the deck has nothing on probability
composition.

### 10. Confirmation bias, as an experiment rather than a slogan

**Status: LEAD.** Wason's four-card selection task (1968) and the 2-4-6 task.
Roughly one respondent in ten solves the four-card version. Confoundle has
**nothing** on confirmation bias, which is conspicuous given it is the bias most
readers think they already understand. Wason died in 2003 and the material is
abstract cards, so there is no partisan surface at all.

### 11. Availability

**Status: LEAD.** Tversky and Kahneman (1973), the question of whether more
English words begin with K or have K as their third letter. Named as part of the
category the medical audit lists as gap 4 (anchoring, availability, framing), of
which anchoring and framing have shipped and availability has not.

---

## What this document does not contain

The six medical trial-appraisal gaps: power and type I/II error, allocation
concealment, sponsorship and conflict of interest, the cognitive category,
Neyman bias, and the Hawthorne effect. Those have their own plan in
[`plan-syllabus-gaps.md`](./plan-syllabus-gaps.md) and are still the highest
priority work in the project, because four of the six are rang A in France and
three of those are also named by the USMLE. Nothing in this file outranks them.

The honest summary is that this backlog is broad and the medical plan is deep,
and the deck is better served by finishing the deep one first.
