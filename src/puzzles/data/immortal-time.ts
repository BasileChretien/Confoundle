import type { Puzzle } from "../schema";

/**
 * Puzzle #16, immortal time bias, on Suissa's worked cohort.
 *
 * The one bias in the deck where the flaw is not in the patients, the
 * measurement or the analysis, but in the CLOCK. A patient is sorted into the
 * treated group by something that happened on day 60, and then day 1 to day 59
 * is credited to that group as well. During those days the patient could not
 * have died, because dying would have kept them out of the group. The treated
 * group is therefore handed a stretch of guaranteed survival before the drug
 * has done anything at all.
 *
 * Why the timeline shape rather than rates: the deaths and the denominators are
 * not what is wrong here. 188 of 388 really did die on the drug and 357 of 500
 * really did die off it. What is wrong is which stretches of time were counted
 * where, and no bar chart of proportions can show a stretch of time being
 * counted in the wrong place. Setup and reveal have to be the same bars, once
 * whole and once with part of them struck out. Hence `counted` and `immortal`,
 * and the one new optional field, `immortalUntil`, that the shape's design note
 * predicted this puzzle would need.
 *
 * The figure is schematic, like the bomber diagram and the lead-time figure: two
 * illustrative patients, not two rows of a dataset. Its proportions are chosen
 * to echo the published ones rather than to stand in for them. The drug group's
 * counted time here is 22 months of which 11 are immortal, so a hair over half,
 * against 291.1 immortal person-years and 276.3 at risk in the paper, which is
 * 51.3 percent. The puzzle's factual claims, the death counts and the hazard
 * ratios, are in the provenance where they can be checked.
 */
