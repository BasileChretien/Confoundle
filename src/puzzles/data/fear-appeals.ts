import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #62, weaker is not the same as backfired, via Tannenbaum et al. (2015).
 *
 * NEW SHAPE, `forest`, and it had to be. The lesson is entirely about WHICH SIDE
 * OF ZERO a pooled estimate falls on, and no existing shape can put more than
 * one interval on an axis. `interval` derives a gap from published poll shares,
 * so its arithmetic is poll-specific; `effect` draws exactly one estimate and
 * measures it against a reference quantity it is a slice of. Neither can line up
 * three pooled estimates so a reader sees that the third is SHORT rather than
 * on the far side of the line.
 *
 * THE PAPER NAMES THE REASONING MOVE, which is what made this authorable rather
 * than a lesson imposed on a source. Verbatim from the running text: "The strong
 * hypothesis is that fear appeals without efficacy statements will produce
 * negative effects (i.e., will backfire). The weak hypothesis is that fear
 * appeals without efficacy statements will produce weaker (i.e., less positive
 * or null) effects." And the verdict: "The results clearly support the weak
 * efficacy hypothesis and disconfirm the strong efficacy hypothesis."
 *
 * THE COMMIT BEAT IS ANSWERABLE BY ARITHMETIC, which is what keeps it clear of
 * the hedge audit. The framing gives the pooled estimate (0.29 over 248 samples)
 * and one subgroup (0.43 over 92). A reader who takes those two seriously can
 * see that the remaining 154 must sit BELOW the pooled figure, and cannot sit at
 * or below zero, because a negative subgroup that size would drag a pooled 0.29
 * to roughly nothing. So the four bands are not four guesses at a magnitude;
 * three of them are arithmetically incompatible with what the setup prints.
 *
 * ESTIMATES ARE AUTHORED AS PUBLISHED. Table 5 prints random-effects pooled
 * estimates whose weights are not study counts, so the k-weighted reconciliation
 * in the test is a consistency check and never an identity, and the note says so.
 *
 * NOTHING RESTS ON THE CURVILINEAR TEST. Moderate versus high depicted fear is
 * d = -.05, 95% CI [-.34, .24], a wide null the paper itself says "should be
 * confirmed in future research". It appears in the deep dive as a second
 * instance of the same misreading and carries no weight on the card.
 */
