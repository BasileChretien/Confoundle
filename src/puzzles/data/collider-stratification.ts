import type { Puzzle } from "../schema.ts";

/**
 * Collider stratification, on the existing `forest` shape.
 *
 * US 1991 linked birth/infant-death records, 3,001,621 livebirths. Babies of
 * mothers who smoked died at 1,235 per 100,000 against 805 for non-smokers, a
 * rate ratio of 1.55. But among babies under 2,500 g the ratio is 0.79: inside
 * that group, having a mother who smoked looks protective. It is not. Smoking
 * is one cause of being small, and a comparatively mild one; a baby that small
 * whose mother did not smoke is that small for some other reason, and the other
 * reasons carry much higher mortality of their own.
 *
 * NO NEW SHAPE, AND THAT WAS CHECKED RATHER THAN ASSUMED. The lesson is that a
 * stratum-specific estimate and the whole-population estimate disagree, and a
 * plot of exactly those estimates against the null is the honest picture of
 * that. `benchmarkId` names the overall row, so the reveal draws it as a line
 * across the plot and a reader can see which strata reach it, which is the
 * question the card asks. `crossed` was considered and rejected: it is a two by
 * two factorial shape.
 *
 * WHY THE CURVES ARE NOT DRAWN. The signature of this paradox is the crossover
 * of the birth-weight-specific mortality curves, and it would be the obvious
 * figure. The paper puts those curves in a figure and prints no table behind
 * them, so the per-interval rates are not available to author. Reading numbers
 * off a plotted curve would be inventing them. The four printed estimates are.
 *
 * NOTHING IS RECOMPUTED FROM COUNTS, and the reason is worth stating because
 * this deck's default is the opposite. The source prints rate ratios estimated
 * by logistic regression, and 1,235 divided by 805 is 1.53 rather than the
 * printed 1.55: the two mortality rates and the rate ratio come from different
 * estimators. So both are quoted as printed and neither is derived from the
 * other, and no figure on this card divides one published number by another.
 *
 * THE ADJUSTED ROW IS ON THE FIGURE ON PURPOSE. Splitting by birth weight and
 * adjusting for it are the same mistake in two costumes, and the second is the
 * one a reader is far likelier to make, since it looks like ordinary care.
 * 1.55 falls to 1.09 on adjustment, which reads as "most of the harm runs
 * through birth weight" and is the same artifact.
 *
 * WHY NOT `simpsons-paradox`, which is the nearest shipped card. There the
 * lurking variable is a CONFOUNDER, a common cause of both, and stratifying is
 * the fix. Here birth weight is caused BY the exposure and shares causes with
 * the outcome, so stratifying is what creates the reversal. Same picture,
 * opposite remedy, which is exactly why they belong in `COUSINS` together.
 */
