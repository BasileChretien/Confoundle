import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #43, the continued influence effect, via Kassin and Sommers (1997).
 *
 * NO NEW SHAPE. `rates` with one stratum, holding two of the four groups back
 * at the setup through `initialView.groupIds`.
 *
 * WHY THIS PAPER AND NOT THE FAMOUS ONES. `docs/lesson-backlog.md` entry 12
 * records three continued-influence papers read at source and refused, because
 * the field's dependent measure is a coded mean per person and there is no
 * numerator over a denominator anywhere in it. A verdict is binary, so the
 * instructed-disregard paradigm gives counts where the memory paradigm cannot.
 *
 * WHY THE LESSON IS NOT "CORRECTIONS DO NOT WORK". That is what the deck would
 * have taught from any of the refused papers, and this study shows it is wrong.
 * One instruction to disregard was obeyed completely and the other was not, and
 * the difference was what the jury was told about *why*. Told the tape might not
 * say what it seemed to, they set it aside and convicted at exactly the control
 * rate. Told it was real but illegally obtained, they used it anyway. So the
 * reveal is a discrimination rather than a failure, which is a better lesson and
 * a harder one.
 *
 * The commit beat asks which of the two disregard groups convicted more, which
 * the framing licenses by naming both reasons. It does not ask by how much.
 */
