import type { Puzzle } from "../schema";

/**
 * Puzzle #71, the halo effect, on Landy and Sigall (1974), read in full.
 *
 * WHY THIS SOURCE AND NOT NISBETT AND WILSON, which is the famous one. That
 * paper (JPSP 1977;35:250-256, also read in full for this card) is the better
 * STORY: the same instructor filmed warm and cold, and students rating his
 * accent, which cannot have changed, as appealing or irritating depending on
 * which tape they saw. It carries its own negative control, 34 subjects who
 * watched with the audio stripped out and found the visible attributes did not
 * differ, t < 1 for both. And it has the finding that makes the halo a
 * REASONING trap rather than a curiosity: asked directly, subjects denied their
 * liking had coloured the ratings, and the cold group reported the arrow
 * running the other way.
 *
 * It cannot carry this deck's figure. It prints means for LIKING only, 5.48
 * against 3.18; every attribute result appears as a t value in the text and as
 * percentage bars in its Figures 1 to 3. Reading percentages off a bar chart is
 * the one thing this project will not do, so there is no plottable attribute
 * data. Landy and Sigall prints a full 2 by 3 of means and standard deviations,
 * which is why the chart is built on it and the reveal quotes the other paper
 * for the mechanism and the denial.
 *
 * THE INTERACTION IS THE LESSON, not the main effect. An attractive photo
 * clipped to the essay raised the mark, which is the famous headline and is the
 * least interesting part. What the card is about is that the photo barely
 * mattered when the essay was good (6.7 against 5.9, F = 1.30, not significant)
 * and mattered enormously when it was poor (5.2 against 2.7, F = 12.65,
 * p < .001). The bias does its worst work exactly where the evidence is
 * weakest, which is the transferable rule and the reason the setup draws only
 * the good-essay row.
 *
 * ADJACENCY, checked against the cards rather than assumed. `pygmalion-effect`
 * is an expectancy that changes the SUBJECT's performance; here nothing about
 * the essay changes, only the mark. `anchoring` is a number setting a scale for
 * a later estimate. `framing-effect` is the same fact worded two ways; here the
 * wording is identical and the irrelevant cue sits beside it.
 */
