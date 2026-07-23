import type { Puzzle } from "../schema";

/**
 * Puzzle #11, confounding by indication, on the DIG trial.
 *
 * What makes this the cleanest possible version of the lesson: the two panels
 * are the SAME 6,800 patients, partitioned two different ways. Same outcome,
 * same follow-up, same trial. There is no "different patients, different era,
 * different endpoint" objection to answer.
 *
 *   Grouped by what doctors had prescribed before the trial:
 *     on digoxin      1207 / 3017 = 40.0%
 *     not on digoxin  1168 / 3783 = 30.9%
 *   Grouped by the trial's own randomisation:
 *     digoxin         1181 / 3397 = 34.8%
 *     placebo         1194 / 3403 = 35.1%
 *
 * Provenance detail worth knowing before touching these numbers. The four
 * numerators are printed in Aguirre Davila et al. (Eur Heart J 2019), and the
 * randomised arm sizes in the DIG trial's own Table 2 (NEJM 1997). The two
 * observational denominators are not printed anywhere: 3017 is the sum of the
 * supplement's two "previous digoxin use" counts (1498 + 1519) and 3783 is the
 * remainder of the 6,800. That is addition over published integers, never a
 * back-calculation from a rounded percentage, and it closes in both directions:
 * 1207 + 1168 = 1181 + 1194 = 2375 deaths, and 3017 + 3783 = 3397 + 3403 =
 * 6,800 patients. The provenance note says so out loud.
 *
 * The strata are one population sliced twice, so pooling them would count every
 * patient a second time: hence strataAreSeparateSamples. And nothing is crowned,
 * because a 34.8 against 35.1 is not a winner.
 */
