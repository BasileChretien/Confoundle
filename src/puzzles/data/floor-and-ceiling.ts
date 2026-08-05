import type { Puzzle } from "../schema";

/**
 * Puzzle #59, floor and ceiling effects, via Fazio, Rand and Pennycook (2019).
 *
 * A NEW SHAPE, `ceiling`, AND THAT WAS THE DESIGN DECISION. `series` was the
 * near miss and it fails three ways: its schema REQUIRES the two lines to swap
 * places and these never do, its observations are raw counts with no bound to
 * press against, and its vertical axis runs to the largest value in the data
 * rather than to a fixed maximum, which would hide the one thing worth seeing.
 * An optional no-crossover flag would have fixed only the first of those and
 * left the lesson undrawable, which is bending the lesson to fit the shape.
 * Nothing else in the deck can draw a bound at all, and this lesson is about
 * what a bound does to a measurement.
 *
 * SETUP AND REVEAL ARE ONE DATA SET, TWICE. The setup draws only the DERIVED
 * difference between the arms, which is the inverted U the prior literature
 * read as a psychological fact. The reveal draws the two arms it was subtracted
 * from, against the floor and the ceiling, where the reason for the collapse is
 * visible. Nothing is recomputed between the beats; the second picture is the
 * first one's arithmetic undone.
 *
 * THE COMMIT BEAT MAKES THE HEDGE CORRECT, which `docs/hedge-audit.md`
 * explicitly allows. Three of the four bands assert something about the world
 * at the extremes and the setup chart licenses none of them, so the answer that
 * declines to assert is the one a well-reasoning player reaches. The two
 * non-obvious distractors are refutable from the framing rather than from
 * knowledge the reader does not have: the noise band is answered by the printed
 * standard deviations, which are SMALLEST at the two ends, and the framing
 * states them.
 *
 * THE TALLEST BAR IS NOT THE FITTED PEAK, and that is deliberate rather than an
 * error. The bins are a coarse summary of eighty statements; the peak was
 * fitted to all eighty separately. The reveal and the provenance note both say
 * so, and the test pins it, because a reader will notice.
 */
