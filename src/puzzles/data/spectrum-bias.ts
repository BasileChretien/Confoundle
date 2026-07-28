import type { Puzzle } from "../schema";

/**
 * Puzzle #8, spectrum bias, on the real Lachs et al. (Ann Intern Med 1992)
 * dipstick data.
 *
 * Counts are Table 3, page 137: sensitivity 49 of 53 and specificity 21 of 50
 * in the high prior-probability group, sensitivity 10 of 18 and specificity
 * 188 of 241 in the low one. Arithmetic checked against the paper: the two
 * subgroups hold 53 + 50 = 103 and 18 + 241 = 259 patients, which with the 4
 * patients whose prior probability was never recorded makes the 366 of Table 2.
 *
 * Note the published correction (Ann Intern Med 1992;117(11):975): the high
 * prior-probability group is 103 patients, not the 107 the abstract and the
 * table's row label still print. The rates themselves were already computed on
 * 103 and stand. We use the cell counts, so the puzzle is unaffected, but the
 * provenance says so.
 *
 * The setup draws a single bar (the one figure a textbook would quote) using
 * the view's groupIds/strataIds filter; the reveal drops the filter and the
 * trade-off appears.
 */
export const spectrumBias: Puzzle = {
  schemaVersion: 1,
  id: "spectrum-bias-dipstick",
  slug: "spectrum-bias",
  category: "statistical-reasoning",
  reasoningSkill: "spectrum-bias",
  difficulty: "medium",
  tags: ["clinical", "diagnosis", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "This urine test catches 92% of infections. Your patient's symptoms are vague. How good is it now?",
    },
    framing: {
      en: "A dipstick for urinary infection, checked against urine cultures in an emergency department and a walk-in clinic. Among patients whose doctor already thought an infection was likely, it caught 49 of the 53 who really had one. Sensitivity is normally quoted as a single number, as though it were a fixed property of the test.",
    },
    question: {
      en: "In patients the doctor thinks are unlikely to be infected, how often does it catch a real infection?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Times the dipstick was right" },
      higherIsBetter: true,
      groups: [
        {
          id: "likely",
          label: { en: "Doctor thought infection likely" },
          short: { en: "Likely" },
        },
        {
          id: "unlikely",
          label: { en: "Doctor thought infection unlikely" },
          short: { en: "Unlikely" },
        },
      ],
      strata: [
        { id: "infected", label: { en: "Patients who really had an infection" } },
        { id: "clear", label: { en: "Patients who did not" } },
      ],
      observations: [
        { groupId: "likely", stratumId: "infected", numerator: 49, denominator: 53 },
        { groupId: "likely", stratumId: "clear", numerator: 21, denominator: 50 },
        { groupId: "unlikely", stratumId: "infected", numerator: 10, denominator: 18 },
        { groupId: "unlikely", stratumId: "clear", numerator: 188, denominator: 241 },
      ],
    },
    initialView: {
      kind: "stratified",
      groupIds: ["likely"],
      strataIds: ["infected"],
      caption: { en: "The quoted figure" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About the same, 92%" },
      sublabel: { en: "the test has not changed" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "little",
      label: { en: "A little lower, around 80%" },
      sublabel: { en: "some drop off" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "half",
      label: { en: "Barely half, 56%" },
      sublabel: { en: "it misses most of them" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and correct here, because the setup
      // withholds the very quantity the question asks for.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Barely half. And the other column flips the other way." },
    mechanismLabel: { en: "The spectrum" },
    mechanismName: { en: "The patients changed, not the test" },
    explanation: {
      en: "Patients their doctor already suspected had florid infections, the kind a dipstick spots easily. Patients thought unlikely to be infected had mild or early ones, and the test missed most of them. Now look at the second panel, the patients who had no infection at all: there the test was right 42% of the time in the first group and 78% in the second. Sensitivity and specificity are not properties of a test. They are properties of a test meeting a particular mix of people:",
    },
    view: { kind: "stratified", caption: { en: "Both groups" } },
    caseMixLabel: { en: "How many in each group really had an infection" },
  },

  lesson: {
    skillName: { en: "Spectrum bias" },
    takeaway: {
      en: "A test's accuracy is not fixed. It moves with how advanced, how typical and how obvious the disease is in the patients being tested.",
    },
    body: {
      en: "Before trusting a quoted sensitivity, ask who it was measured on. A figure from patients with unmistakable disease will flatter the test in a clinic full of milder cases, and a study that recruits only textbook cases and healthy volunteers will flatter it most of all.",
    },
    howItWorks: {
      en: "Sensitivity is the share of truly ill people a test catches, and specificity is the share of healthy people it correctly clears. Both are quoted as though they belonged to the test, like its price. They do not. A test picks up a signal, and the signal is stronger in advanced disease than in early disease, so the sicker the ill people you test, the more of them it finds. The same logic runs the other way for the people without the disease: the more clearly healthy they are, the more easily the test clears them. That is why a test evaluated on obvious cases against obvious non-cases can look superb and then disappoint in a real clinic, where nearly everyone is somewhere in between. Two practical habits follow. Read the description of who was recruited before you read the accuracy figures. And be most suspicious of a study whose diseased and healthy groups were picked separately rather than being consecutive patients with the same presenting problem.",
    },
    examples: [
      {
        title: { en: "The same test, sorted a different way" },
        summary: {
          en: "The same study split its patients again, this time by how many white cells were visible in the urine under a microscope. Where none were visible the dipstick caught 5 of the 10 real infections. Where a few were visible it caught 15 of 22. Where there were many it caught all 34 of 34. One test, one afternoon's samples, and a sensitivity anywhere from 50 to 100 percent depending only on which patients you counted.",
        },
        provenance: {
          source:
            "Lachs MS, Nachamkin I, Edelstein PH, Goldman J, Feinstein AR, Schwartz JS. Spectrum bias in the evaluation of diagnostic tests: lessons from the rapid dipstick test for urinary tract infection. Ann Intern Med. 1992;117(2):135-140, Table 4. (Leukocytes per field in spun urine; data were missing for 25 of the 366 patients.)",
          year: 1992,
          doi: "10.7326/0003-4819-117-2-135",
          url: "https://pubmed.ncbi.nlm.nih.gov/1605428/",
        },
      },
      {
        title: { en: "Why promising tests keep disappointing" },
        summary: {
          en: "The problem was named in 1978, after a pattern of new tests arriving with excellent published accuracy and then underwhelming the doctors who used them. Two of the era's examples were the carcinoembryonic antigen test and the nitro-blue tetrazolium test. The authors traced the letdown to two things: accuracy measured on a patient mix far narrower than real practice, and the test result and the true diagnosis not being judged independently of each other.",
        },
        provenance: {
          source:
            "Ransohoff DF, Feinstein AR. Problems of spectrum and bias in evaluating the efficacy of diagnostic tests. N Engl J Med. 1978;299(17):926-930.",
          year: 1978,
          doi: "10.1056/NEJM197810262991705",
          url: "https://pubmed.ncbi.nlm.nih.gov/692598/",
        },
      },
    ],
  },

  share: {
    title: { en: "Spectrum bias, a reasoning trap." },
    explainer: {
      en: "Test accuracy sounds like a fact about the test, the way a car has a top speed. It is not. A test that catches 92% of infections in people who are obviously ill can catch barely half in people who are only slightly ill, because there is less to find. Whenever you are told a test is 95% accurate, the real question is who they measured that on, and whether those people look anything like you.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Lachs MS, Nachamkin I, Edelstein PH, Goldman J, Feinstein AR, Schwartz JS. Spectrum bias in the evaluation of diagnostic tests: lessons from the rapid dipstick test for urinary tract infection. Ann Intern Med. 1992;117(2):135-140. See also the published correction, Ann Intern Med. 1992;117(11):975.",
    year: 1992,
    doi: "10.7326/0003-4819-117-2-135",
    url: "https://pubmed.ncbi.nlm.nih.gov/1605428/",
    note: {
      en: "The counts are Table 3, page 137: 49 of 53 and 21 of 50 in the high prior-probability group, 10 of 18 and 188 of 241 in the low one. A positive dipstick meant leukocyte esterase or nitrite or both; a positive culture meant more than 100,000 colonies per millilitre. The correction notes that the high prior-probability group holds 103 patients, not the 107 still printed in the abstract, and that the rates were computed on 103 and stand. The printed abstract also gives the 0.56 confidence interval as 0.03 to 0.79; the paper's own table gives 0.31 to 0.79.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Spectrum_bias",
};
