import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #17, the nocebo effect, on StatinWISE.
 *
 * The reveal is one extra bar. That is the whole design: the setup shows the
 * rate of muscle symptoms while taking the drug, which is the number anyone
 * would quote, and the reveal puts the placebo months beside it.
 *
 *   muscle symptoms reported in  248 / 397 statin periods   (62.5%)
 *                                239 / 388 placebo periods  (61.6%)
 *
 * Both numerators and both denominators are printed, which is unusual and is
 * why this trial was chosen over the better-known alternatives. SAMSON reports
 * mean symptom scores rather than counts, so nothing could be authored as raw
 * integers. ASCOT-LLA was checked and rejected outright: its denominators are
 * person-time, and deriving crude proportions from its printed counts reverses
 * its own open-label finding, which is exactly the trap this project exists to
 * teach and must not fall into.
 *
 * THE UNIT CAVEAT, which is load-bearing. The denominators are two-month
 * treatment PERIODS, not people: 152 participants each completed up to six
 * blind periods, three of statin and three of placebo. The figure says so, the
 * framing says so and the provenance says so. Reporting 785 as though it were
 * 785 people would be the same species of error as the ones in the deck.
 *
 * THE HONESTY THAT MAKES OR BREAKS THIS PUZZLE. Statins are contested ground
 * and it would be easy to write something that reads as "your symptoms are
 * imagined". That is both cruel and false, so the option saying the pain is
 * not real is wrong, and the correct answer says the pain is real and the drug
 * is not what is causing it. Three further limits are stated in the lesson
 * rather than buried: everyone in this trial had ALREADY had muscle symptoms
 * on a statin, so it is a selected group and not the general population; rare
 * genuine statin myopathy exists and is a different thing; and none of this
 * says anything about whether statins work.
 */
