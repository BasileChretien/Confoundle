import type { Puzzle } from "../schema";

/**
 * Puzzle #48, confirmation bias, via Griggs and Cox (1982), Experiment 3.
 *
 * NO NEW SHAPE. `rates` with one stratum, holding the second condition back
 * through `initialView.groupIds`.
 *
 * WHY THIS PAPER AND NOT WASON. `docs/lesson-backlog.md` entry 10 records the
 * deck reading Wason 1968 at source and finding it is a study of therapies for
 * the bias, not a measurement of it, with a null result on about seventeen
 * people per arm. The famous "fewer than one in ten" figure is not in it. This
 * paper prints the baseline as a measured count, 0 of 40, and pairs it with the
 * same rule in a familiar setting, 29 of 40, in the same forty people.
 *
 * THE COMMIT BEAT ASKS A DIRECTION, NOT A SIZE. Bands reading "a bit better"
 * and "much better" would both point the way the skill licenses, which is the
 * failure `docs/hedge-audit.md` exists to catch, so there is one improvement
 * band, one saying the story gets in the way, one saying nothing changes, and
 * the hedge. The magnitude lands at the reveal instead.
 */
export const confirmationBias: Puzzle = {
  schemaVersion: 1,
  id: "four-cards",
  slug: "four-cards",
  category: "statistical-reasoning",
  reasoningSkill: "confirmation-bias",
  difficulty: "medium",
  tags: ["everyday", "psychology", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Forty students were shown four cards. Not one of them got it right.",
    },
    framing: {
      en: "Four cards lie on a table. Each has a letter on one side and a number on the other. The faces you can see read D, K, 3 and 7. Here is the claim to test: if a card has a D on one side, then it has a 3 on the other. Your job is to name only the cards you must turn over to find out whether that claim is false. Turning a card you did not need is a mistake, and so is leaving one unturned. The correct answer is D and 7, because only a D with something other than a 3 behind it can break the claim, and only those two cards can show you that. The bar below is how many of the forty found it.",
    },
    question: {
      en: "The same forty people were then given the same logic as a bar checking ages: if someone is drinking beer, they must be over 19. Same four cards, one showing a drink and one showing an age. How did they do?",
    },
    data: {
      type: "rates",
      metricLabel: {
        en: "Turned exactly the two cards that could break the rule",
      },
      higherIsBetter: true,
      // Nothing is crowned. The two bars are the same forty people, so a
      // winner marker would suggest one group beat another.
      crownWinner: false,
      groups: [
        {
          id: "abstract",
          label: { en: "Letters and numbers on the cards" },
          short: { en: "Letters" },
        },
        {
          id: "thematic",
          label: { en: "Drinks and ages on the cards" },
          short: { en: "Drinks" },
        },
      ],
      strata: [{ id: "all", label: { en: "All forty, who did both" } }],
      observations: [
        {
          groupId: "abstract",
          stratumId: "all",
          numerator: 0,
          denominator: 40,
        },
        {
          groupId: "thematic",
          stratumId: "all",
          numerator: 29,
          denominator: 40,
        },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["abstract"],
      caption: { en: "The version with letters and numbers" },
    },
  },

  choices: [
    {
      id: "same",
      label: {
        en: "About the same. It is the same rule, only the words changed",
      },
      sublabel: { en: "logic does not care what it is about" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "worse",
      label: { en: "Worse. The story adds detail that gets in the way" },
      sublabel: { en: "more to hold in mind" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "better",
      label: { en: "Much better" },
      sublabel: { en: "suddenly it is obvious" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Wrong here. The framing states the two problems are the same rule and
      // the same forty people, and the skill is a claim about what makes a
      // falsifying case come to mind. That licenses a direction.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "0 of 40 with letters. 29 of 40 with drinks." },
    mechanismLabel: { en: "Both versions" },
    mechanismName: {
      en: "You look for the case that would confirm, not the one that could break it",
    },
    explanation: {
      en: "Nothing about the logic changed. If a card has a D then a 3, and if someone drinks beer then they are over 19, are the same rule, and the cards that can break it sit in the same two positions. Asked about letters, not one person in forty found them. Asked to check a bar, twenty-nine did, and the paper notes it made no difference whether they met that version first or second.",
    },
    body: {
      en: "The interesting number is not the 29. It is what people turned instead on the letters version: 29 of the 40 turned the 3, the card that can only agree with the claim. Finding a D behind it proves nothing, because the claim never said 3s must have Ds. Only 14 turned the 7, the card that could have broken it. That is confirmation bias with the padding stripped off. It is not that people believe what they want; it is that when you go looking for evidence, the case that would agree is the one that comes to mind, and the case that could break it does not. Worse, solving the bar version first did not help at all: the paper checked, and there was no transfer to the letters at all.",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "Confirmation bias" },
    takeaway: {
      en: "Testing a claim means looking for what would break it. Left alone, you will look for what would fit it, and feel like you checked.",
    },
    body: {
      en: "Most descriptions of this bias make it about motive: you believe what suits you. The card task shows something narrower and more awkward, because nobody has a stake in whether Ds have 3s. Presented with a rule, people reach for the instance that would agree with it. That instance cannot tell you anything, since a rule that is false also has agreeing cases. The one that carries information is the case that would break the rule, and it simply does not come to mind unless something in the setting makes it vivid, the way a teenager with a beer does.",
    },
    howItWorks: {
      en: "The move is to name the thing that would prove you wrong before you go looking, and to go looking for that. In practice: write down what you would expect to see if the claim were false, then check whether you have seen it, rather than counting the cases that fit. A claim that a treatment works is tested by the patients who took it and did not improve, not by the ones who did. A claim that somebody is unreliable is tested by the times they came through. If you cannot say what evidence would change your mind, you are not testing anything, you are collecting. And notice the transfer result before you feel clever about the bar version: those forty people solved it and then, minutes later, still could not do the letters. Understanding the trick in one setting does not carry it to the next, which is the whole reason this deck asks you to practise rather than to read.",
    },
    examples: [
      {
        title: { en: "Why familiar wording helps, and when it does not" },
        summary: {
          en: "The same paper is mostly a record of failure, which is why it is called elusive. Experiments 1 and 2 tried to reproduce the two famous demonstrations that a realistic story makes the task easy, and neither worked: in Experiment 1 the realistic version was solved by 2 of 16 and 1 of 16 against 0 of 16 for the abstract, no significant difference. The authors' explanation for why the drinking-age version did work is that it was a rule their students had actually lived with, so the case that breaks it was already in memory. Familiar wording is not enough on its own; the rule has to be one you have had reason to police.",
        },
        provenance: {
          source:
            "Griggs RA, Cox JR. The elusive thematic-materials effect in Wason's selection task. British Journal of Psychology. 1982;73(3):407-420. Experiments 1 and 3.",
          year: 1982,
          doi: "10.1111/j.2044-8295.1982.tb01823.x",
          url: "https://doi.org/10.1111/j.2044-8295.1982.tb01823.x",
        },
      },
    ],
  },

  share: {
    title: { en: "Confirmation bias, a reasoning trap." },
    explainer: {
      en: "Given a rule to test, people reach for the case that would agree with it, which can never tell them anything, and miss the case that could break it. Not one of forty students found the breaking case with letters on the cards. Twenty-nine of the same forty found it when the cards showed drinks and ages. Before you check a claim, name what would prove it wrong and go looking for that instead.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Griggs RA, Cox JR. The elusive thematic-materials effect in Wason's selection task. British Journal of Psychology. 1982;73(3):407-420. Experiment 3: 40 University of Florida undergraduates, each doing both problems with the order counterbalanced, 20 seeing each problem first. Table 5 on page 416, read from the rendered page: the correct combination was chosen 14 of 20 and 15 of 20 on the drinking-age problem and 0 of 20 on the abstract problem in both orders. Experiment 1 counts from Table 1 on page 411.",
    year: 1982,
    doi: "10.1111/j.2044-8295.1982.tb01823.x",
    url: "https://doi.org/10.1111/j.2044-8295.1982.tb01823.x",
    note: {
      en: "The counts are printed and the reading checks out four ways. Every one of Table 5's four columns sums to 20, which is the group size stated in the method. The 29 of 40 recovers the seventy-three per cent the text gives. And both published chi-square statistics reproduce exactly, 18.6 for the first trial and 20.9 for the second, once the continuity correction is applied, which nothing here was fitted to. Table 6 supplies the mechanism separately: on the abstract problem 29 of 40 turned the card that could only agree with the rule and 14 turned the one that could break it. Two things worth stating. This puzzle does not use the famous claim that fewer than one person in ten solves the abstract task; the paper cites that to a review rather than measuring it, and backlog entry 10 records the deck reading Wason 1968 and finding the figure is not there either. And the effect shown here is narrower than the popular version: the same paper failed twice to reproduce it with other realistic stories, which is why its title calls it elusive, and that failure is reported in the deep dive rather than left out.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Wason_selection_task",
};
