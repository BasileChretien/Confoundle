import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #67, performance bias, on Hurst et al. (2019). This closes the longest
 * hunt in `docs/lesson-backlog.md`: entry 66 records nine routes to this lesson,
 * six of them closed on the same structural obstacle, and the seventh was the
 * entry's own recommendation which had never been run.
 *
 * WHAT UNLOCKED IT, since the next lesson in this family will need the same
 * move. Routes 1 to 6 all looked for a TRIAL where the bias had gone wrong, and
 * all died on one point: a trial built well enough to isolate performance bias
 * is built well enough to prevent it. The way out came from entry 68, the
 * Pygmalion card: stop looking among trials and look for a laboratory
 * manipulation whose PURPOSE is to install the bias, because installing it and
 * preventing it are then not the same act. A balanced placebo design does
 * exactly that on the participant side, crossing what a person is told against
 * what they are given.
 *
 * READ AT SOURCE, from the accepted manuscript Basile supplied through
 * institutional access, after Unpaywall offered only a submitted version on a
 * host that would not resolve. Table 1 prints the 1000-m time for every one of
 * the eleven participants in all five conditions, and all five printed means
 * reproduce from those per-participant values exactly:
 *
 *   Baseline 175.9   CC 172.7   CP 172.6   PC 174.3   PP 176.7
 *
 * THE UNITS TRAP, which is the reason this card exists in this form and not a
 * wrong one. The paper states its effects as "mean differences = 0.64 s", and
 * those are PER SPLIT, not per kilometre: the analysis is a treatment by split
 * ANOVA over five 200-m splits, Figure 1 is titled mean SPLIT time, and
 * dividing each total by five reproduces every published figure to the decimal
 * (3.22/5 = 0.64, 3.34/5 = 0.67, 4.02/5 = 0.80, 4.14/5 = 0.83). A card built on
 * the published number would have understated its own central quantity
 * fivefold, and nothing downstream would have caught it. Every figure this card
 * draws is a total over 1000 m and says so.
 *
 * WHAT THE CARD MAY AND MAY NOT CLAIM. The paper establishes that CC and CP
 * each beat PP (p = .001 and .002) and each beat baseline. It does NOT
 * establish that PC beats PP or baseline. So the card may say that telling
 * moved the clock and that caffeine given without telling did not reach
 * significance here; it may NOT say caffeine does nothing, which is the
 * `statistical-power` error in the other direction, and the third answer band
 * exists to be wrong in exactly that way.
 *
 * The intervals are deliberately not drawn. Table 1's stated SEM cannot be a
 * plain SEM of its own columns: computed from the printed per-participant
 * values they run 2.19 to 2.72 s against 0.55 to 0.68 printed, smaller by a
 * factor of about four throughout, and a within-subject correction does not
 * reproduce them either. The means reconcile, so the means are what the figure
 * shows.
 *
 * NEW SHAPE, `crossed`. See the block comment in `schema.ts` for why neither
 * `interaction` nor `delivered` can draw a told-by-given 2x2.
 */
