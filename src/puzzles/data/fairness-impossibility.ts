import type { Puzzle } from "../schema.ts";

/**
 * Fairness impossibility, on the `classifier` shape.
 *
 * A risk score used in pretrial decisions in Broward County. ProPublica said
 * it was biased against Black defendants; its maker said it was not; both
 * computed their claim correctly from the same table, and the deep result is
 * that the two definitions cannot both be satisfied at once.
 *
 * THE SETUP DRAWS THE MAKER'S CHECK, and it is a real one. Of the defendants
 * the tool labelled higher risk, 63 per cent of Black and 59 per cent of White
 * defendants were arrested again within two years. A score that means the same
 * thing whichever group you belong to is exactly what most people would call
 * unbiased, and this one nearly does.
 *
 * THE REVEAL ASKS THE OTHER QUESTION. Of the defendants who were NOT arrested
 * again, 45 per cent of Black and 23 per cent of White defendants had been
 * labelled higher risk. Same four counts per group, opposite verdict.
 *
 * AND THEN THE PART THAT MAKES IT A THEOREM rather than a scandal. The two
 * readings are bound to the base rate by an identity, verified to floating
 * point in `classifier.test.ts` on these exact counts. 51 per cent of the
 * Black defendants and 39 per cent of the White ones were arrested again, so
 * holding the first reading equal FORCES the second apart. Nobody chose it,
 * no amount of care avoids it, and the only way out is to say which definition
 * of fair you meant.
 *
 * THE HEDGE IS THE CORRECT ANSWER, and it was decided before authoring rather
 * than discovered after, because backlog entry 77 flagged that it would be the
 * hard part. The setup shows one fairness measure. A player who says a single
 * measure cannot settle the question is reasoning correctly, and the deck's
 * oldest rule forbids marking that wrong to land a surprise. The two "less
 * accurate for X" bands are ruled out BY the figure, since 63 against 59 is
 * nearly level, so the real choice is between over-reading the setup and
 * declining it.
 *
 * NUMBERS ARE PROPUBLICA'S PUBLISHED CONTINGENCY TABLES, counts as printed.
 * Every rate the figure draws is recomputed from those counts rather than
 * quoted, and each recomputation matches the rate printed beside them.
 */
