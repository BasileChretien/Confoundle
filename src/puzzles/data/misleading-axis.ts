import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #25, misleading chart axes, on Pandey et al. (CHI 2015).
 *
 * Verified at source, from the published paper's Table 3 (p. 1476), not from a
 * summary. The authors' preprint (NYU School of Law Public Law & Legal Theory
 * Research Paper No. 15-03, SSRN 2566968) was diffed against the published ACM
 * version and the body text is identical, so there is no preprint-versus-final
 * discrepancy to worry about.
 *
 *   axis the normal way up   39 / 40 read the trend correctly  (97.5%)
 *   axis inverted             7 / 38 read the trend correctly  (18.4%)
 *
 * Both counts are printed as integers, which is why this source was chosen: the
 * puzzle can be authored as raw counts with every rate derived, which the
 * framing-effect puzzle could not do because Tversky and Kahneman print only
 * percentages.
 *
 * WHY THE HEDGE IS WRONG HERE, which is the deliberate decision this puzzle
 * turns on. The setup shows one arm only, so at first glance "there is no way
 * to tell" looks right, the way it genuinely is in the publication-bias puzzle.
 * It is not, because of the third answer option. Participants could say the
 * quantity improved, that it declined, or that they could not tell. A chart
 * that is merely hard produces hedging or a coin flip, so anything from about a
 * third to a half of readers land on the right answer by accident. Scoring 7 of
 * 38 is far BELOW what guessing would give, and below chance is not what
 * difficulty looks like: it is the signature of a chart that is legible and
 * pointing the wrong way. That deduction is available from the setup alone,
 * provided the framing states the three options, which it does. The reveal is
 * still doing real work rather than restating the setup, because it rules out
 * the two rival explanations the setup cannot: that the rise was slight (the
 * control arm read the same numbers correctly) and that these particular
 * readers were weak (they were drawn from the same pool, at random).
 *
 * THE COUNT THAT HAD TO BE RECONCILED. 7 correct plus 30 incorrect is 37, not
 * 38. The 38th participant chose "I do not know". That single response is not a
 * loose end to paper over, it is the crux: exactly one person in the inverted
 * condition hesitated, and thirty stated the opposite of the truth outright.
 *
 * NON-PARTISAN BY CONSTRUCTION, which is why this source beat the alternatives.
 * The stimulus charted access to safe drinking water over time in invented
 * places. No real country, no party, no contested science. Boykoff and Boykoff
 * 2004 has cleaner counts and was rejected because its subject makes one side
 * look uniquely foolish; the truncated-axis study by Correll et al. was
 * rejected partly because its worked example is a partisan news chart.
 */
