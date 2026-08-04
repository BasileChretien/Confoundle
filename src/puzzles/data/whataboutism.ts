import type { Puzzle } from "../schema";

/**
 * Puzzle #50, whataboutism, via van Eemeren, Meuffels and Verburg (2000).
 *
 * NO NEW SHAPE. `ratings`, which is exactly what the backlog said this entry
 * lacked: its recorded blocker was "means on a reasonableness scale are not
 * counts and this deck authors from counts", written before `ratings` existed.
 *
 * THE COMMIT BEAT ASKS WHICH SIDE OF THE MIDDLE, AND SAYS SO. Two of the four
 * bands point upward, which `docs/hedge-audit.md` forbids unless the framing
 * carries the discriminator. So the framing names the midpoint of the scale,
 * says what it means, and asks which side of it the reply lands on. The anchor
 * is drawn on the axis, so the reader can see the line they are asked about.
 *
 * NON-PARTISAN BY CONSTRUCTION. The stimuli are 48 invented two-line dialogues
 * with the speakers unnamed, in Dutch, from 2000. The examples quoted here are
 * the domestic and scientific ones; the political ones are not used.
 */
export const whataboutism: Puzzle = {
  schemaVersion: 1,
  id: "you-do-it-too",
  slug: "you-do-it-too",
  category: "statistical-reasoning",
  reasoningSkill: "whataboutism",
  difficulty: "medium",
  tags: ["everyday", "psychology", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Ninety-two pupils rated how reasonable it is to dodge the question.",
    },
    framing: {
      en: "Ninety-two Dutch school pupils read 48 short dialogues. In each one, speaker A gives an opinion and a reason for it, and speaker B replies. Sometimes B answers the point. Sometimes B goes after A instead, in one of three ways: a flat insult, an insinuation about A's motives, or a reply that says A does the same thing. After each dialogue the pupils rated how reasonable B's reply was, from 1, very unreasonable, to 7, very reasonable. None of them had ever heard of the ad hominem, so these are untutored judgements rather than a rule being applied. The bar below is the flat insult. Note where 4 sits: that is the middle of the scale, where a reply is neither reasonable nor unreasonable. The question is which side of that middle the third kind lands on.",
    },
    question: {
      en: "B does not answer the point at all. B says, in effect, look who's talking, you do exactly the same. Where did the pupils put that reply?",
    },
    data: {
      type: "ratings",
      label: { en: "How reasonable was B's reply?" },
      metricLabel: {
        en: "Mean rating by 92 pupils, averaged over the three settings",
      },
      scale: {
        min: 1,
        max: 7,
        minLabel: { en: "1, very unreasonable" },
        maxLabel: { en: "7, very reasonable" },
        anchorAt: 4,
        anchorLabel: { en: "4 is the middle, neither one nor the other" },
      },
      series: [
        {
          id: "abusive",
          label: { en: "A flat insult: what would you know about it?" },
          short: { en: "Flat insult" },
        },
        {
          id: "circumstantial",
          label: { en: "An insinuation: you only say that because it suits you" },
          short: { en: "Your motives" },
        },
        {
          id: "tuquoque",
          label: { en: "You do it too: look who's talking" },
          short: { en: "You do it too" },
        },
        {
          id: "sound",
          label: { en: "A reply that actually answers the point" },
          short: { en: "Answers it" },
        },
      ],
      observations: [
        { seriesId: "abusive", mean: 2.91, n: 92 },
        { seriesId: "circumstantial", mean: 3.9, n: 92 },
        { seriesId: "tuquoque", mean: 4.45, n: 92 },
        { seriesId: "sound", mean: 5.29, n: 92 },
      ],
    },
    initialView: {
      kind: "onerating",
      caption: { en: "The flat insult, for comparison" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About where the insult is, close to 3" },
      sublabel: { en: "a dodge is a dodge" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The reasonable-sounding answer: it is still an evasion, so it should
      // still sit on the unreasonable half, just less far down.
      id: "below-middle",
      label: { en: "Higher than the insult, but still short of the middle" },
      sublabel: { en: "better, but still not reasonable" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "above-middle",
      label: { en: "Past the middle, on the reasonable side" },
      sublabel: { en: "it reads as fair comment" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "above-sound",
      label: { en: "Higher than a reply that answers the point" },
      sublabel: { en: "turning it around is the strongest move" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "4.45 out of 7, on the reasonable side of the middle." },
    mechanismLabel: { en: "All three attacks, and a real answer" },
    mechanismName: {
      en: "The evasion that reads as fair comment",
    },
    explanation: {
      en: "All three replies do the same thing: they say something about A instead of about what A said. The pupils placed the flat insult at 2.91 and the insinuation about motives at 3.90, both on the unreasonable half of the scale. You do it too came out at 4.45, past the middle, and it is the only one of the three that did. A reply that actually answered the point scored 5.29, so pointing at the other person's behaviour is not treated as a real answer. It is treated as an acceptable one.",
    },
    body: {
      en: "What makes this the useful result is that the pupils were not applying a rule. A check afterwards established that none of the 92 had ever heard of the ad hominem, so nobody was recognising a named fallacy and scoring it down. Left to their own judgement, they marked the insult and the insinuation as out of order and let the tit for tat through. The likely reason is that consistency between what somebody says and what they do is a real thing to care about, so the reply borrows the shape of a legitimate objection. It has the form of an argument, and it points at something that would matter if the question were what kind of person A is. It is not, though. The question was whether A's reason was any good, and about that the reply says nothing at all. The setting moves the score too, and in one setting the effect disappears: see the deep dive.",
    },
    view: {
      kind: "bothratings",
      caption: { en: "All four, on the same scale" },
    },
  },

  lesson: {
    skillName: { en: "Whataboutism" },
    takeaway: {
      en: "Pointing out that your critic does the same thing feels like an answer and is not one. Their hypocrisy, if it is hypocrisy, has no bearing on whether what they said is true.",
    },
    body: {
      en: "Whataboutism is the personal attack that gets waved through. An insult is obviously not an argument and everyone can see it. You do it too is harder to dismiss, because it is usually true and because consistency does matter in other contexts. That is what makes it useful to somebody who cannot answer the point: it changes the subject from the claim to the person, while looking like it stays on topic. The numbers here show it working on ordinary people who had never been taught to name it, which is the situation almost everybody is in almost all of the time.",
    },
    howItWorks: {
      en: "The test is short: separate the claim from the claimant, then ask what would have to be true for the claim to be wrong. If somebody says a policy will cost more than promised, whether they voted for a costly policy last year does not change what this one costs. If somebody says you were late, their own lateness does not make you on time. Two things follow. First, when you catch yourself reaching for you do it too, notice that you have stopped arguing about the thing and started arguing about who is allowed to raise it, and nobody has to earn the right to make a true statement. Second, when it is used on you, the move is not to defend your record, which accepts the change of subject; it is to say that your record is a separate question and to put the original one back. Do not overcorrect either. Consistency really is evidence about a person, so it is a fair challenge when the question genuinely is whether to trust them, as with a witness or an expert vouching for their own reliability. What it never does is answer an argument.",
    },
    examples: [
      {
        title: { en: "The one setting where it stops working" },
        summary: {
          en: "The same three replies were tested in three settings: a conversation at home, a political debate and a scientific discussion. The pattern holds in all three, but the whole scale shifts. At home the tu quoque scored 4.92 and in a political debate 4.77, both comfortably on the reasonable side. In a scientific discussion it fell to 3.66, back below the middle, with the insinuation at 3.43 and the insult at 2.57. So the identical move is judged as fair comment over breakfast and as out of order in an argument about evidence. The authors' reading is that a scientific discussion is the setting people take to be most clearly about resolving a difference of opinion, and the closer a conversation gets to that, the less licence a personal reply has. Which is worth knowing in both directions: the standard people already apply to a scientific argument is the one they drop everywhere else.",
        },
        provenance: {
          source:
            "van Eemeren FH, Meuffels B, Verburg M. The (Un)Reasonableness of Ad Hominem Fallacies. Journal of Language and Social Psychology. 2000;19(4):416-435. Table 3, page 430.",
          year: 2000,
          doi: "10.1177/0261927X00019004002",
          url: "https://doi.org/10.1177/0261927X00019004002",
        },
      },
    ],
  },

  share: {
    title: { en: "Whataboutism, a reasoning trap." },
    explainer: {
      en: "Ninety-two pupils rated how reasonable a reply was, from 1 to 7. A flat insult got 2.91 and an insinuation about motives 3.90, both on the unreasonable half. You do it too got 4.45, the only one of the three past the middle of the scale, though a reply that answered the point got 5.29. Whether your critic is a hypocrite has no bearing on whether they are right.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "van Eemeren FH, Meuffels B, Verburg M. The (Un)Reasonableness of Ad Hominem Fallacies. Journal of Language and Social Psychology. 2000;19(4):416-435. 92 Dutch pupils (50 from HAVO-4, mostly 16 years old; 42 from VWO-5, mostly 17), judging 48 two-line dialogues on a 7-point scale where 1 is very unreasonable and 7 is very reasonable. 36 dialogues contained an ad hominem and 12 did not. The three variant means are on page 429; Tables 2 and 3 are on page 430.",
    year: 2000,
    doi: "10.1177/0261927X00019004002",
    url: "https://doi.org/10.1177/0261927X00019004002",
    note: {
      en: "The scale, the sample and every mean shown here were read off the rendered pages of the article itself. The reading checks out against the paper's own tables. The three variant means on page 429 are the averages of the three settings in Table 3, and two of them reproduce exactly: 4.92, 4.77 and 3.66 average to 4.45 for the tu quoque, and 4.08, 4.19 and 3.43 average to 3.90 for the insinuation. The third comes to 2.9167 against a printed 2.91, which is what rounding the cell means to two places does, and it is recorded here rather than smoothed over. Averaging the three printed variant means gives 3.7533, which is the 3.75 that Table 2 prints for all fallacious moves, and 92 respondents is what the degrees of freedom imply throughout (F tests on 1 and 91, and on 2 and 182). Two honesties about what is not shown. Standard deviations are printed for the nine setting-by-variant cells and for the fallacious and non-fallacious totals, but not for the three variant means this puzzle draws, so no dispersion is drawn at all rather than implying a precision the figures do not carry here. And an earlier pass at this lesson found different numbers (4.45 against 3.82 for the tu quoque) in the endnotes that SAGE renders on its public page; reading the article settled that those endnotes describe a different experiment, which is why the deck refused to author from them.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Tu_quoque",
};
