import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #72, the serial position effect, on the Queen Elisabeth piano
 * competition (Ginsburgh and van Ours, AER 2003). This closes backlog entry 73,
 * which spent two prior sessions being narrowed before a usable source appeared.
 *
 * WHY THIS SOURCE AND NOT THE OBVIOUS ONE. The ballot-order literature is the
 * first place anyone looks, and Ho and Imai 2008 is its best paper, but it was
 * rejected twice over: it prints causal-effect estimates rather than the
 * quantities behind them, and its headline structure (order moves minor-party
 * and primary votes, barely touches major parties in generals) is the halo
 * card's transferable rule in a different costume, because both reduce to "the
 * cue does the work when the evidence runs out". A second card landing on a
 * rule the deck already teaches is not a card. The full reasoning is in entry 73.
 *
 * WHAT THIS COMPETITION GIVES INSTEAD. The order of appearance is drawn AT
 * RANDOM before the competition and left unchanged. Twelve finalists per
 * competition, eleven competitions from 1952 to 1991, so 132 musicians. Every
 * finalist plays the same concerto, written for the competition and handed to
 * them exactly seven days before they appear. Two perform per evening. The jury
 * grades after every evening, without discussion, and marks cannot be changed
 * once turned in. So the items compared are equivalent by construction and only
 * POSITION differs. There is no party label, no ambiguity gradient, and
 * therefore none of the information-conditionality that made Ho and Imai a
 * repeat.
 *
 * The authors verify the randomness rather than asserting it: order regressed
 * on sex, four nationality dummies and age gives R-bar-squared = 0.02 with no
 * coefficient significant at the 20 per cent level.
 *
 * THE NUMBERS, AND THEY RECONCILE. Table 2, ratings by Belgian music critics
 * collected in 1998 and split at the average:
 *
 *                        first to perform   all others
 *   rating below average        10              62
 *   rating above average         1              59
 *
 * 11 and 121, totalling 132, which is exactly twelve finalists times eleven
 * competitions with one first-performer each. 1 of 11 against 59 of 121 is
 * 9.1 per cent against 48.8 per cent. The paper prints chi-squared = 6.4 on 1
 * degree of freedom against a critical 3.84; recomputing from the four counts
 * gives 6.40, so the table and its statistic agree. All asserted in the test.
 *
 * Table 1 is the judges' own rankings, coded so the winner is 12: performing on
 * the first evening costs 2.958 positions (t = 3.1), and 3.421 (t = 4.8) with
 * `first` as the only regressor. Quoted in the reveal, not drawn, because this
 * deck does not build figures out of regression coefficients.
 *
 * NO NEW SHAPE. `rates` already draws counts and derives the percentages. The
 * setup draws the 121 who did not open the competition and the reveal adds the
 * 11 who did, which is the `restrict*` pattern the deck uses everywhere.
 *
 * THE HEDGE TRAP, AND WHY THE FRAMING IS WRITTEN THE WAY IT IS. Framed as "the
 * order is random, so what happens?", the correct answer is "nothing" and
 * marking it wrong would repeat the exact defect that had to be fixed on the
 * halo card. So the framing carries the MECHANISM without naming the direction,
 * the way `statistical-power` does: the concerto is unknown to the JUDGES too,
 * who have never heard it before the first evening, and marks are given
 * immediately and cannot be revised. From that a direction follows and
 * "about the same" requires ignoring the sentence. A test pins that sentence.
 *
 * THE HONESTY CONSTRAINTS ARE SEVERE AND ARE IN THE CARD. Only eleven musicians
 * ever performed first, so the headline rests on eleven people and a single
 * above-average rating. The critics' ratings are a downstream career outcome
 * measured in 1998, not the judges' marks. Only 11 of 25 surveyed critics
 * answered. The card claims that a lottery slot moved a career outcome, with
 * the sample stated plainly, and does not imply precision eleven cannot carry.
 */
