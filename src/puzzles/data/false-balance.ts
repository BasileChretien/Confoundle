import type { Puzzle } from "../schema";

/**
 * Puzzle #42, false balance. Two studies, read at source, placed side by side:
 * Boykoff and Boykoff's content analysis of the US prestige press against
 * Oreskes' analysis of the peer-reviewed literature.
 *
 * NO NEW SHAPE. Uses `rates` with one stratum and `initialView.groupIds` to hold
 * the press bar back, the pattern `self-applied-label` introduced.
 *
 * Two design decisions worth stating, because both were nearly got wrong.
 *
 * First, the commit question is a **comparison inside the press sample**, not the
 * size of the balanced share. "What fraction was balanced" is a magnitude guess,
 * and every band except "almost none" would have shared the direction the skill
 * licenses, which is exactly the failure `docs/hedge-audit.md` exists to catch.
 * Asking which of two categories was larger is answerable from the framing plus
 * the skill, and the magnitude still lands as a surprise at the reveal.
 *
 * Second, `crownWinner` is off and `higherIsBetter` is false. A crown here would
 * be the deck telling the reader which side of a live political argument is
 * right, which is not what this puzzle is about and not something a bar chart
 * gets to assert. The lesson is about a journalistic format, and it names the
 * four newspapers only because the study does.
 */
