import type { Puzzle } from "../schema";

/**
 * Puzzle #61, temporal validity, via Moss et al. (2023), Table 2.
 *
 * NO NEW SHAPE. `ratings`, holding a pooled percentage on the 0 to 100 scale it
 * was measured on, six markers on one axis. The setup draws the five periods of
 * the paper's left-hand column and the reveal adds one marker, which is the same
 * final period recomputed with five arms removed. One added marker is the whole
 * reveal, which is what this shape is for.
 *
 * THE TWO VIEWS ARE THE TWO COLUMNS OF ONE PRINTED TABLE. Table 2 gives pooled
 * eradication by publication period twice over, once for all clarithromycin
 * regimens and once excluding vonoprazan-based ones. The first four periods are
 * identical in both columns, arm for arm, because vonoprazan trials did not
 * exist yet; only the last period differs. So the reveal is not a recomputation
 * this deck performed, it is the neighbouring column.
 *
 * PERCENTAGES ARE AUTHORED AS PUBLISHED, and here that is not merely the usual
 * exception but the only defensible option. Table 1 does print per-arm ITT
 * numerators and denominators, but Table 2's figures are random-effects pooled
 * estimates, so summing Table 1 would produce a different number from the one
 * the paper prints. Deriving a figure the source does not state, in order to
 * satisfy a rule about deriving figures, would be the wrong way round.
 *
 * NOTHING IS DRAWN FROM FIGURE 2. Its embedded table of extrapolated 2022 rates
 * could not be aligned to its own columns with confidence from the rendered
 * page, and its values appear to disagree with the running text. See the
 * provenance note; this is recorded rather than quietly avoided.
 *
 * THE COMMIT BEAT SEPARATES ON DIRECTION, NOT MAGNITUDE. The framing prints all
 * five earlier figures AND names the first four as a steady fall, which is the
 * discriminator the hedge audit requires. What the setup licenses is whether
 * that fall carried on past 75.02 once the new drug is taken out: only
 * `below-everything` says it did, and the other three bands each assert a
 * reversal of a different size. Review caught an earlier draft failing exactly
 * here, where `mid-pack` sat at 79 while describing itself as "continuing the
 * gentle slide", so it read as the disciplined answer to anyone who had the
 * direction right and then got marked wrong on a magnitude nothing gave them.
 *
 * THE ARMS ARE NOT A FIXED PRESCRIPTION, and the framing must not say they are.
 * Only the antibiotic pair is constant, that being the review's inclusion
 * criterion; the acid suppressant and the course length both vary, and the paper
 * states it could not correct for that heterogeneity. An earlier draft claimed
 * "same doses, same lengths" and oversold the puzzle's own logic. See the
 * seventh provenance note.
 */
