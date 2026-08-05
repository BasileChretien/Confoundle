import type { Puzzle } from "../schema";

/**
 * Puzzle #60, the source-count illusion, via Weaver, Garcia, Schwarz and
 * Miller (2007), Study 1A.
 *
 * NO NEW SHAPE. `ratings`, holding a mean on the scale it was measured on,
 * exactly as `prebunking` does. Three conditions on one percentage axis, the
 * setup drawing the two controls and the reveal slotting the third between
 * them.
 *
 * REBUILT FROM A NULL RESULT ONTO A POSITIVE ONE, AND THAT WAS THE POINT. The
 * first draft was built on O'Donnell et al. (2023), where varying the number of
 * witnesses did nothing, and its correct answer was therefore "there is no
 * gap". Three things were wrong with that. A distractor reading "smaller but
 * clearly there" was NOT excluded by that paper's interval of -0.18 to 0.15, so
 * a well-reasoning player could have been marked wrong for picking it, which is
 * the failure `docs/hedge-audit.md` calls the nastiest. The deck already ships
 * `statistical-significance` under the slug `no-difference-found`, whose whole
 * point is that failing to find a difference is not finding none, so an answer
 * key rewarding a bare null would have had two cards pulling opposite ways. And
 * the lesson's actionable half rested on this paper anyway, read only through
 * the other one's description of it. Weaver supplies a magnitude instead of an
 * absence, and O'Donnell moves to the deep dive, where a bounded null belongs.
 *
 * THE COMMIT BEAT ASKS FOR A POSITION BETWEEN TWO STATED ANCHORS. The framing
 * prints both controls, 56.87 and 72.18, so the question is where a third point
 * falls between them and the four bands are four distinct places it could land.
 * Nothing here asks the reader to assert that an effect is absent.
 *
 * THE TRAP IS THE NORMATIVELY CORRECT EXPECTATION. You should discount a voice
 * you can see repeating itself, and every statement carried its author's name,
 * so nobody was hidden. That is what makes the result worth a puzzle.
 *
 * WHY THIS IS NOT A SECOND `illusory-truth`. That puzzle ships repetition
 * making a claim feel TRUER. This one is repetition making a claim feel more
 * WIDELY HELD, which is a different outcome measure and a different practical
 * lesson: it is about how you read a crowd, not how you read a claim.
 */
