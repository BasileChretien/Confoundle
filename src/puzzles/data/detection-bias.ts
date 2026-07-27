import type { Puzzle } from "../schema";

/**
 * Detection (observer) bias, on a trial that graded the same patients twice.
 *
 * Brandstrup 2003 randomised 172 colorectal patients (86 per arm) to a
 * restrictive or a standard perioperative fluid regimen, and had their
 * postoperative complications judged both by an assessor blinded to the regimen
 * and, unblinded, by the local investigators. The paper's intention-to-treat
 * results print both, read from the Results text via PMC and arithmetic-checked:
 *
 *   unblinded: restrictive 27/86 (31%) vs standard 47/86 (55%), P = 0.002
 *   blinded:   restrictive 28/86 (33%) vs standard 44/86 (51%), P = 0.013
 *
 * All four counts match their printed percentages, and each arm sums to 172.
 * The unblinded grader found a wider, more "significant" benefit. Blinding does
 * not erase it (restrictive genuinely helped) but right-sizes it, and widens the
 * p-value. That is the signature of detection bias: it exaggerates a real
 * effect and lends it false certainty, rather than inventing one.
 *
 * Uses the rates shape with the two assessments as separate-sample strata
 * (Berkson's pattern): they are the same patients scored twice, so they must
 * never be pooled. The setup shows only the unblinded panel; the reveal sets the
 * blinded panel beside it, where the gap visibly narrows.
 */
