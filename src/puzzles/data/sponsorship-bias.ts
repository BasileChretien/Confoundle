import type { Puzzle } from "../schema";

/**
 * Puzzle #35, sponsorship and conflict of interest, on Barnes & Bero (1998).
 * Closes gap 3 of plan-syllabus-gaps.md, which had been blocked because only
 * three of the four cells of the two by two were reachable from the abstract.
 * The full text prints all four, in the Results and again in Table 3, so
 * nothing here is reconstructed.
 *
 * EVERY CELL IS PRINTED, AND EVERY PRINTED STATISTIC RECONCILES. Table 3 gives
 * the whole two by two directly:
 *
 *                            Industry affiliated (31)   Not affiliated (75)
 *   Passive smoking harmful             2 (6%)                 65 (87%)
 *   Passive smoking NOT harmful        29 (94%)                10 (13%)
 *
 * From those four cells alone: the arms sum to 106; 39 of 106 is the printed
 * 37 per cent; 29 of 39 is the printed 74; the crude relative risk is 7.02
 * against a printed 7.0; the crude odds ratio is exactly 94.25 against a
 * printed 94.2; and the chi-square is 60.69, which is the printed value to both
 * decimals. The test file asserts all of it, the chi-square included, because
 * reproducing a test statistic the authors computed independently is the
 * strongest check available on a transcribed table.
 *
 * WHY THE ODDS RATIO IS NOT THE HEADLINE. The paper prints a crude odds ratio
 * of 94.2 and an adjusted one of 88.4, and then says plainly that the odds
 * ratio and the relative risk are dissimilar because the outcome is not rare in
 * the affiliated group. The puzzle therefore quotes the relative risk of 7.0.
 * Quoting 88.4 would be true, cited, and thoroughly misleading, which is a
 * different lesson this deck already teaches.
 *
 * WHY THE SETUP SHOWS COMPOSITION. The reader needs 31 and 75 to answer at all,
 * and those two numbers give nothing away: a literature that is 71 per cent
 * independent reads as reassuring. The reveal supplies the conclusions, whose
 * denominators are exactly the numerators the setup already showed, so the
 * setup leaks nothing and withholds nothing the reader is entitled to.
 *
 * NO NEW SHAPE. `rates` with two groups and two strata, setup filtered to the
 * composition stratum and the reveal dropping the filter.
 */
