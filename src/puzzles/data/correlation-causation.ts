import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #3, correlation ≠ causation, via Messerli's real (tongue-in-cheek)
 * chocolate-Nobel correlation. Uses the "causal" data shape: a claimed cause, an
 * effect, and the lurking common cause that actually drives both.
 */
export const correlationCausation: Puzzle = {
  schemaVersion: 1,
  id: "chocolate-nobel-correlation",
  slug: "chocolate-nobel",
  category: "causal-reasoning",
  reasoningSkill: "correlation-not-causation",
  difficulty: "easy",
  tags: ["everyday", "research", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "More chocolate, more Nobel Prizes. Should your country stock up?",
    },
    framing: {
      en: "It's a real, published finding: across 23 countries, the more chocolate people eat, the more Nobel laureates the country has produced, a strong correlation (r ≈ 0.79). The trend is hard to argue with.",
    },
    question: { en: "So, does eating chocolate help win Nobel Prizes?" },
    data: {
      type: "causal",
      label: { en: "Across 23 countries" },
      cause: { en: "Chocolate eaten" },
      effect: { en: "Nobel prizes" },
      commonCause: { en: "A country's wealth" },
      correlationNote: { en: "r ≈ 0.79" },
      schematicNote: {
        en: "The slope is drawn from the published correlation of 0.79. Messerli plotted all 23 countries in his own figure; this one draws the trend alone rather than redrawing his points by eye.",
      },
    },
    initialView: { kind: "trend" },
  },

  choices: [
    {
      id: "cause",
      label: { en: "Yes, chocolate boosts brainpower" },
      sublabel: { en: "the trend is strong" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "fluke",
      label: { en: "No, it's a pure fluke" },
      sublabel: { en: "coincidence" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "common",
      label: { en: "No, a third thing drives both" },
      sublabel: { en: "a common cause" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here, because the setup
      // already gives you what you need to answer.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "The chocolate isn't doing anything." },
    mechanismLabel: { en: "The common cause" },
    mechanismName: { en: "A country's wealth pulls both up" },
    explanation: {
      en: "Wealthier countries can afford more chocolate AND fund more universities, labs and research, which is what actually wins Nobel Prizes. Wealth drives both, so chocolate and Nobels rise together without one causing the other. Hand out free chocolate and you'd get sweeter teeth, not more laureates.",
    },
    view: { kind: "cause" },
  },

  lesson: {
    skillName: { en: "Correlation ≠ causation" },
    takeaway: {
      en: "Two things moving together doesn't mean one causes the other. Often a third thing is quietly driving both.",
    },
    body: {
      en: "When you see a strong link, run through the possibilities before believing X causes Y: maybe Y causes X, maybe a common cause drives both, or maybe it's chance. Usually only a controlled comparison can tell which.",
    },
    howItWorks: {
      en: "A correlation only says two things tend to move together. That can happen for several reasons: one really does cause the other; the causation runs the other way; a hidden third factor drives both (a common cause, like hot weather driving both ice-cream sales and drownings); or it's a coincidence, which gets more likely the more data you sift through. Spotting a correlation is the easy part. Working out which of these is behind it is the real job, and usually needs an experiment, not just a chart.",
    },
    examples: [
      {
        title: { en: "Storks and babies" },
        summary: {
          en: "Across European countries, the ones with more storks really do have more human births, a statistically significant link. The legend isn't true: larger countries simply have room for both more storks and more people.",
        },
        provenance: {
          source:
            "Matthews R. Storks deliver babies (p = 0.008). Teaching Statistics. 2000;22(2):36-38. (Significant correlation across 17 European countries, a classic correlation ≠ causation lesson.)",
          year: 2000,
          doi: "10.1111/1467-9639.00013",
          url: "https://doi.org/10.1111/1467-9639.00013",
        },
      },
      {
        title: { en: "Nicolas Cage and drownings" },
        summary: {
          en: "The number of films Nicolas Cage releases in a year tracks the number of people who drown in swimming pools. Nobody thinks one causes the other; line up enough unrelated trends and some will match by pure chance.",
        },
        provenance: {
          source:
            "Vigen T. Spurious Correlations. New York: Hachette Books; 2015. (A catalogue of striking chance correlations.)",
          year: 2015,
          url: "https://www.tylervigen.com/spurious-correlations",
        },
      },
    ],
  },

  share: {
    title: { en: "Correlation ≠ causation, a reasoning trap." },
    explainer: {
      en: "Two things can rise and fall together perfectly and still have nothing to do with each other. Very often a hidden third thing is pulling both strings at once, so it looks like one causes the other when neither does. Before you believe a headline that “X is linked to Y,” ask what else could be driving both.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Messerli FH. Chocolate consumption, cognitive function, and Nobel laureates. N Engl J Med. 2012;367(16):1562-1564. (r ≈ 0.79 across 23 countries; a deliberately tongue-in-cheek demonstration that correlation is not causation.)",
    year: 2012,
    doi: "10.1056/NEJMon1211064",
    url: "https://doi.org/10.1056/NEJMon1211064",
  },

  goDeeperUrl:
    "https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation",
};
