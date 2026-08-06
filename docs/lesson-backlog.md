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

**Status: SHIPPED 2026-08-04** as `which-map-lies`, skill
`projection-distortion`, on the new `projection` shape, but NOT on the premise
recorded below, which stays refuted. Read this entry as a record of two
findings: the original lesson is dead, and a better one was underneath it.

**What shipped.** Battersby SE, Kessler FC, "Cues for interpreting distortion in
map projections", Journal of Geography 2012;111(3):93-101. Thirty-one
undergraduates with no projection training were shown six world projections and
asked, for each, whether it distorted area. Two of the six are equal-area
projections and are exactly right about size. Those two were accused at 39 per
cent (Gall-Peters) and 71 per cent (Goode). The projection accused least, at 10
per cent, was Robinson, which really does distort area and which had been the
National Geographic Society's standard world map for twenty-five years. People
judge a map by whether it looks like the maps they know.

**Provenance notes worth keeping.** Five of the six figures are printed twice,
in Table 1 and again in the prose about that projection, and agree both times.
Eisenlohr is the sixth and is excluded: Table 1 says 55 per cent, the prose says
58. The study's second group of 42 trained participants is excluded entirely,
because its Mercator figure of 91 per cent is not reachable by any whole number
of 42 people. The shares are authored as published rather than converted to
counts: each does pin a unique number out of 31, but nothing else printed
confirms those counts.

**The maps are computed, not copied.** Robinson and Gall-Peters outlines were
generated from Natural Earth 110m coastlines, which are public domain with no
attribution required, by applying each projection's published formula. The test
proves from that arithmetic that Gall-Peters is area-exact at every latitude and
that Robinson draws a ten-degree cell at 70 north about twice the size, relative
to its ground, as one at the equator. Nothing from the paper's figures or from
any copyrighted map is reproduced.

**The original premise below remains refuted** and must not be revived: the
Greenland-against-Africa story is a fact about Mercator maps, not a measured
fact about what people believe, and Battersby and Montello (2009) is the
measurement that says so. What shipped is the opposite lesson, that people
mistake the honest maps for the dishonest ones.

---

**Status when opened: BLOCKED on shape. Then REFUTED AT SOURCE 2026-08-04.** The
lesson as written asserts a misconception that the best available measurement of
that misconception says people do not have.

AP Human Geography makes this **required content**, IMP-1.A.3, quoted verbatim:

> All maps are selective in information; map projections inevitably distort
> spatial relationships in shape, area, distance, and direction.

The deck has `misleading-axis` for charts and nothing at all for maps, even
though a map is the chart form most people meet in an argument. Greenland
against Africa on a Mercator projection is the canonical demonstration: Africa is
roughly fourteen times the area, and on Mercator they look comparable.

The old block was "this needs a genuinely new shape (`projection` or `area`)",
and the audit below narrowed it to a sourcing task: find a source measuring
**what people believe** the relative areas to be, and the puzzle then measures a
misconception instead of asserting one. That source was found, and read at
source, and it says the opposite of what this entry assumes.

**The source.** Battersby SE, Montello DR. Area estimation of world regions and
the projection of the global-scale cognitive map. Annals of the Association of
American Geographers 2009;99(2):273-291, doi 10.1080/00045600802683734, author
copy at `people.geog.ucsb.edu/~montello/pubs/area_estim.pdf`. Two studies: 194
students estimating the area of twenty-six world regions from memory as a number
relative to the lower 48 states set at 1,000, then 33 students doing the same
task with a graphical slider. There is no third study. Both are memory tasks;
neither shows anybody a map.

**Every number in it reconciles.** Table 1 prints each region's area in square
kilometres and its "modulus area" relative to the conterminous United States at
1,000. Tables 3 and 5 print the same modulus to one decimal place, in separately
typeset columns. All twenty-six recompute exactly from the printed areas against
the printed 7,809,158 square kilometres of the conterminous United States, and
match both the integer column and the one-decimal column, with no exceptions.

**What it found, in the authors' own words in the abstract:** nonequal area
projections, particularly the Mercator projection, were found not to have much
if any influence on the shape of participants' cognitive maps, and the estimation
pattern most clearly reflected standard trends in psychophysical estimation.

**The numbers say it plainly.** Greenland is the region this entry was going to
be built on. Participants put it at 520 against a true 271, so 1.9 times its real
size. Fifteen of the twenty-six regions were overestimated by more than that, and
the head of that list is not high latitude at all: Switzerland by 27 times,
Denmark by 26, Austria by 15, North Korea by 11. Across the twenty-six regions
the correlation between how wrong the mean estimate was and how big the region
really is comes to -0.94 on logs, while the correlation with mean absolute
latitude is +0.19, sitting alongside the paper's own within-participant figure of
0.17. The error is a size effect, not a latitude effect.

**So this entry cannot be built as written.** The Greenland-against-Africa story
is a true fact about Mercator maps and an unevidenced one about the people
looking at them. Shipping it as a measured misconception would be asserting
something the only measurement contradicts, which is the failure mode this deck
exists to teach.

**What the same data do support is a different and better lesson**, filed below
as entry 22.

**What would revive this entry** is a study measuring area judgements made
**while looking at a Mercator map**, which is a different task from either study
here and is where the authors themselves say a projection effect should show up.
Battersby's separate paper, "The effect of global-scale map-projection knowledge
on perceived land area", is the obvious first place to look and was not read in
this pass. The provenance question recorded earlier is unchanged and untested:
geodetic constants are an authority rather than a finding. Note that the study
above sidesteps it entirely, since it prints the true areas it scored people
against, so the provenance is the study.

### 5. A lead that is not a lead

<!-- skill: margin-of-error -->

**Status: SHIPPED 2026-08-04** as `a-lead-that-is-not-a-lead`, on the new
`interval` shape, taking option 2 below. The record of the sourcing is kept
because it is also the record of why the puzzle asks for a width rather than a
verdict, which is the only interesting decision in it.

**The source.** Marist Poll of 1,128 National Adults, interviews conducted 3 to
4 February 2025, released as the Super Bowl LIX survey. Methodology page read at
source: adults 18 and over contacted through online web surveys, sampling frame
of aggregated non-probability online research panels drawn from Cint, balanced
to the 2022 American Community Survey five-year estimates for age, gender,
income, race and region. **Margin of error for all adults (n=1,128) is +/-2.9
percentage points; for registered voters (n=1,011) it is +/-3.1.** Non-political,
which was the preference.

`https://maristpoll.marist.edu/polls/the-super-bowl-february-2025/`

**The published margin has no design effect in it, and that is checkable.**
1.96 x 0.5 / sqrt(1128) = 2.918, which rounds to the printed 2.9; and
1.96 x 0.5 / sqrt(1011) = 3.082, which rounds to the printed 3.1. Both printed
margins reproduce exactly from the simple binomial formula, so the deff is 1.0.
This matters: the December 2025 Marist holiday poll needed a deff of 1.49 to
reproduce its printed margins, and assuming the wrong one moves every number
below.

**The question to use, read off table SBREF1.** "Do you think the referees will
have:" National Adults answer **A major impact 42 per cent, A minor impact 37
per cent, No impact at all 21 per cent, No opinion under 1 per cent.** A
five-point lead against a printed margin of +/-2.9, which is exactly the shape
of a headline that says a result is "outside the margin of error".

**The arithmetic, which is the lesson.** For two shares of ONE sample,
Var(p1 - p2) = [p1 + p2 - (p1 - p2)^2] / n, because the two shares are
negatively correlated. Here [0.42 + 0.37 - 0.0025] / 1128 gives a standard error
of 0.02642 and a 95 per cent margin on the gap of **5.18 points**, against 2.9
on either share alone. The ratio is 1.95, not the square root of 2: **root two is
the answer for two independent samples, and is the sophisticated wrong answer
this puzzle exists to catch.**

**Where the obvious design fails, and it fails by 0.18 points.** The printed
gap of 5.0 is smaller than the 5.18 margin, so the lead does not clear its own
ruler. But the shares are printed as integers, so the true gap lies anywhere in
(4.0, 6.0), and at the top of that interval the verdict flips. A puzzle whose
correct answer is "the lead is not significant" would therefore be resting on
rounding, which this project does not ship.

**Two ways out, and the second is better.**

1. Use the registered-voter row of the same table, 42 / 38 / 20 on n=1,011 with
   a printed margin of +/-3.1. The gap is 4.0 and the margin on the gap is 5.51,
   and the conclusion holds across the whole rounding interval: even at a true
   gap of 4.99 the margin is 5.50. Robust, but reporting a football question on
   registered voters is a strange base that would need explaining, and the
   explanation costs more than it buys.

2. **Move the question off the verdict and onto the ruler**, which is where the
   lesson actually lives. Do not ask whether the lead is significant. Ask what
   the margin on the LEAD is, given a margin of +/-2.9 on each share. Bands: the
   same 2.9; about 4.1, which is root two times wider; about 5.2, which is about
   twice as wide and is correct; and narrower than either. Every band is a
   magnitude, the framing states that the question is about the width, and the
   correct answer is a fact about the published figures that no rounding can
   move. The verdict then belongs in the reveal, stated honestly: 5.0 against
   5.18 does not clear it, and the fact that integer rounding puts the printed
   figures within a fifth of a point of the boundary is itself worth saying.

**What it needs to ship.** A shape that can draw a share with an interval around
it, and then draw the gap with ITS interval, which is the same data seen twice
and is exactly the setup-and-reveal structure the deck is built on. No existing
shape has an error bar at all. Nearest neighbours are `estimation`, which holds
guesses against a truth, and `risk`, which splits one risk two ways; neither
carries an interval. Call it `interval`, with view kinds `oneshare` and
`thegap`.

**One honesty note that must reach the puzzle.** This is a non-probability
online panel balanced to census benchmarks, so its "margin of error" is a
modelled quantity rather than a sampling margin in the textbook sense. The
lesson is about the arithmetic relating two margins, which is unaffected, but
the puzzle must not imply the panel is a random sample. Say what Marist says.

---

**Status when opened: BLOCKED ON A POLL WITH THE RIGHT GAP.** Searched hard on
2026-08-04 and not found. The old wording, "BLOCKED on a source with counts", was
both overstated and vague; what follows is a search order rather than a shrug.

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

**The arithmetic is settled and needs no source.** For two shares of one sample,
the errors are negatively correlated, because a respondent who moves from A to B
moves the gap by two. The variance of the gap is `(p1 + p2 - (p1 - p2)^2) / n`,
so for two shares near half the margin on the gap is very close to **twice** the
published margin, not the same as it and not the 1.41 times that two independent
samples would give. Charles Franklin's note for ABC News, "The margin of error
for differences in polls", states the doubling directly, and the Pew explainer
"Understanding the margin of error in election polls" says the same in prose.
Those pin the method. What is missing is data.

**What the puzzle needs, exactly.** All five at once, and the fifth is the one
that keeps failing:

1. Two answer options from a **single** published sample, so the doubling
   applies rather than the square-root-of-two.
2. The **denominator those two percentages are shares of**, printed, not a
   subgroup whose size is left to be reconstructed.
3. A **published margin of error**, and ideally a **published design effect**, so
   the margin can be reproduced rather than taken on trust.
4. Non-political ground, or a topic with no living partisans.
5. A gap **strictly between one and about two times the published margin**. Below
   one and the naive reading already says "too close", so there is no trap and
   the commit beat is a giveaway. At or above two and the poll really does
   establish the lead, so the reveal would be false.

**What was checked, and how each one failed.**

- **Marist** is the best source class found, and the reason is condition 3: the
  methodology page prints the design effect, so the published margin reproduces
  exactly. The hot dog poll of July 2025 (n=1,542, design effect 1.19, printed
  margin 2.7) recomputes to 2.72, and the June 2026 NPR/PBS poll (n=1,340,
  design effect 1.29, printed 3.0 for adults and 3.3 for registered voters)
  recomputes to 3.04 and 3.26. Two independent checks each. But no full-sample
  non-political question found in these packets lands in the window: the hot dog
  question is 62 to 38, the NYC baseball question 38 to 24, the summer travel
  question 26 to 23 against a margin of 3.0. The one that does land, 48 to 43
  on kinds of holiday, is asked of the subset taking a holiday, whose size is
  never printed. Reconstructing it as 55 per cent of 1,340 gives a range from
  731 to 744 rather than a unique integer, so it fails the reconstruction
  standard and condition 2.
- **YouGov's July 2026 head-to-head sports poll** (n=1,099, margin given as
  "approximately 4.0%") is a full round robin of five sports, which is the right
  shape and perfectly non-political. It fails condition 2: the shares are
  reported "among Americans with a preference", and the number who skipped each
  pair is never printed, so the denominator of every matchup is unknown. It also
  fails condition 5 twice over. Baseball against basketball is 48 to 52, a gap
  of 4 against a margin of 4, which is below the window. Soccer against hockey
  is 54 to 46, and the gap of 8 against a doubled margin of 7.97 sits on the
  knife edge, where whole-number rounding of the shares could move it either
  way.
- **Seton Hall Sports Poll** is entirely non-political and asks many two-option
  questions, but publishes no design effect. Its reported 3.0 points for
  n=1,506 against the 2.5 that simple random sampling gives implies a weighting
  adjustment it does not itemise, so condition 3 is half met at best.
- **Marist's Super Bowl poll of February 2025** has a question that does land in
  the window, on whether referees would affect the outcome, 42 against 37 with a
  printed margin of 2.9 and a doubled margin of 5.15. A gap of 5 against 5.15 is
  another knife edge, and that packet is a non-probability online panel with no
  design effect printed.
- **Rasmussen's "Americans prefer Coke over Pepsi"** is the ideal headline, a
  published claim of a lead on the least political ground imaginable, but the
  free page carries only the favourability numbers and never the head-to-head.

**Where to look next.** The window is widest for a near-even binary, so the
target is a two-option question splitting about 53 to 47 against a margin near 4,
or 48 to 44 against a margin near 3. The most likely homes are a Marist branded
lifestyle packet, since Marist prints the design effect, or any pollster that
publishes both a topline denominator and a design effect. A survey that publishes
raw **counts** would be better still, because then both margins are derived from
the counts in the deck's usual way and nothing rests on a published margin at
all.

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

## Audit, 2026-08-04: which blocks are real and which have expired

Three entries in a row shipped this week after their recorded blocker turned out
to be stale rather than true. Whataboutism was blocked because "means on a
reasonableness scale are not counts"; the Overton window because "whether it
reports counts rather than scale means is unknown"; both objections predate the
`ratings` shape, which was built for the third-person effect and carries exactly
that. Rather than discover the same thing a fourth time by accident, every
remaining block was re-read against the shapes the deck actually has today.

The shape inventory now stands at: `rates`, `frequencies`, `causal`,
`survivorship`, `timeline`, `risk`, `agreement`, `regression`, `interaction`,
`effect`, `ecological`, `framing`, `distribution`, `dose`, `estimation`,
`salience`, `drift`, `ratings`, `bunching`.

**The pattern, stated once so it is not rediscovered.** Shape objections age
badly, because the deck grows shapes. Partisanship objections and
duplicate-skill objections do not age at all, because neither the world nor the
registry gets more permissive. When an entry is blocked, check which kind of
block it is before believing it.

### Ecker read at source 2026-08-04. SOURCED, and one design question stands in the way

Following the audit above, the paper the block named was read in full:
**Ecker UKH, Lewandowsky S, Tang DTW. Explicit warnings reduce but do not
eliminate the continued influence of misinformation.** *Memory and Cognition*
2010;38(8):1087-1100, DOI `10.3758/MC.38.8.1087`. The PDF is on Basile's Desktop
as `mc.38.8.1087.pdf`.

**Everything needed to author is now extracted.** Experiment 1, five
between-subjects conditions, **25 participants each**, all reading the same story
about a minibus crash initially blamed on its elderly passengers. The dependent
measure is the mean number of references to the retracted material, **maximum
20**, one possible inference per item. Figure 1, page 1091:

| Condition | Mean references |
|---|---|
| No retraction | **5.06** |
| Retraction only | **4.04** |
| General warning | **3.36** |
| Specific warning | **2.12** |
| Alternative explanation | **2.22** |

The reading checks out on degrees of freedom. Five conditions of 25 is 125, and
125 minus 5 is the 120 in the paper's `F(1,120)`. The restricted reanalysis
removes 32 participants who scored zero on the manipulation check, and 125 minus
32 minus 5 is the 88 in `F(1,88)`. The four bars carrying a retraction also print
their restricted subsample sizes: **19, 17, 20 and 18**.

**The lesson is genuinely not the one already shipped.** Table 1 shows a mere
retraction does not significantly reduce reliance (C2, p = .13). A **general**
warning that facts are not always checked does little on the full sample (C3,
p = .32). A **specific** warning explaining the continued influence effect works,
and works about as well as supplying an alternative explanation, which was
previously the only thing known to work. Experiment 2 then combines both and
still cannot eliminate it: 1.04 references against a no-retraction 4.64,
significantly above zero at `t(41) = 3.78, p < .001`. So the lesson is that
**forewarning helps and is not enough**, which is prebunking rather than
continued influence, and is not in the registry. It is also uncomfortably
reflexive for a deck whose whole premise is that being told about a trap helps.

**The one thing blocking a build, and it needs deciding rather than guessing.**
The measure runs 0 to 20 and every condition falls between 2.12 and 5.06. On an
honest `ratings` axis from 0 to 20 the five markers occupy the band from 10.6 to
25.3 per cent of the width, all bunched at the left, and the reveal would look
flat even though the effect is real and ordered. The paper's own Figure 1 solves
this by drawing an axis from 0 to 6, which is a normal choice for a journal
figure and is also exactly the move `misleading-axis` exists to warn readers
about, so this deck cannot copy it without saying so. Three options, none
obviously right:

1. Draw the true 0 to 20 scale and accept a cramped figure, on the argument that
   "a few references out of twenty possible" is itself part of the finding.
2. Add an optional zoom to `ratings` that names the truncation on the figure, so
   the reader is told the axis does not start where the scale does. That is new
   engine work and it half-contradicts a shipped lesson.
3. Use a different beat: Experiment 2 is two bars, 4.64 against 1.04 on the same
   0 to 20 scale, a 3.6-point gap rather than a 3-point spread across five. It
   reads better and loses the ordering that makes the point about which warnings
   work.

No dispersion can be drawn for Experiment 1 in any case: its error bars are
standard errors shown graphically, with no numeric values printed. Experiment 2
does print `M = .84, SE = .26` for its restricted subsample.

**Settled and SHIPPED 2026-08-04 as `prebunking`, slug `warned-in-advance`.**
Basile chose option 1: draw the true 0 to 20 scale. So the chart is cramped by
design, all five markers sit between 10.6 and 25.3 per cent of the axis, and the
framing turns that into part of the finding by telling the reader what twenty
means. The provenance note records why the deck did not copy the paper's own 0 to
6 axis, and a test asserts the axis is 0 to 20 and that every marker lands in the
lower half, so nobody can quietly rescale it later.

It ships under `prebunking` rather than as a second `continued-influence-effect`,
because the intervention is a warning given **before** the misinformation rather
than a correction after it. The reveal carries the other four conditions, the
deep dive carries Experiment 2, and both say plainly that nothing tried switched
the effect off.

### Expired: the continued influence field-wide shape block

The block under Tier 1 entry 12 says the field's standard measure is "a coded
mean per person, not a headcount", and then specifies the remedy exactly: "a new
shape for a mean with a dispersion interval, which the deck does not have and
which is a real piece of engine work: a union member, a derivation module with a
test, a renderer, a `DataViewRenderer` case, scope labels and a share-card
glyph."

**That is a part-for-part description of `ratings`, which now exists.** It was
built for the third-person effect and every item on that list shipped with it.
The entry even names the paper to build on, Ecker, Lewandowsky and Tang (2010),
which prints per-cell N of 25 and whose retraction-by-warning two-by-two is
already a setup and a reveal. That PDF is in hand.

**Two things stop this being an immediate build, and neither is the shape.**
First, entry 12 has already shipped as `strike-that-from-the-record` under skill
`continued-influence-effect`, so an Ecker puzzle would be a second puzzle for one
reasoning move, which this project refuses. If it is built, it has to earn its
place as a different skill, and the obvious candidate is the warning half of the
two-by-two: whether being told in advance that a claim may be retracted changes
what a retraction does. That is prebunking, not continued influence, and it is
not in the registry. Second, the Johnson and Seifert framing the entry calls the
best anyone has found (95 and 91 per cent still referring to retracted material
while only 24 and 9.1 per cent name it when asked outright) is **still refused**,
and `ratings` does not rescue it: those are percentages of subjects with the
per-group denominators never printed, which is a missing-counts problem, not a
missing-shape one.

### Narrowed: entry 4, map projections

The block was "this needs a genuinely new shape (`projection` or `area`)". That
is probably still true for a pure areas-on-a-map comparison, but there is a route
that needs no new shape at all: `estimation` exists and holds a guess against the
truth. If a source measures **what people believe** the relative sizes to be,
against what they are, that is `estimation` without modification and the lesson
lands harder, because the puzzle then measures a misconception rather than
asserting one. The unchanged part of this entry is the provenance question, since
geodetic constants are an authority rather than a finding, and that still needs
deciding rather than stumbling into.

**Outcome, 2026-08-04: the route was taken and it ran into the wall at the far
end.** A source measuring what people believe was found and read at source
(Battersby and Montello 2009), and it reports that map projections have little
if any influence on those beliefs, that the pattern is ordinary psychophysical
compression, and that Greenland is less overestimated than fifteen of the other
twenty-five regions in the study. So the narrowing was correct as a piece of
reasoning and it is what made the entry checkable: measuring a misconception
rather than asserting one is exactly what exposed the fact that the misconception
is not there. Entry 4 is now marked REFUTED AT SOURCE, and the lesson the data do
carry is filed as entry 22. Two smaller corrections to what is written above.
`estimation` would not have fitted unmodified after all: its guard requires both
estimates to fall **below** the true value, and these are overestimates. And the
provenance question dissolves rather than needing a decision, because a study
that scores people against true areas prints those areas itself.

### Weaker than recorded: entry 5, margin of error

Recorded as "BLOCKED on a source with counts", which overstates it. Polls publish
their sample size and their percentages, and the teachable point, that the margin
on a **difference** is wider than the margin on either number, is arithmetic on
exactly those. This is a sourcing task (find a published poll, read its
methodology at source, check the reported margin against the sample size) rather
than a shape or data block. Nothing here needs engine work.

**Outcome, 2026-08-04: right about the kind of block, wrong about the size of
it.** It is indeed a sourcing task and nothing here needs engine work, and the
reported margin does check out against the sample size in the best sources
(Marist prints its design effect, and three of its polls reproduce their printed
margins to two decimal places). But "polls publish their sample size and their
percentages" understates what this particular puzzle needs, which is a gap
strictly between one and about two times the published margin. Below the window
there is no trap and above it the lead is real, and a day of searching turned up
candidates that failed on the denominator, on the design effect, or by landing
within a tenth of a point of the boundary. Entry 5 keeps its block, now written
as five explicit conditions and a list of what was checked, so the next pass can
start from a search order instead of from scratch.

### Partly expired, and the real block is untouched: entry 6, polls shaping opinion

Three objections were recorded: the effects are small, "the outcome is usually a
stated preference rather than a count", and the clean demonstrations are in live
elections. The middle one has expired, since `ratings` holds a stated preference
on a scale. The other two stand, and the third is the one that actually blocks:
partisanship does not expire.

### Still blocked, and not on shape at all

- **Entry 7, counting crime is counting reporting.** The risk recorded is that it
  is a second name for `detection-bias`, which is a duplicate-skill objection. No
  shape touches it. It stands.
- **Dog whistling.** The entry's own shape doubt ("outcomes are policy-preference
  scales, so counts need checking") has expired via `ratings`, but the entry
  already says the neutral-ground problem "is the real obstacle", and it is.
  Stands.
- **Astroturfing.** "A documents analysis with no numerator and no denominator."
  No shape invents data that was never collected. The entry notes this was the
  one obstacle correctly identified first time, and that assessment survives.

---

## Tier 2: named by a curriculum, still needs a source

### 6. The poll that makes the opinion it measures

<!-- skill: polls-shape-opinion -->

**Status: SHIPPED 2026-08-04** as `what-everyone-thinks`, skill
`polls-shape-opinion`, on the existing `rates` shape with no engine work at all.

**What unblocked it.** Three objections were recorded and the audit expired one.
Toff B, "Exploring the effects of polls on public opinion", Research and
Politics 2018;5(4):1-9, open access, settles the other two. It is a randomised
survey experiment on ordinary policy issues, not a live election, so the
partisan-ground objection does not apply; the author deliberately avoided
polarised issues. And the effects are not small: 14.2 points on foreign language
requirements and 9.3 on junk food taxes.

**The finding is sharper than bandwagon.** There were two poll treatments. A
poll saying the public was evenly divided shifted support by under two points on
every issue. A poll saying two thirds were in favour moved it by 14 and by 9. A
poll does not persuade because it is a poll; it persuades when it names a
winner.

**Counts, not percentages.** Appendix Table C-1 prints a share and an N for every
cell, and all twelve cells of Study 1 reconstruct to a unique whole number. They
also reproduce the effect sizes printed in the paper own prose, 14.2 and 9.3,
which were not used to derive them. That is the reconstruction standard met in
full, so this ships as real counts on `rates`.

**Two exclusions.** Study 2 is out entirely: its social security treatment cell
is printed as 42.3 per cent of 387 people, and no whole number of 387 rounds to
42.3. Net neutrality is deliberately kept in even though almost nothing moved
there, because about seven in ten already favoured it and dropping it would make
the finding look more general than the paper reports.

---

**Status when opened: BLOCKED.** Named by France, première SES, verbatim:

> Comprendre comment le recours fréquent aux sondages d'opinion contribue à
> forger l'opinion publique

An instrument that changes the thing it measures. The experimental literature is
bandwagon and underdog effects, and it is genuinely hard: the published effects
are small, the outcome is usually a stated preference rather than a count, and
the cleanest demonstrations are in live elections, which is the partisan ground
the project excludes. Wanted, but do not force it.

### 7. Counting crime is counting reporting

<!-- skill: reporting-rate -->

**Status: SHIPPED 2026-08-04** as `the-crime-that-doubled`, on the new `series`
shape. Every number below was read at source and reconciled before a line of the
puzzle was written, and the record of that reading is kept here because it is
also the record of what the puzzle refuses to claim.

The setup draws the police series alone, which climbs 134.8 per cent and reads
as a plain rise; the question asks whether violence rose; the correct answer is
that there is no way to tell, because the line counts records rather than
events, and the framing says so in as many words. The reveal adds the survey
series on the same axis and the same scale, falling 52.0 per cent and crossing
in 2015-16. The prose-versus-table discrepancy noted below is resolved in favour
of the tables, and the provenance note says which figures the prose gives and by
how much they differ.

**The source.** Francis BJ, Walby S. Conflicting trends in violent crime
measured by police recorded crime and the crime survey in England and Wales
since 2010. PLoS One 2025;20(6):e0324272, doi 10.1371/journal.pone.0324272, open
access under CC BY. The authors build an "aligned" dataset so the two
instruments finally measure the same thing: the narrower CSEW definition of
violence, restricted to crimes the survey's respondents say were reported to the
police. That alignment is what makes this a puzzle rather than an apples-to-
oranges complaint, and it is the paper's own contribution.

**The data, Table 5 (survey) against Table 6 (police), aligned totals.**

| Year | Crime Survey | Police recorded | Police / Survey |
|---|---|---|---|
| 2010-11 | 872,361 | 576,484 | 0.66 |
| 2013-14 | 848,967 | 550,850 | 0.65 |
| 2015-16 | 776,001 | 794,937 | **1.02** |
| 2017-18 | 561,724 | 1,044,306 | 1.86 |
| 2019-20 | 575,933 | 1,190,845 | 2.07 |
| 2022-23 | 407,806 | 1,293,402 | **3.17** |

From 2013-14 to 2022-23 the police series rose 134.8 per cent while the survey
series fell 52.0 per cent. The paper states those as 134 per cent and "just over
half", so both recompute from the printed tables. **The crossover is 2015-16**:
before it the survey found more violence than the police recorded, after it the
police recorded more, and by 2022-23 more than three times more.

**A discrepancy found and recorded rather than smoothed over.** The prose on page
18 gives two figures that do not match its own tables: it says the police series
runs to 1,293,492 where Table 6 says 1,293,402, and that the survey series starts
at 848,467 where Table 5 says 848,967. Differences of 90 and 500 respectively.
Neither changes any claim, since both readings give the same 134 per cent and the
same "just over half", but the tables are the data and the tables are what should
be authored. Whoever builds this must use the table values and say so.

**The duplicate-skill objection is answered.** The risk recorded below was that
this is `detection-bias` under another name. It is not. `detection-bias` is about
one instrument finding more when you look harder. Here there are TWO instruments,
both visible, moving in opposite directions on the same reality, and the lesson
is that you cannot resolve them by trusting the one that agrees with you. The
paper's own conclusion is that improvements in police recording explain part of
the gap and the survey's exclusion of vulnerable groups another part, so neither
series is simply the honest one. That is a different reasoning move.

**What it needs to ship.** A new shape: two count series over time, drawn on one
axis, with the crossover visible. No existing shape holds it. `rates` needs a
denominator per observation and there is none here. `bunching` is counts in
ordered bins but carries a single series and a threshold. `drift` is signed net
movement and requires denominators. `dose` needs a zero baseline. The natural
setup is one series alone, which reads as a clear trend in whichever direction,
with the reveal adding the other series crossing it.

**Non-partisanship is clean**, which is unusual for crime statistics: the story
is about two measurement instruments, both official, and the paper blames
neither. Note also that the survey's response rate fell to 42 per cent, which
the authors flag as a further quality concern, and any puzzle should carry that
rather than presenting the survey as the reliable one.

---

**Status when opened: BLOCKED.** Named by France, première SES: "les difficultés de mesure de
la délinquance".

This is `detection-bias` transplanted from medicine to policing. **The risk is
that it is a second name for one reasoning move**, which this project has already
refused twice, for attrition against intention-to-treat and for question wording
against framing. It would have to teach something the medical version cannot. The
strongest version would use a case where recorded crime rose while victimisation
surveys were flat, so the two instruments disagree on the same reality.

### 8. Goodhart, and the measure that stops measuring

<!-- skill: threshold-bunching -->

**Status: SHIPPED 2026-08-04 as `threshold-bunching`, slug `just-under-the-line`,
and the skill id changed, which is the one thing `docsCoverage.test.ts` cannot
catch by itself.** The tag above used to read `goodharts-law`. It was changed
deliberately, and the reason is the honest limit of what shipped.

What shipped is the **mechanism**: draw a line anywhere and people pile up on
the good side of it, so a count taken at a threshold measures the threshold as
much as the thing it was meant to measure. On Allen, Dechow, Pope and Wu (2017),
*Management Science* 63(6):1657-1672, nearly ten million chip-timed marathon
finishes. 97,012 runners finished in the minute before four hours and 74,968 in
the minute after, a step of 22,044 across an instant at which nothing about
running changes. It needed a new shape, `bunching`, because a step in a curve
had no home in the deck.

What did **not** ship is Campbell's law proper, where a principal imposes the
target on an agent. A marathon runner's four hours is self-set; nobody is
rewarded or punished for it, which is exactly why the paper can rule out
external incentives and why the case is so clean. The imposed-target version is
still unbuilt and still blocked for the reason recorded below: the best paper
for it prints percentages rather than counts. The Trap Hunt items shipped with
this puzzle do cover imposed targets (a pass mark, an ambulance clock, a sales
quota, a readmission window), so the applied side is not missing from the deck,
only the imposed-target puzzle.

