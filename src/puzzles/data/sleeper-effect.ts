import type { Puzzle } from "../schema";

/**
 * Puzzle #44, the sleeper effect, via Hovland and Weiss (1951).
 *
 * FIRST USE OF THE `drift` SHAPE, which was built for it. See the note in
 * `schema.ts`: a net change is movers-toward minus movers-away, so it is a
 * balance rather than a share, it can be negative, and `rates` would both
 * refuse the negatives and misdescribe the positives. The lesson here is that
 * one line falls while another rises, and no shape in the deck could say that.
 *
 * NUMBERS. Only the signed counts are authored, out of the 122 people per
 * column who survive into both analyses. Everything on screen is derived, and
 * that is not a formality here: Table 3 and Table 6 are separate published
 * tables, and adding their printed *percentages* gives the low-credibility
 * source 14.0 per cent at four weeks where adding the counts gives 13.9. The
 * counts are what the paper measured, so the counts are what this file holds.
 *
 * The commit beat asks which audience had moved further four weeks on, which is
 * a direction rather than a magnitude, and only one band carries the direction
 * the skill licenses. The framing says the source was named once at the head of
 * the article, which is the handle a reasoner needs without being told the
 * answer.
 */
export const sleeperEffect: Puzzle = {
  schemaVersion: 1,
  id: "the-source-you-forget",
  slug: "the-source-you-forget",
  category: "measurement",
  reasoningSkill: "sleeper-effect",
  difficulty: "hard",
  tags: ["psychology", "media", "everyday"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "The trusted source shifted opinion three and a half times as much.",
    },
    framing: {
      en: "In 1951, 223 students read the same four articles, on antihistamines, atomic submarines, a steel shortage and the future of the cinema. Each article carried the name of its source at the head, and nothing else about it. Half the readers saw a source the experimenters had established as highly credible, such as a distinguished scientist or a respected journal. The other half saw the identical article credited to a source rated low, such as a mass-circulation gossip magazine or a writer known for a party line. Opinions were measured before, and again straight afterwards. The bar below is the net movement towards each article's position: the share of readers who moved towards it, minus the share who moved away.",
    },
    question: {
      en: "The same students were asked again four weeks later. Whose opinions had moved further from where they started?",
    },
    data: {
      type: "drift",
      label: { en: "Opinion movement, by source" },
      metricLabel: {
        en: "Net movement towards the article's position, per 122 readers",
      },
      baselineLabel: {
        en: "Zero is where each group stood before reading. Net movement counts readers who shifted towards the article minus readers who shifted away, so it is a balance rather than a headcount.",
      },
      series: [
        {
          id: "high",
          label: { en: "Article credited to a highly credible source" },
          short: { en: "Trusted source" },
        },
        {
          id: "low",
          label: { en: "Same article credited to a low credibility source" },
          short: { en: "Distrusted source" },
        },
      ],
      checkpoints: [
        { id: "immediately", label: { en: "Straight after reading" } },
        { id: "four-weeks", label: { en: "Four weeks later" } },
      ],
      observations: [
        // Table 3, page 643: net change from before to immediately after.
        { seriesId: "high", checkpointId: "immediately", net: 28, denominator: 122 },
        { seriesId: "low", checkpointId: "immediately", net: 8, denominator: 122 },
        // Table 3 plus Table 6, page 645: the further net change over the next
        // four weeks was -13 for the trusted source and +9 for the other.
        { seriesId: "high", checkpointId: "four-weeks", net: 15, denominator: 122 },
        { seriesId: "low", checkpointId: "four-weeks", net: 17, denominator: 122 },
      ],
    },
    initialView: {
      kind: "atfirst",
      strataIds: ["immediately"],
      caption: { en: "Measured straight after reading" },
    },
  },

  choices: [
    {
      id: "trusted-still",
      label: { en: "The trusted source's readers, still" },
      sublabel: { en: "the gap would narrow, not close" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "both-fade",
      label: { en: "Neither. Both would drift back towards where they started" },
      sublabel: { en: "persuasion wears off" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "distrusted",
      label: { en: "The distrusted source's readers" },
      sublabel: { en: "they overtook the others" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // Wrong, and the framing is what makes it wrong. It says the source was a
      // single line at the head of an article whose argument ran for pages, and
      // that the same people were re-measured. That is enough to reason about
      // what survives four weeks and what does not.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "The lines crossed. The distrusted source ended up ahead." },
    mechanismLabel: { en: "Four weeks later" },
    mechanismName: { en: "The argument outlives the memory of who made it" },
    explanation: {
      en: "Straight after reading, the trusted source had moved opinion by a net 28 readers in 122 and the distrusted one by 8. Four weeks later the trusted source was down to 15 and the distrusted one up to 17. Nobody heard the articles again in between. The trusted source lost ground because the reason for believing it faded, and the distrusted source gained ground because the reason for discounting it faded faster than the argument did. A message you dismissed at the time is not neutralised; it is postponed.",
    },
    body: {
      en: "The authors named this the sleeper effect, and they went looking for the obvious explanation, that readers had simply forgotten who wrote what. That turned out not to be it: recall of the source was still reasonably good at four weeks. What weakened was not the memory of the source but its connection to the claim. People could still tell you where they had read it if you asked, and no longer used that fact when deciding whether it was true.",
    },
    view: { kind: "overtime" },
  },

  lesson: {
    skillName: { en: "The sleeper effect" },
    takeaway: {
      en: "Discounting a claim because of who made it works at the time and wears off. Weeks later the claim is still there and the discount is not.",
    },
    body: {
      en: "This is the answer to the comfortable thought that an unreliable outlet does no harm because nobody believes it anyway. At the moment of reading, that is true, and it is measurable. The trouble is that the discount and the claim are stored differently: the claim is an idea about the world and the source is a fact about a document, and the second decays out of use faster than the first. So a message you correctly dismissed can come back to you later as something you vaguely know, with the reason you dismissed it no longer attached.",
    },
    howItWorks: {
      en: "The practical defence is to do something at the time that will still be there later, because your own future judgement will not have the source attached. Writing down why you dismissed something, rather than just dismissing it, is the cheap version. Refusing to repeat a claim you do not believe is another, since repeating it is how it gets into circulation with the caveat stripped off. The wider point is about what to expect from your own memory: it is good at keeping propositions and bad at keeping the conditions attached to them, so any judgement of the form this is true only if that holds should be written down rather than trusted to survive. Note the symmetry, which is the uncomfortable half. The same decay strips the good reasons you had for believing something from a source you trusted, which is why the trusted line in this study fell.",
    },
    examples: [
      {
        title: { en: "How reliably this happens, which is less than the story suggests" },
        summary: {
          en: "A meta-analysis of the available data concludes the effect is real but conditional: it appears when the argument and the discounting cue both made a strong initial impression, and it is stronger when readers had the ability and motivation to think about the message, and when the discounting cue arrived after the message rather than before. The 1951 study put the source first, which is the weaker arrangement, so it is not the best case for the effect. Earlier reviewers went further: Capon and Hulbert argued in 1973 that the literature was so unreliable that researchers should accept the null hypothesis and stop.",
        },
        provenance: {
          source:
            "Kumkale GT, Albarracin D. The sleeper effect in persuasion: a meta-analytic review. Psychological Bulletin. 2004;130(1):143-172.",
          year: 2004,
          doi: "10.1037/0033-2909.130.1.143",
          url: "https://doi.org/10.1037/0033-2909.130.1.143",
        },
      },
    ],
  },

  share: {
    title: { en: "The sleeper effect, a reasoning trap." },
    explainer: {
      en: "You can dismiss a claim because of where it came from, and be right to, and still be moved by it a month later. The claim is stored as an idea about the world; the source is stored as a fact about a document, and it stops being applied first. Nobody believes that outlet is true today and not much of a defence by next month.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Hovland CI, Weiss W. The influence of source credibility on communication effectiveness. Public Opinion Quarterly. 1951;15(4):635-650. Table 3 on page 643 and Table 6 on page 645, both read from the rendered pages. 223 subjects took part; 122 per column survive into these analyses.",
    year: 1951,
    doi: "10.1086/266350",
    url: "https://doi.org/10.1086/266350",
    note: {
      en: "Two things about the numbers. First, they are net changes, movers towards the article minus movers away, which is why this puzzle needed a shape that can hold a signed quantity: the paper never prints the two components separately, and five of the sixteen cells in the two tables are negative. Second, the four-week figures are sums of the two tables, and they are added as counts rather than as percentages. Adding the printed percentages gives the distrusted source 14.0 per cent, where adding the counts gives 13.9. The counts are what was measured. The reconciliation is unusually complete: all sixteen cells recover whole numbers of readers against their printed group sizes, all four column averages then recover from those counts, and all five printed differences in Table 6 reproduce exactly. Both tables are scrambled by text extraction, which puts the group sizes on the wrong rows, so both were read visually. Two limits are worth stating. This is one study from 1951 on four topics with 223 students, and the deep dive above records that the effect is conditional and was once argued to be unreliable altogether. And the study named the source before the article, which the meta-analysis identifies as the weaker arrangement, so if anything it understates what the effect can do rather than overstating it.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Sleeper_effect",
};