export const nocebo: Puzzle = {
  schemaVersion: 1,
  id: "nocebo-statinwise",
  slug: "the-dummy-pill",
  category: "causal-reasoning",
  reasoningSkill: "nocebo-effect",
  difficulty: "medium",
  tags: ["everyday", "clinical", "pharmacology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Almost two thirds of the months people spent on this drug brought muscle pain. Is the drug doing it?",
    },
    framing: {
      en: "152 people who had all had muscle trouble on a statin before took part. Each spent up to six two-month stretches on either atorvastatin or an identical dummy tablet, in a random order, without knowing which was which, and said at the end of each stretch whether they had muscle symptoms. Muscle symptoms were reported in 62.5 percent of the stretches on the drug.",
    },
    question: { en: "Is the statin causing the pain?" },
    data: {
      type: "rates",
      metricLabel: { en: "Two-month stretches with muscle symptoms" },
      higherIsBetter: false,
      // 62.5 against 61.6 is a dead heat, and crowning either bar would assert
      // a difference this trial was built to look for and did not find.
      crownWinner: false,
      groups: [
        {
          id: "statin",
          label: { en: "Stretches on the statin" },
          short: { en: "Statin" },
        },
        {
          id: "placebo",
          label: { en: "Stretches on the dummy tablet" },
          short: { en: "Dummy" },
        },
      ],
      strata: [{ id: "all", label: { en: "All stretches" } }],
      observations: [
        { groupId: "statin", stratumId: "all", numerator: 248, denominator: 397 },
        { groupId: "placebo", stratumId: "all", numerator: 239, denominator: 388 },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["statin"],
      caption: { en: "On the drug" },
    },
  },

  choices: [
    {
      id: "yes",
      label: { en: "Yes, the drug is causing it" },
      sublabel: { en: "two thirds of the time" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "imagined",
      label: { en: "No, the pain is not real" },
      sublabel: { en: "they are imagining it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "real-not-caused",
      label: { en: "The pain is real, and the drug is not causing it" },
      sublabel: { en: "compare it with something" },
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
    headline: { en: "The dummy tablet did almost exactly the same thing." },
    mechanismLabel: { en: "What the second bar is for" },
    mechanismName: { en: "There was nothing in the other tablet" },
    explanation: {
      en: "The same people, in the same months, taking a tablet with no drug in it, reported muscle symptoms 61.6 percent of the time. Nobody knew which tablet they were on. So the pain was there either way, and the 62.5 percent on the statin is almost entirely a rate of muscle pain in people who ache, not a rate of pain caused by the drug:",
    },
    body: {
      en: "That is what a control group is for, and why a rate on its own can never answer the question. Muscle pain is common. It is commoner still in people who have had it before, who are watching for it, and who have been handed a leaflet listing it. The only way to find out what the drug adds is to run the same months without it, which is what this trial did.",
    },
    view: { kind: "aggregate", caption: { en: "Both tablets" } },
  },

  lesson: {
    skillName: { en: "The nocebo effect" },
    takeaway: {
      en: "A symptom that appears after you start a drug is not evidence the drug caused it, until you know how often the same symptom appears in people taking nothing.",
    },
    body: {
      en: "Note carefully what this does not say. The pain is real: these people hurt, and were not pretending. Rare genuine statin muscle injury exists and is a different thing, diagnosed differently. Everyone here had already had muscle trouble on a statin, so this is a selected group rather than the general population. And the trial says nothing at all about whether statins do their job. What it settles is narrower and more useful: for this common complaint, the tablet and the dummy behaved the same.",
    },
    howItWorks: {
      en: "Expecting a side effect helps produce it, and being told to watch for one makes you notice sensations you would otherwise have let pass. That is the nocebo effect, the unhappy twin of the placebo effect, and it is not lying or weakness: attention genuinely changes what a body reports, and aches are ordinary enough that everyone has some to find. The reasoning trap around it is simpler than the psychology. Someone starts a drug, a symptom appears, and the two get joined up, because a story with a cause in it is easier to hold than a coincidence. The missing number is always the same one: how often does that symptom turn up in people who did not take the drug? Without it, a side-effect rate is not a measurement of the drug at all, it is a measurement of how common the symptom is in the kind of person who gets prescribed it. This is why blinding matters so much for anything a patient reports. Once someone knows they are on the drug, their symptom reports are partly about the drug and partly about knowing, and the two cannot be separated afterwards. The effect is large enough to reverse conclusions: in trials of the same drug, side-effect rates measured while nobody knew who was taking what are routinely far lower than the rates measured once everyone knows. None of which means a reported side effect should be waved away. It means the question of whether this is the drug gets answered by taking the drug away and putting it back, not by counting how many people on it have the symptom.",
    },
    examples: [
      {
        title: { en: "The months with no tablet at all" },
        summary: {
          en: "A companion trial went one better and added a third condition: months on the statin, months on an identical dummy, and months taking nothing whatsoever, all in a random order, with participants rating their symptoms every day. The months on the dummy tablet were nearly as bad as the months on the statin. The months with no tablet were far better than either. Most of the symptom burden, in other words, came from the act of taking a tablet rather than from what was in it, and half the participants restarted a statin afterwards.",
        },
        provenance: {
          source:
            "Howard JP, Wood FA, Finegold JA, et al. Side effect patterns in a crossover trial of statin, placebo, and no treatment (SAMSON). J Am Coll Cardiol. 2021;78(12):1210-1222. Note that this trial's outcome is a daily symptom intensity score rather than a count of people, so its results are described here in words rather than reproduced as rates.",
          year: 2021,
          doi: "10.1016/j.jacc.2021.07.022",
          url: "https://pubmed.ncbi.nlm.nih.gov/34531021/",
        },
      },
    ],
  },

  share: {
    title: { en: "The nocebo effect, a reasoning trap." },
    explainer: {
      en: "You start a new tablet, and a week later your legs ache. The tablet did it, obviously. Except that aches are common, and expecting one helps you find it. In one trial, people took a statin for some months and an identical tablet with nothing in it for others, without knowing which. They reported muscle pain in 62.5 percent of the months on the drug, and 61.6 percent of the months on the dummy. The pain was real. The drug was not what was causing it. A side-effect rate with nothing to compare it against tells you how common the symptom is, not what the drug does.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Herrett E, Williamson E, Brack K, et al. Statin treatment and muscle symptoms: series of randomised, placebo controlled n-of-1 trials (StatinWISE). BMJ. 2021;372:n135, Table 2, p. 5. Open access under CC BY. Muscle symptoms were reported in 248 of 397 atorvastatin periods and 239 of 388 placebo periods.",
    year: 2021,
    doi: "10.1136/bmj.n135",
    url: "https://pubmed.ncbi.nlm.nih.gov/33627334/",
    note: {
      en: "The denominators are two-month treatment periods, not people: 152 participants each completed up to six blinded periods, three of atorvastatin 20 mg and three of matching placebo, so 785 periods come from 152 individuals. The paper's own column heading says participants, which is loose wording on its part, and the figures are presented here as periods because that is what they are. For the same reason the paper's odds ratio cannot be recomputed from these four numbers, since one person contributes several periods, so it is not quoted. A person-level figure is also printed: 18 of 200 randomised participants withdrew because of intolerable muscle symptoms while on atorvastatin, against 13 of 200 while on placebo. Participants were recruited precisely because they had had muscle symptoms on a statin before, so this is a selected group and its rates should not be read as rates in the general population.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Nocebo",
};