export const colliderStratification: Puzzle = {
  schemaVersion: 1,
  id: "collider-stratification-birthweight",
  slug: "small-for-a-worse-reason",
  category: "causal-reasoning",
  reasoningSkill: "collider-stratification",
  difficulty: "hard",
  tags: ["research", "epidemiology", "clinical"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Among babies born underweight, those whose mothers smoked in pregnancy were less likely to die in their first year than those whose mothers did not.",
    },
    framing: {
      en: "This comes from 3,001,621 US births in 1991, linked to infant death records. Smoking makes babies smaller: 11.4 per cent of smokers' babies were born under 2,500 g, against 6.4 per cent of non-smokers'. The comparison above was made inside the underweight group, between babies of the same size.",
    },
    question: {
      en: "What does the lower mortality among smokers' underweight babies show?",
    },
    data: {
      type: "forest",
      label: { en: "Infant death, babies of smokers against babies of non-smokers" },
      unit: {
        en: "Rate ratio for death in the first year. US 1991 linked birth and infant death records.",
      },
      metricLabel: { en: "Rate ratio for death before the first birthday" },
      nullValue: 1,
      nullLabel: { en: "No difference" },
      worseLabel: { en: "More deaths among smokers' babies" },
      betterLabel: { en: "Fewer deaths among smokers' babies" },
      higherIsWorse: true,
      axisMin: 0.6,
      axisMax: 2,
      benchmarkId: "overall",
      rows: [
        {
          id: "lbw",
          label: { en: "Among babies born under 2,500 g" },
          short: { en: "Under 2,500 g" },
          estimate: 0.79,
          ciLow: 0.76,
          ciHigh: 0.82,
        },
        {
          id: "overall",
          label: { en: "All babies" },
          short: { en: "All babies" },
          estimate: 1.55,
          ciLow: 1.5,
          ciHigh: 1.59,
          isPooled: true,
        },
        {
          id: "normal",
          label: { en: "Among babies born at 2,500 g or more" },
          short: { en: "2,500 g or more" },
          estimate: 1.8,
          ciLow: 1.72,
          ciHigh: 1.88,
        },
        {
          id: "adjusted",
          label: { en: "All babies, adjusted for birth weight" },
          short: { en: "Adjusted for weight" },
          estimate: 1.09,
          ciLow: 1.05,
          ciHigh: 1.12,
        },
      ],
    },
    initialView: { kind: "whatisknown", groupIds: ["lbw"] },
  },

  /*
    One band sits where the figure actually points. The trap takes the stratum
    estimate as an effect. The second and fourth take it as a real but smaller
    or narrower effect, which is the same mistake with a hedge on it. Only the
    third says what the comparison is between, which is the whole lesson.
  */
  choices: [
    {
      id: "protective",
      label: { en: "That smoking protects babies who are born small" },
      sublabel: { en: "the effect must differ by birth weight" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "only-normal",
      label: { en: "That smoking only harms babies of normal weight" },
      sublabel: { en: "the harm is real but does not reach the small ones" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "different-reasons",
      label: {
        en: "Nothing about smoking: inside one weight group, the babies are small for different reasons",
      },
      sublabel: { en: "and some of those reasons are far more dangerous" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "smaller-harm",
      label: { en: "That the real harm of smoking is smaller than the overall figure" },
      sublabel: { en: "comparing like with like removes the exaggeration" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Across all 3,001,621 births, babies of smokers died at 1,235 per 100,000 against 805 for non-smokers, a rate ratio of 1.55. The protective-looking 0.79 exists only inside the underweight group, and among normal-weight babies the ratio is 1.80. No group is better off.",
    },
    mechanismLabel: { en: "What does comparing inside one weight group compare?" },
    mechanismName: { en: "Conditioning on a collider" },
    explanation: {
      en: "Smoking is one cause of a baby being small, and as causes of smallness go it is a mild one. A baby born that small to a mother who did not smoke is small for some other reason, and the other reasons include birth defects and severe growth restriction, which carry a high mortality of their own. So inside the underweight group the comparison is not between two similar sets of babies. It is between babies who are small because of tobacco and babies who are small because of something worse. The paper puts it exactly this way: underweight babies of smokers may have lower mortality than other underweight babies whose low weight is due to causes associated with high mortality.",
    },
    body: {
      en: "The fourth row is the same mistake wearing better clothes. Adjusting for birth weight rather than splitting on it drags the overall ratio from 1.55 down to 1.09, which reads as though most of smoking's harm ran through birth weight and little else remained. It is the identical artifact: birth weight is affected by the exposure and shares causes with the outcome, so holding it fixed opens a path that was not there before. For the overall effect of something that happens before birth, adjusting for birth weight is not merely unnecessary. It is harmful.",
    },
    view: { kind: "themissingrow" },
  },

  lesson: {
    skillName: { en: "Conditioning on a collider" },
    takeaway: {
      en: "If a variable is affected by the exposure and also shares causes with the outcome, then comparing within levels of that variable manufactures an association that is not there. The tell is a subgroup in which the exposure looks protective while it is plainly harmful overall. Before believing a within-group comparison, ask what put people into the group, and whether the exposure is one of the things that did.",
    },
    body: {
      en: "The instinct this breaks is a good one: compare like with like. Usually that instinct is right, and holding a variable fixed is how confounding gets controlled. It fails when the variable you are holding fixed is downstream of the thing you are studying. Then the people you have gathered into one level of it arrived there by different routes, and the route is exactly what predicts the outcome. You have not removed a difference between the groups. You have created one.",
    },
    howItWorks: {
      en: "Two conditions have to hold together, and either alone is harmless. The variable has to be affected by the exposure, and it has to share causes with the outcome. Birth weight satisfies both: smoking lowers it, and the other things that lower it, birth defects among them, kill babies through routes of their own. Note that the variable does not have to sit on the causal path between exposure and outcome for this to happen, which is why the usual advice about not adjusting for mediators does not cover all of it. The same shape appears far from obstetrics. Among patients with raised liver enzymes, heavy drinkers may have a better short-term prognosis than non-drinkers, because a non-drinker whose enzymes are raised is likelier to have liver cancer. Among people admitted to hospital, two unrelated diseases can appear to be associated because having either is a reason to be admitted. In every case the fix is the same and it is not statistical: work out what causes what before deciding what to hold fixed, and accept that for the total effect of an exposure, some variables must be left alone even though the data would let you adjust for them.",
    },
    examples: [
      {
        title: { en: "The same artifact, without smoking anywhere in it" },
        summary: {
          en: "Babies born at high altitude are smaller than babies born lower down, and in comparable populations they die at about the same rate, a rate ratio near 1. So altitude is not doing much harm. But a comparison made inside one birth-weight group would be expected to show altitude as protective, for the identical reason: in a high-altitude city some of the small babies are small merely because of the altitude, whereas lower down the small babies are small only for the more dangerous reasons. Nothing about smoking, nothing about tobacco chemistry, and the same spurious protection falls out. That is what tells you the effect is a property of the analysis rather than of the exposure.",
        },
        provenance: {
          source:
            "Hernández-Díaz S, Schisterman EF, Hernán MA. The birth weight 'paradox' uncovered? American Journal of Epidemiology 2006;164(11):1115-1120, section 'A general approach to the paradox'. The equal mortality at altitude is reported there citing Wilcox 2001; the stratified comparison is given as what the mechanism predicts, not as a measurement",
          year: 2006,
          doi: "10.1093/aje/kwj275",
          url: "https://academic.oup.com/aje/article/164/11/1115/61454",
        },
      },
    ],
  },

  share: {
    title: { en: "Small for a worse reason." },
    explainer: {
      en: "Among US babies born under 2,500 g in 1991, those whose mothers smoked died less often than those whose mothers did not, a rate ratio of 0.79. Smoking did not protect them. Across all 3,001,621 births the ratio was 1.55, and among normal-weight babies 1.80. Inside one weight group, a smoker's baby is small because of the tobacco, while a non-smoker's baby that small is small for something worse. Comparing within a variable the exposure itself moved manufactures the reversal.",
    },
    captions: {
      competitive: { en: "Asked why the babies in that group were small." },
      selfDeprecating: { en: "I concluded that cigarettes are good for small babies." },
    },
  },

  provenance: {
    source:
      "Hernández-Díaz S, Schisterman EF, Hernán MA. The birth weight 'paradox' uncovered? American Journal of Epidemiology 2006;164(11):1115-1120. US 1991 national linked birth/infant-death data, 3,001,621 livebirths after excluding missing birth weight or smoking data and excluding California. Infant mortality 1,235 per 100,000 livebirths for smokers against 805 for non-smokers; rate ratio 1.55 (95% CI 1.50, 1.59) crude, 1.09 (1.05, 1.12) adjusted for birth weight, 0.79 (0.76, 0.82) among low birth weight infants and 1.80 (1.72, 1.88) among the rest. Low birth weight prevalence 11.4% and 6.4%",
    year: 2006,
    doi: "10.1093/aje/kwj275",
    url: "https://academic.oup.com/aje/article/164/11/1115/61454",
    note: {
      en: "Nothing on this card is recomputed from counts, which is a departure from this deck's usual rule and is deliberate. The source prints rate ratios estimated by logistic regression, so 1,235 divided by 805 gives 1.53 rather than the printed 1.55: the two rates and the ratio come from different estimators, and neither is derived from the other here. The paper prints its birth-weight-specific mortality curves as a figure with no table behind them, so the per-interval rates that would draw the famous crossover are not available to author and are not drawn. The stratum sizes are likewise not printed, which is why the rows carry no count column.",
    },
  },
};