**Status when opened: LEAD.** Not named by any curriculum read, but it is the thread running
through several things that are: the French polling item above, the sales-region
and school-catchment items already written into the gerrymandering review bank,
and the whole logic of `more-votes-fewer-seats`.

Campbell's law (Campbell DT, 1976) is the citable form. Needs a case with counts
where a target was hit and the underlying thing did not move.

**Searched 2026-08-03, and the best case in the literature was found and read in
full. It is the right lesson and it does not print counts.**

**Eatock J, Cooke M, Young TP. Performing or not performing: what's in a target?**
*Future Healthcare Journal* 2017;4(3):167-172, DOI `10.7861/futurehosp.4-3-167`,
PMCID PMC6502571. Open on PMC and read at source.

It is almost exactly the puzzle this entry describes, to the point of stating the
setup-and-reveal contract in its own abstract. Two English A&E departments,
2014/15, matched on age and arrival profile. Both meet the 95 per cent four-hour
target and look identical doing it: **4.68 per cent of attendances breached at
Hospital A and 4.49 per cent at Hospital B**. Behind that single number they are
running completely different departments. The share of patients leaving between
three hours forty and four hours is **20.83 per cent at A against 8.56 per cent at
B**, and **15.82 per cent of A's patients leave in the last ten minutes** of the
window, a peak entirely absent at B. Before three hours twenty the two profiles
differ by under one percentage point. Same target, same compliance, opposite
behaviour, and the paper's own line for it is that the information "is not visible
simply by monitoring the single existing metric".

**The block is that every one of those figures is a percentage, printed to two
decimal places, and no bin counts appear anywhere.** The only exact counts in the
paper are the two annual attendance totals, 148,999 and 108,698. Reconstructing a
numerator from a rounded percentage fails this project's test on the first step:
20.83 per cent of 148,999 is consistent with **any of the fourteen integers from
31,030 to 31,043** (checked by enumeration, not by eye), so it is not unique, and
nothing else in the paper pins it. Tables 1 and 2 are
percentages too, and the ten-minute profile that carries the whole reveal, Fig 2,
is a chart and is never tabulated. Authoring a rate directly would break the rule
that rates are always derived and never authored, and inventing a share-shaped
data type to get round that would be building a loophole in the central
convention rather than a shape for a lesson.

**Two routes forward, and the first one is a decision rather than a task.**

1. **The underlying data is public.** The paper names its source exactly: NHS
   Digital Hospital Episode Statistics, accident and emergency attendances in
   England, provider-level analysis, 2014/15, which publishes attendances by
   duration band for every provider. That gives real counts for a real chart. The
   catch is that the authors deliberately anonymised the two trusts, and the
   printed attendance totals are exact enough to identify both. Going to the
   source therefore means de-anonymising hospitals whose authors chose not to
   name them, even if the puzzle then reproduced the anonymity. That is a call
   for a human, not something to do quietly on the way to shipping a puzzle.
   Nothing here was pursued.
2. **A different case that prints counts.** The mechanism to demonstrate is
   bunching at a threshold, and two literatures publish it as bin counts rather
   than shares: **Burgstahler and Dichev (1997)** on the discontinuity in reported
   earnings just above zero, which prints histograms of firm counts, and **Allen,
   Dechow, Pope and Wu (2017)**, *Management Science*, on bunching of marathon
   finishing times just under round hours, counts of finishers per minute bin over
   roughly nine million times. Both are completely non-partisan and both are
   genuinely countable. Neither is a target imposed by a principal on an agent,
   which is what Campbell's law is about, so a puzzle built on either would teach
   the mechanism honestly but would have to be named for the bunching rather than
   for Goodhart. Neither has been read.

Status stays **LEAD**. The lesson is real and the best paper for it has now been
read and ruled out on format, which is worth more to the next person than the
bare instruction to find a case with counts.

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

### Whataboutism: SHIPPED 2026-08-04

<!-- skill: whataboutism -->

**Shipped as `whataboutism`, slug `you-do-it-too`, on `ratings`.** Basile supplied
both the SAGE article and the Springer book, and the article was read at source.
The block recorded below is cleared and the record of it is kept, because the
refusal it describes turned out to be correct on the facts.

92 Dutch pupils, none of whom had ever heard of the ad hominem, rated 48 two-line
dialogues from 1, very unreasonable, to 7, very reasonable. A flat insult scored
2.91 and an insinuation about motives 3.90, both on the unreasonable half. **The
tu quoque scored 4.45, the only one of the three past the middle of the scale.**
A reply that actually answered the point scored 5.29. Table 3 supplies the deep
dive: in a scientific discussion the tu quoque falls back to 3.66, below the
middle, so the identical move reads as fair comment at home and as out of order
in an argument about evidence.

**The endnote refusal is vindicated.** The entry below refused to author from the
figures SAGE renders publicly in its endnotes (3.82 for the tu quoque). The
article gives 4.45. They were indeed different experiments, and authoring from
the reachable numbers would have shipped the wrong ones.

---

**Status when opened: OPEN. The earlier rejection was wrong**

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

**Updated 2026-08-04. The shape objection is dead, the paper is identified, and
the block is now one PDF.**

**The shape objection no longer applies.** It was written before the `ratings`
shape existed. `ratings` was built for the third-person effect precisely because
whole literatures measure their outcome as a mean on a bounded scale, and it
carries a mean with an optional SD on a labelled axis. A seven-point
reasonableness scale is exactly what it is for. Nothing about this entry is
blocked on shape any more.

**The paper.** van Eemeren FH, Meuffels B, Verburg M. **The (Un)Reasonableness of
Ad Hominem Fallacies.** *Journal of Language and Social Psychology*
2000;19(4):416-435, DOI `10.1177/0261927X00019004002`. Three ad hominem variants
(abusive direct attack, circumstantial indirect attack, and the **tu quoque**,
which is whataboutism) crossed with three discussion contexts (scientific,
political, domestic). The same study is written up at book length as chapter 3,
"Ad Hominem Fallacies: An Exemplary Study", pp. 51-83, of van Eemeren, Garssen
and Meuffels, *Fallacies and Judgments of Reasonableness*, Springer 2009,
Argumentation Library vol. 16.

**Why it is the right paper for this deck.** Two results, either of which is a
reveal. First, the ranking: the tu quoque is judged the **most reasonable of the
three personal attacks**, which is the whole lesson, since whataboutism is the
attack that gets waved through because it looks like it engages. Second, the same
move is judged differently by setting, most harshly in a scientific discussion.
And the stimuli are invented one-sentence dialogues, so there is no partisan
surface at all.

**What is actually in hand, and it is not enough.** SAGE serves the article behind
a paywall but renders its **endnotes in full on the public page**, and they carry
numbers. Endnote 10, read there: the tu quoque is "regarded as the most
reasonable (mean reasonableness score: 3.82)", then the circumstantial variant
(3.47), then the abusive attack (2.99); within the scientific domain the three
run 3.25, 2.69 and 1.96; and fallacious arguments (M = 3.43) are judged less
reasonable than non-fallacious moves (M = 5.27). Endnote 9 gives 3.6 and 3.9 for
two education groups, with t = 2.4, df = 90.

**Do not author from those.** Three reasons, and the third is the serious one.
The scale is never stated in the endnotes, so the numbers have no units. No
per-condition n or SD appears. And endnote 10 opens "Just as in the previous
research", which means it is describing a **different experiment** from the
paper's main study; a web summary of secondary sources produced yet a third set
of figures (3.75 against 5.29, with SDs and n = 92 on a seven-point scale) that
matches neither endnote. Three accounts that disagree are three different
experiments, and picking whichever set is easiest to reach is exactly the failure
this project exists to avoid.

**Access, checked 2026-08-04.** SAGE shows no institutional entitlement for this
article, and the Springer chapter offers only "Log in via an institution". Both
were tried in a real browser. Also checked and ruled out: Garssen's open paper
"Charges of inconsistency and the tu quoque fallacy" in the UvA repository at
`pure.uva.nl/ws/files/1632290/`, which confirms the qualitative finding but is
**pure theory and prints no data at all**, so nobody need download it again.

**So the block is one PDF**, and what has to be read off it is small and specific:
the scale definition with its endpoints, the per-condition means for the three
variants, the per-condition n, and SDs if the paper prints them. Either the SAGE
article or the Springer chapter would do.

### Dog whistling: SOURCED AND REFUSED 2026-08-05, on neutral ground, with shape failing too

Written up originally as the clearest partisanship rejection on the list. The
partisanship concern is real and it is what finally settles this. The claim that
came with it, that there was nothing but live political material, was wrong: this
is one of the better-replicated literatures in political psychology.

- Mendelberg (2001); **Valentino, Hutchings and White (2002)**, the foundational
  implicit-appeal experiments; White (2007).
- **Valentino et al. (2018)**, four nationally representative survey experiments
  finding implicit appeals are **no more effective than explicit ones**, argued to
  reflect a changed environment rather than a failure of the original theory.
- **Wetts and Willer (2019)**, *Socius*, two experiments, **1,797 white
  Americans**, racial attitudes measured two weeks before exposure.

**Both papers have now been read at source, and the third test is answered too.**
The three tests were left half-open for a week with the note "counts need
checking". They are checked.

**Valentino NA, Neuner FG, Vandenbroek LM. The Changing Norms of Racial Political
Rhetoric and the End of Racial Priming.** *Journal of Politics* 2018;80(3):
757-771, doi `10.1086/694845`. Read cover to cover on 2026-08-05, together with
its online appendix. **Caveat on which text was read:** the typeset article is
paywalled, so this was the accepted manuscript posted by the second author on his
own university page, plus the posted online appendix. Data and replication
materials are on the JOP Dataverse, doi `10.7910/DVN/5AN3RU`.

**The design, and one correction to this entry's own framing.** Four survey
experiments on national samples of whites. Study 1, 2,394 voting-age Americans
fielded 16 July to 8 August 2010 through YouGov/Polimetrix; Studies 2 and 3, 234
and 321 white respondents; Study 4, 3,114 white respondents through Knowledge
Networks. **The fieldwork ran from 2010 to 2012, not 2016**, and the authors say
so themselves in the discussion: the shift "cannot be solely due to Trump's
political rise". A card that dated this to the Trump era would be wrong about the
paper's own dates, and the earlier note here inviting a "changed environment"
reading was one step away from making that mistake.

**Shape: FAILS, and it is the Levari wall again.** The estimating equation is an
OLS interaction model with the explicit cue as the excluded category, and the
implicit/explicit theory lives entirely in the sign of one interaction term.
Every substantive table in the paper and in the appendix prints coefficients with
standard errors: Table A9, Study 1, symbolic racism -0.626 (0.0271) with the
implicit interaction at 0.027 (0.0380), N = 2,168; Study 4, -0.489 (0.0212) with
the interaction at -0.016 (0.0305), N = 2,983. Figures 2, 3 and 4 plot fitted
slopes and are never tabulated. **Appendix Tables A5 to A8 do print means, but
pooled over conditions**, one row per variable with N, mean, standard deviation,
minimum and maximum, so there is no condition-level outcome printed anywhere in
the paper or the appendix. A puzzle needs two views of one data set and the
second view here does not exist on the page.

**What the paper does print at condition level, which is not nothing.** Two
manipulation checks from Study 4, on a 0 to 1 scale. Asked whether the
advertisement was racially insensitive: implicit **.23**, explicit **.67**. Asked
whether it focused on racial conflict: implicit **.19**, explicit **.72**. And
one distribution, on whether people are too sensitive about race in public:
**60 per cent** answered "way too sensitive" or "slightly too sensitive" against
**13 per cent** who answered "not quite sensitive enough" or "not nearly
sensitive enough". That is a real and striking pair of numbers, and it is a
manipulation check rather than an outcome: it says the treatment landed, not that
it did anything.

**Two arithmetic checks worth keeping, since they were run.** First, one that
holds: Table A8 gives pooled means of .4571 for the racially-insensitive item
(n = 2,305) and .4651 for the racial-conflict item (n = 2,288), and the midpoints
of the two printed condition means are .450 and .455, within a hundredth of each.
That is consistent with the reading rather than a proof of it, since the paper
does not say how the control group enters the pooled figure. Second, one that
does not: the text reports the modal symbolic-racism score of 1 as 17.6 per cent,
n = 402, and the floor of 0 as 59 respondents, 2.6 per cent. Neither is a share
of the headline 2,394, since 402 of 2,394 is 16.8 per cent. Both are shares of
roughly 2,284, which is about the number who completed the battery, and the
appendix regression Ns of 2,168 and 2,269 sit just below that. The percentages
are consistent with each other and **not** with the sample size the paper leads
with, which is exactly the sort of thing a provenance note would have to carry.

**Wetts and Willer (2019),** *Socius*, doi `10.1177/2378023119866268`, hits the
same wall. Two experiments, 865 and 864 after exclusions, outcomes are 1 to 7
composites for welfare support, recipient deservingness and gun control, and all
five tables are OLS coefficients with standard errors. **Lighter read than the
Valentino one**: this was taken from the publisher's full-text page rather than
the typeset PDF, so the table inventory should be re-checked if the entry ever
reopens.

**Why it is still refused, and it is neutral ground rather than shape.** Two
reasons, and the second is the stronger of the two.

1. **The parties and the people are alive.** The stimuli and outcome measures
   name Obama, the Tea Party, Glenn Beck, Sarah Palin, Rush Limbaugh and Mitt
   Romney, and the focal policy is the Affordable Care Act. The test this file
   sets is whether there is a version whose parties and people are extinct.
   There is not.
2. **Every drawable version puts a prejudice scale on the x axis.** The finding
   is about how strongly a respondent's symbolic-racism score predicts their
   policy opinion, so any chart of it sorts people along that score. A Confoundle
   puzzle asks a reader to look at a chart and commit to an answer; this one would
   ask them to reason about how their own group's racial resentment tracks its
   politics. That is a different kind of object from a puzzle about a persuasion
   technique, and it is not one this deck can hand to a general audience. This
   reason is independent of who is alive and would survive the passage of time,
   which is why it settles the entry rather than deferring it.

**Evidence: passes, emphatically.** Four nationally representative experiments in
a top journal, plus an independent two-experiment replication in an open-access
one. Nothing here is a criticism of the work. **Shape: fails.** **Neutral ground:
fails.** Status: **REFUSED**, and unlike the first refusal this one names the
test it actually failed.

**The lesson worth keeping was extracted rather than discarded.** The general
move, that a well-established effect can stop replicating because the world
changed underneath it rather than because anyone measured it wrong, is a real
reasoning trap and is not about race. It is now **entry 25** below, where it needs
a neutral source of its own.

### The Big Lie: PAPER IDENTIFIED 2026-08-04, AND IT IS STILL A WORKING PAPER

**Read this first, 2026-08-05.** The Fazio, Rand and Pennycook strand recorded in
this section is no longer queued here: it **shipped** as entry 24 below, skill
`floor-and-ceiling`, slug `nowhere-left-to-go`. The Big Lie proper is **still
blocked** for the reasons set out under the four counts further down, and nothing
about that ship changes them. The Table 1 numbers and the two honesty items
recorded in this section are the source of record for the shipped puzzle.

**The paper is found and named. The block is now provenance, and it is a decision
rather than a search.**

**The source.** Levari DE, Martel C, Orchinik R, Bhui R, Seli P, Pennycook G,
Rand DG. *Blatantly false news increases belief in news that is merely
implausible.* Preprint, PsyArXiv, doi 10.31234/osf.io/cz7vy, posted February
2024. Five preregistered experiments, N=5,476. Covered by *Scientific American*
as "How Blatantly False Headlines Can Distort What We Believe In".

**The stated finding matches what this entry predicted.** Exposure to a higher
prevalence of blatantly false headlines raised belief in unrelated headlines that
were merely ambiguous or plausible, true ones as well as false ones. The effect
is reported to hold for hypothetical events and for real headlines, under active
evaluation and passive reading, among liberals and conservatives, and among
those high and low in cognitive reflection. That last set is the
non-partisanship test passing, and it is exactly the shape the deck wants.