export const performanceBias: Puzzle = {
  schemaVersion: 1,
  id: "performance-bias-hurst-2019",
  slug: "told-and-given",
  category: "measurement",
  reasoningSkill: "performance-bias",
  difficulty: "hard",
  tags: ["research", "statistics", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Runners on caffeine beat runners on placebo by four seconds over 1000 metres. How much of that is the caffeine?",
    },
    framing: {
      en: "Eleven well-trained middle-distance runners each ran seven 1000-metre time trials on a track: one to get used to the procedure, two to fix a baseline, and four more that make up the experiment. In the two trials drawn here, the runners were handed a capsule and told what was in it. On one of them they were told caffeine and were given caffeine, five milligrams per kilogram of body weight, which is a standard performance dose. On the other they were told placebo and were given placebo. Every runner did both, so this is not a comparison between fast runners and slow ones; it is the same eleven people on two different days, and the order was randomised. Their mean time was 172.7 seconds on the caffeine day and 176.7 seconds on the placebo day, four seconds apart over the kilometre. For reference, their baseline average was 175.9 seconds.",
    },
    question: {
      en: "How much of the four seconds belongs to the caffeine?",
    },
    data: {
      type: "crossed",
      label: { en: "Eleven runners, 1000 metres, four ways" },
      metricLabel: {
        en: "Mean time to run 1000 m, in seconds, all eleven runners. Lower is faster.",
      },
      scale: {
        min: 170,
        max: 180,
        minLabel: { en: "170 s, faster" },
        maxLabel: { en: "180 s, slower" },
      },
      lowerIsBetter: true,
      factorALabel: { en: "What the runner was told was in the capsule" },
      factorBLabel: { en: "What was actually in the capsule" },
      aLevels: [
        { id: "toldcaf", label: { en: "Told it was caffeine" }, short: { en: "Told caffeine" } },
        { id: "toldpla", label: { en: "Told it was placebo" }, short: { en: "Told placebo" } },
      ],
      bLevels: [
        { id: "gotcaf", label: { en: "Given caffeine" }, short: { en: "Given caffeine" } },
        { id: "gotpla", label: { en: "Given placebo" }, short: { en: "Given placebo" } },
      ],
      /**
       * THE TWO DRAWN AT THE SETUP LEAD THIS ARRAY, so a cell cannot change
       * position, and therefore cannot change meaning, when the setup filters.
       */
      cells: [
        { id: "cc", aId: "toldcaf", bId: "gotcaf", mean: 172.7, n: 11 },
        { id: "pp", aId: "toldpla", bId: "gotpla", mean: 176.7, n: 11 },
        {
          id: "cp",
          aId: "toldcaf",
          bId: "gotpla",
          mean: 172.6,
          n: 11,
          note: { en: "Told caffeine, given nothing. A tenth of a second off the real thing." },
        },
        {
          id: "pc",
          aId: "toldpla",
          bId: "gotcaf",
          mean: 174.3,
          n: 11,
          note: {
            en: "Given caffeine, told nothing. Faster than the placebo day, but not by enough for this study to call it.",
          },
        },
      ],
      reference: {
        label: { en: "The dotted line is the runners' own baseline, 175.9 s" },
        mean: 175.9,
      },
    },
    initialView: {
      kind: "astested",
      groupIds: ["cc", "pp"],
      caption: { en: "The comparison the trial made" },
    },
  },

  choices: [
    {
      /**
       * The intuitive trap, and it is not a straw man: 5 mg/kg is a real dose
       * with a real literature behind it, so reading the whole gap as the drug
       * is what most people who know something about caffeine will do.
       */
      id: "all-drug",
      label: {
        en: "All four seconds. That is what a five milligram per kilogram dose of caffeine does over 1000 metres",
      },
      sublabel: { en: "the dose is real, so the gap is real" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "mostly-drug",
      label: {
        en: "Most of it is the caffeine, with a little extra from the lift of knowing they had taken something",
      },
      sublabel: { en: "drug first, belief on top" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      /**
       * Wrong in the OTHER direction, and wrong on a principle the deck already
       * ships. This study did not establish that caffeine given blind helps,
       * which is not the same as establishing that it does not.
       */
      id: "no-drug",
      label: {
        en: "None of it. The four seconds is all belief, which shows caffeine does nothing over this distance",
      },
      sublabel: { en: "all in the head" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cant-tell",
      label: {
        en: "You cannot tell from these two days. They differ in two things at once: what the runner was given and what the runner was told",
      },
      sublabel: { en: "two changes, one comparison" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "There were two more days. Told caffeine and given nothing: 172.6 seconds, a tenth of a second off the real thing.",
    },
    mechanismLabel: { en: "And the two days nobody was told about" },
    mechanismName: { en: "The telling did the running" },
    explanation: {
      en: "The trial had four days, not two, and the two you were shown were the two that changed both things at once. On the other two the experimenters lied. One day the runners were told caffeine and handed a placebo. The other day they were told placebo and handed caffeine. Now look at what the clock did. Told caffeine and given caffeine: 172.7 seconds. Told caffeine and given a capsule with nothing in it: 172.6 seconds. That is a tenth of a second apart over a kilometre, which is nothing, and it means that on the day they were deceived the runners ran just as fast as on the day the drug was real. Meanwhile the day they were given real caffeine and told it was a placebo came in at 174.3 seconds, most of the way back to the 176.7 of the placebo day. So the four seconds you were asked to divide up does not divide the way the question invited. It follows what the runners were told, almost entirely, and barely notices what they swallowed. The study's own tests say the same thing: both told-caffeine days beat the told-placebo-and-given-placebo day, at p = 0.001 and p = 0.002, and both beat the runners' own baseline. Neither of those things was true of the day they were given caffeine without being told. Be careful with that last sentence, though, because it is the one this card could most easily overstate. Failing to find an effect in eleven runners is not the same as showing there is none, and the point estimate for that day, 174.3 against a 176.7 placebo day, is in the direction you would expect a real drug to push. What the study shows is not that caffeine does nothing. It is that on this distance, in these runners, what they believed was in the capsule moved the clock and what was actually in it could not be shown to.",
    },
    body: {
      en: "Two things about the numbers, both of which change how they should be quoted. First, the paper reports its effects as mean differences of around 0.64 to 0.83 seconds, and those are per 200 metre split, not per kilometre: the analysis runs over five splits and Figure 1 is a figure of split times. Multiplied back up, the told-caffeine advantage over the full 1000 metres is 4.0 seconds against the placebo day and 3.2 against baseline. Anyone repeating the published number as a time-trial effect is understating it fivefold, and this card draws totals throughout. Second, the figure shows means and not intervals on purpose. The paper's table gives a standard error that cannot be recomputed from its own per-participant column, being about four times too small throughout, so the means are drawn, which do reconcile exactly, and the intervals are not. Two limits on what this can carry. Eleven people is a small study, and although it is a strong design, with every runner doing all four days and the key comparisons landing at p = 0.001 and 0.002, the paper also runs many split-by-split comparisons at around p = 0.03 that should be read as exploratory rather than as findings. And it tells you nothing about whether the same thing happens to patients in a drug trial, only that a person who knows which arm they are in can move an objective measurement without anyone intending it.",
    },
    view: {
      kind: "allfourways",
      caption: { en: "And the two nobody was told about" },
    },
  },

  lesson: {
    skillName: { en: "The comparison that changed two things" },
    takeaway: {
      en: "When people know which arm of a trial they are in, an unblinded comparison measures the treatment plus what they believe about it, added together, and there is no way to separate the two from that comparison alone.",
    },
    body: {
      en: "This is performance bias, and it is the half of blinding that gets forgotten. When a trial says it was blinded, most readers hear that the outcome was scored fairly, and that is the other half, detection bias. Performance bias is about what happens during the trial rather than at the end of it: a participant who knows they are on the new treatment may try harder, stick with it longer, take more of it, seek out other help, or simply hope; a participant who knows they drew the control arm may do the opposite, or drop out. None of that is cheating and none of it requires anybody to lie. It is what people do when they know something. The reason this study is worth showing is that it takes the two ingredients that are always mixed together in an open-label trial and pulls them apart on purpose. Ordinarily what you are given and what you are told are the same thing, and every comparison you can make moves both at once. Cross them over and the question becomes answerable, and the answer here was that the telling did nearly all the work. It is worth noticing where this sits among its neighbours, because four cards in this deck circle the same building. The Hawthorne effect is about being watched, and needs nobody to believe anything in particular. The nocebo effect is your own expectation turning into a symptom you report. The Pygmalion effect is somebody else's belief reaching you and changing what you feel. Performance bias is the trial-design consequence of all of that: whatever the mechanism, if the participants know their arm, the difference you measure is not the difference the treatment made.",
    },
    howItWorks: {
      en: "The practical question is never whether a trial was blinded, it is who was blinded and what that person could do with knowing. Ask three things. Could the participants tell which arm they were in? Often they could even when the trial says they could not, because active drugs have side effects, and a good trial asks at the end and reports the answer. Could knowing change the outcome through effort, adherence, or anything else the participant does? For a race time, a questionnaire score, a rehabilitation outcome, or anything measured by asking someone how they feel, the answer is yes. And what did the trial do instead, where blinding was impossible? A blinded assessor protects the scoring but not the doing, so it is not an answer to this problem. What is an answer is an objective endpoint that effort cannot reach, an attention control arm that gives the comparison group the same contact and expectation, or a design that crosses the telling against the giving as this one did. Outside trials, the same question applies wherever people know what is supposed to happen to them: a school comparing a new curriculum where only one set of teachers volunteered, a workplace comparing a new system that half the staff campaigned for, a gym comparing a supplement its own members chose to buy. In every case the enthusiasm travelled with the treatment, and the measurement cannot tell you which of them you are looking at."
    },
  },

  share: {
    title: { en: "The comparison that changed two things, a reasoning trap." },
    explainer: {
      en: "Eleven runners ran 1000 metres four times: told caffeine and given it, told caffeine and given a dummy, told placebo and given caffeine, told placebo and given a dummy. Told caffeine and given caffeine came in at 172.7 seconds. Told caffeine and given nothing came in at 172.6, a tenth of a second apart. Given real caffeine while told it was a dummy came in at 174.3, most of the way back to the 176.7 placebo day. The clock followed what the runners were told, not what they swallowed.",
    },
    captions: {
      competitive: { en: "Spotted that the two days differed in two ways." },
      selfDeprecating: { en: "I divided up four seconds that did not divide." },
    },
  },

  provenance: {
    source:
      "Hurst P, Schipof-Godart L, Hettinga F, Roelands B, Beedie C. Improved 1000-m running performance and pacing strategy with caffeine and placebo: a balanced placebo design study. International Journal of Sports Physiology and Performance. 2019;15(4):483-488. DOI 10.1123/ijspp.2019-0230, PMID 31575826. Accepted manuscript read at source. Design: quasi-randomised, repeated measures, balanced placebo design in 11 well-trained male middle-distance athletes, each completing seven 1000-m track time trials (one familiarisation, two baseline, four experimental). The four experimental treatments were informed caffeine / given caffeine (CC), informed caffeine / given placebo (CP), informed placebo / given caffeine (PC) and informed placebo / given placebo (PP), randomised by computer, with participants deceived in CP and PC and debriefed after data collection. Caffeine dose 5 mg/kg. Split times at 200, 400, 600, 800 and 1000 m, with peak heart rate and rating of perceived exertion after each trial. Mean 1000-m times (Table 1): baseline 175.9 s, CC 172.7, CP 172.6, PC 174.3, PP 176.7. Published contrasts, stated by the paper as mean differences per split: CC faster than baseline by 0.64 s (p < .001, d = 0.42) and CP by 0.66 s (p = .004, d = 0.43); CC faster than PP by 0.80 s (p = .001, d = 0.47) and CP by 0.83 s (p = .002, d = 0.48). No difference between treatments for peak heart rate (F(4, 40) = 1.198, p = .327) or rating of perceived exertion (F(4, 40) = 0.892, p = .641), with peak heart rate averaging 183.5 bpm across all conditions.",
    year: 2019,
    doi: "10.1123/ijspp.2019-0230",
    url: "https://pubmed.ncbi.nlm.nih.gov/31575826/",
    note: {
      en: "Four things. First, and this is the one that would have put a wrong number on the card, the paper's reported effects are PER SPLIT and not per kilometre. The analysis is a treatment by split ANOVA over five 200-m splits and Figure 1 is titled mean split time, so the published 0.80 s for CC against PP is a mean per split; the total over 1000 m is 4.02 s. Dividing each total by five reproduces all four published figures to the decimal, which is what confirms the reading: 3.22/5 = 0.64, 3.34/5 = 0.67 against a published 0.66, 4.02/5 = 0.80, 4.14/5 = 0.83. This card draws totals and the reveal says so. Second, the four means and the baseline were checked against the paper's own Table 1, which prints the 1000-m time for every one of the eleven participants in all five conditions; recomputing the column means reproduces the five printed means exactly. That is unusually good provenance for this literature and it is the reason this study was chosen over the others the search surfaced. Third, on what is deliberately not drawn: Table 1's stated Mean plus or minus SEM cannot be a plain standard error of its own columns, which come out at 2.19 to 2.72 s against 0.55 to 0.68 printed, smaller by a factor of about four throughout; a within-subject correction reaches the right order of magnitude without reproducing them either. Since the means reconcile and the intervals do not, the figure shows means only and the card makes no claim that rests on an interval. Relatedly, the treatment main effect is printed as F(4, 160) where five conditions on eleven participants give 40 error degrees of freedom, 160 being the interaction error term; nothing this card says depends on that statistic. Fourth, on the limits of the claim. The paper establishes that both told-caffeine conditions beat PP and beat baseline. It does NOT establish that PC beats either, and the card is careful never to convert that into a claim that caffeine does not work, which would be the statistical-power error in reverse: the PC point estimate of 174.3 against a 176.7 placebo day points the way a real drug would. Eleven participants is small even for a within-subject design, and the paper also reports many split-level comparisons at around p = .03 which the card treats as exploratory and does not draw. Finally, this is a laboratory demonstration of the participant-side mechanism, not evidence about the size of performance bias in any clinical trial, and the lesson says so.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Performance_bias",
};
