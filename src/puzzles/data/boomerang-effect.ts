import type { Puzzle } from "../schema";

/**
 * Puzzle #51, the boomerang effect, via Hovland, Harvey and Sherif (1957).
 *
 * NO NEW SHAPE. `rates`, with the three outcome categories as groups over one
 * shared denominator, so the bars are three slices of the same 69 people and
 * sum to all of them.
 *
 * THE COUNTS ARE RECONSTRUCTED, AND THEY MEET THE STANDARD. Table 3 prints
 * percentages, but each one resolves to exactly one integer out of the printed
 * N, and the three integers sum to that N without being used to derive it.
 * Checked by enumeration in the test file, not by eye.
 *
 * WHAT THIS PUZZLE DOES NOT CLAIM. The paper reports that the moderate speech
 * shifted the drys more than the extreme one did, and then says in the same
 * paragraph that the difference "is not statistically significant" and that the
 * two speeches cannot be shown to be equally persuasive in the first place. So
 * the deck does not teach "moderate messages persuade better". It teaches only
 * what the significant comparison supports, plus the composition inside one
 * audience, which is arithmetic rather than inference.
 */
export const boomerangEffect: Puzzle = {
  schemaVersion: 1,
  id: "the-speech-that-pushed-back",
  slug: "the-speech-that-pushed-back",
  category: "statistical-reasoning",
  reasoningSkill: "boomerang-effect",
  difficulty: "medium",
  tags: ["everyday", "psychology", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Sixty-nine people who wanted alcohol banned heard a speech for repeal.",
    },
    framing: {
      en: "In 1957, in a state where prohibition was still on the ballot, researchers found 69 people with a publicly committed dry position, many of them from temperance groups. Each heard a fifteen-minute recorded talk by a stranger arguing the opposite extreme: alcohol should be sold with no restriction at all. Before and after, everyone marked which of nine statements, running from the driest to the wettest, they found acceptable. The bar below is the people who came out wetter than they went in, which is what the speech was trying to do. The rest either did not move or moved the other way. The question is how many moved the other way.",
    },
    question: {
      en: "Nineteen of the 69 shifted towards the speech. How many shifted away from it, coming out drier than they went in?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Where the 69 committed drys ended up" },
      higherIsBetter: false,
      // Nobody wins. The three bars are three slices of the same 69 people.
      crownWinner: false,
      groups: [
        {
          id: "towards",
          label: { en: "Moved towards the speech, coming out wetter" },
          short: { en: "Towards" },
        },
        {
          id: "unchanged",
          label: { en: "Did not move at all" },
          short: { en: "No change" },
        },
        {
          id: "away",
          label: { en: "Moved away from the speech, coming out drier" },
          short: { en: "Away" },
        },
      ],
      strata: [{ id: "all", label: { en: "All 69, before and after" } }],
      observations: [
        { groupId: "towards", stratumId: "all", numerator: 19, denominator: 69 },
        { groupId: "unchanged", stratumId: "all", numerator: 34, denominator: 69 },
        { groupId: "away", stratumId: "all", numerator: 16, denominator: 69 },
      ],
    },
    initialView: {
      kind: "aggregate",
      groupIds: ["towards"],
      caption: { en: "The ones the speech moved its way" },
    },
  },

  choices: [
    {
      id: "almost-none",
      label: { en: "One or two. A speech does not push people backwards" },
      sublabel: { en: "at worst it does nothing" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      // The reasonable expectation: a handful of people dig in, but the speech
      // still nets a clear gain.
      id: "a-few",
      label: { en: "About five" },
      sublabel: { en: "a few will always dig in" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "nearly-as-many",
      label: { en: "Sixteen, nearly as many as moved towards it" },
      sublabel: { en: "the two almost cancel" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "more",
      label: { en: "More than nineteen, so the speech backfired on balance" },
      sublabel: { en: "it did more harm than good" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "19 moved towards it. 16 moved away from it." },
    mechanismLabel: { en: "All three outcomes" },
    mechanismName: {
      en: "Argue far enough from someone and you push as many back as you pull",
    },
    explanation: {
      en: "Thirty-four of the 69 did not move at all, which is the ordinary result and not the interesting one. The interesting one is that the 19 the speech pulled its way were very nearly matched by the 16 it pushed the other way. Whatever it achieved with one person it undid with another, and the net movement across the whole room was about four per cent. The speech was not badly made. It was simply aimed a long way from where these people stood, and at that distance a person is as likely to harden as to bend.",
    },
    body: {
      en: "The comparison the paper makes, and the one that reaches significance, is what the very same recording did to a different audience. Ninety-two students with no committed position heard it: 48 moved towards it, 22 did not move, and 22 moved away, for a net shift of about twenty-eight per cent against the drys' four. Same speech, same speaker, same fifteen minutes, six times the net effect, and the only thing that differed was how far the audience already stood from the position being argued. There is a second pattern in the paper worth knowing about and worth not overstating. The drys who heard a milder pro-repeal talk shifted more than those who heard the extreme one, twelve per cent against four. That looks like a rule about pitching your argument closer to your audience, and it may well be one, but the authors say plainly in the same paragraph that the difference is not statistically significant and that they cannot show the two recordings were equally persuasive to begin with. So it is a hint, not a finding, and this deck is not going to sell it as more.",
    },
    view: { kind: "aggregate" },
  },

  lesson: {
    skillName: { en: "The boomerang effect" },
    takeaway: {
      en: "An argument aimed far from where someone stands does not simply fail to move them. It moves some of them the other way, and those people cancel out the ones you convinced.",
    },
    body: {
      en: "The usual mental model of persuasion is a dial: push harder and it turns further, and the worst case is that it does not turn at all. That model is wrong at the edges. When a message lands well outside what somebody already finds acceptable, they do not weigh it and decline. They read it as unreasonable, and reading it as unreasonable is itself a move, away from the thing that said it. The 1957 experiment measured both directions at once, which is what makes it useful: the headline shift of four per cent was not a small effect on everybody, it was a large effect on some people pulling against a large effect on others.",
    },
    howItWorks: {
      en: "The practical consequence is that a net figure hides the thing you most need to know. If a campaign, a warning label or a pitch reports that opinion moved three points, ask how many people moved each way to produce three points, because thirty up and twenty-seven down is a different situation from three up and nobody down, and only the second one is safe to repeat. The second consequence is about what to say to people far from you. Arguing at the greatest possible distance is not the strongest version of your case, it is the version most likely to be filed as unreasonable, and once it is filed there the person is further away than when you started. That is not an argument for having no position, and it is certainly not an argument that whoever shouts loudest is wrong. It is a reason to check whether the thing you are about to say lands inside the range your listener will treat as arguable at all, because outside that range you are not making a weak argument, you are making a counterproductive one. And when somebody far from you does not budge, notice that the model where they are simply stubborn and the model where you pushed them backwards predict the same unchanged average, and only counting both directions tells you which one you are in.",
    },
    examples: [
      {
        title: { en: "The same recording, an audience standing closer" },
        summary: {
          en: "Ninety-two students with no publicly committed position heard the identical extreme pro-repeal talk. Forty-eight moved towards it, 22 did not move, and 22 moved away, a net shift of about twenty-eight per cent. The committed drys, hearing the same recording, netted about four. That difference is the comparison the paper tests and it holds at p below .04. Note that even in the receptive audience 22 people moved the wrong way, so the boomerang is not something that only happens to the committed; it is a component of every result, and it is invisible in any figure that reports the net alone.",
        },
        provenance: {
          source:
            "Hovland CI, Harvey OJ, Sherif M. Assimilation and contrast effects in reactions to communication and attitude change. Journal of Abnormal and Social Psychology. 1957;55(2):244-252. Table 3, page 249.",
          year: 1957,
          doi: "10.1037/h0048480",
          url: "https://doi.org/10.1037/h0048480",
        },
      },
    ],
  },

  share: {
    title: { en: "The boomerang effect, a reasoning trap." },
    explainer: {
      en: "Sixty-nine people committed to prohibition heard a speech arguing for no restriction on alcohol at all. Nineteen shifted towards it and sixteen shifted away from it, so the net effect was almost nothing. An argument aimed far from where somebody stands does not just fail; it moves some of them backwards. When you see that opinion moved by a small net amount, ask how many people moved each way to produce it.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Hovland CI, Harvey OJ, Sherif M. Assimilation and contrast effects in reactions to communication and attitude change. Journal of Abnormal and Social Psychology. 1957;55(2):244-252. 514 subjects in all, from a dry state that had recently voted on repeal by a narrow margin. Nine statements ranging from extreme dry to extreme wet; the dry groups were drawn from Women's Christian Temperance Union groups, Salvation Army workers and denominational colleges. Table 3, page 249, and Table 2 on the same page.",
    year: 1957,
    doi: "10.1037/h0048480",
    url: "https://doi.org/10.1037/h0048480",
    note: {
      en: "Table 3 prints percentages rather than counts, so the counts here are reconstructed, and they meet this project's test rather than being estimated. Each printed percentage resolves to exactly one integer out of the stated group size, checked by enumerating every possibility rather than by eye, and the three integers then sum to that group size, which is a printed quantity that was not used to derive them. For the 69 committed drys the only integers that work are 19, 34 and 16, and 19 plus 34 plus 16 is 69. For the 92 unselected students they are 48, 22 and 22, summing to 92. The same check passes for two of the three remaining rows in the table. Three things are recorded rather than smoothed over. First, the net change printed for the drys is 4.5 per cent, while their own cells give 4.3; the reveal therefore says about four per cent, which is also the figure the paper uses in its prose. Second, one row not used here, the unselected group hearing the dry speech, has a middle cell of 33.4 per cent that no integer out of 87 produces, which is what computing a remainder by subtraction does. Third, and most important for what this puzzle claims: the paper's own comparison between the moderate and the extreme speech is reported by its authors as not statistically significant, and they add that the two recordings cannot be shown to have been equally persuasive, so that comparison appears here only as a hint that is explicitly labelled as one.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Social_judgment_theory",
};
