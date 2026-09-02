import type { Puzzle } from "../schema.ts";

/**
 * The Table 2 fallacy, on the `forest` shape.
 *
 * One model, fitted once on 2,963,888 California births, printing four adjusted
 * risk ratios in one table: preeclampsia 4.65, previous preterm birth 3.56,
 * alcohol abuse 1.49, low education 1.12. Four rows, one column, and they are
 * three different kinds of quantity. Re-estimated on their own terms, two of
 * them move and two do not, and the moves are 10 and 23 per cent with intervals
 * that do not overlap the originals.
 *
 * THE QUESTION IS NOT THE ONE BACKLOG 79'S NEIGHBOUR ENTRY PROPOSED, and the
 * change is worth recording because the sourcing note got it wrong. Entry 78
 * came out of its sourcing pass proposing "which row moves most", which reads
 * well and is not answerable: the reader is told which rows are broken but has
 * nothing that ranks the SIZE of two different biases against each other, so
 * two bands would sit on the licensed direction and the hedge rule would break.
 * The question shipped here is qualitative and fully determined by the causal
 * story in the framing: WHICH ROWS CAN BE READ AT ALL. The magnitudes then
 * become the reveal rather than the thing being guessed, which is the right way
 * round anyway, since the surprise is that a difference this large is invisible
 * in a table that looks uniform.
 *
 * THE TRAP IS THE FALLACY ITSELF. "All four, they were fitted at once, on the
 * same women, adjusted for the same things" is what almost every reader of
 * almost every paper does, including readers who would never make the mistake
 * about their own exposure. It is offered without a hedge because it is exactly
 * the belief the card exists to break.
 *
 * WHY EACH ROW IS WHAT IT IS, which the framing has to carry in words because
 * no table can show it. Previous preterm birth causes preeclampsia as well as
 * preterm birth, so holding preeclampsia fixed blocks part of its effect and
 * its row is a controlled direct effect. Alcohol abuse is confounded by drug
 * abuse, which is not in the model because preeclampsia's estimate never needed
 * it. Low education has no path to preeclampsia at all, so its coefficient was
 * a total effect from the start and does not move.
 *
 * THE PAIRS ARE ADJACENT AND NOT COLOUR-MATCHED, which is deliberate. Seven
 * rows exceed the five-colour palette, and `declaredColors` gives every row its
 * own slot regardless, so colour cannot express pairing here for any number of
 * rows. Adjacency and the labels carry it instead. What `declaredColors` DOES
 * guarantee is the thing that matters: a row drawn at the setup keeps its
 * colour when the reveal adds three more beside it.
 *
 * WHAT THIS CARD MUST NOT SAY is that the model is wrong. It is not, and the
 * authors built it this way on purpose as a teaching example. The preeclampsia
 * estimate is exactly what it claims to be. What fails is the reading, and the
 * paper is quite open that its changes are "modest": the point is not that the
 * numbers are wildly off, it is that nothing in the table tells you which of
 * them to trust.
 */
