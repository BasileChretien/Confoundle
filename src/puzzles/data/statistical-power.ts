import type { Puzzle } from "../schema";

/**
 * Puzzle #32, statistical power and the type II error, on Freiman, Chalmers,
 * Smith and Kuebler (1978). This closes gap 1 of plan-syllabus-gaps.md, the only
 * gap that is rang A in France AND named in the USMLE outline.
 *
 * Seventy-one published trials that had all reported no significant difference
 * were re-examined. From the abstract, read off the journal page:
 *
 *   67 of 71   risk above 10 per cent of missing a true 25 per cent improvement
 *   50 of 71   the same risk for a 50 per cent improvement
 *   57 of 71   the 90 per cent CI still allowed a 25 per cent improvement
 *   34 of 71   the 90 per cent CI still allowed a 50 per cent improvement
 *
 * So only 71 - 67 = 4 were large enough to rule out a 25 per cent improvement,
 * and that is the number this puzzle turns on.
 *
 * CONSISTENT THREE WAYS. A survey has no external figure to check against, so
 * the checks are internal orderings that all have to hold: 67 > 50 because a
 * smaller improvement is harder to detect; 57 > 34, the same ordering under the
 * other criterion; and 67 > 57 with 50 > 34, because the power criterion is the
 * stricter of the two. The test file asserts all of them.
 *
 * NO NEW SHAPE, contrary to what the plan assumed. `rates`, two groups, one
 * stratum, setup filtered with `groupIds` and the reveal dropping the filter,
 * exactly as `misleading-axis` and `the-glass-that-was-never-there` do. The plan
 * wanted an `interval` shape because it was looking for ONE wide interval; a
 * survey of seventy-one turns the same lesson into counts.
 *
 * WHY THE HEDGE IS WRONG. The framing states that these were small trials and
 * that the question is whether they were big enough, which is the whole
 * inference. A reader who takes that seriously can reject "almost all of them".
 * That it is as few as four does not follow, and the reveal supplies it.
 *
 * WHAT THIS MUST NOT BECOME. Not "trials are unreliable" and not "a null result
 * means the treatment works". The claim is narrower: a trial that finds nothing
 * has only told you it found nothing, and whether that is evidence of absence
 * depends on whether it could have found something.
 */