export const misleadingAxis: Puzzle = {
  schemaVersion: 1,
  id: "misleading-axis-pandey-2015",
  slug: "which-way-is-up",
  category: "statistical-reasoning",
  reasoningSkill: "misleading-axis",
  difficulty: "medium",
  tags: ["everyday", "statistics", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Only 7 of the 38 people shown this chart read its trend correctly.",
    },
    framing: {
      en: "Researchers drew a chart of one quantity rising steadily over time, then redrew it with the vertical axis upside down, so that larger values sat lower on the page. The numbers themselves were untouched. They showed the upside-down version to 38 people recruited at random online, asked what the quantity had done over the period, and let them answer that it had improved, that it had declined, or that they could not tell. Seven of the 38 answered correctly.",
    },
    question: {
      en: "What does a score that low tell you about the chart?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Read the trend correctly" },
      higherIsBetter: true,
      groups: [
        {
          id: "inverted",
          label: { en: "Shown the chart with the axis upside down" },
          short: { en: "Upside down" },
        },
        {
          id: "normal",
          label: { en: "Shown the same numbers, axis the normal way up" },
          short: { en: "Normal" },
        },
      ],
      strata: [{ id: "all", label: { en: "People shown a chart" } }],
      observations: [
        { groupId: "inverted", stratumId: "all", numerator: 7, denominator: 38 },
        { groupId: "normal", stratumId: "all", numerator: 39, denominator: 40 },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["inverted"],
      caption: { en: "The upside-down version" },
    },
  },

  choices: [
    {
      id: "hard",
      label: { en: "It was a hard chart, and most people struggled with it" },
      sublabel: { en: "too fiddly to read" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "flat",
      label: { en: "The rise in the data was too slight to call" },
      sublabel: { en: "an honest near-tie" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "reversed",
      label: { en: "It read clearly, and what it said was backwards" },
      sublabel: { en: "legible, and wrong" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here: with "I could not tell"
      // on the table, a score this far below guessing already separates a
      // steering chart from a merely difficult one.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Drawn the normal way up, the same numbers were read correctly by 39 of 40.",
    },
    mechanismLabel: { en: "What the other 40 saw" },
    mechanismName: {
      en: "Nothing was wrong with the readers, or with the data",
    },
    explanation: {
      en: "Forty other people, recruited the same way and shown the identical numbers with the vertical axis the usual way up, read the trend correctly 39 times out of 40. So the rise was not slight and the readers were not weak. Look too at how the other 38 got it wrong: just one of them said they could not tell, and 30 stated flatly that the quantity had declined:",
    },
    body: {
      en: "That is the tell, and it is worth keeping. A chart that is merely hard makes people hesitate. They hedge, they split, they say they are not sure, and enough of them land on the right answer by accident that the score stays near what guessing would give. Scoring well below guessing is a different thing altogether, and it happens when a chart is perfectly legible and pointing the wrong way. Difficulty scatters answers. Steering lines them up.",
    },
    view: {
      kind: "aggregate",
      caption: { en: "Both versions of the same numbers" },
    },
  },

  lesson: {
    skillName: { en: "Misleading chart axes" },
    takeaway: {
      en: "An axis is a claim, not a container. Change how it runs and you do not make the chart harder to read, you change what a careful reader confidently concludes from it. Read the axis before you read the shape.",
    },
    body: {
      en: "Note what this does and does not establish. It is one chart, one distortion and 78 paid online workers, not a representative public, and the chart was built for the experiment rather than lifted from a newspaper. What it does settle is the part people find hardest to believe: the effect is enormous, and it does not depend on the reader being careless or innumerate. The same readers, given the same numbers drawn honestly, were right almost every time.",
    },
    howItWorks: {
      en: "Up means more. That mapping is fixed long before anyone reads a label, and it is doing the work of understanding a chart at a speed conscious checking cannot match: you take in the shape of a line in a single glance and the axis text a beat later, if at all. Invert the axis and the two disagree, and the glance wins. This is why the failure is so lopsided. It is not that people find the chart confusing and give up; it is that they read it fluently and arrive somewhere false, with no sense that anything needed checking. That is also why the effect survives expertise. Knowing about the trick does not stop the glance from happening, it only gives you a reason to go back and check afterwards. Axis distortions come in more than one flavour and they fail differently, which is worth keeping straight. Inverting an axis reverses the message: the reader concludes the opposite of the truth. Cutting the bottom off an axis, so bars start at some value well above zero instead of at zero, does not reverse anything, it exaggerates: a small real difference fills most of the frame and reads as a large one. The same study measured that second effect separately and found it substantial but milder, which fits, because an exaggerated gap is still a gap in the right direction. Stretching or squashing the shape of a line chart does the same kind of thing to a rate of change, making a gentle climb look like a spike or a spike look gentle. The defence is a habit rather than a skill, and it takes about two seconds. Before you look at the shape, look at the axis: find which way it runs, find where it starts, and check whether the starting point is zero. If the chart has no axis labels at all, that is the finding. And be most careful with the charts that confirm what you already think, because those are the ones you will read at a glance and never go back to.",
    },
    examples: [
      {
        title: { en: "The gentler trick in the same experiment" },
        summary: {
          en: "The same researchers tested cutting the bottom off an axis rather than flipping it. Readers saw a bar chart comparing two places, either with the axis starting at zero or with it starting high enough that a small real difference filled the frame, and rated how much bigger one was than the other on a scale of 1 to 5. The group given the truncated axis averaged 2.77; the group given the honest one averaged 1.45. The gap held up statistically, but notice how it differs from the inverted axis: nobody was led to the opposite conclusion, only to a wildly inflated sense of how big the difference was. Reversal and exaggeration are two distinct failures, and the second is far more common in the wild because it can happen entirely by accident.",
        },
        provenance: {
          source:
            "Pandey AV, Rall K, Satterthwaite ML, Nov O, Bertini E. How deceptive are deceptive visualizations?: an empirical analysis of common distortion techniques. In: Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems (CHI '15). New York: ACM; 2015:1469-1478. Tables 1 and 2 (p. 1475): 43 participants saw the truncated-axis bar chart and 37 the control, with mean responses of 2.77 (95% CI 2.26 to 3.28) and 1.45 (95% CI 1.27 to 1.62) on a 1 to 5 scale; one-tailed Mann-Whitney U = 1144, Z = 3.36, p = 0.0003, r = 0.37.",
          year: 2015,
          doi: "10.1145/2702123.2702608",
          url: "https://dl.acm.org/doi/10.1145/2702123.2702608",
        },
      },
    ],
  },

  share: {
    title: { en: "Misleading chart axes, a reasoning trap." },
    explainer: {
      en: "You do not really read a chart, you glance at it. Up means more, and that lands before the axis labels do. So when researchers took a chart of something steadily improving and simply turned the vertical axis upside down, the people who saw it did not get confused and did not give up: 30 of 38 confidently reported the opposite of what the numbers said, and exactly one admitted to being unsure. Shown the same numbers drawn the normal way up, 39 of 40 got it right. Nothing about the data changed, and nothing about the readers changed. Before you read the shape of a chart, spend two seconds on the axis: which way does it run, and where does it start?",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Pandey AV, Rall K, Satterthwaite ML, Nov O, Bertini E. How deceptive are deceptive visualizations?: an empirical analysis of common distortion techniques. In: Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems (CHI '15). New York: ACM; 2015:1469-1478, Table 3 (p. 1476). Of 40 people shown a line-area chart with a normal vertical axis, 39 read the trend correctly and 1 did not; of 38 shown the same data with the axis inverted, 7 read it correctly, 30 concluded the opposite, and 1 said they could not tell.",
    year: 2015,
    doi: "10.1145/2702123.2702608",
    url: "https://dl.acm.org/doi/10.1145/2702123.2702608",
    note: {
      en: "A between-subjects experiment run on Amazon Mechanical Turk with workers who reported a United States location and had a prior task approval rate of 99 percent or better. Eighty people were recruited for this arm and 78 passed the attention check, leaving groups of 40 and 38. The chart plotted access to safe drinking water over time in invented places, so the stimulus carries no real country, party or contested science; the true trend was an improvement, and the inverted axis gave the impression of a decline. The difference was tested with the Freeman-Halton extension of Fisher's exact test, which is the version for a table with more than two response categories, at p < 0.0001. Two slips in the paper are worth flagging, because both trip a quick reader. Table 3 prints the single uncertain response in the inverted-axis group as 0.02 percent, where 1 of 38 is 2.63 percent, which is also what makes that row sum to 100. And the discussion section restates the result with the two conditions swapped and the correct percentages labelled as incorrect. The table and the results text agree with each other, and this puzzle follows them.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Misleading_graph",
};
