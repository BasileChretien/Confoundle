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
| **SHIPPED** | Built and merged. Names the `reasoningSkill` and slug it went out as. |
| **VERIFIED** | Numbers read off the primary table. Ready to author. |
| **SOURCED** | Primary source identified and its figures seen, but not yet read off the paper's own table. Must be verified at source before authoring. |
| **LEAD** | A citation exists and looks right. Nothing has been read. |
| **BLOCKED** | Wanted, but no source with usable counts has been found. |
| **OPEN** | Under discussion or awaiting a citation. Not settled either way. |
| **REJECTED** | Recorded so nobody proposes it twice. Reason given. |

**A rule this file learned the hard way.** REJECTED requires a search that was
actually run, and the reason must name **which** of the three tests in Tier 3 the
candidate failed. "I could not think of a source" is not a rejection, it is an
unsearched entry, and writing the first as though it were the second is the single
worst thing this document can do, because a rejection here stops anyone looking
again.

Nothing here may be authored from this file. The project rule stands: read the
table, reconcile more than one way, or do not ship it.

**Every numbered entry carries a `<!-- skill: id -->` tag, and it is load
bearing.** The id is the `reasoningSkill` the lesson has shipped under, or the
one it is expected to ship under. `src/puzzles/docsCoverage.test.ts` reads these
tags and fails the suite if a tagged skill exists in the registry while its entry
still says LEAD or BLOCKED, or if an entry claims SHIPPED for a skill that does
not exist, or if a numbered entry has no tag at all. This file went stale exactly
that way before, with three shipped lessons still listed as work to do, so it is
checked rather than trusted. If you ship a lesson under a different id than its
tag names, change the tag in the same commit: that is the one case the test
cannot see.

---

## Tier 1: strongest candidates

Ranked. Each one has a named source, a non-partisan subject, and a plausible
two-views-of-one-dataset shape.

### 1. The sample that was too big to be right, 1936

<!-- skill: self-selection -->

**Status: SHIPPED 2026-07-30 as `self-selection`, slug `the-biggest-poll-ever-taken`.**
Squire was read in full from the *Public Opinion Quarterly* scan before
authoring, and the verification changed the lesson: the famous "they polled
telephone owners" explanation is wrong, and the entry below records why. Kept in
this file rather than deleted, because the research under it is the reason the
puzzle says what it says.

#### What the *Literary Digest* published

Its final count before the election, from more than **10,000,000** ballots mailed
to names drawn mainly from automobile registration lists and telephone books:

| | Ballots | Per cent |
|---|---:|---:|
| Landon | 1,293,669 | 55 |
| Roosevelt | 972,897 | 41 |
| Lemke | 83,610 | 4 |
| **Total** | **2,350,176** | **100** |

Roosevelt won the election with **61 per cent** against Landon's **37**.

**Reconciled three ways.** The three counts sum to 2,350,176, and each printed
percentage recomputes from that total (55.05, 41.40, 3.56), and the percentages
sum to 100. Independently, 2,350,176 against "more than 10 million" mailed gives
23.5 per cent, matching Squire's "less than a 25% participation rate".

**One correction to this file's earlier entry.** It gave returns as **2,376,523**,
taken from a secondary summary. That figure is **not in Squire**, whose text says
"over 2.3 million" and whose own table sums to 2,350,176. Author from 2,350,176
and from the three counts, not from the round number that circulates.

#### What the verification changed

The received story, and the one this file told a day ago, is that the Digest
polled rich car and telephone owners and so missed Roosevelt's base. **Squire's
evidence says that story is wrong**, and this is now the lesson rather than a
footnote to it.

Using Gallup's May 1937 survey (AIPO 83), which asked respondents whether they had
received a Digest ballot and whether they had returned it:

**Table 1, vote by car and telephone ownership.** Even respondents owning **both**
a car and a telephone went for Roosevelt, 55 to 45. The other three groups backed
him by more (68/30 car only, 69/30 phone only, 79/19 neither). N = 946, 447, 236,
657.

**Table 2, vote by whether a ballot was received.** Those who received one went
Roosevelt 55, Landon 44. N = 780 against 1,339 who received none.

**Table 3, vote by whether it was returned.** Those who returned it went Landon
**51**, Roosevelt **48**. N = 493 against 288 who did not return.

So the Digest's *sample* would have called Roosevelt the winner. What lost it was
**who bothered to reply**. Squire's decomposition runs 66 to 55 to 48: Gallup's
overall estimate 66 per cent Roosevelt, 55 among those sent a ballot, 48 among
those who sent one back, giving **about 11 points of sampling bias and about 7 of
non-response bias**. Both subtractions check against Tables 2 and 3 exactly.

#### The discrepancy, recorded rather than smoothed over

Table 3's cells total **829** (493 + 288 + 48), but Table 2 gives **780** as the
number who received a ballot, and Table 3 must be a subset of Table 2. The two
disagree by **49 respondents**. Squire does not comment on it. Most likely the two
tables handle item non-response on the vote question differently, but that is a
guess and it has not been checked. **Any puzzle built on this must not quote both
Ns as though they nest**, and the provenance note should say so.

#### Why it is the best candidate

The reveal is that the enormous number was the problem rather than the
reassurance, which is exactly the deck's shape. Confoundle has `survivorship` and
`publication-bias` as cousins but nothing where the **respondents chose
themselves**, and the AP US Government framework names precisely this gap as
"opt-in polling (like on social media)".

The corrected version is a better puzzle than the folk version, because it has two
reveals rather than one. First that the huge poll was wrong. Then that the reason
everybody gives for it being wrong is also wrong.

#### Limits

Squire states them and so must the puzzle. Gallup's 1937 quota sample was itself
flawed, it overestimates the winner's vote by about 5 points, and it
overrepresents both telephone and car owners and the number of people who returned
a ballot. Squire argues the last of these would if anything inflate Roosevelt's
share, so it does not rescue the folk story. All the 1937 figures are recalled
behaviour six months after the event.

**On partisanship.** Weaker than the 1812 gerrymandering solution, since both
modern US parties existed in 1936, but far from a live case: nobody alive
identifies with Alf Landon, and the finding is about who returns a questionnaire,
not about who was right.

- Squire P. Why the 1936 *Literary Digest* poll failed. *Public Opinion
  Quarterly* 1988;52(1):125-133.
- *Literary Digest*, 31 October 1936, pp. 5-6, for the counts, cited in Squire.
- Shape: `rates` with `strataAreSeparateSamples` set. Strata are the Digest's
  returns and the actual vote; the ownership and response tables belong in the
  deep dive. No new shape needed.

#### UNBLOCKED 2026-07-30, and the discrepancy was a finding rather than an error

The official return was obtained and read: **Statistics of the Congressional
Election of November 3, 1936**, compiled by Leroy D. Brandon under the direction of
South Trimble, Clerk of the House, corrected to 18 December 1936. It is a 1998
scan with no text layer, so it was read page by page. The national recapitulation,
"Popular vote for President and Vice President", is on pp. 42 to 43.

| | Votes |
|---|---:|
| Roosevelt (Democratic) | 27,476,673 |
| Landon (Republican) | 16,679,583 |
| Lemke (Union) | 882,479 |
| Thomas (Socialist) | 187,720 |
| Browder (Communist) | 80,159 |
| Other | 340,203 |
| **Printed total** | **45,646,817** |

**Reconciled two ways.** The six party columns sum to exactly the printed grand
total, to the vote. And Landon's 16,679,583 of 45,646,817 is **36.54 per cent**,
matching Squire's "37 per cent" independently.

**The 275,000-vote discrepancy that blocked this is not an error. It is the
American Labor Party.** The official return gives Roosevelt **27,476,673**, which
is **60.19 per cent**. Almost every compilation gives about 27,751,841, which is
the familiar **60.8 per cent**. The gap is New York, where Roosevelt also ran on
the American Labor Party line, created in 1936 so that voters could back him
without voting Democratic. The House return lists those **274,924** votes
separately under "Other". Add them and Roosevelt has 27,751,597, which is
**60.80 per cent**, the number everyone quotes.

So two defensible national totals exist for the same election, differing by a
quarter of a million votes, and the difference is a definitional choice about
whether a fusion line counts as a vote for the candidate. **That belongs in the
provenance note**, and it is a small Confoundle lesson in its own right.

**Decision for authoring.** Use the official return as printed, Democratic line
only, because it is the figure that reconciles with its own grand total: Roosevelt
27,476,673 and Landon 16,679,583 of 45,646,817. State the American Labor Party
point in the note so the reader who checks against Wikipedia is not left thinking
the puzzle is wrong.

Authored data, all four numbers exact and no percentage hardcoded:

| Stratum | Landon | Roosevelt | Denominator |
|---|---:|---:|---:|
| Ballots returned to the magazine | 1,293,669 | 972,897 | 2,350,176 |
| Votes cast on election day | 16,679,583 | 27,476,673 | 45,646,817 |

Derived shares: 55.05 against 41.40 in the poll, 36.54 against 60.19 in the
election. The winner reverses and the margin swings by more than thirty points.

#### The blocker as it stood, kept for the record

Attempted 2026-07-30 and stopped. The blocker is small, specific, and must not be
worked around.

**The second stratum has no verified counts.** `rates` authors integers and derives
every percentage, so the "actual vote" stratum needs a numerator and a denominator.
Squire prints only **61 per cent and 37 per cent**. The readily reachable secondary
sources disagree with each other by roughly **275,000 votes** on Roosevelt's total
(27,751,841 against 27,476,673), which is precisely the situation the
reconcile-more-than-one-way rule exists to catch. The official return, *Statistics
of the Presidential and Congressional Election of November 3, 1936*, is published
by the Clerk of the House at
`history.house.gov/Institution/Election-Statistics/1936election/` and returned 403
to every fetch route available here.

**Three redesigns were considered and all fail the same way.**

- Reconstruct counts from Squire's Tables 2 and 3 as *per cent times N*. Rejected:
  55 per cent of 780 is 429 and 44 per cent of 780 is 343.2, so the integers would
  be invented, with up to half a per cent of rounding error, and the deck's rule is
  that counts are authored and percentages derived, never the reverse.
