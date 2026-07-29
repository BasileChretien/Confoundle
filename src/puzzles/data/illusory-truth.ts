import type { Puzzle } from "../schema";

/**
 * Puzzle #27, the illusory truth effect, on Hassan and Barber (2021) Table 2.
 *
 * People rated neutral trivia statements for truth on a 1 to 6 scale, a week
 * after having seen some of them 1, 9, 18 or 27 times. Experiment 2, n = 57:
 *
 *   never seen   3.64      seen  9 times  4.78
 *   seen once    4.26      seen 18 times  4.72
 *                          seen 27 times  4.87
 *
 * WHY THIS LESSON, and why not "the Big Lie". Two of the techniques on the
 * project's wishlist, the Big Lie and the firehose of falsehood, are not
 * separate reasoning moves. Both are applications of this one measured effect,
 * and naming the mechanism rather than the political label is the same call the
 * audit already made when question wording collapsed into the framing effect.
 * It also keeps the evidence non-partisan while the applications are political:
 * the stimuli here are trivia of the "gestation period of a giraffe" kind.
 *
 * WHAT THE REVEAL IS. Not the size of the gap but the SHAPE of the curve. The
 * whole climb from never-seen to twenty-seven times is 1.23 points, and the
 * single first showing is 0.62 of it, almost exactly half. So one extra
 * exposure does about as much as the twenty-six after it. That is the opposite
 * of what the firehose metaphor implies: the danger is not the volume, it is
 * that the first repeat has already done half the work.
 *
 * WHY THE HEDGE IS WRONG, and the deduction it rests on. The setup shows only
 * the first two points, never-seen and seen-once, which is a line going up.
 * From that alone you cannot read the interior of a curve, which is exactly why
 * the correct choice is a DIRECTION AND ORDER OF MAGNITUDE rather than a value.
 * Two facts on the figure settle it. The scale is stated as 1 to 6, and one
 * showing moved the rating 0.62. Anything close to proportional would put
 * twenty-seven showings around twenty, which is off the scale and therefore
 * impossible. And the direction is given: the one showing raised the rating, so
 * "lower" needs a reversal the setup gives no reason for. Up, but nowhere near
 * proportionally, is the only answer left standing, and that is deducible.
 *
 * TWO HONESTY CONSTRAINTS, carried from the audit entry so nobody overstates it.
 * Only the paper's Experiment 1 shows every later ADJACENT step as
 * non-significant, which would make the plateau look total. In Experiment 2,
 * which is the one authored here because it runs to twenty-seven repetitions,
 * the steps from 1 to 9, 18 and 27 all remain significant (d = 0.62, 0.49,
 * 0.80). So the puzzle claims the SHARE the first showing carries, never that
 * later showings do nothing, and the lesson says so. And the outcome is a
 * published rating mean rather than a count, which is why `rates` is out and
 * why the figure says so on its face.
 */