export const tableTwoFallacy: Puzzle = {
  schemaVersion: 1,
  id: "table-two-fallacy-preeclampsia",
  slug: "four-rows-three-meanings",
  category: "causal-reasoning",
  reasoningSkill: "table-two-fallacy",
  difficulty: "hard",
  tags: ["research", "statistics", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A study of nearly three million California births asks whether preeclampsia leads to preterm birth. It fits one model, adjusting for three other things, and prints all four risk ratios in a single table. This is what almost every paper does.",
    },
    framing: {
      en: "Take the study's own causal assumptions as given. Previous preterm birth is a cause of preeclampsia as well as of preterm birth. Alcohol abuse in pregnancy travels with drug abuse, and only alcohol is in the model, because preeclampsia's estimate never needed drug abuse. Low education predicts preterm birth and has nothing to do with preeclampsia; it is in the model because it predicts the outcome.",
    },
    question: {
      en: "Which of these four rows can be read as that variable's own effect on preterm birth?",
    },
    data: {
      type: "forest",
      label: { en: "One table of adjusted risk ratios for preterm birth" },
      unit: {
        en: "Adjusted risk ratio for birth before 37 weeks. Every model also adjusts for maternal age, race, smoking in pregnancy and body mass index.",
      },
      metricLabel: {
        en: "Beside each row: the risk ratio, then how many of the 2,963,888 women had that characteristic.",
      },
      nullValue: 1,
      nullLabel: { en: "No difference" },
      worseLabel: { en: "More preterm birth" },
      betterLabel: { en: "Less preterm birth" },
      // A risk ratio for an adverse outcome: above the line is the harmful
      // side, so the axis labels have to be swapped against the default.
      higherIsWorse: true,
      axisMin: 0.5,
      axisMax: 5,
      /*
        THE FOUR PRINTED ROWS LEAD, each followed by its own re-estimate where
        one exists. The reveal is a superset, so authoring them interleaved is
        what puts each pair together on screen rather than appending three
        loose rows at the bottom.
      */
      rows: [
        {
          id: "preeclampsia",
          label: { en: "Preeclampsia, the exposure the study is about" },
          short: { en: "Preeclampsia" },
          estimate: 4.65,
          ciLow: 4.59,
          ciHigh: 4.7,
          k: 102545,
        },
        {
          id: "pptb-printed",
          label: { en: "Previous preterm birth, as the table prints it" },
          short: { en: "Previous preterm birth" },
          estimate: 3.56,
          ciLow: 3.47,
          ciHigh: 3.66,
          k: 20032,
        },
        {
          id: "pptb-total",
          label: { en: "Previous preterm birth, estimated on its own terms" },
          short: { en: "the same row, re-estimated" },
          estimate: 3.91,
          ciLow: 3.81,
          ciHigh: 4,
          k: 20032,
        },
        {
          id: "alcohol-printed",
          label: { en: "Alcohol abuse in pregnancy, as the table prints it" },
          short: { en: "Alcohol abuse" },
          estimate: 1.49,
          ciLow: 1.42,
          ciHigh: 1.56,
          k: 13214,
        },
        {
          id: "alcohol-total",
          label: { en: "Alcohol abuse, estimated on its own terms" },
          short: { en: "the same row, re-estimated" },
          estimate: 1.15,
          ciLow: 1.1,
          ciHigh: 1.22,
          k: 13214,
        },
        {
          id: "education-printed",
          label: { en: "Under twelve years of education, as the table prints it" },
          short: { en: "Education under 12 years" },
          estimate: 1.12,
          ciLow: 1.11,
          ciHigh: 1.14,
          k: 708807,
        },
        {
          id: "education-total",
          label: { en: "Under twelve years of education, estimated on its own terms" },
          short: { en: "the same row, re-estimated" },
          estimate: 1.13,
          ciLow: 1.12,
          ciHigh: 1.14,
          k: 708807,
        },
      ],
    },
    initialView: {
      kind: "whatisknown",
      groupIds: ["preeclampsia", "pptb-printed", "alcohol-printed", "education-printed"],
      caption: { en: "The table as published: one model, four risk ratios" },
    },
  },

  /*
    Exactly one band survives the framing, and it is settled by the causal story
    rather than by any magnitude. Previous preterm birth is upstream of the
    exposure, so its coefficient is a direct effect with part of its own path
    blocked. Alcohol abuse travels with something the model does not contain.
    Education has no path to the exposure, so its coefficient never had anything
    blocked or confounded. The trap is the fallacy stated as a virtue: they were
    fitted at once, therefore they mean the same thing.
  */
  choices: [
    {
      id: "all-four",
      label: {
        en: "All four. They were fitted at once, on the same women, adjusted for the same things",
      },
      sublabel: { en: "one model, one table, one kind of number" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "exposure-only",
      label: { en: "Only preeclampsia. It is the one thing the study set out to estimate" },
      sublabel: { en: "the others are there to be adjusted for, not to be read" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "two-of-them",
      label: { en: "Preeclampsia and low education, and neither of the other two" },
      sublabel: { en: "one row is upstream of the exposure, one travels with something absent" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "none",
      label: { en: "None of them. A regression coefficient is never a causal effect" },
      sublabel: { en: "adjustment cannot deliver causation" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Estimated on its own terms, previous preterm birth is 3.91 rather than 3.56, and alcohol abuse is 1.15 rather than 1.49. Neither new interval overlaps the printed one. Preeclampsia and low education do not move, because they were already the thing they looked like.",
    },
    mechanismLabel: { en: "What were the other two rows measuring?" },
    mechanismName: { en: "Three kinds of number in one column" },
    explanation: {
      en: "Previous preterm birth causes preeclampsia as well as preterm birth. Holding preeclampsia fixed, which is what putting it in the model does, blocks the part of its effect that runs that way, so its row is the leftover: the effect it has by some other route. Released from that, it strengthens by 10 per cent. Alcohol abuse has a different problem. It travels with drug abuse, and drug abuse is not in the model, because nobody needed it there to get preeclampsia right. Adjusted for drug abuse, alcohol's own effect falls by 23 per cent. Low education has no path to preeclampsia at all, so nothing about its coefficient was ever blocked or confounded, and it moves by less than one per cent. Three different situations, four identical-looking rows, and nothing in the table to tell them apart.",
    },
    body: {
      en: "Notice what this does not say. The model is not wrong and the study is not sloppy: this is a teaching paper whose authors built the table this way on purpose, and the preeclampsia estimate is exactly what it claims to be. The changes are also modest, as the authors say themselves. What is not modest is that a reader cannot see which is which. The rows print to the same number of decimal places in the same column, and the two that moved did not move because of noise: their new intervals do not overlap their old ones. The habit this breaks is worth more than the numbers. Almost every reader of almost every paper reads the whole table as a list of effects, including readers who would never make that mistake about the exposure they came for.",
    },
    view: { kind: "themissingrow" },
  },

  lesson: {
    skillName: { en: "Table 2 and what its rows mean" },
    takeaway: {
      en: "A model is built to estimate one thing. The other coefficients came along to make that one estimate work, and they were never chosen, checked or specified for their own sake. Before reading a row that is not the exposure, ask what it would take for that row to be that variable's effect: nothing between it and the outcome that the model holds fixed, and nothing outside the model that pushes both it and the outcome around. Usually one of those fails, and the table gives no sign.",
    },
    body: {
      en: "Two things go wrong, and they go wrong in opposite directions. A covariate that lies upstream of the exposure has part of its own effect blocked, because the exposure is in the model and its path runs through it; what is left is a direct effect, not the total effect a reader assumes. A covariate that has its own confounders is simply confounded, because the model's adjustment set was chosen to make the exposure unconfounded and nobody asked what this variable needed. Both produce a number that is real, stable, tightly bounded and about something other than what the row is labelled.",
    },
    howItWorks: {
      en: "The remedy is unglamorous and it is not statistical. If a secondary variable is genuinely of interest, it needs its own model, with its own adjustment set worked out from its own causal story, and it should be reported separately. If it is not of interest, it does not belong in the table at all; print the exposure and say what was adjusted for. Where a table has to carry several rows, the caption can say which of them are interpretable, which costs a sentence. What does not work is the obvious shortcut of taking the exposure back out of the model. Here that gives alcohol abuse a risk ratio of 1.61, which is further from the truth than the 1.49 that was printed, because removing the mediator does nothing about the confounder that was missing all along."
    },
    examples: [
      {
        title: { en: "The obvious fix makes the alcohol row worse" },
        summary: {
          en: "The paper reports a third figure for alcohol abuse that is not in the table. Take preeclampsia out of the model, so that alcohol's effect is no longer split by a mediator, but leave drug abuse out as well: the risk ratio comes to 1.61, further from the properly adjusted 1.15 than the 1.49 originally printed. This is the useful thing to carry away, because removing the exposure is exactly what a careful reader thinks of first. The two problems are separate, and fixing the one you have noticed can move the estimate the wrong way.",
        },
        provenance: {
          source:
            "Bandoli G, Palmsten K, Chambers CD, Jelliffe-Pawlowski LL, Baer RJ, Thompson CA. Revisiting the Table 2 Fallacy: a motivating example examining preeclampsia and preterm birth. Paediatric and Perinatal Epidemiology 2018;32(4):390-397, Results, Model 3. Free author manuscript at eScholarship, UC San Diego",
          year: 2018,
          doi: "10.1111/ppe.12474",
          url: "https://escholarship.org/uc/item/5450f301",
        },
      },
    ],
  },

  share: {
    title: { en: "Only two of the four rows meant what they looked like." },
    explainer: {
      en: "One model on 2,963,888 births printed four adjusted risk ratios for preterm birth: preeclampsia 4.65, previous preterm birth 3.56, alcohol abuse 1.49, low education 1.12. Estimated on their own terms, previous preterm birth is 3.91 and alcohol abuse is 1.15, with intervals that do not overlap the printed ones, while the other two do not move. A model is built to estimate one thing; the rest of the column came along for the ride.",
    },
    captions: {
      competitive: { en: "Asked what the other rows were measuring." },
      selfDeprecating: { en: "I read the whole table as a list of effects." },
    },
  },

  provenance: {
    source:
      "Bandoli G, Palmsten K, Chambers CD, Jelliffe-Pawlowski LL, Baer RJ, Thompson CA. Revisiting the Table 2 Fallacy: a motivating example examining preeclampsia and preterm birth. Paediatric and Perinatal Epidemiology 2018;32(4):390-397. All seven risk ratios and intervals are Table 2 as printed; the four counts beside the rows are Table 1. Free author manuscript at eScholarship, UC San Diego",
    year: 2018,
    doi: "10.1111/ppe.12474",
    url: "https://escholarship.org/uc/item/5450f301",
  },
};
