import type { Puzzle } from "../schema";

/**
 * Seed puzzle, the classic Simpson's-paradox reversal.
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
  tags: ["everyday", "clinical", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Treatment B cures more patients overall. Which would you pick?",
    },
    framing: {
      en: "Two kidney-stone treatments, 350 patients each. On overall success rate, Treatment B comes out ahead. Same illness, same goal, one number to go on.",
    },
    question: { en: "Which treatment would you pick?" },
    data: {
      type: "rates",
      metricLabel: { en: "Success rate" },
      higherIsBetter: true,
      groups: [
        {
          id: "A",
          label: { en: "Treatment A, open surgery" },
          short: { en: "A" },
        },
        {
          id: "B",
          label: { en: "Treatment B, keyhole (PCNL)" },
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
    headline: { en: "Treatment A actually wins, for both stone sizes." },
    mechanismName: { en: "Stone size (case severity)" },
    explanation: {
      en: "A and B weren't treating the same patients. A got mostly the hard cases (large stones), while B got mostly the easy ones. Everyone does worse on hard cases, so A's overall average sinks even though A wins in each group:",
    },
    view: { kind: "stratified" },
  },

  lesson: {
    skillName: { en: "Simpson's paradox" },
    takeaway: {
      en: "An overall trend can reverse once you account for a lurking variable that's split unevenly between the groups.",
    },
    body: {
      en: "Whenever two groups are compared with one pooled rate, ask what got mixed together to make that number, and whether the groups were even up against the same odds. Stone size is the clearest confounder here; it's rarely the only one.",
    },
    howItWorks: {
      en: "The 'combined' score isn't a fresh measurement; it's the group scores blended together, and bigger groups count for more. When one side is packed with easy cases and the other with hard ones, that blend pulls their combined scores in opposite directions. So one option can lead in the easy group and in the hard group, yet still trail overall, because it handled most of the hard cases, and its blended score sits closer to that lower number. The cure is a fair split: give both sides the same mix of easy and hard cases (exactly what a randomised trial does), and the reversal can't happen.",
    },
    examples: [
      {
        title: { en: "University admissions" },
        summary: {
          en: "In 1973, Berkeley's graduate schools admitted 44% of men but only 35% of women. It looked like plain bias. Yet department by department, women were admitted at about the same rate as men, or higher. Women simply applied more often to the most competitive departments, where almost everyone was turned away. The gap was about where people applied, not who was deciding.",
        },
        provenance: {
          source:
            "Bickel PJ, Hammel EA, O'Connell JW. Sex bias in graduate admissions: data from Berkeley. Science. 1975;187(4175):398-404.",
          year: 1975,
          doi: "10.1126/science.187.4175.398",
          url: "https://doi.org/10.1126/science.187.4175.398",
        },
      },
      {
        title: { en: "Baseball batting averages" },
        summary: {
          en: "David Justice out-hit Derek Jeter in 1995 (.253 to .250) and again in 1996 (.321 to .314). But over the two seasons combined, Jeter came out ahead, .310 to .270. Each single year said Justice; the two years together said Jeter, because the players had very different numbers of at-bats in their strong and weak seasons.",
        },
        provenance: {
          source:
            "Regular-season batting averages, Major League Baseball 1995-1996 (Derek Jeter, David Justice); popularised by Ken A. Ross, A Mathematician at the Ballpark (2004).",
          year: 1996,
          url: "https://www.baseball-reference.com/players/j/jeterde01.shtml",
        },
      },
      {
        title: { en: "COVID-19 death rates" },
        summary: {
          en: "Early in 2020, the reported death rate among COVID cases was higher in Italy than in China overall. But broken down by age, Italy's rate was lower in every age group. Italy simply had far more older patients, who are at higher risk, so pooling all ages together made Italy look worse than a fair, age-for-age comparison showed.",
        },
        provenance: {
          source:
            "von Kügelgen J, Gresele L, Schölkopf B. Simpson's paradox in Covid-19 case fatality rates: a mediation analysis of age-related causal effects. IEEE Trans Artif Intell. 2021;2(1):18-27.",
          year: 2021,
          doi: "10.1109/TAI.2021.3073088",
          url: "https://arxiv.org/abs/2005.07180",
        },
      },
    ],
  },

  share: {
    title: { en: "Simpson's paradox, a reasoning trap." },
    explainer: {
      en: "One choice can win in every single group, yet lose the moment you lump all the groups together. It sounds impossible, but it's real. It happens when the groups aren't a fair comparison: one side quietly got the easy cases, the other got the hard ones. So the big combined number says one thing while the group-by-group numbers say the opposite, and it's the big number that fools you.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Julious SA, Mullee MA. Confounding and Simpson's paradox. BMJ. 1994;309(6967):1480-1481. Underlying clinical data: Charig CR, Webb DR, Payne SR, Wickham JEA. Br Med J (Clin Res Ed). 1986;292(6524):879-882.",
    year: 1994,
    doi: "10.1136/bmj.309.6967.1480",
    url: "https://doi.org/10.1136/bmj.309.6967.1480",
    note: {
      en: "The 350/350 two-treatment table is as presented by Julious & Mullee (1994), drawn from the Charig et al. (1986) clinical series (which originally compared three modalities).",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Simpson%27s_paradox",
};