export const floorAndCeiling: Puzzle = {
  schemaVersion: 1,
  id: "nowhere-left-to-go",
  slug: "nowhere-left-to-go",
  category: "measurement",
  reasoningSkill: "floor-and-ceiling",
  difficulty: "hard",
  tags: ["everyday", "psychology", "statistics", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Repetition makes claims feel truer. Against the absurd ones it appears to do nothing at all.",
    },
    framing: {
      en: "Five hundred and three people rated eighty statements true or false. Some of those statements they had already seen earlier in the same session and some were new to them, and the repeated ones were called true more often: .52 of the time against .48. Every statement had also been rated beforehand by people who took no part in the experiment, so each one carries a score for how believable it was to start with, and that score is the axis below. The line is the gain from repetition in each bin, running from the statements almost nobody believed to the ones almost everybody did. Read the ends: .00 in the least believable bin and .01 in the most, against a peak of .08 in the middle. Two facts about the measurement before you answer. Each person gave one true-or-false press, so every number here is a share of people pressing true. And the answers were least variable at the two ends, not most: the standard deviations there run from .19 to .28, against .29 to .32 through the middle.",
    },
    question: {
      en: "What does the collapse at both ends tell you about repetition and claims people already find absurd?",
    },
    data: {
      type: "ceiling",
      label: { en: "Repetition, across the whole range of believability" },
      metricLabel: { en: "Share of people calling the statement true" },
      differenceLabel: {
        en: "How much more often a repeated statement was called true than a new one",
      },
      statNote: {
        en: "503 people on Amazon Mechanical Turk, 80 statements, each rated true or false once. Bins are how often other people had called the same statement true beforehand. The two lowest bins were filled from a separate pretest; see the source note.",
      },
      bounds: {
        min: 0,
        max: 1,
        minLabel: { en: "0, nobody called it true" },
        maxLabel: { en: "1, everybody called it true" },
      },
      axis: {
        min: 0,
        max: 1,
        label: { en: "How believable the statement was to begin with" },
      },
      neutralPoint: 0.5,
      neutralLabel: {
        en: "0.50, where an effect of equal size everywhere would peak",
      },
      peak: {
        at: 0.53,
        low: 0.489,
        high: 0.593,
        label: { en: "0.53, where the effect actually peaks, and its 95% interval" },
      },
      arms: [
        {
          id: "new",
          label: { en: "Seen for the first time" },
          short: { en: "New" },
        },
        {
          id: "repeated",
          label: { en: "Seen earlier in the session" },
          short: { en: "Repeated" },
        },
      ],
      bins: [
        { id: "b1", label: { en: "Believed by 1 to 10% beforehand" }, short: { en: "1 to 10%" }, at: 0.055 },
        { id: "b2", label: { en: "Believed by 11 to 20% beforehand" }, short: { en: "11 to 20%" }, at: 0.155 },
        { id: "b3", label: { en: "Believed by 21 to 30% beforehand" }, short: { en: "21 to 30%" }, at: 0.255 },
        { id: "b4", label: { en: "Believed by 31 to 40% beforehand" }, short: { en: "31 to 40%" }, at: 0.355 },
        { id: "b5", label: { en: "Believed by 41 to 50% beforehand" }, short: { en: "41 to 50%" }, at: 0.455 },
        { id: "b6", label: { en: "Believed by 51 to 60% beforehand" }, short: { en: "51 to 60%" }, at: 0.555 },
        { id: "b7", label: { en: "Believed by 61 to 70% beforehand" }, short: { en: "61 to 70%" }, at: 0.655 },
        { id: "b8", label: { en: "Believed by 71 to 80% beforehand" }, short: { en: "71 to 80%" }, at: 0.755 },
        { id: "b9", label: { en: "Believed by 81 to 90% beforehand" }, short: { en: "81 to 90%" }, at: 0.855 },
        { id: "b10", label: { en: "Believed by 91 to 100% beforehand" }, short: { en: "91 to 100%" }, at: 0.955 },
      ],
      // Table 1, exactly as printed. The difference column is NOT printed and is
      // derived; nothing here states it.
      observations: [
        { binId: "b1", armId: "new", value: 0.13, sd: 0.28 },
        { binId: "b1", armId: "repeated", value: 0.13, sd: 0.27 },
        { binId: "b2", armId: "new", value: 0.2, sd: 0.29 },
        { binId: "b2", armId: "repeated", value: 0.23, sd: 0.29 },
        { binId: "b3", armId: "new", value: 0.27, sd: 0.31 },
        { binId: "b3", armId: "repeated", value: 0.29, sd: 0.32 },
        { binId: "b4", armId: "new", value: 0.36, sd: 0.31 },
        { binId: "b4", armId: "repeated", value: 0.41, sd: 0.32 },
        { binId: "b5", armId: "new", value: 0.44, sd: 0.31 },
        { binId: "b5", armId: "repeated", value: 0.5, sd: 0.32 },
        { binId: "b6", armId: "new", value: 0.53, sd: 0.32 },
        { binId: "b6", armId: "repeated", value: 0.59, sd: 0.32 },
        { binId: "b7", armId: "new", value: 0.58, sd: 0.3 },
        { binId: "b7", armId: "repeated", value: 0.66, sd: 0.29 },
        { binId: "b8", armId: "new", value: 0.68, sd: 0.27 },
        { binId: "b8", armId: "repeated", value: 0.72, sd: 0.27 },
        { binId: "b9", armId: "new", value: 0.77, sd: 0.26 },
        { binId: "b9", armId: "repeated", value: 0.81, sd: 0.25 },
        { binId: "b10", armId: "new", value: 0.88, sd: 0.22 },
        { binId: "b10", armId: "repeated", value: 0.89, sd: 0.19 },
      ],
    },
    initialView: {
      kind: "thedifference",
      caption: { en: "What repetition bought, bin by bin" },
    },
  },

  choices: [
    {
      // The reading the prior literature drew, and the comfortable one: an
      // outrageous claim is supposed to be its own defence.
      id: "immune",
      label: {
        en: "Nothing gets through at the extremes. A claim you already reject is repetition-proof",
      },
      sublabel: { en: "absurdity is its own defence" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "cannot-tell",
      label: {
        en: "Nothing either way. A true-or-false press has nowhere left to go at either end",
      },
      sublabel: { en: "the shape may belong to the ruler" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The statistically-minded person's first move, and the framing gives the
      // reader what they need to reject it: the ends are the QUIETEST bins.
      id: "buried-in-noise",
      label: {
        en: "The effect is there at the extremes but buried in noise; those bins scatter most",
      },
      sublabel: { en: "the spread swallows it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "needs-more-repeats",
      label: {
        en: "It is there, but an absurd claim needs far more repetitions than this study gave",
      },
      sublabel: { en: "the big lie just needs volume" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Both curves are pinned against a bound at each end. There was nowhere for a gap to open.",
    },
    mechanismLabel: { en: "What the gap was subtracted from" },
    mechanismName: {
      en: "A yes-or-no press cannot show a difference where nobody is near the line",
    },
    explanation: {
      en: "Here are the two curves the gap was subtracted from. In the least believable bin they sit at .13 and .13, close to a floor of zero. In the most believable bin they sit at .88 and .89, close to a ceiling of one. Neither end has room for a gap to open, whatever repetition is doing to what people actually believe. The middle bins are the ones furthest from either bound, and that is exactly where the gap is widest. The gold marker below the floor is where the effect really peaks, fitted across all eighty statements one at a time: 0.53, with a 95 per cent interval running from 0.489 to 0.593. The gold dashes are 0.50, which is where an effect of the same size at every level of believability would peak once a true-or-false press had squeezed it. The interval covers them.",
    },
    body: {
      en: "That 0.50 is not a rule of thumb, it is the paper's first study. The authors simulated the experiment with belief as a continuous quantity and repetition adding an identical amount to every statement however absurd, then scored the simulation the way the real experiment was scored, by asking whether belief had crossed a true-or-false line. Out came the same inverted U, centred on 0.50. The reason is that only the people already sitting near the line can be pushed over it by a small nudge, and at either extreme almost nobody is near it. If repetition did less as statements grew more believable, the peak would land below 0.50; if it did more, above. It lands at 0.53. Two things belong here for honesty, and they pull in opposite directions. The tallest point on the setup chart is the 61 to 70 per cent bin, which is not where 0.53 falls: ten bins are a coarse summary and the fitted peak used all eighty statements separately, so these are two different instruments and the bins are the blunter one. And the interval leans a little to the right of 0.50 rather than straddling it evenly, which if anything tilts very slightly towards repetition doing more for believable statements than for absurd ones. What the interval establishes is that an effect of equal size everywhere cannot be ruled out. It does not prove equality, and this puzzle does not claim it does.",
    },
    view: {
      kind: "bothcurves",
      caption: { en: "The two curves, and where the peak really sits" },
    },
  },

  lesson: {
    skillName: { en: "Floor and ceiling effects" },
    takeaway: {
      en: "A measure with a hard top and a hard bottom will show an effect fading away at both ends even when the effect is exactly the same size everywhere. Before concluding that something stops working at the extremes, check whether the ruler had anywhere left to go.",
    },
    body: {
      en: "The move is old and it is everywhere, and it is easiest to see in the crudest case. Imagine scoring a class out of ten and then giving every pupil three extra lessons. The pupils on four move to seven and the improvement is obvious. The pupils already on ten cannot move at all, and the pupils on one may learn a great deal without ever reaching a question the test bothers to ask. Plot improvement against starting score and a hill appears, and the hill is a fact about the test rather than about the lessons. Turning a continuous belief into a true-or-false press does the same thing more subtly, because the press records only which side of a line somebody is on: a small push shows up for the people who were already near the line, and for nobody else. At the extremes almost nobody is near it. The finding here is the strong version of that, because the researchers built a world in which repetition helped every statement by an identical amount, measured it the way the real study measured it, and got the inverted U out anyway.",
    },
    howItWorks: {
      en: "Three checks, in the order they are worth doing. First, ask what the bounds of the outcome are and how close the groups sit to them. Shares, percentages, pass rates, scores out of a fixed total and anything counted out of a fixed number of opportunities all have two walls, and a group sitting at 4 per cent or at 96 per cent has almost no room to move in one direction. Second, ask whether the outcome was recorded as a category when the thing itself is continuous. Every yes-or-no, pass-or-fail, above-or-below-threshold reading throws away all of a change except whether it crossed one line, and it will report nothing at all for somebody who moved a long way without crossing. Third, if the underlying values are available, look at them rather than at the difference: two curves squashed against a wall look alike, and what they are made of may not be. The warning sign to learn is a claim of the form that an effect disappears at the extremes, or its friendlier cousin that it only works on the people in the middle. Sometimes that is true and worth knowing. It is also exactly what a squeezed ruler looks like, and the two are told apart by asking what the ruler could have shown, never by staring harder at the chart.",
    },
    examples: [
      {
        title: {
          en: "The same shape came out of a world built with no such effect in it",
        },
        summary: {
          en: "Before running the experiment, the same authors simulated it. Belief was modelled as a continuous quantity, and repetition was set to add an identical amount to every statement regardless of how believable it was to begin with, so that by construction there was nothing at the extremes to be immune. The simulated responses were then scored the way the real ones would be, by asking whether belief had crossed a true-or-false threshold. Plotted against believability, the simulated repetition effect came out as a symmetric inverted U peaking at 0.50. The conclusion the authors draw is that the inverted U reported in the earlier literature is not by itself evidence of anything psychological, because it is what a binary readout of a continuous belief produces whether or not the effect varies. Where the peak sits is the only part of the curve that carries information, which is why the experiment was built to measure that.",
        },
        provenance: {
          source:
            "Fazio LK, Rand DG, Pennycook G. Repetition increases perceived truth equally for plausible and implausible statements. Psychonomic Bulletin and Review. 2019;26(5):1705-1710. Study 1, the simulation, which establishes that a repetition effect of constant size produces an inverted U peaking at a perceived truth of 0.50 once responses are binarised.",
          year: 2019,
          doi: "10.3758/s13423-019-01651-4",
          url: "https://doi.org/10.3758/s13423-019-01651-4",
        },
      },
    ],
  },

  share: {
    title: { en: "Floor and ceiling effects, a reasoning trap." },
    explainer: {
      en: "An effect can look as though it stops working at the extremes while doing exactly the same thing there as everywhere else. If the measure has a hard top and a hard bottom, there is no room near either wall for a difference to appear, so it vanishes from the chart without vanishing from the world. Repetition makes statements feel truer, and it looks powerless against absurd claims for precisely this reason. It is not.",
    },
    captions: {
      competitive: { en: "Saw through the ruler. Your turn." },
      selfDeprecating: { en: "I read that chart exactly backwards." },
    },
  },

  provenance: {
    source:
      "Fazio LK, Rand DG, Pennycook G. Repetition increases perceived truth equally for plausible and implausible statements. Psychonomic Bulletin and Review. 2019;26(5):1705-1710. Study 2: 503 participants completed the study on Amazon Mechanical Turk, with 43 more starting and not finishing, rating 80 statements true or false. The twenty proportions rated true, by plausibility bin and by whether the statement was new or repeated, are Table 1, read at source. Repeated statements were rated true more often overall, t(502) = 9.19, p < .001, d = 0.41, and a regression of the size of the effect on perceived truth was significant with a positive linear and a negative quadratic term, F(2, 77) = 7.94, p = .001, accounting for 17 per cent of the variance, with a cubed term adding nothing. The quadratic model places the peak of the effect at a perceived truth of 0.53, with a 95 per cent confidence interval of 0.489 to 0.593 from 5,000 bootstrap resamples of the 80 items. The simulation establishing that a constant effect peaks at 0.50 is Study 1 of the same paper.",
    year: 2019,
    doi: "10.3758/s13423-019-01651-4",
    url: "https://doi.org/10.3758/s13423-019-01651-4",
    note: {
      en: "Four things about these numbers, all of which change how much weight they carry. First, the twenty proportions are authored exactly as Table 1 prints them, because the paper prints proportions and no counts. That is the same deliberate exception this deck already makes for published poll shares and published means, and it means the only figures on screen that were not printed are the ones derived here: every difference, the overall means, and how much room each bin has left. Two checks confirm the reading. The unweighted mean of the ten printed bin means is .484 for new statements and .523 for repeated ones, which reproduces the printed overall figures of .48 and .52 at the precision they were printed at; and the printed effect size of d = 0.41 falls out of the printed t of 9.19 divided by the square root of 503. Second, the two lowest bins did not come from the same source as the other eight. No statement in the earlier study the material was drawn from had been rated true by fewer than 14 per cent of participants, so the 1 to 10 and 11 to 20 per cent bins were filled from an unpublished follow-up to Pennycook, Cannon and Rand (2018) Experiment 1, rated by a further 492 participants on Amazon Mechanical Turk. The paper says so, and it matters here because those two bins are one of the two ends this entire lesson turns on. Third, the differences are between-subject at the item level: for any one participant a given statement was either repeated or new and never both, which the paper records in a footnote. Fourth, and this is the one a careful reader will spot on the chart, the tallest point on the difference curve is the 61 to 70 per cent bin while the fitted peak is at 0.53, which falls in the 51 to 60 per cent bin. Those are two different instruments and they are not expected to agree, since the bins group eighty statements into tens while the quadratic was fitted to all eighty separately. Nothing here claims the tallest point is the peak, and the reveal says so on the beat where it would matter. The data and the preregistration of the primary analyses and the sample size are posted at osf.io/w4k2c.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Ceiling_effect_(statistics)",
};
