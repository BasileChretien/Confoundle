import type { Puzzle } from "../schema.ts";

/**
 * Effect modification versus confounding, on the `interaction` shape.
 *
 * The setup shows a gene variant with about 2.5 times the odds of esophageal
 * cancer, a number that barely moves when you adjust for alcohol, which usually
 * says "not confounded, a real independent effect". The reveal splits by
 * drinking: the variant does almost nothing in non-drinkers (OR 1.25) and
 * quadruples the odds in drinkers (OR 4.39). The 2.5 was the average of two
 * different worlds, and averaging is the wrong move for a modifier.
 *
 * Counts are the men's panel of Choi et al. 2021, Table 3, read from the open
 * PMC full text. The four cells per stratum reproduce the paper's printed odds
 * ratios exactly; the crude and Mantel-Haenszel figures are derived (see
 * engine/charts/interaction.ts). Men's panel because the women's odds ratios in
 * the same table are age-adjusted and do not reconcile from the raw cells.
 */
export const effectModification: Puzzle = {
  schemaVersion: 1,
  id: "effect-modification-aldh2",
  slug: "average-of-two-worlds",
  category: "causal-reasoning",
  reasoningSkill: "effect-modification-vs-confounding",
  difficulty: "hard",
  tags: ["research", "epidemiology", "clinical"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A gene variant carried by millions goes with about 2.5 times the odds of esophageal cancer, and adjusting for alcohol barely changes it. A modest risk gene, then?",
    },
    framing: {
      en: "In South Korean men, researchers compared the ALDH2 gene variant between esophageal cancer patients and healthy controls. Carriers had roughly 2.5 times the odds of cancer, and adjusting for whether the men drank alcohol left that almost unchanged, which usually means a factor is standing on its own.",
    },
    question: { en: "What is the gene really doing?" },
    data: {
      type: "interaction",
      label: { en: "The ALDH2 variant and esophageal cancer in Korean men" },
      exposureLabel: { en: "Odds of esophageal cancer with the variant" },
      modifierLabel: { en: "alcohol drinking" },
      crudeLabel: { en: "Ignoring drinking" },
      adjustedLabel: { en: "Adjusted for drinking" },
      noEffectLabel: { en: "no effect" },
      strata: [
        {
          id: "drinkers",
          label: { en: "Current drinkers" },
          short: { en: "Drinkers" },
          exposedCases: 219,
          exposedControls: 421,
          unexposedCases: 211,
          unexposedControls: 1782,
        },
        {
          id: "nondrinkers",
          label: { en: "Non-drinkers" },
          short: { en: "Non-drinkers" },
          exposedCases: 198,
          exposedControls: 718,
          unexposedCases: 123,
          unexposedControls: 556,
        },
      ],
    },
    initialView: { kind: "crude" },
  },

  choices: [
    {
      id: "independent",
      label: { en: "A modest risk factor in its own right" },
      sublabel: { en: "about 2.5 times the odds, with or without drinking" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "illusion",
      label: { en: "An illusion, drinking is the real cause" },
      sublabel: { en: "adjust it away and nothing is left" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "depends",
      label: { en: "It only matters in people who drink" },
      sublabel: { en: "the effect depends on the drinking" },
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
    headline: {
      en: "In men who do not drink the variant does almost nothing (1.25). In men who drink it quadruples the odds (4.39). The 2.5 was the average of two different worlds.",
    },
    mechanismLabel: { en: "Confounder, or modifier?" },
    mechanismName: { en: "Effect modification" },
    explanation: {
      en: "Split by drinking, the odds ratio is 1.25 in non-drinkers, its confidence interval crossing 1, and 4.39 in drinkers. The crude 2.6, and the drinking-adjusted 2.4, sit between the two and describe neither group. The variant slows the clearance of acetaldehyde, a carcinogen the body makes from alcohol, so it can only do harm when there is alcohol to process. Adjusting for drinking treats it as a nuisance to subtract, but here drinking is the very thing that switches the gene's danger on.",
    },
    body: {
      en: "This is the line between a confounder and an effect modifier. A confounder is a rival explanation you remove by adjustment, and once it is removed the single adjusted number is your answer. An effect modifier is not a nuisance, it is the finding, and the right move is not to average the strata but to report them apart. \"The variant quadruples the odds in drinkers and does nothing otherwise\" is true and useful. \"The variant raises the odds about 2.5-fold\" is true of no one.",
    },
    view: { kind: "bystratum" },
  },

  lesson: {
    skillName: { en: "Effect modification versus confounding" },
    takeaway: {
      en: "When a factor's effect differs sharply between subgroups, do not adjust it into a single number. Adjustment answers the confounding question, what is the effect once we account for the other variable. It cannot answer the modification question, does the effect depend on that variable. An average can be true of the whole and describe no one in it.",
    },
    body: {
      en: "Faced with a third variable, two different moves are possible. If it distorts the comparison but the effect is really the same in everyone, it is a confounder: adjust for it and report one number. If the effect genuinely differs across its levels, it is an effect modifier: report each level on its own. The tell is in the stratified table. If the stratum-specific effects are close to each other but differ from the crude, you had confounding. If they differ from each other, you have modification, and the crude or adjusted figure is an average that can mislead about everybody.",
    },
    howItWorks: {
      en: "Adjustment and stratification begin the same way, by splitting the data on the third variable, and then they part. Adjustment recombines the strata into one weighted number, which is exactly right when they agree and exactly wrong when they do not, because it buries the disagreement inside an average. So look at the strata before you pool them. When they tell the same story, one number is a fair summary. When they tell different stories, that number is a fiction of the middle, and the honest report is the split. Effect modification is not a bias to scrub out, it is often the most useful thing a study finds, the map of who is affected and who is not. It is also why a treatment can be worthless on average and life-saving in a subgroup, and why \"no overall effect\" and \"no effect\" are not the same sentence.",
    },
    examples: [
      {
        title: { en: "A drug that works only for some tumours" },
        summary: {
          en: "Trastuzumab, added to chemotherapy, improved survival in metastatic breast cancer that overexpresses the HER2 protein. It is given only to patients whose tumour is HER2-positive, because that marker is what its benefit depends on. Averaging its effect across all breast cancers would understate it for the women it helps and invent a benefit for those it does not. So the tumour marker is tested for before the drug is prescribed, which is effect modification turned into routine practice rather than adjusted away.",
        },
        provenance: {
          source:
            "Slamon DJ, Leyland-Jones B, Shak S, et al. Use of chemotherapy plus a monoclonal antibody against HER2 for metastatic breast cancer that overexpresses HER2. New England Journal of Medicine 2001;344(11):783-792",
          year: 2001,
          doi: "10.1056/NEJM200103153441101",
          url: "https://pubmed.ncbi.nlm.nih.gov/11248153/",
        },
      },
    ],
  },

  share: {
    title: { en: "Effect modification versus confounding, a reasoning trap." },
    explainer: {
      en: "A single adjusted number assumes a factor works the same for everyone. Often it does not. A gene, a drug or a policy can do a great deal in one group and nothing in another, and averaging the two gives a figure that is true of no one. When the effect differs across groups, the groups are the answer, not a nuisance to average away.",
    },
    captions: {
      competitive: { en: "Caught the average that fooled everyone." },
      selfDeprecating: { en: "I adjusted away the whole point." },
    },
  },

  provenance: {
    source:
      "Choi CK, Yang J, Kweon S-S, Cho S-H, Kim H-Y, Myung E, Shin M-H. Association between ALDH2 polymorphism and esophageal cancer risk in South Koreans: a case-control study. BMC Cancer 2021;21:254, Table 3 (men)",
    year: 2021,
    doi: "10.1186/s12885-021-07993-4",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7941978/",
    note: {
      en: "The four cells of each stratum are read from Table 3, men's panel. Among current drinkers, 219 of 640 variant carriers were cancer patients against 211 of 1,993 non-carriers; among non-drinkers, 198 of 916 carriers against 123 of 679 non-carriers. The stratum odds ratios reproduce the paper's printed 4.39 and 1.25 exactly, the pooled cells give a crude 2.56, and the Mantel-Haenszel adjustment gives 2.44, consistent with the paper's finding that the association differs by drinking (interaction P < 0.001). Two honesty notes. The men's panel is used because the women's odds ratios in the same table are age-adjusted and do not reconcile from the raw cells. And the exposure is framed as the paper frames it, the genotype, with drinking as the modifier; framing alcohol as the exposure on these same cells would give a misleading apparently protective odds ratio, an artefact of non-drinkers who abstain because of ill health and of not adjusting for tobacco.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Interaction_(statistics)",
};