export const detectionBias: Puzzle = {
  schemaVersion: 1,
  id: "detection-bias-brandstrup-2003",
  slug: "who-graded-it",
  category: "measurement",
  reasoningSkill: "detection-bias",
  difficulty: "medium",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Give surgical patients far less IV fluid and complications seem to plummet. A clear win for less fluid?",
    },
    framing: {
      en: "In a trial, an assessor recorded which patients had a postoperative complication. In the restrictive-fluid group 31 percent did, against 55 percent on the standard regimen, and the difference was highly significant (P = 0.002).",
    },
    question: { en: "How much should you trust the size of that benefit?" },
    data: {
      type: "rates",
      metricLabel: { en: "Had a postoperative complication" },
      // Fewer complications is better, so the shorter bar is the good one.
      higherIsBetter: false,
      // The point is how far apart the two arms look, not crowning a winner;
      // restrictive genuinely wins in both panels, which is not the lesson.
      crownWinner: false,
      // The two panels are the SAME 172 patients graded twice, not two samples,
      // so pooling them would count everyone twice.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "restrictive",
          label: { en: "Restrictive fluid" },
          short: { en: "Restrictive" },
        },
        {
          id: "standard",
          label: { en: "Standard fluid" },
          short: { en: "Standard" },
        },
      ],
      strata: [
        { id: "unblinded", label: { en: "Graded by an assessor who knew the regimen" } },
        { id: "blinded", label: { en: "Graded by an assessor kept unaware" } },
      ],
      observations: [
        { groupId: "restrictive", stratumId: "unblinded", numerator: 27, denominator: 86 },
        { groupId: "standard", stratumId: "unblinded", numerator: 47, denominator: 86 },
        { groupId: "restrictive", stratumId: "blinded", numerator: 28, denominator: 86 },
        { groupId: "standard", stratumId: "blinded", numerator: 44, denominator: 86 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["unblinded"],
      caption: { en: "As the unblinded assessor graded them" },
    },
  },

  choices: [
    {
      id: "big-benefit",
      label: { en: "A big, solid benefit" },
      sublabel: { en: "complications nearly halved" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "baseline",
      label: { en: "The groups must have differed to begin with" },
      sublabel: { en: "something other than the fluid" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "assessor",
      label: { en: "The grader knew the assignment" },
      sublabel: { en: "grade it blind and it shrinks" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Grade the same patients blind, and the gap narrows." },
    mechanismLabel: { en: "Blinded against not" },
    mechanismName: { en: "What the grader knew" },
    explanation: {
      en: "The same 172 patients, judged again by an assessor kept unaware of who got which regimen: 28 of 86 with a complication on restrictive fluid (33 percent) against 44 of 86 on standard (51 percent). Restrictive fluid still helped, but the gap is 18 points rather than the 24 the unblinded grader recorded, and the p-value slips from 0.002 to 0.013.",
    },
    body: {
      en: "The randomisation was fine and the groups were comparable. What changed is who held the pen. When the person deciding whether an ambiguous case counts as a complication knows which arm the patient was in, the borderline calls drift toward the expected answer. That drift did not invent the benefit, restrictive fluid genuinely did better, but it stretched it and made it look more certain than the blinded record supports.",
    },
    view: { kind: "stratified", caption: { en: "Unblinded, then blinded" } },
  },

  lesson: {
    skillName: { en: "Detection bias" },
    takeaway: {
      en: "When whoever judges the outcome knows who got the treatment, their judgement drifts toward the expected result. It rarely conjures an effect from nothing; it exaggerates a real one and lends it false certainty. The defence is to blind the assessor, which is separate from blinding patients and clinicians.",
    },
    body: {
      en: "Detection bias bites hardest on outcomes that take judgement: a wound called infected or not, a scan read as progression or not, a symptom scored on a scale. It barely touches a hard endpoint like death, taken from a registry. So the question to ask of an impressive result is not only whether the patients were blinded, but whether the person recording the outcome was.",
    },
    howItWorks: {
      en: "Blinding is not one thing. Patients can be blinded so their own reports are not swayed by knowing they got the real treatment; clinicians can be blinded so the care they give does not differ; and the outcome assessor can be blinded so their reading of who improved is not coloured by which arm they are grading. A trial can manage the first two and still leak bias through the third, because most outcomes worth measuring need a human to interpret them. That is why assessor-blinding is its own line in a methods section, and why an open-label trial with a subjective endpoint should have the size of its effect discounted, not just its direction doubted.",
    },
    examples: [
      {
        title: { en: "Not one unlucky trial" },
        summary: {
          en: "A review paired blinded and non-blinded judgements of the same yes-or-no outcome across 21 trials and 4,391 patients. On average the non-blinded assessors exaggerated the odds ratio by 36 percent (ratio of odds ratios 0.64, 95 percent confidence interval 0.43 to 0.96). The fluid trial here was one of the 21.",
        },
        provenance: {
          source:
            "Hrobjartsson A, Thomsen ASS, Emanuelsson F, et al. Observer bias in randomised clinical trials with binary outcomes: systematic review of trials with both blinded and non-blinded outcome assessors. BMJ 2012;344:e1119",
          year: 2012,
          doi: "10.1136/bmj.e1119",
          url: "https://www.bmj.com/content/344/bmj.e1119",
        },
      },
    ],
  },

  share: {
    title: { en: "Detection bias, a reasoning trap." },
    explainer: {
      en: "When the person scoring the result knows who got the treatment, the borderline calls slide toward the hoped-for answer. Grade the same patients blind and the effect shrinks and loses certainty. It rarely conjures a result from nothing, but it inflates one. Before believing the size of a benefit, ask who measured the outcome, and whether they knew which group they were looking at.",
    },
    captions: {
      competitive: {
        en: "Everyone trusts the number. Fewer ask who measured it.",
      },
      selfDeprecating: {
        en: "I trusted the number. Nobody had blinded the grader.",
      },
    },
  },

  provenance: {
    source:
      "Brandstrup B, Tonnesen H, Beier-Holgersen R, et al. Effects of intravenous fluid restriction on postoperative complications: comparison of two perioperative fluid regimens: a randomized assessor-blinded multicenter trial. Ann Surg 2003;238(5):641-648 (PMID 14578723)",
    year: 2003,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1356139/",
    note: {
      en: "The same 172 patients (86 per arm) had their postoperative complications judged both by an assessor blinded to the fluid regimen and, unblinded, by the local investigators. The intention-to-treat Results print both: unblinded, 27 of 86 (31 percent) on restrictive fluid versus 47 of 86 (55 percent) on standard, P = 0.002; blinded, 28 (33 percent) versus 44 (51 percent), P = 0.013. Every count matches its printed percentage, at 86 patients per arm. Blinding narrows the difference from 24 to 18 percentage points and widens the p-value: it right-sizes a real effect rather than erasing it. The 36 percent figure in the deep-dive is Hrobjartsson 2012, which included this trial among its 21.",
    },
  },

  goDeeperUrl: "https://catalogofbias.org/biases/observer-bias/",
};
