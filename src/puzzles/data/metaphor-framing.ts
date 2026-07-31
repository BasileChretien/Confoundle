import type { Puzzle } from "../schema";

/**
 * Puzzle #40, metaphor framing, on Thibodeau and Boroditsky (2011). Backlog
 * entry 18, opened by the propaganda audit. Distinct from `framing-effect`,
 * which is gain and loss wording: here every number in the passage is identical
 * and only the metaphor moves.
 *
 * WHICH EXPERIMENTS, AND WHY NOT THE FIRST ONE. The paper runs five. Experiment
 * 1 is the famous one, but Table 1 gives its counts as 126.5 and 97.5, because
 * responses offering suggestions on both sides were split across categories.
 * Half a person is not an observation, so this deck cannot author it.
 * Experiments 2 and 3 are whole counts and, better still, they are the
 * comparison the paper was built to make:
 *
 *   Exp 3, bare word primed beforehand   beast 75/118 (63.6%)  virus 66/102 (64.7%)
 *   Exp 2, one word inside the report    beast 80/113 (70.8%)  virus 72/133 (54.1%)
 *
 * So the setup shows the null and the reveal shows the effect, which is the
 * right way round: it establishes that this is not mere word association before
 * asking what the metaphor did.
 *
 * READ FROM TABLE 1 VISUALLY, on page 5. Three prose anchors from Experiment 1
 * confirm the reading of the table: the paper prints 74 per cent enforcement
 * under beast and 56 under virus, and 65 per cent enforcement overall, and
 * 170/231, 126.5/224 and the pooled 296.5/455 reproduce all three.
 *
 * NEITHER ANSWER IS THE RIGHT ANSWER, and the puzzle must never imply one is.
 * Enforcement against social reform is a genuine political disagreement, and
 * the finding is symmetric: both groups were moved by one noun. `crownWinner`
 * is off, which short-circuits the winner marker in both chart branches, and
 * `strataAreSeparateSamples` is on, which short-circuits the share card's
 * reversal check, so `higherIsBetter` never renders anything here. It is set
 * only because the schema defaults it.
 */
