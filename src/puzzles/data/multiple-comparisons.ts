import type { Puzzle } from "../schema";

/**
 * Puzzle #37, multiplicity, on ISIS-2 (1988). The largest remaining hole in the
 * deck's statistics coverage: it had `publication-bias` and
 * `statistical-vs-clinical-significance` but nothing on what happens when you
 * ask a dataset many questions at once.
 *
 * READ FROM THE PAPER, and specifically from Figure 5(b), which prints counts.
 * The astrological subgroup is famous but it is almost always quoted as an
 * effect size: Sleight's own 2000 commentary gives only "9% +/- 13", with no
 * numerators anywhere. The trial's Figure 5 prints the head counts, which is
 * what lets this deck author raw observations and derive every rate:
 *
 *   Gemini or Libra   aspirin 150/1357 (11.1%)   placebo 147/1442 (10.2%)
 *   Other ten signs   aspirin 654/7228 ( 9.0%)   placebo 868/7157 (12.1%)
 *
 * RECONCILED SIX WAYS, all asserted in the test file. The four printed
 * percentages reproduce from the counts. The odds ratios recomputed from the
 * counts are a 9.5 per cent increase and a 27.9 per cent reduction, against the
 * paper's own printed "9% SD 13 increase" and "28% SD 5 reduction" on p356,
 * which is an independent check because the authors computed those with their
 * own software. And the aspirin deaths sum to exactly the 804 the paper prints
 * for the whole trial.
 *
 * THE SUMS DO NOT QUITE CLOSE, AND THAT IS RECORDED RATHER THAN SMOOTHED. The
 * two strata hold 8,585 aspirin patients against the 8,587 the trial randomised,
 * and 8,599 placebo against 8,600, with 1,015 placebo deaths against 1,016.
 * Two, one and one short. Almost certainly patients with no usable date of
 * birth, but the paper does not say so, so the note says the discrepancy exists
 * and does not explain it away. A test pins the residuals so they cannot drift.
 *
 * NO NEW SHAPE. Unlike the availability puzzle this fits `rates` exactly: the
 * two birth-sign groups genuinely partition the trial, so pooling them is
 * meaningful and `strataAreSeparateSamples` stays off. Setup is filtered to the
 * Gemini and Libra stratum, where aspirin looks slightly harmful; the reveal
 * drops the filter.
 *
 * NOBODY IS BEING MOCKED. The astrological split is the investigators' own, done
 * deliberately and published deliberately, to show what subgroup analysis does
 * to a trial that plainly worked. The lesson keeps their point rather than
 * scoring off astrology, which is not the subject.
 */
