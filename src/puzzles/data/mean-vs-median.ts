import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #26, mean versus median, on Lariviere et al. (2016) Table 2.
 *
 * A journal impact factor IS an arithmetic mean: the average number of citations
 * the journal's papers picked up. Table 2 of this paper prints, for eleven
 * journals, that mean beside the percentage of the journal's own papers that
 * fall BELOW it. Every journal lands between 65.3 and 75.5 per cent.
 *
 *   Science  mean 34.7   75.5% of its papers below it
 *   Nature   mean 38.1   74.8% of its papers below it
 *
 * WHY THIS SOURCE, over income or salary data. It is unimpeachably
 * non-partisan: no country, no party, no contested science. The numbers are
 * PRINTED rather than read off a figure, which is the exact wall that got
 * Correll et al rejected as a truncated-axis source. And it teaches scientists
 * to distrust the average they are themselves judged by, which is the project's
 * own tenet about not over-trusting a single number turned on the reader.
 *
 * THE PREPRINT PROBLEM, and how it is handled rather than hidden. This is a
 * bioRxiv preprint and was never peer reviewed, which by itself is thinner than
 * this deck's usual bar. Three things make it safe. Its authors are the editors
 * of Nature, Science, PLOS, EMBO, eLife and the Royal Society, working from
 * Thomson Reuters data. Its own prose independently restates Table 2 ("typically
 * 65-75% of the articles have fewer citations than indicated by the JIF"), so
 * the table has a second reading inside the same document. And the underlying
 * finding is two decades older and peer reviewed: Seglen 1997 in the BMJ, which
 * is the deep-dive example. The provenance note says all of this outright.
 *
 * WHAT THIS PUZZLE MUST NOT CLAIM. The paper prints no medians. So the puzzle
 * never states one. What it CAN say, and does, is that the median is necessarily
 * below the mean, because more than half the papers are: if 75.5 per cent sit
 * below 34.7, the fiftieth percentile does too. That is a deduction from the
 * printed number rather than a figure smuggled in.
 *
 * WHY THE HEDGE IS WRONG. The setup shows one published mean and no spread, so
 * "there is no way to tell" looks right. It is not, because the framing supplies
 * the two facts that settle it: a paper's citation count cannot go below zero,
 * and the spread runs over two to three orders of magnitude (the paper's own
 * words). A quantity with a floor and a long right tail has its mean dragged up
 * above the bulk of its values, so most papers MUST fall below it. That gets you
 * to "well under half" from the setup alone, which is why the correct choice is
 * phrased as a direction and not as a figure. The reveal then supplies the
 * figure, and the fact that all eleven journals behave the same way, which the
 * setup could not give you.
 */
export const meanVsMedian: Puzzle = {
  schemaVersion: 1,
  id: "mean-vs-median-lariviere-2016",
  slug: "the-average-paper",
  category: "statistical-reasoning",
  reasoningSkill: "mean-vs-median",
  difficulty: "medium",
  tags: ["everyday", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A journal's impact factor is just the average citations its papers got. Science scored 34.7.",
    },
    framing: {
      en: "The impact factor is an arithmetic mean and nothing more: take every paper a journal published in two years, count the citations each one picked up the following year, and average them. For Science that came to 34.7. Two things are worth holding on to before you answer. A paper cannot be cited fewer than zero times, so there is a floor. And the citations run over two to three orders of magnitude, so a handful of papers are cited hundreds or thousands of times while most are cited a few.",
    },
    question: {
      en: "What share of Science papers actually reached that average of 34.7?",
    },
    data: {
      type: "distribution",
      label: { en: "Citations per paper against the journal's own average" },
      itemLabel: { en: "papers published in 2013 and 2014" },
      valueLabel: {
        en: "The average is citations received during 2015 by papers published in 2013 and 2014.",
      },
      meanLabel: { en: "Average citations per paper, as published" },
      belowLabel: { en: "below their own journal's average" },
      aboveLabel: { en: "reached it" },
      percentNote: {
        en: "These are the percentages the source printed, not counts. The share reaching the average is derived from the share below it, so the two always account for every paper.",
      },
      groups: [
        { id: "science", label: { en: "Science" }, mean: 34.7, percentBelowMean: 75.5 },
        { id: "nature", label: { en: "Nature" }, mean: 38.1, percentBelowMean: 74.8 },
        {
          id: "nature-comm",
          label: { en: "Nature Communications" },
          short: { en: "Nature Comm." },
          mean: 11.3,
          percentBelowMean: 74.1,
        },
        {
          id: "sci-rep",
          label: { en: "Scientific Reports" },
          short: { en: "Sci. Rep." },
          mean: 5.2,
          percentBelowMean: 73.2,
        },
        { id: "plos-one", label: { en: "PLOS ONE" }, mean: 3.1, percentBelowMean: 72.2 },
        { id: "elife", label: { en: "eLife" }, mean: 8.3, percentBelowMean: 71.2 },
        {
          id: "j-informetrics",
          label: { en: "Journal of Informetrics" },
          short: { en: "J. Informetrics" },
          mean: 2.4,
          percentBelowMean: 68.4,
        },
        {
          id: "embo",
          label: { en: "The EMBO Journal" },
          short: { en: "EMBO J." },
          mean: 9.6,
          percentBelowMean: 66.9,
        },
        {
          id: "plos-biol",
          label: { en: "PLOS Biology" },
          short: { en: "PLOS Biol." },
          mean: 8.7,
          percentBelowMean: 66.8,
        },
        {
          id: "proc-r-soc-b",
          label: { en: "Proceedings of the Royal Society B" },
          short: { en: "Proc. R. Soc. B" },
          mean: 4.8,
          percentBelowMean: 65.7,
        },
        {
          id: "plos-genet",
          label: { en: "PLOS Genetics" },
          short: { en: "PLOS Genet." },
          mean: 6.7,
          percentBelowMean: 65.3,
        },
      ],
    },
    initialView: {
      kind: "average",
      groupIds: ["science"],
      caption: { en: "The number everyone quotes" },
    },
  },

  choices: [
    {
      id: "more-than-half",
      label: { en: "More than half of them" },
      sublabel: { en: "it is a strong journal" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "about-half",
      label: { en: "About half, which is what an average means" },
      sublabel: { en: "half above, half below" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "well-under-half",
      label: { en: "Well under half" },
      sublabel: { en: "the floor and the tail" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Offered in nearly every puzzle so that picking it is a
      // judgement rather than a tell, and wrong here: a quantity with a floor
      // and a long right tail must have most of its values below its mean, and
      // the framing gives you both facts.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "About a quarter. Three papers in four never reached their own journal's average.",
    },
    mechanismLabel: { en: "Where the average actually sits" },
    mechanismName: {
      en: "A long tail drags the average above almost everything it summarises",
    },
    explanation: {
      en: "75.5 per cent of the papers Science published in those two years were cited fewer than 34.7 times, so under a quarter reached the number the journal is ranked by. And this is not a quirk of one journal: across all eleven examined, between 65.3 and 75.5 per cent of papers fell below their own average. The bars below are the same published figures, with each journal's average now shown in its place:",
    },
    body: {
      en: "Notice what follows for free. Since more than half the papers sit below the average, the median paper does too, whatever its exact value happens to be. That is the general shape of the problem: when a quantity has a floor it cannot go under and no ceiling to stop it, a few enormous values haul the mean upward while the median stays down among the ordinary cases. The mean is still a perfectly correct number. It is just not a typical one, and quoting it as though it described a normal paper, salary or waiting time describes almost nobody.",
    },
    view: {
      kind: "spread",
      caption: { en: "All eleven journals" },
    },
  },

  lesson: {
    skillName: { en: "Mean versus median" },
    takeaway: {
      en: "An average is a number, not a typical case. Whenever a quantity has a floor and a long tail, the average is dragged above most of what it summarises, and the median is the honest summary to ask for.",
    },
    body: {
      en: "Be careful what this does and does not say. It does not say the impact factor is miscalculated: 34.7 really is the mean, and the arithmetic is not in dispute. It says the mean answers a different question from the one people use it for. Ranking journals by it is one thing; inferring anything about a particular paper from it is another, and the overlap between journals is so large that a paper in a journal with a mean of 5 is routinely cited more than a paper in one with a mean of 35.",
    },
    howItWorks: {
      en: "The mean and the median answer different questions, and on a symmetric distribution they happen to give the same answer, which is why the difference is so easy to forget. The mean is the balancing point: every value pulls on it in proportion to how far away it is, so a single value a thousand times bigger than the rest moves it a long way. The median is the middle person in the queue, and it does not care how rich the richest is, only how many people there are. So the gap between them is a direct measure of how lopsided the data is. Any quantity that cannot go below zero and has no upper bound tends to come out lopsided in the same direction: incomes, wealth, house prices, citations, hospital length of stay, time spent waiting on hold, downloads, deaths per outbreak, followers per account. In every one of those, the mean sits above the median, and the more extreme the tail the wider the gap. Which one gets quoted is therefore a choice, and it is not always an innocent one. If you want a figure to sound generous, use the mean of something with a long tail. If you want the same data to sound modest, use the median. Neither is a lie. The practical habit is short. When you meet an average of anything that could have a long tail, ask three things: what is the median, how big is the biggest value, and how many of the cases actually sit near the average? If nobody can tell you the median, that is itself informative. And if you are the one reporting the number, give both, because the pair takes one extra clause and removes the whole ambiguity.",
    },
    examples: [
      {
        title: { en: "The same finding, peer reviewed, twenty years earlier" },
        summary: {
          en: "This is not a new or contested observation. Two decades before the citation-distribution work, a study in the BMJ argued that journal impact factors should not be used to evaluate research, on exactly this ground: citations within a journal are so unevenly spread that the journal's average says very little about any particular paper in it. It reported that roughly the most cited 15 per cent of articles collect half of all a journal's citations, and that the articles actually earning a high impact factor are a small minority. The later work, using a much larger and more recent dataset, put a precise share on it for eleven named journals and found the same picture.",
        },
        provenance: {
          source:
            "Seglen PO. Why the impact factor of journals should not be used for evaluating research. BMJ. 1997;314(7079):498-502. Peer reviewed, and the standard citation for the skew of within-journal citation distributions.",
          year: 1997,
          doi: "10.1136/bmj.314.7079.498",
          url: "https://pubmed.ncbi.nlm.nih.gov/9056804/",
        },
      },
    ],
  },

  share: {
    title: { en: "Mean versus median, a reasoning trap." },
    explainer: {
      en: "An average sounds like it describes a typical case. Often it describes almost nobody. Scientific journals are ranked by their impact factor, which is simply the average number of citations their papers get. When someone actually checked, three quarters of the papers in Science and in Nature had fewer citations than their own journal's average, and the same held for all eleven journals examined. Nothing was miscalculated. It is just what an average does to any quantity that has a floor and a long tail, which includes incomes, house prices and waiting times. Ask for the median.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Lariviere V, Kiermer V, MacCallum CJ, McNutt M, Patterson M, Pulverer B, Swaminathan S, Taylor S, Curry S. A simple proposal for the publication of journal citation distributions. bioRxiv. 2016, Table 2. Impact factor and the percentage of citable items falling below it, for eleven journals: Science 34.7 and 75.5 per cent, Nature 38.1 and 74.8, Nature Communications 11.3 and 74.1, Scientific Reports 5.2 and 73.2, PLOS ONE 3.1 and 72.2, eLife 8.3 and 71.2, Journal of Informetrics 2.4 and 68.4, EMBO Journal 9.6 and 66.9, PLOS Biology 8.7 and 66.8, Proceedings of the Royal Society B 4.8 and 65.7, PLOS Genetics 6.7 and 65.3.",
    year: 2016,
    doi: "10.1101/062109",
    url: "https://www.biorxiv.org/content/10.1101/062109v2",
    note: {
      en: "Stated plainly because it matters: this source is a preprint and was not peer reviewed. It is used anyway, for three reasons given here so the reader can weigh them. Its authors are the editors of Nature, Science, PLOS, EMBO, eLife and the Royal Society, working from Thomson Reuters citation data, and it is published under CC BY. Its own prose independently restates the table, saying that typically 65 to 75 per cent of articles have fewer citations than the impact factor indicates, so the figures have a second reading inside the same document. And the underlying finding is older and peer reviewed, which is what the deep-dive example is for. Two limits on the numbers themselves. They cover citable items only, meaning research and review articles as classified by Thomson Reuters, because journals publish very different amounts of editorial and news material. And the counts come from a window matched to the impact factor, citations received during 2015 by papers published in 2013 and 2014, so they will not match a journal's published impact factor to the decimal. The paper prints no medians, so this puzzle states none; that the median lies below the mean is a deduction from more than half the papers doing so, not a figure taken from the source.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Skewness",
};
