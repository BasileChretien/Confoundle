import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #47, the innuendo effect, via Letourneau and Gawronski (2024),
 * Experiment 1, replicating Wegner et al. (1981).
 *
 * USES THE `ratings` SHAPE built for the third-person effect. The outcome is a
 * mean impression on an 11-point scale, which is why this entry waited: it was
 * refused for `estimation` (which requires a checkable true value it does not
 * have) and could never be `rates`.
 *
 * THE HEDGE IS THE CORRECT ANSWER, and that is a deliberate design decision
 * recorded in `docs/lesson-backlog.md` entry 15. Two other framings were
 * available and both fail the rule in CLAUDE.md. Asking how far a question
 * moves the needle is a magnitude guess, and bands reading "a third as much"
 * and "as much as the assertion" both point the way the skill licenses. Asking
 * whether a question and a denial each did damage is directional, but nothing
 * in the setup licenses predicting that a denial is harmless: a reader who
 * knows that denials repeat the proposition would reasonably predict both harm
 * and would be marked wrong for reasoning well. So the honest answer at the
 * commit beat is that the setup does not say, and the reveal carries a surprise
 * earned from the data rather than taken from the reader.
 *
 * ONLY THE NONPOLITICAL TARGET IS USED. The study also ran political ingroup
 * and outgroup targets, which would mean naming parties. It did not need to:
 * the nonpolitical row carries the whole finding, and the partisanship null is
 * reported in the deep dive, where it belongs.
 */
