import type { Puzzle } from "../schema";

/**
 * Statistical significance is not clinical significance, on the drug that
 * governments stockpiled by the billion.
 *
 * Jefferson et al pooled the FULL clinical study reports of the oseltamivir
 * trials, not just the published papers, and found the drug genuinely does
 * shorten influenza in adults: 16.8 hours (95% CI 8.4 to 25.1), P < 0.001. The
 * effect is real and the evidence is overwhelming. It is also 16.8 hours off an
 * illness the same review describes as running 7 days, which the review reports
 * as a fall from 7 days to 6.3.
 *
 * Every number here is from the BMJ abstract of the review (PMID 24811411) and
 * the Cochrane plain-language figure, and they reconcile: 7 days is 168 hours,
 * 168 minus 16.8 is 151.2, which is 6.3 days, and 16.8 of 168 is exactly a tenth.
 *
 * The setup shows the interval against zero, where it sits clear of
 * no-difference and looks decisive. The reveal shows the same number against the
 * illness it is supposed to fix, where it is a sliver. Nothing is recomputed;
 * only the ruler changes.
 *
 * Deliberately distinct from the relative-versus-absolute puzzle: that one is
 * about expressing one effect two ways, this one is about a p-value answering
 * "could this be chance" and being silent on "is this worth having", which is
 * why enough patients make a trivial difference overwhelmingly significant.
 */
