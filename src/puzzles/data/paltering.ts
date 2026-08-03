import type { Puzzle } from "../schema";

/**
 * Puzzle #45, paltering, via Rogers, Zeckhauser, Gino, Norton and Schweitzer
 * (2017). NO NEW SHAPE: `rates` with one stratum, holding the paltering arm
 * back at the setup through `initialView.groupIds`.
 *
 * WHY THE IMPASSE RATE AND NOT THE PROFIT. The paper's profit comparisons are
 * means with t-tests, which this deck cannot author as counts. The impasse rate
 * is a headcount of negotiations that ended without a deal, and it carries the
 * lesson better anyway: the cost of paltering is not that you earn less on the
 * deals you close, it is that the deal falls over.
 *
 * The commit beat asks a direction, not a size, and only one band says the
 * paltering arm broke down more. The framing supplies what the reasoner needs:
 * that the seller asked directly, and that the buyer's answers were true.
 */
export const paltering: Puzzle = {
  schemaVersion: 1,
  id: "every-word-was-true",
  slug: "every-word-was-true",
  category: "causal-reasoning",
  reasoningSkill: "paltering",
  difficulty: "medium",
  tags: ["everyday", "business", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Told to be straight with the seller, buyers closed 50 deals out of 51.",
    },
    framing: {
      en: "98 pairs of people negotiated the sale of a property over an eight minute chat, one as buyer and one as seller. The buyers knew something the sellers minded about: the land was expected to be rezoned for commercial development, which the sellers did not want. Sellers were free to ask about it, and most did. Half the buyers were told to answer honestly. The other half were told to palter, which means to answer with statements that are true, but chosen so the seller draws the wrong conclusion. Nobody in the paltering group was asked to say anything false, and almost none of them did: 38 of the 47 paltered as instructed and not one told an outright lie. The bar below is the honest group.",
    },
    question: {
      en: "In the paltering group, how often did the negotiation end with no deal at all?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Negotiations that ended with no agreement" },
      // Nothing is crowned. An impasse is a failure for both sides rather than
      // a scoreline, and the puzzle is not handing out a prize for honesty.
      higherIsBetter: false,
      crownWinner: false,
      groups: [
        {
          id: "honest",
          label: { en: "Buyer told to answer honestly" },
          short: { en: "Honest" },
        },
        {
          id: "palter",
          label: { en: "Buyer told to palter" },
          short: { en: "Paltering" },
        },
      ],
      strata: [{ id: "all", label: { en: "All negotiating pairs" } }],
      observations: [
        { groupId: "honest", stratumId: "all", numerator: 1, denominator: 51 },
        { groupId: "palter", stratumId: "all", numerator: 7, denominator: 47 },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["honest"],
      caption: { en: "When the buyer answered straight" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About as often. Nothing false was said" },
      sublabel: { en: "there was nothing to catch" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "fewer",
      label: { en: "Less often. A palterer keeps the other side comfortable" },
      sublabel: { en: "no awkward admissions" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "more",
      label: { en: "Far more often" },
      sublabel: { en: "the deals fell apart" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Wrong here. The framing says the seller asked directly and that the
      // buyer's answers were chosen to mislead, which is enough to reason about
      // what happens when the seller works out what has been done to them.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "7 of 47 collapsed, against 1 of 51. Seven times the rate." },
    mechanismLabel: { en: "Both groups" },
    mechanismName: { en: "True statements still read as deception once seen" },
    explanation: {
      en: "The honest group failed to reach agreement once in 51 negotiations. The paltering group failed 7 times in 47. Every one of those paltering buyers had answered with true statements, and none of them lied. The sellers could not have caught anybody out in a falsehood, because there was no falsehood to catch. What they caught was the shape of the answer: a reply that is technically responsive and somehow never lands on the question. That is enough to end a negotiation.",
    },
    body: {
      en: "The paper's other half is about the palterers themselves, and it is the part worth taking personally. Asked afterwards, buyers rated their own paltering as only somewhat dishonest, while the sellers on the receiving end rated those same buyers' integrity far lower. Palterers were working from a mental model in which this counts as nearly honest, and their counterparts were not. That gap is why the technique keeps getting used: it feels defensible from the inside, and it does not look defensible from the outside at all.",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "Paltering" },
    takeaway: {
      en: "A string of true statements can be built to leave a false impression. Nothing in it can be fact-checked, and it is still detected, and it still costs.",
    },
    body: {
      en: "Paltering sits between the two kinds of dishonesty everyone already names. It is not a lie, because every sentence is true, and it is not an omission, because the palterer is answering rather than staying quiet. That is exactly what makes it attractive: it survives a fact-check, it survives a transcript, and it can be defended afterwards word by word. It is the standard technique of anybody who has to answer a question they do not want to answer while remaining, in the narrow sense, truthful.",
    },
    howItWorks: {
      en: "The defence is to stop grading answers for truth and start grading them for responsiveness. Ask what you actually wanted to know, then ask whether what you got would look different if the answer were the one you feared. If a firm asked whether their product has ever failed safety testing replies that it meets every current standard, both things can be true at once, and only one of them was the question. So the move is to say the question again. Not louder, and not as an accusation: just the same question, narrowed, until the reply either answers it or visibly refuses to. A palter cannot survive being asked twice, because the second answer has to either contradict the first or finally land. And notice the finding about how this looks from the inside, because you will palter too: the people doing it in this study thought it was nearly honest, and everyone on the other side of the table disagreed.",
    },
    examples: [
      {
        title: { en: "Half of the people told to be honest were not" },
        summary: {
          en: "The same table that records the paltering group shows what happened to buyers explicitly instructed to answer honestly. Only 26 of 51 did. Ten paltered anyway, three told an outright lie, and eight simply were not asked. That is 49 per cent of people, told in writing to be straight, doing something else the moment there was money in it. The authors read it as evidence that paltering feels close enough to honesty that an instruction to be honest does not rule it out.",
        },
        provenance: {
          source:
            "Rogers T, Zeckhauser R, Gino F, Norton MI, Schweitzer ME. Artful paltering: the risks and rewards of using truthful statements to mislead others. Journal of Personality and Social Psychology. 2017;112(3):456-473. Table 4, Study 4B.",
          year: 2017,
          doi: "10.1037/pspi0000081",
          url: "https://doi.org/10.1037/pspi0000081",
        },
      },
    ],
  },

  share: {
    title: { en: "Paltering, a reasoning trap." },
    explainer: {
      en: "Not every deception contains a false statement. A palter is a true answer picked so you draw the wrong conclusion, which means it survives any fact-check and can be defended line by line afterwards. Grade answers for whether they addressed the question, not for whether they were true, and ask the question a second time.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Rogers T, Zeckhauser R, Gino F, Norton MI, Schweitzer ME. Artful paltering: the risks and rewards of using truthful statements to mislead others. Journal of Personality and Social Psychology. 2017;112(3):456-473. Study 4B: Table 4 on page 469 for behaviour by condition, Table 5 on the same page for impasses, both read from the rendered page. The impasse counts are the sums of Table 5's two actual-response rows, 6 plus 1 for the paltering group and 0 plus 1 for the honest group.",
    year: 2017,
    doi: "10.1037/pspi0000081",
    url: "https://doi.org/10.1037/pspi0000081",
    note: {
      en: "This paper prints its counts, so nothing here is reconstructed, and the two tables check each other in a way worth recording. Table 4's cells for people who actually paltered, 38 in one condition and 10 in the other, sum to the 48 eligible dyads Table 5 reports; its cells for people who were actually honest, 2 and 26, sum to Table 5's 28. The impasse rates derived here, 7 of 47 and 1 of 51, recover the 15 and 2 per cent printed in the text and reproduce the published chi-square of 5.46 to the second decimal, which nothing was fitted to. One discrepancy is left standing rather than smoothed: Table 4's honest condition lists 10, 26, 3, 8 and 3, which is 50, while Table 5 gives 51 dyads in that condition. Every one of those five percentages recovers correctly against 51 and the printed 49 per cent for non-honest behaviour also needs 51, so the total is right and one participant is unaccounted for in the breakdown. The paper does not explain it and neither will this. Note also that the text is extracted from the tables incorrectly by machine, pairing percentages with the wrong counts, which is why both tables were read visually. Finally, this is an online negotiation among paid participants over eight minutes, not a real sale, and the deck claims only what the study measured.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Paltering",
};
