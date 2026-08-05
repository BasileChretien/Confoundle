import type { Puzzle } from "../schema";

/**
 * A five point lead, a margin of plus or minus 2.9, and the wrong ruler.
 *
 * Marist asked 1,128 American adults whether the referees would have a major
 * impact on the Super Bowl, a minor one, or none. 42 per cent said major, 37
 * per cent said minor. The poll's printed margin is 2.9 points, so the five
 * point lead looks comfortably outside it, and that is how such a result gets
 * written up.
 *
 * It is the wrong comparison. The 2.9 belongs to one share. The lead is a
 * difference between two shares of ONE sample, and because a respondent who
 * said major did not also say minor, the two move against each other:
 *
 *   Var(p1 - p2) = [p1 + p2 - (p1 - p2)^2] / n
 *
 * which here gives 5.18 points. The lead does not clear its own margin.
 *
 * WHY THE QUESTION ASKS FOR A WIDTH AND NOT A VERDICT. Because the verdict is
 * not safe to ask about. The shares are printed as integers, so the true lead
 * lies somewhere in (4.0, 6.0), and above roughly 5.2 the verdict flips. Asking
 * "is the lead significant" would make the correct answer rest on rounding,
 * which this project does not do. Asking how wide the margin on the lead is has
 * an answer that follows from the published figures and that no rounding moves,
 * and the verdict then belongs in the reveal where the 0.18 points of headroom
 * can be stated plainly. That thinness is not an embarrassment to work around;
 * it is the most honest thing on the page.
 *
 * WHY ROOT TWO IS A BAND. Because it is right, for two independent samples,
 * where the covariance vanishes. A player who knows that rule and applies it
 * here is applying it outside its scope, and the framing says in as many words
 * that both figures come from the same people, so the setup licenses the
 * distinction. See docs/hedge-audit.md.
 *
 * WHAT IS DELIBERATELY NOT CLAIMED. Not that the referees will or will not
 * matter. Not that Marist did anything wrong: it printed its margin, its sample
 * size and its method, which is what makes this checkable at all. And not that
 * the printed margin is exact, since a poll prints one figure for a whole
 * sample while the true margin is widest at fifty per cent.
 */