- Use the `estimation` shape, with the Digest's forecast and Gallup's as two
  estimates against a true value. The constraint fits neatly, since both forecasts
  sat below Roosevelt's actual share. Rejected: Squire gives **no number** for
  Gallup's 1936 forecast, only that it was "reasonably accurate", so the second
  estimate would be unsourced.
- Use the 1932 Digest poll as the comparison stratum, since Squire says the
  magazine called that one within a point. Rejected: he prints no 1932 counts.

**To unblock, one of two things is needed.** Either the official Clerk of the House
figure, read from that PDF, which an ordinary browser can reach even though this
environment cannot; or an explicit decision to cite a named compilation such as
*Congressional Quarterly's Guide to U.S. Elections* and record in the provenance
note that the total is a compiler's figure rather than an official return.

Everything else is ready: the verified Digest counts, the winnability decision, the
shape, the deep-dive material, and the 49-respondent caveat. This is the last
number standing between Stage 1 and a shipped puzzle.

### 2. The word that put glass on the road

<!-- skill: misinformation-effect -->

**Status: SHIPPED 2026-07-30 as `misinformation-effect`, slug
`the-glass-that-was-never-there`.** Read from the journal scan of *Journal of
Verbal Learning and Verbal Behavior* 13, 585-589, not from the exam-board
reproduction this entry previously relied on. Arrived at by way of gaslighting,
and much better than gaslighting.

Participants watched a film of a multiple car accident. A week later they were
asked whether they had seen any broken glass. There was none in the film.

**Experiment 2, Table 2.** 150 students, 50 per condition.

| Verb used a week earlier | Yes | No | N |
|---|---:|---:|---:|
| smashed | 16 | 34 | 50 |
| hit | 7 | 43 | 50 |
| control, no speed question | 6 | 44 | 50 |

**Reconciled three ways.** Each row sums to 50; the three rows sum to the 150 the
Method section states; and the paper's own prose gives P(Y) as **.32** for smashed
and **.14** for hit, which recompute exactly from 16/50 and 7/50. Chi-square 7.76,
significant beyond the .025 level.

The same experiment's speed estimates are **10.46 mph** for smashed against
**8.00** for hit, t(98) = 2.00, p < .05, and the t degrees of freedom independently
confirm the two groups of fifty.

#### The correction this verification produced

**Experiment 1's Table 1 gives smashed as 40.5 mph, not 40.8.** The exam-board
reproduction this file previously cited said 40.8, and so do a good many revision
sources. The journal page was read as an image to be certain, because the OCR
could have misread a digit, and it plainly prints 40.5.

| Verb | Mean speed estimate |
|---|---:|
| Smashed | 40.5 |
| Collided | 39.3 |
| Bumped | 38.1 |
| Hit | 34.0 |
| Contacted | 31.8 |

Quasi F(5,55) = 4.65, p < .005. **Do not author from these figures.** Experiment 1
had 45 students and "nine subjects were asked" each verb, so every cell holds
**nine people**, which is far too small for this deck. Experiment 1 belongs in the
deep dive as context, and Experiment 2 supplies the puzzle.

#### A second, unexpected find for the deep dive

Four of Experiment 1's seven films were staged crashes at known speeds of 20, 30,
40 and 40 mph. The mean estimates for them were **37.7, 36.2, 39.7 and 36.1**. So
the estimates barely track the truth at all: a crash at 20 mph and a crash at 40
drew almost the same number. That is a self-contained lesson about the
worthlessness of eyewitness speed estimates, sitting inside the paper as an aside,
and it strengthens the main point rather than distracting from it.

#### Why it fits

Raw counts, so `rates` holds Experiment 2 with nothing invented. Two views of one
dataset: show the "hit" and control rows, which are nearly identical (7 and 6) and
read as "the wording changed nothing", then add the "smashed" row at 16, more than
double either. Utterly non-partisan: it is a film of a car crash. And it teaches
something no shipped puzzle does, which is that a single word can retroactively
install a memory of a thing that was never there. That is a different move from
`framing-effect`, which is about equivalent descriptions of one choice.

#### Limits to carry into the provenance note

Experiment 1's nine-per-cell design, as above. The subjects were students in
groups of various sizes rather than a random sample. And the broken-glass question
sat among ten questions in a random position, which is good practice and worth
saying, because it forecloses the obvious objection that the question itself was
the prompt.

- Loftus EF, Palmer JC. Reconstruction of automobile destruction: an example of
  the interaction between language and memory. *Journal of Verbal Learning and
  Verbal Behavior* 1974;13(5):585-589.

### 3. Everything is significant if you look at enough things

<!-- skill: multiple-comparisons -->

**Status: SHIPPED 2026-07-31 as `multiple-comparisons`, slug
`written-in-the-stars`.** Built on the ISIS-2 astrological subgroup, the second
of the two candidates below, exactly as this entry predicted. The paper was
obtained and Figure 5(b) read: it prints head counts, which the famous version
of this story does not. See the source note below, which is kept because it
records what nearly went wrong.

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

#### Source hunt 2026-07-31: half verified, half still blocked. Do not author yet.

The trial is pinned. **ISIS-2 Collaborative Group. Lancet 1988;2(8607):349-360.
PMID 2899772.** Confirmed from the MEDLINE record, not from memory.

**The reveal half is already verified**, from the abstract on that record:

| 5-week vascular deaths | Aspirin | Placebo |
|---|---:|---:|
| All 17,187 randomised | **804/8587** (9.4%) | **1016/8600** (11.8%) |

Those two fractions are what the reveal needs, and they reconcile: 804/8587 is
9.36 per cent and 1016/8600 is 11.81, both matching the printed 9.4 and 11.8, and
the two denominators sum to 17,187.

**The setup half is not.** The Gemini and Libra numerators are in the full text,
which this session could not reach: PubMed served a bot check, the library's
EBSCO Discovery instance was an unauthenticated guest session, and the 1988
article is not in ScienceDirect's index under its own title. No identifier was
guessed to get around that, and no secondary source was substituted.

**And one premise of this entry is itself unverified.** It asserts the astrology
subgroup was "published in the *Lancet* in 1988". That is the received account,
but nobody here has read the paper, so it is a claim about a source rather than a
claim from one. Two things to settle together, in this order:

1. Does the 1988 paper itself carry the astrological breakdown, or does it only
   appear in later commentary by the investigators, most likely Sleight P,
   "Subgroup analyses in clinical trials: fun to look at, but don't believe
   them!", *Curr Control Trials Cardiovasc Med* 2000;1(1):25-27, which is open
   access? If the counts are only in the commentary then the commentary is the
   primary for them, and the entry above must be rewritten to say so.
2. Only then, the numerators for Gemini and Libra against the other ten signs.

**Route that is most likely to work next**, given what failed: a signed-in
session on the library's discovery service, or thelancet.com reached through a
real link rather than a constructed one. The lesson from the availability puzzle
applies here too, that an author or institutional repository copy often exists
where the publisher's own page does not open.

#### RESOLVED 2026-07-31. The PDF settled all three questions at once.

Basile supplied the PDF. Answers, in the order the questions were asked:

1. **The 1988 paper does carry it**, in the Discussion on page 356 and in
   Figure 5(b). The received account was right, and is now checked.
2. **It prints head counts**, which is the part that mattered and the part
   nobody could have known without the figure. The famous version of this story
   circulates as an effect size only: the investigators' own later commentary
   gives "9% +/- 13" and no numerators anywhere, so a puzzle built from that
   would have had nothing to author.
3. So no new shape was needed. `rates` fits, because birth sign genuinely
   partitions the trial.

| 5-week vascular deaths | Aspirin | Placebo tablets |
|---|---:|---:|
| Gemini or Libra | **150/1357** (11.1%) | **147/1442** (10.2%) |
| Other ten signs | **654/7228** (9.0%) | **868/7157** (12.1%) |

**Reconciled six ways**, all in the test file. The four printed percentages
reproduce. The odds ratios recomputed from the counts are a 9.5 per cent
increase and a 27.9 per cent reduction, against the paper's own printed "9% SD
13 increase" and "28% SD 5 reduction", which the authors computed separately and
which is therefore an independent check. And the aspirin deaths sum to exactly
the 804 the trial reports overall.

**One discrepancy, recorded and not explained away.** The strata hold 8,585
aspirin patients against 8,587 randomised, 8,599 placebo against 8,600, and
1,015 placebo deaths against 1,016. Two, one and one short, most likely patients
with no usable date of birth, but the paper does not say so and neither does the
puzzle. A test pins the residuals.

**And a better deep dive than expected.** The Figure 5 caption audits the trial's
own subgroup analyses: the 26 non-astrological heterogeneity tests summed to 58.5
on 50 degrees of freedom, and the authors note that one or two would be expected
to reach p below 0.05 by chance alone even if nothing differed. Exactly one did,
and they explain why they disbelieve that one too. A paper marking its own most
tempting finding as probably noise is rare enough to be the example.

### 4. The map is not the territory, and the projection knows it

<!-- skill: projection-distortion -->

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

<!-- skill: margin-of-error -->

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

### 12. Retraction does not undo it

<!-- skill: continued-influence-effect -->

**Status: SHIPPED 2026-08-03** as `strike-that-from-the-record`, skill
`continued-influence-effect`, on Kassin and Sommers (1997),
`10.1177/01461672972310005`.

**The block recorded below was real and was got around by changing paradigm, not
by lowering the bar.** Three memory-paradigm papers were read at source and
refused because the field measures a coded mean per person. The
instructed-disregard literature asks jurors for a verdict, which is binary, so
the same lesson arrives with a numerator and a denominator. That is the general
move worth remembering: when a literature cannot supply counts, look for a
neighbouring literature testing the same claim with a binary outcome.

**The counts are reconstructed, which this project normally refuses, so the
grounds are on the record.** The paper prints percentages by condition, but it
also prints 81 participants, 36 guilty verdicts, an overall rate of 44.4 per
cent, group sizes of 19 to 21, 58 of 60 across the three experimental groups and
39 of 41 across the two disregard groups. Those last two fix the control group at
21 and the admitted group at 19 without any arithmetic on a percentage at all,
and leave 41 to split between the disregard groups; only 20 and 21 work, because
55 per cent recovers a whole number against 20 and against nothing else in range.
The resulting counts sum to the independently printed 36 of 81 **and reproduce
both published chi-square statistics to the second decimal, 17.31 and 14.56**,
neither of which anything was fitted to. Six printed quantities recovered, none
of them used in the derivation. That is the standard the refused reconstructions
below failed: there, several readings survived and none landed exactly.