export const sponsorshipBias: Puzzle = {
  schemaVersion: 1,
  id: "sponsorship-bias-1998",
  slug: "who-paid-for-the-review",
  category: "measurement",
  reasoningSkill: "sponsorship-bias",
  difficulty: "medium",
  tags: ["everyday", "clinical", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "One hundred and six review articles asked the same question about passive smoking, and they did not agree.",
    },
    framing: {
      en: "Researchers collected every English-language review article published between 1980 and 1995 on whether passive smoking harms health, and found 106 of them. Two trained assessors scored the quality of each one against a published instrument, working blind: author names, affiliations, journal titles, acknowledgements and dates had all been stripped out, and the articles were sent to them in random order. A third of the reviews concluded that passive smoking is not harmful, which is not what any of the major consensus bodies had concluded. The investigators then classified each article by whether at least one author had documented tobacco industry funding, using criteria fixed in advance, because 77 per cent of the articles disclosed no funding at all.",
    },
    question: {
      en: "How often did each group conclude that passive smoking is not harmful?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share" },
      higherIsBetter: true,
      // Nothing here is a win. Marking the taller bar would assert that one
      // conclusion is the right one, which is not what this data shows.
      crownWinner: false,
      // Two different measures, not a partition: the first stratum is a share
      // of all 106 articles, the second a share of each group. Pooling them
      // would be meaningless.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "industry",
          label: { en: "At least one author funded by the tobacco industry" },
          short: { en: "Industry funded" },
        },
        {
          id: "independent",
          label: { en: "No documented industry funding" },
          short: { en: "Independent" },
        },
      ],
      strata: [
        { id: "literature", label: { en: "Share of the 106 review articles" } },
        {
          id: "not-harmful",
          label: { en: "Concluded that passive smoking is not harmful" },
        },
      ],
      observations: [
        {
          groupId: "industry",
          stratumId: "literature",
          numerator: 31,
          denominator: 106,
        },
        {
          groupId: "independent",
          stratumId: "literature",
          numerator: 75,
          denominator: 106,
        },
        {
          groupId: "industry",
          stratumId: "not-harmful",
          numerator: 29,
          denominator: 31,
        },
        {
          groupId: "independent",
          stratumId: "not-harmful",
          numerator: 10,
          denominator: 75,
        },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["literature"],
      caption: { en: "Who wrote the 106 reviews" },
    },
  },

  choices: [
    {
      id: "equally",
      label: { en: "About equally often. They read the same studies" },
      sublabel: { en: "quality assessment and peer review exist for this" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "twice",
      label: { en: "The industry group about twice as often" },
      sublabel: { en: "money nudges a judgement, it does not dictate it" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "sevenfold",
      label: { en: "The industry group about seven times as often" },
      sublabel: { en: "ask what near unanimity inside one group would mean" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge, reused verbatim from other puzzles so it carries no tell.
      // Wrong here: the setup gives both group sizes and the comparison is
      // exactly what the study was built to measure.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: { en: "Ninety-four per cent against thirteen." },
    mechanismLabel: { en: "Who paid, and what they concluded" },
    mechanismName: {
      en: "The funding predicted the conclusion, and nothing else did",
    },
    explanation: {
      en: "Twenty-nine of the 31 reviews with an industry-funded author concluded that passive smoking is not harmful, against 10 of the 75 written by everybody else. That is 94 per cent against 13, a relative risk of 7.0. The 31 are less than a third of the literature, but they supplied 29 of the 39 doubtful conclusions in it, which is three quarters of the published doubt.",
    },
    body: {
      en: "Now ask what a reader could have done about this at the time. Quality was scored blind by two trained assessors against a published instrument, and it did not predict the conclusion. Neither did peer review, nor the topic, nor the year of publication. In the regression that controlled for all four at once, funding was the only thing left standing. And 77 per cent of these articles disclosed no funding at all, so the single variable that predicted the answer was the one variable the page did not carry. Notice the shape of the split too. Real scientific disagreement is untidy, with people spread across the range; 29 of 31 on one side and 10 of 75 on the other is not what an open question looks like from the inside.",
    },
    view: {
      kind: "stratified",
      caption: { en: "Who wrote them, and what they concluded" },
    },
  },

  lesson: {
    skillName: { en: "Sponsorship bias" },
    takeaway: {
      en: "Who paid for a piece of research predicts its conclusion better than anything you can judge by reading it. The trap is not that funded scientists lie. It is that the checks you would use to catch them, quality and peer review, carry almost no information about which way the conclusion will go.",
    },
    body: {
      en: "Nobody in this story has to have faked anything, and the mechanism is more uncomfortable for being ordinary. A review article is a chain of judgement calls: which studies to include, which to set aside as too weak, how much design flaw is enough to discount a finding, and where the balance of the whole thing lands. Every call is defensible on its own, and the sentence that the evidence remains inconclusive can be written honestly about almost any body of evidence, because evidence usually is. Make a hundred defensible calls that lean the same way and you have a review no referee can fault which reaches the conclusion your funder needed. Publish enough of them and the literature itself looks split, which was the whole objective: nobody had to prove that passive smoking was safe, only to keep the question looking open long enough to hold off regulation.",
    },
    howItWorks: {
      en: "The effect is not confined to tobacco, and it is not a story about villains. A Cochrane methodology review pooling 75 studies of the question found that industry-sponsored drug and device studies more often report results favourable to the sponsor's product, a risk ratio of 1.27, and more often reach favourable conclusions, 1.34. The striking part is what it did not find: no difference in randomisation, allocation concealment, follow-up or selective outcome reporting, and industry studies were actually better blinded. Whatever this bias is, it does not show up in the boxes a critical appraisal checklist asks you to tick. What does show up is the gap between results and conclusions, which was wider in sponsored studies, and the head-to-head trials, where the same two drugs compared against each other reach opposite conclusions depending on which manufacturer paid. Four things follow for a reader. Read the funding and conflict statement before the abstract, not after the discussion, because it changes how you read everything in between. Treat a lone favourable finding as provisional until somebody with nothing to gain reproduces it. When an interested party's contribution to a debate is that more research is needed, notice that this is itself a finding in their favour, and ask what would count as enough. And apply the test in both directions: a study you agree with, funded by a campaign group whose mission depends on the answer, has the same problem, and the honest response to that is to look for whether its result has been reproduced by somebody else rather than to drop the standard.",
    },
    examples: [
      {
        title: { en: "The same pattern, with sugar instead of smoke" },
        summary: {
          en: "A Spanish group with no funding and no declared interests went looking for every systematic review on whether sugar-sweetened drinks contribute to weight gain, and found 17 of them, carrying 18 conclusions between them. Two researchers classified each conclusion blind to who had paid. Among the reviews reporting no conflict of interest, 10 of 12 concluded that these drinks are a risk factor for weight gain. Among the six with a declared food industry tie, five concluded the opposite, that the evidence was not sufficient to support the association. Reviews with a conflict of interest were five times more likely to reach that conclusion, and the figure barely moved after adjusting for the year and the journal's impact quartile. Worth noting: in three of the four industry-funded reviews, the company stated it had played no part in selecting studies, assessing them or interpreting the results. The association did not need the sponsor to touch the manuscript.",
        },
        provenance: {
          source:
            "Bes-Rastrollo M, Schulze MB, Ruiz-Canela M, Martinez-Gonzalez MA. Financial conflicts of interest and reporting bias regarding the association between sugar-sweetened beverages and weight gain: a systematic review of systematic reviews. PLoS Medicine. 2013;10(12):e1001578. 17 systematic reviews with 18 conclusions; 10 of 12 conclusions from reviews with no reported conflict found a positive association, against 1 of 6 from reviews with a declared food industry conflict; unadjusted relative risk for a conclusion of no positive association 5.0, 95 per cent confidence interval 1.29 to 19.34, adjusted 5.16, 1.30 to 20.48. The authors state that they received no funding and have no competing interests.",
          year: 2013,
          doi: "10.1371/journal.pmed.1001578",
        },
      },
      {
        title: { en: "Seventy-five studies of the question itself" },
        summary: {
          en: "The definitive summary of this problem is a Cochrane methodology review that pools every empirical study comparing industry-sponsored drug and device research with research funded by anyone else. Across 25 papers covering 2,923 studies, sponsored work more often reported favourable efficacy results, a risk ratio of 1.27. Across 29 papers covering 4,583 studies, it more often reached favourable conclusions, 1.34. The sponsored studies were not methodologically worse: on sequence generation, allocation concealment, follow-up and selective outcome reporting there was no difference, and on blinding they were better. What differed was that their conclusions agreed with their own results less often than everybody else's did. The sharpest number is from head-to-head trials, where two drugs are compared directly: those were about six times more likely to conclude in favour of the newer drug when the newer drug's manufacturer had paid for the trial. The review's own summary is that this is a bias standard risk-of-bias tools do not detect.",
        },
        provenance: {
          source:
            "Lundh A, Lexchin J, Mintzes B, Schroll JB, Bero L. Industry sponsorship and research outcome. Cochrane Database of Systematic Reviews. 2017;2:MR000033. 75 included papers. Favourable efficacy results risk ratio 1.27, 95 per cent confidence interval 1.17 to 1.37, 25 papers and 2,923 studies. Favourable conclusions 1.34, 1.19 to 1.51, 29 papers and 4,583 studies. Agreement between results and conclusions 0.83, 0.70 to 0.98. Low risk of bias from blinding 1.25, 1.05 to 1.50. Head-to-head trials favouring the test treatment when its manufacturer sponsored the trial, conclusions 5.92, 2.80 to 12.54.",
          year: 2017,
          doi: "10.1002/14651858.MR000033.pub3",
        },
      },
    ],
  },

  share: {
    title: { en: "Sponsorship bias, a reasoning trap." },
    explainer: {
      en: "Researchers gathered all 106 review articles published between 1980 and 1995 on whether passive smoking harms health, and had two blinded assessors score the quality of every one. Quality did not predict the conclusion. Nor did peer review, nor topic, nor year. Funding did: 29 of the 31 reviews with a tobacco-funded author concluded passive smoking is not harmful, against 10 of the other 75. Ninety-four per cent against thirteen, and 77 per cent of the articles disclosed no funding at all, so the one thing that predicted the answer was the one thing the page did not carry.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Barnes DE, Bero LA. Why review articles on the health effects of passive smoking reach different conclusions. JAMA. 1998;279(19):1566-1570. Table 3: of 31 reviews with tobacco industry affiliated authors, 29 (94 per cent) concluded passive smoking is not harmful and 2 (6 per cent) that it is harmful; of 75 reviews without such affiliation, 10 (13 per cent) and 65 (87 per cent). Chi-square 60.69, P below .001; relative risk 7.0, 95 per cent confidence interval 3.9 to 12.6. Overall 39 of 106 reviews (37 per cent) concluded passive smoking is not harmful, and 29 of those 39 (74 per cent) had industry affiliated authors. In multiple logistic regression controlling for article quality, peer review status, topic and year of publication, affiliation was the only factor associated with the conclusion, odds ratio 88.4, 16.4 to 476.5.",
    year: 1998,
    doi: "10.1001/jama.279.19.1566",
    note: {
      en: "Every cell used here is printed rather than derived, and every printed statistic reconciles with the four counts: 39 of 106 is the stated 37 per cent, 29 of 39 the stated 74, the crude relative risk is 7.02 against a printed 7.0, and the chi-square recomputed from the two by two is 60.69, which is the paper's own value to both decimals. The test file asserts that chi-square, because reproducing a statistic the authors calculated independently is the strongest check available on a transcribed table. Five things a careful reader should hold against this. First, the paper counts a review as concluding not harmful if it said the evidence was inconclusive, which the authors state and defend on the ground that it amounts to accepting the null; excluding those 24 reviews made the association stronger rather than weaker, so the choice is conservative. Second, affiliation was assigned by the investigators from documented funding records against criteria fixed in advance, not from what authors disclosed, because most disclosed nothing; two of the ten unaffiliated reviews concluding not harmful had authors with weaker industry links that did not meet those criteria, and the authors say so. Third, this is an association across articles, not proof that any individual author was moved by money, and the paper is explicit that the conclusion of any review rests on the author's judgement. Fourth, the odds ratio the paper prints, 94.2 crude and 88.4 adjusted, is enormously larger than the relative risk of 7.0 for the reason the authors give: the outcome is common in the affiliated group, so the odds ratio badly overstates the risk ratio. This puzzle quotes 7.0 for that reason. Fifth, and in the spirit of the lesson itself, the same test applies to this study: it was conducted by researchers at the University of California, San Francisco who work on tobacco industry conduct and who had a stake in what it found. What makes it hard to explain away is not the authors' neutrality but the design, since the quality scoring and the classification of conclusions were both done blind by assessors who were told the study was about quality alone, and the association survives restricting the analysis to the highest-quality articles and to the peer-reviewed ones. One of those authors is also on the Cochrane review cited above, which is worth knowing when you read the two together.",
    },
  },

  goDeeperUrl: "https://catalogofbias.org/biases/industry-sponsorship-bias/",
};
