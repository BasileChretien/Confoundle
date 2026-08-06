import type { Puzzle } from "../schema";

/**
 * Puzzle #63, composite endpoints, via Kip et al. (2008).
 *
 * NO NEW SHAPE. `forest` already draws several estimates with their intervals
 * against a named null line, and this is what it was for. The only extension is
 * `higherIsWorse`, an optional flag, because these are hazard ratios for adverse
 * events where ABOVE the line is the harmful side, the opposite of the effect
 * sizes the shape was first built on.
 *
 * THE TWO VIEWS ARE ONE COHORT COUNTED TWICE. This is the cleanest instance of
 * the deck's central tenet it has had. The setup and the reveal are not two
 * different studies, nor a total and its parts: they are the SAME 6,922 patients
 * over the SAME year with the SAME recorded events, and the only thing that
 * changes between the beats is which of those event TYPES the outcome counts.
 * Not "the same events counted two ways", which would be false: the wider
 * definition counts MORE events, 674 against 362. What is fixed is the record;
 * what moves is the definition drawn across it.
 *
 * AND THE TWO COMPARISONS TRADE PLACES. On the safety definition, presenting with
 * acute MI carries a higher adjusted hazard with its interval clear of 1 (1.75);
 * fold revascularisation in and it is ATTENUATED to 1.20 with an interval that
 * crosses 1, so it no longer reaches significance. Attenuated is not abolished,
 * and the card says the interval now crosses rather than that the finding
 * vanished. Multilesion stenting does the reverse: not significant on the safety
 * definition (1.06, crossing) and significantly associated with a higher hazard
 * once revascularisation is folded in (1.41, clear). These are observational
 * associations throughout, so no beat says either group BECAME worse.
 * A card where both rows moved the same way would be a card about dilution; this
 * one is about the definition deciding the answer, which is a different lesson.
 *
 * THE COMMIT BEAT IS ANSWERABLE, and the framing carries what it needs: that the
 * added component is repeat revascularisation, that it is far more common than
 * the safety events (674 and 868 against 362), and what multilesion stenting
 * actually is. A player who sees that a common component dilutes an effect
 * concentrated in rare events, and that repeat revascularisation is precisely
 * what treating several lesions produces, can reach the swap. The four bands are
 * four distinct PATTERNS across the two rows rather than four guesses at one
 * number, so no two of them share a reading.
 *
 * IT IS A REGISTRY, NOT A TRIAL, and every beat says so. DEScover is prospective
 * and observational, these are covariate-adjusted hazard ratios, and the two
 * subgroups are not randomised against one another. Nothing here licenses a
 * causal claim about acute MI or about multilesion stenting, and the card makes
 * no such claim: what it claims is that the definition moved the answer, which
 * survives every one of those limitations because both definitions were applied
 * to the same people.
 */
