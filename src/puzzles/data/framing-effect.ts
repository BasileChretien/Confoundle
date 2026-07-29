import type { Puzzle } from "../schema";

/**
 * The framing effect, on the experiment that named it, and the deck's first
 * lesson about how a claim is WORDED rather than how it was measured.
 *
 * Tversky and Kahneman put one decision to two groups of students. The cover
 * story was identical, an outbreak expected to kill 600 people, and so were the
 * outcomes: of 600, saving 200 IS 400 dying. Only the wording changed.
 *
 * Read from the paper itself (Science 1981;211:453-458, p. 453):
 *
 *   Problem 1 [N = 152]  "200 people will be saved"            [72 percent]
 *                        one third chance all 600 saved        [28 percent]
 *   Problem 2 [N = 155]  "400 people will die"                 [22 percent]
 *                        one third chance nobody dies          [78 percent]
 *
 * The authors state outright that "the two problems are effectively identical"
 * and that the only difference is lives saved against lives lost. They also
 * record having seen the reversal "in several groups of respondents, including
 * university faculty and physicians", which is why this is not a curiosity
 * about undergraduates.
 *
 * AUTHORED AS PERCENTAGES, deliberately, against this project's usual rule. The
 * paper prints shares and N and never numerators: 72 per cent of 152 is 109.44,
 * so no integer exists to author, and rounding to a plausible count would be
 * inventing data. The figure says so on its face.
 */
