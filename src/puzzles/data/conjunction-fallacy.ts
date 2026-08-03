import type { Puzzle } from "../schema";

/**
 * Puzzle #38, the conjunction fallacy, on Charness, Karni and Levin (2010).
 * Backlog entry 9. The deck had nothing on probability composition, which is
 * the single most quoted result in the whole judgment literature.
 *
 * THE SOURCE IS THE REPLICATION, NOT THE ORIGINAL, AND THAT IS DELIBERATE.
 * Tversky and Kahneman (1983) is paywalled with no open-access copy anywhere
 * that OpenAlex can find, so this project could not read it. But the
 * replication turned out to be the better puzzle anyway. The plain Linda
 * problem teaches that people are bad at probability. This version teaches
 * that and then asks what the famous rate actually measures, because paying a
 * little or letting people talk to two others moves it a very long way. Same
 * move as the Hawthorne puzzle: the effect is real and the study it is named
 * after is not the evidence people think it is.
 *
 * READ FROM TABLE 1 OF THE PDF, VISUALLY. `pdftotext -layout` shifts the study
 * column against the row descriptions in this table, exactly the failure that
 * nearly put a wrong number into the availability puzzle, so the page was
 * rendered and read rather than parsed:
 *
 *                     no incentive        $4 for a correct answer
 *   alone             50/86  (58.1%)      31/94 (33.0%)
 *   in pairs          27/56  (48.2%)       5/38 (13.2%)
 *   in trios          10/39  (25.6%)       5/48 (10.4%)
 *
 * RECONCILED FIVE WAYS, all asserted in the test file. All six printed
 * percentages reproduce from the counts. Each pair of arms sums to the printed
 * subtotal row (81/180, 32/94, 15/87) in both numerator and denominator. The
 * three denominators sum to exactly 361, which is the participant count the
 * methods section states independently on the previous page. The 58 and 33 per
 * cent quoted in the prose of section 3.2 are the alone row. And the paper's
 * own footnote 11 recomputes truth-wins predictions from these same rates and
 * gets numbers that reproduce here.
 *
 * NO NEW SHAPE. This is `rates` with the incentive condition as the group and
 * the group size as the stratum. `strataAreSeparateSamples` is ON: the three
 * group sizes are separate experimental conditions with arbitrary assignment
 * counts, so a pooled bar would be an artefact of how many people happened to
 * be sent to each arm rather than a quantity about anybody.
 *
 * NOBODY IS BEING MOCKED, INCLUDING TVERSKY AND KAHNEMAN. The authors' own
 * conclusion is that the fallacy matters less for economics than the 1983
 * paper implies, and the lesson says so. It also says the other half: 58 per
 * cent of people alone and unpaid still chose an option that cannot be right,
 * and a third still did with money on the table.
 */