export const serialPosition: Puzzle = {
  schemaVersion: 1,
  id: "serial-position-ginsburgh-van-ours-2003",
  slug: "the-slot-they-drew",
  category: "cognitive-bias",
  reasoningSkill: "serial-position-effect",
  difficulty: "medium",
  tags: ["psychology", "economics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Twelve finalists, one lottery for the running order. Here is how the ones who played later were rated, decades on.",
    },
    framing: {
      en: "At the Queen Elisabeth piano competition the order of appearance is drawn at random before anything is played, and it is never changed. Twelve finalists reach the last round. Every one of them performs the same concerto, written for the competition and handed to each of them exactly seven days before they appear, so nobody can have studied it in advance. Two play each evening. The jury grades after every evening, with no discussion between the judges, and a mark cannot be changed once it has been turned in. The concerto is new to the judges as well: before the first evening they have read the score, but none of them has ever heard it played. Years later, Belgian music critics were asked to rate every finalist from these competitions.",
    },
    question: {
      en: "In each competition one musician drew the slot that opens the whole final. How were they rated, decades later?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share rated above average" },
      higherIsBetter: true,
      groups: [
        {
          id: "others",
          label: { en: "Everyone who played later" },
          short: { en: "Played later" },
        },
        {
          id: "first",
          label: { en: "The musician who drew the opening slot" },
          short: { en: "Opened the final" },
        },
      ],
      strata: [
        {
          id: "critics",
          label: { en: "Rated above average by the critics, decades later" },
        },
      ],
      observations: [
        { groupId: "others", stratumId: "critics", numerator: 59, denominator: 121 },
        { groupId: "first", stratumId: "critics", numerator: 1, denominator: 11 },
      ],
    },
    initialView: {
      kind: "aggregate",
      // The 121 alone. Adding the eleven is the whole reveal, so naming them
      // here would hand it over.
      groupIds: ["others"],
      caption: { en: "Everyone who played later" },
    },
  },

  choices: [
    {
      /**
       * The intuitive trap, and the one the lottery itself seems to guarantee:
       * a draw cannot select for talent, so the two groups ought to match.
       */
      id: "about-the-same",
      label: {
        en: "About the same. The slot came out of a lottery, and a lottery cannot pick out who is any good",
      },
      sublabel: { en: "chance decides nothing" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "worse",
      label: {
        en: "Worse. The judges had never heard the piece either, so the first performance is marked against nothing at all",
      },
      sublabel: { en: "the first is judged before there is a scale" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "better",
      label: {
        en: "Better. Going first is memorable and the jury is at its freshest, with nothing yet to compare against",
      },
      sublabel: { en: "primacy helps" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      /**
       * Not a hedge but a real belief, and a cleaner distractor than "no way to
       * tell" would be here: with only eleven first performers, a player could
       * defend that hedge on sample size and be reasoning well, which is exactly
       * what the answer key must never punish.
       */
      id: "talent-wins",
      label: {
        en: "It depends on the player. A slot is a nuisance, but someone good enough plays through it",
      },
      sublabel: { en: "talent washes it out" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Of the 121 who played later, 59 were rated above average. Of the 11 who opened the final, one was.",
    },
    mechanismLabel: { en: "What the draw decided" },
    mechanismName: { en: "The first performance is marked against nothing" },
    explanation: {
      en: "48.8 per cent against 9.1 per cent, and the paper's chi-squared is 6.4 on one degree of freedom against a critical value of 3.84. The judges' own marks show the same thing at the time rather than decades later: performing on the first evening cost 2.958 places out of twelve, and 3.421 places when opening night is the only thing the model looks at. Nothing about these musicians differed except the slip of paper they drew. The authors checked that too, regressing the running order on sex, nationality and age and finding nothing: order is uncorrelated with everything they could measure, which is what makes the comparison worth anything at all.",
    },
    body: {
      en: "The mechanism the authors propose is the one the competition builds by accident. Every finalist plays the same concerto, written for the competition and handed out seven days ahead, and the judges have never heard it either. Whoever plays first is therefore marked against an idea of the piece rather than against any performance of it, by judges who cannot revise the mark once the week teaches them what the piece can sound like. What looks like a fair procedure, and was designed to be one, converts an arbitrary draw into a career. Note what this is not. It is not that the judges were careless or corrupt: they were world-famous performers and teachers doing exactly what they were asked to do, marking honestly and immediately. And note the size of the group, because it matters: eleven musicians ever opened a final in these eleven competitions, and exactly one of them was later rated above average. That is a small number carrying a large claim, and the right reading is that the direction is real and the precise gap is not something eleven people can pin down.",
    },
    view: {
      kind: "aggregate",
      caption: { en: "And the one who opened it" },
    },
  },

  lesson: {
    skillName: { en: "Serial position effect" },
    takeaway: {
      en: "When things are judged one after another, where you fall in the order changes the verdict, and it changes it even when the order was assigned by lottery and everyone is judging honestly. The order is almost never recorded as a reason, so it is almost never argued with.",
    },
    body: {
      en: "The useful thing about this study is what it rules out. Order effects are easy to explain away: perhaps the better candidates ask for later slots, perhaps the organisers seed the strong ones at the end, perhaps whoever goes first is nervous for reasons of their own. None of that survives a lottery. The draw happens before anything is played, it is uncorrelated with sex, nationality and age, and it cannot be traded. So when the first performers end up ranked three places lower out of twelve, the three places came from the position and nowhere else. What makes it a reasoning trap rather than a curiosity about music is the second half: the ranking then follows people. The critics who rated these musicians decades later were not present at the competition and were not asked about running order. They were rating careers, and the careers had been shaped by a rank that had been shaped by a draw. An arbitrary decision does not stay arbitrary; it gets laundered into a credential, and the credential is what everyone downstream sees.",
    },
    howItWorks: {
      en: "Two questions to carry. First: was this judged in a sequence, and does anyone know where in the sequence it fell? Interviews, auditions, grant panels, conference submissions, oral examinations and courtroom testimony are all sequences, and almost none of them record position as data. If it is not recorded it cannot be adjusted for and it cannot be challenged, which is what makes this different from a bias you can argue about after the fact. Second, and this is the practical tell: is the standard itself still being formed while the judging happens? That is what made this competition so severe a case. The judges were calibrating on a piece they had never heard, so the earliest performances were measured against an expectation rather than a field, and the marks could not be revised once the field existed. Any process where the rubric is really being invented during the first few cases has the same shape. The defences are structural, because the mental one does not work: nobody in that jury believed they were marking the running order. Rotate or randomise the order and record it, so at minimum the effect is visible. Score against written criteria fixed before the first case rather than against the cases seen so far. Where it matters most, review the earliest cases again at the end, once the standard exists, which is the only step that directly repairs the damage this study describes. And treat a close ranking as what it is: if three places out of twelve can come from a draw, then two candidates half a place apart have not been separated by anything you should be willing to defend."
    },
    examples: [
      {
        title: { en: "The same effect, inside a single evening" },
        summary: {
          en: "The draw fixes more than which night you play. Two musicians perform each evening, and the paper finds that the one who plays second gains about one place out of twelve over the one who plays first, from the same randomised draw. So the pattern is not only about the opening night of the competition. It repeats in miniature every evening, wherever a judge has just started forming an impression and the next performance arrives with something to be measured against. That estimate is the weakest of the three the paper reports, with a t value of 1.9, so it is worth stating as a direction rather than a quantity.",
        },
        provenance: {
          source:
            "Ginsburgh V, van Ours JC. Expert opinion and compensation: evidence from a musical competition. American Economic Review. 2003;93(1):289-296. Table 1, equation (a): the coefficient on `late`, defined as being second to play in a given evening, is 1.130 with a t value of 1.9, on rankings coded so that the winner receives 12.",
          year: 2003,
          doi: "10.1257/000282803321455296",
        },
      },
    ],
  },

  share: {
    title: { en: "The serial position effect, a reasoning trap." },
    explainer: {
      en: "At the Queen Elisabeth piano competition the running order is drawn at random and never changed, and every finalist plays the same concerto, handed to them seven days before and never heard by the judges either. Of the 121 finalists who played later, 59 were rated above average by critics decades afterwards. Of the 11 who drew the slot that opens the final, one was. The judges' own marks show it at the time: opening night cost about three places out of twelve.",
    },
    captions: {
      competitive: { en: "Knew the draw was doing the judging." },
      selfDeprecating: { en: "I would have sworn a lottery cannot pick winners." },
    },
  },

  provenance: {
    source:
      "Ginsburgh V, van Ours JC. Expert opinion and compensation: evidence from a musical competition. American Economic Review. 2003;93(1):289-296. Twelve finalists in each of eleven Queen Elisabeth piano competitions held between 1952 and 1991, 132 musicians in total, with the order of appearance drawn at random before the competition and unchanged thereafter. Table 2, ratings by Belgian music critics collected in 1998 and split at the average of 13.64: among the first candidates to perform, 10 were rated below average and 1 above; among all other finalists, 62 below and 59 above, chi-squared = 6.4 on 1 degree of freedom against a critical value of 3.84. Table 1, effect of order of appearance on the judges' rankings, with ranks coded so the winner receives 12: performing on the first evening carries a coefficient of -2.958 with a t value of 3.1 alongside controls for sex and for playing second in an evening, and -3.421 with a t value of 4.8 when it is the only regressor; playing second within an evening carries 1.130 with a t value of 1.9.",
    year: 2003,
    doi: "10.1257/000282803321455296",
    note: {
      en: "Five things. First, the counts reconcile exactly: 10 + 1 = 11 first performers and 62 + 59 = 121 others, totalling 132, which is twelve finalists times eleven competitions with one opening performer each. Recomputing chi-squared from those four counts gives 6.40, matching the 6.4 the paper prints, so the table and its statistic agree. Second, and this is the constraint that matters most, eleven musicians in total ever opened a final, and exactly one of them was later rated above average. The direction is what this card claims; a group of eleven cannot pin down the size of the gap, and the card says so in the reveal rather than burying it here. Third, what is drawn is a downstream career outcome, not the judges' marks. The critics were surveyed in 1998, long after the competitions, and only 11 of the 25 approached replied. The judges' own rankings are quoted in the reveal but deliberately not drawn, because they are reported as regression coefficients and this project does not build figures out of coefficients. Fourth, on the randomisation, which is what the whole card rests on: the authors regressed order of appearance on sex, four nationality dummies and age, obtaining R-bar-squared of 0.02 with no coefficient significant even at the 20 per cent level, and separately tested sex, age and nationality against opening night and against playing late, all falling far below the critical value. Fifth, on scope: this is one competition, one instrument, and one unusual feature, namely a concerto that the judges themselves had never heard. That last point is the proposed mechanism rather than a demonstrated one, and a setting where the judges know the repertoire well may behave differently.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Serial-position_effect",
};
