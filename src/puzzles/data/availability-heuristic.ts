import type { Puzzle } from "../schema";

/**
 * Puzzle #36, the availability heuristic, on Lichtenstein, Slovic, Fischhoff,
 * Layman & Combs (1978). Closes the last of the six syllabus gaps.
 *
 * READ FROM THE PAPER ITSELF, from the copy the last author's own institution
 * publishes: University of Oregon Scholars' Bank, CC BY-NC-ND. Not from a
 * summary, and not from a third-party mirror.
 *
 * FOUR PAIRS, ALL FROM TABLE 2, AND EVERY ONE CROSS-CHECKED AGAINST THE PROSE.
 * The paper's Results section discusses each of these pairs in words, and the
 * words and the table agree to the digit, which is two independent readings of
 * the same figures:
 *
 *   Pair 25  diabetes / motor vehicle accident  ratio 1.42  99% correct
 *   Pair 37  all accidents / stroke             ratio 1.85  20% correct
 *   Pair 61  tornado / asthma                   ratio 20.9  42% correct
 *   Pair 71  botulism / lightning               ratio 52.0  37% correct
 *
 * THE CONTROL PAIR IS THE POINT, and it is why this puzzle can refute the
 * obvious objection from inside its own data. "People only get it wrong when
 * the margin is narrow" is the natural excuse, and pair 25 kills it: at a true
 * ratio of 1.42, narrower than the 1.85 of pair 37, ninety-nine per cent got it
 * right. The difference is not the margin. It is that in pair 25 the vivid
 * cause really is the bigger killer, so availability and the world happen to
 * agree. A derivation in `engine/charts/salience.ts` computes that refutation
 * from the data rather than asserting it, and a test checks it holds.
 *
 * NEW SHAPE, DELIBERATELY. `estimation` carries two groups estimating one
 * quantity against one true value, which is the anchoring design. Here each
 * comparison is its own question with its own answer and the lesson lives in
 * the pattern across four of them. Bending `estimation` to fit would have meant
 * authoring a denominator the paper does not print.
 *
 * WHY NOT COUNTS. The paper prints percentages of subjects, not head counts,
 * and the sample was 111 students. Converting 42 per cent into 47 of 111 would
 * be inventing a denominator, so shares are authored as percentages and the
 * schema derives the other side of each split rather than letting both be
 * authored and drift.
 */