export const fairnessImpossibility: Puzzle = {
  schemaVersion: 1,
  id: "fairness-impossibility-risk-score",
  slug: "both-sides-were-right",
  category: "causal-reasoning",
  reasoningSkill: "fairness-impossibility",
  difficulty: "hard",
  tags: ["research", "technology", "politics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A tool that scores how likely someone is to be arrested again is accused of racial bias. Its maker answers with this: a score means the same thing whichever group you belong to.",
    },
    framing: {
      en: "Every defendant booked into jail in Broward County was scored from 1 to 10, and anything above the lowest band counts here as a flag. Two years later it is possible to check what actually happened to all 6,150 of them. This is the check the maker published: among the people the tool flagged, how many went on to be arrested again.",
    },
    question: { en: "Is the tool fair between the two groups?" },
    data: {
      type: "classifier",
      label: { en: "A pretrial risk score, checked against what happened" },
      flagLabel: { en: "labelled higher risk" },
      outcomeLabel: { en: "was arrested again within two years" },
      amongFlaggedLabel: {
        en: "Of those it labelled higher risk, how many were arrested again",
      },
      amongUneventfulLabel: {
        en: "Of those who were NOT arrested again, how many it had labelled higher risk",
      },
      cohortNote: {
        en: "Broward County, Florida, scored in 2013 and 2014, followed for two years. 3,696 Black and 2,454 White defendants.",
      },
      groups: [
        {
          id: "black",
          label: { en: "Black defendants" },
          short: { en: "Black" },
          flaggedAndHappened: 1369,
          flaggedNotHappened: 805,
          notFlaggedButHappened: 532,
          notFlaggedNorHappened: 990,
        },
        {
          id: "white",
          label: { en: "White defendants" },
          short: { en: "White" },
          flaggedAndHappened: 505,
          flaggedNotHappened: 349,
          notFlaggedButHappened: 461,
          notFlaggedNorHappened: 1139,
        },
      ],
    },
    initialView: { kind: "whenitflagged" },
  },

  /*
    Exactly one band is licensed by the figure. The two "less accurate for X"
    bands are ruled out by it: 63 against 59 is nearly level and slightly
    favours neither reading of "accurate". The first band reads the figure
    correctly and then treats one measure as the whole question, which is the
    trap. The hedge is correct because the setup genuinely does not contain
    what would be needed to answer.
  */
  choices: [
    {
      id: "yes-calibrated",
      label: { en: "Yes, a score means the same thing for both" },
      sublabel: { en: "63 per cent against 59 per cent" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "worse-for-black",
      label: { en: "No, it predicts Black defendants less accurately" },
      sublabel: { en: "the flag would be worth less for them" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "worse-for-white",
      label: { en: "No, it predicts White defendants less accurately" },
      sublabel: { en: "the flag would be worth less for them" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cannot-tell",
      label: { en: "There is no way to tell from this" },
      sublabel: { en: "one measure of fair is not all of them" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Ask the same table the other question and it answers the other way. Among the defendants who were NOT arrested again, 45 per cent of the Black ones had been flagged, against 23 per cent of the White ones.",
    },
    mechanismLabel: { en: "Fair by which definition?" },
    mechanismName: { en: "An impossibility, not an oversight" },
    explanation: {
      en: "Both numbers are right and both come from the same four counts per group. The first asks what a flag is worth: given that the tool flagged someone, how often was it borne out. The second asks who pays for the mistakes: given that someone did nothing, how often were they flagged anyway. A tool can be even-handed on the first and lopsided on the second, and this one is. Neither side of the argument was miscalculating; they were answering different questions and both calling the answer fairness.",
    },
    body: {
      en: "Now the part that stops this being a defect somebody could have fixed. The two readings are not independent: they are tied to each other and to how often the outcome happens at all, by an identity that follows from the four counts and holds exactly. Here 51 per cent of the Black defendants and 39 per cent of the White ones were arrested again within the two years. Feed those different base rates into the identity while holding the first reading level, and the second is forced apart. Give both groups the same base rate and the gap in the second reading nearly vanishes on its own. So there is no better-built tool that satisfies both definitions at once. There is only the choice of which one to state out loud.",
    },
    view: { kind: "everyoutcome" },
  },

  lesson: {
    skillName: { en: "Competing definitions of fair" },
    takeaway: {
      en: "When two people disagree about whether a system is fair, check whether they are measuring the same thing before deciding who is wrong. For any tool that sorts people into groups with different underlying rates, several reasonable definitions of fairness exist and they cannot all hold at once. The argument is then not about arithmetic but about which definition to adopt, and that is a choice somebody has to make out loud.",
    },
    body: {
      en: "The two definitions here have plain-English names. One says a score should mean the same thing for everyone: if it flags you, your chance of the outcome should not depend on which group you are in. The other says mistakes should fall evenly: if you did nothing, your chance of being flagged should not depend on your group either. Both sound like bare decency. Both are measurable. And whenever the groups differ in how often the outcome actually happens, satisfying one guarantees violating the other, which is a fact about arithmetic rather than about anybody's intentions.",
    },
    howItWorks: {
      en: "Take any group and four counts: flagged and it happened, flagged and it did not, not flagged and it happened, not flagged and it did not. Every fairness measure anyone argues about is some ratio of those four. Because they all come from the same four numbers, fixing one ratio constrains the others, exactly as fixing two angles of a triangle fixes the third. The base rate, how often the outcome happens in that group at all, is the quantity that ties them together. If two groups share a base rate you can often satisfy several definitions at once. If they do not, and in the world they usually do not, you cannot, and the impossibility is not sensitive to how the tool was built or how careful anyone was. The practical consequence is that a system claiming to be fair without saying by which measure has told you almost nothing, and that a critic and a defender can both be right at the same time and stay right for years.",
    },
    examples: [
      {
        title: { en: "The same argument, run over the same table" },
        summary: {
          en: "The news organisation that published the analysis and the company that sold the tool both wrote up their case, and neither was making an arithmetic error. The company pointed out that its score was equally predictive for both groups, which the counts confirm. The journalists pointed out that among people who were never arrested again, Black defendants were nearly twice as likely to have been flagged, which the same counts also confirm. What followed was a small literature establishing that the two positions cannot be reconciled by any tool when the base rates differ, which is the useful part: the disagreement was never going to be settled by better data or a better model, because it was not that kind of disagreement.",
        },
        provenance: {
          source:
            "Larson J, Mattu S, Kirchner L, Angwin J. How We Analyzed the COMPAS Recidivism Algorithm. ProPublica, 23 May 2016. Contingency tables for Black, White and all defendants; data and calculations published on GitHub",
          year: 2016,
          url: "https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm",
        },
      },
    ],
  },

  share: {
    title: { en: "Both sides of the fairness argument were right." },
    explainer: {
      en: "A risk score was called biased and defended as unbiased, and both claims were computed correctly from the same table. One side asked what a flag is worth and found it meant the same for both groups. The other asked who pays for the mistakes and found one group nearly twice as likely to be flagged despite doing nothing. When two groups differ in how often the outcome happens, these two definitions of fairness cannot both hold, no matter how the tool is built. Ask which definition somebody means before deciding whether they are wrong.",
    },
    captions: {
      competitive: { en: "Asked which definition of fair they meant." },
      selfDeprecating: { en: "I took one measure of fair for all of them." },
    },
  },

  provenance: {
    source:
      "Larson J, Mattu S, Kirchner L, Angwin J. How We Analyzed the COMPAS Recidivism Algorithm. ProPublica, 23 May 2016. Counts taken from the published contingency tables for Black and White defendants; every rate drawn here is recomputed from those counts and matches the rate printed beside them",
    year: 2016,
    url: "https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm",
  },
};