export const shelfLife: Puzzle = {
  schemaVersion: 1,
  id: "back-where-it-started",
  slug: "back-where-it-started",
  category: "statistical-reasoning",
  reasoningSkill: "temporal-validity",
  difficulty: "medium",
  tags: ["clinical", "research", "pharmacology", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "The same two antibiotics for twenty-three years. The trials say they still work about as well as ever.",
    },
    framing: {
      en: "One combination has been the standard first treatment for a stomach infection carried by perhaps half the world: an acid suppressant, clarithromycin and amoxicillin, taken together for a week or two. At its peak in the 1990s a trial put its cure rate at 94 per cent. A 2023 review pooled 67 arms from 38 randomised trials and grouped them by when they were published. The chart is that series. The first four groups fall steadily: 83.04 per cent before 2001, then 82.33, then 79.14, then 75.02 for trials published between 2011 and 2015. And then the last group, published after 2015, comes back up to 82.00 per cent, which is where the whole thing started. Testing across the five periods, the review found no significant difference between them. The antibiotics are the part that never changed: the same clarithromycin and amoxicillin throughout, which is what the review selected on. The arms do differ around them, in which acid suppressant they used and in whether the course ran five days or fourteen, and the review says it could not adjust for that. One difference stands out anyway. Five of the eleven arms in that final group used a newer kind of acid suppressant that simply did not exist when the earlier trials ran. The question is what the other six arms in that final group show on their own.",
    },
    question: {
      en: "Take out the five arms using a drug the earlier trials never had. Where do the remaining six land?",
    },
    data: {
      type: "ratings",
      label: { en: "A standard regimen, by the year its trials were published" },
      metricLabel: {
        en: "Pooled eradication rate, random-effects estimate. The count beside each marker is study arms pooled, not patients.",
      },
      scale: {
        min: 0,
        max: 100,
        minLabel: { en: "0%, cured nobody" },
        maxLabel: { en: "100%, cured everybody" },
      },
      /**
       * THE FIVE DRAWN AT THE SETUP LEAD THIS ARRAY, and the added marker is
       * last. `RatingsView` colours a row by its index after the view has
       * filtered it, so a series that changes position when the setup is
       * restricted also changes colour between the beats.
       *
       * The sixth row consequently wraps to the first palette colour, since
       * `GROUP_PALETTE` holds five. Left alone deliberately: `ratings` gives
       * every row its own line and its own axis segment, so colour identifies
       * nothing here that the label does not, and the two rows sharing a colour
       * sit at opposite ends of the scale under different headings. Extending
       * the palette would restyle `just-under-the-line`, which already draws six
       * bins, for no reading benefit here.
       */
      series: [
        {
          id: "pre-2001",
          label: { en: "Trials published before 2001" },
          short: { en: "Before 2001" },
        },
        {
          id: "y2001-2005",
          label: { en: "Published 2001 to 2005" },
          short: { en: "2001 to 2005" },
        },
        {
          id: "y2006-2010",
          label: { en: "Published 2006 to 2010" },
          short: { en: "2006 to 2010" },
        },
        {
          id: "y2011-2015",
          label: { en: "Published 2011 to 2015" },
          short: { en: "2011 to 2015" },
        },
        {
          id: "post-2015-all",
          label: { en: "Published after 2015, every arm" },
          short: { en: "After 2015" },
        },
        {
          id: "post-2015-old-drugs",
          label: {
            en: "Published after 2015, without the new acid suppressant",
          },
          short: { en: "After 2015, old drugs only" },
        },
      ],
      // Table 2 exactly as printed. The first four periods carry identical
      // figures and identical arm counts in both of that table's columns.
      observations: [
        { seriesId: "pre-2001", mean: 83.04, n: 12 },
        { seriesId: "y2001-2005", mean: 82.33, n: 21 },
        { seriesId: "y2006-2010", mean: 79.14, n: 16 },
        { seriesId: "y2011-2015", mean: 75.02, n: 7 },
        { seriesId: "post-2015-all", mean: 82.0, n: 11 },
        { seriesId: "post-2015-old-drugs", mean: 72.43, n: 6 },
      ],
    },
    initialView: {
      kind: "bothratings",
      groupIds: [
        "pre-2001",
        "y2001-2005",
        "y2006-2010",
        "y2011-2015",
        "post-2015-all",
      ],
      caption: { en: "Every arm, grouped by publication period" },
    },
  },

  choices: [
    {
      // The comfortable reading, and the one a busy prescriber reaches for: a
      // randomised result is a fact about the drug, so it should keep.
      id: "unchanged",
      label: {
        en: "Around 82 per cent as well. Five arms out of eleven cannot be carrying the whole group",
      },
      sublabel: { en: "a trial result is a trial result" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "mid-pack",
      label: {
        en: "Around 79, so the fall stopped and turned back up even without the new drug",
      },
      sublabel: { en: "resistance levelled off" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "below-everything",
      label: {
        en: "Around 72, below every earlier period, so the fall never stopped",
      },
      sublabel: { en: "the recovery was a different drug" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "higher",
      label: {
        en: "Higher than 82. The established regimens are holding up and the newcomer is dragging the group down",
      },
      sublabel: { en: "the new drug is the weak one" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "72.43 per cent, the lowest of any period. The recovery was a drug the earlier trials never had.",
    },
    mechanismLabel: { en: "The same table, one column to the right" },
    mechanismName: {
      en: "A label can stay fixed while the thing underneath it moves",
    },
    explanation: {
      en: "The last marker is not a recalculation. It is the neighbouring column of the same printed table, which reports every period twice: once for all clarithromycin regimens and once excluding the vonoprazan-based ones. The first four periods are identical in both columns, arm for arm, because that newer acid suppressant did not exist when those trials ran. Only the final period differs, and it differs by nearly ten points. Taking the five new arms out drops the group from 82.00 to 72.43, below the 75.02 that had looked like the floor, and the review's test across periods goes from no significant difference at all to a difference at less than one in ten thousand. Two things had been moving under one label. The bacterium grew resistant to clarithromycin, which the same review notes went from at or below 10 per cent resistance around the turn of the century to over 20 per cent across the United States, Europe and Asia by 2014 and as high as 60 per cent in some countries. And a better acid suppressant arrived, worth about fifteen points on its own against esomeprazole. Those two pull against each other, which is how a pooled line stays flat while the thing under it moves. They are not offered as the whole account: the review pooled courses running anywhere from five days to fourteen across six different acid suppressants, and states that it could not correct for that heterogeneity.",
    },
    body: {
      en: "The modelling in the same paper tells the story a second way. Fit a trend to eradication rate against publication year and the older regimens fall by 0.62 percentage points a year, which is significant at p = 0.0287. Restrict the trend to the proton-pump-inhibitor regimens and it stays significant at p = 0.0315. Put every arm back in, including the new ones, and the same trend is no longer significant at all, p = 0.3910. Nothing about the data changed between those two sentences except which arms were counted. That is worth sitting with, because the flat version is the one that reads like a headline: a standard treatment, tested for two decades, no significant change. The version that describes what a prescriber can actually write today is the other one. Note also what this puzzle does not show. It cannot tell you whether the newer drug will itself hold up, since the arms testing it are recent, few and clustered in one region, and the review says so. What it does show is that a treatment effect is not a fixed property of a drug. It is a fact about a drug, a bug and a year, and only one of those three appears on the prescription.",
    },
    view: {
      kind: "bothratings",
      caption: { en: "And the same period without the new drug" },
    },
  },

  lesson: {
    skillName: { en: "Findings have a shelf life" },
    takeaway: {
      en: "An effect measured in a trial is not a permanent property of the treatment. It is a measurement of a treatment against a world, and when the world moves the number goes stale without anybody being wrong at the time.",
    },
    body: {
      en: "There is a habit of treating a published effect size as though it were a physical constant: measured once, carefully, and therefore settled. For a great deal of clinical and social evidence that is false, and it is false in a particular way that makes it hard to notice. Nobody made a mistake. The 1990s trial that found 94 per cent really did find 94 per cent, in the patients and the bacteria of the 1990s. The modern trial finding 72 is not a refutation of it and does not imply anybody was careless. The two disagree because they measured different worlds, and the drug is the only part of the arrangement that held still. What makes this trap expensive is that the stale number does not announce itself. It sits in a guideline, a textbook or a review, carrying the authority of the randomised trial it came from, long after the thing it measured has drifted. And pooled summaries make it worse rather than better, because averaging across decades produces a figure that describes no particular year and is quietly propped up by whatever was newest in the sample.",
    },
    howItWorks: {
      en: "Three questions, and the first is nearly always enough. When was this measured, and has the thing it was measured against changed since? Anything involving an organism, a technology, a market or a norm should be assumed to drift, and the burden is on the number to show it has not. Second, if the figure comes from a pooled analysis spanning many years, ask what is in the recent end of it that was not in the old end. A newer and better variant entering under the same label will hold a declining average up, and the pooled figure will then describe a mixture nobody can actually be given. Third, when an old result and a new result disagree, resist the reflex to decide which team was sloppy. Ask instead what could have changed in between, and whether anybody measured that. A failed replication and an expired finding look identical on the page and call for opposite responses: one is a reason to distrust the original, the other is a reason to trust it and stop using it. The practical habit is small and cheap. Whenever a figure matters, look for its date before you look at its size, and treat the gap between that date and today as part of the uncertainty rather than as nothing at all.",
    },
  },

  share: {
    title: { en: "Findings have a shelf life, a reasoning trap." },
    explainer: {
      en: "A standard antibiotic combination cured 94 per cent of a common stomach infection in the 1990s. Pooling every trial published since, its cure rate looks flat across twenty-three years. Strip out the arms using a newer drug the old trials never had, and the recent figure is 72 per cent, the worst of any period. The prescription never changed. The bacterium did, and a pooled number spanning decades quietly hid it.",
    },
    captions: {
      competitive: { en: "Checked the date before the number." },
      selfDeprecating: { en: "I trusted a number older than I thought." },
    },
  },

  provenance: {
    source:
      "Moss SF, Chey WD, Daniele P, Pelletier C, Jacob R, Tremblay G, Hubscher E, Leifke E, Malfertheiner P. Brief communication: global temporal trends in the efficacy of clarithromycin-based regimens for the treatment of Helicobacter pylori infection. Therapeutic Advances in Gastroenterology. 2023;16:17562848231167284. Open access. Literature review to May 2021 plus one later trial, giving 67 study arms from 38 randomised trials across East Asian, South Asian and Western countries, all testing a triple regimen of an acid suppressor with clarithromycin and amoxicillin. Table 2, time-stratified pooled eradication rates by publication period, all clarithromycin regimens: 83.04 per cent pre-2001 (12 arms, 95% CI 77.99 to 87.12), 82.33 for 2001 to 2005 (21 arms, 80.03 to 84.42), 79.14 for 2006 to 2010 (16 arms, 71.21 to 85.33), 75.02 for 2011 to 2015 (7 arms, 66.17 to 82.18), 82.00 post-2015 (11 arms, 75.18 to 87.27), between-period p = 0.3460. The same table excluding vonoprazan-based arms gives an identical first four periods and 72.43 post-2015 (6 arms, 68.72 to 75.85), between-period p < 0.0001. A mixed-effects model with publication year as predictor gives a year coefficient of -0.62 percentage points (95% CI -1.16 to -0.09, p = 0.0287); the trend is significant for proton-pump-inhibitor regimens (p = 0.0315) and not significant once vonoprazan arms are included (p = 0.3910), with vonoprazan worth +14.81 points against esomeprazole (8.46 to 21.15, p < 0.0001). The 94 per cent peak-era figure and the resistance figures quoted in the reveal are from the paper's own background section.",
    year: 2023,
    doi: "10.1177/17562848231167284",
    url: "https://doi.org/10.1177/17562848231167284",
    note: {
      en: "Six things. First, on why percentages are drawn rather than counts. Table 1 does print per-arm intention-to-treat numerators and denominators, which is normally what this deck authors from, but Table 2's figures are random-effects pooled estimates rather than sums, so adding Table 1 up would produce a number the paper does not state and does not equal. Deriving a figure the source never printed, in order to satisfy a rule about deriving figures, would be the wrong way round, so the published percentages are used and this is the same exception the deck makes for pooled and published summary figures elsewhere. Second, a reconciliation that does hold and was worth running: the five periods carry 12, 21, 16, 7 and 11 arms, which sum to the 67 the paper reports, and the post-2015 row loses exactly five arms when vonoprazan is excluded, which matches the five vonoprazan arms individually listed in Table 1 (Murakami 2016, Maruyama 2017, Sue 2018, Suzuki 2020 and Chey 2022). Third, nothing on this card is drawn from Figure 2. That figure embeds a table of extrapolated 2022 rates whose columns could not be aligned with confidence from the published page, and whose listed values appear to disagree with the running text's statement that the proton pump inhibitors all reached 70 per cent or below. The trend statistics quoted here come from the running text, which states them unambiguously. Fourth, the time variable is the year of publication, not the year patients were treated, and trials appear some years after they enrol. The paper uses publication year and says so, but it means the decline is dated later than it happened. Fifth, the later groups are thin: 7 arms for 2011 to 2015 and only 6 for the corrected post-2015 figure, and the intervals show it. The corrected post-2015 interval of 68.72 to 75.85 does not overlap the pre-2001 interval of 77.99 to 87.12, which is the comparison the puzzle turns on, but the uncorrected post-2015 interval of 75.18 to 87.27 is wide and overlaps almost everything. Sixth, on what is not claimed: the newer acid suppressant's own durability is untested here, since its arms are few, recent and concentrated in one region, and the reveal says so rather than leaving the reader with the impression that the problem is solved. Seventh, and this one corrects an earlier draft of this card, the pooled arms are not a fixed prescription. The review's own inclusion list runs to six acid suppression backbones (vonoprazan, rabeprazole, lansoprazole, esomeprazole, omeprazole and mixed proton pump inhibitor) and to courses of five, seven, ten and fourteen days, and it states that \"it was not feasible to correct for the heterogeneity of dosage and duration of treatment in multivariable models due to the limited amount of data\". Only the antibiotic pair is constant, which is the review's selection criterion. So the decline is an observed temporal association with an uncontrolled mixture underneath it, and the composition effect the puzzle turns on is a printed contrast between two columns of one table rather than an adjusted estimate. The setup and the reveal both say this rather than implying the arms differ in one respect only.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Antimicrobial_resistance",
};
