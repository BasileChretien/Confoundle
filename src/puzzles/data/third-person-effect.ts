import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #46, the third-person effect, via Gunther (1995).
 *
 * FIRST USE OF THE `ratings` SHAPE, which was built for it. This entry was
 * refused twice on the record, in `docs/lesson-backlog.md` entry 20: the
 * literature reports headcounts without denominators, and against the likeliest
 * N sixteen count triples fit Gunther's printed 61, 19 and 20 per cent. That
 * refusal stands. What changed is that the deck can now draw a mean honestly,
 * which is what this literature actually measures.
 *
 * WHY THE SCALE IS THE WHOLE POINT. A bar from zero to 3.23 would say nothing.
 * The finding is not that one mean exceeds another by 0.39, it is that on a
 * scale where 3 means no effect at all, people put themselves at 3.23 and
 * everyone else at 3.62. Without the anchor drawn, that is invisible.
 *
 * The commit beat asks a direction, not a size, and only one band says the
 * others rating sits further up the scale.
 */
export const thirdPersonEffect: Puzzle = {
  schemaVersion: 1,
  id: "not-me-though",
  slug: "not-me-though",
  category: "causal-reasoning",
  reasoningSkill: "third-person-effect",
  difficulty: "medium",
  tags: ["everyday", "media", "psychology"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Asked what sexually explicit media had done to them, people said: nothing much.",
    },
    framing: {
      en: "A 1995 telephone survey put the same two questions to a random national sample of American adults. First, how much had sexually explicit films and magazines affected their own moral values and their own attitudes. Then, how much the same material had affected people in general. Answers went on a five point scale, coded so that 1 is a large positive effect, 5 is a large negative effect, and 3 is the middle: no effect at all. Question order was randomised, and the researchers checked afterwards that it made no difference. 492 people answered enough of both to be counted. The marker below is what they said about themselves.",
    },
    question: {
      en: "The same people, on the same scale, then rated the effect on people in general. Where did that average land?",
    },
    data: {
      type: "ratings",
      label: { en: "Rated effect of sexually explicit media" },
      metricLabel: {
        en: "Mean rating, 492 adults answering about both",
      },
      scale: {
        min: 1,
        max: 5,
        minLabel: { en: "1, a large positive effect" },
        maxLabel: { en: "5, a large negative effect" },
        anchorAt: 3,
        anchorLabel: { en: "The marked line is 3, no effect at all" },
      },
      dispersionLabel: {
        en: "The pale band spans one standard deviation either side of the mean.",
      },
      series: [
        {
          id: "self",
          label: { en: "The effect on me" },
          short: { en: "On me" },
        },
        {
          id: "others",
          label: { en: "The effect on people in general" },
          short: { en: "On everyone else" },
        },
      ],
      observations: [
        { seriesId: "self", mean: 3.23, sd: 0.64, n: 492 },
        { seriesId: "others", mean: 3.62, sd: 1.07, n: 492 },
      ],
    },
    initialView: {
      kind: "onerating",
      groupIds: ["self"],
      caption: { en: "What they said about themselves" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About the same, a shade above no effect at all" },
      sublabel: { en: "people answer the same question the same way" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "lower",
      label: { en: "Lower, nearer to no effect at all" },
      sublabel: { en: "we admit to more than we impute" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "higher",
      label: { en: "Further up the scale, a clearly larger negative effect" },
      sublabel: { en: "it works on other people" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Wrong. The framing establishes that these are the same people, the same
      // material and the same scale, with only the target changed, and the
      // skill is precisely a claim about what changes when the target does.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "3.23 for themselves. 3.62 for everybody else." },
    mechanismLabel: { en: "Both ratings" },
    mechanismName: { en: "The effect always lands on somebody else" },
    explanation: {
      en: "Look at where the first marker sits: 3.23, on a scale where 3 means nothing happened. Asked about themselves, people said, in effect, none of this touched me. Asked in the same breath about everyone else, the same people moved 0.39 of a point up the scale. Both numbers came from the same 492 mouths in the same phone call. The gap held for men and for women, and for people who said they had never seen any of the material as well as for people who said they had.",
    },
    body: {
      en: "This is the least comfortable finding in the deck, because there is no version of it in which you are the exception. Everyone in that survey was somebody else's other person. The 0.39 looks small, and the point is not its size: it is that the self rating sits on nothing happened while the same person's rating of everybody else does not. Whatever you believe about how advertising, or propaganda, or an algorithm works on the public, you almost certainly believe it works less on you, and you have no more evidence for that than they did.",
    },
    view: { kind: "bothratings" },
  },

  lesson: {
    skillName: { en: "The third-person effect" },
    takeaway: {
      en: "People judge media to affect others more than themselves. That belief is usually wrong, and it is what makes restricting other people feel reasonable.",
    },
    body: {
      en: "You have privileged access to your own reasons and none at all to anybody else's. From the inside, being persuaded feels like being convinced: you can recall arguments, you cannot recall being moved. From the outside, other people just change their minds after seeing something, which looks exactly like influence. So the asymmetry is not vanity, it is a difference in what is observable, and it survives knowing about it. The practical cost is that a belief in your own immunity is the standard argument for controlling what other people are allowed to see.",
    },
    howItWorks: {
      en: "The useful move is to make the comparison concrete rather than general. Instead of asking whether advertising works on you, ask which of the last three things you bought you first heard of in an advertisement, and whether you would have thought of them otherwise. That question has an answer you can check; are you the sort of person who is influenced does not. The same applies outward: when you catch yourself explaining someone's view by what they have been exposed to, ask what you have been exposed to, and whether you would accept that explanation of yourself. If the answer is no, you are probably applying two different theories of persuasion, one for you and one for everybody else. And treat any argument of the form people cannot handle this material with suspicion, because it is almost never offered by somebody who thinks they personally cannot handle it.",
    },
    examples: [
      {
        title: { en: "What the belief is actually for" },
        summary: {
          en: "The same survey asked whether people supported legal restrictions on this material, and modelled that against everything else it had measured. The size of the gap between the effect on others and the effect on oneself predicted support for restrictions, holding constant free-speech attitudes, gender, religion and exposure. The authors are careful about how far this goes: across the whole sample the gap was overshadowed by how much people thought the material had affected them personally, and it became a strong predictor only among the three fifths who showed the perception in the first place. So the belief travels with the policy view rather than being the only thing behind it.",
        },
        provenance: {
          source:
            "Gunther AC. Overrating the X-rating: the third-person perception and support for censorship of pornography. Journal of Communication. 1995;45(1):27-38. Hypothesis 2 and Table 2.",
          year: 1995,
          doi: "10.1111/j.1460-2466.1995.tb00712.x",
          url: "https://doi.org/10.1111/j.1460-2466.1995.tb00712.x",
        },
      },
    ],
  },

  share: {
    title: { en: "The third-person effect, a reasoning trap." },
    explainer: {
      en: "Ask people what the media has done to them and they say roughly nothing. Ask the same people in the same breath what it has done to everybody else and the answer moves. You have your reasons from the inside and other people only have their behaviour from the outside, so influence always looks like something that happens elsewhere. It is also the standard argument for restricting what other people may see.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Gunther AC. Overrating the X-rating: the third-person perception and support for censorship of pornography. Journal of Communication. 1995;45(1):27-38. Table 1 on page 33, read from the rendered page. 648 adults were sampled; 492 answered enough of both effect indices to enter the combined measure. Items were recoded so that 1 is a large positive effect, 3 is no effect at all, and 5 is a large negative effect.",
    year: 1995,
    doi: "10.1111/j.1460-2466.1995.tb00712.x",
    url: "https://doi.org/10.1111/j.1460-2466.1995.tb00712.x",
    note: {
      en: "These are means, not counts, which is why this lesson waited for a shape that could draw one. Backlog entry 20 records the deck refusing this paper twice for want of counts, and that refusal was right: the article reports that 61 per cent of respondents saw others as more affected, 19 per cent saw no difference and 20 per cent saw themselves as more affected, but never prints the denominator for that split, and against the likeliest sample size sixteen different count triples round to those figures. Nothing here rests on them. What the table does print is means with standard deviations and sample sizes, and it checks out: all seven of its printed differences between the self and others columns reproduce exactly from the two means, and the male and female subsample sizes, 230 and 262, sum to the 492 of the combined measure. The 19 and 20 per cent above also sum to the 39 per cent the discussion gives for respondents not showing the perception, which is a third independent check. Two limits. This is a single 1995 American telephone survey with a 46 per cent response rate, so it measures what that sample said rather than what everyone believes. And the material asked about is one specific and contested kind, chosen by the researchers because attitudes to it are strong; the same perception has since been reported for advertising, news and violent media, but this puzzle only shows the study it cites.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Third-person_effect",
};
