import type { Puzzle } from "../schema.ts";

/**
 * Non-inferiority read as superiority, on the new `noninferiority` shape.
 *
 * MASAI randomised 105,934 Swedish women to AI-supported mammography reading or
 * to standard double reading by two radiologists. Interval cancers, the ones
 * that surface between screening rounds after a mammogram missed them, came to
 * 82 of 53,043 against 93 of 52,872: rates of 1.55 and 1.76 per 1000, a ratio
 * of 0.88 with an interval running 0.65 to 1.18 and a p value of 0.41. The
 * trial was designed to test NON-INFERIORITY against a margin of 1.20, fixed
 * before it began, and it succeeded on exactly that test.
 *
 * WHY THIS CARD EXISTS. `docs/exam-syllabus-audit.md` has listed
 * "non-inferiority and equivalence designs" as an uncovered gap since the
 * surrogate-endpoint audit, and nothing in the deck teaches the reading. The
 * claim is also live rather than historical: the company that sells the
 * software announced the result as "a noninferior reduction of interval cancer
 * (12% lower rate)", which is a null finding written in the grammar of a
 * demonstrated benefit.
 *
 * THE NUMBERS ARE AUTHORED AS COUNTS AND THE RATES DERIVED, and the schema
 * refuses a published ratio that the counts do not reproduce. 82/53,043 over
 * 93/52,872 is 0.8788, which rounds to the 0.88 the paper prints. That check
 * is the one that would catch the specific error this card is about: taking a
 * ratio from a release and counts from a paper.
 *
 * THE COMMIT BEAT IS ANSWERABLE WITHOUT THE INTERVAL, which is what makes the
 * hedge rule hold here. The framing states the design and the margin outright,
 * so a reader who knows what a non-inferiority trial can and cannot establish
 * has everything they need before the reveal draws the confidence interval.
 * The reveal is the vividness, not the information: the surprise is seeing the
 * interval sit across the line of no difference, and a player who reasoned
 * correctly at the commit beat already predicted that.
 *
 * ONLY ONE BAND SITS WHERE THE SKILL POINTS. Two bands assert a reduction of
 * different sizes and both are wrong in the same way, which is fine; what the
 * rule forbids is two bands that a well-reasoning player could both defend,
 * and no band other than the third can be defended once p is 0.41.
 *
 * THE SENSITIVITY RESULT IS THE STING AND IT IS REAL. The same trial found
 * sensitivity of 80.5 per cent against 73.8 per cent at identical specificity,
 * p = 0.031. So the trial did establish something, and it is not the number
 * that travelled. Kept out of the commit beat deliberately, since a band about
 * sensitivity would have been defensible and would have broken the hedge rule.
 */