**The lesson changed once the data was read, and for the better.** The entry
below assumed the teaching point was that corrections do not work. The study
shows that is wrong. One instruction to disregard was obeyed completely, the jury
told the tape was unreliable convicting at exactly the control rate, 5 of 21
against 5 of 21. The jury told the same tape was real but illegally obtained
convicted 11 of 20. What people cannot do is stop believing something they still
think is true, so a retraction works when it supplies a replacement account and
fails when it merely forbids the use. That is a sharper lesson than the platitude
and it is the one that ships.

Entries 20 and any future backfire entry still need the mean-with-dispersion
shape; this route does not rescue them.

**The original research record follows, kept because the refusals are still the
right calls and the reasoning is worth not repeating.**

**Sourcing status: LEAD.** Promoted out of Tier 3, where it turned up while
searching the firehose model's component claims. Nothing in the deck is like it.

The **continued influence effect**: people keep using retracted misinformation in
their reasoning after the retraction. Two reported findings make it a puzzle
rather than a platitude. Retractions from low-trustworthiness sources are
**entirely ineffective**, and substantial continued influence persists **even when
the retraction is designed and rated as highly credible**. So the correction can
be impeccable and still not work.

Why it fits: the paradigm is a scripted incident with a retraction condition and a
control, non-partisan by construction. It also does something no shipped puzzle
does, which is to be about what happens **after** the reader has been corrected,
and that is uncomfortably close to what this whole deck assumes about itself.

**Status as to shape: BLOCKED, and the block is the whole field, not one paper.**
The line above used to claim the outcome "is usually a count of inferences that
still rely on the retracted claim. That is a `rates` shape with two arms." That
was wrong, and three papers were read at source on 2026-08-03 to establish it.
The field's standard dependent measure is a **coded mean per person**, not a
headcount, so there is no numerator over a denominator anywhere in it.

- **Wilkes and Leatherbarrow (1988)**, `10.1080/02724988843000168`, the original
  paradigm. Table 2 prints percentages, but the denominator is *questions
  answered*, which varies with omissions and is never printed. 90 subjects across
  three groups, confirmed by `F(2, 87)`. No counts recoverable.
- **Johnson and Seifert (1994)**, `10.1037/0278-7393.20.6.1420`. Tables 3, 4, 6
  and 8 are means and standard deviations. The text does print percentages **of
  subjects**, which is the right unit, but never the per-group denominators.
  Experiment 1A is 34 people across three arms, from `F(2, 31)`, and the arms are
  uneven. Several splits are consistent with 95 and 27 per cent, and none lands on
  an exact integer, so reconstructing would be guessing. Compare Oreskes below,
  where 75 per cent of 928 is 696 exactly and the categories sum to the total:
  that is what a legitimate reconstruction looks like, and this is not it.
- **Ecker, Lewandowsky and Tang (2010)**, `10.3758/MC.38.8.1087`. Prints 25
  participants per cell and a manipulation-check headcount (19, 17, 20 and 18 of
  25 remembered the retraction), but the effect itself is a mean inference score
  out of 20, shown with standard-error bars.

So this ships only behind **a new shape for a mean with a dispersion interval**,
which the deck does not have and which is a real piece of engine work: a union
member, a derivation module with a test, a renderer, a `DataViewRenderer` case,
scope labels and a share-card glyph. Ecker is the one to build it on, because it
prints its per-cell N and its two-by-two of retraction against warning is already
a setup-and-reveal.

Worth recording separately, because it survives the shape problem and is the
best framing anyone has found for this bias: Johnson and Seifert report that
**95 and 91 per cent** of people in the corrected conditions still made at least
one direct, uncontroverted reference to the retracted material, while only **24
and 9.1 per cent** named it when asked the global cause question outright. Asked
directly, they look corrected. Watched while they reason, they are not. That is
the puzzle, whenever a shape exists to hold it.

Sources to read: *Memory and Cognition* (2021) on retraction source credibility,
and *Cognition* (2024) on relative source credibility in the CIE.

#### Searched 2026-07-31. Still open, and the search taught something useful.

An OpenAlex sweep of open-access work on the continued influence effect since
2015, ranked by citations, returned almost entirely **reviews rather than
experiments** (Lewandowsky's post-truth and psychological-drivers papers, the
inoculation literature), plus several that fail this deck's non-partisanship test
outright by construction, being about health care reform rumours or a named
politician.

Two things follow. First, the classic non-partisan paradigm is the **warehouse
fire** vignette, where a report mentions volatile materials, retracts it, and
people keep citing them, and that is what a targeted hunt should look for rather
than the CIE literature at large. Second, and this is the real risk on this entry:
CIE outcomes are usually reported as a **mean number of references to the
retracted claim**, or a mean rating on a scale, not as a proportion of
participants. Means with standard deviations are what got Srigley rejected for the
Hawthorne puzzle. **Before spending a PDF on this, check that the candidate
reports a count of participants, not a mean count of inferences.**

---

## Tier 2: named by a curriculum, still needs a source

### 6. The poll that makes the opinion it measures

<!-- skill: polls-shape-opinion -->

**Status: BLOCKED.** Named by France, première SES, verbatim:

> Comprendre comment le recours fréquent aux sondages d'opinion contribue à
> forger l'opinion publique

An instrument that changes the thing it measures. The experimental literature is
bandwagon and underdog effects, and it is genuinely hard: the published effects
are small, the outcome is usually a stated preference rather than a count, and
the cleanest demonstrations are in live elections, which is the partisan ground
the project excludes. Wanted, but do not force it.

### 7. Counting crime is counting reporting

<!-- skill: reporting-rate -->

**Status: BLOCKED.** Named by France, première SES: "les difficultés de mesure de
la délinquance".

This is `detection-bias` transplanted from medicine to policing. **The risk is
that it is a second name for one reasoning move**, which this project has already
refused twice, for attrition against intention-to-treat and for question wording
against framing. It would have to teach something the medical version cannot. The
strongest version would use a case where recorded crime rose while victimisation
surveys were flat, so the two instruments disagree on the same reality.

### 8. Goodhart, and the measure that stops measuring

<!-- skill: goodharts-law -->

**Status: LEAD.** Not named by any curriculum read, but it is the thread running
through several things that are: the French polling item above, the sales-region
and school-catchment items already written into the gerrymandering review bank,
and the whole logic of `more-votes-fewer-seats`.

Campbell's law (Campbell DT, 1976) is the citable form. Needs a case with counts
where a target was hit and the underlying thing did not move.

---

## Tier 3: the nine persuasion techniques

**Correction, 2026-07-29.** The first version of this section marked five of the
nine REJECTED. That was not honest work. Of the nine, only **three** had actually
been searched (fear appeals, astroturfing, and the Loftus redirect). The other six
were adjudicated from memory and written up as though a search had been done. Two
of those six were then searched, and **both turned up peer-reviewed randomised
experiments within a single query**, which means the rejections were wrong on the
facts, not merely premature. The section below is rewritten with each term's
actual search state on the record.

The failure had a specific shape worth naming, because it will recur: I collapsed
three independent questions into one verdict. They are separate and are now kept
separate.

| Test | Question |
|---|---:|
| **Evidence** | Does peer-reviewed experimental work establish the effect? |
| **Neutral ground** | Is there a version whose parties and people are extinct? |
| **Shape** | Is there a dataset with counts that can be shown two ways? |

A term fails only on the test it actually fails. "No neutral version" is not a
reason to write "no science".

Basile is sourcing papers for several of these. Entries below marked **OPEN**
should be treated as awaiting his citations rather than as settled.

**Search state, so the ledger is visible. All nine have now been searched.**

Of the five originally marked REJECTED without a search, **four were overturned**
(whataboutism, dog whistling, the Big Lie, firehose of falsehood) and **one
survived** (wedge issues), which now carries a real reason instead of an invented
one. Of the four that had been searched or partly searched, fear appeals keeps its
rejection in narrowed form, astroturfing keeps its hold, gaslighting's redirect
stands, and the Overton window's second route is now a live lead.

Two entries were promoted out of this section entirely: the Big Lie, which looks
like it may be the same puzzle as the Overton window, and the **continued
influence effect**, which the firehose search turned up and which became Tier 1
item 12. **A section written to close nine questions ended up opening two of the
best candidates in the file**, which is the argument against writing rejections
from memory, stated as compactly as it can be.

### Whataboutism: OPEN. The earlier rejection was wrong

Written up as "a fallacy of argument structure has no dataset". It has several.

- **van Eemeren, Garssen and Meuffels** and **Bhatia and Oaksford** both ran
  experiments in which speaker A makes a one-sentence argument, speaker B replies
  with either a *tu quoque*, another ad hominem, or a substantive counterargument,
  and participants rate the reasonableness of B's reply.
- **The Diplomacy of Whataboutism and US Foreign Policy Attitudes**,
  *International Organization* (Cambridge). Randomised vignette experiments, with
  a robustness study on **3,200 US adults**.

The reported pattern is itself a good reveal: whataboutist replies are rated
*more* reasonable than plain ad hominem but *less* reasonable than a substantive
answer, and the gap is significant for political and personal topics **but not for
scientific ones**. That last clause is exactly the kind of stratified result this
deck is built from, and it points at a non-partisan version rather than away from
one.

Evidence: **yes**. Neutral ground: plausible, via the argumentation studies rather
than the IR one. Shape: needs the rating scales checked, since means on a
reasonableness scale are not counts and this deck authors from counts.

### Dog whistling: OPEN. The earlier rejection conflated two different objections

Written up as the clearest partisanship rejection on the list. The partisanship
concern is real and stands. The claim that came with it, that there was nothing
but live political material, was wrong: this is one of the better-replicated
literatures in political psychology.