export const confoundingIndication: Puzzle = {
  schemaVersion: 1,
  id: "confounding-by-indication-digoxin",
  slug: "why-they-got-it",
  category: "causal-reasoning",
  reasoningSkill: "confounding-by-indication",
  difficulty: "hard",
  tags: ["clinical", "pharmacology", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Patients taking this heart drug died more often than patients not taking it. Is the drug killing them?",
    },
    framing: {
      en: "6,800 people with heart failure. When they joined the trial, some were already on digoxin because a doctor had decided to prescribe it, and some were not. Over the following years, 40 percent of those already on it died, against 31 percent of the others.",
    },
    question: { en: "Is digoxin causing those extra deaths?" },
    data: {
      type: "rates",
      metricLabel: { en: "Died during the trial" },
      higherIsBetter: false,
      // A 34.8 against a 35.1 is not a victory, and marking one would assert a
      // finding the trial spent 6,800 patients showing was not there.
      crownWinner: false,
      // One population sliced twice, so pooling the panels would count every
      // patient again.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "on",
          label: { en: "On digoxin" },
          short: { en: "Digoxin" },
        },
        {
          id: "off",
          label: { en: "Not on digoxin" },
          short: { en: "Not on it" },
        },
      ],
      strata: [
        { id: "doctor", label: { en: "Sorted by what doctors prescribed" } },
        { id: "coin", label: { en: "Sorted by the trial's coin flip" } },
      ],
      observations: [
        { groupId: "on", stratumId: "doctor", numerator: 1207, denominator: 3017 },
        { groupId: "off", stratumId: "doctor", numerator: 1168, denominator: 3783 },
        { groupId: "on", stratumId: "coin", numerator: 1181, denominator: 3397 },
        { groupId: "off", stratumId: "coin", numerator: 1194, denominator: 3403 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["doctor"],
      caption: { en: "As prescribed in practice" },
    },
  },

  choices: [
    {
      id: "harm",
      label: { en: "Yes, the drug is harming them" },
      sublabel: { en: "nine points worse" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "adjust",
      label: { en: "No, and adjusting for severity will show that" },
      sublabel: { en: "the statistics can correct it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "marker",
      label: { en: "No, and adjusting will not fix it either" },
      sublabel: { en: "the prescription marks the patient" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "The same 6,800 patients, sorted by a coin flip. No difference." },
    mechanismLabel: { en: "The reason for the prescription" },
    mechanismName: { en: "The prescription marked how ill they already were" },
    explanation: {
      en: "These are the same people in both panels, grouped two different ways. Sorted by what their doctors had decided, digoxin looks lethal. Sorted by the trial's random assignment, which no clinical judgement touched, the two groups die at the same rate. Doctors were reaching for digoxin in the patients who were already worse off, so the prescription carried information about the patient that nothing in the dataset had recorded:",
    },
    body: {
      en: "Adjusting for 27 recorded baseline characteristics barely moved it, from a 36 percent excess to 22 percent. And the same excess turned up among the patients the trial had randomised to placebo, people who took no digoxin at all during it. A drug cannot harm those who never received it, so the excess was never the drug.",
    },
    view: { kind: "stratified", caption: { en: "Both ways of sorting" } },
  },

  lesson: {
    skillName: { en: "Confounding by indication" },
    takeaway: {
      en: "When a doctor decides who gets a treatment, the treated differ from the untreated in ways the data never recorded, and the treatment takes the blame, or the credit, for the reason it was given.",
    },
    body: {
      en: "This is why observational comparisons between treated and untreated patients are read so warily, and why \"we adjusted for that\" does not end the argument. Adjustment can only remove what was written down. The judgement that led to the prescription usually was not.",
    },
    howItWorks: {
      en: "Treatments are not handed out at random. A doctor prescribes because of something about the patient: they are sicker, or frailer, or their symptoms are worse. That something also affects how they were going to do anyway. So the treated group starts out different, and any comparison with the untreated measures both the drug and the reason it was chosen, tangled together. It runs both ways. A drug given to the sickest looks harmful; a drug given to the fittest, or one that only patients well enough to attend a clinic can receive, looks miraculous. The standard defence is to adjust for the differences, and it helps, but only for the differences someone thought to record. The clinician's impression that this particular patient was going downhill is real information, it is why the prescription happened, and it is almost never in the dataset. That is the whole reason randomised trials are worth their expense: a coin flip cannot know anything about the patient, so it cannot smuggle the reason into the comparison. When a trial and an observational study disagree about the same drug, this is usually why.",
    },
    examples: [
      {
        title: { en: "Taking your pills predicts survival, even when they are dummies" },
        summary: {
          en: "An earlier trial split its patients by how faithfully they had taken their tablets. Those who took at least 80 percent of them had 15.0 percent five-year mortality against 24.6 percent for the rest, which looks like proof that the drug works if you actually take it. Then the researchers ran the same split inside the placebo group, where the tablets contained nothing: 15.1 percent against 28.2 percent. Adjusting for 40 recorded characteristics narrowed that gap to 16.4 against 25.8 and left it overwhelming. Whatever adherence marks about a person, it was not the medicine.",
        },
        provenance: {
          source:
            "Coronary Drug Project Research Group. Influence of adherence to treatment and response of cholesterol on mortality in the coronary drug project. N Engl J Med. 1980;303(18):1038-1041, Table 1. (Adherence is taking at least 80 percent of the protocol prescription over five years. The adherence analysis covers 1,065 of the 1,103 clofibrate patients and 2,695 of the 2,789 on placebo, the remainder having died or left before any adherence could be determined. Note that the paper's abstract prints 28.3 percent for poor adherers on placebo where its Table 1 and Results print 28.2.)",
          year: 1980,
          doi: "10.1056/NEJM198010303031804",
          url: "https://pubmed.ncbi.nlm.nih.gov/6999345/",
        },
      },
      {
        title: { en: "The same argument, about a procedure" },
        summary: {
          en: "In a study of 5,735 critically ill patients, those who had a catheter threaded into the right side of the heart died more often within 30 days than those who did not, 38.0 percent against 30.6 percent. The procedure was reserved for the patients in most trouble. When it was later tested by randomising who got one, mortality came out at 62 percent with the catheter and 60 percent without, in a trial whose patients were sicker still. The gap that had looked like harm was mostly a gap in who was chosen.",
        },
        provenance: {
          source:
            "Connors AF Jr, Speroff T, Dawson NV, et al. The effectiveness of right heart catheterization in the initial care of critically ill patients. JAMA. 1996;276(11):889-897, Table 2 (30-day survival 1,354 of 2,184 with catheterisation, 2,463 of 3,551 without). Randomised comparison: Harvey S, Harrison DA, Singer M, et al. PAC-Man. Lancet. 2005;366(9484):472-477, Table 2 (28-day mortality 314 of 506 against 305 of 508).",
          year: 1996,
          doi: "10.1001/jama.1996.03540110043030",
          url: "https://pubmed.ncbi.nlm.nih.gov/8782638/",
        },
      },
    ],
  },

  share: {
    title: { en: "Confounding by indication, a reasoning trap." },
    explainer: {
      en: "Nobody hands out medicines at random. Doctors prescribe because of something about the patient, and that something usually affects how the patient was going to do anyway. So people on a drug can die more often than people not on it while the drug does nothing at all: it was given to those who were already worse off. Adjusting for the differences helps, but only the differences somebody wrote down, and the reason for the prescription rarely is one. It is why a coin flip is worth so much.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Aguirre Davila L, Weber K, Bavendiek U, et al. Digoxin-mortality: randomized vs. observational comparison in the DIG trial. Eur Heart J. 2019;40(40):3336-3341, and its Supplementary Appendix. Randomised arm sizes and deaths: The Digitalis Investigation Group. The effect of digoxin on mortality and morbidity in patients with heart failure. N Engl J Med. 1997;336(8):525-533, Table 2.",
    year: 2019,
    doi: "10.1093/eurheartj/ehz395",
    url: "https://academic.oup.com/eurheartj/article/40/40/3336/5520008",
    note: {
      en: "The four death counts are printed in the 2019 paper, and the randomised arm sizes in the 1997 trial report. The two prescribed-in-practice denominators are not printed anywhere: 3,017 is the sum of the supplement's two counts of prior digoxin use (1,498 and 1,519) and 3,783 is the rest of the 6,800. That is addition over published whole numbers rather than a figure worked backwards from a percentage, and it closes both ways: 1,207 plus 1,168 and 1,181 plus 1,194 both give 2,375 deaths, and both pairs of denominators give 6,800 patients.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Confounding",
};
