import type { Puzzle } from "../schema";

/**
 * Puzzle #6, the Will Rogers phenomenon, via Feinstein's lung cancer cohort.
 *
 * The counts are the real ones from Table 4 of Feinstein, Sosin & Wells (NEJM
 * 1985): the SAME 131 patients treated in 1977, staged twice. Once using only
 * the kind of information available to the older cohort, once using the new
 * imaging. Same people, same outcomes, same 72 survivors, and yet every stage
 * looks better under the new staging.
 *
 * Arithmetic checked against the paper: old 42+25+64 = 131 and 32+17+23 = 72;
 * new 24+18+89 = 131 and 22+13+37 = 72. Both totals derive to 55 percent.
 *
 * The aggregate view is therefore a dead heat, which is the whole point, so
 * bestGroupId returns null and no bar is crowned. The setup opens on the
 * stratified view (the seductive "better everywhere") and the reveal shows the
 * unchanged total.
 */
export const willRogers: Puzzle = {
  schemaVersion: 1,
  id: "will-rogers-stage-migration",
  slug: "stage-migration",
  category: "statistical-reasoning",
  reasoningSkill: "will-rogers-phenomenon",
  difficulty: "hard",
  tags: ["clinical", "epidemiology", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Better survival in every single stage. Did anyone actually live longer?",
    },
    framing: {
      en: "One group of 131 lung cancer patients, treated in 1977, sorted into stages twice. First using only the information older hospitals could gather, then again after new scans. Nobody was treated differently. Only the sorting changed.",
    },
    question: { en: "Did these patients actually do better?" },
    data: {
      type: "rates",
      metricLabel: { en: "Six-month survival" },
      higherIsBetter: true,
      groups: [
        {
          id: "old",
          label: { en: "Sorted the old way" },
          short: { en: "Old" },
        },
        {
          id: "new",
          label: { en: "Sorted after the new scans" },
          short: { en: "New" },
        },
      ],
      strata: [
        { id: "i", label: { en: "Stage I" } },
        { id: "ii", label: { en: "Stage II" } },
        { id: "iii", label: { en: "Stage III" } },
      ],
      observations: [
        { groupId: "old", stratumId: "i", numerator: 32, denominator: 42 },
        { groupId: "old", stratumId: "ii", numerator: 17, denominator: 25 },
        { groupId: "old", stratumId: "iii", numerator: 23, denominator: 64 },
        { groupId: "new", stratumId: "i", numerator: 22, denominator: 24 },
        { groupId: "new", stratumId: "ii", numerator: 13, denominator: 18 },
        { groupId: "new", stratumId: "iii", numerator: 37, denominator: 89 },
      ],
    },
    initialView: { kind: "stratified" },
  },

  choices: [
    {
      id: "improved",
      label: { en: "Yes, they did better" },
      sublabel: { en: "every stage improved" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "unknowable",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "unchanged",
      label: { en: "No, nothing changed" },
      sublabel: { en: "only the labels moved" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Identical. Seventy two survivors either way." },
    mechanismLabel: { en: "The migration" },
    mechanismName: { en: "Patients moved between stages, and lifted both" },
    explanation: {
      en: "The new scans spotted spread that the old workup had missed, so patients were moved out of better stages into worse ones. Each of them was among the sickest in the stage they left, so that stage's average rose. Each was also among the healthiest in the stage they joined, so that average rose too. Every stage improved and not one person's outcome changed:",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "The Will Rogers phenomenon" },
    takeaway: {
      en: "Move members from one group into another and you can lift the average of every group at once, while the overall picture stays exactly the same.",
    },
    body: {
      en: "Whenever a category's average improves, ask whether the category still holds the same kind of members. Better detection quietly reshuffles who counts as mild and who counts as severe, and a reshuffle on its own can make every column look better.",
    },
    howItWorks: {
      en: "Picture two buckets, one of good outcomes and one of bad. Take the worst items out of the good bucket and drop them into the bad one, where they are the best of a bad lot. The good bucket's average rises because its weakest members left. The bad bucket's average rises because it gained members better than its own. Both averages improve and nothing about any individual has changed. In medicine the reshuffling is done by better scans, which find disease that was always there but previously invisible. That is why survival by stage can improve across the board in a period when the treatments themselves did not get better, and it is why comparing stages across eras of different technology is treacherous.",
    },
    examples: [
      {
        title: { en: "The check that gave it away" },
        summary: {
          en: "The same researchers sorted both eras of patients by their symptoms instead, a yardstick no scanner can shift. Judged that way the two groups survived at much the same rate, around 77 and 78 percent for those without symptoms, and 26 against 22 percent for the sickest. What had really changed was the mix, because the newer group held twice the proportion of the mildest patients.",
        },
        provenance: {
          source:
            "Feinstein AR, Sosin DM, Wells CK. The Will Rogers phenomenon: stage migration and new diagnostic techniques as a source of misleading statistics for survival in cancer. N Engl J Med. 1985;312(25):1604-1608. (Survival and cohort composition by symptom stage.)",
          year: 1985,
          doi: "10.1056/NEJM198506203122504",
          url: "https://pubmed.ncbi.nlm.nih.gov/4000199/",
        },
      },
      {
        title: { en: "It happened again with PET" },
        summary: {
          en: "As PET scanning spread through American hospitals, lung cancer patients were reclassified all over again. The share labelled most advanced grew, and survival within the stages duly ticked up, two year survival moving from 18 to 22 percent in one stage and 6 to 8 percent in another. The authors called their paper the phenomenon revisited.",
        },
        provenance: {
          source:
            "Chee KG, Nguyen DV, Brown M, Gandara DR, Wun T, Lara PN. Positron emission tomography and improved survival in patients with lung cancer: the Will Rogers phenomenon revisited. Arch Intern Med. 2008;168(14):1541-1549.",
          year: 2008,
          doi: "10.1001/archinte.168.14.1541",
          url: "https://doi.org/10.1001/archinte.168.14.1541",
        },
      },
    ],
  },

  share: {
    title: { en: "The Will Rogers phenomenon, a reasoning trap." },
    explainer: {
      en: "Take the worst members of a good group and move them into a bad group. The good group's average rises, because its weakest ones left. The bad group's average rises too, because the newcomers are better than what it already had. Every group improves and nothing real has happened. It is how sharper scans can make survival look better in every stage of a disease while exactly as many people live and die.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Feinstein AR, Sosin DM, Wells CK. The Will Rogers phenomenon: stage migration and new diagnostic techniques as a source of misleading statistics for survival in cancer. N Engl J Med. 1985;312(25):1604-1608.",
    year: 1985,
    doi: "10.1056/NEJM198506203122504",
    url: "https://pubmed.ncbi.nlm.nih.gov/4000199/",
    note: {
      en: "The counts are Table 4: the 1977 cohort of 131 patients staged twice, once on the data the older cohort had and once with the new imaging. Both stagings give 72 survivors, a six-month survival of 55 percent.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Will_Rogers_phenomenon",
};
