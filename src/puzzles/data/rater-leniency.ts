import type { Puzzle } from "../schema";

/**
 * Puzzle #75, rater leniency, on Starch and Elliott's 1913 geometry paper.
 * Closes backlog entry 74, whose leniency half had been blocked on a sourcing
 * bar with two requirements rather than one.
 *
 * WHY THIS SOURCE AND NOT THE THREE THE BACKLOG PROPOSED. Entry 74 nominated
 * examiner stringency in clinical examinations, grant peer review, and judged
 * sports. All three fail the same way: that literature reports variance
 * components, intraclass correlations and generalisability coefficients, and
 * this project does not build figures out of coefficients. The second
 * requirement was the harder one anyway. Per-rater numbers identify nothing
 * unless the raters judged COMPARABLE work, because judges who saw different
 * candidates differ for reasons that have nothing to do with how they judge.
 *
 * Starch and Elliott clear that bar in the strongest possible way: the work is
 * not comparable across raters, it is IDENTICAL. One geometry final, written by
 * a real pupil, was reproduced by plate, "thus exactly reproducing the original
 * in every detail", and copies were sent to about 180 high schools in the North
 * Central Association, each asked to have its principal mathematics teacher
 * grade it by the school's own practices and standards.
 *
 * WHY THE CARD DRAWS FIVE MARKS AND NOT THE WHOLE STUDY. 140 papers came back
 * and 12 were discarded for missing data. The aggregate is a dot plot the OCR
 * cannot recover, and it is confounded in the way a critic would immediately
 * name: schools scattered across a large area may simply hold different
 * standards. Starch and Elliott anticipated exactly that objection and answered
 * it by printing two SINGLE-SCHOOL subsets, mark by mark. The school the paper
 * came from has five geometry teachers, who each graded it independently:
 *
 *   70, 65, 60, 70, 59        average 64.8, mean variation 4.2
 *
 * Both numbers recompute exactly (64.80 and 4.24). That school's passing grade
 * is 70. So two of its five teachers passed this paper and three failed it,
 * with one shared standard, one staffroom, and one script. Nothing about the
 * schools and nothing about the pupil can be doing that work. A large Ohio high
 * school, also passing at 70, gave 76, 75, 67 and 61 (printed 69.8 and 5.8,
 * computed 69.75 and 5.75); that is the lesson's worked example.
 *
 * AN ERROR IN THE PAPER, recorded so nobody re-derives it. The text says "Of
 * the remaining 138", which is wrong twice over: 140 minus 12 is 128, and the
 * three subgroups that same sentence lists are 43 + 75 + 10 = 128. The card
 * needs neither figure and quotes neither.
 *
 * WHAT THE CARD MAY CLAIM, AND THIS IS THE CONSTRAINT THE BACKLOG GOT WRONG.
 * Entry 74 described this lesson as leniency and severity, "a systematic
 * shift", meaning a marker who is reliably soft or hard across many pieces of
 * work. This design cannot show that: each marker graded ONE paper, so a single
 * mark cannot be separated from noise, and calling any individual teacher here
 * a soft marker would be reading a person out of one data point. What it shows,
 * about as cleanly as anything could, is the rule entry 74 itself named: the
 * rater is an uncontrolled variable in the measurement. "Who marked it changed
 * the mark" is licensed. "Teacher four is lenient" is not, and the card says so
 * in the reveal rather than leaving a reader to over-read it.
 *
 * THE HEDGE RULE, AND WHERE THE DISCRIMINATOR LIVES. The skill licenses a
 * direction, that the marks move, and not a magnitude. So the framing carries
 * the discriminator rather than the answer key: it states the passing grade and
 * states that the first teacher gave exactly 70, which is to say the paper sits
 * ON the line with no margin at all. Given that, the band claiming the marks
 * drifted "a point or two" while the verdict held is self-refuting rather than
 * defensible, because any drift downward from exactly 70 fails the paper. No
 * band is left that a player reasoning correctly from the framing could choose
 * and be marked wrong. `rater-leniency.test.ts` pins that sentence.
 *
 * SCALE. The figure runs 50 to 90 rather than 0 to 100, because these five
 * marks run 59 to 70 and would be an illegible cluster on the full scale. This
 * cannot flatter the finding: what the card claims is that the marks fall on
 * both sides of the pass line, which is where the line is drawn and not how
 * wide the axis is, and every mark is printed as a numeral beside its dot.
 */
