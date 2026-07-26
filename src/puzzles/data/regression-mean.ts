import type { Puzzle } from "../schema";

/**
 * Regression to the mean, on the `regression` shape, from the study that named
 * the phenomenon.
 *
 * Galton grouped 928 adult children by their parents' height and found the
 * children of extreme parents were less extreme than their parents: the tallest
 * parents had tall children who were nonetheless shorter than them, and the
 * shortest had short children who were taller. Nothing was done to anyone; an
 * extreme is simply hard to repeat.
 *
 * The numbers here are group means computed from Galton's 928 tabulated children
 * (the standard digitization of his Table I, distributed as HistData::Galton),
 * with female heights multiplied by 1.08 exactly as Galton did. The population
 * average was about 68.3 inches. Grouped rather than taken from single one-inch
 * bins because the extreme bins are small (a handful of families) and noisy; the
 * grouped figures below reproduce Galton's headline finding, an overall
 * parent-to-child regression slope of about 0.65, so children's deviation from
 * the mean is roughly two-thirds of their parents'. See the provenance note.
 */
export const regressionMean: Puzzle = {
  schemaVersion: 1,
  id: "regression-to-mean-galton",
  slug: "back-toward-average",
  category: "statistical-reasoning",
  reasoningSkill: "regression-to-the-mean",
  difficulty: "medium",
  tags: ["everyday", "statistics", "biology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "The tallest parents have tall children. So the tallest parents of all should have the tallest children of all, surely?",
    },
    framing: {
      en: "In 1886 Francis Galton grouped 928 grown children by their parents' height. The tallest parents averaged about 72 inches, well above the roughly 68 inch average of the day; the shortest averaged about 65. Nobody did anything to the children. They grew up and were measured.",
    },
    question: { en: "What became of the children of these extreme-height parents?" },
    data: {
      type: "regression",
      label: { en: "Galton's 928 grown children, grouped by their parents' height" },
      unit: { en: "inches" },
      axisMin: 62,
      axisMax: 74,
      mean: 68.3,
      meanLabel: { en: "Average height" },
      firstLabel: { en: "The parents" },
      secondLabel: { en: "Their grown children" },
      groups: [
        {
          id: "tall",
          label: { en: "The tallest parents" },
          short: { en: "Tallest parents" },
          first: 71.9,
          second: 70.8,
          n: 66,
        },
        {
          id: "short",
          label: { en: "The shortest parents" },
          short: { en: "Shortest parents" },
          first: 65.1,
          second: 66.2,
          n: 103,
        },
      ],
    },
    initialView: { kind: "extremes" },
  },

  choices: [
    {
      id: "persist",
      label: { en: "Just as extreme as their parents" },
      sublabel: { en: "the tallest parents' children the tallest of all" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "cause",
      label: { en: "Some influence closed the gap" },
      sublabel: { en: "diet, mixing or the times narrowed the difference" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "toward-mean",
      label: { en: "Both landed nearer the average" },
      sublabel: { en: "less extreme than their parents, with nothing done to them" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The tallest parents' children were shorter than them; the shortest parents' children were taller. Both landed nearer the average.",
    },
    mechanismLabel: { en: "What pulls the extremes in" },
    mechanismName: { en: "Regression to the mean" },
    explanation: {
      en: "The tallest parents averaged 71.9 inches, about 3.6 above the 68.3 inch average. Their grown children averaged 70.8, only 2.5 above. The shortest parents averaged 65.1, about 3.2 below; their children 66.2, only 2.1 below. Roughly a third of each gap closed on its own, in both directions, and nobody touched the children. This is the pattern that gave regression its name.",
    },
    body: {
      en: "An unusually tall pair of parents is unusual partly for solid, heritable reasons and partly by luck, the fortunate end of many small things. The heritable part passes on; the luck does not, because it was luck. So the children keep the real part and shed the fluke, and land closer to the middle, and the shortest parents' children rise for the mirror reason. No force reaches in to even people out. It is only that an extreme is hard to repeat.",
    },
    view: { kind: "reversion" },
  },

  lesson: {
    skillName: { en: "Regression to the mean" },
    takeaway: {
      en: "Pick a group because it sits at an extreme and its next measurement will usually be less extreme, even if you do nothing. The worst cases tend to improve and the best tend to fade on their own, so a change in a hand-picked extreme group is not, by itself, evidence that anything worked.",
    },
    body: {
      en: "Whenever a group was chosen for being at an extreme, the sickest patients, the worst-performing schools, the accident black spots, the record-breaking quarter, expect it to move toward the average next time by itself. To show that a treatment, a policy or a new coach did the work, you need a comparison group that was equally extreme and left alone. Without one you may be measuring the weather rather than the climate.",
    },
    howItWorks: {
      en: "Any one measurement is part signal and part noise. Selecting the extremes selects the cases where the noise happened to pile up in the same direction as the signal. Measure again and the noise redraws itself, so the value falls back toward the average, and the noisier the measurement the further it falls. This quietly manufactures success stories wherever a decision follows a bad patch. Speed cameras go up after a cluster of crashes that was never going to repeat, so crashes fall and the camera takes the credit. A struggling team sacks its manager at its lowest point and recovers, as it would have anyway. A patient starts a remedy on their worst day and feels better by the next. Each improvement is real, and none of it shows the action caused anything, until you find the group that had the same bad patch and did nothing.",
    },
    examples: [
      {
        title: { en: "The same trap at the bedside" },
        summary: {
          en: "Enrol patients because their blood pressure is high and it tends to fall by the next visit even on a dummy pill, because the reading that got them in was partly a high day. When home monitoring was repeated over a year, the group with the highest starting readings fell the most, from about 156 to 143, and the group with the lowest rose, from about 113 to 120, the movement driven by regression rather than by anything done to them. An uncontrolled before-and-after look would have credited a treatment for both.",
        },
        provenance: {
          source:
            "Wang N, Atkins ER, Salam A, Moore MN, Sharman JE, Rodgers A. Regression to the mean in home blood pressure: analyses of the BP GUIDE study. Journal of Clinical Hypertension (Greenwich). 2020;22(7):1184-1191",
          year: 2020,
          doi: "10.1111/jch.13933",
          url: "https://pubmed.ncbi.nlm.nih.gov/32634288/",
        },
      },
    ],
  },

  share: {
    title: { en: "Regression to the mean, a reasoning trap." },
    explainer: {
      en: "Anything measured at its extreme, the sickest patients, the worst month, the record score, tends to look more ordinary next time, all on its own. The unusual value was partly a fluke, and flukes do not repeat. So when you act on a group precisely because it was extreme and it then improves, the improvement may be nothing more than the fluke fading. To know your action did anything, you need a group that was just as extreme and left alone.",
    },
    captions: {
      competitive: { en: "Caught the fluke. Bet you can't." },
      selfDeprecating: { en: "I gave the credit to the wrong thing." },
    },
  },

  provenance: {
    source:
      "Galton F. Regression towards mediocrity in hereditary stature. Journal of the Anthropological Institute of Great Britain and Ireland. 1886;15:246-263, Table I",
    year: 1886,
    doi: "10.2307/2841583",
    url: "https://galton.org/essays/1880-1889/galton-1886-jaigi-regression-stature.pdf",
    note: {
      en: "The figures are group means computed from Galton's 928 tabulated adult children, the standard digitization of his Table I (distributed as HistData::Galton), with female heights multiplied by 1.08 exactly as Galton did. The population average was about 68.3 inches. The tallest parents, those with a mid-parent height of 71 inches or more (66 children), averaged 71.9 inches and their children 70.8; the shortest, 65.5 inches or less (103 children), averaged 65.1 and their children 66.2. These are means of the tabulated data rather than verbatim printed cell values, and they are grouped because the single one-inch bins at the extremes hold only a handful of families and are noisy. Computed across all 928 pairs, the parent-to-child regression slope is about 0.65, which reproduces Galton's own finding that a child's deviation from the mean is roughly two-thirds of the mid-parent's, the result from which the word regression descends.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Regression_toward_the_mean",
};