export const statisticalPower: Puzzle = {
  schemaVersion: 1,
  id: "statistical-power-1978",
  slug: "no-difference-found",
  category: "statistical-reasoning",
  reasoningSkill: "statistical-power",
  difficulty: "medium",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Seventy-one trials, and every one of them concluded the new treatment was no better.",
    },
    framing: {
      en: "In 1978 four researchers went back through seventy-one published randomised trials which had all reported no significant difference between the treatment and the control. They were not checking whether the results were honest, or whether the analysis was right. They asked one question only: was each trial large enough that, if the treatment really had worked, it would have shown up? They set the bar at a twenty-five per cent improvement, which is a large effect, and asked how many of the trials had a good chance, better than nine in ten, of detecting one that size.",
    },
    question: {
      en: "How many of the seventy-one were big enough to have shown a twenty-five per cent improvement?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share of the seventy-one trials" },
      higherIsBetter: true,
      groups: [
        {
          id: "reported-nothing",
          label: { en: "Reported that the treatment made no difference" },
          short: { en: "Found nothing" },
        },
        {
          id: "could-have-found-it",
          label: { en: "Were large enough to have shown a 25 per cent improvement" },
          short: { en: "Could have found it" },
        },
      ],
      strata: [{ id: "survey", label: { en: "The 71 trials re-examined" } }],
      observations: [
        { groupId: "reported-nothing", stratumId: "survey", numerator: 71, denominator: 71 },
        { groupId: "could-have-found-it", stratumId: "survey", numerator: 4, denominator: 71 },
      ],
    },
    initialView: {
      kind: "aggregate",
      // Only the claim, not the capability. Seventy-one out of seventy-one is a
      // full bar, which is exactly how the literature looked to its readers.
      groupIds: ["reported-nothing"],
      caption: { en: "What all seventy-one of them concluded" },
    },
  },

  choices: [
    {
      id: "almost-all",
      label: { en: "Almost all of them" },
      sublabel: { en: "they were published, so somebody checked" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "about-half",
      label: { en: "Roughly half" },
      sublabel: { en: "some trials are small, some are not" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "a-handful",
      label: { en: "A handful. Fewer than one in ten" },
      sublabel: { en: "ask what a small trial can actually rule out" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Wrong here: the framing says these were trials being checked
      // for size, which is the inference the reader needs.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Four. Sixty-seven of the seventy-one could have missed a twenty-five per cent improvement entirely.",
    },
    mechanismLabel: { en: "What the trials could and could not see" },
    mechanismName: {
      en: "Finding nothing is not the same as there being nothing to find",
    },
    explanation: {
      en: "All seventy-one reported no significant difference, and all seventy-one were read as evidence that the treatment did not work. But only four of them were large enough to have had a better than nine in ten chance of detecting a twenty-five per cent improvement. In the other sixty-seven, a real and substantial benefit could have been sitting there and the trial would still, more often than one time in ten, have come back with nothing.",
    },
    body: {
      en: "The result of a small trial that finds nothing is not a finding of no effect. It is an absence of information. The authors made this concrete a second way, by computing what each trial's confidence interval still permitted: in fifty-seven of the seventy-one, a twenty-five per cent improvement was still consistent with the data, and in thirty-four of them so was an improvement of fifty per cent. These are treatments that were written up as no different from control while the evidence remained compatible with cutting the bad outcome in half. The trials had not shown the treatments did not work. They had failed to show anything.",
    },
    view: {
      kind: "aggregate",
      caption: { en: "What they concluded, and what they could have detected" },
    },
  },

  lesson: {
    skillName: { en: "Statistical power" },
    takeaway: {
      en: "A study that reports no significant difference has told you what it did not find, not what is not there. Whether that absence means anything depends entirely on whether the study was large enough to have found the effect if it existed, and that is a separate question with a separate answer.",
    },
    body: {
      en: "The phrase that causes the damage is no significant difference, because it sounds like a finding and is often only a shrug. Two different situations produce it. In the first, the study was large, the estimate is precise, and the data rule out any effect worth caring about; that is genuine evidence of absence and it is useful. In the second, the study was small, the estimate is surrounded by an interval wide enough to contain a substantial benefit, and the data rule out almost nothing. Both get written up in the same words, and often in the same words in the abstract, which is the only part most readers see. Freiman and colleagues showed that in the trials they surveyed the second situation was overwhelmingly the common one: sixty-seven of seventy-one. The point of the paper was not that those treatments worked. It was that nobody had found out.",
    },
    howItWorks: {
      en: "The formal machinery has two error types and it is worth keeping them apart, because everybody guards against one and forgets the other. A type I error is concluding there is an effect when there is not, and the p value and the five per cent threshold exist to control it. A type II error is concluding there is no effect when there is one, and nothing in a p value protects you from it at all. The probability of avoiding a type II error is the power of the study, and power depends on how many people you enrolled, how common the outcome is, and how big an effect you were looking for. Notice that last one, because it is the part people skip: power is never a property of a study alone, only of a study against a specified effect size. Freiman's trials were not underpowered in the abstract; they were underpowered to detect a twenty-five per cent improvement, and even fewer could have detected something smaller. So the useful question to carry is never was this study big enough, it is what could this study have ruled out, and the confidence interval answers it directly: read its far end, and ask whether an effect that size would matter to you. If it would, the study has not settled anything. Two practical notes. Absence of evidence is evidence of absence only when the evidence would have shown up, which is why a well-powered null result is genuinely informative and a small one is not. And this cuts against a habit worth naming: pooling many small negative trials into a claim that a treatment does not work is not the same as one adequately sized trial, though a meta-analysis done properly is exactly the tool for combining them.",
    },
    examples: [
      {
        title: { en: "How the same authors made the point twice" },
        summary: {
          en: "Counting underpowered trials is one way to show this, and the paper used a second that is easier to check by eye. For each of the seventy-one trials the authors computed a ninety per cent confidence interval for the true difference and drew all seventy-one of them stacked on one axis. Most of the intervals straddle zero, which is what makes them non-significant, but they are wide, and they stretch a long way into the half of the chart the authors labelled favouring treatment. Read as counts: in fifty-seven of the seventy-one the interval still allowed a twenty-five per cent improvement, and in thirty-four it still allowed fifty per cent. That figure is the whole argument in one picture, and the two methods agree in their ordering, since more trials fail the stricter power criterion than the interval one. Worth knowing that this is the standard way the question is answered now, and that a modern trial report is expected to give the interval precisely so a reader can do this without recomputing anything.",
        },
        provenance: {
          source:
            "Freiman JA, Chalmers TC, Smith H Jr, Kuebler RR. The importance of beta, the type II error and sample size in the design and interpretation of the randomized control trial: survey of 71 negative trials. New England Journal of Medicine. 1978;299(13):690-694. Figure 2, Ninety per cent confidence limits for the true percentage difference for the 71 trials. Abstract: in 57 of these negative trials a potential 25 per cent improvement was possible, and 34 of the trials showed a potential 50 per cent improvement.",
          year: 1978,
          doi: "10.1056/NEJM197809282991304",
        },
      },
    ],
  },

  share: {
    title: { en: "Statistical power, a reasoning trap." },
    explainer: {
      en: "Seventy-one published trials all reported that a treatment made no significant difference. When somebody went back and asked whether the trials were big enough to have detected a twenty-five per cent improvement if there had been one, the answer was four of them. Sixty-seven could have missed a real and substantial benefit entirely. No significant difference tells you what a study did not find, not what is not there. Whether the absence means anything depends on whether the study could have found it, which is a separate question.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Freiman JA, Chalmers TC, Smith H Jr, Kuebler RR. The importance of beta, the type II error and sample size in the design and interpretation of the randomized control trial: survey of 71 negative trials. New England Journal of Medicine. 1978;299(13):690-694. Abstract: 67 of the trials had a greater than 10 per cent risk of missing a true 25 per cent therapeutic improvement, and with the same risk 50 of the trials could have missed a 50 per cent improvement; therefore 4 of the 71 had a probability above 0.90 of detecting a 25 per cent improvement.",
    year: 1978,
    doi: "10.1056/NEJM197809282991304",
    note: {
      en: "Read from images of the journal page itself, the abstract and Figure 2, rather than from a summary. A survey has no external figure to reconcile against, so the checks here are internal orderings that all have to hold, and all three do: 67 exceeds 50, because a smaller improvement is harder to detect and so more trials could have missed it; 57 exceeds 34, the same ordering under the confidence interval criterion; and 67 exceeds 57 while 50 exceeds 34, because the power criterion is the stricter of the two. Three limits belong with this. It is 1978, and trial reporting has improved a great deal since, partly because of this paper, so the figure of four in seventy-one describes the literature of that period and not of today; what has not changed is the reasoning error it illustrates. The seventy-one are a set the authors assembled rather than a random sample of all negative trials, so the proportion is indicative rather than an estimate of a population. And a twenty-five per cent improvement here means a relative improvement in the response rate, not a difference of twenty-five percentage points, which is a distinction worth holding on to and one this deck teaches separately.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Power_(statistics)",
};
