import type { Puzzle } from "../schema";

/**
 * Puzzle #49, threshold bunching, via Allen, Dechow, Pope and Wu (2017).
 *
 * NEW SHAPE, `bunching`. The lesson is a step in a curve at one instant, and
 * nothing in the deck could carry that. `distribution` exists to say a mean
 * describes a minority and its guard requires it; `dose` carries a curve but
 * its points are doses administered, not bins of a measured outcome, and it has
 * no line that matters. See the block comment in `schema.ts`.
 *
 * WHY THIS AND NOT AN A&E TARGET. `docs/lesson-backlog.md` entry 8 wanted
 * Goodhart with counts. The best paper for it, Eatock, Cooke and Young on the
 * four-hour A&E target, prints only percentages to two decimal places and its
 * decisive figure is an untabulated chart, so it was read and refused. This one
 * prints counts, and its table reconciles nine ways.
 *
 * THE COMMIT BEAT ASKS A SIZE, AND SAYS SO. Two of the four bands point the
 * same way (down), which is the failure `docs/hedge-audit.md` exists to catch.
 * The framing therefore states outright that the fall is not in question and
 * that the question is how big the step is, and the bands are numerically
 * disjoint. Same remedy as `statistical-power`.
 */
export const thresholdBunching: Puzzle = {
  schemaVersion: 1,
  id: "just-under-the-line",
  slug: "just-under-the-line",
  category: "statistical-reasoning",
  reasoningSkill: "threshold-bunching",
  difficulty: "medium",
  tags: ["everyday", "psychology", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Nearly ten million marathon finishes, counted minute by minute.",
    },
    framing: {
      en: "Every one of these finishes was timed by a chip on the runner's shoe, so they are measured to the second rather than remembered afterwards. The bars below count how many of 9,789,093 finishers crossed the line in each one-minute bin as the clock ran towards four hours. One thing you need to know before you answer: four hours is the commonest time goal in the sport. The question is not whether the count falls once the clock passes it, because the tail of any distribution falls. The question is how big the step is at that one instant.",
    },
    question: {
      en: "The next bar is the minute beginning at four hours exactly. Roughly how many finishers are in it?",
    },
    data: {
      type: "bunching",
      label: { en: "Marathon finishers by minute, approaching four hours" },
      metricLabel: { en: "Finishers in each one-minute bin" },
      itemLabel: { en: "One minute per bar" },
      thresholdLabel: { en: "The four-hour mark falls between these two bars" },
      thresholdNote: {
        en: "Nothing about running changes at four hours. It is a number people chose to care about.",
      },
      dropLabel: {
        en: "{count} fewer, from one minute to the next",
      },
      bins: [
        { id: "357", label: { en: "3:57" }, count: 100294, past: false },
        { id: "358", label: { en: "3:58" }, count: 103018, past: false },
        { id: "359", label: { en: "3:59" }, count: 97012, past: false },
        { id: "400", label: { en: "4:00" }, count: 74968, past: true },
        { id: "401", label: { en: "4:01" }, count: 69648, past: true },
        { id: "402", label: { en: "4:02" }, count: 67861, past: true },
      ],
    },
    initialView: {
      kind: "approaching",
      groupIds: ["357", "358", "359"],
      caption: { en: "The three minutes before four hours" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About the same, near 95,000" },
      sublabel: { en: "one minute is much like the next" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The smooth-curve reading. The three bars shown are already easing
      // down, so continuing that slope is the answer the setup invites.
      id: "little-lower",
      label: { en: "A little lower, around 90,000" },
      sublabel: { en: "the curve was already easing down" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "far-lower",
      label: { en: "Far lower, around 75,000" },
      sublabel: { en: "a step, not a slope" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "higher",
      label: { en: "Higher. Four hours is where the pack lands" },
      sublabel: { en: "the popular target" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "97,012 in the minute before. 74,968 in the minute after." },
    mechanismLabel: { en: "Across the line" },
    mechanismName: {
      en: "An arbitrary line, and everyone piling up on the good side of it",
    },
    explanation: {
      en: "22,044 finishers vanish from one minute to the next. Nothing about a marathon changes at four hours: the course is the same, the runners are the same, the weather is the same. What changes is that a large number of people decided in advance that four hours was the number, and near the end of the race they could still do something about it. The ones who were going to come in a little over four hours sped up. The step is what their effort looks like when you count it.",
    },
    body: {
      en: "The same shape appears at every round number the authors tested, which is what rules out a quirk of this particular one. And the two ways of ranking those spikes disagree, which is worth sitting with. Four hours displaces the most people, 48,230 runners pulled into the four minutes before it. But three hours pulls the hardest: 24.2 per cent more finishers than the trend predicts, against 13.0 per cent at four hours. The biggest pile and the strongest pull are not at the same line. The authors also went looking for duller explanations and did not find them. Qualifying for the Boston Marathon happens at round numbers too, but the three-hour mark has not been a qualifying time since 1989, and excluding everyone whose age and sex made a round number a qualifying time barely moves the estimates. Pacesetters cannot explain it either, since runners bunching just under four hours on their own chip time crossed the line at widely scattered clock times, so they were not running together.",
    },
    view: { kind: "acrossline" },
  },

  lesson: {
    skillName: { en: "Threshold bunching" },
    takeaway: {
      en: "Draw a line anywhere and people will pile up just on the good side of it. Counts taken either side of that line stop being a measure of how people did and start being a measure of how much the line mattered.",
    },
    body: {
      en: "This is the mechanism behind the complaint that a measure stops being a good measure once it becomes a target. The usual version of that complaint is about cheating, and cheating does happen, but the marathon data shows the effect needs nothing so deliberate. Nobody falsified a time. Nine million people simply ran, and a few tens of thousands of them found something left in the last mile because the number they had in their head was about to slip away. The distribution came out with a step in it. Any threshold that people can see and still act on will do this: a pass mark, a waiting-time target, a sales quota, a deadline for a paper.",
    },
    howItWorks: {
      en: "The practical move is to distrust any statistic that is defined by a threshold, and to ask what the distribution looks like within a whisker of it. If there is a spike immediately on the good side and a hole immediately on the bad side, then the headline proportion is partly a record of effort aimed at the line rather than of the thing the line was meant to measure. Two consequences follow and both matter. First, the people just inside the line and the people just outside it are not different in the way the line implies; they are mostly the same people, sorted by how hard they pushed at the end. Second, comparing two groups on a threshold statistic compares how much each cared about the threshold as much as how well each performed. That is why moving a target usually moves the numbers before it moves anything real, and why a pass rate that improves without the distribution changing shape anywhere else is a warning rather than a success.",
    },
    examples: [
      {
        title: { en: "Where the pull is strongest, and where the crowd is biggest" },
        summary: {
          en: "Every round number the authors tested shows a pile, and the strength of it is not uniform. Comparing the four minutes before each mark against a fitted trend: 24.2 per cent excess at three hours, 10.8 at three thirty, 13.0 at four hours, 4.5 at four thirty, 5.5 at five, 2.1 at five thirty, 3.2 at six. The hour and half-hour marks pull harder than the ten-minute marks between them, and 3:20 barely registers at 1.1 per cent. In raw numbers the order is different again, because most people finish nearer four hours than three: the four-hour mark displaces 48,230 runners against 17,685 at three hours. Which line matters most depends on whether you are asking who cares hardest or how many people are involved, and those have different answers here.",
        },
        provenance: {
          source:
            "Allen EJ, Dechow PM, Pope DG, Wu G. Reference-Dependent Preferences: Evidence from Marathon Runners. Management Science. 2017;63(6):1657-1672. Table 2, page 1663.",
          year: 2017,
          doi: "10.1287/mnsc.2015.2417",
          url: "https://doi.org/10.1287/mnsc.2015.2417",
        },
      },
    ],
  },

  share: {
    title: { en: "Threshold bunching, a reasoning trap." },
    explainer: {
      en: "97,012 marathon runners finished in the minute before four hours and 74,968 in the minute after. Nothing about running changes at four hours; it is just the number people had in their heads. Draw a line anywhere and people pile up on the good side of it, which means any statistic defined by a threshold is partly a record of how much the threshold mattered. When you see one, look at the distribution within a whisker of the line.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Allen EJ, Dechow PM, Pope DG, Wu G. Reference-Dependent Preferences: Evidence from Marathon Runners. Management Science. 2017;63(6):1657-1672. n = 9,789,093 marathon finishes, 1970 to 2013, from 6,888 marathon-years. The six one-minute counts are printed in the text on page 1661; the round-number comparison in the deep dive is Table 2 on page 1663.",
    year: 2017,
    doi: "10.1287/mnsc.2015.2417",
    url: "https://doi.org/10.1287/mnsc.2015.2417",
    note: {
      en: "The six counts this puzzle is built on are printed as counts, and were read twice: once off the rendered page and once against the file's own text layer, which agreed exactly. Table 2 then reconciles nine ways, which is what gives confidence in the reading. Each of its nine rows recovers its own printed excess percentage from the actual and counterfactual finisher counts, and two claims made in the surrounding prose fall out of the table without having been used to derive it: that the largest displacement is 48,230 runners at four hours, and that the largest proportional excess, 24.2 per cent, is at three hours. One discrepancy is worth recording rather than smoothing over. The paper states there are 29.5 per cent more finishers in the minute before four hours than in the minute after, but its own printed counts give 29.4 per cent (97,012 against 74,968). The gap is one part in a thousand and does not touch the counts, which are what this puzzle authors and from which every figure shown is derived; the deck derives 29.4 and does not repeat the printed 29.5. Note also what Table 2's counterfactual is: a fitted quintic polynomial, not an observation. That is why the puzzle's chart is built from the raw one-minute counts and the fitted comparison appears only in the deep dive, where it is described as a trend rather than as a headcount.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Bunching_(economics)",
};
