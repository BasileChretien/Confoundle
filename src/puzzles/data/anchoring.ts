import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #28, anchoring, on Tversky and Kahneman (1974), p. 1128.
 *
 * Two groups of high school students had five seconds to estimate a product
 * written on a blackboard. One saw it ascending, the other descending. Same
 * eight numbers, same product, reversed order.
 *
 *   1 x 2 x 3 x 4 x 5 x 6 x 7 x 8   median estimate    512
 *   8 x 7 x 6 x 5 x 4 x 3 x 2 x 1   median estimate  2,250
 *   the answer                                      40,320
 *
 * WHY THIS DEMONSTRATION AND NOT THE FAMOUS ONE. The same page carries the
 * wheel-of-fortune study, where median estimates of the percentage of African
 * countries in the UN were 25 and 45 from starting points of 10 and 65. It is
 * the more quoted result and it is the weaker puzzle, because its right answer
 * is a moving historical fact that cannot be scored. Here the right answer is 8
 * factorial, which is checkable forever, and a test asserts it.
 *
 * WHY THIS LESSON AND NOT "THE OVERTON WINDOW". The Overton window was asked
 * for by name and is a political-theory metaphor with thin empirical grounding
 * of its own. Anchoring is the thing that has been measured. Naming the
 * mechanism rather than the political label is the call this deck keeps making,
 * and it keeps the evidence non-partisan while the applications are not.
 *
 * THE REVEAL LANDS TWICE, which is why the shape exists. First the order
 * effect: 2,250 against 512 is 4.4 times, from nothing but the direction of
 * reading. Then the scale: both guesses are 1.3 and 5.6 per cent of the truth,
 * so once 40,320 joins the axis they collapse together into slivers. No shape
 * in the deck could hold an estimate against a known answer, which is what
 * `estimation` is for.
 *
 * WHY THE HEDGE IS WRONG. The setup gives the mechanism rather than the answer:
 * five seconds is not enough to multiply eight numbers, so people get a few
 * steps in and extrapolate. From that, plus seeing that one sequence opens
 * 1 x 2 and the other 8 x 7, the direction follows. Higher is deducible; how
 * MUCH higher, and that both groups were nowhere near, is what the reveal adds.
 *
 * WHAT THIS MUST NOT CLAIM. The paper prints no sample sizes, no spread around
 * either median and no test statistic for this demonstration. So the figure
 * draws two medians and a true value and nothing else, the note says so, and a
 * test stops any future edit from adding a precision the source never had. It
 * is also a 1974 result on school students under time pressure, which is why
 * the deep dive carries a modern meta-analysis rather than leaving 1974 to hold
 * the whole claim alone.
 */