export const falseBalance: Puzzle = {
  schemaVersion: 1,
  id: "balance-as-bias",
  slug: "both-sides-of-what",
  category: "statistical-reasoning",
  reasoningSkill: "false-balance",
  difficulty: "medium",
  tags: ["media", "politics", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Of 928 peer-reviewed papers, how many rejected the consensus? None.",
    },
    framing: {
      en: "A 2004 analysis in Science took every paper in the ISI database whose keywords included “climate change”, published in a refereed journal between 1993 and 2003, and sorted the 928 that resulted into six categories. 696 accepted the consensus position explicitly or implicitly. 232 dealt with methods or paleoclimate and took no position on present-day human contribution. None disagreed with the consensus. Separately, a content analysis read a random sample of articles from the New York Times, the Washington Post, the Los Angeles Times and the Wall Street Journal, 1988 to 2002. It coded the 340 that discussed whether humans contribute to global warming into four treatments: roughly equal weight to both sides, mostly the anthropogenic case, mostly the sceptical case, or the anthropogenic case alone.",
    },
    question: {
      en: "Within those 340 articles, which was more common: giving both sides roughly equal weight, or leading with the anthropogenic case?",
    },
    data: {
      type: "rates",
      metricLabel: {
        en: "Share treating the sceptical position as a live scientific option",
      },
      // Nothing is crowned, so this only orients the axis. A higher share means
      // more items presenting a question as open that the literature had closed.
      higherIsBetter: false,
      crownWinner: false,
      // Deliberately NOT strataAreSeparateSamples. The two studies are the two
      // groups, and there is a single stratum, so there is nothing to pool and
      // the flag does not apply. That the samples are separate is carried by
      // the group labels, which name their own windows, and by the provenance
      // note, which states the mismatch outright. Setting the flag here would
      // also forbid the aggregate view, which is the only sensible one when a
      // chart has one stratum.
      groups: [
        {
          id: "literature",
          label: {
            en: "Peer-reviewed papers rejecting the consensus, 1993 to 2003",
          },
          short: { en: "Papers" },
        },
        {
          id: "press",
          label: {
            en: "Newspaper articles giving both sides roughly equal weight, 1988 to 2002",
          },
          short: { en: "Press" },
        },
      ],
      strata: [{ id: "all", label: { en: "All items coded" } }],
      observations: [
        { groupId: "literature", stratumId: "all", numerator: 0, denominator: 928 },
        { groupId: "press", stratumId: "all", numerator: 179, denominator: 340 },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["literature"],
      caption: { en: "What the literature said, 1993 to 2003" },
    },
  },

  choices: [
    {
      id: "anthropogenic-wide",
      label: { en: "Leading with the anthropogenic case, by a wide margin" },
      sublabel: { en: "coverage followed the evidence" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "anthropogenic-narrow",
      label: { en: "Leading with the anthropogenic case, but only just" },
      sublabel: { en: "a lean, not a landslide" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "balanced",
      label: { en: "Giving both sides roughly equal weight" },
      sublabel: { en: "balance as the house style" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Wrong here, and deliberately so. The framing names the four treatments
      // and the sample size, and the skill is precisely a claim about what the
      // balance norm does to coverage of a settled question. That is enough to
      // pick a side of a two-way comparison. It would not be enough to guess a
      // percentage, which is why the question does not ask for one.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Balanced coverage was the majority treatment: 179 of 340." },
    mechanismLabel: { en: "The press sample" },
    mechanismName: { en: "Balance applied to a question that was not balanced" },
    explanation: {
      en: "179 of the 340 articles, 52.65 per cent, gave the two sides roughly equal weight. That is more than the 120 that led with the anthropogenic case and the 20 that gave it alone put together. Only 21 led with the sceptical case. So the single most common way to cover the question was to present it as an open argument between two camps, over a period when the literature contained no papers arguing the sceptical side at all. Nobody printed a falsehood. Every quoted scientist may have been quoted accurately. The distortion is in the proportions.",
    },
    body: {
      en: "Notice what the balanced format does that a false statement could not. A reader who checked every factual claim in those articles would find them sound, and would still come away with the impression that the scientific community was split roughly down the middle. The misinformation is carried by the shape of the coverage rather than by anything in it, which is why fact-checking does not catch it.",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "False balance" },
    takeaway: {
      en: "Giving two positions equal airtime is a claim about the evidence, and when the evidence is lopsided, that claim is false.",
    },
    body: {
      en: "Balance is a good default when a question really is open, and it is how a fair-minded reporter avoids putting a thumb on the scale. The trouble is that the format carries a message of its own: two people, two chairs, one each side of the argument tells the audience that expert opinion divides about evenly. When it does not, the format has said something untrue without anybody saying anything untrue. Ask not whether both sides were heard, but whether the airtime resembles the weight of evidence behind each.",
    },
    howItWorks: {
      en: "The habit to build is to separate two questions that feel like one. Is this position held by somebody, and is it held by a proportion of qualified people that justifies the space it is getting? A view can pass the first test and fail the second by an enormous margin, and the balanced format cannot express the difference: one voice against one voice looks the same whether the split is 50 to 50 or 928 to 0. So when you meet a two-sided presentation of a technical question, try to find out the denominator. If nobody can tell you roughly how the field divides, that absence is itself informative, because a genuinely contested question usually has somebody counting. Note also that this cuts in every direction: the same format can manufacture apparent controversy about a settled question and manufacture apparent consensus by leaving a real minority out of the frame.",
    },
    examples: [
      {
        title: { en: "The press and the literature, side by side" },
        summary: {
          en: "The two studies were run separately, by different authors, on different material, and neither set out to be compared with the other. Their windows overlap for ten years rather than matching: 1988 to 2002 for the newspapers, 1993 to 2003 for the papers. That is a real limitation and it is why the comparison is drawn as two bars from two samples rather than one dataset split two ways.",
        },
        provenance: {
          source:
            "Oreskes N. The scientific consensus on climate change. Science. 2004;306(5702):1686. Read at source: the 928 papers are the analysed denominator, sorted into six categories, one of which is rejection of the consensus. The printed 75 and 25 per cent recover 696 and 232 as whole numbers and the three counts sum to 928.",
          year: 2004,
          doi: "10.1126/science.1103618",
          url: "https://doi.org/10.1126/science.1103618",
        },
      },
    ],
  },

  share: {
    title: { en: "False balance, a reasoning trap." },
    explainer: {
      en: "Two experts, one on each side, is not a neutral way to cover a question. It is a statement that the field is split, and when it is not, the format has misled the audience without a single false sentence being printed. Before you accept a two-sided presentation, ask how the specialists actually divide. Airtime is not evidence.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Boykoff MT, Boykoff JM. Balance as bias: global warming and the US prestige press. Global Environmental Change. 2004;14(2):125-136. Figure 1 on page 129 gives n = 340 for articles addressing anthropogenic contribution, drawn from a 636-article sample (every sixth article from a random start, 1988 to 2002, across four newspapers). All four printed percentages recover whole numbers against 340 and the counts sum to 340: balanced 179 (52.65), dominant anthropogenic 120 (35.29), dominant sceptic 21 (6.18), exclusive anthropogenic 20 (5.88). Reading them against the 636 full sample, the obvious error here, recovers nothing. Paired with Oreskes N, Science 2004;306(5702):1686, doi 10.1126/science.1103618, for the literature.",
    year: 2004,
    doi: "10.1016/j.gloenvcha.2003.10.001",
    url: "https://doi.org/10.1016/j.gloenvcha.2003.10.001",
    note: {
      en: "This puzzle takes no position on climate science and does not need one: its claim is about a journalistic format, and the same format would distort coverage of any lopsided question in any direction. The four newspapers are named because the study names them, and anonymising a published content analysis would be its own small dishonesty. Two limits are stated rather than smoothed over. The windows overlap but do not match, 1988 to 2002 against 1993 to 2003, so these are two samples set side by side and not one dataset viewed twice, which is why the chart marks no winner. And the two measures are not the same measure: a paper rejecting the consensus and an article giving both sides equal weight are different acts, joined only by both treating the sceptical position as a live scientific option. The shared axis label says exactly that and claims nothing more.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/False_balance",
};
