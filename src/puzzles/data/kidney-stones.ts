import type { Puzzle } from "../schema";

/**
 * Seed puzzle — the classic Simpson's-paradox reversal.
 *
 * Data verified against the published figures (Julious & Mullee 1994, drawn
 * from Charig et al. 1986). Only the numerators/denominators are authored here;
 * every percentage shown in the app is DERIVED from them (see engine/charts/rates.ts),
 * so the aggregate reversal cannot be typoed into disagreement with the strata.
 * The accompanying test (engine/charts/rates.test.ts) asserts the paradox holds.
 */
export const kidneyStones: Puzzle = {
  schemaVersion: 1,
  id: "kidney-stones-simpsons",
  slug: "kidney-stones",
  category: "causal-reasoning",
  reasoningSkill: "simpsons-paradox",
  difficulty: "hard",
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Treatment B cures more patients overall. Which would you pick?",
    },
    framing: {
      en: "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal — one number to go on.",
    },
    question: { en: "Which treatment would you pick?" },
    data: {
      type: "rates",
      metricLabel: { en: "Success rate" },
      higherIsBetter: true,
      groups: [
        {
          id: "A",
          label: { en: "Treatment A — open surgery" },
          short: { en: "A" },
        },
        {
          id: "B",
          label: { en: "Treatment B — keyhole (PCNL)" },
          short: { en: "B" },
        },
      ],
      strata: [
        { id: "small", label: { en: "Small stones" } },
        { id: "large", label: { en: "Large stones" } },
      ],
      observations: [
        { groupId: "A", stratumId: "small", numerator: 81, denominator: 87 },
        { groupId: "A", stratumId: "large", numerator: 192, denominator: 263 },
        { groupId: "B", stratumId: "small", numerator: 234, denominator: 270 },
        { groupId: "B", stratumId: "large", numerator: 55, denominator: 80 },
      ],
    },
    initialView: { kind: "aggregate" },
  },

  choices: [
    {
      id: "B",
      label: { en: "Treatment B" },
      sublabel: { en: "83% overall" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "A",
      label: { en: "Treatment A" },
      sublabel: { en: "78% overall" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Treatment A actually wins — for both stone sizes." },
    confounderName: { en: "Stone size (case severity)" },
    explanation: {
      en: "A and B weren't treating the same patients. A got mostly the hard cases — large stones — while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:",
    },
    view: { kind: "stratified" },
  },

  lesson: {
    skillName: { en: "Simpson's paradox" },
    takeaway: {
      en: "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.",
    },
    body: {
      en: "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number — and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.",
    },
  },

  share: {
    title: { en: "I met the kidney-stone paradox." },
    captions: {
      competitive: {
        en: "Caught the reversal in one look. Bet you pick the wrong treatment.",
      },
      selfDeprecating: {
        en: "I confidently picked the worse treatment. Textbook.",
      },
    },
  },

  provenance: {
    source:
      "Julious SA, Mullee MA. Confounding and Simpson's paradox. BMJ. 1994;309(6967):1480–1481. Underlying clinical data: Charig CR, Webb DR, Payne SR, Wickham JEA. Br Med J (Clin Res Ed). 1986;292(6524):879–882.",
    year: 1994,
    doi: "10.1136/bmj.309.6967.1480",
    url: "https://doi.org/10.1136/bmj.309.6967.1480",
    note: {
      en: "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Simpson%27s_paradox",
};
