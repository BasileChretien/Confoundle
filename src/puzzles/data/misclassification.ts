import type { Puzzle } from "../schema";

/**
 * NOT YET REGISTERED in ../index.ts, deliberately. Registering it turns on two
 * enforced gates that this file alone cannot satisfy:
 *
 *  1. `registry.test.ts` requires at least ten review scenarios for every skill
 *     the deck teaches, so the eight-stage ladder never repeats one. The bank
 *     has none for `non-differential-misclassification` yet.
 *  2. `translations/coverage.test.ts` requires all nine non-English
 *     dictionaries to carry every authored string here, about 36 of them.
 *
 * Together that is roughly 500 translated strings. They are a content pass, not
 * a coding one, and inventing them unverified is the exact failure this
 * project's tests exist to prevent. The English content and its provenance are
 * finished and checked, so that pass can start from here rather than from the
 * literature. Add the import and the registry line once the bank and the
 * dictionaries are filled.
 *
 * Non-differential misclassification, from the paper the literature keeps
 * miscrediting as the origin of recall bias.
 *
 * Klemetti and Saxen interviewed pregnant women in month five, then followed
 * every pregnancy, then re-interviewed the mothers after delivery using the same
 * form and the same midwife. That gives the rarest thing in this field: the same
 * people asked the same question twice, once before anyone knew the outcome.
 *
 * The setup shows what a retrospective study would have seen, and it looks
 * exactly like recall bias. The reveal shows the earlier answers, where both
 * groups turn out to have forgotten the overwhelming majority of what they
 * themselves had reported. That is not memory bent by grief; it is memory that
 * barely works, in everyone, which pulls a real association toward the null
 * rather than inventing a false one.
 */