- Mendelberg (2001); **Valentino, Hutchings and White (2002)**, the foundational
  implicit-appeal experiments; White (2007).
- **Valentino et al. (2018)**, four nationally representative survey experiments
  finding implicit appeals are **no more effective than explicit ones**, argued to
  reflect a changed environment rather than a failure of the original theory.
- **Wetts and Willer (2019)**, *Socius*, two experiments, **1,797 white
  Americans**, racial attitudes measured two weeks before exposure.

The 2018 reversal is the interesting part for this deck, and it is not a lesson
about race at all: it is a lesson about a well-established effect that stopped
replicating because the world changed underneath it, which is a reasoning trap in
its own right and a close cousin of the fear-appeal problem below.

Evidence: **yes, and strong**. Neutral ground: **no**, and this remains the real
obstacle. Shape: the outcomes are policy-preference scales, so counts need
checking.

### The Big Lie: PROMOTE. Searched, and the rejection was wrong twice over

Written up as "the mechanism is repetition, so it is `illusory-truth` again". That
was wrong on two counts, and the search took one query.

Wrong once because that is not what the Big Lie claims. The claim is about
**magnitude**, that a colossal lie is more credible than a small one, and
magnitude and frequency are different variables. The deck's rule against putting
two names on one reasoning move does not apply when they are two moves.

Wrong twice because there is an experimental literature and it reports something
better than the folk claim. The finding is **not** that the big lie is itself
believed. It is that **exposure to highly implausible claims raises belief in the
less implausible ones**: big lies make little lies more convincing. Participants
shown more highly implausible headlines went on to rate milder falsehoods as more
plausible, and the effect held whether they identified as liberal or conservative,
which is the non-partisanship test passing rather than failing.

**That mechanism is a scale shift, not a repetition effect**, which puts it in the
same family as shipped `anchoring` and makes it the closest thing anyone has to an
experimental Overton window. The two OPEN entries for the Big Lie and the Overton
window may therefore be **one** puzzle, and it is a good one.

Needs the primary paper: the finding was reached through a *Scientific American*
account of the experiments and the underlying article has not been identified,
still less read. Status: **LEAD**, and the highest-priority item in this section.

### Firehose of falsehood: SEARCHED, and one of its ingredients looks refuted

The objection to Paul and Matthews (2016) stands on its own terms: think-tank
perspective paper, not peer-reviewed, about one named state. The component claims
are separable and testable, and the search turned up three things, one of which
is better than anything the model itself asserts.

**The multi-channel claim appears to be false.** Foster and colleagues found that
**repetition, not number of sources**, increases susceptibility to misinformation
and confidence in eyewitness accuracy, and a later meta-analysis concluded that
source variability "does not increase eyewitness suggestibility independently of
repetition". If that holds, the firehose's "many channels" ingredient contributes
nothing beyond saying the same thing more often. **A widely repeated model of
manipulation with a component that does not survive testing is a very good
Confoundle subject**, and it is about method rather than about any country.

**Repetition buys the speaker, not just the claim.** Mattavelli, Brambilla and
Unkelbach (2025), "Repeating Statements Increases Source Credibility". Repetition
raised perceived truth *and* the source's credibility, and the credibility gain
transferred to **novel** statements from that source. That is separable from
shipped `illusory-truth`, which is about the repeated statement itself.

**And the search surfaced a candidate the deck has nothing like: the continued
influence effect.** Retracted misinformation keeps influencing reasoning after the
retraction. Retractions from low-trustworthiness sources are reported as *entirely
ineffective*, and substantial continued influence persists even when the
retraction is designed and rated as highly credible. Sources include *Memory and
Cognition* (2021) and *Cognition* (2024). **This is promoted out of Tier 3**: see
Tier 1 item 12.

### Wedge issues: SEARCHED, and this one really is thin

The historical question was finally asked and it has an answer, just not a useful
one. Seo (2011), "Wedge-issue dynamics and party position shifts", *Party
Politics*, studies the Chinese exclusion issue of 1879 to 1882 as a
nineteenth-century wedge, so historical treatments exist and the actors are long
dead. Two problems remain, and they are the honest reasons rather than the
made-up one.

- **Shape.** It is congressional roll-call analysis of party position change, not
  an experiment, and no controlled issue-salience manipulation turned up at all.
  There is no dataset here that can be shown two ways.
- **Neutral ground.** Chinese exclusion is racially charged even at 150 years'
  distance, so the "extinct parties" trick that rescued gerrymandering does not
  rescue this.

Status: **REJECTED, now legitimately**, failing shape primarily and neutral ground
secondarily. Reopen if an experiment surfaces that manipulates which of two issues
is made salient and measures a choice with counts.

### Overton window: OPEN, and possibly the same puzzle as the Big Lie

The redirect to shipped `anchoring` stands for the mechanism. But see the Big Lie
entry above: the implausibility-calibration finding is an experimental scale
shift on political claims, which is what the Overton window asserts and what
`anchoring` demonstrates only on numbers. If one paper can carry both, build one
puzzle, not two.

**Searched, and the subject is better than expected.** Sherif and Hovland,
*Social Judgment: Assimilation and Contrast Effects in Communication and Attitude
Change*, Yale University Press, 1961. The experiments used attitudes to the
**prohibition of alcohol**, with subjects drawn from a dry state where it was
still a live issue. Prohibition is the rare political topic with no living
partisans at all, so this passes the neutral-ground test outright, better than
1812 gerrymandering did.

The obstacle is access, not politics: it is a book rather than an article, and the
search did not reach the tables, so whether it reports **counts** rather than
scale means is unknown. Status: **LEAD**, worth the interlibrary request.

### Gaslighting: the redirect stands, the rejection under it was not searched

**Loftus and Palmer remains a strong find and is Tier 1 item 2.** But the claim
that gaslighting's own literature has "no countable dataset" was written without
searching it. Sweet (2019) is sociological and qualitative, which is what that
claim was based on, but it is one paper and no one looked further.

### Fearmongering: the one substantive objection, and it is narrower than written

This is the term that *was* searched, and the finding is real and should not be
softened: **Tannenbaum et al. (2015)**, *Psychological Bulletin*, 127 studies and
27,372 participants, d = 0.29, and no identified circumstances under which fear
appeals backfire. Authoring Janis and Feshbach's 1953 result as current would ship
a claim the literature does not support.

But the objection is to **one framing**, not to the topic. Two live routes remain:

1. Fear appeals paired with efficacy against fear appeals without it, which is the
   EPPM's actual claim and is not the same as "too much fear backfires".
2. The meta-analytic reversal itself as the lesson, which is a genuinely good
   puzzle about a famous single study that did not survive, and which shares its
   spine with the dog-whistle 2018 reversal above.

### Astroturfing: HOLD stands, and it is a shape problem only

Apollonio and Bero (2007), *American Journal of Public Health* 97(3):419-428, on
RJ Reynolds creating "Get Government Off Our Back" in 1994 while concealing its
involvement. Evidence: yes. Neutral ground: yes, tobacco is ideal. Shape: **no**,
it is a documents analysis with no numerator and no denominator. This is the only
one of the nine whose obstacle was correctly identified the first time.
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

<!-- skill: conjunction-fallacy -->

**Status: SHIPPED 2026-07-31** as `two-things-at-once`, on the replication
rather than the original. What follows is the record of how the source was
chosen, kept because the reasoning is the interesting part.

**RESOLVED 2026-07-31.** The PDF was supplied and Table 1 on page 554 read from
the rendered page, which mattered: `pdftotext -layout` shifts the study column
against the row descriptions in that table and would have paired several counts
with the wrong condition. The six cells are, as violations of the conjunction
rule with and without a $4 incentive for the correct answer, answering alone
50/86 and 31/94, in pairs 27/56 and 5/38, in trios 10/39 and 5/48. Reconciled
five ways: all six printed percentages reproduce, each pair of arms sums to its
printed subtotal row in both numerator and denominator, the three denominators
sum to exactly the 361 participants the methods section states on the previous
page, the prose in section 3.2 quotes the alone row as 58 and 33 per cent, and
footnote 11's truth-wins predictions reproduce from these rates. The puzzle is
built on the incentive and consultation arms, with the reveal that unpaid trios
(25.6 per cent) beat paid individuals (33.0 per cent). The famous 85 per cent
appears nowhere in the puzzle: this project has not read the 1983 paper, and a
test asserts that neither that figure nor its counts occur in any authored
string.

**Status when opened: SOURCED 2026-07-31, and the source changed.** Tversky and
Kahneman (1983). Given a description of Linda, large majorities rate "bank teller and
active in the feminist movement" as more probable than "bank teller", which is
impossible. Completely non-partisan, instantly shareable, and the deck has
nothing on probability composition.

**The original is not reachable and probably is not the right source anyway.**
Tversky A, Kahneman D. Extensional versus intuitive reasoning: the conjunction
fallacy in probability judgment. *Psychological Review* 1983;90(4):293-315, DOI
`10.1037/0033-295X.90.4.293`, verified against CrossRef. OpenAlex reports it
**closed with no open-access location anywhere**, and APA served a guest session
the last time this project tried, so it is a paywall with no repository copy
behind it.

**Build on the replication instead.** Charness G, Karni E, Levin D. On the
conjunction fallacy in probability judgment: new experimental evidence regarding
Linda. *Games and Economic Behavior* 2010;68(2):551-556, DOI
`10.1016/j.geb.2009.09.003`, verified against CrossRef. It reruns Tversky and
Kahneman's own design and reports, from the abstract read at source, that **with
mild incentives the proportion violating the conjunction principle is
significantly lower than Kahneman and Tversky reported**, and that letting
subjects consult others drops it dramatically, especially going from two people
to three.

That makes a better puzzle than the plain Linda problem, and one that fits this
deck's character rather than the usual retelling. The plain version teaches that
people are bad at probability. This version teaches that too, and then asks what
the headline rate actually measures, because paying a little or letting people
talk to two others moves it a long way. The same move as the Hawthorne puzzle,
where the effect is real and the study it is named after is not the evidence.

