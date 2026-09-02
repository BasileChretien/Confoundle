import type { Puzzle } from "../schema.ts";

/**
 * Two A&E departments, one imposed target, and opposite departments behind an
 * identical headline.
 *
 * England's four-hour A&E target requires 95 per cent of attendances to be seen,
 * treated and discharged or admitted within four hours. Eatock, Cooke and Young
 * took two departments matched on age and arrival profile in 2014/15. Both pass,
 * and they pass by almost exactly the same margin: 4.68 per cent of Hospital A's
 * attendances breached and 4.49 per cent of Hospital B's, so 95.32 and 95.51 per
 * cent were inside the four hours against a target of 95.
 *
 * Inside the window they are not remotely alike. 20.83 per cent of Hospital A's
 * patients spend between three hours forty and four hours in the department,
 * against 8.56 per cent of Hospital B's. One department is running a fifth of
 * everyone who walks in through the last twenty minutes before the deadline;
 * the other is not.
 *
 * WHY THE BARS STACK HONESTLY. The axis is everyone who came through the door,
 * ordered by how long they took. Everybody who breached is past four hours, and
 * the three-forty-to-four group is immediately before them, so the printed
 * shares partition the axis without any assumption: 74.49, 20.83 and 4.68 for
 * Hospital A. Nothing is inferred about the shape of the rest of the
 * distribution, and nothing is read off the paper's Fig 2, which is a chart and
 * is never tabulated.
 *
 * WHAT IS DELIBERATELY NOT CLAIMED. The paper prints that 15.82 per cent of
 * Hospital A's patients leave in the final ten minutes and prints no
 * counterpart for Hospital B, so this puzzle says nothing about the final ten
 * minutes at either hospital. It also does not claim the departments differ in
 * quality of care, which the paper does not measure; the claim is only that one
 * summary number cannot tell them apart and the distribution behind it can.
 */