export const multipleComparisons: Puzzle = {
  schemaVersion: 1,
  id: "multiple-comparisons-1988",
  slug: "written-in-the-stars",
  category: "statistical-reasoning",
  reasoningSkill: "multiple-comparisons",
  difficulty: "medium",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "In one subgroup of a heart attack trial, aspirin came out slightly worse than the dummy tablet.",
    },
    framing: {
      en: "ISIS-2 randomised 17,187 people with a suspected heart attack to aspirin or to identical placebo tablets, and counted who had died of a vascular cause five weeks later. Every patient's date of birth had been recorded on entry as an identifier, so the investigators were able to divide everybody by astrological birth sign and look at the twelve groups separately. Below is what they found among the patients born under Gemini or Libra. Aspirin did slightly worse than placebo there, and the difference is not statistically significant.",
    },
    question: {
      en: "What did aspirin do among the patients born under the other ten signs?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Died of a vascular cause within five weeks" },
      // Deaths, so a lower bar is the better one.
      higherIsBetter: false,
      // Crowning a bar would be the exact error this puzzle is about: in the
      // setup it would declare placebo the winner of a difference that is noise.
      crownWinner: false,
      groups: [
        {
          id: "aspirin",
          label: { en: "Allocated aspirin" },
          short: { en: "Aspirin" },
        },
        {
          id: "placebo",
          label: { en: "Allocated placebo tablets" },
          short: { en: "Placebo" },
        },
      ],
      strata: [
        { id: "gemini-libra", label: { en: "Born under Gemini or Libra" } },
        { id: "other-signs", label: { en: "Born under the other ten signs" } },
      ],
      observations: [
        {
          groupId: "aspirin",
          stratumId: "gemini-libra",
          numerator: 150,
          denominator: 1357,
        },
        {
          groupId: "placebo",
          stratumId: "gemini-libra",
          numerator: 147,
          denominator: 1442,
        },
        {
          groupId: "aspirin",
          stratumId: "other-signs",
          numerator: 654,
          denominator: 7228,
        },
        {
          groupId: "placebo",
          stratumId: "other-signs",
          numerator: 868,
          denominator: 7157,
        },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["gemini-libra"],
      caption: { en: "Gemini and Libra only" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "Much the same. Aspirin is not up to much here either" },
      sublabel: { en: "one subgroup went that way, so why would others differ" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "large-benefit",
      label: { en: "A large benefit. Around a 28 per cent cut in the odds of death" },
      sublabel: { en: "ask what twelve slices of one trial would look like" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "small-benefit",
      label: { en: "A small benefit, easily written off as chance" },
      sublabel: { en: "a real drug, but a marginal one" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim so it carries no lexical tell. Wrong here:
      // the other ten signs are the rest of a trial of 17,187 people, which is
      // the largest and least ambiguous evidence in the whole puzzle.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Nine per cent against twelve. Aspirin worked." },
    mechanismLabel: { en: "The subgroup, and the rest of the trial" },
    mechanismName: {
      en: "Slice a result enough ways and one slice will look wrong",
    },
    explanation: {
      en: "Among the other ten signs, 654 of 7,228 on aspirin died against 868 of 7,157 on placebo: 9.0 per cent against 12.1, which the paper gives as a 28 per cent reduction in the odds of death. Among Gemini and Libra it was 150 of 1,357 against 147 of 1,442, a 9 per cent increase, and not significant. Same trial, same drug, same five weeks. The only thing that changed was the birth date on the form.",
    },
    body: {
      en: "The investigators did this on purpose and published it on purpose, and their own conclusion is the one worth keeping: the best estimate of what aspirin does for a Gemini is not the Gemini result, it is the result from everybody. That is not a quirk of astrology, it is what a subgroup is. Split 17,187 people twelve ways and each slice is about a twelfth the size, so each one is noisier, and with twelve of them the odds are good that at least one lands on the wrong side of nothing. The same paper counted this directly: across the 26 non-astrological subgroup analyses in the same figure, it says that if there were no real differences at all you would still expect one or two to come out significant by chance, and exactly one did. The uncomfortable part is that the astrological subgroup and the plausible-sounding one look identical on the page. Both are a smaller number of patients with a wider interval and a result that disagrees with the whole.",
    },
    view: {
      kind: "stratified",
      caption: { en: "Both, side by side" },
    },
  },

  lesson: {
    skillName: { en: "Multiple comparisons" },
    takeaway: {
      en: "Every extra question you ask of one dataset is another chance for noise to look like a finding. A single result that would be surprising on its own stops being surprising once you know how many results were available, and the count of tests is the thing almost nobody reports.",
    },
    body: {
      en: "The arithmetic is not subtle. If a test has a one in twenty chance of a false positive and you run one test, you are probably fine. Run twenty independent tests on data with nothing in them and you expect one to come out significant; run a hundred and you expect five. Nothing has to go wrong for this to happen, and no one has to cheat: it is the advertised error rate doing exactly what it says. What makes it dangerous is that the tests you ran but did not report are invisible in the write-up, so the reader sees one striking result and has no way to know it was drawn from a bag of forty. The astrological subgroup exists to make that visible. Nobody believes birth sign changes how aspirin works, so when the numbers say it does, the numbers are obviously the problem. The whole point is that a subgroup you would find plausible produces numbers that look exactly the same.",
    },
    howItWorks: {
      en: "Four habits follow, and the first is the one that does most of the work. Ask how many comparisons were available, not how many are shown: a trial with ten outcomes, five subgroups and three time points has a hundred and fifty places to find something, and the paper will show you the best one. Second, treat a subgroup result as a question rather than an answer. If the overall result is solid and a subgroup disagrees with it, the subgroup is usually wrong, because it is smaller and the overall estimate already includes those patients. Third, look for whether the analysis was pre-specified, which means the question was written down before anybody saw the data. That is exactly what a trial registry and a protocol are for, and it is why the deck's puzzle on registered protocols and this one are the same habit from two directions. Fourth, notice that this generalises far past medicine. A dashboard with forty metrics will show a red one every week; a portfolio of a thousand funds will contain one with ten straight winning years; a school district ranking twenty schools will find one that improved dramatically. In all three the reasonable question is not what happened to that one but how many chances there were for something to look like that.",
    },
    examples: [
      {
        title: { en: "The trial that counted its own false positives" },
        summary: {
          en: "The same figure that carries the astrological rows contains 26 other subgroup analyses, split by prior heart attack, diabetes, age, blood pressure, heart rate, ECG findings and more. The authors did the arithmetic on their own work: the heterogeneity test statistics summed to 58.5 on 50 degrees of freedom, which is unremarkable, and they note that if no real differences existed between subgroups at all, one or two of those 26 tests would still be expected to produce a result at p below 0.05 purely by chance. Exactly one did, for aspirin and previous heart attack. They then explain why they do not believe that one either, since aspirin significantly reduced reinfarction in precisely those patients, 38 of 1,454 against 66 of 1,483. It is a rare thing to see a paper mark its own most tempting finding as probably noise, and it is why this trial rather than a textbook example is the source here.",
        },
        provenance: {
          source:
            "ISIS-2 (Second International Study of Infarct Survival) Collaborative Group. Randomised trial of intravenous streptokinase, oral aspirin, both, or neither among 17,187 cases of suspected acute myocardial infarction: ISIS-2. Lancet. 1988;2(8607):349-360. Figure 5 caption, page 355: the sum of the 26 chi-squared heterogeneity test statistics for the 26 non-astrological subgroup analyses in figures 5(a) and 5(b) was 58.5 on 50 degrees of freedom, not significant; one or two of the 26 would be expected to reach p below 0.05 by chance alone and one did. Discussion, page 356, for the reinfarction counts of 38/1454 against 66/1483.",
          year: 1988,
          doi: "10.1016/S0140-6736(88)92833-4",
        },
      },
    ],
  },

  share: {
    title: { en: "Multiple comparisons, a reasoning trap." },
    explainer: {
      en: "ISIS-2 gave aspirin or placebo to 17,187 people after a heart attack, then split them by astrological birth sign. Among Gemini and Libra, aspirin came out worse: 150 of 1,357 died against 147 of 1,442. Among the other ten signs it cut the odds of death by 28 per cent, 654 of 7,228 against 868 of 7,157. Same trial, same drug, same five weeks; only the birth date changed. The investigators published it deliberately, to show what happens when you slice one result twelve ways.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "ISIS-2 (Second International Study of Infarct Survival) Collaborative Group. Randomised trial of intravenous streptokinase, oral aspirin, both, or neither among 17,187 cases of suspected acute myocardial infarction: ISIS-2. Lancet. 1988;2(8607):349-360. Figure 5(b), astrological birth sign rows, 5-week vascular deaths: Gemini or Libra 150/1357 (11.1 per cent) on aspirin against 147/1442 (10.2 per cent) on placebo tablets; all other birth signs 654/7228 (9.0 per cent) against 868/7157 (12.1 per cent). Discussion, page 356: a 9 per cent SD 13 increase for Gemini and Libra, not significant, and a 28 per cent SD 5 reduction for all other signs, 2p below 0.00001. Whole trial: 804/8587 (9.4 per cent) against 1016/8600 (11.8 per cent), odds reduction 23 per cent SD 4.",
    year: 1988,
    doi: "10.1016/S0140-6736(88)92833-4",
    note: {
      en: "The counts here are printed rather than derived, and they come from the figure rather than from the commentary the astrological result is usually quoted from. That distinction matters: the famous version of this story circulates as an effect size, and the investigators' own later account of it gives 9 per cent plus or minus 13 with no numerators at all, which this deck could not have authored. Figure 5(b) prints the head counts. Reconciled six ways. All four printed percentages reproduce from the counts. The odds ratios recomputed from those counts are a 9.5 per cent increase and a 27.9 per cent reduction, against the paper's own printed 9 per cent increase and 28 per cent reduction, which is an independent check because the authors computed theirs separately. And the aspirin deaths in the two strata sum to exactly the 804 the paper reports for the whole trial. Three things a careful reader should hold against it. First, the strata do not quite close: they contain 8,585 aspirin patients against the 8,587 randomised, 8,599 placebo against 8,600, and 1,015 placebo deaths against 1,016. Two, one and one short. The likeliest explanation is a handful of patients with no usable date of birth, but the paper does not say so and neither does this note; the shortfall is recorded and left unexplained, and a test pins it so it cannot drift. Second, this is a subgroup of one trial from 1988, and while aspirin after a heart attack has been settled many times over since, the specific counts are of their time. Third, and most important for what the puzzle claims: the point is not that astrology is silly, which nobody disputes, but that a subgroup you would find plausible produces numbers indistinguishable from these. The investigators chose an absurd subgroup precisely so that the absurdity would be obvious while the statistics stayed real, and the lesson keeps their framing rather than scoring off the horoscope.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Multiple_comparisons_problem",
};