export const framingEffect: Puzzle = {
  schemaVersion: 1,
  id: "framing-effect-tversky-1981",
  slug: "same-choice-other-words",
  category: "statistical-reasoning",
  reasoningSkill: "framing-effect",
  difficulty: "medium",
  tags: ["everyday", "clinical", "psychology", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Asked to choose a plan against an outbreak, most people took the certain option. A sensible, cautious public?",
    },
    framing: {
      en: "An unusual disease is expected to kill 600 people. Two programmes are proposed, and the exact consequences of each are given. People were asked which they would favour.",
    },
    question: { en: "What does this tell you about what people want?" },
    data: {
      type: "framing",
      label: { en: "Which programme people favoured" },
      stakeLabel: {
        en: "An outbreak expected to kill 600 people, with the consequences of each programme stated exactly.",
      },
      sureLabel: { en: "The majority took the certain option" },
      gambleLabel: { en: "The majority took the gamble" },
      percentNote: {
        en: "Shares as the paper printed them. It reports percentages and the number asked, never the raw counts.",
      },
      frames: [
        {
          id: "saved",
          label: { en: "Outcomes described as lives saved" },
          short: { en: "Lives saved" },
          sureText: { en: "200 people will be saved" },
          gambleText: {
            en: "A one in three chance that all 600 are saved, and two in three that nobody is",
          },
          surePercent: 72,
          gamblePercent: 28,
          n: 152,
        },
        {
          id: "died",
          label: { en: "Outcomes described as lives lost" },
          short: { en: "Lives lost" },
          sureText: { en: "400 people will die" },
          gambleText: {
            en: "A one in three chance that nobody dies, and two in three that all 600 do",
          },
          surePercent: 22,
          gamblePercent: 78,
          n: 155,
        },
      ],
    },
    initialView: { kind: "onewording" },
  },

  choices: [
    {
      id: "cautious",
      label: { en: "People prefer certainty" },
      sublabel: { en: "a settled preference, nearly three to one" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "innumerate",
      label: { en: "They cannot do the arithmetic" },
      sublabel: { en: "the odds were beyond them" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "wording",
      label: { en: "It depends how it was worded" },
      sublabel: { en: "ask again in other words and it moves" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, wrong here: you are told the exact consequences were given,
      // so the setup is not withholding anything you would need.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "The same choice, reworded, and the majority swaps sides." },
    mechanismLabel: { en: "One decision, two wordings" },
    mechanismName: { en: "Saved and lost are the same thing" },
    explanation: {
      en: "Of 600 people, saving 200 is the same as 400 dying. Nothing about the outcomes changed between these two versions, only whether they were counted in lives saved or lives lost. Put as saving, 72 per cent took the certain option; put as dying, 22 per cent did. The authors call the two problems effectively identical.",
    },
    body: {
      en: "So there was no settled public preference to discover. A gain that is described as a gain invites caution, because a sure win feels worth keeping; the identical outcome described as a loss invites a gamble, because a sure loss feels worth escaping. The researchers saw the same reversal in university faculty and in physicians, so this is not a failure of arithmetic by people unused to numbers. It is what the question does to the answer.",
    },
    view: { kind: "bothwordings" },
  },

  lesson: {
    skillName: { en: "The framing effect" },
    takeaway: {
      en: "How a choice is worded changes which option people take, even when the outcomes are identical. A survey, a label or a headline that reports what people prefer is partly reporting how they were asked, so the wording is part of the finding and belongs in the report.",
    },
    body: {
      en: "The practical test is to restate the same fact the other way round and see whether you still feel the same. Ninety per cent survival and ten per cent mortality are one number; a treatment that saves nine in ten and one that kills one in ten are one treatment. If your preference moves, it was following the wording rather than the outcome, and that is worth knowing before you decide.",
    },
    howItWorks: {
      en: "People do not judge outcomes from a blank slate. They judge them as gains or losses against whatever the question treats as normal, and losses weigh heavier than equivalent gains. Describe the outcome as lives saved and the reference point becomes everybody dying, so 200 saved is a gain worth locking in, and gambling with it feels reckless. Describe the identical outcome as 400 dying and the reference point becomes everybody living, so those deaths are a loss, and a chance of avoiding them entirely feels worth taking. Nothing about the world moved; the question moved the baseline people measured from. This is why the framing is not a presentational detail that a careful reader can ignore. Whoever chooses the wording chooses the baseline, and the baseline does much of the deciding, which is exactly why advertising, campaigning and even consent conversations are fought over adjectives.",
    },
    examples: [
      {
        title: { en: "The same trick, thirty years on and in the clinic" },
        summary: {
          en: "Doctors, patients and students were told about lung cancer treatments described either by survival rates or by the mortality rates that say the identical thing. Surgery looked far more attractive when its outcomes were given as survival. The effect held among the physicians, so training in the numbers was not protection against the wording.",
        },
        provenance: {
          source:
            "McNeil BJ, Pauker SG, Sox HC Jr, Tversky A. On the elicitation of preferences for alternative therapies. New England Journal of Medicine 1982;306(21):1259-1262",
          year: 1982,
          doi: "10.1056/NEJM198205273062103",
          url: "https://doi.org/10.1056/NEJM198205273062103",
        },
      },
    ],
  },

  share: {
    title: { en: "The framing effect, a reasoning trap." },
    explainer: {
      en: "Ask people to choose between the same two outcomes twice, once worded as lives saved and once as lives lost, and the majority swaps sides. Nothing about the outcomes changes, only the words. Whoever writes the question is quietly choosing the answer, which is why it is worth restating any claim the other way round before you decide what you think.",
    },
    captions: {
      competitive: { en: "Same choice, other words. Watch the majority swap sides." },
      selfDeprecating: { en: "I had a firm opinion. It was about the wording." },
    },
  },

  provenance: {
    source:
      "Tversky A, Kahneman D. The framing of decisions and the psychology of choice. Science 1981;211(4481):453-458, problems 1 and 2 (p. 453)",
    year: 1981,
    doi: "10.1126/science.7455683",
    url: "https://doi.org/10.1126/science.7455683",
    note: {
      en: "Read from the paper itself. Problem 1, put to 152 people, offered 200 saved for certain against a one in three chance of saving all 600: 72 per cent took the certain option and 28 per cent the gamble. Problem 2, put to 155 people, reworded the identical outcomes as 400 dying against a one in three chance that nobody dies: 22 per cent took the certain option and 78 per cent the gamble. The authors write that the two problems are effectively identical and that the only difference is whether outcomes are given as lives saved or lives lost, and they report having seen the reversal in several groups including university faculty and physicians. One honesty note that shapes the figure. The paper prints percentages and the number asked, never the raw counts, and 72 per cent of 152 is not a whole number, so no integer numerator exists. The shares here are therefore the published ones rather than counts, and the chart says so, because rounding to a plausible count would have invented data the source never reported.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Framing_effect_(psychology)",
};