export const marginOfError: Puzzle = {
  schemaVersion: 1,
  id: "margin-of-error-poll-lead",
  slug: "a-lead-that-is-not-a-lead",
  category: "measurement",
  reasoningSkill: "margin-of-error",
  difficulty: "medium",
  tags: ["everyday", "statistics", "media", "sports"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Asked whether referees would decide the Super Bowl, 42 per cent of Americans said major impact and 37 per cent said minor. The poll's margin of error is plus or minus 2.9 points.",
    },
    framing: {
      en: "Both figures come from the same 1,128 people, and nobody gave both answers: a respondent who said major impact did not also say minor. The five point lead is what a writeup would call the finding. This question is not about whether the lead is real. It is about the size of the ruler you would need to decide that.",
    },
    question: {
      en: "The margin on each share is plus or minus 2.9 points. How wide is the margin on the five point lead between them?",
    },
    data: {
      type: "interval",
      label: { en: "Will the referees decide the Super Bowl?" },
      metricLabel: {
        en: "Share of 1,128 American adults, as published, each with the poll's margin of error",
      },
      gapLabel: { en: "The lead, and the margin that belongs to it" },
      statNote: {
        en: "Marist Poll, 3 to 4 February 2025, 1,128 national adults, margin of error plus or minus 2.9 points. Under 1 per cent gave no opinion and is not drawn. An online panel balanced to census benchmarks, so the margin is a modelled figure rather than a sampling margin.",
      },
      sampleSize: 1128,
      publishedMargin: 2.9,
      options: [
        { id: "major", label: { en: "A major impact" }, short: { en: "Major" }, percent: 42 },
        { id: "minor", label: { en: "A minor impact" }, short: { en: "Minor" }, percent: 37 },
        { id: "none", label: { en: "No impact at all" }, short: { en: "None" }, percent: 21 },
      ],
      gapBetween: ["major", "minor"],
    },
    initialView: { kind: "oneshare" },
  },

  choices: [
    {
      // The comparison every writeup makes: one margin, applied to everything
      // on the page including the difference between two of the numbers.
      id: "same",
      label: { en: "The same, plus or minus 2.9 points" },
      sublabel: { en: "one poll, one margin" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      // Correct for two independent samples, where the covariance term is zero.
      // Wrong here, and the framing says why: same people, exclusive answers.
      id: "roottwo",
      label: { en: "About plus or minus 4.1 points" },
      sublabel: { en: "wider by a factor of the square root of two" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "double",
      label: { en: "About plus or minus 5.2 points" },
      sublabel: { en: "nearly twice as wide" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The intuition that two errors in one sample partly cancel. They do the
      // opposite when the two shares are mutually exclusive.
      id: "narrower",
      label: { en: "Narrower, about plus or minus 2.1 points" },
      sublabel: { en: "the two errors partly cancel" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The margin on the lead reaches back past zero.",
    },
    mechanismLabel: { en: "The same poll, measured where the claim was made" },
    mechanismName: { en: "The margin on a difference is not the margin on a number" },
    explanation: {
      en: "Nothing was recalculated. The published shares and the published margin are the same as they were a moment ago; the only change is that the interval is drawn around the quantity the claim was actually about. The margin on the lead works out at 5.2 points against a lead of 5.0, so the interval runs from just below zero to about ten, and the thin inner bracket is the 2.9 the reader was given. Note how little room there is at the bottom. The shares are printed as whole numbers, so the true lead is somewhere between four and six, and near the top of that range the lead would clear its margin after all. That thinness is the finding, not a flaw in it: a poll of this size cannot separate 42 from 37, and it cannot tell you it cannot.",
    },
    body: {
      en: "Why wider rather than narrower, when both numbers come from one sample? Because they are mutually exclusive. Every respondent who moves from minor to major raises one share and lowers the other, so the two errors do not cancel, they compound. Written out, the variance of the difference is the sum of the two variances plus twice the covariance, and for two shares of the same sample that covariance is negative, which makes the term it enters positive. Near an even split the result is close to double the margin on either share. The square root of two is not wrong in general; it is the answer when the two figures come from two separate samples, and applying it here is applying a correct rule outside the case it was built for. None of this is a complaint about the pollster. Marist printed its sample size, its margin and its method, which is the only reason any of this is checkable. The number that was missing was the one nobody prints, because the margin on a difference has to be worked out per comparison and no single figure at the bottom of a table could carry it.",
    },
    view: { kind: "thegap" },
  },

  lesson: {
    skillName: { en: "The margin on a lead is not the margin on the poll" },
    takeaway: {
      en: "A poll prints one margin, and it belongs to one number at a time. Any claim about a gap, a lead, a change since last month, or a difference between two groups needs its own margin, and that margin is wider, usually close to twice as wide. Before believing a lead, double the printed margin and see whether the lead survives.",
    },
    body: {
      en: "This is the arithmetic behind an enormous share of confident reporting. Almost nothing anybody wants to know from a poll is a single number. People want to know who is ahead, whether support went up, whether one group differs from another, and every one of those is a difference. The margin printed at the bottom of the table is not the margin on any of them, and it is always the smaller figure, so using it makes every comparison look sharper than the data can support.",
    },
    howItWorks: {
      en: "A margin of error is a statement about how far one estimate is likely to sit from the truth. Combine two estimates and the uncertainties combine too, and how they combine depends on whether the two came from the same people. Two separate samples give independent errors, and independent errors add in quadrature, so the margin grows by the square root of two. Two shares of one sample are not independent: they are mutually exclusive, so a respondent who lands in one cannot land in the other, and the two estimates move in opposite directions. That makes their covariance negative, and subtracting a negative covariance adds to the variance of the difference. Near an even split it works out at roughly double the single margin. The practical rules are short. First, when a poll reports a lead, mentally double the printed margin before deciding whether the lead is real; if the lead is smaller than that, the poll has not separated the two options. Second, be even more careful with a change over time between two different polls, where you have two independent samples and two design effects and often two different question wordings, and where the honest margin is wider again. Third, when a report says a result is outside the margin of error, check what quantity it is talking about, because the phrase is almost always applied to a difference using a margin computed for a share.",
    },
    examples: [
      {
        title: { en: "Why the arithmetic is not in dispute" },
        summary: {
          en: "The American Association for Public Opinion Research states plainly that the margin of sampling error reported for a poll applies to a single estimate, and that the error around a difference between two estimates is larger than the error around either one. Its guidance is that comparisons need their own calculation rather than the headline figure, and it is explicit that this applies both to differences between subgroups and to changes between two surveys.",
        },
        provenance: {
          source:
            "American Association for Public Opinion Research. Margin of Sampling Error and Credibility Interval, AAPOR Standards and Ethics resources",
          year: 2024,
          url: "https://aapor.org/standards-and-ethics/margin-of-sampling-error-credibility-interval/",
        },
      },
    ],
  },

  share: {
    title: { en: "The margin on a lead is not the margin on the poll, a reasoning trap." },
    explainer: {
      en: "A poll of 1,128 American adults found 42 per cent expecting the referees to have a major impact on the Super Bowl against 37 per cent expecting a minor one, with a printed margin of plus or minus 2.9 points. Five beats 2.9, so the lead reads as real. But 2.9 is the margin on one share. The margin on the difference between two shares of the same sample is about 5.2 points, because the two are mutually exclusive and their errors compound rather than cancel, and the lead does not clear it. Before believing any lead, double the printed margin.",
    },
    captions: {
      competitive: {
        en: "Five points clear of a 2.9 point margin, and still not a lead.",
      },
      selfDeprecating: {
        en: "I checked it against the margin of error. The wrong one, it turns out.",
      },
    },
  },

  provenance: {
    source:
      "Marist Poll of 1,128 National Adults, Super Bowl LIX survey, interviews conducted 3 to 4 February 2025, Marist Institute for Public Opinion",
    year: 2025,
    url: "https://maristpoll.marist.edu/polls/the-super-bowl-february-2025/",
    note: {
      en: "Read at source off the rendered methodology page and the national tables, not off a summary. The three shares are exactly as printed for national adults on the question asking whether the referees would have a major impact, a minor impact, or no impact at all: 42, 37 and 21 per cent, with under 1 per cent giving no opinion, which is stated on the figure and not drawn. Percentages are authored as published because polls print shares and margins and never counts, the same deliberate exception this project already makes for framing, distribution, dose, estimation, magnitude and target data. Nothing else is authored: the five point lead, the 5.2 point margin on that lead and the comparison with the printed 2.9 are all derived from the shares and the sample size, and the schema refuses a printed margin that the sample size cannot produce. That last check matters more than it looks. Marist applies a design effect to some of its surveys and not others, and everything on the second beat scales with which one you assume. Here both printed margins reproduce from the plain binomial formula with no design effect: 1.96 times 0.5 divided by the square root of 1,128 gives 2.918, which rounds to the printed 2.9, and the same formula on the 1,011 registered voters gives 3.082, which rounds to the printed 3.1. Three honesty notes. This was an online panel drawn from aggregated non-probability sources and balanced to the 2022 American Community Survey estimates for age, gender, income, race and region, so its margin of error is a modelled quantity rather than a sampling margin in the textbook sense; the arithmetic relating one margin to the other is unaffected, but nothing here should be read as saying this was a random sample. The printed margin is also a single figure for a whole sample, while a true margin is widest at fifty per cent and narrows towards the ends, so 2.9 is itself an approximation at 42 and 37. And because the shares are printed as whole numbers the true lead lies somewhere between four and six points, which is why this puzzle asks how wide the margin on the lead is rather than asking whether the lead is significant: the width follows from the published figures and no rounding moves it, while the verdict sits close enough to the boundary that rounding could turn it. The reveal says so.",
    },
  },

  goDeeperUrl:
    "https://aapor.org/standards-and-ethics/margin-of-sampling-error-credibility-interval/",
};