export const haloEffect: Puzzle = {
  schemaVersion: 1,
  id: "halo-effect-landy-sigall-1974",
  slug: "the-photo-on-the-essay",
  category: "cognitive-bias",
  reasoningSkill: "halo-effect",
  difficulty: "medium",
  tags: ["research", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Sixty students marked the same essay out of nine. A photograph of the supposed author was clipped to it. Does a face change a mark?",
    },
    framing: {
      en: "Each student read one essay of about 700 words on television and society, supposedly written by a first-year student called Marilyn Thomas, and marked its general quality from 1 to 9. Clipped to the essay was a photograph: for a third of them an attractive woman, for a third an unattractive one, and for a third no photograph at all. The essay itself was word for word identical whichever photograph came with it. Here is what happened with the well-written essay. The photograph moved the mark by less than a point, and that difference was not statistically significant. They also ran a second version of the study with a badly written essay, pre-tested and confirmed as clearly worse. The question is not whether a marker can be swayed, but how much room a photograph has to sway one, so ask how far the essay in front of them settles the mark on its own.",
    },
    question: {
      en: "What will the photograph do to the mark on the badly written essay?",
    },
    data: {
      type: "conditional",
      label: { en: "Mark for the essay, out of nine" },
      metricLabel: {
        en: "Each point is the mean mark given by ten students. The essay was identical in every condition; only the photograph clipped to it changed.",
      },
      factorLabel: { en: "The photograph clipped to the essay" },
      dispersionLabel: {
        en: "Standard deviations are printed in the paper and are not drawn here, because this shape draws means only.",
      },
      meanNote: {
        en: "Means exactly as published. The paper prints a mean and a standard deviation per cell and no individual marks, so nothing here is derived from counts.",
      },
      scale: {
        min: 1,
        max: 9,
        minLabel: { en: "poor" },
        maxLabel: { en: "good" },
      },
      /**
       * The good essay leads, because the setup draws the first row and the
       * whole design is that the reveal adds the row underneath it.
       */
      rows: [
        {
          id: "good",
          label: { en: "The well-written essay" },
          short: { en: "Good essay" },
        },
        {
          id: "poor",
          label: { en: "The badly written essay" },
          short: { en: "Poor essay" },
          note: {
            en: "The same three photographs, the same marking scale, the same ten students per cell.",
          },
        },
      ],
      columns: [
        {
          id: "attractive",
          label: { en: "An attractive author" },
          short: { en: "Attractive" },
        },
        {
          id: "none",
          label: { en: "No photograph at all" },
          short: { en: "No photo" },
          isBaseline: true,
        },
        {
          id: "unattractive",
          label: { en: "An unattractive author" },
          short: { en: "Unattractive" },
        },
      ],
      cells: [
        { rowId: "good", columnId: "attractive", mean: 6.7, sd: 1.57, n: 10 },
        { rowId: "good", columnId: "none", mean: 6.6, sd: 1.35, n: 10 },
        { rowId: "good", columnId: "unattractive", mean: 5.9, sd: 1.6, n: 10 },
        { rowId: "poor", columnId: "attractive", mean: 5.2, sd: 1.55, n: 10 },
        { rowId: "poor", columnId: "none", mean: 4.7, sd: 1.95, n: 10 },
        { rowId: "poor", columnId: "unattractive", mean: 2.7, sd: 1.34, n: 10 },
      ],
    },
    initialView: {
      kind: "onerow",
      groupIds: ["good"],
      caption: { en: "When the work was good" },
    },
  },

  choices: [
    {
      /**
       * The intuitive trap, and the reasonable one: a bias that was small here
       * ought to be small there, and it is what the setup alone suggests.
       */
      id: "about-the-same",
      label: {
        en: "About as little as here",
      },
      sublabel: { en: "a small bias stays small" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "much-more",
      label: {
        en: "Much more than here",
      },
      sublabel: { en: "the weaker the evidence, the more the cue" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "much-less",
      label: {
        en: "Less than here",
      },
      sublabel: { en: "bad work speaks for itself" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "attractive-penalty",
      label: {
        en: "It will reverse",
      },
      sublabel: { en: "the beauty penalty" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "On the badly written essay the same photograph was worth two and a half marks out of nine: 5.2 with an attractive author, 2.7 with an unattractive one.",
    },
    mechanismLabel: { en: "And when the work was poor" },
    mechanismName: { en: "The bias waits for the ambiguity" },
    explanation: {
      en: "On the good essay the photograph was worth 0.8 of a mark, 6.7 against 5.9, and a simple comparison of those two cells gives F = 1.30 on 1 and 54 degrees of freedom, which is nothing. On the poor essay the same photograph was worth 2.5 marks, 5.2 against 2.7, and the same comparison gives F = 12.65, p below .001. The essay did not change. The marking scale did not change. The ten students per cell were drawn from the same course. All that changed is that the work stopped answering the question for the marker, and the moment it did, the face started answering it instead. Notice where the no-photograph condition sits, because it is the quiet part of the table: 6.6 on the good essay and 4.7 on the poor one, close to the attractive author both times. So this is much less a bonus for beauty than a penalty for its absence, and the penalty only appears when the work is weak. The authors put the mechanism plainly: if your work is competent, personal characteristics are less able to influence how it is judged, and if it is not, they are. Two honesty notes, because the paper is careful about them and the card should be too. The full three-by-two interaction was NOT statistically significant on either measure. What is significant is the simple comparison inside the poor essay, and the two-by-two interaction with the no-photo condition removed reaches only F = 2.93, p below .10. And the sample is sixty men at one American university in 1974, marking one essay, ten to a cell.",
    },
    body: {
      en: "The other classic demonstration of this effect is worth knowing because it makes the same point on a thing that cannot possibly have changed. Nisbett and Wilson filmed one college instructor twice, once warm and friendly and once cold and distant, and asked 118 students to rate not just how much they liked him but his physical appearance, his mannerisms, and his accent. The students who saw the warm tape found all three appealing; the students who saw the cold tape found the same three irritating, and the accent gap was as solid as the rest at p below .0002. An accent is not something a man changes between takes, and to be sure of it the authors ran a further 34 subjects on the same tapes with the audio stripped out: the visible attributes did not differ at all, t below 1 for both. Then they asked the students directly whether liking the teacher had coloured their ratings of his attributes. The students said no. The ones who had seen the cold tape said something stronger and stranger: that it was the other way round, that disliking his appearance and mannerisms and accent had lowered their opinion of him, and they held to it under questioning. One of them, pressed, said that he had simply turned the question around. That is the part that makes this a reasoning trap and not a curiosity about beauty. The influence is not available to introspection, so asking yourself whether you were swayed is not a check, and feeling unswayed is not evidence."
    },
    view: {
      kind: "bothrows",
      caption: { en: "And when the work was poor" },
    },
  },

  lesson: {
    skillName: { en: "The halo effect" },
    takeaway: {
      en: "An irrelevant impression bleeds into judgements you believe you are making independently, and it bleeds most where the evidence is weakest. The moment a thing is hard to judge on its merits is the moment something else quietly starts doing the judging.",
    },
    body: {
      en: "Thorndike named this in 1920, after noticing that officers rating their soldiers gave suspiciously consistent marks across unrelated qualities: a man judged good at his job was also judged more intelligent, more loyal and better looking. He called it a constant error, and the interesting part of the century since is how the claim has narrowed and hardened. The weak version, that a general impression colours what we assume about qualities we have not observed, is nearly trivial and was never really in doubt. The strong version is the one these two experiments support: that the impression alters judgements of qualities sitting right in front of you, that you have all the information you need to judge independently, and that you would swear you judged on the merits. An essay you have read. A face you are looking at. An accent you are listening to. What Landy and Sigall add is the condition. The photograph was worth almost nothing when the essay was good and two and a half marks out of nine when it was poor, and that pattern is the practical part, because it tells you where to look. Halo does not spread evenly over every judgement. It concentrates wherever the evidence runs out. That is why it is worst in exactly the decisions people most want to believe are meritocratic: the borderline hire, the marginal grant, the ambiguous case, the candidate nobody can agree about. In the clear cases everyone agrees anyway and the bias has nothing to do. In the hard cases, which are the ones that actually get argued over, it has the floor.",
    },
    howItWorks: {
      en: "The defence is structural rather than mental, because the mental one does not work. Nisbett and Wilson's students were asked directly and denied it, and the group who had been most affected reported the influence running backwards. Introspection is not a check here; it is the thing being fooled. So: separate the judgement from the irrelevant cue before the judgement happens, rather than trying to discount it afterwards. Blind marking, blind review and blind auditions exist for exactly this, and the reason they work is that they remove the cue rather than asking the judge to ignore it. Where you cannot blind, split the judgement into components and score them one at a time against written criteria, because a global impression formed first will otherwise supply the answer to every specific question that follows. And watch for the ambiguity signal: if you notice that a case is hard to call, that is precisely the moment to be suspicious of your own confidence, since that is where the evidence has stopped steering and something else has taken over. Two things this does not license. It is not a claim that attractive people are always favoured; the no-photograph condition in this study sat close to the attractive one, so what is on show is mostly a penalty for unattractiveness on weak work rather than a bonus for beauty. And it is not a licence to dismiss any judgement you dislike as halo. The point is not that all evaluation is corrupt, it is that evaluation is most corruptible where it is least determined, which is a much narrower and much more useful claim.",
    },
  },

  share: {
    title: { en: "The halo effect, a reasoning trap." },
    explainer: {
      en: "Sixty students marked an identical 700-word essay out of nine, with a photograph of the supposed author clipped to it. When the essay was well written, the photograph was worth 0.8 of a mark and the difference was not significant: 6.7 with an attractive author, 5.9 with an unattractive one. When the essay was badly written, the same photograph was worth two and a half marks: 5.2 against 2.7, p below .001. The essay never changed. The bias waited for the moment the work stopped answering the question.",
    },
    captions: {
      competitive: { en: "Knew where the bias was hiding." },
      selfDeprecating: { en: "I would have sworn I marked it on the writing." },
    },
  },

  provenance: {
    source:
      "Landy D, Sigall H. Beauty is talent: task evaluation as a function of the performer's physical attractiveness. Journal of Personality and Social Psychology. 1974;29(3):299-304. Read in full. Design: 60 male undergraduates at the University of Rochester recruited from an introductory psychology course, in a 2 x 3 factorial of essay quality (good, poor) by writer physical attractiveness (attractive, unattractive, control with no photograph), 10 subjects per cell. Two standard untitled essays of about 700 words on the role and effects of television in society were prepared, one well written and one poorly written, containing clichés and errors in usage. Pretesting on a separate sample of 30 undergraduates confirmed the manipulation: mean general quality 6.47 (SD 1.36) for the good essay against 4.40 (SD 1.76) for the poor one, F = 10.40, df 1/28, p < .005. The two photographs were college yearbook photographs of female students, chosen as the highest and lowest mean ranking from 15 facial photographs ranked for attractiveness by six male graduate students; both cards carried the same fictitious name and background. Table 1, general quality of the essay on a 9-point scale from poor (1) to good (9), means with standard deviations, n = 10 per cell: good essay, attractive 6.7 (SD 1.57), control 6.6 (SD 1.35), unattractive 5.9 (SD 1.60), row mean 6.4; poor essay, attractive 5.2 (SD 1.55), control 4.7 (SD 1.95), unattractive 2.7 (SD 1.34), row mean 4.2; column means 6.0, 5.5, 4.3. Analysis of variance on that measure: essay quality F = 29.43 (df 1, p < .001), writer attractiveness F = 6.26 (df 2, p < .01), interaction F = 1.60 (df 2, not significant), error MS 2.467 on 54 df. Simple comparisons reported in the text: attractive-good (6.7) against unattractive-good (5.9) F = 1.30, df 1/54, not significant; attractive-poor (5.2) against unattractive-poor (2.7) F = 12.65, df 1/54, p < .001. With the control condition deleted, the 2 x 2 interaction on general quality gives F = 2.93, df 1/54, p < .10. Table 2 reports a second measure, an essay evaluation score summing creativity, ideas and style, with the same pattern: good essay 17.9, 17.9, 15.5 and poor essay 14.9, 13.4, 8.7, attractiveness F = 5.34, interaction F < 1, and simple comparisons of 1.46 (not significant) and 9.71 (p < .005). Secondary source quoted in the reveal and the lesson: Nisbett RE, Wilson TD. The halo effect: evidence for unconscious alteration of judgments. Journal of Personality and Social Psychology. 1977;35(4):250-256, also read in full: 118 University of Michigan students, 62 male and 56 female, rating one instructor filmed warm or cold on 8-point scales; liking 5.48 against 3.18, t = 8.62; physical appearance t = 4.71, mannerisms t = 4.06, accent t = 3.78, all df 1/117 and all p < .0002; a control study of 34 further subjects viewing the tapes without audio found the visible attributes did not differ, t < 1 for both; and of the subjects asked about the direction of influence, those in the cold condition reported that their evaluations of the attributes had lowered their liking, t = 3.28, 2.80 and 2.74, all p < .01.",
    year: 1974,
    doi: "10.1037/h0036018",
    url: "https://psycnet.apa.org/record/1974-22185-001",
    note: {
      en: "Five things. First, what the chart draws and what it does not. The points are the published cell MEANS on the paper's own 9-point scale, one per cell of the 2 by 3. The standard deviations are printed in the paper and are recorded in the source field above, but they are deliberately not drawn: this shape draws means, and turning an SD into an interval would be this deck's arithmetic on somebody else's figure. Second, and this is the honesty note that matters most, the overall 2 by 3 interaction was NOT statistically significant on either measure, F = 1.60 on general quality and F < 1 on the essay evaluation score. What the card claims is the simple comparison inside the poor essay, F = 12.65 and p < .001, set against the simple comparison inside the good essay, F = 1.30 and not significant, both of which the paper reports directly; and the 2 by 2 interaction with the control condition removed, which reaches only F = 2.93 at p < .10. The reveal says all of this rather than implying a cleaner result than exists. Third, on why the famous halo paper is quoted rather than drawn. Nisbett and Wilson 1977 was read in full for this card and is the better story, but it prints means only for the liking measure, 5.48 against 3.18; every attribute result appears as a t value in text and as percentage bars in its figures, and this project does not read values off a bar chart. So it supplies the mechanism, the accent that cannot have changed, the audio-stripped control and the denial, while the figure comes from the source that prints a full table. Fourth, on the no-photograph condition, which the reveal draws attention to because it changes the interpretation: at 6.6 and 4.7 it sits close to the attractive author in both rows, so the data show a penalty for unattractiveness on weak work rather than a bonus for beauty. Fifth, on scope. Sixty men at one American university in 1974, ten per cell, marking a single essay about television, with attractiveness operationalised by six graduate students ranking yearbook photographs. The card claims the structure of the effect and its dependence on ambiguity, not the size of the gap.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Halo_effect",
};
