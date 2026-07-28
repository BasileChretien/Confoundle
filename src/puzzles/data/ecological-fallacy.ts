import type { Puzzle } from "../schema";

/**
 * The ecological fallacy, on the paper that named it.
 *
 * Robinson took the 1930 census and computed the same relationship twice. Across
 * the 48 states, the more of a state's people were born abroad, the LESS
 * illiteracy it had: r = -.526. Count the same census one person at a time and
 * the relationship reverses: people born abroad were far more often illiterate
 * than the native born, r = +.118.
 *
 * Both numbers are printed in the paper, and the person-level one is recoverable
 * from Robinson's own Table 3 counts, which are authored here: 1,304 illiterate
 * of 13,217 born abroad, 2,614 of 84,055 native born, in thousands. Those give
 * 9.9 per cent against 3.1 per cent, which is the direction +.118 describes.
 *
 * The state-level figure is authored as the coefficient rather than as points,
 * because Robinson published the correlation and never the per-state figures.
 * Drawing a plausible scatter would be inventing observations, so the group view
 * draws a slope and says on the figure that it is drawn rather than plotted.
 */
export const ecologicalFallacy: Puzzle = {
  schemaVersion: 1,
  id: "ecological-fallacy-robinson-1950",
  slug: "states-and-people",
  category: "causal-reasoning",
  reasoningSkill: "ecological-fallacy",
  difficulty: "hard",
  tags: ["everyday", "research", "statistics", "epidemiology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "In 1930, American states with more immigrants had less illiteracy. So immigrants could read better than the locals?",
    },
    framing: {
      en: "One census, 48 states. For each state, the share of people born abroad and the share who could not read. The more foreign born a state was, the lower its illiteracy, and the pattern is strong enough that people have been quoting it ever since.",
    },
    question: { en: "What does that tell you about immigrants?" },
    data: {
      type: "ecological",
      label: { en: "Born abroad and unable to read, 1930 census" },
      outcomeLabel: { en: "Could not read or write" },
      unitLabel: { en: "One dot would be one state" },
      xLabel: { en: "Share of the state born abroad" },
      yLabel: { en: "Illiteracy" },
      groupCorrelation: -0.526,
      personCorrelation: 0.118,
      schematicNote: {
        en: "The slope is drawn from the published correlation. Robinson printed the coefficient, never the figures for each state, so plotting dots here would be inventing them.",
      },
      scaleNote: {
        en: "Counts in thousands of people, from the paper's own table.",
      },
      groups: [
        {
          label: { en: "People born abroad" },
          short: { en: "Born abroad" },
          affected: 1304,
          total: 13217,
        },
        {
          label: { en: "People born in the country" },
          short: { en: "Born here" },
          affected: 2614,
          total: 84055,
        },
      ],
    },
    initialView: { kind: "byplace" },
  },

  choices: [
    {
      id: "literate",
      label: { en: "Immigrants read better" },
      sublabel: { en: "the states full of them read better" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "noise",
      label: { en: "Nothing, the pattern is noise" },
      sublabel: { en: "a coincidence across 48 states" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "levels",
      label: { en: "Nothing about any person" },
      sublabel: { en: "this compares places, not people" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, wrong here: you are not short of data, you are being shown a
      // fact about states and asked to read it as a fact about people, and the
      // setup already tells you that is what it is.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Count people instead of states and it turns the other way." },
    mechanismLabel: { en: "Same census, other unit" },
    mechanismName: { en: "Places are not people" },
    explanation: {
      en: "In the same census, 1,304 of every 13,217 people born abroad could not read, against 2,614 of every 84,055 born in the country. That is about 10 per cent against 3, so immigrants were around three times as likely to be illiterate, not less. Across states the correlation is -.53; across people it is +.12.",
    },
    body: {
      en: "Both numbers are right, and they are answers to different questions. Immigrants settled where the work was, and those states also had the money and the schools that kept everyone else's illiteracy low. So a state's immigrant share tracked its wealth, and its wealth tracked its literacy, while inside every state the immigrants themselves were the ones more likely to be unable to read. Nothing about the state-level line was ever a claim about a person.",
    },
    view: { kind: "byperson" },
  },

  lesson: {
    skillName: { en: "The ecological fallacy" },
    takeaway: {
      en: "A relationship measured between groups need not hold, and can run backwards, inside them. If the rows in your table are places, schools or countries, the finding is about places, schools or countries, and carrying it down to a person is a separate claim that needs its own evidence.",
    },
    body: {
      en: "The tell is the unit of analysis: ask what one row of the data actually is. Averages per country, per region, per hospital or per school are convenient because they are published, but a pattern among averages can be produced entirely by which people ended up where. The same trap runs the other way too, so a pattern among individuals need not reappear when they are grouped.",
    },
    howItWorks: {
      en: "Picture two states. One is rich, with good schools, and attracts most of the immigrants; almost everyone there can read, immigrants slightly less often than the rest. The other is poor, has few immigrants, and much of its population never finished school. Plot the two states and you get a clean downward line: more immigrants, less illiteracy. Now pool the people and count them one by one, and the immigrants come out worse, because within each state they always were. The state-level line was never measuring immigrants at all. It was measuring the difference between a rich state and a poor one, with the immigrant share acting as a marker for which was which. This is why the fallacy is so easy to commit with published statistics: aggregated tables are what governments release, so the temptation is to answer a question about people using the only data on the shelf.",
    },
    examples: [
      {
        title: { en: "The correction that left the lesson standing" },
        summary: {
          en: "In 2011 a re-analysis found Robinson had used the wrong state-level figures, and that the correlation across states is nearer -0.46 than the -0.53 he printed. The number moved, the reversal did not: across states the relationship still runs one way and across people the other. A textbook case is more useful when its arithmetic has been checked than when it is merely repeated.",
        },
        provenance: {
          source:
            "te Grotenhuis M, Eisinga R, Subramanian SV. Robinson's Ecological Correlations and the Behavior of Individuals: methodological corrections. International Journal of Epidemiology 2011;40(4):1123-1125",
          year: 2011,
          doi: "10.1093/ije/dyr081",
          url: "https://doi.org/10.1093/ije/dyr081",
        },
      },
    ],
  },

  share: {
    title: { en: "The ecological fallacy, a reasoning trap." },
    explainer: {
      en: "A pattern found by comparing places can reverse completely when you count people instead. Areas with more immigrants had less illiteracy, yet immigrants themselves were three times likelier to be unable to read, because they settled where the schools were good. Before believing a statistic about people, check whether the rows in the table were people at all.",
    },
    captions: {
      competitive: { en: "Same census, opposite answer. Depends what you count." },
      selfDeprecating: { en: "I read a fact about states as a fact about people." },
    },
  },

  provenance: {
    source:
      "Robinson WS. Ecological correlations and the behavior of individuals. American Sociological Review 1950;15(3):351-357, Table 3 (p. 354)",
    year: 1950,
    doi: "10.2307/2087176",
    url: "https://doi.org/10.2307/2087176",
    note: {
      en: "The person-level counts are Robinson's own, in thousands: 1,304 illiterate of 13,217 born abroad and 2,614 of 84,055 born in the country, which give 9.9 per cent against 3.1 and reproduce the +.118 he prints. The outcome is illiteracy, not literacy, which is why the individual figure is positive. Robinson prints -.526 across the 48 states and -.619 across the nine census divisions. Two honesty notes. The state-level figure is authored here as the coefficient rather than as points, because he published the correlation and never the per-state figures, so the setup draws a slope and says so on the figure rather than inventing a scatter. And te Grotenhuis and colleagues showed in 2011 that his state-level data were wrong and the correlation is nearer -0.46; the reversal between the two levels survives the correction, which is the only thing this puzzle claims.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Ecological_fallacy",
};