export const campbellsLaw: Puzzle = {
  schemaVersion: 1,
  id: "campbells-law-four-hour-target",
  slug: "both-hit-the-target",
  category: "measurement",
  reasoningSkill: "campbells-law",
  difficulty: "medium",
  tags: ["everyday", "clinical", "statistics", "business"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Two emergency departments are held to the same rule: 95 out of every 100 patients seen inside four hours. Both pass, and by almost exactly the same margin.",
    },
    framing: {
      en: "The two departments were matched on the age of their patients and on when those patients arrived. This is the number that gets published, the number a regulator reads, and the number a manager is judged on. On it, the two are indistinguishable.",
    },
    question: {
      en: "Both passed, and by almost the same margin. What does that tell you about how the two departments run?",
    },
    data: {
      type: "target",
      label: { en: "Time in the emergency department" },
      targetLabel: { en: "The target: 95 per cent inside four hours" },
      targetPercent: 95,
      withinLabel: { en: "Seen inside four hours" },
      breachedLabel: { en: "Missed the four hours" },
      lateLabel: { en: "Left in the last twenty minutes" },
      percentNote: {
        en: "Published shares of all attendances, to two decimal places. The source prints no patient counts.",
      },
      performers: [
        {
          id: "a",
          label: { en: "Hospital A" },
          n: 148999,
          breachPercent: 4.68,
          lateSharePercent: 20.83,
        },
        {
          id: "b",
          label: { en: "Hospital B" },
          n: 108698,
          breachPercent: 4.49,
          lateSharePercent: 8.56,
        },
      ],
    },
    initialView: { kind: "oncompliance" },
  },

  choices: [
    {
      // The reading the metric invites, and the reason it was imposed. Wrong,
      // because an identical summary is not an identical distribution.
      id: "alike",
      label: { en: "They are running much the same way" },
      sublabel: { en: "same rule, same result" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      // A reasonable suspicion, and still wrong: neither department broke the
      // rule, and the lesson is about pressure rather than dishonesty.
      id: "cheating",
      label: { en: "One of them must be breaking the rules" },
      sublabel: { en: "a matching number is too neat" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "faster",
      label: { en: "Hospital A treats people faster" },
      sublabel: { en: "the larger department, better drilled" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, and here it is right. The compliance figure genuinely does
      // not separate two departments that turn out to work very differently,
      // so the surprise is carried entirely by the reveal. See the note in
      // docs/hedge-audit.md: exactly one band may say "you cannot tell".
      id: "cannot-tell",
      label: { en: "There is no way to tell from this" },
      sublabel: { en: "the figure does not separate them" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "One of them moves a fifth of everybody in the last twenty minutes.",
    },
    mechanismLabel: { en: "The same bars, cut again" },
    mechanismName: { en: "The target became the thing being managed" },
    explanation: {
      en: "Both bars are the same length and both clear the line, because that is the only number the rule looks at. Cut the compliant part again, at twenty minutes before the deadline, and Hospital A has 20.83 per cent of everyone who walked in packed into that last stretch against Hospital B's 8.56 per cent. Nothing was recalculated between the two pictures. The second cut was available in the same published figures the whole time, and nobody reports it.",
    },
    body: {
      en: "This is what it looks like when a measure becomes a target. The rule asks one question, whether a patient was dealt with inside four hours, so effort flows to that question and to nowhere else. A department can satisfy it by being fast, or by being organised around the deadline, and the published figure cannot distinguish those. The authors' point is exactly that: the difference is invisible if you monitor the single existing metric, and it is plain the moment you look at where inside the window people actually leave. Note what this does not say. Neither department broke the rule, and nothing here measures whether either treated anyone badly. The claim is narrower and more useful: the number that both of them hit describes neither of them.",
    },
    view: { kind: "insidewindow" },
  },

  lesson: {
    skillName: { en: "When a measure becomes a target" },
    takeaway: {
      en: "Any number used to judge people stops being a good description of what they do, because effort moves to the number. Two performers can hit the same target with completely different behaviour behind it, so ask what the measure would miss before you trust it to compare anyone.",
    },
    body: {
      en: "Campbell's law is the general form: the more a quantitative indicator is used to make decisions, the more it will be distorted and the more it will distort what it was meant to monitor. It is not about cheating. Nobody in this study broke a rule, and a department that reorganises itself around a deadline is doing what it was asked to do. That is the trouble. The indicator gets what it asked for, and the thing it stood in for quietly comes apart, so the people reading the indicator learn less and less about the world as it gets more and more important.",
    },
    howItWorks: {
      en: "A target picks one cut through a distribution and makes it the only cut that pays. Everything either side of that cut becomes invisible, and everything that can be moved across it becomes valuable. So the distribution reshapes itself around the line: work that would have finished comfortably early is no longer rewarded for being early, and work that would have finished slightly late is worth almost any effort to pull back. The summary statistic stays flat while the shape underneath it changes completely, which is precisely why it keeps looking like a stable, reliable measure. The practical defence has two parts and neither is complicated. First, before trusting a target, ask what distribution sits behind it and whether anybody ever looks at that distribution. Second, treat a number that has been stable for years under pressure as suspicious rather than reassuring, because stability under pressure is what a gamed indicator looks like. If the only evidence that something is working is the measure that everybody is paid to move, there is no evidence that it is working.",
    },
    examples: [
      {
        title: { en: "The measure that stops measuring, in the original" },
        summary: {
          en: "Campbell set the law out in a paper on planned social change, arguing that the more any quantitative social indicator is used for social decision making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it was intended to monitor. He worked it through on indicators as different as crime statistics and school test scores, and the argument is about the pressure the indicator creates rather than about any dishonesty in the people measured.",
        },
        provenance: {
          source:
            "Campbell DT. Assessing the impact of planned social change. Evaluation and Program Planning 1979;2(1):67-90, reprinted from the 1976 Occasional Paper Series, Dartmouth College Public Affairs Center",
          year: 1979,
          doi: "10.1016/0149-7189(79)90048-X",
          url: "https://www.sciencedirect.com/science/article/abs/pii/014971897990048X",
        },
      },
    ],
  },

  share: {
    title: { en: "When a measure becomes a target, a reasoning trap." },
    explainer: {
      en: "Two emergency departments both met the same four-hour target, within a fifth of a percentage point of each other. Behind that identical number, one was moving a fifth of all its patients out in the last twenty minutes before the deadline and the other was moving 8.56 per cent. The target asks one question, so effort goes to that question, and the figure both of them hit describes neither of them. Before trusting a number used to judge people, ask what the distribution behind it looks like and whether anyone ever checks.",
    },
    captions: {
      competitive: {
        en: "They both hit the target. Only one of them was aiming at it.",
      },
      selfDeprecating: {
        en: "I read the compliance figure and thought I knew the department.",
      },
    },
  },

  provenance: {
    source:
      "Eatock J, Cooke M, Young TP. Performing or not performing: what's in a target? Future Healthcare Journal 2017;4(3):167-172",
    year: 2017,
    doi: "10.7861/futurehosp.4-3-167",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6502571/",
    note: {
      en: "Two English A&E departments in 2014/15, matched on age and arrival profile, on 148,999 and 108,698 attendances. The paper prints a similar percentage of breaches, 4.68 and 4.49 respectively, against a four-hour target of 95 per cent, and reports that the share of patients spending between three hours forty minutes and four hours in the department was 20.83 per cent for Hospital A against 8.56 per cent for Hospital B. Everything drawn here is one of those four published shares or is derived from them: the compliant shares of 95.32 and 95.51 are 100 minus the printed breach rates and are never authored. The bars stack because the axis is all attendances ordered by time taken, so the breach group sits past four hours and the three-forty-to-four group immediately before it. Three honesty notes. The source prints percentages to two decimal places and no patient counts anywhere, so the shares are authored as published, in the same deliberate exception this project makes for framing, distribution, dose, estimation and magnitude data; 20.83 per cent of 148,999 has no unique integer behind it. The paper also prints that 15.82 per cent of Hospital A's patients left in the final ten minutes but prints no counterpart for Hospital B, and that profile appears only in a figure that is never tabulated, so no claim is made here about the final ten minutes. And the study measures time in the department, not quality of care, so nothing here says either department treated anyone badly.",
    },
  },

  goDeeperUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6502571/",
};