export const availabilityHeuristic: Puzzle = {
  schemaVersion: 1,
  id: "availability-heuristic-1978",
  slug: "what-comes-to-mind-first",
  category: "statistical-reasoning",
  reasoningSkill: "availability-heuristic",
  difficulty: "medium",
  tags: ["everyday", "statistics", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "One hundred and eleven people were asked which of two things kills more Americans. Here is how they split.",
    },
    framing: {
      en: "Researchers took 41 causes of death, paired them up, and asked people which of each pair kills more people in the United States in a year. The true annual rates came from national health statistics, so every pair has a checkable answer. Four of those pairs are below, with the share of people who picked each side. Three of the four went the wrong way.",
    },
    question: {
      en: "What do the three they got wrong have in common?",
    },
    data: {
      type: "salience",
      label: { en: "Which one kills more Americans in a year?" },
      splitLabel: {
        en: "How 111 people split. Nothing here says which side is right.",
      },
      truthLabel: {
        en: "The tick marks the one that actually kills more, and by how many times.",
      },
      statNote: {
        en: "Shares are percentages of subjects, as the paper prints them. Ratios are of true annual death rates per 100 million residents, from national statistics for 1968 to 1973.",
      },
      comparisons: [
        {
          id: "diabetes-crash",
          optionA: { en: "Diabetes" },
          optionB: { en: "Motor vehicle accident" },
          commoner: "b",
          trueRatio: 1.42,
          percentCorrect: 99,
        },
        {
          id: "accidents-stroke",
          optionA: { en: "All accidents" },
          optionB: { en: "Stroke" },
          commoner: "b",
          trueRatio: 1.85,
          percentCorrect: 20,
        },
        {
          id: "tornado-asthma",
          optionA: { en: "Tornado" },
          optionB: { en: "Asthma" },
          commoner: "b",
          trueRatio: 20.9,
          percentCorrect: 42,
        },
        {
          id: "botulism-lightning",
          optionA: { en: "Botulism" },
          optionB: { en: "Lightning" },
          commoner: "b",
          trueRatio: 52,
          percentCorrect: 37,
        },
      ],
    },
    initialView: {
      kind: "asguessed",
      caption: { en: "What people picked" },
    },
  },

  choices: [
    {
      id: "too-close",
      label: { en: "The two were too close together to call" },
      sublabel: { en: "nobody can split hairs about mortality from memory" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "too-rare",
      label: { en: "They involve causes too rare for anyone to have met" },
      sublabel: { en: "you cannot know what you have never encountered" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "reported",
      label: { en: "The side they picked is the side that gets reported" },
      sublabel: { en: "ask which one you have read a headline about" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim from other puzzles so it carries no tell.
      // Wrong here: four pairs with a stated right answer is exactly enough to
      // see a pattern, which is what the study was built to show.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Stroke, asthma and lightning. All three lost." },
    mechanismLabel: { en: "What people picked, against what happens" },
    mechanismName: {
      en: "The easier something is to bring to mind, the commoner it seems",
    },
    explanation: {
      en: "Stroke kills 1.85 times as many people as every accident combined, and 80 per cent picked accidents. Asthma kills 20.9 times as many as tornadoes, and 58 per cent picked tornadoes. Lightning kills 52 times as many as botulism, and 63 per cent picked botulism. In each case the loser is the one you have read a headline about.",
    },
    body: {
      en: "Now look at the pair they got right, because it is the one that settles the question. Motor vehicle accidents kill 1.42 times as many people as diabetes, a narrower margin than the 1.85 between stroke and accidents, and 99 per cent got it right. So it cannot be that people fail when the margin is close. In that pair the dramatic cause genuinely is the bigger killer, so the thing that comes to mind first and the thing that actually happens point the same way, and the crowd looks well informed. Availability is not a bias that makes you wrong. It is a bias that makes you right for a reason that will not hold, and gives you no way of telling the two cases apart from the inside.",
    },
    view: {
      kind: "againstfact",
      caption: { en: "Against what actually happens" },
    },
  },

  lesson: {
    skillName: { en: "The availability heuristic" },
    takeaway: {
      en: "How easily something comes to mind stands in for how often it happens, and what comes to mind is what got reported. The trap is not that the estimate is noisy. It is that the error has a direction: whatever is dramatic, recent or filmable is overweighted, and whatever kills quietly is underweighted.",
    },
    body: {
      en: "The researchers went looking for what was doing this, and one of the things they measured was newspapers. Over 184 days of a daily paper, 19 of their 41 causes of death were never mentioned once, among them diabetes, breast cancer, tuberculosis and cancer of the digestive system. Homicide, which kills 23 per cent fewer people than suicide, was reported 9.6 times as often and given fifteen times as much space. Their summary of it is that news coverage was a decent predictor of what people believed and a poor predictor of what was true. That is the whole mechanism in one sentence, and it does not require anybody to be lying: a newspaper prints what is unusual, which is its job, and a reader who counts what they remember is counting the output of that filter rather than the world.",
    },
    howItWorks: {
      en: "The useful move is to notice when you are answering a frequency question from memory, because memory is not a frequency table and was never assembled to be one. Three habits follow. First, when you catch yourself judging how common something is, ask where your examples came from: if they arrived through a screen, they were selected for being worth reporting, which is close to the opposite of being typical. Second, look for the quiet side of the comparison, because the thing with no footage attached is the thing you will underweight, and it is often the bigger number. Third, prefer a denominator to an anecdote: the question is never whether a shark attack happened, it is how many happened out of how many swimmers, and the second half is the half nobody films. This is also worth knowing about yourself in the other direction. A doctor who has just missed a rare diagnosis will overtest for it for months, and a driver who has just passed a crash slows down for a mile. Neither reaction is irrational exactly, but neither is a measurement, and treating it as one is how a single vivid case ends up setting policy.",
    },
    examples: [
      {
        title: { en: "Getting the direction right and the size absurd" },
        summary: {
          en: "The subjects were not only asked which of a pair was commoner, they were asked by how many times, and those answers are worse than the pick-a-side ones. Take the pair almost everybody got right. Motor vehicle accidents do kill more people than diabetes, and 99 per cent said so, but the students' average answer to how much more was 356 times. The true figure is 1.4. The League of Women Voters members said 100 times. Getting the direction right bought nobody an accurate picture: the same crowd that identified the bigger killer overstated the gap by a factor of about two hundred and fifty. Now the pair they got wrong. On stroke against all accidents the students' average was 0.04, meaning they believed accidents killed 25 times as many people as stroke, when stroke in fact kills 1.85 times as many. That is one comparison wrong by a factor of about forty-six. The direction of an availability error is easy to state; the magnitude is what makes it dangerous when somebody budgets against it.",
        },
        provenance: {
          source:
            "Lichtenstein S, Slovic P, Fischhoff B, Layman M, Combs B. Judged frequency of lethal events. Journal of Experimental Psychology: Human Learning and Memory. 1978;4(6):551-578. Table 2 and the Results text, which agree: pair 25, motor vehicle accident against diabetes, true ratio 1.42, geometric mean of the ratio judgments 356.0 for the students and 99.6 for the League of Women Voters members; pair 37, stroke against all accidents, true ratio 1.85, geometric mean 0.04 for the students and 0.13 for the league members.",
          year: 1978,
          doi: "10.1037/0278-7393.4.6.551",
        },
      },
    ],
  },

  share: {
    title: { en: "The availability heuristic, a reasoning trap." },
    explainer: {
      en: "Asked which of two causes kills more Americans, 80 per cent picked all accidents over stroke, which kills 1.85 times as many. 58 per cent picked tornadoes over asthma, which kills 20.9 times as many. 63 per cent picked botulism over lightning, which kills 52 times as many. But 99 per cent correctly picked motor vehicle accidents over diabetes, a narrower margin than the first one. So it is not that people fail when it is close. They fail when the memorable side is not the deadly one.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Lichtenstein S, Slovic P, Fischhoff B, Layman M, Combs B. Judged frequency of lethal events. Journal of Experimental Psychology: Human Learning and Memory. 1978;4(6):551-578. Table 2, paired-comparison judgments by 111 college students: pair 25, diabetes against motor vehicle accident, true ratio 1.42, 99 per cent correct; pair 37, all accidents against stroke, true ratio 1.85, 20 per cent correct; pair 61, tornado against asthma, true ratio 20.9, 42 per cent correct; pair 71, botulism against lightning, true ratio 52.0, 37 per cent correct. True rates are deaths per 100 million United States residents per year, from National Center for Health Statistics reports for 1968 to 1973.",
    year: 1978,
    doi: "10.1037/0278-7393.4.6.551",
    note: {
      en: "Read from the copy the last author's own institution publishes, the University of Oregon Scholars' Bank, under CC BY-NC-ND. Every figure used here appears twice in the paper, once in Table 2 and once discussed in the Results prose, and the two agree to the digit; the prose is the cross-check that makes a transcribed table trustworthy. Five things a careful reader should hold against this. First, it is 1974 and 1975, and both the death rates and what the news covers have moved since; the effect has been replicated many times, but these particular pairs are a period photograph and the puzzle should not be read as current mortality. Second, the subjects were 111 people who answered a University of Oregon campus newspaper advertisement, which is not a sample of anybody; the paper also ran 77 members of the local League of Women Voters, who did better on some pairs and no better on others, and neither group is the public. Third, percentages are what the paper prints, so no head counts are authored anywhere here, and the second share in each split is derived rather than authored so the two cannot drift apart. Fourth, the newspaper study in the lesson counted one local daily over 184 days, which is enough to show the shape of the filter and not enough to measure it, and the authors say as much. Fifth, and most usefully, a commentary printed in the same issue argues that a deviation from a true frequency is a response error rather than necessarily a judgemental bias, because these subjects were being asked about things they had never directly experienced, so a psychological explanation is being offered for an inaccuracy whose origin has not been established. The authors themselves also note that official records probably undercount suicide. This puzzle claims the pattern in the answers, which is not in dispute; the mechanism behind it is the part the field has spent the decades since testing.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Availability_heuristic",
};
