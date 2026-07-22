import type { Puzzle } from "../schema";

/**
 * Puzzle #4, survivorship bias, via Wald's WWII bomber-armour analysis. Uses
 * the "survivorship" data shape (a plane damage-map): the visible sample is
 * filtered to survivors, so the un-hit areas are the fatal ones.
 */
export const survivorship: Puzzle = {
  schemaVersion: 1,
  id: "wald-bomber-armor",
  slug: "bomber-armor",
  category: "statistical-reasoning",
  reasoningSkill: "survivorship-bias",
  difficulty: "medium",
  tags: ["everyday", "research", "history"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Bombers come home riddled with bullet holes. Where do you add the armour?",
    },
    framing: {
      en: "In WWII, returning bombers were peppered with damage, heaviest on the wings and body, while the engines and cockpit came back almost untouched. Armour is heavy, so you can only reinforce a few areas.",
    },
    question: { en: "Where should the armour go?" },
    data: {
      type: "survivorship",
      label: { en: "Returning bombers" },
      hitLabel: { en: "hits on planes that came back" },
      armorLabel: { en: "armour here, the lost planes' hits" },
    },
    initialView: { kind: "damage" },
  },

  choices: [
    {
      id: "holes",
      label: { en: "The wings and body" },
      sublabel: { en: "where the holes are" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "even",
      label: { en: "Spread it evenly" },
      sublabel: { en: "play it safe" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "clean",
      label: { en: "The engines and cockpit" },
      sublabel: { en: "where there are no holes" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Armour where the holes aren't." },
    mechanismLabel: { en: "The missing planes" },
    mechanismName: { en: "You only see the survivors" },
    explanation: {
      en: "These are the planes that made it home. The ones hit in the engine or cockpit didn't, so their damage never shows up in the data. The holes on the survivors map out exactly where a bomber can be shot and still fly. The clean spots are the fatal ones: armour those.",
    },
    view: { kind: "armor" },
  },

  lesson: {
    skillName: { en: "Survivorship bias" },
    takeaway: {
      en: "When you only look at the winners, the failures become invisible, and they often hold the real lesson.",
    },
    body: {
      en: "Before drawing a conclusion, ask who's missing from the data. The planes that didn't return, the funds that closed, the businesses that folded: they were quietly filtered out, and putting them back can flip the answer.",
    },
    howItWorks: {
      en: "Survivorship bias creeps in whenever your data has quietly been filtered to keep only the things that “made it”: returning planes, funds still trading, companies still around. You never see the ones that failed and dropped out, and because the survivors share whatever helped them survive, that trait looks far more common, or more effective, than it really is. The fix is to hunt for the missing group and ask what the full picture would show. (The real Wald did more than point at a diagram: he built a statistical method to estimate each part's vulnerability from the survivors' damage.)",
    },
    examples: [
      {
        title: { en: "Falling cats" },
        summary: {
          en: "Vets found that cats falling from higher floors often arrived with fewer injuries than those from lower floors. Part of the reason is grim survivorship: a cat that didn't survive the fall was never brought in, so the hospital's data only counts the ones that lived.",
        },
        provenance: {
          source:
            "Whitney WO, Mehlhaff CJ. High-rise syndrome in cats. J Am Vet Med Assoc. 1987;191(11):1399-1403. (132 cats, a classic survivorship-bias caution, alongside feline physiology.)",
          year: 1987,
          doi: "10.2460/javma.1987.191.11.1399",
          url: "https://doi.org/10.2460/javma.1987.191.11.1399",
        },
      },
      {
        title: { en: "Star mutual funds" },
        summary: {
          en: "Look at the funds still on offer today and active management looks great. But funds that did badly get quietly closed and dropped from the records, so the survivors flatter the whole industry. Counting the dead funds cuts the average return by over a percentage point a year.",
        },
        provenance: {
          source:
            "Elton EJ, Gruber MJ, Blake CR. Survivorship bias and mutual fund performance. Rev Financ Stud. 1996;9(4):1097-1120. (Survivor bias overstates performance by ≈1.4% per year.)",
          year: 1996,
          doi: "10.1093/rfs/9.4.1097",
          url: "https://academic.oup.com/rfs/article/9/4/1097/1580100",
        },
      },
    ],
  },

  share: {
    title: { en: "Survivorship bias, a reasoning trap." },
    explainer: {
      en: "It's easy to study the winners, the survivors, the successes, the things still standing, and copy what they have in common. But the failures are invisible: they dropped out of the data. Whatever helped the survivors survive looks far more powerful than it is, because you never see everyone it didn't save. Before copying the winners, ask who's missing.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Wald A. A Method of Estimating Plane Vulnerability Based on Damage of Survivors. Statistical Research Group, Columbia University, 1943 (reprinted by the Center for Naval Analyses, 1980). The “armour the clean spots” story popularises Wald's actual statistical method.",
    year: 1943,
    url: "https://apps.dtic.mil/sti/citations/ADA091073",
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Survivorship_bias",
};
