import type { Puzzle } from "../schema.ts";

/**
 * Prevalent-user bias, on the `forest` shape with its new benchmark line.
 *
 * One question, "does taking a statin lower the risk of dying in people who
 * already have cardiovascular disease", answered by observational studies
 * grouped by WHICH USERS THEY ENROLLED, against eighteen randomised trials of
 * starting a statin. The pooled estimates run 0.54, 0.70, 0.77 as each design
 * admits fewer people who were already taking the drug; the trials say 0.84.
 *
 * THE CLAIM IS CONTAINMENT, NOT NEARNESS, which is why the benchmark line was
 * added to the shape rather than the card saying "closest" in prose. All three
 * observational groups are on the same side and all three are closer to the
 * trials than the one before, which is a trend and can be told about any
 * ladder. The fact worth a card is that only the new-user group's interval
 * REACHES 0.84: the other two exclude it, so they are not noisy versions of the
 * trial result, they disagree with it. `reachesBenchmark` is that fact as a
 * function, with a test, and the dashed line is it as a picture.
 *
 * WHY THE LADDER IS ON SCREEN AT THE COMMIT BEAT. The skill licenses a
 * DIRECTION, that a prevalent-user design overstates benefit, and a direction
 * alone cannot separate "around 0.8, a smaller but real benefit" from "at 1,
 * the benefit was entirely an artefact". Both are the same way from 0.54. So
 * the three observational rows are drawn at the setup, where their decelerating
 * steps (0.16 then 0.07) are the discriminator a reader can actually use, and
 * the reveal keeps its surprise: two of those three intervals do not reach the
 * trials at all. This is the same solve as `cross-site-generalisation`, and the
 * hedge audit's rule is why both were built that way.
 *
 * THE TRAP IS THE EVIDENCE-WEIGHTING ANSWER, and it is a good one. The correct
 * row pools FOUR studies against the other groups' thirteen apiece, and its
 * interval is the widest on the figure. A reader who reasons from how much
 * evidence sits behind each row picks the wrong one, because the differences
 * between these rows are systematic rather than sampling noise, which is the
 * whole thing the card is teaching.
 *
 * FOUR HONESTY CONSTRAINTS, all from backlog entry 79 and all discharged here:
 *
 *   1. THESE ARE DIFFERENT STUDIES, not one dataset analysed four ways. Berry
 *      2010 let `competing-risks` say "the same cohort, two estimators"; this
 *      cannot, and a card implying it would be inventing a design the paper did
 *      not run. Said in the framing, where a reader meets it before choosing,
 *      and again in the lesson.
 *   2. THE HETEROGENEITY IS LARGE and is drawn rather than hidden: I-squared of
 *      91, 58 and 84 per cent, in a column the figure names. Four tidy diamonds
 *      with nothing about the disagreement behind them would be prettier than
 *      the evidence. This is what `heterogeneityLabel` was added for.
 *   3. ONE STUDY APPEARS IN TWO GROUPS, because it reported both a
 *      prevalent-user and an incident-user comparison. Not double counting, but
 *      the kind of detail a careful reader finds, so the lesson says it rather
 *      than waiting to be caught by it. It is in `howItWorks` and not on the
 *      figure because `forest` has no note field: `unit` and `metricLabel` are
 *      the only prose the chart carries, and both are already doing a job.
 *   4. THE OBSERVATIONAL STUDIES ARE NOT CALLED WRONG. They measured what they
 *      measured. A trial answers "what happens if you start a statin"; a
 *      prevalent-user study answers something nearer "how do people who have
 *      already tolerated one for years compare with people not on one", which
 *      is a different question with a flattering answer.
 *
 * ADJUSTMENT IS SHOWN NOT TO BE THE REMEDY, which is the example. All three
 * observational groups are multivariate adjusted. Unadjusted they were 0.44 and
 * 0.47; adjustment moved them to 0.54 and 0.70 and still left both intervals
 * short of the trials. What moved the answer was who was eligible to enrol.
 */