export const illusoryTruth: Puzzle = {
  schemaVersion: 1,
  id: "illusory-truth-hassan-2021",
  slug: "heard-it-before",
  category: "statistical-reasoning",
  reasoningSkill: "illusory-truth",
  difficulty: "medium",
  tags: ["everyday", "psychology", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Seeing a claim once, a week ago, already made it feel truer. What does seeing it 27 times do?",
    },
    framing: {
      en: "Fifty-seven people were shown trivia statements, the sort nobody can check off the top of their head, like which country invented the zipper. A week later they rated how true each one seemed, from 1 to 6. Statements they had never seen scored 3.64. Statements they had seen exactly once, seven days earlier, scored 4.26. Nothing about the statements changed in between, and no evidence for any of them was ever offered. The only difference was having met them before.",
    },
    question: {
      en: "Some statements had been shown 27 times. Where did those land?",
    },
    data: {
      type: "dose",
      label: { en: "How true a statement seemed, by how often it had been seen" },
      doseLabel: { en: "times seen, a week earlier" },
      outcomeLabel: { en: "Average rating that the statement is true, from 1 to 6" },
      scaleMin: 1,
      scaleMax: 6,
      sampleLabel: {
        en: "57 people, rating trivia statements a week after seeing them.",
      },
      meansNote: {
        en: "These are the average ratings the source printed, on its 1 to 6 scale, not counts of people. The share of the climb bought by the first showing is derived from them rather than authored.",
      },
      steps: [
        { id: "d0", label: { en: "Never seen" }, short: { en: "Never" }, dose: 0, mean: 3.64, sd: 0.65 },
        { id: "d1", label: { en: "Seen once" }, short: { en: "Once" }, dose: 1, mean: 4.26, sd: 0.83 },
        { id: "d9", label: { en: "Seen 9 times" }, short: { en: "9 times" }, dose: 9, mean: 4.78, sd: 1.01 },
        { id: "d18", label: { en: "Seen 18 times" }, short: { en: "18 times" }, dose: 18, mean: 4.72, sd: 1.02 },
        { id: "d27", label: { en: "Seen 27 times" }, short: { en: "27 times" }, dose: 27, mean: 4.87, sd: 0.99 },
      ],
    },
    initialView: {
      kind: "partial",
      groupIds: ["d0", "d1"],
      caption: { en: "Never seen, against seen once" },
    },
  },

  choices: [
    {
      id: "proportional",
      label: { en: "Far higher, roughly in proportion to the repetitions" },
      sublabel: { en: "27 times is a different order of thing" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "lower",
      label: { en: "Lower, because hearing it over and over breeds suspicion" },
      sublabel: { en: "people resent being drummed at" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "barely",
      label: { en: "Barely higher than seeing it once" },
      sublabel: { en: "check what the scale allows" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here: the stated 1 to 6 scale
      // rules out anything proportional, and the first step gives the
      // direction, which between them leave only one answer standing.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "4.87. Twenty-six further showings did about what the first one did.",
    },
    mechanismLabel: { en: "The rest of the curve" },
    mechanismName: {
      en: "Repetition buys almost all of its effect on the very first repeat",
    },
    explanation: {
      en: "One showing lifted the rating by 0.62, from 3.64 to 4.26. Going on to twenty-seven showings lifted it by 0.61 more, to 4.87. So the entire climb is 1.23 points and the single first showing bought half of it, with the other half spread across twenty-six more. Drawn against the number of showings rather than as a tidy row, the curve is almost all cliff and then almost all plateau:",
    },
    body: {
      en: "Be careful what this does and does not say, because the flat-looking tail is easy to overstate. The later showings were not doing nothing: in this experiment, nine, eighteen and twenty-seven showings all scored reliably above one showing. What the data says is about proportion, not about nothing, and it is quite strong enough. If you wanted to make a false statement feel true, the expensive part of the campaign, the twenty-six extra repetitions, bought you roughly what the very first cheap repeat did.",
    },
    view: {
      kind: "curve",
      caption: { en: "Every number of showings they tested" },
    },
  },

  lesson: {
    skillName: { en: "The illusory truth effect" },
    takeaway: {
      en: "Familiarity feels like truth. A claim you have met before is rated truer than one you have not, with no new evidence and no argument, and most of that lift arrives the second time you meet it.",
    },
    body: {
      en: "The practical consequence is uncomfortable and worth sitting with. It means your sense that a claim is plausible is partly a memory of having encountered it, and you cannot tell those two feelings apart from the inside. It also means the defence is not scepticism in the moment, since the feeling arrives before any thinking does. The defence is asking where you first met a claim, and noticing when the honest answer is that you cannot remember, only that it sounds familiar.",
    },
    howItWorks: {
      en: "The mechanism is processing fluency. Something you have seen before is easier for your brain to take in the second time, and that ease registers as a small, wordless signal of rightness. Your mind then has to explain the signal, and truth is the readiest explanation available, since true things do tend to be the ones you hear repeated. So the feeling is not stupid, it is a decent heuristic being fed the wrong input. What makes it dangerous is that it does not require you to believe anything on first contact. You can hear a claim, dismiss it as nonsense, forget where you heard it, and still find it slightly more plausible a week later, because what survives is the fluency and not the dismissal. That is also why the effect is largely immune to knowing about it, and why it works even on people who could state the correct answer if asked directly. Three things follow. Repetition is a persuasion technique in its own right, independent of evidence, which is why propaganda has always been repetitive and why advertising repeats rather than argues. Correcting a falsehood by restating it, as fact checks must, carries a real cost, since the restatement is itself another exposure. And the front-loading matters for how you read a flood of identical claims: the flood is not what convinced people, it convinced them early and then mostly wasted its own ammunition. If you want a habit out of this, it is to separate two questions that feel like one. Does this sound right, and what is the evidence for it? The first question is answered partly by how many times you have heard it, which is not evidence about the world at all.",
    },
    examples: [
      {
        title: { en: "The same effect, forty-four years earlier" },
        summary: {
          en: "This is one of the older findings in the field and it has replicated steadily. In the original study, people rated plausible statements for truth on three occasions two weeks apart. Some statements were repeated across the sessions and some appeared only once. Ratings for the repeated statements climbed each time, while ratings for the ones seen only once did not move, and the climb happened for false statements exactly as it did for true ones. The authors concluded that how often something has been encountered is used as a criterion for whether it is true.",
        },
        provenance: {
          source:
            "Hasher L, Goldstein D, Toppino T. Frequency and the conference of referential validity. Journal of Verbal Learning and Verbal Behavior. 1977;16(1):107-112. The original demonstration of the effect, using 60 plausible statements drawn from areas most participants would not know for certain.",
          year: 1977,
          doi: "10.1016/S0022-5371(77)80012-1",
          url: "https://doi.org/10.1016/S0022-5371(77)80012-1",
        },
      },
    ],
  },

  share: {
    title: { en: "The illusory truth effect, a reasoning trap." },
    explainer: {
      en: "A claim you have met before feels truer than one you have not, even with no evidence attached and even if you dismissed it the first time. In one experiment people rated trivia statements from 1 to 6 a week after seeing them. Never seen: 3.64. Seen once: 4.26. Seen twenty-seven times: 4.87. So a single repeat bought half the total effect and the other twenty-six bought the rest between them. That is worth knowing about propaganda, which has always been repetitive, and about your own sense of plausibility, which is partly just a memory of having heard something before. Ask where you first met a claim. If the answer is that it merely sounds familiar, that is not evidence.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Hassan A, Barber SJ. The effects of repetition frequency on the illusory truth effect. Cognitive Research: Principles and Implications. 2021;6:38, Experiment 2, Table 2. Open access. Mean truth ratings on a 1 to 6 scale, one week after exposure, by number of prior showings: never seen 3.64 (SD 0.65), once 4.26 (0.83), nine times 4.78 (1.01), eighteen times 4.72 (1.02), twenty-seven times 4.87 (0.99), n = 57.",
    year: 2021,
    doi: "10.1186/s41235-021-00301-5",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8116821/",
    note: {
      en: "The stimuli are neutral trivia statements of ambiguous plausibility, of the gestation-period-of-a-giraffe kind, which is why this paper was chosen over the better known illusory-truth work that runs on political headlines: the evidence stays non-partisan even though the applications are not. Three limits are worth stating. The outcome is a published mean on a 1 to 6 rating scale rather than a count of people, so no number of individuals can be recovered from it, and the figure says so. The plateau is real but must not be overstated: in this experiment nine, eighteen and twenty-seven showings each still scored reliably above a single showing, with effect sizes of 0.62, 0.49 and 0.80, so the honest claim is about the share of the climb the first showing carries and not about later showings doing nothing. The paper's Experiment 1, which ran only to nine showings, is the one in which every later step between adjacent counts was non-significant. And the samples are modest, 51 and 57 people, though the overall effect of repetition was large in both, at d = 1.00 and d = 1.09.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Illusory_truth_effect",
};