export const anchoring: Puzzle = {
  schemaVersion: 1,
  id: "anchoring-tversky-kahneman-1974",
  slug: "same-sum-backwards",
  category: "statistical-reasoning",
  reasoningSkill: "anchoring",
  difficulty: "medium",
  tags: ["everyday", "psychology", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Five seconds to estimate 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8. This group's typical answer was 512.",
    },
    framing: {
      en: "High school students were shown a multiplication on a blackboard and given five seconds to estimate the answer. Five seconds is nowhere near enough to actually multiply eight numbers, so what people do is work through the first two or three steps and then guess upward from where they have got to. The typical answer from this group was 512. A second group of students, given the same five seconds, saw the identical eight numbers written in the opposite order: 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1.",
    },
    question: {
      en: "The second group was estimating exactly the same product. What was their typical answer?",
    },
    data: {
      type: "estimation",
      label: { en: "Estimating the same product, written two ways" },
      trueValue: 40320,
      trueLabel: { en: "The actual product" },
      statNote: {
        en: "These are the median estimates the source printed. It gives no group sizes, no spread around either median and no test statistic for this demonstration, so nothing else is drawn here.",
      },
      groups: [
        {
          id: "ascending",
          label: { en: "Shown the numbers ascending" },
          short: { en: "Ascending" },
          promptText: { en: "1 x 2 x 3 x 4 x 5 x 6 x 7 x 8" },
          estimate: 512,
        },
        {
          id: "descending",
          label: { en: "Shown the numbers descending" },
          short: { en: "Descending" },
          promptText: { en: "8 x 7 x 6 x 5 x 4 x 3 x 2 x 1" },
          estimate: 2250,
        },
      ],
    },
    initialView: {
      kind: "oneguess",
      groupIds: ["ascending"],
      caption: { en: "The ascending group only" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About the same, since it is the same product" },
      sublabel: { en: "the order cannot matter" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "lower",
      label: { en: "Lower, because starting at 8 is intimidating" },
      sublabel: { en: "big numbers make people cautious" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "higher",
      label: { en: "Higher, and by a lot" },
      sublabel: { en: "look at where each one starts" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here: the framing gives the
      // mechanism, and the two opening pairs give the direction.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "2,250. The same eight numbers, backwards, and the typical guess more than quadrupled.",
    },
    mechanismLabel: { en: "What five seconds actually buys" },
    mechanismName: {
      en: "You anchor on the first few steps and adjust far too little from there",
    },
    explanation: {
      en: "Nobody multiplied anything. In five seconds you get through 1 x 2 x 3, which is 6, or through 8 x 7 x 6, which is 336, and then you scale up from whatever number you are holding. That starting point is the anchor, the adjustment upward is never anywhere near enough, and the order of the digits is the only thing that differed. Now put the real answer on the same axis:",
    },
    body: {
      en: "The second thing the chart does is more sobering than the first. The two groups look far apart from each other, 512 against 2,250, but against 40,320 they are both rounding errors: 1.3 and 5.6 per cent of the answer. Even the group that guessed higher was out by a factor of eighteen. So the anchor did not just tilt the estimate, it set the entire scale of the answer, and the adjustment afterwards never had a chance of escaping it.",
    },
    view: {
      kind: "withtruth",
      caption: { en: "Both guesses, and the answer" },
    },
  },

  lesson: {
    skillName: { en: "Anchoring" },
    takeaway: {
      en: "The first number in the room sets the scale for every number that follows it, including numbers that have nothing to do with it. Adjustment away from an anchor is almost always too small.",
    },
    body: {
      en: "The uncomfortable part is that the anchor does not have to be relevant, or credible, or even offered in good faith. In the same paper, an anchor generated by spinning a wheel of fortune in front of the participants, who could see it was random, still moved their estimates: median guesses of the percentage of African countries in the United Nations were 25 and 45 for groups that had watched the wheel land on 10 and 65. The authors add that paying people for accuracy did not reduce the effect.",
    },
    howItWorks: {
      en: "Anchoring works because estimating is expensive and comparing is cheap. Faced with a quantity you do not know, the mind does not build an answer from nothing; it grabs whatever number is nearby and asks whether the true value is bigger or smaller than that. This is a sensible strategy when the nearby number is informative. The trouble is that the grabbing happens whether or not it is informative, and the adjustment that follows is throttled by the effort it takes: you move away from the anchor until the answer stops feeling obviously wrong, and stopping there is almost always stopping too early. Three consequences are worth carrying around. First, whoever speaks first in a negotiation is not merely stating a position, they are setting the scale on which every later number will be judged, which is why an opening offer that seems absurd is often working exactly as intended. Second, an anchor does not need to be a number: the first proposal, the first draft, the first estimate anyone says out loud in a meeting does the same job to everything said afterwards. Third, and this is what the political version of the idea trades on, repeatedly voicing a position far outside what is currently normal shifts where the middle appears to be, without a single argument being made for it. The defences are unglamorous and they work. Make your own estimate before you hear anyone else's, and write it down, because an unstated estimate quietly rewrites itself. Ask what the answer would be if the anchor were doubled or halved, which is a way of testing whether you are reasoning or just decorating a number you were handed. And when you catch yourself adjusting from a figure, adjust further than feels right, because the pull is always toward stopping too soon.",
    },
    examples: [
      {
        title: { en: "It holds up, and it is not confined to students in a hurry" },
        summary: {
          en: "The effect has been examined many times since 1974 across very different tasks and populations, and a meta-analysis pooling that literature found it robust, with a large average effect size. That matters here because the blackboard demonstration on its own is a single result from 1974 on school students under time pressure, with no sample sizes or spread printed. The general phenomenon does not rest on it. What the blackboard version supplies that most later studies do not is a case where the right answer is exactly knowable, so the size of the error can be seen rather than inferred.",
        },
        provenance: {
          source:
            "Bahnik S, Englich B, Strack F. Anchoring effect. In: Pohl RF, ed. Cognitive Illusions: Intriguing Phenomena in Thinking, Judgment and Memory. 2nd ed. London: Routledge; 2017:223-241. A review of the anchoring literature and its replications since Tversky and Kahneman.",
          year: 2017,
          doi: "10.4324/9781315696935",
          url: "https://www.routledge.com/Cognitive-Illusions-Intriguing-Phenomena-in-Thinking-Judgment-and-Memory/Pohl/p/book/9781138903418",
        },
      },
    ],
  },

  share: {
    title: { en: "Anchoring, a reasoning trap." },
    explainer: {
      en: "Two groups of students got five seconds to estimate a product on a blackboard. One saw 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8 and typically guessed 512. The other saw the identical eight numbers written backwards, 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1, and typically guessed 2,250. Same numbers, same answer, more than four times the guess. And both were nowhere close: the real answer is 40,320. Nobody had time to multiply, so everyone anchored on the first few steps and adjusted up far too little. Whoever says a number first is not stating a position, they are setting the scale. Make your own estimate before you hear theirs.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Tversky A, Kahneman D. Judgment under uncertainty: heuristics and biases. Science. 1974;185(4157):1124-1131, section 'Adjustment and Anchoring', p. 1128. Two groups of high school students estimated, within 5 seconds, a product written on a blackboard: the median estimate for the ascending sequence 1x2x3x4x5x6x7x8 was 512 and for the descending sequence 8x7x6x5x4x3x2x1 was 2,250, against a correct answer of 40,320.",
    year: 1974,
    doi: "10.1126/science.185.4157.1124",
    url: "https://www.science.org/doi/10.1126/science.185.4157.1124",
    note: {
      en: "Three limits, stated because the figure would otherwise imply more than the source contains. The paper prints no group sizes, no spread around either median and no test statistic for this demonstration, so the chart draws two medians and the true value and nothing else. The participants were high school students working under a five-second deadline, which is a deliberately extreme version of the ordinary condition of estimating without time to compute, so the size of the error here should not be read as typical of unhurried judgement. And it is a single 1974 result, which is why the deep-dive example points at the later replication literature rather than leaving this one demonstration to carry the general claim. What this version has that better-powered later studies mostly lack is an exactly knowable right answer: 8 factorial is 40,320, so the shortfall can be measured rather than estimated. The same page carries the better-known wheel-of-fortune demonstration, quoted in the lesson, whose target quantity is a historical fact that has since changed, which is why it is not what the puzzle is scored on.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Anchoring_effect",
};