**Access is solved, extraction is not.** ScienceDirect shows "Nagoya University
Institutional Access" and "Full text access" for this article, so it is
reachable, but the body renders as an **embedded PDF** rather than HTML, which
Chrome's viewer does not expose to text extraction. The article's own PDF link is
`/science/article/pii/S0899825609001742/pdf`. The EconStor green copy at
`hdl.handle.net/10419/49905` exists and is legitimate, but the site is behind an
Anubis proof-of-work check that stalls at 0kH/s in both browsers tried.

**So the remaining step is one saved PDF, and nothing may be authored before it.**
A citing article quotes the incentive effect as a drop "from 58% to 33%", but that
is a *citation excerpt in someone else's paper*, not the table, and this project
does not author from those. The numbers to read off are: the proportion violating
the conjunction principle in each condition, with denominators, for the
no-incentive, incentive, and group-consultation arms.

The PDF was supplied by hand and the table read. The citing article's "58% to
33%" turned out to be right, which is not the point: it was right the way a
guess can be right, and the denominators it omitted (86 and 94) are what the
puzzle actually needed.

### 10. Confirmation bias, as an experiment rather than a slogan

<!-- skill: confirmation-bias -->

**Status: READ AT SOURCE 2026-07-31, and the paper is not what this entry
assumed.** The PDF was supplied and read. Wason 1968 is **not** the source for
the famous baseline error rate, and anyone picking this up should not go looking
for it there.

What the paper actually is: a study of *therapies* meant to correct the bias,
not a measurement of it. Experiment I ran **36 first-year psychology and
statistics students at University College London**, allocated alternately to an
experimental and a control group, of whom two were rejected for not complying,
leaving about seventeen per arm. The experimental group was invited to
"project falsity" before revising its card selections; the control group was
merely asked to think again. The headline result is a **null**: selection of the
falsifying card rose from five to eight in the experimental group and from two
to three in the control group, and the paper states plainly that the predicted
facilitation "is not confirmed". The usable counts are there but small: of the
13 experimental subjects who did not initially select the falsifying card, eight
projected P onto it and only three then revised their selection to include it.
The classic wrong pair, P and Q, was the most frequent choice in both arms,
eight cases and ten.

