import type { Puzzle } from "../schema";

/**
 * Puzzle #31, the misinformation effect, on Loftus and Palmer (1974),
 * Experiment 2. Read from the journal scan, not from a reproduction.
 *
 * Table 2, "Did you see any broken glass?", asked one week after the film:
 *
 *   smashed   yes 16   no 34   n 50
 *   hit       yes  7   no 43   n 50
 *   control   yes  6   no 44   n 50
 *
 * RECONCILED THREE WAYS. Each row sums to 50; the three rows sum to the 150 the
 * Method section states; and the paper's own prose gives P(Y) as .32 and .14,
 * which recompute exactly from 16/50 and 7/50. Chi-square 7.76, beyond .025.
 *
 * ONLY EXPERIMENT 2 IS AUTHORED. Experiment 1 had 45 students and nine per verb,
 * which is far too small to build on, so its verb effect (40.5 mph for smashed
 * against 34.0 for hit) appears in the framing as context and in the deep dive,
 * never as data. Note 40.5, not the 40.8 that most reproductions carry; the
 * journal page was read as an image to be sure.
 *
 * NO NEW SHAPE. `rates` with three groups and one stratum. The setup filters to
 * the two groups that look alike with `groupIds`, exactly as `misleading-axis`
 * filters to its inverted arm, and the reveal drops the filter.
 *
 * WHY THE HEDGE IS WRONG. The framing supplies the inference: it states that
 * changing the single verb moved the remembered speed by six miles an hour, and
 * that broken glass is what one expects from a fast crash. A reader who takes
 * both seriously can get to "more of them said yes" and past "about the same".
 * The size of the gap does not follow and the reveal supplies it.
 *
 * WHY IT IS NOT THE FRAMING EFFECT AGAIN. `framing-effect` is about two
 * equivalent descriptions of one choice, presented at the moment of choosing.
 * This is a single word, heard once, retroactively installing a memory of an
 * object that was never there, and measured a week later. Different move.
 */