export const statisticalSignificance: Puzzle = {
  schemaVersion: 1,
  id: "statistical-vs-clinical-oseltamivir",
  slug: "certainly-tiny",
  category: "statistical-reasoning",
  reasoningSkill: "statistical-vs-clinical-significance",
  difficulty: "medium",
  tags: ["everyday", "clinical", "statistics", "pharmacology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A flu drug beats placebo with P < 0.001, from every trial ever run on it. Governments stockpiled billions. Convinced?",
    },
    framing: {
      en: "Reviewers obtained the full clinical study reports, not just the published papers, and pooled them. Adults given the drug got better sooner than adults given placebo, and the whole confidence interval sits clear of no difference.",
    },
    question: { en: "How much should this change what you do?" },
    data: {
      type: "effect",
      label: { en: "Time to first relief of flu symptoms, hours saved" },
      unit: { en: "hours" },
      estimate: 16.8,
      ciLow: 8.4,
      ciHigh: 25.1,
      pValueLabel: { en: "P < 0.001" },
      sampleLabel: { en: "From the full trial reports, adults" },
      noEffectLabel: { en: "No difference" },
      reference: 168,
      referenceLabel: { en: "Flu without the drug" },
      treatedLabel: { en: "Flu with the drug" },
      scaleLabel: { en: "of the illness" },
    },
    initialView: { kind: "significance" },
  },

  choices: [
    {
      id: "works",
      label: { en: "It works, so take it" },
      sublabel: { en: "the evidence is overwhelming" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "fake",
      label: { en: "The result must be an artefact" },
      sublabel: { en: "no real effect at all" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "tiny",
      label: { en: "Real, and far too small to matter" },
      sublabel: { en: "certain is not the same as useful" },
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
    headline: { en: "It is certainly real. It is also about sixteen hours." },
    mechanismLabel: { en: "The same number, other ruler" },
    mechanismName: { en: "Significant answers a different question" },
    explanation: {
      en: "Flu runs about seven days. The drug takes it to six and a bit: 16.8 hours off 168, which is a tenth of the illness. The reviewers put it plainly, that the drug modestly shortens symptoms, and in the same breath that it causes nausea and vomiting. One extra person vomits for every 22 treated.",
    },
    body: {
      en: "Nothing was recalculated between these two pictures. The estimate, the interval and the p-value are identical; only what they are measured against changed. A p-value answers whether a difference could plausibly be chance, and with enough patients even a trivial difference cannot be. It never answers whether the difference is worth having. That question needs a size and a yardstick, and the yardstick has to come from outside the statistics.",
    },
    view: { kind: "magnitude" },
  },

  lesson: {
    skillName: { en: "Statistical versus clinical significance" },
    takeaway: {
      en: "A small p-value means an effect is probably not chance. It says nothing about whether the effect is big enough to care about. Sample size buys certainty, never importance, so always ask for the size of the difference and what would count as a difference worth having.",
    },
    body: {
      en: "The two questions get answered by different numbers. Could this be chance is answered by the p-value and the confidence interval. Is this worth having is answered by the effect size, set against something that matters: how long the illness lasts, how bad the symptoms are, what the treatment costs you in side effects. A result can be emphatic on the first and pitiful on the second, and press releases have every incentive to quote only the first.",
    },
    howItWorks: {
      en: "A p-value is a statement about how easily chance could produce the difference you saw, and it depends on the size of the study as much as on the size of the effect. Quadruple the patients and the same trivial difference has a p-value four times more impressive, because the estimate is that much more precisely pinned down. Push the numbers far enough and any difference at all, however meaningless, becomes highly significant. That is not a flaw in the arithmetic, it is what the arithmetic was built to do: separate signal from noise, and nothing more. The consequence is a habit worth keeping for life. When you meet a significant result, do not ask how significant. Ask how big, in units you can picture, and against what. If nobody has told you what size of difference would have been worth the trouble, the significance on its own has not told you anything you can act on.",
    },
    examples: [
      {
        title: { en: "The bar the field set, and the result that missed it" },
        summary: {
          en: "A meta-analysis of every antidepressant trial submitted to the American regulator found the drugs beat placebo with high confidence, by 1.80 points on a depression scale. The guideline body's own threshold for a difference that matters clinically was three points, so the authors reported an effect that was statistically certain and below the bar its own field had set. Two questions, two answers, and only one of them was in the headline.",
        },
        provenance: {
          source:
            "Kirsch I, Deacon BJ, Huedo-Medina TB, Scoboria A, Moore TJ, Johnson BT. Initial severity and antidepressant benefits: a meta-analysis of data submitted to the Food and Drug Administration. PLoS Medicine 2008;5(2):e45",
          year: 2008,
          doi: "10.1371/journal.pmed.0050045",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2253608/",
        },
      },
    ],
  },

  share: {
    title: { en: "Statistical versus clinical significance, a reasoning trap." },
    explainer: {
      en: "A tiny p-value means a difference is probably not a fluke. It does not mean the difference is big enough to bother with. Study enough people and even a pointless difference becomes highly significant, because certainty is what sample size buys. Before believing a result matters, ask how large it is in units you can picture, and what size would have been worth having.",
    },
    captions: {
      competitive: { en: "Everyone reads the p-value. Almost nobody asks how big." },
      selfDeprecating: { en: "P less than 0.001, I said. It was sixteen hours." },
    },
  },

  provenance: {
    source:
      "Jefferson T, Jones MA, Doshi P, et al. Oseltamivir for influenza in adults and children: systematic review of clinical study reports and summary of regulatory comments. BMJ 2014;348:g2545 (PMID 24811411), with the Cochrane review of the same dataset, Jefferson T, et al. Cochrane Database Syst Rev 2014;(4):CD008965",
    year: 2014,
    doi: "10.1136/bmj.g2545",
    url: "https://pubmed.ncbi.nlm.nih.gov/24811411/",
    note: {
      en: "The BMJ abstract prints the treatment effect in adults as a reduction in time to first alleviation of symptoms of 16.8 hours (95 percent confidence interval 8.4 to 25.1), P < 0.001, and the harms as nausea (risk difference 3.66 percent, number needed to harm 28) and vomiting (4.56 percent, number needed to harm 22). The Cochrane review of the same dataset expresses the same benefit as a fall from 7 days to 6.3 days, which is where the 168-hour illness in the figure comes from; 168 minus 16.8 is 151.2 hours, or 6.3 days, and 16.8 is exactly a tenth of 168. Two honesty notes. The 7-day figure is the review's own description of the untreated illness rather than a separately measured mean with its own interval, so the second panel is drawn to the review's stated baseline. And the reviewers' conclusion is that the drug modestly shortens symptoms while causing nausea and vomiting, not that it does nothing: the lesson here is about the size of a real effect, not about denying it.",
    },
  },

  goDeeperUrl: "https://www.cebm.ox.ac.uk/research/tamiflu-as-a-treatment-for-influenza",
};
