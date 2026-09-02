import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #52, prebunking, via Ecker, Lewandowsky and Tang (2010).
 *
 * NO NEW SHAPE. `ratings`, holding a mean on the scale it was measured on.
 *
 * THE AXIS IS THE TRUE ONE, 0 TO 20, AND THAT WAS A DECISION. The measure runs
 * to 20 and every condition falls between 2.12 and 5.06, so the markers occupy
 * only the left quarter of the axis. The paper's own Figure 1 draws 0 to 6
 * instead, which is an ordinary choice for a journal and is also exactly the
 * move shipped `misleading-axis` warns readers about. This deck cannot do that
 * to its own readers, so the figure is drawn honestly and the framing tells the
 * reader what 20 means, which turns the cramped axis into part of the finding:
 * even with no correction at all, people used the retracted claim about five
 * times out of twenty chances.
 *
 * WHY THIS IS NOT A SECOND CONTINUED-INFLUENCE PUZZLE. `strike-that-from-the-
 * record` already ships that skill. This one is about whether a warning given
 * BEFORE the misinformation changes what the later correction achieves, which
 * is a different intervention and a different lesson: it helps, and it is not
 * enough.
 *
 * THE COMMIT BEAT ASKS ELIMINATED OR ONLY REDUCED. Two bands point downward, so
 * per `docs/hedge-audit.md` the framing carries the discriminator: it states
 * outright that the warning helps and asks whether it fixes the problem or only
 * shrinks it. That is the paper's own title.
 */