export const misinformationEffect: Puzzle = {
  schemaVersion: 1,
  id: "misinformation-effect-1974",
  slug: "the-glass-that-was-never-there",
  category: "statistical-reasoning",
  reasoningSkill: "misinformation-effect",
  difficulty: "medium",
  tags: ["everyday", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "One word, heard once, a week before anybody was asked what they had seen.",
    },
    framing: {
      en: "A hundred and fifty students watched a short film of a multiple car accident and then filled in a questionnaire. Fifty of them were asked how fast the cars were going when they smashed into each other. Fifty were asked the same question with one word changed, when they hit each other. Fifty were not asked about speed at all. The verb mattered: in an earlier run of this experiment the word smashed pulled the average speed estimate up to 40.5 miles an hour against 34.0 for hit, and broken glass is the sort of thing you expect from a fast crash. A week later, without seeing the film again, everyone answered ten more questions. One of them, sitting in a random position in the list, asked whether they had seen any broken glass. There was no broken glass in the film.",
    },
    question: {
      en: "How many of the fifty who had heard the word smashed said they saw broken glass?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Said they saw broken glass" },
      higherIsBetter: false,
      groups: [
        {
          id: "control",
          label: { en: "Never asked about speed" },
          short: { en: "Not asked" },
        },
        {
          id: "hit",
          label: { en: "Asked how fast when they hit each other" },
          short: { en: "hit" },
        },
        {
          id: "smashed",
          label: { en: "Asked how fast when they smashed into each other" },
          short: { en: "smashed" },
        },
      ],
      strata: [{ id: "week-later", label: { en: "Asked one week later" } }],
      observations: [
        { groupId: "control", stratumId: "week-later", numerator: 6, denominator: 50 },
        { groupId: "hit", stratumId: "week-later", numerator: 7, denominator: 50 },
        { groupId: "smashed", stratumId: "week-later", numerator: 16, denominator: 50 },
      ],
    },
    initialView: {
      kind: "aggregate",
      // The two groups that look alike. Showing them first is what makes the
      // reveal work: seven against six reads as "the wording changed nothing".
      groupIds: ["control", "hit"],
      caption: { en: "The two groups we can show you so far" },
    },
  },

  choices: [
    {
      id: "about-same",
      label: { en: "About the same, six or seven of them" },
      sublabel: { en: "the film was the film, whatever they were asked" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "slightly-more",
      label: { en: "A little more, nine or ten" },
      sublabel: { en: "one word can only nudge a memory" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "more-than-double",
      label: { en: "More than twice as many" },
      sublabel: { en: "the word changed what the crash had been" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell. Wrong here: the framing gives both the
      // size of the verb's effect on speed and the link from speed to glass.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Sixteen of the fifty. More than twice the seven who had heard hit.",
    },
    mechanismLabel: { en: "What one word did to a memory" },
    mechanismName: {
      en: "The question did not retrieve the memory, it edited it",
    },
    explanation: {
      en: "Six of the fifty who were never asked about speed reported broken glass, and seven of the fifty asked about hitting. Those two are the same answer. Sixteen of the fifty asked about smashing reported it. Every one of the hundred and fifty watched the identical film, and none of them saw any broken glass, because there was none to see.",
    },
    body: {
      en: "Notice what the control group tells you. Six people in fifty will report broken glass with no prompting at all, which is the background rate of misremembering an ordinary crash. Asking about speed with a neutral verb adds almost nothing to that. It is the choice of smashed over hit, one word in one question, that more than doubles it. And the effect is not a slip of the tongue in the moment. The question was asked immediately after the film; the glass was reported a week later, by people who never saw the film again. Whatever the word did, it did to the memory itself, and it survived seven days.",
    },
    view: {
      kind: "aggregate",
      caption: { en: "All three groups, watching the same film" },
    },
  },

  lesson: {
    skillName: { en: "The misinformation effect" },
    takeaway: {
      en: "A memory is not a recording you play back. It is rebuilt each time, from what you saw and from whatever has reached you since, and the two are not labelled differently on the way in. So a question can add to a memory rather than only draw from it, and the person answering cannot feel the difference.",
    },
    body: {
      en: "This is worth separating from a close relative. The framing effect is about two equivalent descriptions of the same choice, presented at the moment you choose, and it changes what you prefer. This changes what you remember having seen, and it does so a week after the fact, about an object that was never present. The people who reported the glass were not lying and were not being agreeable; there is no reason to think they could tell their reconstruction from a recollection. That is the uncomfortable part, and it is why the effect matters well beyond the laboratory. It is also why the study is a fixture of the literature on eyewitness testimony: a witness interviewed repeatedly, by people who already have a theory about what happened, is being asked questions that carry information, and each one is an opportunity for that information to be absorbed into the account.",
    },
    howItWorks: {
      en: "The mechanism has a name, the misinformation effect, and the design here is what makes it visible. The control group is doing the work that a control group is for. Without it you would be comparing smashed against hit and could conclude that a strong verb inflates reports. With it you can see that hit sits on top of the background rate, at seven against six, and that essentially all of the movement comes from the one word. Two cautions about reading it, both of which the paper itself supports. First, the effect is about a detail that fits the scene rather than one that contradicts it. Broken glass belongs at a fast crash, which is exactly why it slots into a memory of a fast crash without friction; the finding does not say a question can install any belief at all. Second, this is one study of students in 1974 with fifty per group, and the puzzle rests on it because the counts are clean, not because a single experiment settles a science. What has held up broadly is the general phenomenon, that post-event information gets absorbed into recollection. The practical version is a habit rather than a fact. When you need an accurate account from somebody, ask them to tell it before you tell them anything, ask open questions before specific ones, and notice that every detail you supply in a question is a detail they may hand back to you later believing it was theirs. The same applies to your own memory of an argument, an incident, or a conversation you have since discussed at length with somebody who was there.",
    },
    examples: [
      {
        title: { en: "How bad the speed estimates were in the first place" },
        summary: {
          en: "The same paper contains a smaller result that is almost a lesson of its own. In the first experiment, four of the seven films were staged crashes filmed at known speeds, one at 20 miles an hour, one at 30, and two at 40. The average estimates given for those four films were 37.7, 36.2, 39.7 and 36.1 miles an hour. The crash at 20 and the crashes at 40 drew almost the same number, and the estimates barely track the truth at all. So the verb was shifting a judgement that was close to worthless to begin with, which makes it easier to shift and harder to notice. Worth remembering whenever a witness, or you, produces a confident number for how fast something was moving. One caution on that first experiment: it had 45 students and nine per verb, so its figures are indicative and the puzzle above is built on the second experiment instead.",
        },
        provenance: {
          source:
            "Loftus EF, Palmer JC. Reconstruction of automobile destruction: an example of the interaction between language and memory. Journal of Verbal Learning and Verbal Behavior. 1974;13(5):585-589. Experiment 1, Results: the four staged crashes occurred at 20, 30, 40 and 40 mph and drew mean estimates of 37.7, 36.2, 39.7 and 36.1 mph. Table 1 gives mean speed estimates by verb: smashed 40.5, collided 39.3, bumped 38.1, hit 34.0, contacted 31.8.",
          year: 1974,
          doi: "10.1016/S0022-5371(74)80011-3",
        },
      },
    ],
  },

  share: {
    title: { en: "The misinformation effect, a reasoning trap." },
    explainer: {
      en: "A hundred and fifty people watched the same film of a car crash. There was no broken glass in it. A week later, asked whether they had seen any, six of fifty said yes if they had never been questioned about speed, and seven of fifty if they had been asked how fast the cars were going when they hit each other. Sixteen of fifty said yes if that one word had been smashed. A memory is not a recording. It is rebuilt from what you saw and whatever has reached you since, and nothing labels which is which.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Loftus EF, Palmer JC. Reconstruction of automobile destruction: an example of the interaction between language and memory. Journal of Verbal Learning and Verbal Behavior. 1974;13(5):585-589. Experiment 2, Table 2, distribution of yes and no responses to the question, Did you see any broken glass?: smashed 16 yes and 34 no, hit 7 yes and 43 no, control 6 yes and 44 no, from 150 students in three groups of fifty.",
    year: 1974,
    doi: "10.1016/S0022-5371(74)80011-3",
    note: {
      en: "Read from the journal scan rather than from a reproduction, which mattered. The counts reconcile three ways: each row of Table 2 sums to 50, the three rows sum to the 150 the Method section states, and the paper's own prose gives the probability of a yes as .32 for smashed and .14 for hit, which recompute exactly from 16 of 50 and 7 of 50. The chi-square is 7.76, significant beyond the .025 level. Three things a careful reader should know. First, the framing quotes 40.5 miles an hour for smashed, which is what Table 1 prints; many reproductions give 40.8, and the page was read as an image to be certain. Second, that first experiment had only 45 students and nine per verb, so nothing here is authored from it and it appears as context and as the deep dive alone. Third, the participants were students in groups of various sizes rather than a random sample, and this is a single experiment from 1974, so the counts are exact but the generalisation rests on the wider literature on post-event information rather than on this study by itself. One design detail is worth stating in the study's favour: the broken-glass question sat in a random position among ten questions, so it was not the salient thing being asked.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Misinformation_effect",
};
