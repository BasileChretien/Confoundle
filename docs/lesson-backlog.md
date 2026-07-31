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

**Status: LEAD.** Promoted out of Tier 3, where it turned up while searching the
firehose model's component claims. Nothing in the deck is like it.

The **continued influence effect**: people keep using retracted misinformation in
their reasoning after the retraction. Two reported findings make it a puzzle
rather than a platitude. Retractions from low-trustworthiness sources are
**entirely ineffective**, and substantial continued influence persists **even when
the retraction is designed and rated as highly credible**. So the correction can
be impeccable and still not work.

Why it fits: the paradigm is a scripted incident with a retraction condition and a
control, non-partisan by construction, and the outcome is usually a count of
inferences that still rely on the retracted claim. That is a `rates` shape with
two arms. It also does something no shipped puzzle does, which is to be about what
happens **after** the reader has been corrected, and that is uncomfortably close
to what this whole deck assumes about itself.

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

**Status: LEAD, and the strongest of the eight.** A headline that merely asks
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

**Status: LEAD.** A message from a source you knew to be unreliable becomes
*more* persuasive weeks later, because the claim outlives the memory of who made
it. This is the mechanism that makes discredited sources worth worrying about
even when everybody discounts them at the time, and it is the best available
answer to "what is the harm, nobody believes that outlet anyway". Candidate:
Hovland CI, Weiss W. The influence of source credibility on communication
effectiveness. *Public Opinion Quarterly* 1951;15(4):635-650, **DOI `10.1086/266350`, verified 2026-07-31, closed with no open-access location.** Old enough that
the counts are usually printed. A modern meta-analysis (Kumkale and Albarracin,
*Psychological Bulletin* 2004) should be checked too, because the effect is
known to be fragile and the deck must not overstate it.

### 17. False balance, and the deck's own founding principle

<!-- skill: false-balance -->

**Status: LEAD, and overdue.** Giving two sides equal airtime when the evidence
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

**Status: LEAD.** Two opposite sequencing tricks that both raise compliance: ask
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
Communication* 2008) for magnitude. Check whether either prints counts rather
than only effect sizes; the deck has refused a puzzle on that ground before.

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