export const conjunctionFallacy: Puzzle = {
  schemaVersion: 1,
  id: "conjunction-fallacy-2010",
  slug: "two-things-at-once",
  category: "statistical-reasoning",
  reasoningSkill: "conjunction-fallacy",
  difficulty: "medium",
  tags: ["everyday", "psychology", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Most people picked the option that cannot possibly be the more likely one.",
    },
    framing: {
      en: "361 students were handed a short character sketch of a woman who reads as politically engaged, then a list of things she might be today. Two of the entries are the ones that matter: that she is a bank teller, and that she is a bank teller who is also active in the feminist movement. Both were on the same sheet, so nothing was hidden. Every bank teller who is also a feminist is a bank teller, so the second group sits inside the first and cannot be the larger one. Some sheets carried a promise of $4 for the correct answer and some did not. Below is what happened among the people who answered on their own.",
    },
    question: {
      en: "What happened when the same question went to people who could talk it over with two others first?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Chose the option that cannot be more likely" },
      // Errors, so the lower bar is the better one.
      higherIsBetter: false,
      // Not a contest. Crowning the paid bar in the setup would answer the
      // question the puzzle is about to ask.
      crownWinner: false,
      // The three group sizes are separate experimental conditions, and how
      // many people were sent to each was the experimenters' choice, so a
      // pooled bar would measure the assignment and not the people.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "unpaid",
          label: { en: "Nothing offered for a correct answer" },
          short: { en: "No payment" },
        },
        {
          id: "paid",
          label: { en: "$4 offered for the correct answer" },
          short: { en: "$4 offered" },
        },
      ],
      strata: [
        { id: "alone", label: { en: "Answered on their own" } },
        { id: "pairs", label: { en: "Talked it over in twos" } },
        { id: "trios", label: { en: "Talked it over in threes" } },
      ],
      observations: [
        {
          groupId: "unpaid",
          stratumId: "alone",
          numerator: 50,
          denominator: 86,
        },
        {
          groupId: "paid",
          stratumId: "alone",
          numerator: 31,
          denominator: 94,
        },
        {
          groupId: "unpaid",
          stratumId: "pairs",
          numerator: 27,
          denominator: 56,
        },
        {
          groupId: "paid",
          stratumId: "pairs",
          numerator: 5,
          denominator: 38,
        },
        {
          groupId: "unpaid",
          stratumId: "trios",
          numerator: 10,
          denominator: 39,
        },
        {
          groupId: "paid",
          stratumId: "trios",
          numerator: 5,
          denominator: 48,
        },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["alone"],
      caption: { en: "Answering on their own" },
    },
  },

  choices: [
    {
      id: "no-change",
      label: {
        en: "Very little. It is a thinking error, not an effort problem",
      },
      sublabel: { en: "talking cannot fix how a brain reads a sentence" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      // Deliberately points the other way. This slot used to read "some help,
      // but less than the money did", which shared a direction with the correct
      // answer while the setup gave no way to choose. Reversed rather than
      // deleted: groups talking each other into a confident wrong answer is a
      // real and well documented thing, so a reader who predicts it is
      // reasoning, not guessing.
      id: "worse",
      label: { en: "Worse. Three people talk each other into it" },
      sublabel: { en: "a confident voice carries a whole group" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "beat-the-money",
      label: {
        en: "More than the money did. Unpaid threes beat paid individuals",
      },
      sublabel: { en: "somebody in the group tends to see it" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim from the rest of the deck so it carries no
      // lexical tell. Wrong here: the arms were randomised inside one study of
      // 361 people and the paper prints every count.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Three people talking, unpaid, beat one person paid." },
    mechanismLabel: { en: "Alone, in twos, in threes" },
    mechanismName: {
      en: "A famous error rate is a fact about the setup, not only about people",
    },
    explanation: {
      en: "Alone and unpaid, 50 of 86 got it wrong, 58 per cent. Offering $4 for the correct answer took that to 31 of 94, 33 per cent. But three people allowed to talk it over, with no money offered at all, got it wrong 10 times out of 39, 26 per cent. Talking to two strangers did more than the cash did. Put both together and it falls to 5 of 48, about one in ten.",
    },
    body: {
      en: "Two things in that chart deserve more than a glance. The first is that pairs are not the story. Unpaid twos got it wrong 48 per cent of the time, which is worse than a paid individual managed, so a single partner bought very little. Almost all of the gain arrives with the third person, and the authors flag that as their most surprising result: three heads beat two by more than two beat one. The second is that some of this is arithmetic rather than insight. If a group gets it right whenever any single member would have, then three independent people with a 58 per cent error rate each should land at about 20 per cent by that route alone. The threes came in at 26 per cent, worse than that, which the authors point out themselves. Groups helped, and they helped less than simply putting three heads in a room ought to have.",
    },
    view: {
      kind: "stratified",
      caption: { en: "All three, side by side" },
    },
  },

  lesson: {
    skillName: { en: "The conjunction fallacy" },
    takeaway: {
      en: "Adding a detail to a claim can only make it less likely to be true, never more, because every extra condition throws cases out. When a fuller, more vivid story feels more probable than a sparse one, that feeling is running backwards from the arithmetic.",
    },
    body: {
      en: "The rule has no exceptions and needs no statistics. The people who are both A and B are a subset of the people who are A, so there cannot be more of them. Bank tellers who are feminists are bank tellers. Yet a description that fits the extra clause makes the combination feel right, because the mind is answering a different question: not how many people are like that, but how well this story matches that person. A rich story matches better and contains more conditions at the same time, so resemblance and probability pull in opposite directions and resemblance usually wins. There is a serious competing reading, and it is worth knowing. Camerer argued that some of the effect is about language rather than probability: told that Linda is a bank teller, and separately that she is a bank teller and a feminist, a reader may take the bare version to mean a bank teller and not a feminist, in which case the two are alternatives rather than nested and ranking them is no error at all. The replication used a version where both statements sit on the same sheet, which is the hardest version to explain that way, and 58 per cent still got it wrong. But the reading is live, and the honest summary is that most of the effect is a probability error and some of it may be a reading of English.",
    },
    howItWorks: {
      en: "Three habits, and the first is nearly mechanical. When one option is longer than another, check whether the longer one is a special case of the shorter, because if it is, it is the less likely one and no amount of plausibility changes that. Second, distrust the persuasive power of detail generally, since the same effect drives far more than quiz questions. A forecast that says there will be a recession triggered by an energy shock is less likely than one that just says there will be a recession, and it sounds better researched. A risk assessment that names a specific failure chain sounds more credible than one that says the system may fail, and it describes a narrower and therefore rarer event. Sales pitches, intelligence estimates, business plans and disaster scenarios all get more convincing as they get more specific, which is precisely as they get less probable. Third, and this one comes from the study rather than the fallacy, treat a famous headline rate as a measurement made under particular conditions. This one moved from 58 per cent to 10 depending on whether people were paid and whether they could talk. Before repeating any striking figure about how bad people are at something, it is worth asking what the people in that study were actually doing at the time.",
    },
    examples: [
      {
        title: { en: "One word in the question was worth half the effect" },
        summary: {
          en: "The description of Linda used since 1983 says she is single. The same team ran further sessions with that one word deleted and nothing else changed. Error rates fell sharply across the board: for people answering alone the rate went to 35.8 per cent without payment and 28.1 per cent with it, for twos to 27.0 and 20.8, and for threes to 12.3 and 6.2. So a single adjective in a character sketch was worth roughly as much as the entire incentive manipulation, and the famous figure begins to look less like a constant of human cognition and more like a reading of one particular paragraph. This is not a reason to dismiss the fallacy, which survives every version anyone has tried. It is a reason to be careful about the number attached to it, and it is the strongest single piece of evidence for Camerer's argument that part of what is being measured is how people read English rather than how they handle probability.",
        },
        provenance: {
          source:
            "Charness G, Karni E, Levin D. On the conjunction fallacy in probability judgment: new experimental evidence regarding Linda. Games and Economic Behavior. 2010;68(2):551-556. Footnote 8, page 553: sessions run with the word 'single' deleted from the description of Linda gave error rates, with and without incentives respectively, of 28.1 and 35.8 per cent for individuals, 20.8 and 27.0 per cent for pairs, and 6.2 and 12.3 per cent for trios. The footnote reports rates without denominators and refers to Charness et al. (2008) for fuller discussion. Camerer's linguistic-convention argument is quoted at page 552, from Camerer C, 'Individual decision making', in Kagel J and Roth A (eds), Handbook of Experimental Economics, 1995, page 598.",
          year: 2010,
          doi: "10.1016/j.geb.2009.09.003",
        },
      },
    ],
  },

  share: {
    title: { en: "The conjunction fallacy, a reasoning trap." },
    explainer: {
      en: "Shown a character sketch and asked whether a woman is more likely to be a bank teller, or a bank teller who is also a feminist, most people pick the second. It cannot be: feminist bank tellers are bank tellers. In a replication with 361 students, 50 of 86 answering alone and unpaid got it wrong. Offering $4 for the right answer cut that to 31 of 94. But letting three people talk it over, with no money at all, cut it further, to 10 of 39. Conversation beat cash.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Charness G, Karni E, Levin D. On the conjunction fallacy in probability judgment: new experimental evidence regarding Linda. Games and Economic Behavior. 2010;68(2):551-556. Table 1, page 554, violations of the conjunction rule among UCSB students on the transparent version of Kahneman and Tversky's task: answering alone, 50/86 (58.1 per cent) with no incentive against 31/94 (33.0 per cent) with incentives, subtotal 81/180 (45.0 per cent); in pairs, 27/56 (48.2 per cent) against 5/38 (13.2 per cent), subtotal 32/94 (34.0 per cent); in trios, 10/39 (25.6 per cent) against 5/48 (10.4 per cent), subtotal 15/87 (17.2 per cent). Method at page 553: 361 participants, no psychology majors, nobody participating twice, $4 for a correct answer in the incentive treatment and $2 for completing the questionnaire otherwise, group members allowed to discuss quietly before each made an individual choice. Section 3.2, page 554, gives the alone-and-unpaid and alone-and-paid rates in prose as 58 and 33 per cent, and reports the decline from individuals to pairs at Z = 1.75, p = 0.040 one-tailed, and from pairs to trios at Z = 2.58, p = 0.005 one-tailed.",
    year: 2010,
    doi: "10.1016/j.geb.2009.09.003",
    note: {
      en: "Read from the paper, and specifically from Table 1 rendered as an image, because the automatic text extraction of that table shifts the study column against the row descriptions and would have paired several counts with the wrong condition. Reconciled five ways. All six printed percentages reproduce from the counts. Each pair of arms sums to its printed subtotal row in both numerator and denominator. The three denominators sum to exactly 361, which is the participant count stated independently in the methods on the preceding page, so a misread denominator anywhere would break that total. The prose in section 3.2 quotes the alone row as 58 and 33 per cent. And the paper's own footnote 11 recomputes what independent group members would predict from these rates and prints figures that reproduce from them. Five things a careful reader should hold against this puzzle. First, the famous 85 per cent is not measured here and is not in the puzzle's data. This paper's Table 1 reports Tversky and Kahneman's 1983 result as 121 of 142 undergraduates, but that row is these authors reporting someone else's study; the 1983 paper is paywalled with no repository copy that OpenAlex can locate, this project has not read it, and nothing here rests on it. Second, this is one replication at one American university with a student sample, run as a short add-on at the end of unrelated experiments, so both the level and the size of the effects are of that setting. Third, the study measures a task with a demonstrably correct answer, which is unusual, and the authors are careful that this is not a matter of preference. Fourth, the incentive was $4 and the comparison condition still paid $2 for completing the questionnaire, so the contrast is between a small payment for being right and a small payment for taking part, not between money and nothing. Fifth, the authors' own conclusion goes further than this puzzle does: they argue the fallacy is of little consequence for economic analysis, since real decisions are usually made with consultation and with something at stake. That conclusion is theirs and it is reported rather than adopted, because the other half of their own table is that 58 per cent of people got it wrong alone and 33 per cent got it wrong with money on the table, and neither number is small.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Conjunction_fallacy",
};
