import type { Puzzle } from "../schema.ts";

/**
 * Being told what the public thinks changes what you say you think, but only
 * when the poll announces a winner.
 *
 * Toff ran two survey experiments in which respondents read an excerpted news
 * story about a policy. Some saw the story alone. Some saw it with a poll
 * showing the public closely divided, 49 to 51 per cent. Some saw it with a
 * poll showing the public heavily in favour, 65 to 67 per cent. Assignment was
 * per issue, so a respondent could be in different conditions on different
 * issues.
 *
 * The even-divide poll shifted support by under two points on every issue,
 * which the paper reports as no significant divergence. The lopsided poll moved
 * support by 14 points on foreign language requirements and 9 on junk food
 * taxes. That conditionality is the lesson: a poll is not persuasive because it
 * is a poll, it is persuasive because it reports a side winning.
 *
 * NET NEUTRALITY IS IN THE FIGURE ON PURPOSE. Almost nothing moved there,
 * because about seven in ten already favoured it in every condition and there was
 * little room left. A puzzle that showed only the two issues where the effect
 * landed would be claiming a stronger and simpler finding than the paper's.
 *
 * SOCIAL SECURITY IS DELIBERATELY ABSENT, along with the rest of Study 2. Its
 * treatment cell is printed as 42.3 per cent of 387 people, and no whole number
 * of 387 rounds to 42.3, so that cell cannot be reconciled. Study 2 also has a
 * different design, contrasting subgroup opposition rather than public support,
 * so mixing it in would blur the one contrast this puzzle is built on.
 *
 * The counts here are reconstructed from the appendix percentages and their
 * per-cell Ns, and every one is unique. They also reproduce the effect sizes
 * printed in the paper's prose, which were not used to derive them: 14.2 and
 * 9.3 percentage points. See the test file.
 */