export const immortalTime: Puzzle = {
  schemaVersion: 1,
  id: "immortal-time-suissa",
  slug: "the-months-before",
  category: "causal-reasoning",
  reasoningSkill: "immortal-time-bias",
  difficulty: "hard",
  tags: ["clinical", "pharmacology", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Patients who were dispensed this drug died far less often than those who were not. Is the drug working?",
    },
    framing: {
      en: "A cohort is followed from the day each patient enters it. Anyone who is dispensed the drug at any point during follow-up counts as treated; everyone else counts as untreated. 49 percent of the treated died against 71 percent of the untreated, and the drug appears to halve the death rate.",
    },
    question: { en: "Is that gap the drug?" },
    data: {
      type: "timeline",
      label: { en: "One patient from each group" },
      unit: { en: "months" },
      span: 24,
      onsetLabel: { en: "entered the cohort" },
      detectedLabel: { en: "first prescription dispensed" },
      diedLabel: { en: "died" },
      survivalLabel: { en: "follow-up credited to each group" },
      immortalLabel: { en: "Counted, but death was impossible" },
      tracks: [
        {
          id: "treated",
          label: { en: "Counted as on the drug" },
          onsetAt: 0,
          detectedAt: 11,
          diedAt: 22,
          // The patient joined the treated group in month 11 and was credited
          // with the ten months before it. Had they died in month 6 they would
          // have been in the other group, which is exactly why those months
          // could not contain their death.
          immortalUntil: 11,
        },
        {
          id: "untreated",
          label: { en: "Counted as not on the drug" },
          onsetAt: 0,
          // No prescription was ever dispensed. detectedAt is pinned to the
          // death so the schema's ordering holds; nothing draws it for a track
          // with no immortal stretch.
          detectedAt: 4,
          diedAt: 4,
        },
      ],
    },
    initialView: { kind: "counted" },
  },

  choices: [
    {
      id: "works",
      label: { en: "Yes, the drug is keeping them alive" },
      sublabel: { en: "half the deaths" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "sicker",
      label: { en: "No, the untreated were sicker to begin with" },
      sublabel: { en: "they were never offered it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "clock",
      label: { en: "No, some of that time could not contain a death" },
      sublabel: { en: "the clock was started too early" },
      // True of the design, and still not an answer to the question asked.
      // Spotting a flaw is not the same as knowing the flaw explains the gap,
      // and the setup gives nothing with which to size it.
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here, because the setup
      // already gives you what you need to answer.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      // Correct, and deliberately worded exactly as everywhere else in the
      // deck. The moment the right hedge reads differently from the wrong
      // ones it becomes a tell, which is the whole reason it is reused.
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Half the treated group's follow-up was time in which nobody could die." },
    mechanismLabel: { en: "The stretch before the prescription" },
    mechanismName: { en: "Surviving is what put them in the treated group" },
    explanation: {
      en: "Both objections on the list were live and nothing you had been shown could settle between them: the cohort reported no baseline characteristics at all, so the treated really might have been healthier, and the exposure definition really does hand them immortal time. Spotting a flaw is not the same as knowing that flaw explains the gap, and the size of it was not on the page. Here is what the follow-up shows. This patient was counted as treated from the day they entered, but the prescription was not dispensed until month 11. Those eleven months are immortal: had the patient died in month 6, no prescription would ever have been written and they would have been counted in the other group instead. Death was not merely unlikely in that stretch, it was impossible by the way the groups were defined, and it is credited to the drug all the same:",
    },
    body: {
      en: "Nothing about the patients has to differ for this to work. Give both groups exactly the same drug, the same illness and the same luck, and the treated group will still come out ahead, because it has been handed a run of guaranteed survival that the other group cannot have. In the published example this is drawn from, the treated group was credited with 291.1 immortal person-years against 276.3 person-years in which it was genuinely at risk: more of its follow-up was impossible-to-die time than was real. Correcting only that moved the hazard ratio from 0.48 to 0.91.",
    },
    view: { kind: "immortal", caption: { en: "The same follow-up, marked" } },
  },

  lesson: {
    skillName: { en: "Immortal time bias" },
    takeaway: {
      en: "If being in a group requires surviving until something happens, then the time before it happened cannot contain a death, and counting it towards that group manufactures survival out of bookkeeping.",
    },
    body: {
      en: "The tell is a group defined by something that occurs after follow-up starts: filled the prescription, had the operation, responded to treatment, won the award, completed the course. Ask what happens to a person who dies the day before. If they land in the comparison group, the clock is wrong. The fix is not a cleverer adjustment: it is to count each person's time as unexposed until the moment they become exposed, and let them switch.",
    },
    howItWorks: {
      en: "Cohort studies compare rates, and a rate is deaths divided by time at risk. That denominator is where this hides. Suppose you want to know whether a drug helps, so you follow everyone admitted to hospital and sort them afterwards by whether they were ever dispensed it. The sorting looks innocent, but it uses information from the future: to be dispensed a drug in month 11, you must be alive in month 11. So every patient in the treated group is guaranteed to have survived to their own first prescription, and if you start their clock at admission you credit the treated group with all of that guaranteed survival. The untreated group gets no such gift, because it is where the early deaths necessarily land. The bias is large, it always points the same way, it makes useless drugs look protective, and it does not shrink with a bigger sample, because it is not noise. It also has nothing to do with confounding, which is why adjusting for how ill the patients were does not touch it: you can simulate the whole thing with identical patients and a drug that does nothing. The correct handling is standard and unglamorous. Treat exposure as time-varying: every patient contributes unexposed time from entry until their first prescription and exposed time after it, so nobody is credited to a group before they belong to it. The same trap sits under any claim built on people who finished something, from Academy Award winners living longer than nominees to patients who completed a rehabilitation programme, and in each case the first question is the same: what happens in these numbers to the person who died in the middle?",
    },
    examples: [
      {
        title: { en: "The Oscar winners who did not, after all, live longer" },
        summary: {
          en: "A well-known study reported that Academy Award winners outlived the actors merely nominated alongside them by nearly four years, and it was widely read as evidence that status is good for your health. But an actor cannot win an award while dead, so every winner was credited with all the years before their win, whereas a nominee who died young could only ever be a nominee. Reanalysing the same data with the award treated as something that happens partway through a life, rather than a property of the whole life, cut the advantage to about a year and it was no longer statistically significant. The original authors later published a null result of their own.",
        },
        provenance: {
          source:
            "Original claim: Redelmeier DA, Singh SM. Survival in Academy Award-winning actors and actresses. Ann Intern Med. 2001;134(10):955-962. Correction: Sylvestre MP, Huszti E, Hanley JA. Do Oscar winners live longer than less successful peers? A reanalysis of the evidence. Ann Intern Med. 2006;145(5):361-363, which reports the advantage falling to about one year and losing significance once the award is handled as a time-dependent exposure.",
          year: 2006,
          doi: "10.7326/0003-4819-145-5-200609050-00009",
          url: "https://pubmed.ncbi.nlm.nih.gov/16954361/",
        },
      },
    ],
  },

  share: {
    title: { en: "Immortal time bias, a reasoning trap." },
    explainer: {
      en: "Sort people into groups by something that happens later, and one of those groups gets a hidden head start. To be counted as having taken the drug, you have to live long enough to be given it. So everybody in the treated group is guaranteed to have survived up to their first prescription, and if you count that stretch towards the drug, the drug is credited with survival it had nothing to do with. Anyone who died early is automatically filed under untreated. It works even when the drug does nothing at all, it always points the same way, and a bigger study only makes it more convincing.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Suissa S. Immortal time bias in pharmaco-epidemiology. Am J Epidemiol. 2008;167(4):492-499, Table 1, multiple-event-based cohort. Deaths: 188 of 388 classified as treated (48.5 percent) and 357 of 500 classified as untreated (71.4 percent). Person-time: 276.3 person-years at risk against 291.1 immortal person-years. Hazard ratio 0.48 as counted, 0.91 once the immortal time is handled correctly. Free full text.",
    year: 2008,
    doi: "10.1093/aje/kwm324",
    url: "https://pubmed.ncbi.nlm.nih.gov/18056625/",
    note: {
      en: "The figure above is schematic, like the bomber diagram: two illustrative patients rather than two rows of the dataset, with proportions chosen to echo the published ones (eleven immortal months out of twenty-two counted, against 291.1 immortal person-years out of 567.4 counted, which is 51.3 percent). The numbers that are claims about the world, the death counts and the two hazard ratios, are all in the citation above and none of them is recomputed here: the hazard ratios come from survival models rather than from any two-by-two table, and the paper is a methodological reanalysis in which several cohort definitions are applied to one dataset, so the row is named exactly.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Immortal_time_bias",
};