export const misclassification: Puzzle = {
  schemaVersion: 1,
  id: "misclassification-1967",
  slug: "asked-before-and-after",
  category: "measurement",
  reasoningSkill: "non-differential-misclassification",
  difficulty: "hard",
  tags: ["research", "epidemiology", "clinical", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Mothers of babies born damaged recalled more drugs in pregnancy than their own records held. Is grief rewriting their memory?",
    },
    framing: {
      en: "Two matched groups of 203 Finnish mothers were asked after delivery which drugs they had taken in early pregnancy. Some named drugs that nothing in their pregnancy record supported.",
    },
    question: { en: "What is going on here?" },
    data: {
      type: "agreement",
      label: { en: "Drugs named after delivery with no earlier record" },
      beforeLabel: { en: "Asked in month five, before anyone knew the outcome" },
      afterLabel: { en: "Asked again after delivery, same form, same midwife" },
      repeatedLabel: { en: "Repeated identically" },
      forgottenLabel: { en: "Not repeated" },
      inventedLabel: { en: "Named only afterwards" },
      itemLabel: { en: "took a drug in early pregnancy" },
      groups: [
        {
          label: { en: "Healthy child" },
          short: { en: "Healthy child" },
          n: 203,
          reportedBefore: 182,
          repeated: 33,
          invented: 41,
        },
        {
          label: { en: "Death or malformation" },
          short: { en: "Death or malformation" },
          n: 203,
          reportedBefore: 187,
          repeated: 23,
          invented: 57,
        },
      ],
    },
    initialView: { kind: "invented" },
  },

  choices: [
    {
      id: "recall-bias",
      label: { en: "Recall bias" },
      sublabel: {
        en: "A mother searching for a reason digs harder and remembers more",
      },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "real-exposure",
      label: { en: "The drugs really were taken more often" },
      sublabel: { en: "The extra reports are true, and the records are incomplete" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "non-differential",
      label: { en: "Memory is this bad in both groups" },
      sublabel: { en: "Error in every direction, at roughly the same rate" },
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
      en: "Both groups had already forgotten most of what they told the same midwife months earlier.",
    },
    mechanismName: { en: "Error that does not take sides" },
    mechanismLabel: { en: "What the earlier answers show" },
    explanation: {
      en: "Mothers of healthy babies repeated just 33 of their own 182 earlier reports. Mothers of damaged babies repeated 23 of 187. Both groups lost around 85 percent of what they themselves had said, and both added drugs that were never recorded. The authors tested it and found no significant difference between the groups in the share of replies that failed to match.",
    },
    body: {
      en: "So the extra reports in the second group are not memory bending toward an explanation. They are the same broken recall that both groups show, and the difference between 57 and 41 sits inside the noise that unreliability of this size produces. When error hits both groups alike, it does not manufacture an association. It smears the exposed and unexposed into each other, which drags any real difference toward no difference at all.",
    },
    view: { kind: "agreement" },
  },

  lesson: {
    skillName: { en: "Non-differential misclassification" },
    takeaway: {
      en: "When a measurement is equally wrong in every group, it does not invent an effect. It hides one. The usual result is a real association flattened toward nothing, so a null finding from a badly measured exposure is not evidence of no effect.",
    },
    body: {
      en: "Ask two questions of any measurement, not one. First, is the error different between the groups? That is the bias everyone is taught to look for. Second, and far more often the answer, is the error simply enormous in all of them? That one is rarely mentioned, is much more common, and pushes findings toward the null, which means it quietly protects wrong beliefs from being disproved.",
    },
    howItWorks: {
      en: "Picture an exposure that truly doubles risk. Now measure it with a method that gets it right only a fifth of the time, in exposed and unexposed alike. Many genuinely exposed people are filed as unexposed and the reverse, so the two groups you end up comparing are both mixtures of the real ones. Mixtures differ less than their ingredients, so the measured ratio slides toward 1. Push the error far enough and a real effect disappears entirely. That is why this paper's headline finding is not that mothers were biased, but that a retrospective interview about early pregnancy is close to unusable as a measurement, whoever is answering.",
    },
    examples: [
      {
        title: { en: "The largest test of this, and it found no bias either" },
        summary: {
          en: "The United Kingdom Childhood Cancer Study compared what 1,624 case mothers and 2,524 control mothers reported against their own general-practice records. Differential recall, the effect everyone expects, was essentially absent. It is worth knowing that the bias people reach for first is often not the one present.",
        },
        provenance: {
          source:
            "Hall N, et al. Recall bias in childhood cancer case-control studies. International Journal of Epidemiology 2023;52(4):1187-1196",
          year: 2023,
          doi: "10.1093/ije/dyad048",
        },
      },
    ],
  },

  share: {
    title: { en: "Non-differential misclassification, a reasoning trap." },
    explainer: {
      en: "If a measurement is wrong in the same way for everybody, it does not create a fake result. It buries a real one. Bad measurement makes things look like they do not matter.",
    },
    captions: {
      competitive: {
        en: "Everyone says recall bias. The real answer is worse.",
      },
      selfDeprecating: {
        en: "I confidently diagnosed recall bias. It was not recall bias.",
      },
    },
  },

  provenance: {
    source:
      "Klemetti A, Saxen L. Prospective versus retrospective approach in the search for environmental causes of malformations. American Journal of Public Health 1967;57(12):2071-2075, Table 1 (p. 2074) and Figure 1 (p. 2073)",
    year: 1967,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1227998/",
    doi: "10.2105/AJPH.57.12.2071",
    note: {
      en: "Every count is printed in Table 1 and reconciles three ways: the prospective rows sum to the totals the authors state in prose (34 + 43 = 77 diseases, 182 + 187 = 369 drugs), the two additional-information cells sum to 98, which Figure 1 prints separately, and 98 of the 154 positive retrospective drug replies lacking any prospective history is the approximately two thirds the authors report. Two honesty notes. The additional reports are numerically higher in the damaged-child group, 57 against 41; what the paper establishes is that the difference in the share of non-identical replies was not statistically significant on 203 mothers per group, not that the two groups were identical. And Figure 1 counts individual drug replies (420 of them) while Table 1 counts mothers (369), so the two sets of numbers are never mixed here. The reference standard for the earlier answers is the maternity welfare centre record and the mothers' own month-five interview, not an independent audit.",
    },
  },

  goDeeperUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1227998/",
};