export const continuedInfluence: Puzzle = {
  schemaVersion: 1,
  id: "strike-that-from-the-record",
  slug: "strike-that-from-the-record",
  category: "causal-reasoning",
  reasoningSkill: "continued-influence-effect",
  difficulty: "hard",
  tags: ["law", "psychology", "everyday"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "One piece of evidence took the conviction rate from 24 per cent to 79 per cent.",
    },
    framing: {
      en: "81 mock jurors watched the same murder trial on videotape, in one of four versions. In the control version the prosecution case was circumstantial and ambiguous. In the other three a police officer revealed a wiretap from an unrelated case, on which the defendant could be heard confessing minutes after fleeing the scene. The defence objected every time. In one version the judge overruled the objection and admitted the tape. In the two others he sustained it and told the jury to disregard the tape, but he gave two different reasons. One jury was told the tape had been obtained without a proper warrant, so a fair trial meant not considering illegally obtained evidence. The other was told the tape was barely audible and it was difficult to make out what was said, so a fair trial meant not considering unreliable evidence. Everything else, all 23 paragraphs of it, was identical.",
    },
    question: {
      en: "Of the two juries told to disregard the tape, which convicted more often?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Voted guilty" },
      // A conviction is not a success. Marking the tall bar a winner would have
      // the deck cheering for a verdict.
      higherIsBetter: false,
      crownWinner: false,
      groups: [
        {
          id: "control",
          label: { en: "No wiretap at all" },
          short: { en: "Control" },
        },
        {
          id: "admissible",
          label: { en: "Wiretap admitted" },
          short: { en: "Admitted" },
        },
        {
          id: "due-process",
          label: { en: "Disregard it: illegally obtained" },
          short: { en: "Illegal" },
        },
        {
          id: "unreliable",
          label: { en: "Disregard it: too unreliable to trust" },
          short: { en: "Unreliable" },
        },
      ],
      strata: [{ id: "all", label: { en: "All mock jurors" } }],
      observations: [
        { groupId: "control", stratumId: "all", numerator: 5, denominator: 21 },
        { groupId: "admissible", stratumId: "all", numerator: 15, denominator: 19 },
        { groupId: "due-process", stratumId: "all", numerator: 11, denominator: 20 },
        { groupId: "unreliable", stratumId: "all", numerator: 5, denominator: 21 },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["control", "admissible"],
      caption: { en: "What the tape was worth when the jury could use it" },
    },
  },

  choices: [
    {
      id: "both-high",
      label: { en: "Neither. Both stayed high" },
      sublabel: { en: "you cannot unring a bell" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "both-low",
      label: { en: "Neither. Both fell back to the control rate" },
      sublabel: { en: "juries follow the judge" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "due-process",
      label: { en: "The jury told the tape was illegally obtained" },
      sublabel: { en: "nobody said it was wrong, only barred" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Wrong, and the framing is what makes it wrong. Both reasons for
      // exclusion are stated, and they differ in whether the confession still
      // happened. That is the discriminator, so the beat is answerable.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "24, 79, 55 and 24. They obeyed one instruction and ignored the other." },
    mechanismLabel: { en: "Both reasons for excluding it" },
    mechanismName: { en: "Disregarding depends on being told the thing is false" },
    explanation: {
      en: "The jury told the tape was unreliable convicted 5 of 21, which is the control rate to the last juror: they set it aside completely, as though they had never heard it. The jury told the tape was illegally obtained convicted 11 of 20, more than twice as often. Both had been told to disregard exactly the same evidence by the same judge in the same trial. The only difference was that one of them had been given a reason to think the confession might not have happened, and the other had been told it happened and could not be used.",
    },
    body: {
      en: "This is worth being precise about, because the popular version of this finding is that corrections do not work, and that is not what happened here. One correction worked perfectly. What people cannot do is stop believing something they still think is true, and an instruction that concedes the fact while forbidding the use is asking exactly that. The paper also found the jurors did not know it had happened: asked afterwards which factors led to their verdict, 12 of 19 in the admitted group named the wiretap, against 3 of 20 in the illegally-obtained group. They had discounted it sincerely, and convicted on it anyway.",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "The continued influence effect" },
    takeaway: {
      en: "A retraction only works if it gives you a reason to think the claim was false. Being told you may not use it leaves the belief standing.",
    },
    body: {
      en: "When you meet a correction, look at what it actually replaces. A retraction that says the study was fabricated, the tape was inaudible, the source has recanted, gives you something to believe instead, and people who get one really do let go. A retraction that says this turned out to be improperly obtained, or is not relevant, or should not have been published, leaves the original claim intact in your head and merely forbids it. That second kind is the one that does not take, and it is also the kind institutions issue most often, because it is the kind that does not require admitting the thing was wrong.",
    },
    howItWorks: {
      en: "The practical move is to ask, of any correction you meet or issue, whether it supplies a replacement account. If a newspaper retracts a story because it cannot stand it up, readers still have the story and now have nothing else, so it stays. If it retracts because the document was forged and here is how, that is a different fact and it displaces the first. The same test applies inwardly. When you find you have been told to set something aside, notice whether you have been given grounds to disbelieve it or merely grounds not to mention it, because in the second case you should expect it to keep steering you, and expect not to notice. That last part is the uncomfortable one: the jurors in this study who were most influenced were also the ones who did not list the tape among the things that swayed them, so introspection reported compliance while the verdicts reported otherwise.",
    },
    examples: [
      {
        title: { en: "Why the counts here are reconstructed, and why they are safe" },
        summary: {
          en: "The paper prints percentages by condition rather than counts, but it also prints enough to pin them: 81 jurors, 36 guilty verdicts overall, group sizes stated as 19 to 21, 60 in the three experimental groups and 41 in the two disregard groups. Only one set of counts satisfies all of that, and it then reproduces both published chi-square statistics to the second decimal, 17.31 and 14.56, which nothing was fitted to.",
        },
        provenance: {
          source:
            "Kassin SM, Sommers SR. Inadmissible testimony, instructions to disregard, and the jury: substantive versus procedural considerations. Personality and Social Psychology Bulletin. 1997;23(10):1046-1054.",
          year: 1997,
          doi: "10.1177/01461672972310005",
          url: "https://doi.org/10.1177/01461672972310005",
        },
      },
    ],
  },

  share: {
    title: { en: "The continued influence effect, a reasoning trap." },
    explainer: {
      en: "Being told to disregard something works, but only when you are told it might be false. Told instead that it is true and simply not allowed, people carry on using it, and sincerely report that they did not. Whenever you meet a correction, ask whether it hands you a new account or just takes the old one off the table.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Kassin SM, Sommers SR. Inadmissible testimony, instructions to disregard, and the jury: substantive versus procedural considerations. Personality and Social Psychology Bulletin. 1997;23(10):1046-1054. 81 mock jurors, four conditions, ns stated on page 1048 as 19 to 21. Conviction rates printed on page 1049 and in Figure 1 as 24, 79, 55 and 24 per cent, with 36 guilty and 45 not guilty overall.",
    year: 1997,
    doi: "10.1177/01461672972310005",
    url: "https://doi.org/10.1177/01461672972310005",
    note: {
      en: "The counts in this puzzle are reconstructed, which this project normally refuses, so the grounds are given in full. The paper prints percentages rather than counts, but it also prints six other things: 81 participants, 36 guilty verdicts, an overall rate of 44.4 per cent, group sizes of 19 to 21, 58 of 60 in the three experimental groups recalling the ruling, and 39 of 41 in the two disregard groups. Those fix the control group at 21 and the admitted group at 19 without any arithmetic on percentages at all, and leave the two disregard groups to split 41. Only 20 and 21 work, because 55 per cent recovers a whole number against 20 and against nothing else in range. The resulting counts, 5 of 21, 15 of 19, 11 of 20 and 5 of 21, then sum to 36 guilty out of 81, which was printed independently, and reproduce the published chi-square of 17.31 exactly, along with 14.56 for the separate question of who cited the wiretap. Six printed quantities, none of them fitted to, all recovered. That is why these were accepted where the reconstructions in lesson-backlog entry 12 were refused: there, several readings survived and none landed exactly. The study is a laboratory simulation with student mock jurors deciding individually rather than deliberating, and it does not establish what real juries do.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Continued_influence_effect",
};
