import type { Puzzle } from "../schema";

/**
 * The Will Rogers phenomenon (stage migration).
 *
 * Structure: two cohorts of 200 lung cancer patients, split into an early and an
 * advanced stratum. The later cohort is ahead in BOTH strata yet behind overall,
 * because sharper imaging moved 40 borderline patients out of the early bucket
 * and into the advanced one. Only the counts are authored; every percentage in
 * the app is derived from them (see engine/charts/rates.ts).
 *
 * Provenance note: the phenomenon, and the lung cancer setting, are Feinstein,
 * Sosin & Wells (NEJM 1985), cited below. Their stage-by-stage counts are not
 * openly available, so the 200-patient table here is a worked illustration of
 * the mechanism they described rather than their data. Every real-world figure
 * quoted in the lesson carries its own primary citation and was checked against
 * the source.
 */
export const willRogers: Puzzle = {
  schemaVersion: 1,
  id: "will-rogers-stage-migration",
  slug: "will-rogers",
  category: "statistical-reasoning",
  reasoningSkill: "will-rogers-phenomenon",
  difficulty: "hard",
  tags: ["clinical", "epidemiology", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Survival improved in every stage. So which group actually did better?",
    },
    framing: {
      en: "Picture 200 lung cancer patients at one hospital, and another 200 treated there years later. In between, the hospital started scanning everyone with CT and bone scans on top of the chest X-ray it always did. The drugs and the surgery barely changed. Here is how many were alive at six months, split by how advanced the cancer was.",
    },
    question: {
      en: "Counting all 200 patients in each group, which group was more likely to be alive at six months?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Six-month survival" },
      higherIsBetter: true,
      groups: [
        {
          id: "before",
          label: { en: "Earlier group, staged by chest X-ray" },
          short: { en: "Earlier" },
        },
        {
          id: "after",
          label: { en: "Later group, staged by X-ray plus CT and bone scan" },
          short: { en: "Later" },
        },
      ],
      strata: [
        { id: "early", label: { en: "Early stage" } },
        { id: "advanced", label: { en: "Advanced stage" } },
      ],
      observations: [
        {
          groupId: "before",
          stratumId: "early",
          numerator: 96,
          denominator: 120,
        },
        {
          groupId: "before",
          stratumId: "advanced",
          numerator: 20,
          denominator: 80,
        },
        {
          groupId: "after",
          stratumId: "early",
          numerator: 68,
          denominator: 80,
        },
        {
          groupId: "after",
          stratumId: "advanced",
          numerator: 46,
          denominator: 120,
        },
      ],
    },
    initialView: { kind: "stratified" },
  },

  choices: [
    {
      id: "after",
      label: { en: "The later group" },
      sublabel: { en: "ahead in both stages" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "before",
      label: { en: "The earlier group" },
      sublabel: { en: "behind in both stages" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Ahead in both stages. Not ahead overall." },
    mechanismLabel: { en: "What actually moved" },
    mechanismName: { en: "Stage migration, the labels moved, not the patients" },
    explanation: {
      en: "The scans cured nobody. They found small, silent spread that a chest X-ray misses, so 40 patients who would once have been filed under early stage were filed under advanced instead. Those 40 were the frailest of the early group, so the early figure went up when they left. They were also the sturdiest of the advanced group, so the advanced figure went up when they arrived. Both stages improved by relabelling alone, and across all 200 patients nothing improved at all:",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "The Will Rogers phenomenon" },
    takeaway: {
      en: "Move the borderline cases out of the good group and into the bad one, and both groups' averages rise, even though not one person is better off.",
    },
    body: {
      en: "Whenever results are reported group by group, ask whether the two sets of people were sorted into those groups by the same rule. A sharper test sorts more strictly, and stricter sorting flatters every group at once. The number that cannot be massaged this way is the one that covers everybody.",
    },
    howItWorks: {
      en: "Picture two buckets, one for mild cases and one for severe. The people sitting right on the boundary are the worst members of the mild bucket and the best members of the severe bucket. Move them across and you have taken the mild bucket's weakest members away, so its average rises, and you have handed the severe bucket its strongest members, so its average rises too. Nobody's health changed by a day. Better scanners perform exactly this move on their own, every time they catch spread that older tests missed, and so does any tightened definition or lowered threshold. That is why survival reported stage by stage cannot be compared across eras, or between two hospitals that scan at different rates: the stages themselves are not the same stages. The defences are simple. Look at everyone pooled together, and sort people by something the technology cannot shift, such as their symptoms.",
    },
    examples: [
      {
        title: { en: "Lung cancer, the original case" },
        summary: {
          en: "Researchers compared lung cancer patients first treated in 1977 with patients treated at the same institutions between 1953 and 1964. The newer patients had better six-month survival for the whole group and inside each of the three main TNM stages. The newer patients had also had a battery of new imaging tests, which revealed spread that had formerly gone unnoticed, so many who would once have been put in a good stage were now put in a bad one. Sorted instead by symptoms, a yardstick no scanner can shift, the two groups had similar survival. The authors named the effect after Will Rogers.",
        },
        provenance: {
          source:
            "Feinstein AR, Sosin DM, Wells CK. The Will Rogers phenomenon. Stage migration and new diagnostic techniques as a source of misleading statistics for survival in cancer. N Engl J Med. 1985;312(25):1604-1608.",
          year: 1985,
          doi: "10.1056/NEJM198506203122504",
          url: "https://pubmed.ncbi.nlm.nih.gov/4000199/",
        },
      },
      {
        title: { en: "The same trick, twenty years later" },
        summary: {
          en: "As PET scanning spread through American hospitals, it happened again. Among lung cancer patients in a population registry, 1,914 of 4,941 were labelled stage IV in 1994 to 1998; in 1999 to 2004 it was 3,517 of 7,454. Survival inside the stages duly looked better: two-year survival for stage III went from 18% to 22%, and for stage IV from 6% to 8%. The authors called their paper the Will Rogers phenomenon revisited.",
        },
        provenance: {
          source:
            "Chee KG, Nguyen DV, Brown M, Gandara DR, Wun T, Lara PN. Positron emission tomography and improved survival in patients with lung cancer: the Will Rogers phenomenon revisited. Arch Intern Med. 2008;168(14):1541-1549.",
          year: 2008,
          doi: "10.1001/archinte.168.14.1541",
          url: "https://pubmed.ncbi.nlm.nih.gov/18663166/",
        },
      },
    ],
  },

  share: {
    title: { en: "The Will Rogers phenomenon, a reasoning trap." },
    explainer: {
      en: "Take the weakest members of a good group and move them into the bad group. The good group's average goes up, because you removed its worst. The bad group's average goes up too, because you gave it your best. Both groups now look better and not a single person has changed. This happens for real every time a sharper scan or a stricter definition pushes borderline cases across a line, which is why \"survival improved at every stage\" can mean nothing improved at all.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Feinstein AR, Sosin DM, Wells CK. The Will Rogers phenomenon. Stage migration and new diagnostic techniques as a source of misleading statistics for survival in cancer. N Engl J Med. 1985;312(25):1604-1608.",
    year: 1985,
    doi: "10.1056/NEJM198506203122504",
    url: "https://pubmed.ncbi.nlm.nih.gov/4000199/",
    note: {
      en: "Feinstein and colleagues described exactly this effect: lung cancer patients treated in 1977 had better six-month survival than patients treated at the same institutions in 1953 to 1964, both overall and within each of the three main TNM stages, because new imaging pushed patients with newly visible spread out of the good stages and into the bad ones. The 200-patient table in this puzzle is a worked illustration of that mechanism; it is not data from their paper, whose stage-by-stage counts are not openly available. Every real-world figure quoted in the lesson carries its own citation and was checked against the source.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Will_Rogers_phenomenon",
};