**So there are two honest ways forward and the entry should not pretend
otherwise.** Either build on the null, which is a genuinely good and unusual
lesson (the bias survived a therapy designed to remove it, on seventeen people
per arm, so the puzzle would have to be about how little that proves either
way and would run straight into the deck's own `statistical-power` lesson), or
find a different source for the baseline. The famous rate belongs to Wason's
earlier work and to Johnson-Laird and Wason, and a modern replication with a
usable denominator would be better than either. **Do not author the one in ten
figure from this paper; it is not in it.**

The original framing of this entry, kept for the record: Wason's four-card
selection task (1968) and the 2-4-6 task. Roughly one respondent in ten solves
the four-card version. Confoundle has **nothing** on confirmation bias, which is
conspicuous given it is the bias most readers think they already understand.
Wason died in 2003 and the material is abstract cards, so there is no partisan
surface at all.

**Pinned 2026-07-31.** Wason PC. Reasoning about a rule. *Quarterly Journal of
Experimental Psychology* 1968;20(3):273-281, DOI `10.1080/14640746808400161`,
verified against CrossRef. OpenAlex reports it **closed, with no open-access
location**. The DOI resolves to SAGE, which serves an automated security check
that did not clear in either browser tried, so the full text was not reached and
nothing has been read.

Worth noting for whoever picks this up: the selection task's appeal here is that
its outcome really is a **count of people choosing each card combination**, which
is the cleanest possible fit for `rates`. That is worth one saved PDF if the
institution has Taylor and Francis or SAGE. If it does not, the fallback is a
modern replication rather than a textbook retelling, found the same way the
conjunction fallacy replication was found: an OpenAlex search filtered to
`is_oa:true`.

### 11. Availability

<!-- skill: availability-heuristic -->

**Status: SHIPPED 2026-07-30 as `availability-heuristic`, slug
`what-comes-to-mind-first`.** Not on the K-word study this entry proposed.
Tversky and Kahneman (1973) asks whether more English words begin with K or have
K third, which is a fact about English rather than about the world, so it teaches
the heuristic without teaching what it costs. The puzzle was built instead on
Lichtenstein, Slovic, Fischhoff, Layman and Combs (1978), where the same
mechanism is measured against real mortality and one control pair refutes the
obvious objection from inside the data. See `plan-syllabus-gaps.md` gap 4.

### 13. The self-applied label

<!-- skill: self-applied-label -->

**Status: SHIPPED 2026-07-31** as `what-it-calls-itself`. Sourced, verified and
authored the same day; what follows is the record of how the source and the
name were chosen, because for this entry both were open questions. Requested
directly: a lesson on the political technique where a name asserts a property
the thing does not have, in order to borrow the credit for it. The Democratic
People's Republic of Korea is neither democratic nor a republic. National
Socialism was not socialism. The deck has `framing-effect`, which is the same
facts told with a different emotional colour, and nothing at all on a proper
name or charter that simply makes a false claim about itself.

**There is no single agreed name for it, and that is worth saying in the
lesson.** Four established terms each cover part of the ground and none covers
all of it:

- **Persuasive definition**, Charles Leslie Stevenson, *Mind* 1938. Keeping a
  word's favourable emotive force while changing what it denotes. The closest
  philosophical term, and exactly what happens to *democratic*, *socialist* and
  *republic*. It describes redefining a common noun, not naming an entity.
- **Glittering generality**, one of the seven devices named by the Institute
  for Propaganda Analysis in 1937. Virtue words attached to a thing to win
  assent without evidence. Close, but about vague words in an argument.
- **Doublespeak**, William Lutz after Orwell. Language that disguises or
  reverses meaning. Popular rather than technical, and broader than this.
- **Decoupling** and **ceremonial conformity**, Meyer and Rowan, *American
  Journal of Sociology* 1977. The organisational version: adopt the legitimate
  *form*, the names and charters and structures, while practice diverges. This
  is the one with an empirical tradition behind it, and it is what the source
  below is measuring.

So the skill takes a plain English name of its own, `self-applied-label`, and
the lesson names all four neighbours so a reader can follow any of them up.

**Source pinned and read at source.** Law DS, Versteeg M. Sham constitutions.
*California Law Review* 2013;101(4):863-947. Open access at
`comparativeconstitutionsproject.org/wp-content/uploads/2013_Sham-Constitutions_with-DL.pdf`.
The paper opens on the North Korean constitution's promises of private
property, freedom of speech and freedom of movement, so the requested example is
the authors' own.

**Table 14, page 913, read from the rendered page.** `pdftotext -layout` shifts
this table in *two* separate places, both caused by wrapped row labels, and the
naive extraction mislabels five rows. The visual read is authoritative and four
independent prose anchors on the facing page confirm it: footnote 136 spells out
136/175 for arbitrary arrest, the prose gives 12.3 per cent for torture, 70 per
cent for religious freedom, and "every country" for the death penalty.

Countries fully honouring a right, out of those whose constitution guarantees it:

| Right | 1981 | 2010 |
|---|---|---|
| Prohibition of torture | 26/83 (31.3%) | **19/155 (12.3%)** |
| Freedom of expression | 25/136 (18.4%) | 48/180 (26.7%) |
| Religious freedom | 112/142 (78.9%) | 127/179 (70.9%) |
| Freedom of movement | 82/97 (84.5%) | 137/162 (84.6%) |
| Prohibition of the death penalty | 14/14 (100%) | **49/49 (100%)** |

**The puzzle.** Setup shows 1981 only, filtered to torture: 83 constitutions
banned it and 26 of those countries honoured the ban. Question: by 2010 the ban
had spread to 155 constitutions, so how many honoured it? Answer: 19. The
promise nearly doubled its reach while the share keeping it fell by more than
half. Uses `initialView.groupIds` to hide 2010, which no puzzle in the deck has
needed before but the schema already supports.

**The reveal has to carry the other half or the lesson is a cynical one.** The
death penalty ban was honoured by every country that made it, in all four survey
years, and freedom of movement by 85 per cent. So the honest lesson is not that
charters are worthless, it is that the charter is not the evidence and which
promise you are looking at decides everything.

**Reconciled 2026-07-31.** All 17 figures taken from the paper reproduce their
printed percentages from the counts. Separately, the typology counts on page 885
sum to exactly 167 and all five of their printed percentages reproduce: of the
167 constitutions in force in 2010 with sufficient data, 74 (44.3%) strong, 39
(23.4%) sham, 13 (7.8%) weak, 11 (6.6%) modest, 30 (18.0%) exactly average.
Those are the deep dive.

**Non-partisanship.** No living party or side is named. The unit is the state
and the span is 1981 to 2010, the authors chose the examples, and the countries
that come off worst are the ones nobody defends. The lesson generalises past
politics on purpose, to product labels, organisation names and certification
seals, so it cannot read as being about one country.

---

## Propaganda audit, 2026-07-31

Requested directly: a full sweep of the propaganda field for anything the deck
has missed. Method was the usual one. The checklist was the union of the
Institute for Propaganda Analysis seven devices (1937), the modern
computational-propaganda and disinformation taxonomies, and the consolidated
list of 73 named techniques, audited against the 39 skills in the registry and
the 13 entries above.

**Most of the 73 are not candidates, and the reason is the same each time.**
This deck needs a published primary source that prints *counts*, and a setup and
reveal that are two views of the same data. Scapegoating, demonising the enemy,
cult of personality, gaslighting, love bombing, milieu control, demoralisation
and euphoria are real and well documented as history, but there is no experiment
with a numerator and a denominator to build on, and a puzzle about them would be
a lecture with a chart bolted to it. Straw man, red herring, non sequitur,
black-and-white fallacy and guilt by association are argument fallacies rather
than measurable effects; they belong in review items, not puzzles. Ad hominem,
smears, name-calling and demonising also fail the non-partisanship rule almost
by construction, since any real example makes one living side look uniquely bad.

**Already covered, and struck off:** framing (`framing-effect`), glittering
generalities, virtue words and labeling (`self-applied-label`), repetition, ad
nauseam and the big lie (`illusory-truth`), latitudes of acceptance
(`anchoring`), managing the news and card stacking (`publication-bias`), the
third-party technique and astroturfing (shipped as `self-applied-label` review
items), bandwagon (entry 6), and unstated assumption and loaded questions
(`misinformation-effect`).

**Eight genuine gaps survive, and they are entries 14 to 21 below.** Each one is
a named technique in the field's own taxonomy, absent from the registry and from
this backlog, and each has at least one candidate primary source that plausibly
reports counts. None has been read yet, so every citation below is a lead and
not a verified source: **nothing may be authored from this section until the
paper has been read and its table reconciled**, exactly as for entries 9 and 13.

### 14. Paltering, or misleading with true statements

<!-- skill: paltering -->

**Status: LEAD.** Deceiving by stating things that are individually true while
creating a false impression. It is the technique behind most defensible
political dishonesty, because nothing said can be shown to be a lie, and the
deck has nothing on it. Candidate: Rogers T, Zeckhauser R, Gino F, Norton MI,
Schweitzer ME. Artful paltering: the risks and rewards of using truthful
statements to mislead others. *Journal of Personality and Social Psychology*
2017;112(3):456-473. Reported to contain negotiation experiments, which usually
means counts of participants by condition. Verify against CrossRef first, then
find whether any table prints numerators.

### 15. The innuendo effect, or the headline shaped as a question

<!-- skill: innuendo-effect -->

**Status: READ AT SOURCE 2026-07-31, and it fails this deck's test.** Both
papers were supplied and read. The effect is real and it replicated: the 2024
study is two preregistered experiments, N = 506 total, and it reports that
questions insinuating something negative reduced favourable impressions,
replicating Wegner. It also found the effect did not differ between political
ingroup and outgroup targets, which is a genuinely useful symmetric result.

**But the outcome variable is a rating, not a count.** Impressions are measured
on three 11-point scales from 0 to 10 and reported as means. There is no
numerator and no denominator anywhere, so `rates` cannot hold it and the deck
would be authoring means. That is the exact ground on which this file warned
the third-person effect might fail, and here it has.

**DECIDED 2026-08-03: build it as a puzzle rather than review items. The shape
named in that decision was wrong, and the correction is below.**

The decision was taken on the premise that `estimation` already ships means for
`anchoring` and would need no engine change. **Checking the schema afterwards
showed that is false.** `EstimationData` requires a positive `trueValue` and a
`superRefine` that rejects any estimate not strictly below it, because the
anchoring lesson is specifically about two anchored guesses both undershooting a
checkable answer. The innuendo effect has no checkable answer: it is an
impression of a fictional candidate on an 11-point scale, and there is no true
value to undershoot. Using `estimation` would mean inventing one, which is
fabrication, and the shape's own comment three lines below already says it
cannot hold the neighbouring `salience` design for the same kind of reason.

**So this needs a new shape, which is what the project rule prescribes anyway:
build a new shape whenever the lesson needs one, never bend a lesson to fit an
existing shape.** The intended decision, that the innuendo effect ships as a
puzzle rather than as review items, stands unchanged; only the means of doing it
was wrong.

**NUMBERS EXTRACTED 2026-08-03, and they need one visual check before use.**
Table 1 of the replication gives descriptive statistics for Experiment 1,
N = 150, on a 0 to 10 impression scale, for the non-political target:

| Headline | Mean | SD |
|---|---|---|
| Neutral | 5.133 | 1.519 |
| Negation, the claim explicitly denied | 4.960 | 1.590 |
| Question, the claim merely asked | 4.798 | 1.688 |
| Assertion, the claim stated | 4.202 | 1.639 |

Table 2 covers Experiment 2, N = 356. **150 plus 356 is exactly the 506 the
abstract states**, which is an independent check on the reading of both tables.
Political-ingroup and outgroup targets are reported separately in the same
table and move together, which is the null the paper highlights.

Table 1 was read from extracted text, not from the rendered page, so it must be
re-read visually before anything is authored. Every table this project has
touched has been shifted by extraction at least once.

**AND THERE IS AN OPEN DESIGN QUESTION THAT THE HEDGE AUDIT MAKES UNAVOIDABLE.**
Two obvious puzzle shapes both have the flaw that audit was written to catch.

*Shape A, question against assertion.* Setup shows neutral and assertion, and
asks what merely asking did. The answer is 4.798, about a third of the way from
neutral to assertion. But the skill licenses only that a question moves the
needle, not how far, so bands reading "a third as much" and "as much as the
assertion" both point the same way and nothing chooses between them. That is
exactly the two-same-direction-bands failure.

*Shape B, question against denial.* Setup shows neutral and assertion, and asks
what a question and an explicit denial each did. The answer is that the question
harmed and the denial did not significantly differ from neutral. This is
directional rather than magnitude, which is better. But nothing in the setup
licenses predicting that a denial is harmless: a reader who knows that denials
repeat the proposition would reasonably predict both harm, and would be marked
wrong for reasoning well. That is the illusory-truth failure mode.

**DECIDED 2026-08-03 by project policy, not per puzzle.** The deck does not mark
a well-reasoning player wrong in order to land a surprise; the rule is now in
`CLAUDE.md`. So shape A is out unless its framing licenses the magnitude, and
shape B is out unless its framing licenses the denial being harmless.

For this puzzle the cleanest route is shape B with the hedge correct. A reader
who predicts that both a question and a denial do damage is reasoning well, and
under the new rule cannot be marked wrong for it, so the honest answer at the
commit beat is that the setup does not say. The reveal then delivers the real
finding, that the question harmed and the denial did not, which is a surprise
earned from the data rather than taken from the reader.

What the shape has to carry: two groups who read the same story about the same
person, one with the claim asserted and one with it merely asked as a question,
each reporting a mean rating on a bounded scale, with the scale bounds so a bar
can be drawn honestly and with no ground truth anywhere. The 2024 replication
adds a second axis, political ingroup against outgroup target, which came back
null and is the even-handed half of the finding; the shape should be able to
hold that or the puzzle should state it in prose.

Per the conventions, adding it means: a `PuzzleData` union member in
`schema.ts`, a pure derivation module in `engine/charts/` with its own test, a
renderer, a `DataViewRenderer` case plus `scopeLabel` entries for the new view
kinds, and a glyph in `share/ShareCard.tsx`. Existing puzzles stay untouched. The reveal compares two averages rather than two head counts, which is a
real weakening of the deck's usual standard and should be stated plainly in the
provenance note rather than glossed. The alternative was review items only, and
it was rejected because the innuendo effect is too central to propaganda to
leave out of the puzzle deck.

Note the consequence for `provenance`: this is the first puzzle whose headline
figure is not a count, so the note must say so, and the numbers-authored-once
rule still applies to whatever the shape does store.

**The options as they stood before that decision, and neither was free.** Either build it on the
`estimation` shape, which already ships means for `anchoring`, and accept that
the reveal compares two averages rather than two head counts; or leave it as
review items. The first is defensible and probably right, since the innuendo
effect is too important to drop, but it is a design decision rather than a
transcription, so it should be taken deliberately and not by whoever is next
in a hurry. A further wrinkle: the 2024 replication manipulates the target's
party, so building on it means naming parties, whereas Wegner's fictitious
city-council candidate is non-partisan by construction. If the modern study is
used, the puzzle should lean on its null for partisanship, which is the
even-handed half.

**Status when opened: LEAD, and the strongest of the eight.** A headline that merely asks
whether someone did something moves belief almost as much as one asserting it,
which is precisely why the question mark is used. Candidate: Wegner DM, Wenzlaff
R, Kerker RM, Beattie AE. Incrimination through innuendo: can media questions
become public answers? *Journal of Personality and Social Psychology*
1981;40(5):822-832, **DOI `10.1037/0022-3514.40.5.822`, verified against CrossRef 2026-07-31. OpenAlex reports it closed with no open-access location.** Fictional candidate, so non-partisan by construction, and
the design is a between-subjects rating task, which is the shape the deck's
`onewording` and `bothwordings` views already handle.

**A 2024 replication exists and was not known when this entry was opened.**
Letourneau SM, Gawronski B. Incrimination through innuendo. *Social
Psychology* 2024;55(1):51-61, DOI `10.1027/1864-9335/a000540`, verified
against CrossRef. Also closed. Whoever builds this should read **both** and
prefer the modern one for the puzzle's data if it prints counts, keeping the
1981 study for the framing, exactly as the conjunction fallacy lesson did with
Charness over Tversky and Kahneman. A 2024 paper in a journal with a strong
registered-replication tradition is also the fastest way to learn whether the
effect survived, which this deck must know before it teaches it.

### 16. The sleeper effect, or the source you stop remembering

<!-- skill: sleeper-effect -->

**Status: SHIPPED 2026-08-03** as `the-source-you-forget`, skill
`sleeper-effect`, on Hovland and Weiss (1951), `10.1086/266350`.

**The blocking shape was built for it.** `drift` holds signed movement from a
baseline, measured on the same people more than once: a union member in
`schema.ts`, `engine/charts/drift.ts` with its test, `DriftView.tsx`, a
`DataViewRenderer` case, the `atfirst` and `overtime` scope labels, and a
crossing-lines glyph in `ShareCard.tsx`. Existing puzzles are untouched. It is
reusable by anything measuring movement rather than level, and it is the right
shape on the merits rather than a workaround, since the lesson *is* that one
line falls while the other rises.

**One thing the build turned up that the research had not.** Adding the two
published tables as percentages gives the distrusted source 14.0 per cent at
four weeks; adding them as counts gives 13.9. The counts are what was measured,
so the file holds counts and derives everything, and a test exists purely so
nobody later corrects it back to 14.0. This is the project's authored-once rule
earning its keep on a real disagreement rather than a hypothetical one.

The Kumkale and Albarracin meta-analysis was supplied and read, and the caveat
it required is now the puzzle's deep dive: the effect is conditional on the
argument and the cue both landing hard, is stronger when the reader had the
ability and motivation to think, and is stronger when the discounting cue comes
*after* the message. Hovland and Weiss put the source first, which is the weaker
arrangement, so the study understates rather than overstates. Capon and
Hulbert's 1973 conclusion that the literature was too unreliable to pursue is
recorded there too.

The original research record follows.

**Sourcing status: LEAD.** A message from a source you knew to be unreliable becomes
*more* persuasive weeks later, because the claim outlives the memory of who made
it. This is the mechanism that makes discredited sources worth worrying about
even when everybody discounts them at the time, and it is the best available
answer to "what is the harm, nobody believes that outlet anyway". Candidate:
Hovland CI, Weiss W. The influence of source credibility on communication
effectiveness. *Public Opinion Quarterly* 1951;15(4):635-650, **DOI `10.1086/266350`, verified 2026-07-31, closed with no open-access location.** Old enough that
the counts are usually printed. A modern meta-analysis (Kumkale and Albarracin,
*Psychological Bulletin* 2004) should be checked too, because the effect is
known to be fragile and the deck must not overstate it.

**READ AT SOURCE 2026-08-03, and the numbers are fully verified. Blocked only on
a missing engine shape, which is a pure engineering job with no research left in
it.** Tables 3 and 6 were read off the rendered pages 643 and 645, because
`pdftotext` scrambles both, putting the Ns and the values on the wrong rows.

Table 3, net percentage of subjects who moved toward the message, immediately
after hearing it. Table 6, the further net change between then and four weeks
later. 223 subjects took part, 122 per column survive into these analyses.

| Topic | High credibility | N | Low credibility | N |
|---|---|---|---|---|
| Anti-histamines | 22.6 / -6.5 | 31 | 13.3 / +6.7 | 30 |
| Atomic submarines | 36.0 / -16.0 | 25 | 0.0 / +13.9 | 36 |
| Steel shortage | 22.9 / -11.4 | 35 | -3.8 / +15.4 | 26 |
| Future of movies | 12.9 / -9.7 | 31 | 16.7 / -6.7 | 30 |
| **Average** | **23.0 / -10.7** | 122 | **6.6 / +7.4** | 122 |

**The reconciliation is as strong as any in the deck.** All sixteen cells recover
exact whole numbers of people against their printed Ns. The four column averages
then recover from those counts: 7+9+8+4 = 28 of 122 is 23.0 per cent, 4+0-1+5 = 8
is 6.6, -2-4-4-3 = -13 is -10.7, and 2+5+4-2 = 9 is 7.4. And all five printed
differences in Table 6's third column reproduce exactly. Nothing was fitted.

**The finding, which is a genuine reversal.** Adding the two tables gives the
change from before the message to four weeks after: the high credibility source
goes 23.0 down to **12.3**, and the low credibility source 6.6 up to **14.0**. The
discredited source ends up ahead of the trusted one. The paper draws exactly this
comparison as its Figure 2. That is a perfect setup and reveal: show the
immediate result, where credibility obviously matters, then show the same people
four weeks later.

**What blocks it is the shape, and the block is real rather than a preference.**
These are *net* changes, positive changers minus negative changers, and the paper
never prints the two components. So the numbers are differences, not proportions,
and five of the sixteen cells are negative. `rates` cannot hold them:
`Observation.numerator` is `z.number().int().nonnegative()`, and a bar running
from zero to a share would misdescribe the quantity even where it is positive.

So this needs a **signed change shape**, diverging bars around a zero line, which
is the six-file job the conventions describe: a `PuzzleData` union member, a pure
derivation module in `engine/charts/` with a test, a renderer, a
`DataViewRenderer` case, `scopeLabel` entries, and a `ShareCard` glyph. It is
also the right shape on the merits rather than a workaround, because the lesson
*is* that one line falls while the other rises, and a diverging chart says that
in one look.

Note this is a different shape from the mean-with-dispersion one entries 12 and
20 wanted, so it does not unblock those. Still worth doing: a signed change chart
is reusable by anything measuring movement rather than level.

Before authoring, the Kumkale and Albarracin (2004) meta-analysis still needs
reading, because the effect is known to be fragile and the provenance note must
say so. That is the only research left; everything else here is verified.

### 17. False balance, and the deck's own founding principle

<!-- skill: false-balance -->

**Status: SHIPPED 2026-08-03** as `both-sides-of-what`, slug `both-sides-of-what`,
skill `false-balance`. Both papers were read at source and reconciled before a
word was authored. The record below is kept in full because it documents two
blocking questions and how each was resolved, and because the second of them
changed the shape of the puzzle.

**One design note worth carrying forward.** The commit question asks which of two
press treatments was more common, not what share was balanced. The share version
is a magnitude guess, and every band except "almost none" would have shared the
direction the skill licenses, which is exactly the failure `docs/hedge-audit.md`
exists to catch. A two-way comparison is answerable from the framing plus the
skill, and 52.65 per cent still lands as a surprise at the reveal.

The original research record follows.

**Sourcing status: VERIFIED 2026-08-03.** The PDF was supplied and read.

**The counts are there, and the reconciliation is unusually strong.** The figure
1 caption on page 129 reports the split of prestige-press articles on whether
humans contribute to global warming, and states **n = 340**. That is the subset
about anthropogenic contribution, *not* the 636-article full sample, and reading
the percentages against 636 is the obvious mistake to make here: 52.65 per cent
of 636 is 334.85, which recovers nothing. Against 340 all four printed
percentages recover exact whole numbers and the four counts sum to exactly 340:

| Coverage of anthropogenic contribution | Count | Printed |
|---|---|---|
| Balanced, both sides given roughly equal weight | 179/340 | 52.65 |
| Dominant anthropogenic | 120/340 | 35.29 |
| Dominant sceptic | 21/340 | 6.18 |
| Exclusive anthropogenic | 20/340 | 5.88 |

Four independent percentages each landing on an integer, summing to the stated
n, is about as strong as a transcription check gets.

**Other figures available.** The full sample is 636 articles, 18.4 per cent of
the population, drawn by selecting every sixth article from a random start in
January 1988, across 1988 to 2002. Composition: about 41 per cent New York
Times, 29 per cent Washington Post, 25 per cent Los Angeles Times, 5 per cent
Wall Street Journal. Intercoder reliability on the pre-test sample was 93 per
cent. Table 2 gives year-by-year difference tests against the scientific
discourse.

**DECIDED 2026-08-03: build it, format-focused, and name the newspapers as the
study does.** Anonymising a published content analysis would itself be a small
dishonesty, and the deck cites its sources in full everywhere else. The
constraint is on what the lesson *says*, not on what it omits: the puzzle is
about the balance norm producing distortion, and it must never adjudicate the
science or read as an attack on a masthead. If a draft cannot hold that line it
does not ship.

**BOTH BUILD QUESTIONS RESOLVED 2026-08-03, and the answer is that this paper
alone does not make a Confoundle puzzle.**

*The scientific side is not counts.* The methods on page 128 say the views of
the scientific community were defined by drawing primarily on IPCC reports and
assessments, and Table 2 tests the press against that discourse year by year.
There is no numerator and denominator for the science anywhere in the paper. So
the two-views-of-one-dataset shape has nothing to put opposite the press.

*And the press distribution alone will not carry a commit beat.* The four
categories exhaust the 340 articles. Show the three that took a position, which
is 20 plus 120 plus 21, or 161, and the fourth is 340 minus 161. **The answer is
pure subtraction the moment the framing states the total**, and withholding the
total to prevent that would be withholding the denominator, which this project
does not do. Any question that survives is a question about what the balanced
category *means*, which is a definition and not a prediction.

**So the build needs a second source for the science, and there is an obvious
one.** Oreskes' 2004 analysis in *Science* of 928 peer-reviewed abstracts, in
which none rejected the consensus position, is a count with a denominator and
covers an overlapping period. Press against literature is then a real two-views
comparison and the reveal is the gap between them. That paper has not been read
by this project and must be before anything is authored: check that the 928 is a
denominator rather than a screening total, and that the zero is what it is
usually quoted as.

**ORESKES READ AND VERIFIED 2026-08-03. The block is lifted and this is ready to
author.** Oreskes N, "The scientific consensus on climate change", *Science*
2004;306(5702):1686, `10.1126/science.1103618`. Both checks pass.

*928 is the analysed denominator, not a screening total.* The paper states that
"the 928 papers were divided into six categories", one of which is rejection of
the consensus position. A screening yield does not get divided into outcome
categories. Sample is ISI abstracts on the keyword "climate change", 1993 to
2003, with note 9 explaining the 1993 start as the first year the database
carried abstracts consistently, and noting that some hits were dropped because
the paper was not about climate change. That is the screening step, and it
happened before the 928.

*And the zero is what it is quoted as.* "Remarkably, none of the papers disagreed
with the consensus position." The split reconciles exactly, which is the same
class of check that validated the Boykoff table:

| Position in the literature | Count | Printed |
|---|---|---|
| Accepting the consensus, explicitly or implicitly | 696/928 | 75 |
| Methods or paleoclimate, taking no position | 232/928 | 25 |
| Rejecting the consensus | 0/928 | none |

Both percentages land on exact integers and the three counts sum to 928.

One disclosure the puzzle must carry: **the two windows differ.** Boykoff runs
1988 to 2002 and Oreskes 1993 to 2003. They overlap for ten years but they are
not the same period, and the provenance note must say so rather than implying a
single dataset cut two ways.

**Two things for whoever builds it.**

First, the puzzle needs the *other* half of the comparison to work as this deck's
two-views-of-one-dataset shape: the press split against the scientific split.
Table 2 tests press against scientific discourse by year, so check whether the
paper prints the scientific side as counts anywhere, or whether that half has to
come from a second source. If it does not, the honest shape may be the press
distribution alone, with the consensus stated in the framing rather than drawn.

Second, and this needs deciding before a word is authored: **this is the deck's
most politically live subject so far.** The finding is about journalistic
practice rather than about a party, which is what makes it publishable here at
all, but the four newspapers are named and still trading, and climate coverage
is a live partisan issue in several of the deck's ten locales. The lesson must
be about the format producing the distortion, and must not read as an
accusation against a newspaper or a side. If it cannot be written that way it
should not be written: see the Boykoff ground, which this project named after
exactly this paper and which would be an embarrassing rule to break here.

**Status when opened: LEAD, and overdue.** Giving two sides equal airtime when the evidence
is not equally divided, so that the *format* of the coverage misinforms even
when every sentence is accurate. This project already invokes the idea by name
in its own editorial rule, the Boykoff ground, and has no puzzle on it, which is
an awkward gap to leave. Candidate: Boykoff MT, Boykoff JM. Balance as bias:
global warming and the US prestige press. *Global Environmental Change*
2004;14(2):125-136, **DOI `10.1016/j.gloenvcha.2003.10.001`, verified 2026-07-31, closed with no open-access location.** A content analysis, so it counts articles, which is exactly
the shape `rates` wants: share of articles giving balanced treatment against the
share of the scientific literature doing the same. Check whether the paper
prints article counts or only percentages before committing.

### 18. Metaphor framing, or the word that picks the policy

<!-- skill: metaphor-framing -->

**Status: SHIPPED 2026-07-31** as `one-word-in-the-report`, and the source was
open access as predicted, so it was verified and authored the same day. Read
from Table 1 on page 5, rendered as an image. Built on **Experiments 2 and 3,
not the famous Experiment 1**, for a reason worth recording: Experiment 1's
counts are printed as 126.5 and 97.5, because responses offering suggestions on
both sides were split across categories, and half a person is not an
observation. Experiments 2 and 3 are whole counts and are also the better
comparison, because Experiment 3 is the authors' own null control. With the bare
word primed beforehand and absent from the report, 75/118 against 66/102 chose
enforcement, which is nothing; with one word inside the report, 80/113 against
72/133, a seventeen point gap. Three anchors from Experiment 1 confirm the
reading of the table: 170/231, 126.5/224 and the pooled 296.5/455 reproduce the
printed 74, 56 and 65 per cent. Two things recorded rather than smoothed: the
Experiment 2 conditions hold 246 coded responses against the 253 the paper says
were analysed, seven short and unexplained, and the replication record for this
effect is mixed and has not been read, so the puzzle claims only what this paper
measured.

The original entry follows.

**Status when opened: LEAD.** Describing crime as a virus rather than a beast shifts which
remedy people prefer, without changing a single statistic in the passage. This
is distinct from `framing-effect`, which is about gain and loss wording; here
the numbers are identical and only the metaphor moves. Candidate: Thibodeau PH,
Boroditsky L. Metaphors we think with: the role of metaphor in reasoning. *PLoS
ONE* 2011;6(2):e16782. **Open access**, so it is reachable without a request,
which makes it the cheapest of the eight to verify.

### 19. Foot in the door, and door in the face

<!-- skill: compliance-sequencing -->

**Status: SHIPPED 2026-07-31** as `the-small-favour-first`. Cialdini was read
too and became the deep dive rather than a second puzzle: his Table 1 on page
209 notes n = 24 per condition, giving 12, 6 and 4 of 24 for rejection-
moderation, exposure control and smaller-request-only, and the paper states
that no subject ever agreed to the initial extreme request. Putting the two
techniques in one lesson is the point: they give opposite advice about the
size of the first request and both work, so a reader cannot defend themselves
with a rule of thumb.

**Status when verified: VERIFIED 2026-07-31, ready to author, and the
best-shaped candidate left in this file.** Freedman and Fraser was supplied and read, and Table 1 on
page 197 was read from the rendered page because the extraction misaligns the
condition labels against their percentages.

Percentage of subjects complying with the large request, **N = 36 in each
group**, so every printed percentage converts to an exact integer count:

| Condition | Count | Printed |
|---|---|---|
| Performance, carried out the small request | 19/36 | 52.8 |
| Agree-Only, agreed but never had to do it | 12/36 | 33.3 |
| Familiarization, same call, no request | 10/36 | 27.8 |
| One-Contact, no prior contact | 8/36 | 22.2 |

**Reconciles three ways.** All four percentages reproduce from a whole number
out of 36 and none needs rounding to do it. Four groups of 36 is 144, and the
methods state 156 housewives with 12 extra distributed among the two-contact
conditions who could not be reached for the second call and were excluded, so
144 plus 12 is exactly 156. And the two starred rows carry the significance
levels against Performance that the effect requires, p below .07 and .02.

**The two control conditions are what make it a puzzle rather than a fact.**
Familiarization holds constant the time on the phone with the same person and
produces almost nothing, so the effect is not rapport. Agree-Only shows that
agreeing is worth less than actually doing it. The setup should show
One-Contact alone and ask what happened to people who three days earlier had
answered eight harmless questions about household soap, and the reveal should
put all four side by side.

The Cialdini door-in-the-face paper was supplied too and has not yet been read.
Whether it belongs in the same puzzle or a second one is open.

**Status when opened: LEAD.** Two opposite sequencing tricks that both raise compliance: ask
for something tiny first and the large request succeeds, or ask for something
outrageous first and the moderate one succeeds. Both are staples of fundraising,
sales and negotiation, and the pair together makes a better lesson than either
alone because the reader cannot fall back on a single rule of thumb. Candidates:
Freedman JL, Fraser SC. Compliance without pressure: the foot-in-the-door
technique. *JPSP* 1966;4(2):195-202; and Cialdini RB et al. Reciprocal
concessions procedure for inducing compliance: the door-in-the-face technique.
*JPSP* 1975;31(2):206-215. **Both DOIs verified 2026-07-31, `10.1037/h0023552` and `10.1037/h0076284`, and both are closed with no open-access location.** Both report compliance rates, which are counts.

### 20. The third-person effect

<!-- skill: third-person-effect -->

**Status: LEAD, and the most self-implicating lesson in the queue.** People
consistently judge propaganda to affect other people more than themselves, and
that belief is itself what makes them vulnerable and what drives support for
censoring others. For a deck whose entire premise is that the reader can be
fooled, this is close to the thesis statement. Candidate: Davison WP. The
third-person effect in communication. *Public Opinion Quarterly*
1983;47(1):1-15, plus the Sun, Pan and Shen meta-analysis (*Journal of
Communication* 2008) for magnitude.

**Davison read 2026-08-03, and it does not carry counts.** The headline results
are means on a 0 to 7 influence scale: 3.4 for the effect on others against 2.26
for the effect on self. Table 1, the one place a distribution is printed, gives
percentages only, in two columns that each sum to 100. No sample size is printed
next to it, and the extracted layout drops a row, which is the usual
`pdftotext` shift and means the table still needs a visual read before anything
is concluded from it. Even if an N turns up there, deriving counts from five
rounded percentages and one denominator is the move this project refused for
Johnson and Seifert in entry 12, and it would be refused here for the same
reason.

So this stays **LEAD, blocked on counts**, and the meta-analysis is unlikely to
rescue it, since meta-analyses report effect sizes by construction. The realistic
routes are a primary study in the paradigm that reports a headcount, or the same
mean-with-dispersion shape entry 12 needs. If that shape gets built for Ecker, it
unblocks this entry too, which is an argument for building it once and well.

**Two more papers read at source 2026-08-03, and both fail. Entry 20 is now
blocked with three refusals behind it.** The route tried was the one that
rescued entry 12: find a study whose outcome is a headcount rather than a mean.
The third-person literature does report headcounts, but never with a printed
denominator, and unlike Kassin and Sommers there is nothing to cross-check a
reconstruction against.

- **Gunther (1995)**, `10.1111/j.1460-2466.1995.tb00712.x`. Reports that 61 per
  cent of respondents perceived others as more negatively influenced, 19 per cent
  no difference, 20 per cent themselves more. The denominator for that split is
  never stated. Table 1 gives Ns of 550, 525 and 492 for three different
  measures, plus subgroup Ns. Taking the most likely, 492, **sixteen count
  triples round to 61/19/20**. There is no chi-square or other printed statistic
  computed from those counts, so nothing would confirm a choice.
- **Rojas, Shah and Faber (1996)**, `10.1093/ijpor/8.2.163`. Better on the face
  of it, because the percentages carry a decimal: 84.7 and 3.8 for mass media,
  71.7 and 7.1 for pornography, 82.2 and 3.1 for television violence. Sample is
  133 students. Searching 110 to 133, mass media gives exactly one solution
  (N = 131, split 111/5/15) and television violence exactly one (N = 129, split
  106/4/19), and both of those Ns appear among the Table 2 degrees of freedom
  plus one, which looked briefly like independent confirmation. **Pornography
  kills it.** It gives two solutions, N = 113 and N = 127, and neither matches its
  printed df of 128. So the two apparent matches were coincidence: several values
  in that narrow range happen to equal some printed df plus one. Note also that
  Table 2 is shifted by `pdftotext`, which put the degrees of freedom on the
  wrong rows; the correct assignment was read off the rendered page 175 and is
  mass media 132 and 130, pornography 128 and 128, television violence 130 and
  128.

The standard being applied is the one set by entry 12's resolution: a
reconstruction ships when it is unique **and** reproduces a printed quantity that
was not used to derive it. Kassin and Sommers cleared that twice over, with both
chi-squares landing to the second decimal. Neither of these clears it once.

### 21. Quoting out of context

<!-- skill: quote-mining -->

**Status: LEAD, and the weakest source position of the eight.** Selective
quotation that reverses a speaker's meaning while every quoted word is genuine.
Obviously real and obviously important; the difficulty is that the experimental
literature is thin and the vivid cases are all partisan. Search for work on
selective quotation in science communication or in court reporting, where the
original text is fixed and public so a count of reversed meanings is possible.
If nothing with counts turns up, ship this as review items under
`self-applied-label` or `publication-bias` rather than forcing a puzzle, the
same judgement made for Neyman bias.

---

## What this document does not contain

The six medical trial-appraisal gaps: power and type I/II error, allocation
concealment, sponsorship and conflict of interest, the cognitive category,
Neyman bias, and the Hawthorne effect. Those had their own plan in
[`plan-syllabus-gaps.md`](./plan-syllabus-gaps.md), and **all six closed on
2026-07-30**: five shipped as puzzles and Neyman was judged covered by
length-time and survivorship and shipped as review items instead. That plan file
is now a record rather than a worklist, and **this file is the queue**.

Which changes what outranks what. Until 2026-07-30 the honest summary was that
this backlog is broad and the medical plan is deep, and the deck was better
served by finishing the deep one first. The deep one is finished. The strongest
remaining candidate here is entry 3, multiplicity, which the deck has nothing on
at all.