export const metaphorFraming: Puzzle = {
  schemaVersion: 1,
  id: "metaphor-framing-2011",
  slug: "one-word-in-the-report",
  category: "causal-reasoning",
  reasoningSkill: "metaphor-framing",
  difficulty: "medium",
  tags: ["everyday", "psychology", "politics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Everyone read the same crime statistics. One word decided what they wanted done about them.",
    },
    framing: {
      en: "Participants read a report about rising crime in a fictional city and then said what the city should do. Their answers were sorted into two kinds: catching and jailing offenders and stiffer enforcement, or investigating root causes and social reform. Before reading, one group was asked to give a synonym for the word beast and the other a synonym for the word virus, so the word was in mind but the report itself was identical and mentioned neither. Below is what those two groups proposed.",
    },
    question: {
      en: "What happened to a different set of readers when the report itself called crime a beast or a virus, a difference of one word?",
    },
    data: {
      type: "rates",
      metricLabel: {
        en: "Proposed catching and jailing rather than social reform",
      },
      // Inert here. `crownWinner: false` stops the winner marker in both chart
      // branches and `strataAreSeparateSamples` stops the share card's reversal
      // check, so nothing reads this. The schema defaults it, so it is set.
      higherIsBetter: true,
      // Crowning a bar would tell the reader that one side of a real political
      // argument is the correct answer. It is not what the study measured and
      // it is not this deck's business.
      crownWinner: false,
      // Two separate experiments with separate participants, so pooling them
      // would be meaningless.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "beast",
          label: { en: "Given the word beast" },
          short: { en: "Beast" },
        },
        {
          id: "virus",
          label: { en: "Given the word virus" },
          short: { en: "Virus" },
        },
      ],
      strata: [
        {
          id: "word-only",
          label: { en: "Bare word primed beforehand, report mentions neither" },
        },
        {
          id: "in-report",
          label: { en: "The report itself calls crime a beast or a virus" },
        },
      ],
      observations: [
        { groupId: "beast", stratumId: "word-only", numerator: 75, denominator: 118 },
        { groupId: "virus", stratumId: "word-only", numerator: 66, denominator: 102 },
        { groupId: "beast", stratumId: "in-report", numerator: 80, denominator: 113 },
        { groupId: "virus", stratumId: "in-report", numerator: 72, denominator: 133 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["word-only"],
      caption: { en: "The word alone, before reading" },
    },
  },

  choices: [
    {
      id: "nothing",
      label: {
        en: "Still nothing. One word cannot move what someone wants done about crime",
      },
      sublabel: { en: "the statistics in the report were identical" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "small",
      label: { en: "A small shift, a couple of points at most" },
      sublabel: { en: "wording nudges, it does not decide" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "large",
      label: { en: "A large shift. About seventeen points" },
      sublabel: { en: "the word arrived attached to a whole way of seeing" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim from the rest of the deck so it carries no
      // lexical tell. Wrong here: both conditions were run and counted.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "One noun moved it seventeen points. The same noun on its own moved nothing.",
    },
    mechanismLabel: { en: "The word alone, and the word in the report" },
    mechanismName: {
      en: "A metaphor arrives carrying a whole way of solving the problem",
    },
    explanation: {
      en: "When the word was merely primed beforehand, 75 of 118 in the beast group and 66 of 102 in the virus group proposed enforcement: 64 per cent against 65, which is no difference at all. When one word inside the report called crime a beast, 80 of 113 proposed enforcement, 71 per cent. When it called crime a virus, 72 of 133 did, 54 per cent. Same statistics, same city, same question. Seventeen points.",
    },
    body: {
      en: "The two bars in the setup are the important ones, and they are why this is not a puzzle about word association. Simply having beast or virus in mind did nothing, so the effect is not the word tugging at nearby ideas. What moved people was the word doing a job in a sentence about crime, and the reason is that a metaphor does not arrive alone. Call something a virus and you have imported an entire way of dealing with viruses: find the source, contain the spread, inoculate the vulnerable. Call it a beast and you have imported hunting, trapping and caging. The report's numbers were identical and, when asked afterwards, participants overwhelmingly named those numbers as the thing that had influenced them. Almost nobody named the metaphor. That last detail is the one worth keeping, because it means introspection is not a defence: people who had just been moved by a word reported, sincerely, that they had been moved by the evidence.",
    },
    view: {
      kind: "stratified",
      caption: { en: "Both experiments, side by side" },
    },
  },

  lesson: {
    skillName: { en: "Metaphor framing" },
    takeaway: {
      en: "A metaphor is not decoration on an argument, it is a smuggled argument. Naming a problem after something else imports that thing's whole repertoire of solutions before anyone has argued for them, and the import is invisible to the person it happens to.",
    },
    body: {
      en: "This is a narrower and stranger effect than ordinary framing. The deck's framing puzzle is about the same facts described as a gain or as a loss, where the emotional colour changes. Here nothing changes emotional colour and no number moves: one noun is swapped, and what people want done about the problem moves seventeen points. The mechanism is that metaphors are not comparisons, they are transfers. A war on drugs brings enemies, territory, victory and surrender, and quietly rules out the possibility that the thing might be managed rather than won. A viral idea brings contagion, immunity and a source patient. An economy that needs to tighten its belt brings a household budget, and with it the intuition that spending less is always prudent, which is a real economic argument that has now been made without being stated. Once you notice the move you find it everywhere, because there is no way to discuss an abstract problem without one. That is the uncomfortable part: you cannot simply refuse metaphors. You can only notice which one you have been handed.",
    },
    howItWorks: {
      en: "Three habits. First, when a claim rests on a metaphor, name the metaphor out loud, then ask what it rules out. If crime is a disease, the metaphor has already dismissed punishment; if crime is a war, it has already dismissed treatment. Neither dismissal was argued for, and saying it plainly restores the argument you were meant to skip. Second, try the swap. Restate the same facts under a rival metaphor and see whether your conclusion survives; if it does not, the conclusion was resting on the figure of speech rather than on the evidence. This costs about ten seconds and is the single most useful thing in this lesson. Third, be especially careful when the metaphor comes attached to numbers, because the numbers do the work of making everything around them feel measured. In the study the statistics were identical across conditions and participants named those statistics, not the metaphor, as what had persuaded them. That is what makes this hard to defend against by being sceptical: the feeling of having reasoned from evidence is exactly what the effect produces. The defence is procedural rather than attitudinal, and it is the swap.",
    },
    examples: [
      {
        title: { en: "The paper checked its own explanation and killed it" },
        summary: {
          en: "The obvious objection to the first experiment is that beast and virus simply drag associated words along with them, so nothing about metaphor is needed to explain the result. The authors tested exactly that. In Experiment 3 participants were asked to supply a synonym for beast or for virus before reading, which puts the word and its associates firmly in mind, and then read a report that used neither. Enforcement was proposed by 75 of 118 in the beast group and 66 of 102 in the virus group, which is 63.6 per cent against 64.7 and is nothing. The word on its own does not do it. What does it is the word occupying a structural role in a sentence about the problem, which is the difference between having a concept nearby and having it applied. It is unusually good practice: the alternative explanation was not waved away in a discussion section, it was run as a condition and reported when it came back null.",
        },
        provenance: {
          source:
            "Thibodeau PH, Boroditsky L. Metaphors we think with: the role of metaphor in reasoning. PLoS ONE. 2011;6(2):e16782. Experiment 3, Table 1, page 5: enforcement proposed by 75 of 118 (43 social) in the beast condition and 66 of 102 (36 social) in the virus condition, after participants supplied a synonym for the word but read a report containing neither metaphor.",
          year: 2011,
          doi: "10.1371/journal.pone.0016782",
        },
      },
    ],
  },

  share: {
    title: { en: "Metaphor framing, a reasoning trap." },
    explainer: {
      en: "People read the same report about rising crime in a fictional city and said what should be done. When the report called crime a beast, 80 of 113 wanted more enforcement. When it called crime a virus, 72 of 133 did. Same statistics, one word different, seventeen points apart. And when the word was merely primed beforehand without appearing in the report, the difference vanished, so it is not word association: a metaphor imports a whole way of solving the problem. Asked afterwards, participants named the statistics as what had persuaded them. Almost nobody named the word.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Thibodeau PH, Boroditsky L. Metaphors we think with: the role of metaphor in reasoning. PLoS ONE. 2011;6(2):e16782. Table 1, page 5, response frequencies by condition and response category. Experiment 2, in which one word in the report described crime as a beast or a virus: enforcement 80 with 33 social in the beast condition, and 72 with 61 social in the virus condition. Experiment 3, in which participants supplied a synonym for beast or virus before reading a report using neither: enforcement 75 with 43 social, and 66 with 36 social. Experiment 1, whose counts this puzzle does not use, gives enforcement 170 with 61 social under beast and 126.5 with 97.5 social under virus, and the text reports these as 74 per cent and 56 per cent enforcement and 65 per cent enforcement overall.",
    year: 2011,
    doi: "10.1371/journal.pone.0016782",
    note: {
      en: "Open access, and read at source. Table 1 was read from the rendered page rather than from extracted text, as this project now does for every table. Three checks on that reading, all from Experiment 1, which the puzzle deliberately does not otherwise use: 170 of 231 is 73.6 per cent against the printed 74, 126.5 of 224 is 56.5 against the printed 56, and pooling them gives 65.2 against the printed 65. Five things a careful reader should hold against this puzzle. First, and this is why Experiment 1 supplies no observations here: its counts are 126.5 and 97.5, because participants who offered suggestions on both sides had their response split across the two categories. Half a person is not a count, and this deck authors raw counts, so the puzzle is built on Experiments 2 and 3, which are whole numbers, and which happen also to be the better comparison. Second, Experiment 2's two conditions contain 246 coded responses against the 253 participants the paper says were analysed, seven short. The likeliest explanation is responses that could not be coded into either category, but the paper does not say so and neither does this note; the shortfall is recorded and left unexplained. Third, these are Amazon Mechanical Turk samples of United States residents who were native English speakers, recruited online and paid, which is not a general population, and the crime report and the city are fictional, so what is measured is a stated preference about an imaginary place rather than a vote. Fourth, the response categories are the authors' own coding of free text into enforcement and reform, and any such coding involves judgement, so the categories should be read as the authors' summary rather than as a natural kind. Fifth, and most important: subsequent attempts to replicate this effect have reported mixed results, and this project has not read them. The puzzle therefore claims what this paper measured, in these conditions, and nothing about the size or robustness of the effect in general. Finally, on what the puzzle is not saying. Enforcement against social reform is a real political disagreement and this deck takes no side in it. The finding is symmetric: both groups were moved, in opposite directions, by one noun, and neither response is treated here as the correct one. No winner is marked on the chart for exactly that reason.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Conceptual_metaphor",
};