export const sourceCountIllusion: Puzzle = {
  schemaVersion: 1,
  id: "one-voice-three-times",
  slug: "one-voice-three-times",
  category: "statistical-reasoning",
  reasoningSkill: "source-count-illusion",
  difficulty: "medium",
  tags: ["everyday", "psychology", "media"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "One man said it three times. Everyone could see it was the same man.",
    },
    framing: {
      en: "A hundred and seventy-seven people read what they were told were comments from a focus group of five New Jersey homeowners discussing whether land should be set aside as open space. Each comment was printed with the name of the homeowner who made it, so nobody was hiding who was speaking. Afterwards everyone estimated the same thing: what percentage of New Jersey homeowners across the whole state supported preserving open space. The chart shows the two straightforward groups. People who read one supportive comment from one homeowner estimated 56.87 per cent. People who read three supportive comments from three different homeowners estimated 72.18 per cent, which is the price of a genuine chorus: fifteen points. The third group is the interesting one. They read three supportive comments too, but all three came from the same homeowner, with his name on each of them, and they knew it. The question is where that third group landed between the other two.",
    },
    question: {
      en: "One homeowner, making the same point three times, in plain sight. What did that do to the estimate of what an entire state thinks?",
    },
    data: {
      type: "ratings",
      label: { en: "What a whole state was thought to believe" },
      metricLabel: {
        en: "Estimated percentage of New Jersey homeowners who supported preserving open space",
      },
      scale: {
        min: 0,
        max: 100,
        minLabel: { en: "0%, nobody in the state agrees" },
        maxLabel: { en: "100%, the whole state agrees" },
        anchorAt: 50,
        anchorLabel: { en: "50%, an even split" },
      },
      /**
       * THE TWO CONTROLS COME FIRST AND THE ANSWER LAST, WHICH IS A RENDERING
       * CONSTRAINT RATHER THAN A PREFERENCE. `RatingsView` colours a row by its
       * index in this array AFTER the view has filtered it, so a series that
       * moves position when the setup is restricted also changes colour between
       * the beats. Ordering the two drawn-first conditions at the top keeps both
       * their indices, and therefore both their colours, identical across the
       * two views, and the new row arrives at the bottom in a third colour. The
       * rows are consequently not in numeric order, which costs nothing: every
       * marker is placed on a shared axis by its own value, so the answer still
       * lands visibly between the two above it.
       */
      series: [
        {
          id: "one-person-once",
          label: { en: "One homeowner, one comment" },
          short: { en: "One comment" },
        },
        {
          id: "three-people",
          label: { en: "Three different homeowners, one comment each" },
          short: { en: "Three people" },
        },
        {
          id: "one-person-thrice",
          label: { en: "The same homeowner, three comments" },
          short: { en: "Same man, three times" },
        },
      ],
      // Study 1A, Table 1, the "% supporting" column, exactly as printed.
      observations: [
        { seriesId: "one-person-once", mean: 56.87, sd: 20.26, n: 59 },
        { seriesId: "three-people", mean: 72.18, sd: 14.25, n: 59 },
        { seriesId: "one-person-thrice", mean: 65.96, sd: 15.64, n: 59 },
      ],
      dispersionLabel: {
        en: "Bars are one standard deviation. Estimates varied widely inside every group.",
      },
    },
    /**
     * `bothratings` on BOTH beats, restricted then unrestricted. Not a slip:
     * `onerating` slices to the first series alone whatever the view asks for,
     * which is right for a puzzle quoting one figure and wrong for one that has
     * to show the reader two anchors before asking where a third point falls.
     * `registry.test` allows a puzzle to flip from one slice of a kind to the
     * whole of it, and the two views carry different keys.
     */
    initialView: {
      kind: "bothratings",
      groupIds: ["one-person-once", "three-people"],
      caption: { en: "One comment, and three from three people" },
    },
  },

  choices: [
    {
      // What a person SHOULD do, and what the reveal shows they do not.
      id: "discounted",
      label: {
        en: "Back down near the one-comment group, around 57 per cent. You can see it is one man, so you discount him",
      },
      sublabel: { en: "one man is one man" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "most-of-the-way",
      label: {
        en: "About 66 per cent, roughly three fifths of the way to the three-person figure",
      },
      sublabel: { en: "one voice, most of a chorus" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "all-the-way",
      label: {
        en: "Level with the three-person group, around 72 per cent. Repetition is worth exactly as much as corroboration",
      },
      sublabel: { en: "no discount at all" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "above",
      label: {
        en: "Above the three-person group. Somebody who says it three times is read as feeling it strongly",
      },
      sublabel: { en: "insistence beats numbers" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "65.96 per cent. One man, repeating himself in the open, bought three fifths of a chorus.",
    },
    mechanismLabel: { en: "Where the third group landed" },
    mechanismName: {
      en: "Familiarity counts how often you met an opinion and not how many people held it",
    },
    explanation: {
      en: "Reading one homeowner three times moved the estimate of what an entire state believed from 56.87 to 65.96 per cent, which is about three fifths of the fifteen points that three genuinely different homeowners bought. Nothing was concealed. Every comment carried its author's name, the participants could see that one man had made all three, and the effect happened anyway. Two things are worth separating here. The estimate that moved was not about the focus group, where a reader might reasonably think one insistent member signals something about the room; it was about New Jersey homeowners in general, a population the focus group was merely drawn from. And the movement is not small: it is most of the distance to what real corroboration achieved.",
    },
    body: {
      en: "The authors then closed the obvious escape routes one at a time. If this were a memory failure, it should vanish among people who correctly remembered how many speakers there were: 137 of the 177 did, and the result held in that subgroup. If it needed the cover of a group discussion, where a reader might infer that a man repeats himself because he knows the room agrees, then stripping the discussion away should kill it. In a second experiment they showed 305 people a single emailed comment, then duplicated it twice more so that the copies looked like an artefact of the mail program, obviously identical, obviously one person. Estimated support rose from 38.26 to 44.18 per cent, and 271 of the 305 correctly reported both that there had been one speaker and that the statements were identical copies. A third experiment measured the mechanism directly with a word-recognition task: people who had read the repeated opinion identified topic-related words 63.56 milliseconds faster than neutral ones, against 22.25 milliseconds for people who read it once, and that speed-up statistically accounted for their higher estimates of public support. The opinion was simply more available, and availability was read as prevalence. The same dissociation shows up from the other side in eyewitness work, where repeating a false detail damages memory and changing how many witnesses deliver it does not.",
    },
    view: {
      kind: "bothratings",
      caption: { en: "All three, and the middle one is one man" },
    },
  },

  lesson: {
    skillName: { en: "Repetition disguised as corroboration" },
    takeaway: {
      en: "The sense that a view is widely held is built out of how often you have met it, not out of how many people hold it. One voice repeating itself in plain sight buys most of what a real chorus buys, and knowing it is one voice does not stop it.",
    },
    body: {
      en: "Independent corroboration is genuinely strong evidence, and nothing here disturbs that. Two people who could not have coordinated, reporting the same thing, is worth far more than one person saying it twice. The finding is about the part of you that does the counting. Your sense of how widely a view is shared runs on familiarity, and familiarity records encounters without asking where each one came from, so it cannot separate one source amplified fifty times from fifty sources agreeing. What makes this study hard to shrug off is that it removed every excuse. The names were on the comments. In the second experiment the repetitions were visibly duplicate copies. The people who remembered the setup correctly showed the effect just as strongly as the people who did not. This is not a mistake made by the inattentive; it is what the machinery does when it is working normally, which is why noticing it has to be deliberate.",
    },
    howItWorks: {
      en: "The practical move is to stop counting encounters and start counting origins, which is a different and much smaller number. Three questions do most of the work. Where did each of these accounts get it, and do the trails end at the same place? If they all lead back to one original, that is one source you have met repeatedly, not several sources agreeing. Could these people have seen each other's version before writing theirs, because if so, part of what looks like agreement is copying. And would I have believed this the first time I met it, before it was everywhere? If not, what changed was the count rather than the evidence, and the count is the thing your intuition reads worst. A useful habit when a claim starts to feel settled is to write down how many distinct origins you can actually name. The number is very often one, and noticing that it is one is the whole skill. It is worth applying to your own side of an argument first, since a view you already hold is the one you have met most often.",
    },
    examples: [
      {
        title: {
          en: "From the other side: repeating a false detail damaged memory, and the number of witnesses did not",
        },
        summary: {
          en: "Two preregistered experiments crossed the two variables directly. People watched a robbery, then read or watched three witness interviews carrying false details, and were tested on what they had actually seen. Reading a false detail three times rather than once dropped accuracy from 0.56 to 0.46, which is below the 0.5 that pure guessing scores. Whether it came from one witness or three different ones changed nothing: 0.49 against 0.52, with the three-witness group very slightly more accurate. The authors met the obvious objection by rebuilding the experiment on video, with three visibly different actresses, and got the same result. Pooling with the earlier study they replicate, repetition is worth 0.38 standard deviations while source variability is worth minus 0.01. That second figure is a null and cannot prove that source count never matters; what it does is bound the effect far below the one repetition produces, in a study built and powered to find it.",
        },
        provenance: {
          source:
            "O'Donnell R, Chan JCK, Foster JL, Garry M. Experimental and meta-analytic evidence that source variability of misinformation does not increase eyewitness suggestibility independently of repetition of misinformation. Frontiers in Psychology. 2023;14:1201674. Two preregistered experiments, 267 and 268 participants retained; Experiment 1 misled-item proportions correct, and meta-analytic effects of g = 0.38 (95% CI 0.17 to 0.59, 19 effect sizes) for repetition against g = -0.01 (95% CI -0.18 to 0.15, 8 effect sizes) for source variability. The source-variability meta-analysis pools this study with Foster et al. (2012) alone and contains one published study, so it establishes the bound across two studies sharing a design rather than across a literature.",
          year: 2023,
          doi: "10.3389/fpsyg.2023.1201674",
          url: "https://doi.org/10.3389/fpsyg.2023.1201674",
        },
      },
    ],
  },

  share: {
    title: { en: "Repetition disguised as corroboration, a reasoning trap." },
    explainer: {
      en: "People read comments from a focus group, each printed with the speaker's name. Reading one man make the same point three times pushed their estimate of what an entire state believed from 57 to 66 per cent, about three fifths of the way to what three different people saying it once achieved. They could see it was one man. Independent agreement is real evidence, but the feeling of it is made from how often you met the claim, and that feeling cannot tell one amplified voice from a chorus.",
    },
    captions: {
      competitive: { en: "Counted the origins, not the echoes." },
      selfDeprecating: { en: "I heard a chorus. It was one guy." },
    },
  },

  provenance: {
    source:
      "Weaver K, Garcia SM, Schwarz N, Miller DT. Inferring the popularity of an opinion from its familiarity: a repetitive voice can sound like a chorus. Journal of Personality and Social Psychology. 2007;92(5):821-833. Study 1A, Table 1, the percentage column: 177 University of Michigan undergraduates in a three-condition between-subjects design read comments attributed by name to members of a five-person focus group of New Jersey homeowners discussing a fictitious open-space policy, then estimated the percentage of New Jersey homeowners statewide who supported it. Single opinion control 56.87 (SD 20.26), repeated opinion 65.96 (SD 15.64), three person control 72.18 (SD 14.25). The paper analysed standardised composites of the favorability and percentage items: three person against single, F(1, 98) = 16.45, p < .001, d = 0.83; repeated against single, F(1, 118) = 6.03, p < .02, d = 0.42. Supporting studies cited in the reveal are Study 2 (305 participants, duplicated email comment, 38.26 against 44.18 per cent) and Study 3 (196 participants, lexical decision task, response-time advantage of 63.56 ms against 22.25 ms, mediating the group-level estimates).",
    year: 2007,
    doi: "10.1037/0022-3514.92.5.821",
    url: "https://doi.org/10.1037/0022-3514.92.5.821",
    note: {
      en: "Four things, and the first is the only figure on this card that was not read off the page. The paper prints the total of 177 participants across three conditions, and its degrees of freedom for the focus-group measures, F(1, 174), confirm that all three conditions were analysed together, since 177 minus 3 is 174. It does not print how many people were in each condition. The 59 recorded here is that total divided by three, and it is flagged rather than presented as printed. Second, the reading of Table 1 was checked against the paper's own effect sizes by a route the puzzle does not otherwise use. The neighbouring column of that table, focus-group favorability on a 1 to 7 scale, gives 4.66 (SD 1.06), 5.43 (SD 1.02) and 6.22 (SD 0.89), and the printed effect sizes of d = 1.60 and d = 0.74 fall out of those means and standard deviations to two decimals. The same check cannot be run on the percentage column drawn here, because the paper standardised the favorability and percentage items and analysed them together, so the F and d reported for this measure belong to the composite and not to the percentage alone. That is why the percentages are drawn and the effect sizes are not. Third, the issue was fictitious, invented for the experiment, so there is no true percentage for the estimates to be right or wrong about. This puzzle is about how far the three groups moved apart, never about accuracy, and no true value is drawn because none exists. Fourth, on what the experiment does and does not establish: the participants were undergraduates at one university, the estimates carry standard deviations of 14 to 20 points and so overlap heavily between conditions, and the effect is a difference in group averages rather than something that happened to every reader. What lifts it above a single result is that the paper replicates it four times over with different materials, that it survives among the 137 of 177 who remembered the number of speakers correctly, and that Study 2 reproduces it when the repetitions are visibly identical copies.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Availability_cascade",
};