export const prevalentUserBias: Puzzle = {
  schemaVersion: 1,
  id: "prevalent-user-bias-statins",
  slug: "when-the-clock-started",
  category: "causal-reasoning",
  reasoningSkill: "prevalent-user-bias",
  difficulty: "hard",
  tags: ["research", "clinical", "pharmacology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Does taking a statin lower the risk of dying, in people who already have cardiovascular disease? A review collected the observational studies that had asked, and sorted them by one thing: which users each study had enrolled.",
    },
    framing: {
      en: "Some studies enrolled people already taking a statin. Some enrolled a mixture. A few enrolled only people at their first prescription. These are different studies, not one dataset cut three ways, and every estimate below is adjusted for the usual confounders.",
    },
    question: {
      en: "Eighteen randomised trials asked what happens when a person starts a statin. Where do they land?",
    },
    data: {
      type: "forest",
      label: { en: "Death from any cause, statin against no statin" },
      unit: {
        en: "Adjusted hazard ratio for death from any cause, against people not taking a statin. Random-effects pooled.",
      },
      metricLabel: {
        en: "Beside each row: the pooled hazard ratio, then how many studies it pools.",
      },
      heterogeneityLabel: {
        en: "The last number is I-squared, the share of the variation between a row's studies that is more than chance would give.",
      },
      nullValue: 1,
      nullLabel: { en: "No difference" },
      worseLabel: { en: "More deaths than nonusers" },
      betterLabel: { en: "Fewer deaths than nonusers" },
      // A hazard ratio for dying: above the line is harm, so the axis labels
      // have to be swapped against the shape's default.
      higherIsWorse: true,
      axisMin: 0.4,
      axisMax: 1.1,
      benchmarkId: "trials",
      rows: [
        {
          id: "prevalent",
          label: { en: "Studies that enrolled people already taking a statin" },
          short: { en: "Existing users" },
          estimate: 0.54,
          ciLow: 0.45,
          ciHigh: 0.66,
          k: 13,
          heterogeneity: 91,
        },
        {
          id: "mixed",
          label: { en: "Studies that enrolled existing and new users together" },
          short: { en: "Both mixed" },
          estimate: 0.7,
          ciLow: 0.64,
          ciHigh: 0.78,
          k: 13,
          heterogeneity: 58,
        },
        {
          id: "incident",
          label: { en: "Studies that enrolled people at their first prescription" },
          short: { en: "New users only" },
          estimate: 0.77,
          ciLow: 0.65,
          ciHigh: 0.91,
          k: 4,
          heterogeneity: 84,
        },
        {
          id: "trials",
          label: { en: "Randomised trials of starting a statin" },
          short: { en: "Randomised" },
          estimate: 0.84,
          ciLow: 0.77,
          ciHigh: 0.91,
          k: 18,
          isPooled: true,
        },
      ],
    },
    initialView: {
      kind: "whatisknown",
      groupIds: ["prevalent", "mixed", "incident"],
      caption: { en: "The observational studies, grouped by whom they enrolled" },
    },
  },

  /*
    Exactly one band sits where the figure points. The trap follows the weight
    of evidence, which is the reasonable-sounding move and the wrong one here,
    because what separates these rows is design and not sampling. The
    larger-benefit band runs against the visible run of the estimates. The
    no-effect band runs past the end of it: the steps are 0.16 then 0.07 and
    decelerating, and nothing on screen reaches within 0.09 of the null.
  */
  choices: [
    {
      id: "with-the-weight",
      label: {
        en: "Between 0.54 and 0.70, with the bulk of the studies",
      },
      sublabel: { en: "the four-study estimate is the thin one" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "even-lower",
      label: { en: "Below 0.54. Randomised, the benefit turns out larger still" },
      sublabel: { en: "trials strip out the confounding that hides real effects" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "near-the-end",
      label: {
        en: "Around 0.8, at the far end of the run the three designs make",
      },
      sublabel: { en: "each design admitting fewer existing users lands nearer no difference" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "no-effect",
      label: { en: "At 1. Randomised, the benefit disappears altogether" },
      sublabel: { en: "all of it was who got counted" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "0.84, from eighteen randomised trials. Of the three observational groups, only the one that enrolled people at their first prescription has an interval that reaches it. The other two exclude the trial result rather than scattering around it.",
    },
    mechanismLabel: { en: "What moved the answer?" },
    mechanismName: { en: "Who was allowed to enrol" },
    explanation: {
      en: "A study that enrols people already taking a statin can only enrol the ones still taking it. Everybody who started and died in the first months is gone; so is everybody who stopped for side effects, or cost, or because a doctor changed their mind. Those people are absent from the treated group and they are in nobody else's either, so the comparison is between people who have already survived years of treatment and everybody who was not on it. A new-user design starts the clock at the first prescription and keeps every one of those people in the group they started in, which is exactly what a randomised trial does, and it is the design whose interval reaches the trials.",
    },
    body: {
      en: "Notice what this does not say. The observational studies are not fraudulent and adjustment was not skipped: all three groups are adjusted for the usual confounders, and unadjusted they were further out still, at 0.44 and 0.47. Adjustment moved them and did not close the gap, because no adjustment reaches people who never appear in the data. Nor were the studies answering the wrong question by accident. A trial answers what happens when a person starts a statin; a prevalent-user study answers something nearer to how people who have already tolerated one for years compare with people not on one, which is a real question with a flattering answer. And the rows themselves are pooled over studies that disagree a great deal, at 91, 58 and 84 per cent, with the review's own meta-regression finding no strong explanation for the disagreement among the existing-user studies. The gradient between the rows is the finding here, not any single diamond.",
    },
    view: { kind: "themissingrow" },
  },

  lesson: {
    skillName: { en: "Prevalent users and the new-user design" },
    takeaway: {
      en: "When a study compares people taking a drug with people not taking it, ask when the clock started. If the users were enrolled while already on the drug, everyone who started it and then died or stopped is missing, and the treated group is made of survivors of the treatment. The remedy has a name and you can ask for it: enrol at the first prescription and follow everybody from there.",
    },
    body: {
      en: "Prevalent-user bias bundles two things that a study design cannot separate afterwards. The first is depletion of susceptibles: the early events, the intolerances and the discontinuations have all already happened before enrolment, so the drug is judged on the people it did not stop. The second is unmeasured follow-up: a person enrolled after three years on a drug brings three years of surviving it that the analysis never sees. Neither is a confounder in the sense a regression can handle, because the people involved are not in the dataset at all, which is why adjustment moves the estimate and does not fix it.",
    },
    howItWorks: {
      en: "The check is cheap and it is a question about eligibility rather than about analysis. Who was allowed into the treated group, and at what moment? A new-user, or incident-user, design answers with the first prescription: everybody enters at the same point in their treatment, the follow-up starts there for both groups, and somebody who stops a week later stays in the group they entered. That is what makes the comparison the same shape as a randomised one, and it is why the estimates from such designs land where the trials land. Three cautions about reading this figure. The rows are different studies grouped by design and not one dataset analysed several ways, so the gradient is an argument and not an arithmetic identity. One study appears in two of the groups because it reported both comparisons, which is not double counting but is worth knowing. And the new-user row pools only four studies against thirteen apiece for the others: it is the thinnest evidence on the figure and the only one whose interval reaches the trials, which is precisely the point, because what separates these rows is a design choice and not how many studies were available to pool.",
    },
    examples: [
      {
        title: { en: "Adjustment moved the numbers and did not close the gap" },
        summary: {
          en: "Unadjusted, the studies that enrolled existing users gave 0.44 and the mixed group gave 0.47. Adjusted for the usual confounders they gave 0.54 and 0.70. So the covariates were doing real work, in the right direction, and both groups still ended up excluding the randomised result. This is the useful thing to take from the comparison: a reader who sees the word adjusted and stops reading has checked the wrong step. Adjustment can only weigh people who are in the dataset, and prevalent-user bias is about who never got in.",
        },
        provenance: {
          source:
            "Danaei G, Tavakkoli M, Hernan MA. Bias in observational studies of prevalent users: lessons for comparative effectiveness research from a meta-analysis of statins. American Journal of Epidemiology 2012;175(4):250-262, Results. Free full text at PMC3271813",
          year: 2012,
          doi: "10.1093/aje/kwr301",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3271813/",
        },
      },
    ],
  },

  share: {
    title: { en: "The users you can see are the ones it did not stop." },
    explainer: {
      en: "Observational studies of statins in people with heart disease gave a hazard ratio for death of 0.54 when they enrolled people already taking one, 0.70 when they enrolled a mixture, and 0.77 when they enrolled people at their first prescription. Eighteen randomised trials gave 0.84, and only the new-user group's interval reaches it. Every estimate was adjusted. What moved the answer was who was allowed to enrol.",
    },
    captions: {
      competitive: { en: "Asked when the clock started." },
      selfDeprecating: { en: "I went with the studies that had the most studies." },
    },
  },

  provenance: {
    source:
      "Danaei G, Tavakkoli M, Hernan MA. Bias in observational studies of prevalent users: lessons for comparative effectiveness research from a meta-analysis of statins. American Journal of Epidemiology 2012;175(4):250-262. Secondary prevention, all-cause mortality: the four pooled estimates, their intervals, the study counts and the I-squared values are all as printed, as are the unadjusted figures quoted in the lesson. Free full text at PMC3271813",
    year: 2012,
    doi: "10.1093/aje/kwr301",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3271813/",
  },
};