export const innuendoEffect: Puzzle = {
  schemaVersion: 1,
  id: "just-asking",
  slug: "just-asking",
  category: "causal-reasoning",
  reasoningSkill: "innuendo-effect",
  difficulty: "hard",
  tags: ["media", "psychology", "everyday"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Stating the accusation outright cost the man nearly a point of goodwill.",
    },
    framing: {
      en: "150 people read a series of newspaper headlines about people they had never heard of, then rated each person on three eleven point scales: bad to good, dishonest to honest, unpleasant to pleasant. The three were averaged. Every headline named a different person, and for one of them the wording was varied. Some readers saw a neutral headline that made no accusation at all. Others saw the same accusation asserted flatly as fact. The two bars below are those. Two other wordings were tested on other readers, and you are about to be asked about them.",
    },
    question: {
      en: "One group saw the accusation put as a question. Another saw it explicitly denied. What did each of those do to the ratings?",
    },
    data: {
      type: "ratings",
      label: { en: "Impression of the person named in the headline" },
      metricLabel: {
        en: "Mean impression score, 150 readers, three scales averaged",
      },
      scale: {
        min: 0,
        max: 10,
        minLabel: { en: "0, bad, dishonest, unpleasant" },
        maxLabel: { en: "10, good, honest, pleasant" },
      },
      dispersionLabel: {
        en: "The pale band spans one standard deviation either side of the mean.",
      },
      series: [
        {
          id: "neutral",
          label: { en: "Neutral headline, no accusation made" },
          short: { en: "No accusation" },
        },
        {
          id: "assertion",
          label: { en: "The accusation stated as fact" },
          short: { en: "Stated" },
        },
        {
          id: "question",
          label: { en: "The accusation put as a question" },
          short: { en: "Asked" },
        },
        {
          id: "denial",
          label: { en: "The accusation explicitly denied" },
          short: { en: "Denied" },
        },
      ],
      observations: [
        { seriesId: "neutral", mean: 5.133, sd: 1.519, n: 150 },
        { seriesId: "assertion", mean: 4.202, sd: 1.639, n: 150 },
        { seriesId: "question", mean: 4.798, sd: 1.688, n: 150 },
        { seriesId: "denial", mean: 4.96, sd: 1.59, n: 150 },
      ],
    },
    initialView: {
      kind: "bothratings",
      groupIds: ["neutral", "assertion"],
      caption: { en: "Two of the four wordings" },
    },
  },

  choices: [
    {
      id: "both-harm",
      label: { en: "Both did damage. Repeating the accusation is the harm" },
      sublabel: { en: "a denial still says the words" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "neither",
      label: { en: "Neither. Only a flat statement of fact moves anyone" },
      sublabel: { en: "readers discount the rest" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "question-only",
      label: { en: "The question did damage and the denial did not" },
      sublabel: { en: "a question plants, a denial clears" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // CORRECT, and the only puzzle in the deck where that is true by design
      // rather than by accident. The setup gives a neutral headline and an
      // assertion. Nothing in it says what a question does, and nothing in it
      // says what a denial does. Every one of the three confident bands above
      // is a defensible prediction from a real mechanism, so marking any of
      // them wrong would be marking a good reasoner wrong to land a surprise.
      id: "cannot-tell",
      label: { en: "There is no way to tell from this" },
      sublabel: { en: "the setup does not say" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "The question did the damage. The denial did not." },
    mechanismLabel: { en: "All four wordings" },
    mechanismName: { en: "A question you cannot answer still leaves a residue" },
    explanation: {
      en: "Merely asking cost about a third of a point, and that gap is statistically reliable. Explicitly denying the accusation cost about a sixth of a point, which is not: the denial group cannot be told apart from readers who saw no accusation at all. So a headline that supplies no evidence, makes no claim and can be defended as simply raising a question does measurable harm, while one that repeats the accusation in order to knock it down does not. That is not the ordering most people expect, which is why the honest answer a moment ago was that you could not have known.",
    },
    body: {
      en: "The result worth carrying away is not any of these four numbers, it is that you were right to say you could not tell. Two of the wrong answers were built out of real mechanisms. Denials do repeat the proposition, and that really can make claims feel familiar and true. Readers really do discount unsupported insinuation, sometimes. Both are sound reasoning about a question the setup had not answered, and this is one of the few puzzles here where the correct move at the commit beat was to decline to guess.",
    },
    view: {
      kind: "bothratings",
      caption: { en: "All four wordings" },
    },
  },

  lesson: {
    skillName: { en: "The innuendo effect" },
    takeaway: {
      en: "A question can damage someone without asserting anything, which is exactly why it is phrased as a question.",
    },
    body: {
      en: "The question mark is doing two jobs. It puts the accusation in front of the reader, and it makes the accusation unanswerable, because nothing has been claimed that could be shown false. There is no correction to demand and no retraction to print. This is why the form survives in headlines, in cross-examination and in the sentence that begins I am not saying that, but. The person who used it can say truthfully that they only asked, and the measurement says the asking did the work.",
    },
    howItWorks: {
      en: "The defence is to convert the question back into the claim it implies and then ask what would settle it. If a headline asks whether an official knew, write down the assertion it is inviting you to make, which is that the official knew, and then ask what evidence would show that and whether any was offered. Usually none was, and once that is explicit the headline has nothing left. The same move works when you catch yourself doing it, and you will: just asking is the most comfortable way there is to circulate something you could not stand behind. And do not reach for a denial as the fix. The finding here is that a denial did no measurable harm, but it is one study on strangers, and a denial still hands the accusation another day of circulation under your own name.",
    },
    examples: [
      {
        title: { en: "It works the same on your own side" },
        summary: {
          en: "The study ran the same headlines about targets identified with the reader's own party and with the opposing party, expecting the insinuation to bite harder against opponents. It did not: the question effect did not differ significantly across target groups. Partisanship shifted how favourably people rated everyone, but it did not protect a politician from a question asked about them. That is a genuinely useful symmetric result, and the reason this puzzle can use the nonpolitical version without hiding anything.",
        },
        provenance: {
          source:
            "Letourneau D, Gawronski B. Incrimination Through Innuendo. Social Psychology. 2024;55(1):51-61. Experiment 1, N = 150; the interaction between statement type and target group was not significant, F(6, 894) = 1.06, p = .384.",
          year: 2024,
          doi: "10.1027/1864-9335/a000540",
          url: "https://doi.org/10.1027/1864-9335/a000540",
        },
      },
    ],
  },

  share: {
    title: { en: "The innuendo effect, a reasoning trap." },
    explainer: {
      en: "A headline shaped as a question makes no claim, so there is nothing to correct and nothing to retract, and it damages the person anyway. That is what the question mark is for. When you meet one, write down the assertion it is inviting you to make and ask what evidence would settle it. Usually none has been offered.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Letourneau D, Gawronski B. Incrimination Through Innuendo. Social Psychology. 2024;55(1):51-61. Experiment 1, N = 150, preregistered. Table 1 on page 54, read from the rendered page: nonpolitical target, neutral 5.133 (SD 1.519), question 4.798 (1.688), assertion 4.202 (1.639), denial 4.960 (1.590). Impressions were three 11-point scales from 0 to 10, averaged. This replicates Wegner DM, Wenzlaff R, Kerker RM, Beattie AE. Incrimination through innuendo: can media questions become public answers? Journal of Personality and Social Psychology. 1981;40(5):822-832.",
    year: 2024,
    doi: "10.1027/1864-9335/a000540",
    url: "https://doi.org/10.1027/1864-9335/a000540",
    note: {
      en: "These are means on a rating scale, not counts, which is why this lesson waited for a shape that could draw one honestly. The reading of Table 1 is confirmed three ways beyond the table itself: every degrees-of-freedom figure the paper reports recovers N = 150, since F(3, 447), F(2, 298) and F(6, 894) are all a multiple of 149, as is the t(149) used throughout; the two experiments are stated as 150 and 356 and the abstract gives 506, which is their sum; and the significance pattern quoted here is printed separately in the text for nonpolitical targets, question t(149) = 2.90, p = .004, assertion t(149) = 6.88, p < .001, denial t(149) = 1.53, p = .129. Two things this puzzle deliberately does not do. It does not use the political ingroup and outgroup conditions, because they would mean naming parties and the nonpolitical row carries the finding on its own; the partisanship null is reported in the deep dive instead. And it does not claim that a denial is safe. The paper found no measurable harm from one in this design, which is a fact about 150 people rating strangers on invented headlines, not advice about what to do when accused.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Innuendo",
};
