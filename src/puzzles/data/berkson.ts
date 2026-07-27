import type { Puzzle } from "../schema";

/**
 * Puzzle #9, Berkson's bias, on the first empirical demonstration of it.
 *
 * Counts are Sackett's Table 2 (page 53), carrying data from Roberts et al.
 * (1978): a general-population household survey of 2,784 people, and the 257
 * of them who had been in hospital in the previous six months. Read directly
 * from the page and arithmetic-checked: 17 + 207 = 224, 184 + 2376 = 2560,
 * 224 + 2560 = 2784; 5 + 15 = 20, 18 + 219 = 237, 20 + 237 = 257. The printed
 * relative odds reproduce too: (17 x 2376) / (207 x 184) = 1.06 in the
 * community, (5 x 219) / (15 x 18) = 4.06 in hospital.
 *
 * The hospital sample is nested INSIDE the survey, so the two strata are not a
 * case mix and must never be pooled: hence strataAreSeparateSamples. And the
 * metric is a disease rate with no good side, so no bar is crowned.
 */
export const berkson: Puzzle = {
  schemaVersion: 1,
  id: "berksons-bias-hospital-sample",
  slug: "hospital-sample",
  category: "causal-reasoning",
  reasoningSkill: "berksons-bias",
  difficulty: "hard",
  tags: ["clinical", "research", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Among hospital patients, lung trouble and joint trouble go together. Are the two diseases linked?",
    },
    framing: {
      en: "A survey knocked on doors and asked thousands of ordinary people what illnesses they had. Among those who had been in hospital in the previous six months, a quarter of the people with a respiratory disease also had a disease of the bones or joints, against well under a tenth of everyone else.",
    },
    question: { en: "Are these two diseases actually related?" },
    data: {
      type: "rates",
      metricLabel: { en: "Also had a bone or joint disease" },
      higherIsBetter: true,
      // Neither bar is a winner: this is how common a second illness was, not
      // a contest anybody is trying to win.
      crownWinner: false,
      // The hospital patients are part of the same survey, not a slice beside
      // it, so pooling the two panels would count them twice.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "resp",
          label: { en: "Had a respiratory disease" },
          short: { en: "Lungs" },
        },
        {
          id: "noresp",
          label: { en: "No respiratory disease" },
          short: { en: "No lungs" },
        },
      ],
      strata: [
        { id: "hospital", label: { en: "In hospital in the last 6 months" } },
        { id: "community", label: { en: "Everyone the survey asked" } },
      ],
      observations: [
        { groupId: "resp", stratumId: "hospital", numerator: 5, denominator: 20 },
        { groupId: "noresp", stratumId: "hospital", numerator: 18, denominator: 237 },
        { groupId: "resp", stratumId: "community", numerator: 17, denominator: 224 },
        { groupId: "noresp", stratumId: "community", numerator: 184, denominator: 2560 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["hospital"],
      caption: { en: "Hospital patients" },
    },
  },

  choices: [
    {
      id: "linked",
      label: { en: "Yes, one brings on the other" },
      sublabel: { en: "three times as common" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "reverse",
      label: { en: "Yes, but the other way round" },
      sublabel: { en: "the joint disease comes first" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "artefact",
      label: { en: "No, the hospital made the link" },
      sublabel: { en: "it is about who gets admitted" },
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
    headline: { en: "Ask everyone, and the link disappears." },
    mechanismLabel: { en: "The filter" },
    mechanismName: { en: "Two illnesses are two chances to be admitted" },
    explanation: {
      en: "The same survey, the same people, the same two diseases. Across everyone it asked, people with a respiratory disease were barely any likelier to have a bone or joint disease than people without one, and the odds come out at 1.06 against 1, which is nothing. The hospital panel is not a finding about disease, it is a finding about admission. Either illness can put you in a hospital bed, so people with both turn up there far more often than people with one, and inside those walls the two look inseparable:",
    },
    view: { kind: "stratified", caption: { en: "Hospital and community" } },
  },

  lesson: {
    skillName: { en: "Berkson's bias" },
    takeaway: {
      en: "Studying only the people who made it through a filter can invent a relationship that does not exist outside it.",
    },
    body: {
      en: "Hospitals are the obvious filter, and the reason case-control studies built on hospital patients are treated warily. But any selected group does it: people who answered the survey, users who stayed subscribed, applicants who got an interview. Ask what it took to get into the sample, and whether both things you are comparing help you get in.",
    },
    howItWorks: {
      en: "Suppose two illnesses are entirely unrelated, and either one on its own gives you some chance of being admitted to hospital. Someone unlucky enough to have both has two shots at admission, so they are much likelier to be in the ward than someone with only one. Now stand inside the ward and count. The people with the first illness are heavily enriched for also having the second, because that is what got many of them in. You have not discovered a link between the diseases. You have rediscovered the admission rule, and dressed it up as biology. The general shape of this is a collider: a thing that two causes both point into. Selecting on it, whether by studying only the admitted, only the tested, or only the successful, links the causes together in your data even when nothing links them in the world. The defence is a sample defined before the filter, which is exactly why population surveys and whole-population registries are worth their cost.",
    },
    examples: [
      {
        title: { en: "The bias that was theory for thirty years" },
        summary: {
          en: "Joseph Berkson warned in 1946 that hospital-based comparisons could manufacture associations, but his argument was mathematical and his numbers were invented to illustrate it. He noted that the same artefact would appear if you sampled shuffled cards rather than patients. It took until this survey, three decades later, for anyone to demonstrate the effect in real people.",
        },
        provenance: {
          source:
            "Berkson J. Limitations of the application of fourfold table analysis to hospital data. Biometrics Bull. 1946;2(3):47-53. (A mathematical argument illustrated with hypothetical figures, not observed data.)",
          year: 1946,
          doi: "10.2307/3002000",
          url: "https://doi.org/10.2307/3002000",
        },
      },
      {
        title: { en: "Why early covid studies disagreed" },
        summary: {
          en: "In 2020, studies of who caught covid and who fell severely ill could only recruit from people who had been tested or admitted, and early on those were mostly hospital staff, the already unwell and the elderly. Getting into the sample depended on the very things being studied. Analyses showed this alone could produce apparent risk factors, and even reverse the direction of a real one, without any biology behind it.",
        },
        provenance: {
          source:
            "Griffith GJ, Morris TT, Tudball MJ, et al. Collider bias undermines our understanding of COVID-19 disease risk and severity. Nat Commun. 2020;11:5749.",
          year: 2020,
          doi: "10.1038/s41467-020-19478-2",
          url: "https://www.nature.com/articles/s41467-020-19478-2",
        },
      },
    ],
  },

  share: {
    title: { en: "Berkson's bias, a reasoning trap." },
    explainer: {
      en: "Look only at hospital patients and two completely unrelated illnesses can appear to travel together. The reason is not biology, it is the door. Either illness can get you admitted, so people who happen to have both are over-represented inside, and from in there the two look linked. Any filtered group does this: the people who got tested, the applicants who got an interview, the customers who stayed. Before believing a pattern, ask what it took to get into the data.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Sackett DL. Bias in analytic research. J Chronic Dis. 1979;32(1-2):51-63, Table 2 (page 53), adapted from Roberts RS, Spitzer WO, Delmore T, Sackett DL. An empirical demonstration of Berkson's bias. J Chronic Dis. 1978;31(2):119-128.",
    year: 1979,
    doi: "10.1016/0021-9681(79)90012-2",
    url: "https://www.jameslindlibrary.org/wp-data/uploads/2014/06/Sackett-1979-whole-article.pdf",
    note: {
      en: "The counts are Table 2: household interviews with 2,784 people, of whom 257 had been in hospital in the previous six months. The table's own relative odds are 1.06 in the general population and 4.06 among the hospitalised. The hospital figures rest on only 20 people with a respiratory disease, so this single table demonstrates the mechanism rather than measuring its size precisely.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Berkson%27s_paradox",
};
