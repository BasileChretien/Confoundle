import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #70, reverse causality, on Kivimäki 2015 (Thorax 71:84-85), read in
 * full at PMC.
 *
 * WHY THIS SOURCE AND NOT THE OBVIOUS ONES. Two earlier routes were searched
 * and abandoned, and backlog entry 71 records both. Both were hunting for a
 * cohort where one group simply looks worse, and the trouble is that the
 * explanation then has to be supplied by this deck rather than by the paper.
 * The route that works asks instead for a study reporting the SAME comparison
 * twice on the same cohort, once whole and once with the earliest deaths
 * discarded. That is two views of one dataset by construction, it is how
 * epidemiologists actually test for reverse causality, and these authors state
 * the conclusion themselves: underweight "is a consequence and not a cause of
 * respiratory disease or its risk factors".
 *
 * THE CONTROL IS WHY THIS IS A PUZZLE RATHER THAN A CHART. Throwing away data
 * shrinks estimates for boring reasons, and a reader who did not distrust that
 * would be reasoning badly. The paper anticipates it: the same exclusions
 * applied to coronary deaths move that association essentially not at all. So
 * the reveal is not "the number fell when we cut the data", it is "it fell here
 * and did not move there".
 *
 * THREE QUANTITIES ARE KEPT APART, because the card is about reading published
 * numbers carefully and it would be an embarrassment to blur them here. The
 * figures drawn are CRUDE CUMULATIVE RISK ratios derived from the printed
 * counts. They are not rate ratios, since no person-time enters them. They are
 * not the paper's 1.55 and 1.14, which are age-adjusted and smoking-adjusted
 * HAZARD ratios; those are quoted in the reveal and labelled as such.
 *
 * ADJACENCY, checked by opening the card rather than reading a row.
 * `correlation-not-causation` (`chocolate-nobel`) reveals a COMMON CAUSE, and
 * its takeaway says so: "a third thing is quietly driving both". This card's
 * reveal is the arrow running backwards, which is a different explanation of a
 * correlation and a different figure. That card's howItWorks does list "the
 * causation runs the other way" among four possibilities, which is precisely
 * the difference between naming a mechanism and teaching it.
 */