export const nonInferiority: Puzzle = {
  schemaVersion: 1,
  id: "non-inferiority-breast-ai",
  slug: "not-worse-is-not-better",
  category: "statistical-reasoning",
  reasoningSkill: "non-inferiority",
  difficulty: "hard",
  tags: ["research", "clinical", "screening", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A trial of AI-assisted mammography reports 12 per cent fewer interval cancers than standard reading by two radiologists. The company that makes the software announces that the trial met its primary endpoint.",
    },
    framing: {
      en: "An interval cancer is one that surfaces between screening rounds, after a mammogram that missed it. 105,934 women in Sweden were randomly assigned to AI-supported reading or to standard double reading, and all but 19 of them were analysed. The trial was designed to test non-inferiority: before it began, the investigators fixed a margin of 20 per cent as the most the AI arm could be worse by and still count as acceptable.",
    },
    question: { en: "What did this trial establish about interval cancers?" },
    data: {
      type: "noninferiority",
      label: { en: "Interval cancers, AI-supported reading against standard double reading" },
      metricLabel: { en: "rate ratio" },
      outcomeLabel: { en: "interval cancers" },
      per: 1000,
      perLabel: { en: "Interval cancers per 1000 participants" },
      intervention: {
        id: "ai",
        label: { en: "AI-supported reading" },
        events: 82,
        n: 53043,
      },
      control: {
        id: "standard",
        label: { en: "Standard double reading" },
        events: 93,
        n: 52872,
      },
      estimate: 0.88,
      ciLow: 0.65,
      ciHigh: 1.18,
      pLabel: { en: "p = 0.41." },
      nullValue: 1,
      nullLabel: { en: "No difference" },
      margin: 1.2,
      marginLabel: { en: "The non-inferiority margin" },
      inferiorLabel: { en: "Unacceptably worse" },
      noninferiorLabel: { en: "Not meaningfully worse" },
      superiorLabel: { en: "Genuinely better" },
      axisMin: 0.5,
      axisMax: 1.5,
      cohortNote: {
        en: "MASAI, Lancet 2026. Counts as published; rates and the ratio derived from them.",
      },
    },
    initialView: { kind: "asclaimed" },
  },

  /*
    The trap reads the point estimate as the finding. The second band is the
    same mistake made more cautiously and is wrong for the same reason. The
    fourth is directionally wrong and refuted by the counts on screen. Only the
    third sits where a non-inferiority design can actually reach.
  */
  choices: [
    {
      id: "twelve-per-cent",
      label: { en: "That AI-supported reading cut interval cancers by about 12 per cent" },
      sublabel: { en: "that is the difference the trial measured" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "some-reduction",
      label: { en: "That it cut them, though the trial cannot say by how much" },
      sublabel: { en: "the direction is clear even if the size is not" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "not-worse",
      label: { en: "Only that it was not meaningfully worse than standard reading" },
      sublabel: { en: "which is the question the design was built to answer" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "worse",
      label: { en: "That AI-supported reading missed more cancers" },
      sublabel: { en: "the margin exists to catch exactly that" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The 12 per cent is a point estimate whose confidence interval runs from a 35 per cent reduction to an 18 per cent increase. It contains no difference at all, and the trial reports p = 0.41. What the trial did establish is what it was built to establish: the upper bound of 1.18 falls below the margin of 1.20.",
    },
    mechanismLabel: { en: "What was this trial designed to answer?" },
    mechanismName: { en: "Non-inferiority" },
    explanation: {
      en: "A non-inferiority trial asks a bounded question: is the new option not worse than the old one by more than some amount fixed in advance? MASAI set that amount at 20 per cent and declared success if the upper end of the confidence interval for the rate ratio fell below 1.20. It did, at 1.18, so the trial succeeded on its own terms. But the same interval reaches down to 0.65 and up past 1.00, which means the data are equally compatible with AI-supported reading preventing a third of interval cancers and with it causing a fifth more. A trial cannot demonstrate a benefit unless its interval clears the line of no difference entirely, and this one does not come close.",
    },
    body: {
      en: "Notice how much work the point estimate is doing. 0.88 is the single number most compatible with the data, so quoting it is not a lie, and 12 per cent fewer is what 0.88 means. What the release adds is the implication that this is what the trial found, when the trial's own test was against the dashed line rather than the solid one. Two things follow that are worth holding apart. The trial is not a failure: non-inferiority is a real and useful result, and here it came alongside a reduced reading workload, which is the practical reason to want it. And the trial did produce a significant finding, just not this one.",
    },
    view: { kind: "againstmargin" },
  },

  lesson: {
    skillName: { en: "Non-inferiority and equivalence designs" },
    takeaway: {
      en: "A non-inferiority trial asks whether something is not worse by more than a margin chosen before any data existed, and that is all its success proves. Such a trial can pass while the new option is genuinely worse, as long as it is not worse by too much. It cannot show that the new option is better unless the confidence interval clears the line of no difference on its own, and a favourable point estimate is not that. When you meet the phrase met its primary endpoint, the question to ask is which endpoint, and against which line.",
    },
    body: {
      en: "The axis in one of these trials has three zones, not two. Past the margin the new option is unacceptably worse. Between the margin and the line of no difference it is not meaningfully worse, which is where most successful non-inferiority trials land and where this one landed. Only past the line of no difference, with the whole interval clear of it, has anything been shown to be better. The middle zone is the one that gets described in two different ways depending on who is talking: investigators call it non-inferiority, and marketing calls it a reduction. Both are describing an interval that includes the possibility of no effect and often the possibility of harm.",
    },
    howItWorks: {
      en: "These designs exist for good reasons. A new treatment may be cheaper, safer, easier to give, or less unpleasant, and if it works about as well as the old one that is a real advance worth proving. What makes them slippery is that the margin is a value judgement wearing a number. Someone decides how much worse is tolerable, and reasonable people disagree; a margin set generously makes a trial easier to pass, and passing means less than it appears to. Watch for three things. First, whether the margin was set before the data existed and stated in the protocol, which MASAI's was. Second, the direction of the asymmetry: a non-inferiority trial is easier to pass when it is sloppy, because noise widens intervals in a superiority test and pushes it toward failure, but a poorly run non-inferiority trial can drag two genuinely different treatments toward looking alike. Third, biocreep, where each new option is shown non-inferior to the last one rather than to the original, and a chain of individually acceptable losses adds up to a treatment much worse than where the chain began. None of this makes non-inferiority a bad design. It makes it a design whose conclusion has to be quoted with its margin attached, and the margin is the part that falls off first.",
    },
    examples: [
      {
        title: { en: "The same trial did find something, and it was not this" },
        summary: {
          en: "MASAI's secondary outcomes include screening sensitivity, and there the result is unambiguous: 80.5 per cent in the AI-supported arm against 73.8 per cent with standard double reading, at an identical specificity of 98.5 per cent, p = 0.031. That is a genuine improvement in cancer detection, significant on its own terms, and it is a much stronger claim than the one about interval cancers. It is also the quieter of the two numbers. The instructive part is that a reader who learned to distrust this trial because of how the 12 per cent was sold would then be wrong about the trial itself, which is why the skill is reading the interval against the right line rather than deciding in advance who to believe.",
        },
        provenance: {
          source:
            "Gommers J, Hernström V, Josefsson V, et al. Interval cancer, sensitivity, and specificity comparing AI-supported mammography screening with standard double reading without AI in the MASAI study. The Lancet 2026;407(10527):505-514, Findings. Sensitivity 80.5% (95% CI 76.4 to 84.2) against 73.8% (68.9 to 78.3), p=0.031; specificity 98.5% in both groups, p=0.88",
          year: 2026,
          url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)02464-X/fulltext",
        },
      },
    ],
  },

  share: {
    title: { en: "Not worse is not better." },
    explainer: {
      en: "A trial of AI-assisted mammography reported 12 per cent fewer interval cancers, and the company selling the software announced that it met its primary endpoint. It did, but the endpoint was non-inferiority: the test was whether the upper end of the confidence interval fell below a margin of 1.20, and it did, at 1.18. The same interval runs down to 0.65 and up through 1.00, so the trial showed no reduction at all, with p = 0.41. When a trial meets its primary endpoint, ask which endpoint and against which line.",
    },
    captions: {
      competitive: { en: "Asked which line the trial actually cleared." },
      selfDeprecating: { en: "I heard met its primary endpoint and stopped listening." },
    },
  },

  provenance: {
    source:
      "Gommers J, Hernström V, Josefsson V, et al. Interval cancer, sensitivity, and specificity comparing AI-supported mammography screening with standard double reading without AI in the MASAI study: a randomised, controlled, non-inferiority, single-blinded, population-based, screening-accuracy trial. The Lancet 2026;407(10527):505-514. Interval cancers 82 of 53,043 against 93 of 52,872, rates 1.55 (95% CI 1.23 to 1.92) and 1.76 (1.42 to 2.15) per 1000, proportion ratio 0.88 (0.65 to 1.18), p=0.41, against a prespecified non-inferiority margin of 1.20. Funded by the Swedish Cancer Society, the Confederation of Regional Cancer Centres and Swedish governmental funding for clinical research",
    year: 2026,
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(25)02464-X/fulltext",
  },
};