**And it has not been peer reviewed.** As of 2026-08-04 the lead author's own
publication page lists it under **Working Papers**, with no journal, no "in
press" and no "under review" status, two and a half years after it was posted.
Compare the same author's neighbouring entries, which carry precise statuses
("Minor revisions at Management Science", "Revise & Resubmit at Psychological
Science", "Revise & Resubmit at Cognition"). The absence of any status on this
one, on a page that gives one for almost everything else, is information.

**Why that matters here and not everywhere.** This project's standard is that a
puzzle's factual claim is read at source and reconciled. A preprint can be read
at source, and this one carries preregistrations and a large N from the strongest
author list in the field, so it is not disqualified on its face. But a deck whose
whole premise is that it is more careful than the thing it is teaching against
should not rest a lesson on a finding that has sat unpublished for two and a half
years without saying so on the card. The two honest options are:

1. **Wait.** Recheck the venue before authoring. If it lands in a journal, this
   becomes an ordinary build and a very good one.
2. **Ship it as a preprint, and say so in the provenance note and on the
   lesson page**, in the same voice the deck uses for its other honesty notes.
   Defensible, given five preregistered experiments and N=5,476, but it is a
   decision about the deck's standard rather than about this puzzle, so it is
   Basile's to make and not one to take silently.

**Do not substitute the neighbouring paper.** The same team's *Replicability and
generalizability of the repeated exposure effect on moral condemnation of fake
news* (Orchinik, Bhui, Rand, Nature Communications 2025, doi
10.1038/s41467-025-62462-x) is peer reviewed and open access, and it is
tempting. It is the wrong lesson: it is about repetition, which is frequency,
and the whole reason this entry was promoted is that the Big Lie is about
magnitude. Swapping it in would recreate the exact error this entry was written
to correct.

**TABLE 1 READ AT SOURCE 2026-08-05. IT PRINTS THE PROPORTIONS, AND THIS ONE
SHIPS.** Fazio, Rand and Pennycook clears the bar that killed both Big Lie
candidates. Table 1, "Proportion of statements rated true across the different
bins of plausibility", prints twenty proportions with standard deviations. Copied
exactly, standard deviations in brackets:

| Bin | New | Repeated | Difference |
|---|---|---|---|
| 1-10% | .13 (.28) | .13 (.27) | .00 |
| 11-20% | .20 (.29) | .23 (.29) | .03 |
| 21-30% | .27 (.31) | .29 (.32) | .02 |
| 31-40% | .36 (.31) | .41 (.32) | .05 |
| 41-50% | .44 (.31) | .50 (.32) | .06 |
| 51-60% | .53 (.32) | .59 (.32) | .06 |
| 61-70% | .58 (.30) | .66 (.29) | .08 |
| 71-80% | .68 (.27) | .72 (.27) | .04 |
| 81-90% | .77 (.26) | .81 (.25) | .04 |
| 91-100% | .88 (.22) | .89 (.19) | .01 |
| **M** | **.48 (.17)** | **.52 (.16)** | **.04** |

The difference column is **not printed** and must be derived, which is what this
deck does anyway. Note its shape: near zero at both ends, peaking at .08 in the
middle. That is the inverted U, and it is the whole puzzle.

**The rest of the numbers, all read at source.** 503 participants completed the
study on Amazon Mechanical Turk, 43 more started and did not finish. 80
statements, 40 previously rated true by 50 to 100 per cent of participants and 40
by 0 to 49 per cent. Repeated statements were rated true more often than novel
ones overall, M = .52 against .48, t(502) = 9.19, p < .001, d = 0.41. A regression
predicting the size of the illusory truth effect from perceived truth found a
significant positive linear term and a significant negative quadratic term,
F(2, 77) = 7.94, p = .001, with perceived truth predicting 17 per cent of the
variance. A cubed term added nothing, delta R squared = 0, F = 0.01, p = .935.

**And the number the reveal turns on.** The quadratic model puts the largest
illusory truth effect at a perceived truth of **0.53**. They bootstrapped 5,000
resamples of the 80 items to put a confidence interval on where that peak sits,
and got **95% CI [0.489, 0.593], which includes 0.5.** Their own Study 1
simulation establishes what that means: if the repetition effect is equivalent at
every level of plausibility the curve peaks at exactly 0.5; if the effect shrinks
with plausibility it peaks below; if it grows, above. The peak is at 0.5. The
data are consistent with repetition working **just as well on outrageous claims
as on plausible ones**, and the inverted U being an artefact of binarising a
continuous belief.

**The data are posted.** `https://osf.io/w4k2c/` carries the full stimulus set,
the data and the preregistration of the primary analyses and sample size. Nothing
here needs an email to an author.

**The puzzle, which is the deck's exact shape.** Setup draws the difference by
bin, near zero at both extremes and peaking in the middle. The obvious reading,
and the one the prior literature drew, is that repetition cannot touch a claim
you already know is false, so the outrageous lie is repetition-proof. The reveal
puts the peak's confidence interval on the axis and shows it straddles 0.5, and
that the same inverted U comes out of a simulation built with the repetition
effect held exactly constant. The shape is the ruler, not the world. Two views of
one curve.

**Skill id proposal: `floor-and-ceiling`.** The general move is that an effect
which looks absent at the extremes of a scale may be squeezed by the scale rather
than absent from the world. It is distinct from `illusory-truth`, which the deck
should hold for the plain repetition effect, and distinct from
`magnitude-compression`, which is about perceiving quantities.

**Two honesty notes for whoever builds it.** First, the lowest-plausibility items
did not come from the same source as the rest: no statement in the prior study
was rated true by fewer than 14 per cent of participants, so the 0 to 10 and 11
to 20 per cent bins were filled from an unpublished follow-up to Pennycook,
Cannon and Rand (2018) Experiment 1, rated by 492 further MTurk participants.
Second, the differences in the table are between-subject at the item level, since
each item was either only new or only repeated for a given participant, and the
paper says so in a footnote. Neither undermines the lesson, and both belong in
the provenance note.

**A shape question that is not yet answered.** The `series` shape built for the
crime lesson holds two count series on one axis, which is nearly this, but its
schema requires the two lines to swap places and these never cross: repeated is
at or above new in every bin. Either the difference gets its own shape, or
`series` grows an optional flag saying no crossover is expected. Look at both
before writing anything, and remember the rule: build a new shape whenever the
lesson needs one, never bend the lesson to fit.

**PREPRINT STATUS RESOLVED, AND A SECOND BLOCKER FOUND 2026-08-04.** Basile's
decision on the question above was to **ship it labelled a preprint**. That
settles the provenance question and it stands. But the preprint was then read at
source, cover to cover, and it raises a different obstacle that neither of us
knew about when that decision was made, so the decision cannot dispose of it.

**The paper prints no drawable outcome numbers anywhere.** Every result in all
five studies is a regression coefficient with a standard error, a test statistic
and a p value, and every outcome figure is a scatter plot with a fitted curve.
There is not one table of percentages or counts in the paper. Study 1:
b = 0.73, SE = 0.33, z = 2.23, p = 0.03 for high versus low, and b = 0.77,
SE = 0.30, z = 2.59, p = 0.01 for moderate versus low. Study 2: b = 0.89,
SE = 0.28, z = 3.20, p = 0.001 and b = 0.82, SE = 0.34, z = 2.41, p = 0.02.
Study 4: b = 0.05, SE = 0.02, t = 2.72, p = 0.01 in the high condition against
b = -0.002, SE = 0.02, t = -0.10, p = 0.92 in the low one. Figures 1 and 4 plot
"% of headlines called plausible" and "% called accurate" against pretested
plausibility, and neither is tabulated.

A generalised linear mixed model interaction coefficient on a latent
plausibility-threshold scale is not a count and not a published percentage. It
cannot be drawn as a rate, and group shares cannot be recovered from it without
modelling assumptions the paper does not license. This project already refused to
read numbers off an untabulated figure once, in the Campbell's law puzzle, whose
provenance note says the 15.82 per cent profile "appears only in a figure that is
never tabulated, so no claim is made here". The same rule applies here and it
points the same way.

**What the paper does print, exactly, and it is not nothing.** The
manipulation is given as precise shares, and those are the input rather than the
outcome. Study 1, 419 US residents on Amazon Mechanical Turk, 204 female, 215
male, mean age 37.4, each reading 60 headlines drawn from a set of 300 written by
the research team. Three conditions: **low implausibility, 8 per cent
implausible, 33 per cent ambiguous, 58 per cent plausible; moderate, equal
thirds; high, 58 per cent implausible, 33 per cent ambiguous, 8 per cent
plausible.** Study 2, 599 residents, 295 female, 302 male, 2 other, mean age
37.5, headlines drawn from 1,235 real ones fact-checked by Snopes between 1
February and 1 November 2018, half true and half false, same three conditions.
Study 4 reanalyses 1,455 US residents on Lucid: a habituation phase of 50
headlines at 80 per cent true and 20 per cent false, or the reverse, then an
evaluation phase of 15 true and 15 false for everybody, drawn from 55 true and 55
false balanced on partisanship.

**THE DATA ARE NOT POSTED. Checked 2026-08-04, in the three places they could
be, and they are in none of them.** Basile's decision was to pull the OSF data
and derive the shares, which was the right instinct; the route is simply closed.

1. **The authors declared it themselves.** The OSF submission record for this
   preprint answers the data-availability question with `has_data_links: "no"`
   and an empty `data_links` list. That is the authors' own answer on the
   deposit form, not an inference from a missing link.
2. **The preprint carries one file, and it is the PDF.** Listing the preprint's
   storage returns `levari_et_al_blatantly_false_news_1feb2024.pdf`, 1,259,975
   bytes, and nothing else. No CSV, no analysis code, no supplement.
3. **The paper has no data availability statement.** It runs to the Discussion
   and then straight into Acknowledgments and funding, and stops. There is no
   repository named anywhere in it.

What **is** linked is four AsPredicted preregistrations
(`aspredicted.org/WWQ_OOV`, `OSV_MRU`, `VMQ_COU`, `HHU_ECQ`). Those hold the
plans, not the data, so they cannot supply a single count.

**So there is no route that stays inside this project's rules.** The paper prints
coefficients, the figures are untabulated, and the trial-level data are not
public. Every remaining path involves inventing a number: reading points off
Figure 1 or Figure 4 by eye, or converting a log-odds coefficient into group
shares under assumptions nobody published. This deck does not do either.

**The one honest way to unblock it is to ask.** The corresponding author is
David E. Levari, `dlevari@fas.harvard.edu`. A request for the trial-level data or
for the condition-level percentages behind Figures 1 and 4 is an ordinary
academic courtesy and costs one email. If the numbers arrive, the provenance note
says they were supplied by the authors on request, which is a stronger sentence
than most of what this deck cites. Until then the entry stays here.

**One more thing worth carrying to whoever builds it**, found on page 11 and easy
to miss: SI Appendices L and M report three additional studies testing whether
**one or two** blatantly implausible headlines produce the effect, and they found
**no significant results**. The effect needed several dozen high-implausibility
headlines to emerge. A puzzle that implied one outrageous claim shifts a reader's
threshold would be overstating the paper's own finding, and the authors say so
themselves.

**The shipping question, when it reopens, is a data question rather than a paper
question**, and it is Basile's call in the same way the last one was.

**A BETTER PAPER ARRIVED 2026-08-04, AND IT IS NOT A SUBSTITUTE. IT IS ITS OWN
LESSON, AND IT PARTLY REFUTES THIS ONE.** Basile supplied Fazio LK, Rand DG,
Pennycook G. *Repetition increases perceived truth equally for plausible and
implausible statements.* Psychonomic Bulletin & Review 2019;26:1705-1710, doi
10.3758/s13423-019-01651-4. **Peer reviewed and published**, which neither of the
candidates above is.

**The finding, from the abstract read at source.** It had been argued that
repetition cannot move belief in unambiguous statements: faced with an obviously
false claim, people should just reject it. Fazio and colleagues report a
simulation study and **a preregistered experiment**, and conclude the opposite.
Belief in **all** statements is increased by repetition. The observed illusory
truth effect *is* largest for ambiguous items, but they show that this **can be
explained by the psychometric properties of the task rather than by any
psychological mechanism that blocks repetition for implausible items**. Their
closing sentence: even highly implausible statements will become more plausible
with enough repetition.

**Why this is a Confoundle puzzle in its own right, and a very good one.** The
data have an obvious reading and the obvious reading is wrong, which is the
deck's whole DNA. Plot the size of the repetition effect against baseline
plausibility and you get a symmetric inverted U centred at 0.5: the effect looks
large for ambiguous claims and near zero at both extremes. The natural
conclusion, and the one the prior literature drew, is that outrageous claims are
immune, so repeating a big lie is wasted effort. The reveal is that the inverted
U appears **even when the simulation is built with the repetition effect held
exactly constant across every level of plausibility**, because converting a
continuous belief into a binary true or false judgment floors it at one end and
ceilings it at the other. The shape is the ruler, not the world. Setup and reveal
are two views of the same curve, which is exactly the structure this engine wants.

**And note what it does to the entry above.** The folk Big Lie says a colossal
lie is more credible than a small one. Levari et al. say something subtler, that
big lies make *other* claims more credible, and their own SI found one or two
outrageous headlines do nothing. Fazio et al. say the apparent immunity of
outrageous claims to repetition is a measurement artefact. Between them the folk
claim is in poor shape, and **a puzzle whose reveal is "the shield you thought
protected you from obvious nonsense is an artefact of how belief was measured"
is a better lesson than the one this entry set out to build.**

**What is still unchecked**, and it is the same question that killed the last
two: whether Study 2 tabulates its proportions. Study 2 ran **503 participants**
on Amazon Mechanical Turk, with 43 more starting and not finishing, rating novel
and repeated statements across the full plausibility range. The outcome is
reported as a **proportion rated true**, which is the right unit for this deck if
it is printed rather than only plotted. **Read the Study 2 results and figures
before designing anything.** If the proportions are tabulated, this ships on
`rates` or on a small new shape; if they exist only inside Fig. 1, the same rule
that stopped Levari stops this too.

The second file Basile supplied, `OrchinikEtAl_ITPretest.docx`, is the pretest
material for the Orchinik, Rand, Pennycook and Fazio paper listed above as
Revise & Resubmit at Cognition. Unread as of this note. It is likely to be a
stimulus set with per-item plausibility ratings, which would be useful for
authoring example headlines but is not an outcome measure. The studies are preregistered
and hosted on OSF, so the trial-level data are very likely posted. Computing the
share of ambiguous headlines called plausible in each condition from those files
would give exactly the counts this deck authors from, and it would arguably be
*more* rigorous than quoting a coefficient, since every puzzle here already
derives its rates from raw counts. But it is a step past "read the number at
source", it introduces analysis choices the paper made and this deck would have
to match, and doing it silently would be the sort of shortcut this file exists to
prevent. **Do not author this lesson from the coefficients. Either work from the
posted trial-level data, with the derivation written into the puzzle's test the
way every other reconciliation is, or leave the entry here.**

**What it would need to ship**, once both questions are settled: the
counts derived from the posted data, and a shape. The natural setup shows a
reader's plausibility ratings for a set of mild claims, and the reveal shows the
same ratings after the same reader has been shown a batch of outlandish ones,
with nothing about the mild claims having changed. Whether an existing shape
carries that is unexamined; `drift` and `estimation` are the two to look at
first.

---

**Status when opened: PROMOTE.** Searched, and the rejection was wrong twice
over. Written up as "the mechanism is repetition, so it is `illusory-truth`
again". That was wrong on two counts, and the search took one query.

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

---

#### The primary paper was found and read. Status: REFUSED 2026-08-03, on four counts.

**Levari DE, Martel C, Orchinik R, Bhui R, Seli P, Pennycook G, Rand DG.
Blatantly false news increases belief in news that is merely implausible.**
PsyArXiv preprint `10.31234/osf.io/cz7vy`, version of 1 February 2024. Five
studies, N = 5,476. Downloaded from OSF and read at source, all 33 pages of the
main text and methods. It is the right paper: it is unambiguously the work behind
the *Scientific American* piece, and the account above of what it finds is
accurate. It still cannot be authored from, and the reasons compound.

**One. It is not peer reviewed, and says so itself.** Page 1 carries, in red, "This
is a working paper and has not yet been published in a peer-reviewed journal." It
is still listed under "Working Papers" on Orchinik's own research page, two and a
half years after posting. That is not a knock on the work, which is preregistered
and larger than most of what this deck ships on. But the deck refused Paul and
Matthews partly on this ground, and a working paper's numbers can still move.

**Two, and this is the one that ends it: there are no counts anywhere.** Every
result in the paper is a coefficient from a binomial generalized linear mixed
model with random intercepts for participant and for headline, reported as b, SE,
z and CI. Not one condition-level proportion is printed. Figures 1, 2 and 4 are
per-headline scatterplots of percentage-called-plausible against *pretested*
plausibility, with fitted curves. There is no numerator and no denominator for
the effect, and deriving one from an interaction coefficient is exactly the
reconstruction the project does not do.

**Three, the effect is a threshold shift, which this deck cannot draw honestly.**
The finding is not "X per cent believed it here and Y per cent there". It is that
the plausibility at which people flip to calling a headline true moves. In Figures
1 and 2 the three condition curves very nearly overlap; the difference lives in
the fit, not in the picture. Setup and reveal have to be two readings of the same
visible numbers, and there is nothing here a reader could read either way.

**Four, the internal pattern is not the monotone story the popular account tells.**
In Study 1 the high-versus-low contrast is b = 0.73, p = 0.03 and the
*moderate*-versus-low contrast is b = 0.77, p = 0.01, so moderate came out
fractionally larger than high, and high versus moderate is flatly null (b = -0.04,
p = 0.88). In Studies 3a and 3b the authors describe their own interactions as
**marginally significant** (p = 0.06, 0.07 and 0.06). In the Figure 3 forest plot
Study 2's moderate-versus-low point sits on the wrong side of 1. What survives is
the pooled high-versus-low odds ratio of 2.39 [1.56, 3.65], which is a real
result, but "more implausibility, more belief" as a dose-response is not what the
individual studies show, so the `dose` shape would misrepresent them.

**And a fifth thing, which is a correction to this entry rather than a reason to
refuse.** SI Appendices L and M report three further studies testing exposure to
just **one or two** blatantly implausible headlines, and found **no significant
results**; the paper says the effect needs "several dozen headlines with high
average implausibility". So the mechanism is **prevalence, not magnitude**. That
matters, because the whole reason this entry was promoted was that magnitude and
frequency are different variables and the Big Lie is about magnitude. On this
evidence it is not. A puzzle built here would be about living in a stream of
nonsense, which is a good lesson, but it is not the Big Lie and it should not be
shipped under that name.

**What a shippable version would need**, so this is a note and not a dead end:
either the peer-reviewed version of this paper *with* a table of condition-level
proportions, or the open data (the studies are preregistered and the OSF project
may carry trial-level responses, which would give real numerators and
denominators for a chart the deck could draw). Neither was pursued here, because
re-analysing somebody's raw data to manufacture a statistic they did not publish
is a different and larger claim than reading a table, and it is not obvious the
project should make it. Recorded so the next person starts from the block rather
than from the *Scientific American* summary.

**The Overton window pairing is now weaker, not stronger.** The paragraph in that
entry below rests on this being "an experimental scale shift on political
claims". It is a scale shift, but on *plausibility of news headlines in general*,
with the paper stating explicitly that its results are driven by plausibility
rather than veracity and that the experiments say little about whether the effect
operates on a specific topic. The Sherif and Hovland prohibition lead in that
entry is now the better of the two routes, and is unaffected by any of this.

### 24. The inverted U that was the ruler

<!-- skill: floor-and-ceiling -->

**Status: SHIPPED 2026-08-05** as `nowhere-left-to-go`, skill `floor-and-ceiling`,
category `measurement`, on a new `ceiling` shape. This is the Fazio, Rand and
Pennycook strand that grew out of the Big Lie entry above and turned out to be
its own lesson rather than a substitute for it. **The Big Lie entry itself stays
BLOCKED**, on the grounds recorded there: Levari et al. is an unpublished working
paper printing only coefficients, its figures are untabulated, and its trial-level
data are not posted. Nothing about this ship unblocks it.

**What the entry above already establishes, and this note does not repeat.**
Table 1 was read at source on 2026-08-05 and its twenty proportions with standard
deviations are copied there, along with the participant counts, the overall test,
the regression, the bootstrapped location of the peak and the two honesty items.
Read that block, not this one, for the numbers.

**The shape decision, which was the only open question and was taken on the
merits.** A new shape, `ceiling`, rather than a flag on `series`. Three reasons
and only the first was about the flag. `series` REQUIRES its two lines to swap
places and these never do, which the flag would have fixed. It also holds raw
counts with no bound to press against, and it scales its vertical axis to the
largest value in the data rather than to a fixed maximum. Both of those hide the
one thing this reveal has to show, which is how close each arm sits to a wall. On
top of that the reveal needed the peak's confidence interval drawn on the axis
against 0.50, and nothing in the deck could draw an interval on a scale at all.
Fixing one of three would have left the lesson undrawable, which is the
definition of bending the lesson to fit the shape.

**What the shape holds.** Two arms across ordered bins, the outcome's hard floor
and ceiling, the axis the bins sit on, a `neutralPoint` where an effect of
constant size would peak, and the published peak with its interval. Its schema
refuses data that would make the lesson false: a value outside the bounds, the
second arm falling below the first anywhere, or a difference that fails to fall
away at BOTH ends. Derivations live in `engine/charts/ceiling.ts` and nothing in
the data file states a difference, a mean, or where the room runs out.

**The commit beat makes "nothing either way" the correct answer**, which
`docs/hedge-audit.md` allows and which this puzzle needs. Three of the four bands
assert something about the extremes that the setup chart licenses none of, so the
band that declines to assert is where a well-reasoning player lands. The two
non-obvious distractors are refutable from the framing rather than from outside
knowledge: the noise band is answered by the printed standard deviations, which
are SMALLEST at the two ends, and the framing prints them. A test named
`PINS THE HEDGE` fails if a second hedging band is ever added.

**One thing a careful reader will challenge, recorded because it is real.** The
tallest point on the setup chart is the 61 to 70 per cent bin, and the fitted peak
is at 0.53, which falls in the 51 to 60 one. Those are two instruments and they
are not expected to agree: ten bins summarise eighty statements, and the quadratic
was fitted to all eighty separately. The reveal says so on the beat where it
matters and the provenance note says so at length. In the same spirit the reveal
records that the interval leans slightly right of 0.50 rather than straddling it
evenly, which tilts very faintly towards the trap, and that what the interval
establishes is that equality cannot be ruled out rather than that it is proved.

### Firehose of falsehood: its multi-channel ingredient SHIPPED 2026-08-05

<!-- skill: source-count-illusion -->

The objection to Paul and Matthews (2016) stands on its own terms: think-tank
perspective paper, not peer-reviewed, about one named state. **The model itself
is still not authored from and is not going to be.** What shipped is the
component claim this entry singled out, which is about method rather than about
any country, and it shipped on a better paper than the one this entry pointed at.

**SHIPPED as `one-voice-three-times`, skill `source-count-illusion`, on
`ratings`.** Weaver K, Garcia SM, Schwarz N, Miller DT, *Journal of Personality
and Social Psychology* 2007;92(5):821-833, doi `10.1037/0022-3514.92.5.821`,
supplied by Basile and read at source. Study 1A, Table 1: 177 people read
comments attributed **by name** to members of a five-person focus group, then
estimated statewide support for a fictitious policy. One comment from one
homeowner produced 56.87 per cent; three comments from three different homeowners
produced 72.18; the **same** homeowner making the same point three times produced
**65.96**, about three fifths of the way to a real chorus, with his name on every
comment and the readers knowing it.

**The multi-channel claim appears to be false.** Foster and colleagues found that
**repetition, not number of sources**, increases susceptibility to misinformation
and confidence in eyewitness accuracy, and a later meta-analysis concluded that
source variability "does not increase eyewitness suggestibility independently of
repetition". That was the lead this entry recorded, and it was read at source:
O'Donnell R, Chan JCK, Foster JL, Garry M, *Frontiers in Psychology*
2023;14:1201674, doi `10.3389/fpsyg.2023.1201674`, open access, two preregistered
experiments of 267 and 268 retained participants crossing repetition against
source variability, with meta-analytic effects of g = 0.38 [0.17, 0.59] for
repetition against g = -0.01 [-0.18, 0.15] for source variability.

**The puzzle was built on that paper first, and that build was scrapped.**
Recorded because the reason generalises. A puzzle whose correct answer is "there
is no gap" fails three ways. Its distractor "smaller but clearly there" was
**not** excluded by that interval, so a well-reasoning player could have been
marked wrong, which `docs/hedge-audit.md` calls the nastiest failure of the
three. The deck already ships `statistical-significance` under the slug
`no-difference-found`, whose whole point is that failing to find a difference is
not finding none, so the answer key would have contradicted another card. And the
actionable half of the lesson rested on Weaver anyway, cited there only through
O'Donnell's description of it. **A bounded null belongs in a deep-dive example
that labels it one, never in an answer key**, and that is where O'Donnell now
sits.

**Repetition buys the speaker, not just the claim: READ AT SOURCE 2026-08-05 AND
REFUSED.** Mattavelli S, Brambilla M, Unkelbach C. *Repeating Statements
Increases Source Credibility.* Personality and Social Psychology Bulletin 2025,
doi `10.1177/01461672251347420`, author PDF at mbrambilla.com, all four
preregistrations and data on OSF. Read cover to cover. **This entry previously
described it as worth its own build. It is not, and the reason is in the paper's
own numbers rather than in anything outside it.**

**Everything reconciles, which is what makes the refusal safe.** Every printed
effect size falls out of its printed t and n. Experiment 1: statement truth
t(44) = 6.38 over the square root of 45 gives the printed d = 0.95; source
credibility t(44) = 4.95 gives the printed d = 0.74. Experiment 2 phase one,
t(64) = 8.27 gives d = 1.03; phase two, t(64) = 2.57 gives d = 0.32. Experiment 4
recovers all three of its simple effects the same way, and its three condition
sizes of 145, 146 and 144 sum to the printed N of 435. The reading is not in
doubt.

**The solid half is already shipped, and the interesting half is not solid.**
What is rock solid here is the illusory truth effect on the statements
themselves, d around 1.0 with Bayes factors past ten to the fifth. The deck
shipped that as `illusory-truth`. The claim that would justify a new puzzle is
the *downstream* one, that repetition makes a speaker credible enough to lend
weight to claims he has not yet made, and that is the claim the four experiments
do not settle:

- **Experiment 2**, N = 65: novel statements from sources previously paired with
  repeated ones rated 3.96 (SD 0.62) against 3.76 (SD 0.51). d = 0.32
  [0.07, 0.57], p = .006.
- **Experiment 3**, N = 180, the same design with the first truth-rating phase
  removed: **no effect**. 3.76 (SD 0.55) against 3.77 (SD 0.60), d = -0.02
  [-0.17, 0.13], **BF10 = 0.09**, which is positive evidence for the null.
- **Experiment 4**, N = 435, built to resolve the conflict: main effect 3.82
  (SD 0.66) against 3.73 (SD 0.65), d = 0.12 [0.03, 0.22], p = .010, and
  **BF10 = 1.45**, which is no evidence either way. Worse for a card, the simple
  effects invert: the condition replicating Experiment 2 came out
  **non-significant** here (d = 0.08, p = .162) while the condition replicating
  Experiment 3, which had found nothing, came out significant (d = 0.14).

The authors say it themselves, and say it plainly: the downstream effect "while
positive, is likely small", each condition "may have been underpowered", and
"small differences between conditions cannot be ruled out".

**Why Experiment 1 alone cannot carry a puzzle either.** Its direct effect is
strong and well measured, sources paired with repeated statements rated 4.26
(SD 1.09) against 3.46 (SD 0.87), on forty faces pre-matched for trustworthiness
(M = 3.50, SD = 0.16). But the authors raise the obvious confound against
themselves on the same page: participants may have been confusing the judgment
target, rating the statement rather than the face. Experiments 2 to 4 exist
precisely to rule that out, and they came back inconsistent. A card asserting
that repetition buys the messenger would be asserting the thing the paper's own
follow-ups failed to establish.

**The rule this is an instance of.** A published, preregistered, competently run
paper is not automatically a Confoundle source. The question is whether the
specific claim a card would make is settled, and here the settled claim is one
the deck already teaches while the novel claim sits at BF = 1.45. Reopen if a
larger replication lands: the effect is plausible and the authors are careful,
and nothing here is a criticism of the work.

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

### Overton window: SHIPPED 2026-08-04 as the boomerang effect

<!-- skill: boomerang-effect -->

**Shipped as `boomerang-effect`, slug `the-speech-that-pushed-back`, on `rates`.**
Basile supplied the article. It was read at source and the puzzle is built on
Table 3, page 249.

**The skill is named for what shipped, not for the entry.** This entry asked for
the Overton window. What the evidence actually supports is narrower and more
useful: 69 people publicly committed to prohibition heard a stranger argue for
no restriction on alcohol at all. **19 shifted towards the speech and 16 shifted
away from it**, so the net movement was about four per cent and the speech
achieved close to nothing. The same recording played to 92 uncommitted students
netted about twenty-eight per cent, and that difference is the comparison the
paper tests, at p below .04. Same precedent as Goodhart shipping under
`threshold-bunching`: the tag was changed deliberately and both places say so.

**What was deliberately not claimed.** The paper also reports that a milder
pro-repeal talk shifted the drys more than the extreme one (twelve per cent
against four), which is the closest thing here to a literal Overton window. Its
authors say in the same paragraph that the difference **is not statistically
significant** and that the two recordings cannot be shown to have been equally
persuasive. The puzzle carries it as an explicitly labelled hint and the
provenance note says why. If somebody later finds a powered version of that
comparison, the window puzzle proper is still available.

**The counts are reconstructed and meet the standard.** Table 3 prints
percentages. Each one resolves to exactly one integer out of the printed group
size, checked by enumeration in the test file, and the three integers sum to
that group size, which is a printed quantity not used to derive them. Two small
discrepancies are recorded rather than smoothed: the drys' printed net of 4.5
does not follow from their own cells, which give 4.3, and one unused row has a
middle cell of 33.4 per cent that no integer out of 87 produces, which is what
computing a remainder by subtraction does.

---

**Status when opened: OPEN, and no longer the same puzzle as the Big Lie**

The redirect to shipped `anchoring` stands for the mechanism. But see the Big Lie
entry above: the implausibility-calibration finding is an experimental scale
shift on political claims, which is what the Overton window asserts and what
`anchoring` demonstrates only on numbers. If one paper can carry both, build one
puzzle, not two.

**Superseded 2026-08-03.** That paragraph was written before the paper was read.
Levari et al. is a scale shift on the plausibility of news headlines in general,
not on political claims in particular, and the authors say outright that their
experiments tell them little about whether the effect operates on a specific
topic. The pairing does not hold, and in any case that paper is refused for the
four reasons listed above. **Sherif and Hovland below is now the only live route
for this entry**, and it is unaffected.

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

**Updated 2026-08-04. The shape doubt is void, the better source is a journal
article rather than the book, and the block is one PDF.**

**The shape doubt no longer matters.** "Whether it reports counts rather than
scale means is unknown" was written before `ratings` existed. Either answer is
now authorable: counts go in `rates`, means on a bounded scale go in `ratings`.
This is the second entry in this section whose recorded blocker was dissolved by
a shape built for a different lesson, after whataboutism.

**Go to the article, not the book.** The prohibition experiment was published in
its own right two years before the monograph: **Hovland CI, Harvey OJ, Sherif M.
Assimilation and contrast effects in reactions to communication and attitude
change.** *Journal of Abnormal and Social Psychology* 1957;55(2):244-252, DOI
`10.1037/h0048480`. That is eight pages with its own tables, against a 218-page
book, and it is the primary report of the study this entry wants.

**Why it is a good fit, from the abstract read at source on PsycNET.** Subjects
came from a dry state where prohibition was a live issue. Each was shown a
communication taking a position some distance from their own, and the paper's own
framing is that the distance between a subject's position and the message,
together with their latitudes of acceptance and rejection, predicts how they
react. That is the Overton window stated as an experiment, and it carries the
boomerang: a message far enough away pushes people further from it rather than
towards it. Secondary accounts describe 20 statements sorted from extreme dry to
extreme wet, which if accurate makes latitude a count out of 20 and therefore
`rates`, but **that detail comes from a secondary source and has not been read at
source**, so nobody should plan the shape around it yet.

**Access, checked 2026-08-04.** PsycNET serves the abstract and then "Get Access";
no institutional entitlement appears. The record also carries an explicit
reservation of text and data mining rights, which is a reason to read a copy
rather than to scrape one.

**What has to be read off it**, so the ask is small and specific: the number of
statements in the sorting task and how many each group accepted and rejected, the
group sizes, the distances between subject position and message position that
were used, and the attitude-change outcome at each distance, including whichever
distance produced movement away from the message.

### Gaslighting: SEARCHED 2026-08-05. The stated block was FALSE, and the real one is different

**Loftus and Palmer remains a strong find and is Tier 1 item 2**, and it shipped
as `misinformation-effect`. The redirect stands.

**The rejection under it has now been searched, and it does not survive.** The
claim was that gaslighting's own literature has "no countable dataset", written
on the strength of Sweet (2019) being sociological and qualitative. That claim is
wrong, and it was wrong when it was written. A Europe PMC title search returns 98
records for `gaslighting`, of which 40 also mention a scale, questionnaire or measure,
and several are straightforwardly quantitative:

- **Experiences of care and gaslighting in patients with vulvovaginal disorders**,
  *JAMA Network Open* 2025, `PMC12062909`, open access CC BY, full text reachable through
  the Europe PMC REST endpoint. Cross-sectional survey, **447 patient responses**,
  of whom **52.8 per cent** considered stopping care because of their experiences.
  The paper exists precisely because medical gaslighting "has been described
  anecdotally in vulvovaginal patient care, but has not been quantified".
- **Workplace gaslighting: conceptualization, development, and validation of a
  scale**, *Frontiers in Psychology* 2023, `PMC10097938`. A **12-item** Gaslighting at Work
  Questionnaire developed across three samples, **total N = 679**.
- **Long covid and medical gaslighting**, *SSM Qualitative Research in Health*
  2022, `PMC9448633`. Online survey of Long Covid patients, **n = 334**.
- Several 2025 and 2026 nurse cohort studies relating workplace gaslighting to
  burnout and turnover intention.

So the countable datasets exist. **The block that actually applies was never the
one written down, and it is a shape-and-lesson problem rather than a data one.**
These instruments measure the PREVALENCE OF A REPORTED EXPERIENCE. That is a
single view of a single quantity, and this deck needs a setup and a reveal that
are two views of the same data, with the first reading wrong. A bar saying 52.8
per cent has no second reading; it is a finding, not a trap.

**And where one of them does carry a trap, the deck already ships it twice.** The
JAMA Network Open survey was completed by patients **before their first
appointment at a referral clinic**, so every respondent is someone who reached a
specialist. A figure for how many considered abandoning care, collected only from
people who did not abandon care, is a selection effect, and a good one. It is
also `self-selection` and `survivorship-bias`, both already in the registry, and this project does not put
two names on one reasoning move.

**Conclusion: CLOSED as a source of a new skill, on searched grounds rather than
assumed ones.** The correction matters even though the outcome is unchanged,
because the recorded reason was false and would have gone on being repeated. If
this entry is ever reopened, the thing to look for is not more data. It is a
gaslighting dataset where the obvious reading of the numbers is wrong, and none
of the four above is that.

**A note on neutral ground, which was not the deciding factor here.** Medical
gaslighting is live and contested, and the vulvovaginal and Long Covid literatures
sit inside arguments about whose symptom reports get believed. The deck's test is
whether the material is live, not whether our conclusion is the agreeable one, so
this would have needed care rather than avoidance. It did not get that far.

### Fearmongering: the one substantive objection, and it is narrower than written

This is the term that *was* searched, and the finding is real and should not be
softened: **Tannenbaum et al. (2015)**, *Psychological Bulletin*, 127 studies and
27,372 participants, d = 0.29, and no identified circumstances under which fear
appeals backfire. Authoring Janis and Feshbach's 1953 result as current would ship
a claim the literature does not support.

But the objection is to **one framing**, not to the topic. Two routes were left
live, and the first has since been taken.

1. **SHIPPED 2026-08-05** as entry 26, `nobody-got-worse`, skill `weaker-is-not-backfire`. Fear appeals paired
   with efficacy against fear appeals without it, which is the EPPM's actual claim
   and is not the same as "too much fear backfires". Tannenbaum was read at source
   and the efficacy moderator carried the lesson: .43 with an efficacy statement
   against .21 without, both intervals clear of zero. The skill that came out of
   it is not about fear at all, which is why it earned its own card rather than
   duplicating anything: it is that an effect which SHRINKS has not REVERSED.
2. **Still live.** The meta-analytic reversal itself as the lesson, a genuinely
   good puzzle about a famous single study that did not survive, sharing its spine
   with the dog-whistle 2018 reversal above. Note before building it that it now
   has to be told without colliding with `temporal-validity`, which shipped on 2026-08-05
   and whose own lesson text already draws the distinction between a failed
   replication and an expired finding. A card here would have to be about the
   first of those, and would need to say plainly why it is not the second.

### Astroturfing: CLOSED 2026-08-05. The shape note was right and is no longer what binds

Apollonio and Bero (2007), *American Journal of Public Health* 97(3):419-428, on
RJ Reynolds creating "Get Government Off Our Back" in 1994 while concealing its
involvement. Evidence: yes. Neutral ground: yes, tobacco is ideal. Shape: **no**,
it is a documents analysis with no numerator and no denominator. That was
correctly identified the first time and remains true.

**But a second obstacle has appeared since, and it is the decisive one.**
`source-count-illusion` shipped on 2026-08-05 as `one-voice-three-times`, under the skill name "repetition
disguised as corroboration". Its takeaway is that the sense a view is widely held
is built from how often you have met it rather than from how many people hold it,
and that one voice repeating itself buys most of what a real chorus buys.

That is the astroturfing move, from the reader's side. A player who has learned to
ask how many INDEPENDENT sources are behind a chorus has already been given
everything an astroturf card would teach. The concealment of funding is a
difference in the mechanism, not in the reasoning the player performs, and this
project does not put two names on one reasoning move.

So this closes on duplication rather than on shape, and it would still close even
if a countable astroturfing dataset turned up tomorrow. Anyone reopening it needs
a reasoning step that `source-count-illusion` does not already cover, not better data.

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

**Status: SHIPPED 2026-08-03 as `confirmation-bias`, slug `four-cards`.** Not on
Wason 1968, which this entry pinned and which turned out not to contain the
number everybody attributes to it (the refusal is recorded below and still
stands). Built instead on **Griggs RA, Cox JR. The elusive thematic-materials
effect in Wason's selection task. *British Journal of Psychology*
1982;73(3):407-420**, DOI `10.1111/j.2044-8295.1982.tb01823.x`, reached through
Wiley on institutional access and read from the rendered page.

Experiment 3 gives the entry exactly what it was after: the baseline as a
measured count rather than a quoted rate. Forty University of Florida
undergraduates each did both problems with the order counterbalanced, twenty
seeing each first. On the abstract letters-and-numbers version, **0 of 40**
chose the correct pair. On the same rule dressed as a bar checking drinking
ages, **29 of 40** did. Table 5 on page 416 is the source, and the reading
checks four ways: every one of its four columns sums to the stated group size of
20, 14 + 15 recovers the printed seventy-three per cent, and both published
chi-squares reproduce to the decimal once the continuity correction the paper
used is applied (18.6 and 20.9; uncorrected they give 21.5 and 23.3). Table 6
supplies the mechanism separately, which is what makes this a confirmation-bias
puzzle rather than a curiosity about wording: on the abstract version 29 of 40
turned the card that could only *agree* with the rule, and only 14 turned the
one that could break it.

Two honesties carried into the puzzle rather than left here. The famous "fewer
than one in ten" figure is **not** used; the paper cites it to a review rather
than measuring it. And the thematic effect is narrower than its reputation: the
same paper's Experiments 1 and 2 failed twice to reproduce it with other
realistic stories (2 of 16 and 1 of 16 against 0 of 16, no significant
difference), which is why the title calls it elusive. That failure ships as the
puzzle's deep dive instead of being quietly dropped.

---

**The Wason 1968 refusal, kept because the figure is still in circulation.** The
PDF was supplied and read on 2026-07-31. Wason 1968 is **not** the source for the
famous baseline error rate, and anyone picking this up should not go looking for
it there.

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

The second way is the one taken, via Griggs and Cox above. The null in Wason
1968 remains unused and would still make a defensible puzzle for somebody who
wants it.

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

**Status: SHIPPED 2026-08-03** as `every-word-was-true`, skill `paltering`, on
Rogers, Zeckhauser, Gino, Norton and Schweitzer (2017), `10.1037/pspi0000081`.

**The instruction in this entry was followed and it worked.** CrossRef confirmed
the citation; the article is closed access, but the accepted manuscript is public
on the HBS publication server and carries the published journal furniture, so it
is the version of record rather than the 2014 working paper. Study 4B prints its
counts, so nothing is reconstructed, which is the first source in a while that
needed no argument.

**The tables check each other, which is better than either alone.** Table 4's
cells for people who actually paltered, 38 in one condition and 10 in the other,
sum to the 48 eligible dyads Table 5 reports; the actually-honest cells, 2 and
26, sum to its 28. Neither table states those totals as totals. The impasse rates
built from Table 5, 7 of 47 against 1 of 51, recover the 15 and 2 per cent in the
text and reproduce the published chi-square of 5.46 to the second decimal.

**One discrepancy is left standing.** Table 4's honest condition lists 10, 26, 3,
8 and 3, which is 50, while Table 5 gives 51 dyads. All five percentages recover
against 51, and so does the printed 49 per cent for non-honest behaviour, so 51
is right and one participant is missing from the breakdown. The paper does not
explain it and the provenance note does not pretend to.

**Design note.** The puzzle uses the impasse rate rather than the profit
comparison, because the profit figures are means with t-tests and this deck
cannot author means as counts. It is also the better lesson: the cost of
paltering is not that you earn less on the deals you close, it is that the deal
falls over.

The original research record follows.

**Sourcing status: LEAD.** Deceiving by stating things that are individually true while
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

**Status: SHIPPED 2026-08-03** as `just-asking`, skill `innuendo-effect`, on
Letourneau and Gawronski (2024), `10.1027/1864-9335/a000540`, Experiment 1.

**Everything below was right and nothing below needed changing.** The shape was
missing, then it existed; the numbers were extracted, then the PDF arrived and
Table 1 was read on the rendered page. It matches the extraction exactly, which
is the first time this session that a table survived extraction intact. The
design question was settled in advance and shipped as settled.

**The reading is confirmed three ways beyond the table.** Every degrees of
freedom figure recovers N = 150, since F(3, 447), F(2, 298), F(6, 894) and the
t(149) used throughout are all built on 149. The two experiments are stated as
150 and 356 and the abstract gives 506, which is their sum. And the significance
pattern is printed separately in the text for nonpolitical targets: question
t(149) = 2.90, p = .004; assertion t(149) = 6.88, p < .001; denial t(149) =
1.53, p = .129.

**The hedge is the correct answer, and that is the whole design.** Shape A was a
magnitude guess and shape B would have marked a good reasoner wrong, both
rejected below. So the commit beat offers three confident bands, each built from
a real mechanism, and none of them licensed by a setup showing only a neutral
headline and an assertion. Declining to guess is the right move, and the reveal
then delivers the finding as a surprise earned from the data rather than taken
from the reader. This is the deck's clearest instance of the policy in
`CLAUDE.md` doing real work rather than merely being satisfied.

**Only the nonpolitical target is used.** The political ingroup and outgroup
conditions would mean naming parties, and the nonpolitical row carries the whole
finding on its own. The partisanship null goes in the deep dive, where it is
more useful anyway: the question effect did not differ significantly across
target groups, so the technique works on your own side as well as the other.

One small thing recorded in the test file for whoever meets it next: the
question gap is exactly 0.335, which sits on a rounding boundary, and in binary
floating point it lands a hair under, so two decimals give 0.33 rather than
0.34. Nothing in the puzzle quotes either figure to two decimals.

The original research record follows.

**Sourcing status: READ AT SOURCE 2026-07-31, and it fails this deck's test.** Both
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

**Status: SHIPPED 2026-08-03** as `not-me-though`, skill `third-person-effect`,
on Gunther (1995), `10.1111/j.1460-2466.1995.tb00712.x`.

**The two refusals below stand. What changed is the deck, not the paper.** The
counts genuinely are unrecoverable, and nothing in the puzzle rests on them. The
block was never really about this paper: it was that the deck could only draw
counts, while whole literatures measure their outcome as a rating. So the fix
was the `ratings` shape, which draws a mean on the scale it was measured on,
with the source's own dispersion when it prints one.

**Why the scale is the shape rather than a decoration.** A bar from zero to 3.23
says nothing: zero is not where the scale starts and 3.23 is not a quantity of
anything. The finding is not that one mean exceeds another by 0.39. It is that
on a scale where 3 means *no effect at all*, people put themselves at 3.23 and
everybody else at 3.62. Without the anchor drawn on the axis, that is invisible,
which is why the schema requires the scale endpoints to be named and refuses an
anchor without a label.

**What was checked, since means do not reconcile the way counts do.** All seven
of Table 1's printed differences between the self and others columns reproduce
exactly from the two means beside them. The male and female subsample sizes, 230
and 262, sum to the 492 of the combined measure, a total neither row states. And
the 19 and 20 per cent in the text sum to the 39 per cent the discussion gives
for respondents not showing the perception. Three independent checks, none of
them used to derive anything.

**The shape also unblocks entry 15, but that entry stays blocked for a different
reason.** Its 2024 replication is closed access with no open-access location
anywhere, so Table 1 cannot be re-read from the rendered page, and this project
does not author from a machine extraction. Entry 15 now needs one thing only:
the PDF.

The original research record follows.

**Sourcing status: LEAD, and the most self-implicating lesson in the queue.** People
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

**Status: CLOSED 2026-08-03 as review items, not a puzzle. This entry needs no
further work.** The instruction below was to ship it as review items if nothing
with counts turned up, the same judgement made for Neyman bias, and nothing did.

**But the home named below was wrong, and the better one now exists.** The
entry suggested filing it under `self-applied-label` or `publication-bias`.
Neither fits: the first is about what a thing calls itself and the second about
what never got published. Quoting out of context is a species of **paltering**,
which shipped as entry 14. Every quoted word is genuine and the impression is
false, which is the paltering test exactly; all that differs is whose true
statements are being selected. The defence is the same one the paltering lesson
already gives, which is to go and look at what was actually asked and answered.

So eight items ship under `paltering`, six traps and two sound, covering the
clipped conditional, the quoted objection, the load-bearing ellipsis, the answer
to a different question, the hostile summary read back, and the selective sample
of quotations. That last one matters most, because a set of quotations is a
sample and almost nobody treats it as one.

**The tag on this entry deliberately stays `quote-mining` rather than becoming
`paltering`.** `docsCoverage.test.ts` requires any entry tagged with a
registered skill to say SHIPPED, and two entries both claiming to have shipped
`paltering` would make the coverage record say something false. The skill id
`quote-mining` is not in the registry and never will be, which is the accurate
state of affairs.

### 22. Small things feel bigger than they are

<!-- skill: magnitude-compression -->

**Status: SHIPPED 2026-08-04** as `how-big-is-denmark`, skill
`magnitude-compression`, on the new `magnitude` shape. Everything below is the
research note it shipped from, kept because the reconciliation is the record.

**What shipped.** Seven of the twenty-six regions, ascending by true size:
Denmark, Greece, Japan, Peru, Greenland, Australia, Brazil. The setup draws the
mean guesses alone, correctly ordered and reading as competence; the reveal adds
the true size under each without moving a bar. Greenland is the intuitive trap,
because everybody has heard the Mercator story and Greenland turns out to be
less distorted than fifteen of the study's other regions. Denmark is the answer,
at twenty-six times. Peru stays in the figure at 165 against a true 166, so the
figure cannot be read as "people are simply bad at this".

**The wording that is load-bearing.** Brazil is the furthest off in raw units,
by 473 of them, and Brazil is on the answer list, so the question asks which
country was wrong by the biggest **multiple** of its real size. That is the
`statistical-power` move, a discriminator in the framing rather than a reader
marked wrong for a reasonable reading, and there is a test named
`PINS THE WORDING` that fails if the word ever leaves the question.

**Where it came from.** Entry 4 went looking for a study of what people believe
about the sizes of countries, in order to ship map-projection distortion as a
measured misconception. The study exists, and it refutes the projection story.
What it shows instead is a cleaner and more general trap, and one the deck has
nothing on: **people's sense of magnitude is compressed**. Small quantities are
overestimated by enormous factors, large ones are underestimated, and the two
errors point in opposite directions, so a list of estimates can look like a
sensible ranking while being wrong at both ends at once.

**The source.** Battersby SE, Montello DR. Area estimation of world regions and
the projection of the global-scale cognitive map. Annals of the Association of
American Geographers 2009;99(2):273-291, doi 10.1080/00045600802683734, author
copy at `people.geog.ucsb.edu/~montello/pubs/area_estim.pdf`. Study 1: 194
students were given twenty-six region names, told that the area of the lower 48
states is 1,000 units, and asked to write a number for each. No maps were shown.
Study 2 repeats it with a graphical slider and 33 students; the ordering is
nearly the same but the sample is small, so build on Study 1.

**Reconciliation, done and recorded.** Table 1 prints each region's area in
square kilometres and its modulus area relative to the conterminous United
States at 1,000; Tables 3 and 5 print that modulus again to one decimal place in
separately typeset columns. All twenty-six recompute exactly from the printed
square kilometres against the printed 7,809,158 for the conterminous United
States, matching the integer column and the one-decimal column both. That is the
"reproduces a printed quantity not used to derive it" test, passed twenty-six
times over. Two further checks agree with the paper's own statistics: the
correlation between log estimate-over-truth and mean absolute latitude comes to
+0.19 across regions, against the 0.17 the paper reports within participants, and
the slope of log mean estimate on log true size is 0.41, below 1 in the same
direction as the paper's mean per-participant exponent of 0.56. Those last two
are different estimators from the paper's and must not be presented as
reproducing them; they agree in sign and rough size, which is all that is
claimed.

**The data, true modulus (lower 48 = 1,000) then mean estimate, Study 1.**

Denmark 5.3 / 140. Switzerland 5.4 / 146. Austria 10.6 / 159. Guatemala 14.1 /
118. North Korea 15.7 / 180. Greece 16.1 / 179. New Zealand 34.2 / 193. Italy
38.6 / 177. Norway 39.2 / 205. Vietnam 41.3 / 164. Japan 47.5 / 269. Sweden 56.6
/ 184. Spain 64.4 / 264. Venezuela 117.0 / 183. Ethiopia 145.2 / 169. South
Africa 156.2 / 393. Peru 166.0 / 165. Alaska 192.0 / 318. Mexico 250.2 / 569.
Greenland 271.2 / 520. India 403.8 / 754. Australia 985.3 / 740. Brazil 1,087.6 /
615. China 1,199.4 / 1,409. Antarctica 1,572.2 / 1,225. Russia 2,163.8 / 2,077.

Switzerland is put at 27 times its real size and Denmark at 26. Brazil is put at
0.57 of its real size and Australia at 0.75. Peru lands at 0.99, which is worth
keeping in whichever subset ships, because a puzzle where every guess is wrong
teaches less than one where the accurate guess sits in the middle of the range
and shows that the error is a function of size rather than of ignorance.

**Why no existing shape holds it.** `estimation` is the closest and does not fit:
it takes exactly two groups estimating one quantity, and its guard requires both
estimates to fall below the true value, which is the anchoring design and the
opposite of what happens here. `salience` carries several comparisons but they
are binary choices with a share who picked correctly, not magnitudes. `dose`
requires a zero baseline and front-loading. `ratings` needs a bounded scale.
`regression` means something else entirely. So this is a new shape, on the order
of `bunching`: a union member, a derivation module with a test, a renderer, a
`DataViewRenderer` case, scope labels in all ten locales, and a share-card glyph.
Roughly: a list of items each carrying a true magnitude and an estimated one, a
setup view drawing the estimates alone, and a reveal view drawing them against
the truth on the scale that makes both ends visible at once. The scale is the
hard part, because 5.3 and 2,163.8 have to share an axis with 140 and 2,077.

**The commit beat, which is the open design question.** The setup can honestly
show the guesses alone, labelled by country, because the reader brings their own
knowledge of which countries are small. The question then asks which end of the
list the guesses went wrong at, with bands for the largest countries, the
smallest countries, evenly across the range, and no way to tell. That is
answerable from the setup by anyone who knows Denmark is small, the surprise
stays in the reveal (26 times, not 26 per cent), and no two bands share the
direction the skill licenses. Worth checking against `docs/hedge-audit.md`
properly before authoring rather than taking the sketch above on trust.

**Non-duplication.** `anchoring` uses estimates but its lesson is that a number
you were shown moves your guess. Here nobody is shown anything; the distortion
is in the scale sense itself. `mean-vs-median` and `misleading-axis` are about
how a number is drawn, not about what a person believes before any drawing
happens.

**If a countable study ever turns up, reopen it.** The right shape would be a
content analysis of a fixed public text where somebody counted how many
quotations reversed the source's meaning. That is a possible study; it does not
appear to exist yet.

The original research record follows.

**Sourcing status: LEAD, and the weakest source position of the eight.** Selective
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

### 23. Two hospitals hit the same target and ran opposite departments

<!-- skill: campbells-law -->

**Status: SHIPPED 2026-08-04** as `both-hit-the-target`, skill `campbells-law`,
on the new `target` shape. This is the imposed-target half of entry 8, which
shipped only its self-set half as `threshold-bunching`. Campbell's law proper
needs a principal imposing a target on an agent, and that is what this is.

**What shipped, and the one design decision worth recording.** The commit beat
makes "There is no way to tell from this" the CORRECT answer, which
`docs/hedge-audit.md` explicitly allows and which this puzzle needs. The skill
licenses exactly one thing, that the compliance figure does not separate the two
departments, so any second band saying the same thing in different words would
mark a well-reasoning player wrong for picking the hedge. An earlier draft had
one, reading "almost nothing, and the number cannot tell you", and it was
removed. A test named `PINS THE HEDGE` fails if another such band ever appears.

**The source, re-read at source 2026-08-04.** Eatock J, Cooke M, Young TP.
Performing or not performing: what's in a target? Future Healthcare Journal
2017;4(3):167-172, doi `10.7861/futurehosp.4-3-167`, PMCID PMC6502571, open
access. Two English A&E departments, 2014/15, matched on age and arrival
profile. Both meet the 95 per cent four-hour target and look identical doing it:
**4.68 per cent of attendances breached at Hospital A, 4.49 per cent at Hospital
B**, on annual attendances of **148,999 and 108,698**. Inside the window they are
running different departments: **20.83 per cent of A's patients leave between
three hours forty and four hours, against 8.56 per cent of B's**. Every figure in
this paragraph was confirmed against the article text in this pass.

**Why the block has expired, and it is the same kind of expiry as entry 4's.**
The recorded objection was that the paper prints percentages and no bin counts,
and that "inventing a share-shaped data type to get round that would be building
a loophole in the central convention". That last clause is not what the deck
actually does, and it was already not true when it was written. `framing`,
`distribution`, `dose`, `estimation` and now `magnitude` all author published
values that are not counts, each with a comment in `schema.ts` calling it a
deliberate exception and each putting a note on the figure saying so. `framing`
states the reasoning in terms that fit this paper exactly: the source prints
percentages and N and never the numerators, 72 per cent of 152 is 109.44, so
there is no integer to author and rounding to one would be inventing data. Here
20.83 per cent of 148,999 is 31,036 point something, and the enumeration recorded
under entry 8 is right that no unique integer exists. That is the `framing`
situation, not a new loophole.

**And there is a stronger argument that was missed.** The rule these shapes bend
is "never hardcode a percentage that could contradict the counts", and its whole
purpose is to stop a printed rate drifting from counts that exist. Here the
comparison is between two departments of **different sizes**, 148,999 against
108,698, so raw counts would be the wrong unit and shares are the right one. A
bar of 31,036 against a bar of 9,304 would say A pushes out three times as many
patients late, which is a fact about how big A is. Authoring shares is not a
workaround here; it is the only honest representation of the comparison, in
exactly the way `framing` compares two wordings with different Ns.

**What must not be claimed.** The paper's most striking single number, that 15.82
per cent of Hospital A's patients leave in the final ten minutes, is printed for A
but the corresponding figure for B is not stated in the text, and the
ten-minute profile that carries it is Fig 2, a chart that is never tabulated. So
"a peak entirely absent at B", as entry 8 words it, cannot be asserted from
printed numbers. The reveal does not need it: 20.83 against 8.56 in the final
twenty minutes is printed for both hospitals and is the whole lesson. Anything
read off Fig 2 by eye stays out.

**The design.** Setup: two departments, same imposed target, near-identical
compliance, 4.68 and 4.49 per cent breaching. The obvious reading is that the
target is doing its job and the two are interchangeable. Reveal: where inside the
four hours each department actually discharges people. Same target, same
headline, opposite behaviour, and the paper's own line for it is that the
information is not visible simply by monitoring the single existing metric.

**Open questions for whoever builds it.** Whether this needs a new shape or an
optional extension to an existing one: `bunching` is the near relative and
cannot hold it, since its bins are integer counts and its guard compares two
adjacent bins across a line, whereas this is two series of shares over the same
window. The commit beat needs working out against `docs/hedge-audit.md` before
authoring, because "both hospitals meet the target" is true and the question has
to ask something the setup licenses. Non-partisanship is clean: two anonymised
English hospitals, no party, no living side made to look foolish.

**Route 1 of entry 8 stays closed.** Going to Hospital Episode Statistics for real
counts would de-anonymise two trusts whose authors chose not to name them. That
was flagged as a call for a human and nothing here changes it. This entry does not
need it.

---

### 25. The effect that stopped working because the world moved

<!-- skill: temporal-validity -->

**Status: SHIPPED 2026-08-05** as `back-where-it-started`, skill
`temporal-validity`, on `ratings`. Extracted from the dog whistling entry above,
which was refused on neutral ground the same day, then routed through two closed
candidates before landing. **Numbered 25 rather than 24 because 24 was claimed by
the floor-and-ceiling pull request**, and a duplicate number is worse than a gap.

**The adjacency question this entry raised is settled, and the answer shaped the
build.** The Moss source carries two possible spines: the decay of the regimen
itself, and the masking of that decay by a newer drug entering the pooled
average. The masking is the more surprising of the two and it is also
**Simpson's-adjacent**, since the mechanism is an unequal mix across strata,
which is what `simpsons-paradox` already ships on kidney stones. Putting two
names on one reasoning move is the thing the deck refuses to do, so the masking
is **not** the skill. It is the reveal's mechanism and the lesson's second
warning, while the spine is temporal: a measured effect is a fact about a drug,
a bug and a year, and only one of those appears on the prescription. The
distinguishing move against every disaggregation puzzle in the deck is stated in
`howItWorks`: with case mix you want your own stratum, whereas here you want to
**discard** the old stratum, and a failed replication and an expired finding look
identical on the page while calling for opposite responses.

**The trap.** A careful experiment establishes an effect. Years later a careful
replication finds nothing. The reflex is to decide that one of the two was done
badly, usually the older one, and that the effect was never real. There is a third
possibility that is often the right one: **both studies measured correctly and the
population changed in between**. Kevin Munger's name for the property a finding
lacks in that case is *temporal validity*, and it is worth having a word for,
because without one the only available readings are "the first team was sloppy"
and "the second team botched the replication".

**Why it belongs in this deck.** It is the failure mode behind a great deal of
confident argument from evidence: quoting a 1990s effect size at 2026 as though
findings do not expire, and equally, treating a failed replication as a verdict on
the original researchers. It also cuts against the deck's own instincts, since
every puzzle here rests on a published number and the honest version of that has a
date attached.

**What it needs, and this is the hard part.** A neutral case where the SAME
intervention was measured twice, far enough apart that the world moved, with
counts or means printed at both times, and where the change in the population is
documented rather than assumed. All three parts matter. Without the documented
population change the puzzle is indistinguishable from an ordinary failed
replication, which is a different and much duller lesson.

**The one candidate was READ AT SOURCE 2026-08-05, AND IT DOES NOT FIT.** The
reservation recorded when this entry was written turned out to be right. The
candidate is closed and the entry still needs a source.

Bratsberg B, Rogeberg O. *Flynn effect and its reversal are both environmentally
caused.* PNAS 2018;115(26):6674-6678, doi `10.1073/pnas.1718793115`, PMC6042097,
open access. Norwegian military conscription records, **736,808 men** with valid
scores across birth cohorts 1962 to 1991, ability stanines converted by
IQ = 100 + 7.5 x (stanine minus 5). The average rose from **99.5** for the 1962
cohort to **102.3** for 1975, fell to **99.4** by 1989 and recovered slightly to
**99.7** by 1991. The rise runs at +0.20 points a year within families
[0.11, 0.29] against +0.18 across families [0.14, 0.21]; the fall runs at
**-0.33 within families [0.26, 0.40] against -0.34 across [0.30, 0.38]**, a
within-to-across ratio of **0.98 [0.79, 1.20]**.

**It is a good paper and the wrong lesson, exactly as suspected.** Its punchline
is that the compositional explanation fails: the decline shows up between
brothers inside one family, so it is not a matter of which people are being born.
In this deck's vocabulary that is a **confounding** lesson, near neighbours of
which are already shipped, and it is not the temporal-validity move at all.
Nothing here concerns a finding whose truth conditions expired.

**Two further reasons it could not ship even as its own puzzle.** First and
decisively, **neutral ground fails**. To make the reveal land, the setup has to
put the compositional hypotheses into the reader's head, and in this literature
those are immigration and differential fertility by education. A card inviting a
reader to suspect that the population changed, in order to then correct them, is
handling the most charged material in psychometrics, and the file's own test asks
whether there is a version whose parties and people are extinct. There is not.
Note that dog whistling was refused on this same test even though its finding was
solid and its conclusion unobjectionable: the test is about whether the material
is live, not about whether our conclusion is the agreeable one. Second, the shape
is doubtful. Only four cohort values appear as numbers anywhere in the main text,
and the thirty-cohort series in Figure 1A is **not tabulated**, which is the wall
that stopped the Campbell's law profile. The PNAS supporting information was not
reachable from two guessed URLs, so that half is unresolved rather than settled,
and it does not need to be resolved because the first reason is sufficient.

**What would fit better, and the strongest lead now that Flynn is closed:** a
**clinical treatment whose effect genuinely expired because the target changed**,
with counts printed at both times. Antimicrobial susceptibility is the obvious
place to look, since surveillance data print numerators and denominators and the
organism changing is documented rather than inferred. The reasoning trap is real
and often committed: a trial from the 1990s reports a high cure rate, a modern
one reports a poor one, and the reflex is to suspect the old trial rather than to
notice that the pathogen is no longer the same pathogen. That is temporal
validity with nothing charged about it, and it sits in Basile's own field.

#### SOURCED 2026-08-05, and the source carries a second trap the entry did not anticipate

**Moss SF, Chey WD, Daniele P, Pelletier C, Jacob R, Tremblay G, Hubscher E,
Leifke E, Malfertheiner P.** *Brief communication: global temporal trends in the
efficacy of clarithromycin-based regimens for the treatment of Helicobacter
pylori infection.* Therapeutic Advances in Gastroenterology 2023;16:
17562848231167284, doi `10.1177/17562848231167284`. Open access. **Read via the
publisher's full-text page, not yet from the PDF**, which is the one gap in this
note and should be closed before authoring.

**It clears the shape bar decisively, which is the thing that killed Flynn.**
Table 1, "Included studies", prints per study: authors, year, country, treatment
type, duration, N, **ITT (N), ITT (n)** and ITT per cent. Numerators and
denominators, per arm. 38 randomised trials, 67 study arms, East Asian, South
Asian and Western including North America, inception to May 2021. Table 2 gives
time-stratified pooled eradication rates.

**Table 2, PPI-based clarithromycin triple therapy, eradication by publication
period:**

| Period | Eradication | 95% CI |
|---|---|---|
| Pre-2001 | 83.04% | 77.99 to 87.12 |
| 2001-2005 | 82.33% | 80.03 to 84.42 |
| 2006-2010 | 79.14% | 71.21 to 85.33 |
| 2011-2015 | 75.02% | 66.17 to 82.18 |
| Post-2015 | **72.43%** | 68.72 to 75.85 |

A fall of about eleven points across 23 years, **0.62 per cent a year,
p = 0.0287**, with the negative trend for PPI triple therapies significant at
p = 0.0315. Same regimen, same trial design, different organism. That is the
temporal-validity lesson in printed counts.

**And the second trap, which is better than the first.** Pool every arm together,
including the newer vonoprazan-based ones, and **the decline stops being
significant, p = 0.3910**. The post-2015 pooled figure reads 82.00 per cent
instead of 72.43, because vonoprazan is a more effective acid suppressor
(+14.81%, p < 0.0001) whose trials are concentrated in the recent years.
Extrapolated to 2022 the paper puts vonoprazan at 84.20 per cent against every
PPI at or below 70. **So the literature's headline number for "clarithromycin
triple therapy" can look stable while the version a prescriber actually reaches
for has decayed by more than a tenth.** Setup and reveal would be the same 67
arms, pooled and then split by acid suppressor.

**One design question to settle before building, and it is the reason this says
SOURCED rather than READY.** The masking version is arguably a
composition lesson rather than a temporal one, and the deck already ships
`simpsons-paradox` on kidney stones and several other disaggregation puzzles. The
distinguishing feature, if there is one, is that the confounder here is *when a
regimen entered the evidence base*, and the practical error is not "look at your
own subgroup" but "the old arm is obsolete, and the pooled figure is quoting it
at you". Work out whether that is a second move or the same move with a new coat
before choosing which of the two framings is the spine, and if the masking wins,
reconsider whether `temporal-validity` is still the right skill id, since the tag
in this entry is the contract that `docsCoverage.test.ts` checks.

**Sequencing note.** The decline framing asks the reader to predict a magnitude
and is guessable in direction, since everybody knows resistance exists, so it
would need the yardstick pinned in the framing the way `statistical-power` does.
The masking framing is genuinely non-obvious. Prefer the masking framing if the
adjacency check clears it.

Also worth checking: an educational or preventive intervention with a published
effect in one decade and a published null in another, where the second paper
establishes what changed about the people rather than speculating. Prevention
trials against a falling baseline rate are the most likely place, since a
shrinking baseline mechanically shrinks the absolute effect and that literature
tends to say so out loud.

**Do not author this from the racial priming papers.** That route is closed and
the reasons are recorded above under dog whistling. They are about neutral ground
and about what a Confoundle chart would have to put on its x axis, and neither
weakens with time.

---

### 26. Weaker is not the same as backfired

<!-- skill: weaker-is-not-backfire -->

**Status: SHIPPED 2026-08-05** as `nobody-got-worse`, skill
`weaker-is-not-backfire`, on the new `forest` shape. Extracted from the
fearmongering entry above, whose recorded objection was to one framing and not
to the topic, and which named this as live route 1.

**Read at source**, not from an abstract: Tannenbaum MB, Hepler J, Zimmerman RS,
Saul L, Jacobs S, Wilson K, Albarracin D. *Appealing to fear: a meta-analysis of
fear appeal effectiveness and theories.* Psychological Bulletin
2015;141(6):1178-1204, doi `10.1037/a0039729`, PMID 26501228, PMCID PMC5789790.
The full text was read in the browser from the Europe PMC rendering of the author
manuscript, and Table 1 and Table 5 were transcribed from the page rather than
from any summary. Note for anyone re-checking it: `isOpenAccess` is **N** and the
`fullTextXML` REST endpoint 404s, because this is an NIH author manuscript that
is free to read but not open-access licensed. The PMC copy sits behind a bot
check that must not be worked around; the Europe PMC copy does not.

**Why this is not the fearmongering framing that was refused.** The refused
version would have authored Janis and Feshbach's 1953 result as current, which
the literature does not support. This one is built on what replaced it, and the
lesson is not "fear appeals work" but the reasoning distinction the paper itself
draws in order to test it.

**The paper names the reasoning move, which is what made it authorable.** From
the running text, verbatim: "There are two forms of the efficacy statement
hypothesis. The strong hypothesis is that fear appeals without efficacy
statements will produce negative effects (i.e., will backfire). The weak
hypothesis is that fear appeals without efficacy statements will produce weaker
(i.e., less positive or null) effects relative to fear appeals with efficacy
statements." And the verdict: "The results clearly support the weak efficacy
hypothesis and disconfirm the strong efficacy hypothesis. Thus, fear appeals are
effective with or without efficacy statements, but the inclusion of efficacy
statements is associated with increased effectiveness."

That is the skill in one sentence: an effect that shrinks is not an effect that
reverses, and the two get read as the same thing constantly.

**The numbers drawn, Table 5, transcribed from the rendered table.**

| Row | d | 95% CI | k |
|---|---|---|---|
| Overall (Results text) | 0.29 | [0.22, 0.35] | 248 |
| Efficacy statements included | .43 | [.31, .55] | 92 |
| Efficacy statements excluded | .21 | [.13, .29] | 154 |

**The reconciliation, and it holds.** 92 + 154 = 246 against a total k of 248,
so two samples are unclassified on efficacy, which the card records rather than
hides. Weighting the two subgroups by k gives (92 x .43 + 154 x .21) / 246 =
0.292, against the printed overall of 0.29. That is a consistency check and not
an identity, because the pooled figures are random-effects estimates whose
weights are not k, and the card says so. It is strong enough to carry the commit
beat: a negative value for the excluded arm cannot be reconciled with a pooled
0.29, which is what makes the puzzle answerable rather than a guess.

**Also from the paper, and used.** The sign convention is the paper's own: "a
positive effect size indicates the fear appeal worked, whereas a negative effect
size indicates the fear appeal backfired". Table 1 records the verdict on each
theory, including the curvilinear model's prediction that high fear does worse
than moderate fear, marked **Not supported**, and the strong efficacy hypothesis,
also **Not supported**. The abstract concludes "there are no identified
circumstances under which they backfire and lead to undesirable outcomes".

**One thing deliberately not built on.** The curvilinear test (moderate versus
high depicted fear, d = -.05, 95% CI [-.34, .24]) is a wide null and the paper
itself says the conclusion "should be confirmed in future research". It is
mentioned in the deep dive as a second instance of the same reading error, and
nothing on the card rests on it. Absence of evidence with an interval that wide
is not a finding this deck will draw.

**Neutral ground: yes.** The pooled evidence spans dental hygiene, driving
safety, smoking and drink, and the card is written on the general question rather
than on any live public-health argument.

---

### 27. The trial won on a composite, and the win is in the softest part of it

<!-- skill: composite-endpoints -->

**Status: SOURCED AT THE REVIEW LEVEL 2026-08-05, and one thing is still missing
before it can be authored.** Read at source: Cordoba G, Schwartz L, Woloshin S,
Bae H, Gotzsche PC. *Definition, reporting, and interpretation of composite
outcomes in clinical trials: systematic review.* BMJ 2010;341:c3920, `PMC2923692`, open
access, full text reachable through the Europe PMC REST endpoint.

**Why this is a gap worth filling.** The syllabus audit's own conclusion is that
the deck's holes cluster in trial appraisal rather than in exotic named biases,
and composite endpoints are **rang A in France**, meaning every doctor is required
to know them. The registry has `intention-to-treat` and `statistical-vs-clinical-significance` but nothing on composites.

**What the review establishes, transcribed from the paper.** Of **40** trials
published in 2008 reporting a binary composite outcome, **29 (73%)** were
cardiovascular and **24 (60%)** were entirely or partly industry funded.
Composites had a median of **three** components (range 2 to 9). Death or
cardiovascular death was the most important component in **33 (83%)**. Only
**one** trial gave a good rationale for its choice of components. The reviewers
judged the components **not** of similar importance in **28 (70%)**, and in **20**
of those, death was combined with hospital admission. The definition of the
composite changed between the abstract, methods and results sections in **13**
trials. In **4 (10%)** the authors said outright that the composite was created
post hoc, and in **3** of those the prespecified composite had not been
statistically significant.

The paper also states the mechanism plainly, and this sentence is the lesson:

> the effect is often smallest for the most important component of the outcome
> and biggest for the less important components

**FOUND 2026-08-06, and this entry is now READY TO AUTHOR.** The missing piece
was one study printing a composite alongside its components on one dataset. It
turned out to be better than that. Read at source on ScienceDirect, where it sits
under an Elsevier user license as an open archive:

> Kip KE, Hollabaugh K, Marroquin OC, Williams DO. *The problem with composite end
> points in cardiovascular studies: the story of major adverse cardiac events and
> percutaneous coronary intervention.* J Am Coll Cardiol 2008;51(7):701-707. doi
> 10.1016/j.jacc.2007.10.034, PMID 18279733.

**Why it is better than what the entry asked for.** The entry wanted a trial whose
composite won while its hard component stayed flat. Kip does something stronger:
it takes ONE cohort and re-runs it under THREE definitions of MACE, so the setup
and the reveal are not two components of one composite, they are the same patients
and the same events counted two ways. Nothing is recomputed by this deck and
nothing is compared across studies.

**The dataset.** The DEScover registry, **6,922 patients** who received at least
one drug-eluting stent and did not present in cardiogenic shock, across 140 US
hospitals, followed one year.

**The three definitions and their event counts.**

| Definition | Events in one year |
|---|---|
| Death, MI or stent thrombosis (safety only) | **362** |
| Death, MI, ST or target vessel revascularisation | **674** |
| Death, MI, ST or any repeat revascularisation | **868** |

**And now the part that makes the card.** Two subgroup comparisons, on those same
6,922 patients, move in OPPOSITE directions as the definition widens. Adjusted
hazard ratios with 95 per cent intervals, as printed:

| Comparison | Safety only | Plus TVR | Plus any revascularisation |
|---|---|---|---|
| Presented with acute MI vs not | **1.75** [1.31, 2.34] | 1.20 [0.95, 1.51] | 1.14 [0.92, 1.40] |
| Multilesion vs single-lesion PCI | 1.06 [0.77, 1.48] | **1.41** [1.13, 1.75] | not printed |

So acute MI looks clearly worse on the safety definition and that finding
DISAPPEARS once revascularisation is added, while multilesion PCI looks fine on
the safety definition and becomes clearly worse once it is added. Same cohort,
same year, same event log. Only the outcome definition changed, and it decided
both answers, in opposite directions.

**The skill this actually teaches**, and it is not quite what this entry was
originally sketched as: a composite outcome is a CHOICE, and the choice can
determine the result. That is distinct from `weaker-is-not-backfire`, which is about confusing a
smaller effect with a reversed one, and distinct from `effect-modification-vs-confounding`. The tag on this entry
already says `composite-endpoints` and that still fits.

**What must be said on the card, because it is not an RCT.** DEScover is a
prospective observational registry, not a randomised trial, and these are
covariate-adjusted hazard ratios rather than randomised comparisons: adjusted for
age, sex, urgent or emergent presentation, smoking, number of diseased vessels,
diabetes, congestive heart failure, peripheral vascular disease, renal dysfunction
or dialysis, and pulmonary disease. The subgroups are also not randomised to each
other, so none of this licenses a causal claim about acute MI or multilesion PCI.
The card's claim is narrower and survives all of that: the definition moved the
answer. Also to be disclosed, since this deck discloses it: the study was
supported in part by Cordis Corporation, a Johnson and Johnson company, and two
authors received research support from Cordis while two served as its consultants.

**Shape: `forest`, which already exists and fits this exactly.** It was built for
`weaker-is-not-backfire` the day before and draws several estimates with their intervals against a
named null line, deriving which side each falls on and whether an interval clears
the line. Here `nullValue` is 1 rather than 0, since these are hazard ratios, and the
whole lesson is visible in one figure: on the safety definition the acute MI
interval sits clear of 1 and the multilesion interval straddles it, and when
revascularisation is added they swap. No new shape, no schema change.

Note that the earlier guess in this entry, that the card would be `rates` with a
stratified reveal, was wrong, and wrong in an instructive way: it assumed the card
would compare a composite against its own components. The better card compares one
composite against ANOTHER composite on the same patients, which is a different
figure entirely.

**Neutral ground: yes**, on the usual condition that the trial chosen is not one
currently being argued about in public.

### Named on a national curriculum, absent from the registry, not yet worked

The audit records that France's intitulés de connaissance mark these **rang A**,
which is the "every doctor must know it" tier, and the registry has none of them.
Listed here so the queue is not empty rather than as researched entries; each
needs the full treatment before it is numbered.

- **Overdiagnosis.** Distinct from `lead-time-bias` and `length-time-bias`, both shipped: those are
  about when the clock starts and which cases get caught, this is about disease
  that would never have surfaced. Needs a source printing counts, and screening
  data is politically live, so neutral ground needs thought rather than assumption.
- **Prevalence-incidence (Neyman) bias.** Cases that resolve or kill quickly are
  missing from a prevalent sample, so a survey of survivors misdescribes the
  disease. Adjacent to `survivorship-bias` and would have to earn its place against it.
- **Per-protocol versus intention to treat.** `intention-to-treat` ships the principle; the
  counterpart card would be the per-protocol analysis that looks better precisely
  because it drops the people for whom the treatment did not work.
- **Blinding, and specifically performance bias.** Corrected after review, because
  the first draft of this line got the taxonomy wrong and it matters here. Cochrane
  separates two channels. **Detection bias** is knowledge of allocation changing how
  an outcome is ASSESSED, and that is already shipped as `detection-bias`, so it is
  not available. **Performance bias** is knowledge of allocation changing what
  participants and personnel actually DO during the trial: co-interventions, extra
  monitoring, effort, adherence. That second channel is the one still open, and a
  card would have to live there rather than on the assessment side. Note also that
  the effect is a matter of degree rather than a clean split: unblinding moves
  subjective outcomes more than objective ones, which is not the same as leaving
  hard endpoints untouched. The skeleton resembles entry 27 in that both end with a
  soft component carrying the result, but the mechanism differs and they should not
  be merged without deciding which one a player is actually learning.
- **Attrition.** Differential loss to follow-up. Adjacent to `survivorship-bias` again.
- **Pygmalion and procedure bias.** Named rang A, no obvious dataset, lowest
  priority of the group.