export const reverseCausality: Puzzle = {
  schemaVersion: 1,
  id: "reverse-causality-whitehall-2015",
  slug: "thin-and-then-dead",
  category: "causal-reasoning",
  reasoningSkill: "reverse-causality",
  difficulty: "hard",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Underweight men died of lung disease far more often than men of normal weight. Should a doctor tell a thin patient to put on weight to protect their lungs?",
    },
    framing: {
      en: "In 1967, 19,019 London civil servants were weighed once, and then followed for the next 45 years. Among the underweight, 168 of 934 eventually died of a respiratory disease. Among those of normal weight, 1,146 of 9,397 did. That gap survives adjustment for age and for smoking, and the same pattern appears separately among the smokers and among the non-smokers, so it is not simply that thin men smoked more. Two further things are worth holding on to. Chronic lung disease develops quietly over decades before it kills anyone. And losing weight is one of its well-known features.",
    },
    question: {
      en: "What is the safest reading of the gap between the two groups?",
    },
    data: {
      type: "attenuation",
      label: { en: "Respiratory death, underweight against normal weight" },
      windowLabel: {
        en: "Each row repeats the same comparison on the same cohort, after discarding everyone who died in the first years of follow-up.",
      },
      ratioLabel: {
        en: "The figure is a crude risk ratio: the share of each group that died, one divided by the other. Above 1 means the underweight died more often. It is not a rate ratio and not the adjusted hazard ratio the paper reports.",
      },
      rateNote: {
        en: "Counts are exactly as published: deaths and the number still at risk when each window opens. Every ratio here is derived from those counts.",
      },
      windows: [
        {
          id: "all",
          label: { en: "Everyone, over the whole 45 years" },
          short: { en: "Whole follow-up" },
          excludedYears: 0,
        },
        {
          id: "drop15",
          label: { en: "Ignoring everyone who died in the first 15 years" },
          short: { en: "First 15 years dropped" },
          excludedYears: 15,
        },
        {
          id: "drop30",
          label: { en: "Ignoring everyone who died in the first 30 years" },
          short: { en: "First 30 years dropped" },
          excludedYears: 30,
        },
      ],
      /** Underweight leads: the ratio is built as underweight over normal. */
      groups: [
        {
          id: "underweight",
          label: { en: "Underweight men" },
          short: { en: "Underweight" },
        },
        {
          id: "normal",
          label: { en: "Men of normal weight" },
          short: { en: "Normal weight" },
        },
      ],
      outcomes: [
        {
          id: "respiratory",
          label: { en: "Death from respiratory disease" },
          short: { en: "Respiratory death" },
        },
        {
          id: "coronary",
          label: { en: "Death from coronary heart disease" },
          short: { en: "Heart disease death" },
          isControl: true,
          note: {
            en: "The same men, the same exclusions, a disease that does not make you thin for years beforehand. If discarding data were what moved the first figure, it would move this one too.",
          },
        },
      ],
      observations: [
        { windowId: "all", groupId: "underweight", outcomeId: "respiratory", events: 168, n: 934 },
        { windowId: "all", groupId: "normal", outcomeId: "respiratory", events: 1146, n: 9397 },
        { windowId: "drop15", groupId: "underweight", outcomeId: "respiratory", events: 124, n: 704 },
        { windowId: "drop15", groupId: "normal", outcomeId: "respiratory", events: 1009, n: 7774 },
        { windowId: "drop30", groupId: "underweight", outcomeId: "respiratory", events: 53, n: 361 },
        { windowId: "drop30", groupId: "normal", outcomeId: "respiratory", events: 545, n: 4436 },
        { windowId: "all", groupId: "underweight", outcomeId: "coronary", events: 158, n: 934 },
        { windowId: "all", groupId: "normal", outcomeId: "coronary", events: 2017, n: 9397 },
        { windowId: "drop15", groupId: "underweight", outcomeId: "coronary", events: 106, n: 704 },
        { windowId: "drop15", groupId: "normal", outcomeId: "coronary", events: 1442, n: 7774 },
        { windowId: "drop30", groupId: "underweight", outcomeId: "coronary", events: 36, n: 361 },
        { windowId: "drop30", groupId: "normal", outcomeId: "coronary", events: 563, n: 4436 },
      ],
    },
    initialView: {
      kind: "atbaseline",
      caption: { en: "Everyone, over the whole follow-up" },
    },
  },

  choices: [
    {
      /**
       * The trap, and the paper's own stated stake: its introduction says that
       * on this reading "physicians might encourage their patients to maintain
       * normal weight as a means of preventing respiratory disease".
       */
      id: "thin-lungs",
      label: {
        en: "Thinness damages the lungs",
      },
      sublabel: { en: "tell them to eat" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "smoking-explains",
      label: {
        en: "Smoking, and adjusting would make the gap go away",
      },
      sublabel: { en: "the usual confounder" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "already-ill",
      label: {
        en: "The illness made them thin",
      },
      sublabel: { en: "the arrow points backwards" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "too-few",
      label: {
        en: "Nothing, the groups are too lopsided",
      },
      sublabel: { en: "not enough of them" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Throw away every man who died in the first 30 years and the gap nearly closes, from 1.47 to 1.19. Do exactly the same to heart disease deaths and nothing moves at all.",
    },
    mechanismLabel: { en: "And with the early deaths thrown away" },
    mechanismName: { en: "The thinness was the disease arriving" },
    explanation: {
      en: "If being thin damaged the lungs, it should not matter when a man died: the damage would still be there in 1990 and in 2010. If instead the disease was making men thin before it killed them, the association should live almost entirely among the men who died soonest after being weighed, and it should fade as those men are removed. That is the test, and it is done here on the same cohort three times over. Whole follow-up: 168 of 934 underweight men against 1,146 of 9,397, a crude risk ratio of 1.47. Discard everyone who died in the first 15 years: 1.36. Discard the first 30 years: 53 of 361 against 545 of 4,436, which is 1.19. The paper's own adjusted figures make the same walk, from a hazard ratio of 1.55 (95 per cent CI 1.32 to 1.83) to 1.14 (0.76 to 1.71), with p for trend below 0.001. Now the objection that ought to have occurred to you, because it occurred to the authors: throwing away data shrinks things for dull reasons, and by the last window more than half the cohort is gone, 4,797 men left of the 10,331 these two groups started with. So they ran the identical exclusions on deaths from coronary heart disease, which is a disease that does not spend years quietly making you thin. That ratio starts at 0.79 and ends at 0.79. The exclusions are not what moved the first number. What moved it was that the first number was largely built out of men who were already dying when somebody wrote down their weight.",
    },
    body: {
      en: "The practical stake is in the paper's first paragraph. If underweight caused respiratory death, then doctors should be telling thin patients to gain weight in order to protect their lungs, and clinical guidance would follow. If instead weight loss is an early sign of the disease, that advice is useless at best: it treats a symptom as though it were a cause, and it may delay somebody asking why the patient is losing weight in the first place, which is the question that would actually help them. Notice how little this has to do with the size of the correlation. The gap was large, it was statistically solid, it survived adjustment for age and for smoking, and it appeared in smokers and non-smokers alike. Every check that is usually deployed against a spurious association passed, because none of those checks is aimed at the direction of the arrow. Confounding and reverse causation are different problems and adjustment only addresses the first. This is also why the 45 years matter. The authors point out that the Prospective Studies Collaboration, the largest study on the question, excluded deaths in the first 15 years, and that most studies exclude 3 or 5, and that on this evidence all of those are too short: the contamination was still visible at 15 and had not entirely gone by 30. A study with a decade of follow-up simply could not have found this out about itself."
    },
    view: {
      kind: "astrimmed",
      caption: { en: "The same comparison, three times over" },
    },
  },

  lesson: {
    skillName: { en: "Which way the arrow points" },
    takeaway: {
      en: "Before asking whether a correlation is confounded, ask whether it is pointing the wrong way. Adjustment cannot fix an arrow that runs backwards, and an association can be large, robust and thoroughly adjusted while still describing the outcome causing the exposure.",
    },
    body: {
      en: "A correlation between two things has four ordinary explanations: one causes the other, the other causes the one, something else causes both, or it is chance. Most of the effort in statistics goes into the third, because confounding is the one that adjustment and randomisation are built to handle. Reverse causation gets far less attention and is often the more likely candidate, particularly whenever the exposure is something a person's body or behaviour can change and the outcome is a slow disease. The reason is a matter of timing. Serious illnesses have long silent prodromes, and during those years they change people: they make them thinner, less active, less inclined to drink, more likely to stop smoking, more likely to sleep badly, more likely to lose grip strength. Any of those, measured once at the start of a study, will then look like a risk factor for the disease that was already quietly causing it. That is the family this card belongs to, and its members are everywhere in health research: the healthy adherer effect, the sick quitter, the obesity paradox, and a long line of nutrients and habits that looked protective until somebody excluded the early years. What makes reverse causation hard is that it does not look like a mistake. The association is real, the data are honest, the adjustment is competent, and the effect size is often large. What is wrong is not the number but the sentence people put around it, and that sentence usually arrives with a causal verb smuggled into it: thinness raises the risk, exercise protects, coffee prevents. Reading those verbs carefully is most of the skill.",
    },
    howItWorks: {
      en: "The test used here is worth learning because it is simple, cheap, and available to a reader rather than only to the authors. If the exposure caused the outcome, the association should not care much about when the outcome happened. If the outcome caused the exposure, the association should be concentrated among the people whose outcome came soonest, since those are the ones already ill at measurement. So: remove the earliest events and look again. A causal association survives; a reverse-causal one melts. Two cautions come with it, both illustrated here. First, the exclusion has to be long enough. Three years is the usual convention and this cohort was still contaminated at 15, which tells you the convention is calibrated to what is affordable rather than to how slowly disease develops. Second, and more important, an attenuation on its own proves nothing, because throwing away data can shrink an estimate for reasons that have nothing to do with the hypothesis. That is why the control matters, and why you should ask for one: run the same exclusions on an outcome that the exposure could not plausibly be an early sign of, and check that nothing happens. Outside medicine the shape recurs whenever a measurement is taken from people who are already on their way somewhere. Companies that adopt a management fad are often already growing, which is what gave them the slack to try it. Students who use the study app were already the ones who intended to revise. Neighbourhoods that gain a new supermarket were already gentrifying. In each case the intervention arrives with a plausible story, the correlation is real, and the arrow has been drawn by whoever wanted it to point that way.",
    },
  },

  share: {
    title: { en: "Which way the arrow points, a reasoning trap." },
    explainer: {
      en: "19,019 London civil servants were weighed once in 1967 and followed for 45 years. Underweight men died of respiratory disease at 168 of 934 against 1,146 of 9,397 for men of normal weight, a risk ratio of 1.47 that survived adjustment for age and smoking. Then discard everyone who died in the first 30 years: the ratio falls to 1.19. Do exactly the same to heart disease deaths and it does not move, 0.79 to 0.79. The thinness was not causing the lung disease. The lung disease had been causing the thinness for years.",
    },
    captions: {
      competitive: { en: "Checked which way the arrow pointed." },
      selfDeprecating: { en: "I was ready to prescribe second helpings." },
    },
  },

  provenance: {
    source:
      "Kivimäki M, Shipley MJ, Bell JA, Brunner EJ, Batty GD, Singh-Manoux A. Underweight as a risk factor for respiratory death in the Whitehall cohort study: exploring reverse causality using a 45-year follow-up. Thorax. 2015;71(1):84-85. DOI 10.1136/thoraxjnl-2015-207449, PMID 26253581, PMCID PMC4717419. Open access, read in full at PMC. Design: the original Whitehall study, 19,019 male London-based government employees aged 40 to 69 at baseline in 1967 to 1970, with mortality surveillance to 30 September 2012. Analysis population 18,823, 507,648 person-years at risk, 2,139 respiratory deaths and 4,461 coronary deaths. Body mass index measured once, at baseline. The published headline is an age-adjusted and smoking-adjusted hazard ratio of 1.55 (95 per cent CI 1.32 to 1.83) for underweight against normal weight, attenuating in a stepwise manner to 1.14 (0.76 to 1.71) after serial exclusion of deaths occurring in the first 5 to 35 years of follow-up, P for trend below 0.001. Counts used by this card come from the article's table of participants alive and deaths at 0, 15 and 30 years excluded: underweight 934, 704 and 361 men with 168, 124 and 53 respiratory deaths; normal weight 9,397, 7,774 and 4,436 men with 1,146, 1,009 and 545. Coronary deaths over the same windows: underweight 158, 106 and 36; normal weight 2,017, 1,442 and 563. The authors' conclusion is that the excess risk among the underweight is attributable to reverse causality, and that underweight is a consequence and not a cause of respiratory disease or its risk factors.",
    year: 2015,
    doi: "10.1136/thoraxjnl-2015-207449",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4717419/",
    note: {
      en: "Five things. First, what this card draws and what it does not. The figures on the chart are CRUDE CUMULATIVE RISK ratios computed from the printed counts, deaths divided by the number alive when each window opens. They are not rate ratios, because no person-time enters them and none is printed per cell. They are not the paper's 1.55 and 1.14 either, which are age-adjusted and smoking-adjusted HAZARD ratios; those appear in the reveal text and are labelled as hazard ratios there. Three quantities, kept apart on purpose, on a card about reading published numbers carefully. Second, the crude ratios and the published ones agree about the thing that matters: crude respiratory 1.475, 1.357 and 1.195 across the three windows against a published hazard ratio walking 1.55 to 1.14, and crude coronary 0.788, 0.812 and 0.786 against a published 0.85 that the authors report as unchanged by the exclusions. Third, an arithmetic check that is asserted in this puzzle's test file: the paper's smoking split of the respiratory deaths reconciles exactly in all six cells, 44 plus 124 is 168, 39 plus 85 is 124, 19 plus 34 is 53 for the underweight, and 494 plus 652 is 1,146, 457 plus 552 is 1,009, 289 plus 256 is 545 for normal weight. Fourth, a discrepancy recorded rather than hidden: the smoking split of the DENOMINATORS is short by one or two men in three cells, 5,012 plus 4,383 being 9,395 against a printed 9,397, and similarly at the other windows. The paper does not explain it and no cause is assumed here; the deaths reconcile exactly and nothing this card draws uses that split. Fifth, on scope. These are male British civil servants weighed once between 1967 and 1970, which is a particular group in a particular era, and body mass index is a crude measure of thinness that does not distinguish a small frame from recent wasting. What the card claims is the structure of the inference and the value of the test, not a number that transfers.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation",
};