export const raterLeniency: Puzzle = {
  schemaVersion: 1,
  id: "rater-leniency-starch-elliott-1913",
  slug: "who-marked-it",
  category: "cognitive-bias",
  reasoningSkill: "rater-leniency",
  difficulty: "medium",
  tags: ["education", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "One geometry paper, copied exactly, sent out to be marked. The first teacher gave it 70.",
    },
    framing: {
      en: "In 1913 two researchers took a real geometry final, written by a pupil in a large Wisconsin high school, and had printing plates made of it so that hundreds of copies reproduced the original in every detail, handwriting and all. Every marker therefore saw the identical script: the same proofs, the same crossings out, the same untidy diagrams. Five geometry teachers in the pupil's own school each marked that script independently, without conferring. They share a staffroom, a syllabus, and one written passing grade, which is 70. The first of them marked it exactly 70, so on that marker's desk the paper passed, with nothing to spare.",
    },
    question: {
      en: "The other four teachers in that same school marked the identical script. What did their marks do to the verdict?",
    },
    data: {
      type: "raters",
      label: { en: "Marks given to one geometry script" },
      subject: { en: "One geometry final, reproduced by plate so every marker saw the identical script" },
      metricLabel: { en: "Mark out of 100" },
      min: 50,
      max: 90,
      threshold: 70,
      thresholdLabel: { en: "The school's passing grade, 70" },
      aboveLabel: { en: "Passed it" },
      belowLabel: { en: "Failed it" },
      groups: [
        {
          id: "wisconsin",
          label: { en: "The five geometry teachers of the school the paper came from" },
        },
      ],
      raters: [
        { id: "first", label: { en: "The first teacher" }, groupId: "wisconsin", mark: 70 },
        { id: "second", label: { en: "The second teacher" }, groupId: "wisconsin", mark: 65 },
        { id: "third", label: { en: "The third teacher" }, groupId: "wisconsin", mark: 60 },
        { id: "fourth", label: { en: "The fourth teacher" }, groupId: "wisconsin", mark: 70 },
        { id: "fifth", label: { en: "The fifth teacher" }, groupId: "wisconsin", mark: 59 },
      ],
    },
    initialView: {
      kind: "onemarker",
      // The one marker whose mark the framing quotes. Adding the other four is
      // the whole reveal, so naming them here would hand it over.
      groupIds: ["first"],
      caption: { en: "As the first teacher marked it" },
    },
  },

  choices: [
    {
      /**
       * The intuitive trap, and the one the subject itself seems to guarantee.
       * Starch and Elliott chose geometry for exactly this reason: they were
       * answering the objection that English marks vary because language is
       * subjective and that an exact science would not.
       */
      id: "all-passed",
      label: {
        en: "Nothing. It is geometry, so a proof is either right or it is wrong, and four more teachers meant four more marks around 70",
      },
      sublabel: { en: "an exact subject marks itself" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "verdict-split",
      label: {
        en: "The verdict stopped being a fact about the paper. It passed with some of them and failed with others",
      },
      sublabel: { en: "the mark followed the marker" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      /**
       * Self-refuting given the framing rather than merely wrong, which is what
       * keeps the commit beat answerable. The framing states the passing grade
       * and states that the paper sits exactly on it, so a drift of "a point or
       * two either way" cannot leave the verdict standing.
       */
      id: "small-drift",
      label: {
        en: "The marks drifted a point or two either way, as marking always does, and the verdict held",
      },
      sublabel: { en: "noise too small to matter" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "all-failed",
      label: {
        en: "All four put it below 70, so the first teacher was the soft one and the paper was really a fail",
      },
      sublabel: { en: "one lenient outlier" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "70, 65, 60, 70 and 59. Two of the five passed it. Three failed it.",
    },
    view: {
      kind: "everymarker",
      caption: { en: "As all five teachers in that one school marked it" },
    },
    mechanismLabel: { en: "What the marker decided" },
    mechanismName: { en: "The rater is a variable in the measurement" },
    explanation: {
      en: "The same script, in one school, under one written passing grade, came back with an eleven point spread and no settled verdict. The average was 64.8 and the average distance of a mark from that average was 4.2. Nothing about the paper changed between those five desks, because there was only ever one paper: the plates guaranteed that every teacher saw the same handwriting, the same diagrams and the same mistakes.",
    },
    body: {
      en: "Starch and Elliott ran this because of an objection to their earlier study of English marking. Language is subjective, the argument went, so of course English marks vary, and a mathematical paper would be graded with mathematical precision. It was graded less precisely. The spread on this geometry script was wider than on either English paper they had used. The reason is not that the teachers disagreed about whether a proof was correct, which is the one thing geometry does settle. It is that a mark is not a judgement about correctness alone: it also prices neatness, form, spelling, the order of the steps, and how much a given demonstration is worth out of the whole. One teacher deducted four points for spelling. Another wrote that no deduction had been made for poor form. A third gave 75 including a penalty for form, or 85 without one, and could not decide. The amount subtracted for careless presentation ranged from three points to thirteen. Every one of those markers was being careful, and the papers came back with per-question marks and written comments showing it. Note what this study can and cannot say. It cannot tell you that the fifth teacher is a harsh marker, because the fifth teacher graded one paper, and one mark is not a person. What it can tell you is that the identity of the marker was doing work that everybody involved believed the paper was doing.",
    },
  },

  lesson: {
    skillName: { en: "Rater leniency" },
    takeaway: {
      en: "A score is a fact about two things: the work, and whoever happened to judge it. Nothing on the certificate records the second one, so a mark near a boundary has not really settled anything, and comparing scores awarded by different judges compares the judges as much as the candidates.",
    },
    body: {
      en: "The trap is not that judges are careless. It is that a score arrives stripped of the one piece of information you would need to discount it, namely who produced it. A mark of 65 on a transcript looks like a property of the pupil. In this study, 65 was the second teacher, and 70 was the first and the fourth, and 59 was the fifth, all of the same script. Once the mark is written down, the marker vanishes and the number is treated as though the paper had produced it. That is why this bias survives so well in institutions that are otherwise careful: everything downstream, the pass list, the transcript, the ranking, the appeal, inherits a number whose largest single input has been discarded. And notice that the effect here is not small print. It moved a real pupil across a real pass line. Three of the five teachers in that pupil's own school would have failed a paper that two of them passed, which means the pupil's result depended on which teacher happened to pick the script off the pile.",
    },
    howItWorks: {
      en: "Two questions to carry, and one thing not to conclude. First: did one judge decide this, or several, and does anyone know which? Grant panels, peer review, clinical rating scales, examiner marking, interview panels and performance reviews all produce a number attached to a candidate and not to an assessor, and once the number is stored the assessor is usually unrecoverable. If you cannot name who judged it, you cannot tell how much of the score is theirs. Second: is the score near a boundary that decides something? A spread of a few points is harmless in the middle of a distribution and decisive at a cutoff, which is where pass marks, funding lines and shortlists all live. Two candidates half a point apart at a threshold have not been separated by the work. The defences are structural rather than mental, because nobody in this study believed they were marking anything but the paper: have more than one person judge anything consequential and record every judgement rather than only the average, so the disagreement stays visible instead of being smoothed away. Calibrate before judging, on a common piece of work everyone marks, which is precisely the design that made this study possible. Score against criteria written down before the first case, and score one criterion at a time, since this paper's spread came mostly from what each teacher silently decided a mark was for. Where a boundary decides something, treat the cases nearest the line as unresolved rather than as decided. And the thing not to conclude: this does not license dismissing any particular judge as harsh or soft. Each teacher here marked one paper, and one mark is a data point about a measurement, not a verdict about a person.",
    },
    examples: [
      {
        title: { en: "A second school, the same script, the same answer" },
        summary: {
          en: "The obvious objection to a spread like this is that it came from schools scattered across a large area, each holding different standards. Starch and Elliott answered it twice. Both schools they name mark to a passing grade of 70. In the pupil's own school, five geometry teachers gave the script 70, 65, 60, 70 and 59. In a large high school in Ohio, four gave it 76, 75, 67 and 61. That is nine markers in two staffrooms, one identical script, four passes and five fails. Different standards between institutions cannot explain a disagreement that happens inside a single institution, twice.",
        },
        provenance: {
          source:
            "Starch D, Elliott EC. Reliability of Grading Work in Mathematics. The School Review. 1913;21(4):254-259, page 258 to 259. The Wisconsin school's five geometry teachers marked the paper 70, 65, 60, 70 and 59, printed with an average of 64.8 and a mean variation of 4.2; recomputing from those five marks gives 64.80 and 4.24. The Ohio school's four marked it 76, 75, 67 and 61, printed as 69.8 and 5.8; recomputing gives 69.75 and 5.75. The passing grade in both schools is stated as 70.",
          url: "https://archive.org/details/jstor-1076246",
          year: 1913,
        },
      },
      {
        title: { en: "It is not the hard part of the paper that moves" },
        summary: {
          en: "A natural guess is that the disagreement collects on the difficult questions, where partial credit is a matter of taste, and that the paper as a whole is steadier than any single question in it. The authors checked. Sixty-two of the returned papers carried a separate mark for every question, and the marks given to the answer to one single question varied about as widely, once put on a comparable scale, as the marks for the entire paper did. Averaging ten questions together did not average the disagreement away, because the disagreement was not noise scattered across the questions. It was the marker, present in every one of them.",
        },
        provenance: {
          source:
            "Starch D, Elliott EC. Reliability of Grading Work in Mathematics. The School Review. 1913;21(4):254-259, page 259. Sixty-two returns carried marks for each separate question, 49 graded on a scale of 0 to 12.5 and 13 on a scale of 0 to 10. For question ten the 13 marks on the 0 to 10 scale were 5, 5, 0, 0, 5, 3, 4, 2, 3, 2, 5, 6.5 and 5, printed with an average of 3.5 and a mean variation of 1.7; recomputing from those thirteen marks gives 3.50 and 1.69. The 49 marks on the 0 to 12.5 scale gave a probable error of 1.1, which the authors rescale to 8.8 on a 0 to 100 scale, against 7.5 for the whole paper.",
          url: "https://archive.org/details/jstor-1076246",
          year: 1913,
        },
      },
    ],
  },

  share: {
    title: { en: "Rater leniency, a reasoning trap." },
    explainer: {
      en: "In 1913 a real geometry final was reproduced by printing plate so that every marker saw the identical script, handwriting and all. Five geometry teachers in the pupil's own school, marking to one written passing grade of 70, gave it 70, 65, 60, 70 and 59. Two passed it and three failed it. Four teachers at a second school, also passing at 70, gave it 76, 75, 67 and 61. The mark followed the marker.",
    },
    captions: {
      competitive: { en: "Knew the marker was in the mark." },
      selfDeprecating: { en: "I would have sworn geometry marks itself." },
    },
  },

  provenance: {
    source:
      "Starch D, Elliott EC. Reliability of Grading Work in Mathematics. The School Review. 1913;21(4):254-259. A geometry final examination paper written by a pupil in one of the largest high schools in Wisconsin was reproduced by printing plate, 'thus exactly reproducing the original in every detail', and copies were sent with the question set to approximately 180 high schools in the North Central Association, each asked to have its principal mathematics teacher grade the paper according to the practices and standards of the school. 140 papers were returned and 12 discarded for incomplete data. Page 258: the school from which the paper was obtained has five teachers of geometry, each of whom graded it independently, giving 70, 65, 60, 70 and 59, average 64.8, mean variation 4.2, in a school whose passing grade is 70. Page 259: in a large high school in Ohio, also passing at 70, four teachers of geometry gave 76, 75, 67 and 61, average 69.8, mean variation 5.8.",
    url: "https://archive.org/details/jstor-1076246",
    year: 1913,
    note: {
      en: "Four things. First, the marks the card draws are printed candidate by candidate rather than summarised, and every statistic the paper prints for them recomputes exactly: 70, 65, 60, 70 and 59 give 64.80 and 4.24 against a printed 64.8 and 4.2, and the Ohio four give 69.75 and 5.75 against a printed 69.8 and 5.8. Second, an arithmetic error in the source, recorded so that nobody re-derives it: the text reads 'Of the remaining 138', which is wrong on two independent routes, since 140 returned minus 12 discarded is 128, and the three subgroups listed in that same sentence are 43 + 75 + 10 = 128. The card quotes neither figure because it does not need to. Third, the single-school subsets are what this card draws, and deliberately so. The full distribution is a dot plot rather than a table, and it is open to the objection that schools scattered over a large area hold different standards; the authors included these two schools precisely to answer that, and inside one school that objection cannot apply. Fourth, on what the design can support: each teacher graded one paper, so this shows that the identity of the marker moved the mark, and it cannot show that any particular teacher is systematically lenient or severe, which would need each marker judging many scripts. The reveal and the lesson both say so rather than leaving it to be over-read. The paper is 1913 and freely readable in full through the JSTOR Early Journal Content programme, so any of this can be checked without institutional access.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Inter-rater_reliability",
};