export const compositeEndpoints: Puzzle = {
  schemaVersion: 1,
  id: "count-it-differently",
  slug: "count-it-differently",
  category: "statistical-reasoning",
  reasoningSkill: "composite-endpoints",
  difficulty: "hard",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Two findings from one year of stent patients. Nothing about the patients is about to change.",
    },
    framing: {
      en: "Cardiology reports outcomes as MACE, major adverse cardiac events, a composite that bundles several things into one number. There is no standard definition of it, and that turns out to matter. Researchers took 6,922 patients who received a drug-eluting stent, followed them for a year, and asked two ordinary questions of that one dataset. Did patients who arrived with a heart attack do worse over the year than those who did not? And did patients who had several lesions treated do worse than those who had one? Counting only the hard safety events, death, heart attack and stent thrombosis, there were 362 of them in the year. On that definition, arriving with a heart attack predicts a clearly worse year: a hazard ratio of 1.75, and the interval runs 1.31 to 2.34, well clear of 1. Multiple lesions predicts nothing at all: 1.06, interval 0.77 to 1.48, straddling 1. Now the researchers widen the definition. They add repeat revascularisation, meaning a vessel needed treating again, which is much more common than the safety events: the count goes from 362 to 674. Not one patient changes and nothing new is added to the record. The same year is simply counted with a wider net. What happens to the two findings?",
    },
    question: {
      en: "The same 6,922 patients, the same year, one wider definition of MACE. What happens to the two findings?",
    },
    data: {
      type: "forest",
      label: { en: "Two questions of one dataset, under two definitions of the outcome" },
      unit: {
        en: "Adjusted hazard ratio over one year, from a prospective registry. Above 1 is higher risk.",
      },
      metricLabel: {
        en: "The number beside each row is the events the definition counts across the whole cohort.",
      },
      nullValue: 1,
      nullLabel: { en: "No difference" },
      worseLabel: { en: "This group did worse" },
      betterLabel: { en: "This group did better" },
      // Hazard ratios for adverse events: above the line is the harm side.
      higherIsWorse: true,
      axisMin: 0.6,
      axisMax: 2.5,
      /**
       * THE TWO DRAWN AT THE SETUP LEAD THIS ARRAY. `ForestView` colours a row
       * by its index into the array it is handed, and it is handed the
       * RESTRICTED data, so a row that moves position when the setup filters
       * would also change colour between the beats.
       */
      rows: [
        {
          id: "mi-safety",
          label: { en: "Arrived with a heart attack, counting safety events only" },
          short: { en: "Heart attack, safety" },
          estimate: 1.75,
          ciLow: 1.31,
          ciHigh: 2.34,
          k: 362,
        },
        {
          id: "multi-safety",
          label: { en: "Several lesions treated, counting safety events only" },
          short: { en: "Several lesions, safety" },
          estimate: 1.06,
          ciLow: 0.77,
          ciHigh: 1.48,
          k: 362,
        },
        {
          id: "mi-wide",
          label: { en: "Arrived with a heart attack, once repeat treatment counts too" },
          short: { en: "Heart attack, wider" },
          estimate: 1.2,
          ciLow: 0.95,
          ciHigh: 1.51,
          k: 674,
        },
        {
          id: "multi-wide",
          label: { en: "Several lesions treated, once repeat treatment counts too" },
          short: { en: "Several lesions, wider" },
          estimate: 1.41,
          ciLow: 1.13,
          ciHigh: 1.75,
          k: 674,
        },
      ],
    },
    initialView: {
      kind: "whatisknown",
      groupIds: ["mi-safety", "multi-safety"],
      caption: { en: "Counting the hard safety events only" },
    },
  },

  choices: [
    {
      // The paper names this belief itself: "a general belief that using multiple
      // outcomes to construct a definition of MACE will yield a large number of
      // incident events that, in turn, will increase statistical power".
      id: "both-sharper",
      label: {
        en: "Both get sharper. Nearly twice the events means more power, so both findings firm up",
      },
      sublabel: { en: "more events, more certainty" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "both-diluted",
      label: {
        en: "Both fade. Adding a common event to a rare one dilutes whatever was there",
      },
      sublabel: { en: "the signal gets watered down" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "they-swap",
      label: {
        en: "They trade places. The heart attack interval now crosses 1, and the several-lesions interval stops crossing it",
      },
      sublabel: { en: "the definition picked the answer" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "only-mi",
      label: {
        en: "Only the heart attack finding fades. Several lesions still predicts nothing",
      },
      sublabel: { en: "dilution hits the one real effect" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "They trade places. 1.75 falls to 1.20 and crosses 1; 1.06 rises to 1.41 and clears it.",
    },
    mechanismLabel: { en: "And the same two questions, counted the wider way" },
    mechanismName: { en: "The outcome was a choice, and the choice was the answer" },
    explanation: {
      en: "Both movements have the same cause and it is not subtle once you see it. Repeat revascularisation is common, and it is common for a particular reason: it happens when a treated vessel narrows again. Fold it into the outcome and you have added a lot of events that are mostly about lesions recurring. For the heart attack question, those added events are noise: arriving with a heart attack goes with a higher risk of death and of another infarct, and not especially with a higher risk of needing a vessel re-treated, so the extra events land on both groups alike and drag the ratio from 1.75 down to 1.20, where the interval now crosses 1. For the several-lesions question the same added events are the signal: treating several lesions is exactly what produces repeat revascularisation later, so the ratio climbs from 1.06 to 1.41 and the interval no longer crosses 1. One dataset, one year, one event log, and two findings that swap places according to which events the outcome was defined to include. Neither version is a mistake. Both are correctly computed. That is the uncomfortable part.",
    },
    body: {
      en: "The belief the first answer rests on is worth naming, because the paper names it too: that adding components buys statistical power, since more events mean a bigger numerator and a tighter interval. It does buy events. Here the count goes 362, then 674, then 868 as the definition widens. What it does not buy is a bigger effect, and the ratio is what the interval is built around, so an effect diluted faster than the count grows comes out weaker rather than stronger. That is exactly what happened to the heart attack row. It is worth being careful about what this card does and does not show. This is a prospective registry, not a randomised trial, and these are hazard ratios adjusted for age, sex, urgent presentation, smoking, diseased vessels, diabetes, heart failure, peripheral vascular disease, kidney and lung disease. Patients were not randomised to arrive with a heart attack or to have several lesions, so nothing here establishes that either causes anything. The claim that survives all of that is the only one the card makes, and it survives because both definitions were applied to the very same people: the definition moved the answer. The authors' recommendation is blunter than the finding. They argue the term MACE should not be used at all, and that safety and effectiveness should be given separate composites built from components that belong together, since mixing the two asks one number to answer two questions.",
    },
    view: {
      kind: "themissingrow",
      caption: { en: "Both definitions, on the same patients" },
    },
  },

  lesson: {
    skillName: { en: "The outcome was a choice" },
    takeaway: {
      en: "A composite outcome is not a measurement, it is a decision about what to count. Widen or narrow it and the same data can support opposite conclusions, with nothing miscalculated anywhere.",
    },
    body: {
      en: "Most reasoning traps are about reading a number wrongly. This one is about the number being one of several the same data could have produced, all of them correct. When an outcome bundles several events into one, somebody chose which events, and that choice does work that looks like evidence. The work it does is predictable once stated. A component that is common dominates a composite, because composites usually count whoever had any of the listed events, so the frequent component supplies most of the cases. If the intervention or the risk factor you are studying acts on the rare component, folding in a common one dilutes it toward nothing. If it acts on the common one, folding it in creates a finding where there was none. Neither is fraud and usually nobody has done anything sharp. The definition was picked early, often to make a trial affordable, since more events mean a smaller sample, and it then quietly determines what the trial can find. What makes this expensive in practice is that the composite keeps the name of its most serious component. A result reported as an effect on major adverse cardiac events is heard as an effect on death, because death is in the list and death is what the phrase evokes. The reader is not being careless; the label invites it. And when the effect lives entirely in the least serious component, the sentence that gets repeated afterwards is about the most serious one.",
    },
    howItWorks: {
      en: "Ask what is in it, then ask which part is doing the work. Any composite should print its components separately, and if the paper does not, that absence is itself information worth weighing. When the components are printed, look for two things. First, whether they are of similar importance to the person being treated: death and a repeat procedure are not, and a composite mixing them is answering two questions with one number. Second, whether they occur at similar rates, because the common one will dominate whatever the intended emphasis was. If a composite is heavily driven by its softest component, the honest summary names that component rather than the bundle. Two habits fall out of this and both are cheap. If a result is quoted as an effect on a named composite, find out whether the definition was set before the data were seen; a composite assembled afterwards is a different object from one specified in advance, and the same paper often contains both. And if you are comparing results across studies that use the same composite name, check that the name means the same thing in each, because the whole point of this card is that it very often does not. The word is doing less work than it appears to.",
    },
  },

  share: {
    title: { en: "The outcome was a choice, a reasoning trap." },
    explainer: {
      en: "Researchers took 6,922 stent patients, one year of follow-up, one event log, and asked two questions of it. Counting only death, heart attack and stent thrombosis, arriving with a heart attack predicted a much worse year and having several lesions treated predicted nothing. Add repeat procedures to the definition, changing no patient and no event, and the two findings trade places. Both versions are correctly computed. The composite was a decision about what to count, and the decision was the answer.",
    },
    captions: {
      competitive: { en: "Asked what was in the bundle." },
      selfDeprecating: { en: "I thought more events meant a firmer answer." },
    },
  },

  provenance: {
    source:
      "Kip KE, Hollabaugh K, Marroquin OC, Williams DO. The problem with composite end points in cardiovascular studies: the story of major adverse cardiac events and percutaneous coronary intervention. Journal of the American College of Cardiology. 2008;51(7):701-707. PMID 18279733. Read at source on ScienceDirect, where the article is an open archive under an Elsevier user license. Empirical analysis: the DEScover registry, a prospective multicentre observational study across 140 US hospitals, restricted here to the 6,922 patients who received at least one drug-eluting stent and did not present in cardiogenic shock, followed for one year. Three constructed definitions of MACE and their one-year event counts: death, MI or stent thrombosis, 362 events; death, MI, ST or target vessel revascularisation, 674 events; death, MI, ST or any repeat revascularisation, 868 events. Adjusted hazard ratios, acute MI at presentation versus not: 1.75 (95% CI 1.31 to 2.34) on the safety definition, 1.20 (0.95 to 1.51) adding target vessel revascularisation, 1.14 (0.92 to 1.40) adding any repeat revascularisation. Adjusted hazard ratios, multilesion versus single-lesion PCI: 1.06 (0.77 to 1.48) on the safety definition and 1.41 (1.13 to 1.75) adding target vessel revascularisation. Cox proportional hazards, adjusted for age, gender, urgent or emergent presentation, smoking status, number of diseased vessels, and history of diabetes, congestive heart failure, peripheral vascular disease, renal dysfunction or dialysis, or pulmonary disease.",
    year: 2008,
    doi: "10.1016/j.jacc.2007.10.034",
    url: "https://doi.org/10.1016/j.jacc.2007.10.034",
    note: {
      en: "Six things. First, and this governs how the whole card is worded: DEScover is a prospective observational registry and not a randomised trial, and the figures drawn are covariate-adjusted hazard ratios. Patients were not randomised to arrive with a heart attack or to have several lesions treated, so nothing on this card licenses a causal claim about either, and none is made. The claim the card does make, that the definition moved the answer, is immune to that limitation for a specific reason worth stating: both definitions were applied to the same patients with the same adjustment model, so whatever confounding remains is present identically in both rows and cannot be what makes them differ. Second, the funding, which this deck discloses as a matter of course. The study was supported in part by Cordis Corporation, a Johnson and Johnson company; two authors report research support from Cordis and two report serving as its consultants. That is worth knowing and it cuts against the easy reading rather than for it, since the finding is unhelpful to anyone selling stents. Third, on which comparison is drawn. The paper prints a third definition, adding any repeat revascularisation rather than target vessel revascularisation, which takes the heart attack row to 1.14 (0.92 to 1.40) and the event count to 868. It is quoted in the deep dive but not drawn, because the paper prints no corresponding figure for the several-lesions comparison under that third definition and a figure with a hole in it would invite the reader to fill it. Fourth, the event counts beside each row are cohort-wide totals for that definition, not events within the subgroup being compared, and the metric label says so. Fifth, nothing here is recomputed. The hazard ratios, intervals and counts are all as printed; this deck derives which side of the line each interval falls on and whether it clears it, which is what the shape is for. Sixth, on the choice of the acute MI and multilesion comparisons: they are the paper's own two worked examples, chosen by its authors, and this card adds no subgroup analysis of its own.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Clinical_endpoint",
};