export const fearAppeals: Puzzle = {
  schemaVersion: 1,
  id: "nobody-got-worse",
  slug: "nobody-got-worse",
  category: "statistical-reasoning",
  reasoningSkill: "weaker-is-not-backfire",
  difficulty: "medium",
  tags: ["research", "statistics", "psychology", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Frighten people without telling them what to do, and the warning turns on you. Everyone knows this one.",
    },
    framing: {
      en: "A fear appeal is a message that tries to move you by showing you the harm coming if you carry on: the tar in the lung, the wreck at the roadside. There is a long-standing objection to them, and it is not that they are unkind. It is that they are supposed to be counterproductive. Frighten someone without also telling them what they can do about it, the argument runs, and they will shut the message out and end up less likely to act than if you had said nothing at all. A 2015 review gathered every test it could find: 127 articles, 248 separate samples, 27,372 people, on smoking, drink, driving, dental care and more. Effects are in standard deviations, where zero means the message changed nothing, above zero means it worked, and below zero means it backfired. Across all 248 samples the average is 0.29. The review then split them by whether the message included advice on what to do. The 92 samples that did include it average 0.43. The other 154 did not. Where do they fall?",
    },
    question: {
      en: "The 154 samples that frightened people without telling them what to do: where do they land?",
    },
    data: {
      type: "forest",
      label: { en: "Does a warning work, and does it need to come with advice?" },
      unit: {
        en: "Standardised mean difference against the comparison group, random-effects pooled.",
      },
      metricLabel: {
        en: "The number beside each row is how many independent samples it pools.",
      },
      nullValue: 0,
      nullLabel: { en: "Changed nothing" },
      worseLabel: { en: "Backfired, worse than saying nothing" },
      betterLabel: { en: "Worked" },
      axisMin: -0.45,
      axisMax: 0.7,
      /**
       * THE TWO DRAWN AT THE SETUP LEAD THIS ARRAY. `ForestView` colours a row
       * by its index into the array it is handed, and it is handed the
       * RESTRICTED data, so a row that changes position when the setup filters
       * also changes colour between the beats.
       */
      rows: [
        {
          id: "overall",
          label: { en: "Every sample in the review" },
          short: { en: "All 248" },
          estimate: 0.29,
          ciLow: 0.22,
          ciHigh: 0.35,
          k: 248,
          isPooled: true,
        },
        {
          id: "with-advice",
          label: { en: "Messages that included advice on what to do" },
          short: { en: "With advice" },
          estimate: 0.43,
          ciLow: 0.31,
          ciHigh: 0.55,
          k: 92,
        },
        {
          id: "without-advice",
          label: { en: "Messages that gave the fear and no advice" },
          short: { en: "No advice" },
          estimate: 0.21,
          ciLow: 0.13,
          ciHigh: 0.29,
          k: 154,
        },
      ],
    },
    initialView: {
      kind: "whatisknown",
      groupIds: ["overall", "with-advice"],
      caption: { en: "The whole review, and the half that came with advice" },
    },
  },

  choices: [
    {
      // The famous objection, and the one most people have heard as settled
      // fact. It is also the paper's "strong efficacy hypothesis", tested and
      // marked Not supported in its Table 1.
      id: "backfired",
      label: {
        en: "Below zero. Fear with no way out makes people less likely to act than no message at all",
      },
      sublabel: { en: "the warning turns on you" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "nothing",
      label: { en: "At zero. The fear cancels out and the message achieves nothing" },
      sublabel: { en: "wasted breath, but harmless" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "weaker",
      label: {
        en: "Around 0.21. Clearly above zero, but roughly half the effect of a message with advice",
      },
      sublabel: { en: "it still works, it just works less" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "same",
      label: { en: "Around 0.43 as well. The advice makes no measurable difference" },
      sublabel: { en: "the fear is doing all the work" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "0.21, and the interval runs 0.13 to 0.29. It never touches zero.",
    },
    mechanismLabel: { en: "And the row everyone assumed was negative" },
    mechanismName: { en: "An effect that shrinks has not changed sign" },
    explanation: {
      en: "The arithmetic was in the setup all along. If 92 samples average 0.43 and the whole 248 average 0.29, the remaining 154 have to sit below 0.29, and they cannot sit anywhere near zero: a subgroup that size sitting at nothing would drag the overall figure to roughly half what the review printed, and a negative one would drag it to almost nothing. The only place the missing row can be is low, positive and clear of the line, which is exactly where it is. The review states the two rival predictions explicitly. The strong version of the objection says a fear appeal without advice produces negative effects, that is, backfires. The weak version says it simply produces a smaller effect. Those are different claims and the data separate them cleanly: the results support the weak version and disconfirm the strong one. Advice is worth having, and it roughly doubles the effect. What it is not is the difference between helping and harming.",
    },
    body: {
      en: "The review's own summary of the whole literature is blunter still: there are no identified circumstances under which fear appeals backfire and lead to undesirable outcomes. Not one of the conditions the various theories nominate turned out to produce a negative effect that held up. The same thing happened to the other famous version of this claim, the inverted U, which says that beyond some point more fear is worse than moderate fear. Comparing moderate against high depicted fear gives -0.05 with an interval from -0.34 to 0.24, which is a wide nothing rather than a demonstration of harm, and the paper says outright that the conclusion should be confirmed by further research. That is worth being careful about in both directions. A wide interval straddling zero is not evidence of harm, and it is not evidence of safety either; it is a shrug. The result this card rests on is not a shrug, because 0.13 to 0.29 excludes zero along its whole length. Note also what none of this settles: whether a given campaign is a good idea. An effect of 0.21 is real and small, and the review measures attitudes, intentions and behaviour together rather than any one outcome you might care about. What it forecloses is one specific argument, the one that says the frightening message without a remedy is worse than silence.",
    },
    view: {
      kind: "themissingrow",
      caption: { en: "All three rows, on the same line" },
    },
  },

  lesson: {
    skillName: { en: "Weaker is not the same as backfired" },
    takeaway: {
      en: "An effect that gets smaller in some condition has not reversed in that condition. Less help is still help, and treating a shrunken benefit as a harm reverses the sign of the advice you give.",
    },
    body: {
      en: "This is a sign error dressed as a judgement call, and it is astonishingly common once you start looking. A treatment works less well in older patients, and the write-up says it is unsuitable for them. A campaign moves young men less than it moves everyone else, and the conclusion is that it puts them off. A teaching method helps weaker students least, and it gets called harmful to weaker students. In each case the finding is a smaller positive number and the claim made from it is a negative one. The step is invisible because both readings agree on the direction of the comparison. Yes, the effect is lower in that group; everyone can see it. What gets skipped is that the comparison is between two groups while the claim is about one group against doing nothing, and those are different baselines. The distance from 0.43 to 0.21 is real. The distance from 0.21 to zero is also real, and it points the other way. What makes the error expensive is that it changes what you should do. If the message without advice backfires, you should stop sending it. If it merely works less well, you should keep sending it and add the advice. Same data, opposite instruction, and the whole difference is a sign nobody checked.",
    },
    howItWorks: {
      en: "The habit is small: when you read that something is worse for a group, ask worse than what. If the answer is worse than for another group, you have learned that the effect varies, and nothing at all about whether it is harmful. To get to harm you need the comparison against doing nothing, and you need it to clear zero on its own. On a figure this is one glance, which is why the figure is worth asking for: an interval that sits entirely on one side of the line is a different object from one that straddles it, and both are different from one that is simply shorter than its neighbour. Be equally careful with the mirror image, because the reflex to defend a favoured intervention produces the same error upside down. A point estimate below the line with an interval crossing it does not show safety and does not show harm; it shows that the study could not tell, and the honest report of it says so. Where this bites hardest is in subgroup findings, which arrive already sorted into who was helped and who was hurt when the underlying numbers usually say helped a lot and helped a little. If you take one thing, take the question. Worse than what?",
    },
  },

  share: {
    title: { en: "Weaker is not the same as backfired, a reasoning trap." },
    explainer: {
      en: "It is widely believed that frightening people without telling them what to do makes them less likely to act than saying nothing. A review of 248 samples and 27,372 people put it at 0.21 standard deviations, with an interval from 0.13 to 0.29. That is about half the effect of a message that includes advice, and it never touches zero. The advice roughly doubles the effect. It is not the difference between helping and harming.",
    },
    captions: {
      competitive: { en: "Asked worse than what." },
      selfDeprecating: { en: "I read a smaller number as a negative one." },
    },
  },

  provenance: {
    source:
      "Tannenbaum MB, Hepler J, Zimmerman RS, Saul L, Jacobs S, Wilson K, Albarracin D. Appealing to fear: a meta-analysis of fear appeal effectiveness and theories. Psychological Bulletin. 2015;141(6):1178-1204. PMID 26501228, PMCID PMC5789790. Read at source from the Europe PMC rendering of the author manuscript. Abstract: 127 articles (9% unpublished), 248 independent samples, N total 27,372. Results text: \"The average weighted effect size comparing outcomes for treatment to comparison groups was d = 0.29 with a 95% CI of [0.22, 0.35].\" Table 5, message content, efficacy statements: included d = .43, 95% CI [.31, .55], k = 92; excluded d = .21, 95% CI [.13, .29], k = 154. Running text on the rival predictions: \"The strong hypothesis is that fear appeals without efficacy statements will produce negative effects (i.e., will backfire). The weak hypothesis is that fear appeals without efficacy statements will produce weaker (i.e., less positive or null) effects relative to fear appeals with efficacy statements\", and \"The results clearly support the weak efficacy hypothesis and disconfirm the strong efficacy hypothesis.\" The sign convention drawn on the figure is the paper's own: \"a positive effect size indicates the fear appeal worked, whereas a negative effect size indicates the fear appeal backfired.\" Abstract conclusion (c): \"there are no identified circumstances under which they backfire and lead to undesirable outcomes.\" The curvilinear comparison quoted in the deep dive, moderate versus high depicted fear, is d = -.05, 95% CI [-.34, .24].",
    year: 2015,
    doi: "10.1037/a0039729",
    url: "https://doi.org/10.1037/a0039729",
    note: {
      en: "Five things. First, the reconciliation, and it holds without being an identity. The two efficacy subgroups carry 92 and 154 samples, summing to 246 against a total k of 248, so two samples are unclassified on efficacy and the card does not pretend otherwise. Weighting the two subgroups by sample count gives (92 x 0.43 + 154 x 0.21) / 246 = 0.292, against a printed overall of 0.29. That is close enough to confirm the rows belong to one another and is deliberately NOT presented as exact, because these are random-effects pooled estimates whose weights are inverse variances rather than sample counts. The commit beat rests only on the direction that arithmetic licenses, which is that the missing row must be low and cannot be at or below zero, and not on hitting 0.21 on the nose. Second, on reading the paper. It is an NIH author manuscript, free to read but not open-access licensed, so the Europe PMC full-text REST endpoint returns 404 and the PMC copy sits behind a bot check that was not worked around. The figures here were transcribed from the Europe PMC full text in a browser, table and running text alike. Third, the effect size pools attitudes, intentions and behaviours into one composite per sample, which is the paper's primary analysis. Table 6 gives them separately, and the without-advice row is weaker on behaviours specifically (d = .14, 95% CI [-.05, .33], k = 38), an interval that does include zero. That does not disturb the claim on this card, which is about the composite the review headlines, but anyone quoting the result for behaviour alone should quote that interval instead, and the card does not. Fourth, what the puzzle does not claim: that fear appeals are a good idea, that 0.21 is a large effect, or that the newer literature has not moved. It forecloses one specific argument, the one asserting that a frightening message without a remedy is worse than silence. Fifth, the curvilinear test is mentioned in the deep dive and load-bears nothing. Its interval, -.34 to .24, is wide and straddles zero, and the paper says the conclusion should be confirmed in future research. Treating that as proof of no harm would be the same error this card is about, pointed the other way, so the deep dive says it is a shrug rather than a finding.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Fear_appeal",
};
