import type { Puzzle } from "../schema";

/**
 * Puzzle #2, the base-rate fallacy, via the classic Casscells et al. (1978)
 * scenario: a disease in 1/1000, a test with a 5% false-alarm rate. Numbers are
 * authored as counts (see the frequencies data shape) and the ~2% positive
 * predictive value is derived and proven in frequencies.test.ts.
 */
export const baseRate: Puzzle = {
  schemaVersion: 1,
  id: "base-rate-medical-test",
  slug: "medical-test",
  category: "statistical-reasoning",
  reasoningSkill: "base-rate-fallacy",
  difficulty: "medium",
  tags: ["everyday", "clinical", "diagnosis"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A near-perfect test says you're sick. How worried should you be?",
    },
    framing: {
      en: "This disease is rare, about 1 in 1,000 people have it. The test never misses it when it's really there, and it raises a false alarm on only about 1 in 20 healthy people. Your result just came back positive.",
    },
    question: { en: "What's the chance you actually have the disease?" },
    data: {
      type: "frequencies",
      label: { en: "In 1,000 people" },
      total: 1000,
      conditionLabel: { en: "have the disease" },
      positiveLabel: { en: "test positive" },
      withCondition: 1,
      positiveGivenCondition: 1,
      positiveGivenNoCondition: 50,
    },
    initialView: { kind: "headline" },
  },

  choices: [
    {
      id: "high",
      label: { en: "About 95%" },
      sublabel: { en: "the test is 95% accurate" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "mid",
      label: { en: "About half" },
      sublabel: { en: "50/50" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "low",
      label: { en: "About 2%" },
      sublabel: { en: "roughly 1 in 50" },
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
    headline: { en: "Positive, but almost certainly a false alarm." },
    mechanismLabel: { en: "The base rate" },
    mechanismName: { en: "A rare disease flips the odds" },
    explanation: {
      en: "Because almost nobody has the disease, the test's small error rate does the heavy lifting. In 1,000 people, only 1 is truly sick, but about 50 healthy people also get a positive. So among the ~51 positive results, just 1 is real. A positive barely nudges you from “very unlikely” to “still unlikely.”",
    },
    view: { kind: "breakdown" },
  },

  lesson: {
    skillName: { en: "The base-rate fallacy" },
    takeaway: {
      en: "When something is rare, even a very accurate test throws up far more false alarms than real cases, so a positive result can still mean you're probably fine.",
    },
    body: {
      en: "The fix is to think in whole people, not percentages: picture 1,000 of them, count the true positives and the false alarms, and compare. Always ask how common the thing is before you trust a positive.",
    },
    howItWorks: {
      en: "A test's accuracy and your actual odds are two different things. Accuracy is measured on people we already know are sick or healthy. But a positive result asks the reverse question (given this positive, am I sick?), and that depends on how many sick people there were to find in the first place. If only 1 in 1,000 has the disease, the huge healthy majority produces a flood of false alarms that swamps the single real case. Make the disease common and the same test looks excellent; make it rare and a positive means little on its own.",
    },
    examples: [
      {
        title: { en: "Even doctors slip" },
        summary: {
          en: "Researchers put this exact question to doctors and medical staff: a disease in 1 in 1,000, a test with a 5% false-alarm rate. The most common answer was 95%. The average was 56%. Only about 1 in 5 gave the correct answer of roughly 2%.",
        },
        provenance: {
          source:
            "Casscells W, Schoenberger A, Grayboys TB. Interpretation by physicians of clinical laboratory results. N Engl J Med. 1978;299(18):999-1001.",
          year: 1978,
          doi: "10.1056/NEJM197811022991808",
          url: "https://pubmed.ncbi.nlm.nih.gov/692627/",
        },
      },
      {
        title: { en: "Think in people, not percentages" },
        summary: {
          en: "The simplest cure is wording. Pose the same problem in natural frequencies (“1 in 1,000 people” and “about 50 false alarms” rather than “0.1%” and “5%”), and far more people, doctors included, get it right.",
        },
        provenance: {
          source:
            "Gigerenzer G, Hoffrage U. How to improve Bayesian reasoning without instruction: frequency formats. Psychol Rev. 1995;102(4):684-704.",
          year: 1995,
          doi: "10.1037/0033-295X.102.4.684",
          url: "https://doi.org/10.1037/0033-295X.102.4.684",
        },
      },
    ],
  },

  share: {
    title: { en: "The base-rate fallacy, a reasoning trap." },
    explainer: {
      en: "A test can be 95% accurate and a positive result can still mean you're almost certainly fine. The trick is how rare the thing is. If only 1 in 1,000 people have a disease, then among everyone who tests positive, the few real cases are buried under a pile of false alarms. Accuracy isn't the same as your actual odds; you have to ask how common it is first.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Casscells W, Schoenberger A, Grayboys TB. Interpretation by physicians of clinical laboratory results. N Engl J Med. 1978;299(18):999-1001. (Prevalence 1/1000, 5% false-positive rate; the modal physician answer was 95%, correct ≈ 2%.)",
    year: 1978,
    doi: "10.1056/NEJM197811022991808",
    url: "https://pubmed.ncbi.nlm.nih.gov/692627/",
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Base_rate_fallacy",
};