export const pollsShapeOpinion: Puzzle = {
  schemaVersion: 1,
  id: "polls-shape-opinion-toff",
  slug: "what-everyone-thinks",
  category: "measurement",
  reasoningSkill: "polls-shape-opinion",
  difficulty: "medium",
  tags: ["everyday", "politics", "psychology", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Everyone read the same news story about a policy. Some were also shown a poll saying the public was split down the middle. It barely moved them.",
    },
    framing: {
      en: "Two thousand people read short news excerpts about real policy debates. Some saw the excerpt alone, some saw it with a graphic carrying no poll, and some saw it with a poll saying the public was evenly divided, 49 against 51. A fourth group saw a poll saying two thirds of the public were in favour. Three of the four groups are drawn here.",
    },
    question: {
      en: "The group shown a poll saying the public was evenly divided came out within a point and a half of the groups shown no poll at all. What happened to the fourth group, the one shown a poll saying two thirds were in favour?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share who said they favoured the policy" },
      higherIsBetter: true,
      // Nobody wins here. These are four ways of presenting one story, and
      // crowning the tallest bar would suggest one of them got the right answer.
      crownWinner: false,
      // Assignment was per issue, so the same people appear in more than one
      // column in different conditions. Pooling the issues would count them
      // several times over, so the engine must not pool them.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "control-text",
          label: { en: "News story only" },
          short: { en: "No poll" },
        },
        {
          id: "control-graphic",
          label: { en: "News story with a graphic, no poll" },
          short: { en: "No poll, graphic" },
        },
        {
          id: "even",
          label: { en: "Poll: the public is evenly divided" },
          short: { en: "Poll: split" },
        },
        {
          id: "lopsided",
          label: { en: "Poll: two thirds of the public are in favour" },
          short: { en: "Poll: winning" },
        },
      ],
      strata: [
        { id: "foreign", label: { en: "Foreign language requirements" } },
        { id: "junkfood", label: { en: "Taxes on junk food" } },
        { id: "netneutrality", label: { en: "Net neutrality" } },
      ],
      observations: [
        { groupId: "control-text", stratumId: "foreign", numerator: 169, denominator: 314 },
        { groupId: "control-graphic", stratumId: "foreign", numerator: 170, denominator: 312 },
        { groupId: "even", stratumId: "foreign", numerator: 177, denominator: 318 },
        { groupId: "lopsided", stratumId: "foreign", numerator: 214, denominator: 313 },

        { groupId: "control-text", stratumId: "junkfood", numerator: 88, denominator: 316 },
        { groupId: "control-graphic", stratumId: "junkfood", numerator: 105, denominator: 314 },
        { groupId: "even", stratumId: "junkfood", numerator: 99, denominator: 316 },
        { groupId: "lopsided", stratumId: "junkfood", numerator: 125, denominator: 313 },

        { groupId: "control-text", stratumId: "netneutrality", numerator: 217, denominator: 314 },
        { groupId: "control-graphic", stratumId: "netneutrality", numerator: 222, denominator: 313 },
        { groupId: "even", stratumId: "netneutrality", numerator: 222, denominator: 314 },
        { groupId: "lopsided", stratumId: "netneutrality", numerator: 228, denominator: 314 },
      ],
    },
    initialView: {
      kind: "stratified",
      groupIds: ["control-text", "control-graphic", "even"],
      caption: { en: "Three of the four groups" },
    },
  },

  choices: [
    {
      // Exactly what the visible data supports, and wrong. The setup shows a
      // poll failing to move anyone, so "polls do not move people" is the
      // reasonable reading of what is on screen.
      id: "nothing",
      label: { en: "Much the same again" },
      sublabel: { en: "polls do not move people" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "rose",
      label: { en: "Support rose sharply" },
      sublabel: { en: "the crowd is going one way" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The boomerang reading, and a real effect in other settings, which is
      // why it is offered. It is not what happened here.
      id: "fell",
      label: { en: "Support fell, people pushed back" },
      sublabel: { en: "nobody likes being told" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "A poll only moves you when it says somebody is winning.",
    },
    mechanismLabel: { en: "The fourth group, on the same bars" },
    mechanismName: { en: "The measurement joins the thing it measures" },
    explanation: {
      en: "On foreign language requirements, support ran at about 54 per cent with no poll and 56 per cent with a poll saying the public was split. Shown a poll saying two thirds were in favour, it went to 68 per cent. On junk food taxes it went from about 31 per cent to 40. Nothing else changed: same story, same graphic, same question. The only difference was a sentence about what other people thought.",
    },
    body: {
      en: "Look at net neutrality, where nothing happened. About seven in ten already favoured it in every condition, so there was very little room left to move, and the poll that shifted the other two issues shifted this one by about two points. That is worth as much as the rest, because it says the effect is not a general tendency to agree with whatever you are shown. It is specific: a poll changes minds when it announces a result, and when there are minds left to change. That is why the even-divide poll did nothing. It carried the same authority, the same graphic, the same framing, and no winner. What people took from the lopsided poll was not information about the policy, it was information about which answer is normal. And the consequence is uncomfortable for anyone who reads polls: a survey that reports what the public thinks is also, in a small way, an instrument for setting it.",
    },
    view: { kind: "stratified" },
  },

  lesson: {
    skillName: { en: "Polls that shape what they measure" },
    takeaway: {
      en: "Telling people that most others hold a view moves them towards it, by around ten points in these experiments. Telling them opinion is split moves them not at all. So a poll reported as a contest is not only a measurement of opinion, it is an input to it, and repeated reporting of the same lead can help build the majority it describes.",
    },
    body: {
      en: "This does not make polls worthless, and it is not an argument for ignoring them. It is an argument for noticing what a poll is doing in the conversation you are having. A finding reported as a horse race, with a winner named, carries a message about which side is normal, and that message travels even when the policy details do not. The same mechanism sits behind a bandwagon in a shop, a queue outside a restaurant, and a colleague saying that everyone else has already agreed.",
    },
    howItWorks: {
      en: "People treat other people as evidence, which is usually sensible. If you cannot check something directly, and most of those around you believe it, that is genuine information about the world, because they may know something you do not. The trouble is that the inference stops being valid exactly when the crowd's belief came from the same place yours would have. A poll reported back to the public is a case of this: the majority it describes was formed by people who had themselves seen earlier reports of what the majority thought. That is a loop, and a loop can amplify a small initial difference into a large stable one without anybody lying or being foolish at any step. The practical defence is not scepticism about polls, which are among the better instruments we have. It is to separate two questions that reporting habitually merges. What do the numbers say, and what is the number being used to do? If a figure is being quoted to establish that a side is winning, treat the quoting itself as part of the process it claims to be describing, and go looking for what the policy actually does before deciding what you think about it.",
    },
    examples: [
      {
        title: { en: "The same pull, with nothing at stake and no crowd present" },
        summary: {
          en: "Asch showed that people will give an obviously wrong answer about the length of a line when several others have given it first. About three quarters of his subjects went along with the group at least once, on a task where the correct answer was not in doubt and where nothing whatever turned on the reply. If the pull is that strong on a line, it needs no special explanation on a policy nobody has thought about much.",
        },
        provenance: {
          source:
            "Asch SE. Effects of group pressure upon the modification and distortion of judgments. In: Guetzkow H, ed. Groups, Leadership and Men. Carnegie Press, 1951:177-190",
          year: 1951,
          url: "https://psycnet.apa.org/record/1952-00803-001",
          doi: "10.4324/9780203787502",
        },
      },
    ],
  },

  share: {
    title: { en: "Polls that shape what they measure, a reasoning trap." },
    explainer: {
      en: "In a survey experiment, people who read a news story with a poll saying the public was evenly split answered exactly like people shown no poll at all. People shown a poll saying two thirds were in favour moved about ten points towards it. The poll did not persuade because it was a poll; it persuaded because it named a winner. So a survey reported as a contest is partly an instrument for making the opinion it reports.",
    },
    captions: {
      competitive: {
        en: "You are not swayed by polls. You are swayed by winners.",
      },
      selfDeprecating: {
        en: "Told two thirds agreed, I discovered I did too.",
      },
    },
  },

  provenance: {
    source:
      "Toff B. Exploring the effects of polls on public opinion: how and when media reports of policy preferences can become self-fulfilling prophesies. Research and Politics 2018;5(4):1-9",
    year: 2018,
    doi: "10.1177/2053168018812215",
    url: "https://journals.sagepub.com/doi/10.1177/2053168018812215",
    note: {
      en: "Study 1, 1,261 respondents recruited through Amazon Mechanical Turk, January 2015. Each respondent read excerpted news stories about three policy debates and was randomly assigned, separately for each issue, to one of four conditions: the story alone, the story with a graphic carrying no polling information, the story with a poll showing the public evenly divided at 49 to 51 per cent, or the story with a poll showing 65 to 67 per cent in favour. The counts drawn here are reconstructed from Appendix Table C-1, which prints the share favouring each policy together with the number of people in each cell, and every one of the twelve is the unique whole number consistent with the printed share and that cell's N. They are checked twice over. First, each reconstructed share reproduces the printed one. Second, the effect sizes the paper states in its prose, 14.2 percentage points on foreign language requirements and 9.3 on junk food taxes against the two control groups pooled, come back as 14.22 and 9.30 when computed from the reconstructed counts, and those prose figures were not used to derive the counts. Three honesty notes. Study 2 is excluded entirely: it contrasts subgroup opposition rather than public support, and one of its cells, 42.3 per cent of 387 people, cannot be produced by any whole number of 387, so it does not reconcile. Net neutrality is included although nothing moved there, because dropping it would make the finding look more general than the paper reports. And the sample is an opt-in online panel rather than a probability sample, which is a limitation for estimating how large the effect is in the population, though the comparison between randomly assigned conditions within it is what the puzzle rests on.",
    },
  },

  goDeeperUrl: "https://journals.sagepub.com/doi/10.1177/2053168018812215",
};