export const prebunking: Puzzle = {
  schemaVersion: 1,
  id: "warned-in-advance",
  slug: "warned-in-advance",
  category: "statistical-reasoning",
  reasoningSkill: "prebunking",
  difficulty: "medium",
  tags: ["everyday", "psychology", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "They were warned, in detail, before they read a word. It still stuck.",
    },
    framing: {
      en: "Everyone read the same report of a minibus crash, which first blamed the elderly passengers and later retracted that. Afterwards they answered questions about what happened, and a scorer counted how often each person still leaned on the retracted claim to explain things. There were twenty chances to do that, so the scale below runs from 0 to 20. The bar is the group who got the story and the retraction and nothing else: on average they used the retracted claim about four times out of twenty. Now consider a second group, who got everything that group got plus a warning at the very start, spelling out that retracted information tends to keep influencing people and that they should watch for it. The warning does help. The question is whether it fixes the problem or only shrinks it.",
    },
    question: {
      en: "Where did the warned group land, on the same 0 to 20 scale?",
    },
    data: {
      type: "ratings",
      label: { en: "How often people still used the retracted claim" },
      metricLabel: {
        en: "Mean number of references to the retracted claim, out of 20 chances, 25 people per group",
      },
      scale: {
        min: 0,
        max: 20,
        minLabel: { en: "0, never used it" },
        maxLabel: { en: "20, used it at every chance" },
      },
      series: [
        {
          id: "retraction-only",
          label: { en: "Story, then a retraction" },
          short: { en: "Retraction" },
        },
        {
          id: "specific-warning",
          label: {
            en: "Retraction, plus a detailed warning beforehand",
          },
          short: { en: "Warned first" },
        },
        {
          id: "general-warning",
          label: {
            en: "Retraction, plus a vague warning to be careful beforehand",
          },
          short: { en: "Vague warning" },
        },
        {
          id: "alternative",
          label: { en: "Retraction that also said what did cause the crash" },
          short: { en: "Given a cause" },
        },
        {
          id: "no-retraction",
          label: { en: "Story with no retraction at all" },
          short: { en: "No retraction" },
        },
      ],
      observations: [
        { seriesId: "retraction-only", mean: 4.04, n: 25 },
        { seriesId: "specific-warning", mean: 2.12, n: 25 },
        { seriesId: "general-warning", mean: 3.36, n: 25 },
        { seriesId: "alternative", mean: 2.22, n: 25 },
        { seriesId: "no-retraction", mean: 5.06, n: 25 },
      ],
    },
    initialView: {
      kind: "onerating",
      groupIds: ["retraction-only"],
      caption: { en: "Retraction only, for comparison" },
    },
  },

  choices: [
    {
      // The hopeful reading, and the one this deck is most tempted by, since
      // its entire premise is that telling people about a trap helps.
      id: "eliminated",
      label: { en: "Near zero. Explain the trap and it stops working" },
      sublabel: { en: "forewarned is forearmed" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "halved",
      label: { en: "About half, and still plainly there" },
      sublabel: { en: "reduced, not removed" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "no-change",
      label: { en: "No real change. A warning beforehand does nothing" },
      sublabel: { en: "you cannot inoculate people" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "worse",
      label: { en: "Higher. Warning people makes them dwell on it" },
      sublabel: { en: "the warning backfires" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "From 4.04 down to 2.12. Halved, and nowhere near zero." },
    mechanismLabel: { en: "All five groups on the same scale" },
    mechanismName: {
      en: "A warning in advance shrinks the effect and does not switch it off",
    },
    explanation: {
      en: "The detailed warning cut reliance on the retracted claim roughly in half, from 4.04 to 2.12 out of twenty. That is a real effect and it is the good news. The bad news is on the same chart: 2.12 is not 0, and these were people who had been told in advance, in plain terms, exactly what was about to be done to them and exactly how it works. Knowing the trick did not stop them falling for it. It made them fall for it about half as often.",
    },
    body: {
      en: "The other three bars fill in what does and does not work. A story with no retraction at all sits at 5.06, so the whole span of every intervention in this experiment is from 5.06 down to 2.12, which is worth holding on to: none of this is the difference between believing and not believing, it is the difference between leaning on a discredited claim five times and twice. A retraction on its own moved things from 5.06 to 4.04, and the paper reports that as not statistically significant, which is the finding this whole literature is built on. A vague warning to read carefully managed 3.36. And the detailed warning at 2.12 did about as well as the one thing previously known to work, which is a retraction that also supplies a replacement explanation, at 2.22. A second experiment then combined the detailed warning with the replacement explanation, the two strongest tools available, and still ended at 1.04 references, which the authors show is significantly more than zero. Nothing they tried switched it off.",
    },
    view: {
      kind: "bothratings",
      caption: { en: "All five, on the same scale" },
    },
  },

  lesson: {
    skillName: { en: "Prebunking" },
    takeaway: {
      en: "Being told in advance how you are about to be misled does help, measurably. It does not make you immune, and the gap between helping and immunising is where most of the damage lives.",
    },
    body: {
      en: "There is a comfortable belief that understanding a manipulation is the same as being protected from it. This experiment is the cleanest test of that belief anyone has run, because the warning it gave was not vague advice to be sceptical; it explained the exact mechanism, in advance, to people who then had it done to them. They still used the retracted claim, about half as often as the unwarned. The honest reading is that awareness is a discount, not a shield. It is worth having, since halving an error is a large effect by the standards of this literature, and it is not what people usually mean when they say they know about a bias.",
    },
    howItWorks: {
      en: "Two practical things follow, and they pull in opposite directions, which is why both need saying. The first is that prebunking is worth doing. If you are about to show somebody a claim you expect to be corrected later, saying so in advance measurably reduces how much they carry forward, and vague advice to be careful does much less than a specific account of what will happen. The second is that you should not treat having been warned as a reason to relax. If you have read about a bias, your considered estimate of how much it still affects you should be somewhere around half, not zero, and that applies to this sentence as much as to anything else. The practical version is to keep the check external where you can: write down in advance what would change your mind, ask somebody who did not read the retracted claim, or go back to the source rather than to your memory of it. Those work whether or not your own head has been inoculated, which is the point, because the evidence here says it has not been.",
    },
    examples: [
      {
        title: { en: "Even the two best tools together do not finish the job" },
        summary: {
          en: "A second experiment gave people the detailed warning and a replacement explanation together, the two most effective things known, and measured the same way. Reliance fell to 1.04 references out of twenty, against 4.64 for a group who got no retraction at all. That is a large reduction and it is still significantly above zero, which the authors establish directly. Almost half the people in that condition made at least one reference to material they had been warned about, told was wrong, and given a substitute for. The paper's title says it exactly: explicit warnings reduce but do not eliminate.",
        },
        provenance: {
          source:
            "Ecker UKH, Lewandowsky S, Tang DTW. Explicit warnings reduce but do not eliminate the continued influence of misinformation. Memory and Cognition. 2010;38(8):1087-1100. Experiment 2, Figure 2, page 1093.",
          year: 2010,
          doi: "10.3758/MC.38.8.1087",
          url: "https://doi.org/10.3758/MC.38.8.1087",
        },
      },
    ],
  },

  share: {
    title: { en: "Prebunking, a reasoning trap." },
    explainer: {
      en: "People were told in advance, in detail, that a claim in what they were about to read would be retracted and that retracted claims keep influencing people anyway. It halved how often they leaned on it, from about four times out of twenty to about two. It did not get them to zero. Knowing how a trap works is a discount on it, not immunity from it.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Ecker UKH, Lewandowsky S, Tang DTW. Explicit warnings reduce but do not eliminate the continued influence of misinformation. Memory and Cognition. 2010;38(8):1087-1100. Experiment 1: five between-subjects conditions, 25 undergraduates each, reading a report of a minibus crash first attributed to its elderly passengers. Dependent measure is the mean number of references to the retracted material across the questionnaire, with a maximum of 20. Means from Figure 1, page 1091; contrasts from Table 1, page 1092.",
    year: 2010,
    doi: "10.3758/MC.38.8.1087",
    url: "https://doi.org/10.3758/MC.38.8.1087",
    note: {
      en: "The five means were read off the rendered page, and the reading checks against the paper's own degrees of freedom twice. Five conditions of 25 is 125 participants, and 125 minus 5 is the 120 in the printed F(1,120). The restricted reanalysis drops 32 people who failed the manipulation check, and 125 minus 32 minus 5 is the 88 in the printed F(1,88). Three things are worth stating plainly. First, the axis here runs 0 to 20 because that is the scale the measure was taken on, which leaves all five markers in the left quarter of the chart. The paper's own Figure 1 draws the axis from 0 to 6 instead. That is an ordinary choice for a journal figure, and it is also the exact move this deck's `misleading-axis` lesson warns readers about, so it is not a choice this deck can make about its own reader; the cramped figure is the honest one, and the fact that even the worst group only reached about a quarter of the possible score is part of what the reader should see. Second, no dispersion is drawn: the paper shows standard errors as graphical error bars and prints no numeric values for Experiment 1, so drawing nothing beats implying a precision that cannot be checked. Third, on what is and is not claimed: the retraction-only against no-retraction difference is reported by the authors as not statistically significant (p = .13), and the reveal says so rather than treating that gap as a result.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Prebunking",
};
