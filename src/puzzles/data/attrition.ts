import type { Puzzle } from "../schema";

/**
 * Puzzle #65, attrition bias, on the Zambian ART tracing survey.
 *
 * A NEW SHAPE, `unseen`, argued at length in schema.ts. The short version: the
 * published figures here are probability-weighted survival estimates and the
 * paper prints no death count for the traced group, so every count-based shape
 * is out. `frequencies` is the painful near miss, because its natural-frequency
 * tree is exactly this structure, and using it would mean turning a weighted
 * estimate back into a numerator that was never published. `yield` refuses this
 * correctly: it requires one row whose intervals overlap, and here the two
 * estimates must separate, because its lesson is "found more, changed nothing"
 * and this one is "the number was wrong".
 *
 * WHY A PROGRAMME AND NOT A TRIAL, which is also why this is not the third card
 * about dropout. `intention-to-treat` (STICH) is about excluding patients whose
 * outcomes are KNOWN, and the per-protocol lead was withdrawn from the backlog
 * for being that same card twice. Attrition proper is about outcomes NEVER
 * OBSERVED, and a treatment programme is where that bites: the missing are
 * numerous, the reason they are missing is correlated with the outcome, and
 * here somebody actually went out and found them.
 *
 * THE MECHANISM IS A FILING RULE, and that is what makes it teachable. A patient
 * who stops attending is recorded as "lost to follow-up", not as dead, because
 * the clinic does not know they died. Every death that happens away from the
 * clinic is therefore invisible to the routine statistics, and the programme
 * reports a mortality figure computed over exactly the people whose outcome it
 * could see. Nobody falsified anything.
 *
 * THE COMMIT BEAT ASKS ABOUT SIZE AND THE FRAMING SAYS SO, the way
 * `statistical-power` does. Without that the bands would share the direction the
 * setup licenses: anyone who thinks about who stops attending an HIV clinic will
 * guess the missing did worse, and three of the four bands agree with them on
 * direction. So the framing states outright that the question is how much the
 * estimate moved, and the bands are four separated magnitudes: barely, by half
 * again, nearly fourfold, and a fall. That last one is not filler, it is the
 * band a player picks who reasons that the missing are mostly transfers to other
 * clinics, which is the real competing explanation and the one the tracing
 * exercise existed to settle.
 *
 * WHAT THE CARD MUST NOT DO. It must not present the correction as arithmetic on
 * the counts. 17 per cent of the cohort missing at a 17 per cent death rate is
 * 2.9 points, and the published correction is 5.1 points, because the estimate is
 * weighted survival over person-time and not a product of two proportions. The
 * derivation module exports no such product and its test says why. It must not
 * hide that a quarter of those traced were never found, since the correction
 * rests on incomplete tracing and the authors say so. And it must not read as an
 * indictment of the programme: these are the programme's own investigators
 * publishing an unflattering number about their own work, which is the reason
 * the number exists at all.
 */
export const attrition: Puzzle = {
  schemaVersion: 1,
  id: "attrition-zambia-tracing",
  slug: "filed-as-lost",
  category: "statistical-reasoning",
  reasoningSkill: "attrition-bias",
  difficulty: "hard",
  tags: ["clinical", "epidemiology", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "The records say 2 percent of these patients died. They also say 17 percent simply stopped coming.",
    },
    framing: {
      en: "This is the routine monitoring data of an HIV treatment programme in four provinces of Zambia: 165,464 adults on antiretroviral therapy, followed through the clinics that treat them. Two years after starting treatment, the programme's own books put mortality at 1.9 percent. That is the figure that goes into reports. But look at the other number. A clinic knows what happened to a patient who comes back. It does not know what happened to one who does not, and when someone stops attending, the file records that fact and nothing more: lost to follow-up. Not dead, because the clinic has no way of knowing that. 28,111 patients, 17 percent of the whole cohort, sit in that category. So researchers took a random sample of 2,892 of them and went looking, by phone, by motorbike, through neighbours and family, until they could say what had actually happened. The question is not whether the missing did worse than the patients still turning up. Almost anyone would guess they did. The question is how much that changes the programme's headline number.",
    },
    question: {
      en: "Tracing resolved the fate of 2,163 of those who had vanished. What did folding them back in do to the two-year mortality estimate of 1.9 percent?",
    },
    data: {
      type: "unseen",
      label: { en: "An HIV treatment programme, and the patients it lost sight of" },
      metricLabel: {
        en: "Two-year cumulative mortality after starting treatment, as the programme reports it.",
      },
      perLabel: {
        en: "Per cent of patients dead within two years of starting antiretroviral therapy.",
      },
      rateNote: {
        en: "Counts as printed. The two estimates are published probability-weighted figures with their 95 percent intervals, not proportions of the traced sample.",
      },
      axisMax: 10,
      cohort: 165464,
      cohortLabel: { en: "Adults on treatment, four provinces" },
      unobserved: 28111,
      unobservedLabel: { en: "Filed only as lost to follow-up" },
      traced: 2892,
      tracedLabel: { en: "Randomly sampled and chased" },
      resolved: 2163,
      resolvedLabel: { en: "Fate established" },
      reported: {
        label: { en: "As the programme's records have it" },
        short: { en: "From the records" },
        value: 1.9,
        ciLow: 1.7,
        ciHigh: 2.0,
      },
      corrected: {
        label: { en: "After the missing were found" },
        short: { en: "After looking" },
        value: 7.0,
        ciLow: 5.7,
        ciHigh: 8.4,
      },
      foundAmongUnobserved: {
        label: { en: "Of those filed as lost, the share found to have died" },
        value: 17,
        ciLow: 15,
        ciHigh: 19,
      },
    },
    initialView: {
      kind: "asrecorded",
      caption: { en: "What the clinics could see" },
    },
  },

  choices: [
    {
      id: "barely",
      label: {
        en: "Barely moved it. The missing are a minority, and most of them transferred to another clinic or moved away",
      },
      sublabel: { en: "lost does not mean dead" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "half-again",
      label: {
        en: "Raised it by about half, to roughly 3 percent",
      },
      sublabel: { en: "somewhat worse than reported" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "fourfold",
      label: {
        en: "Nearly quadrupled it, from 1.9 percent to 7.0 percent",
      },
      sublabel: { en: "most of the deaths were never counted" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      id: "fell",
      label: {
        en: "Lowered it. The people who stop attending are the ones who feel well enough not to bother",
      },
      sublabel: { en: "the missing were the healthy ones" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "1.9 percent becomes 7.0 percent. Of the patients filed as lost, 17 percent had died.",
    },
    mechanismLabel: { en: "And what the tracing found in the gap" },
    mechanismName: { en: "The dead were filed under lost" },
    explanation: {
      en: "Nothing was falsified and nothing was miscalculated. The programme's 1.9 percent is a correct statement about the patients whose outcome its clinics could observe, and that is precisely the problem, because dying is one of the main reasons a patient stops turning up. So the event the programme wants to count is also the event that removes people from the group it can count. Tracing a random sample of the 28,111 who had vanished found that 17 percent of them were dead, against the roughly 2 percent the records showed for everyone else, and folding that back in takes the two-year estimate to 7.0 percent, with an interval of 5.7 to 8.4 that sits nowhere near the original 1.7 to 2.0. Note what the correction is not. It is not 17 percent of 17 percent: that product is 2.9 points and the real correction is 5.1, because the published figure is weighted survival over person-time rather than two proportions multiplied together. The size of the missing group is what makes the correction credible, not what computes it.",
    },
    body: {
      en: "Three things belong on the record, and the first is the biggest limitation. Of the 2,892 patients sampled for tracing, 2,163 were resolved and about a quarter were never found, so the correction itself rests on incomplete tracing. The authors say so plainly, and they also report that those they failed to find looked no different from those they found on the sociodemographic and clinical characteristics they could compare, which is reassuring without being proof. Second, causes of death were not adjudicated, so this is all-cause mortality and not deaths from HIV, though the investigators note that over 95 percent of the deaths ascertained were attributed to illness rather than to accidents or childbirth. Third, and this is worth sitting with: the people who published this number are the people running the programme. The correction is unflattering to their own work, which is the reason it exists at all, and it is why the routine figure is the one that would otherwise have stood. There is also a detail worth knowing about where the error is worst. The ratio of corrected to routine mortality was highest in Lusaka Province, the urban capital, at eight to nine times, and lower in the more rural provinces at three to five times, which is the opposite of what an intuition about remote and hard-to-reach populations would suggest. The authors' reading is that dense, mobile urban populations have weaker community links back to the clinic, so a death is less likely to be passively reported. Where people are easiest to reach, the records were furthest out.",
    },
    view: {
      kind: "afterlooking",
      caption: { en: "The same programme, once the missing were counted" },
    },
  },

  lesson: {
    skillName: { en: "The dead were filed under lost" },
    takeaway: {
      en: "A statistic computed only on the people you can still see is not a statistic about everyone. When the reason someone disappears is related to the outcome you are measuring, the ones who left take the answer with them.",
    },
    body: {
      en: "Attrition bias is what happens when the people who drop out of a study or a programme differ from the people who stay, in a way that matters for what is being measured. Its danger is that the resulting number looks complete. Nothing about 1.9 percent announces that it was computed over a group with a hole in it, and no amount of care with the arithmetic would have revealed the problem, because the arithmetic was right. The missing data is not noise to be averaged away; it is systematically the data you most needed. It helps to see why the bias is so often in one direction. People leave a study for reasons, and those reasons are rarely independent of the outcome. In a treatment programme, the sickest stop coming because they are too ill, or because they have died. In a weight-loss trial, the people for whom it is not working stop turning up to be weighed. In a survey of a training scheme, the graduates who never found work are the hardest to reach for the follow-up questionnaire. In every case the outcome itself is doing the removing, so what remains is a group selected for having done well, and the measurement flatters. This is the same family as survivorship bias, and the distinction is worth holding. Survivorship bias is usually about a sample assembled from things that lasted, where the ones that did not are simply absent and were never enrolled. Attrition is about a sample that was assembled properly and then leaked, which means you know exactly how many are missing, and often who they were. That is a much better position to be in, and it is the position that makes a fix possible: you can go and look for them, which is exactly what the Zambian investigators did.",
    },
    howItWorks: {
      en: "Ask two questions of any follow-up figure: how many were lost, and is there a reason to think they differ. The first should be printed, and if it is not, that absence is the finding. A CONSORT diagram exists to make this visible in trials, and a well-reported cohort study gives the same numbers. The rough convention is that losing under 5 percent is unlikely to change much and losing over 20 percent should make you distrust the result on its own, but the thresholds matter far less than the direction: a small loss that is heavily concentrated in one arm is worse than a large loss spread evenly, because only the first can move a comparison. The second question is the one that decides it, and it is a question about mechanism rather than about numbers. What would make somebody drop out here, and would that same thing affect the outcome? If the answer is yes, the reported figure is biased and you can usually say which way before seeing any data. If people leave because they got better, the study will look worse than the truth; if they leave because they got worse or died, it will look better, which is the commoner and more dangerous case. When you are the one doing the measuring, the useful habit is to treat the missing as a group to be investigated rather than a row to be dropped. The strongest version is what was done here: take a random sample of the lost, chase them properly, and use what you find to correct the whole. That is expensive, and it is why it is rare, and it is also why the answer was out by a factor of nearly four for as long as nobody did it. Failing that, the honest minimum is a sensitivity analysis that asks what the result would be under pessimistic assumptions about the missing, and a conclusion that survives it.",
    },
  },

  share: {
    title: { en: "The dead were filed under lost, a reasoning trap." },
    explainer: {
      en: "An HIV programme in Zambia followed 165,464 adults on treatment. Its records put two-year mortality at 1.9 percent. They also showed that 17 percent of patients had simply stopped coming, filed as lost to follow-up, because a clinic cannot know what happened to someone who does not return. Researchers traced a random sample of them. Of those filed as lost, 17 percent had died. The real figure was 7.0 percent, nearly four times the reported one. Nobody falsified anything: dying is just one of the main reasons a patient stops turning up, so the event being counted was also the event that removed people from the count.",
    },
    captions: {
      competitive: { en: "Asked what happened to the ones who stopped coming." },
      selfDeprecating: { en: "I assumed the missing patients had just moved away." },
    },
  },

  provenance: {
    source:
      "Holmes CB, Sikazwe I, Sikombe K, Eshun-Wilson I, Czaicki N, Beres LK, Mwamba C, Bolton-Moore C, Padian N, Geng E. Estimated mortality on HIV treatment among active patients and patients lost to follow-up in 4 provinces of Zambia: Findings from a multistage sampling-based survey. PLoS Medicine. 2018;15(1):e1002489. PMCID PMC5766235, open access, read at source as full-text XML through the Europe PMC REST endpoint. Design: a multistage, probability-proportional-to-size sample of government ART facilities in Lusaka, Southern, Eastern and Western Provinces, supported by the Centre for Infectious Disease Research in Zambia; all adults on ART with a clinical encounter in the 24 months to 31 July 2015 were enumerated; loss to follow-up was defined as more than 90 days late for a scheduled visit at the time of sampling; a simple random sample of those lost was traced in the community by peer health workers, with a minimum of three attempts, and outcomes were incorporated through probability weights. Counts, Table 1, all ART users: 165,464 patients, 28,111 lost to follow-up, 2,892 sampled for tracing, 2,163 with vital status ascertained. Among patients lost to follow-up, 17 percent (95 percent CI 15 to 19) had died. Two-year cumulative incidence of mortality, Kaplan-Meier with left truncation for patients already on ART at the start of the observation period: naive estimate 1.9 percent (95 percent CI 1.7 to 2.0), sample-revised estimate 7.0 percent (95 percent CI 5.7 to 8.4). New ART users, 49,129 patients: 2.1 percent (1.8 to 2.4) revised to 8.3 percent (6.1 to 10.7), with 21 percent (17 to 25) of the lost found to have died.",
    year: 2018,
    doi: "10.1371/journal.pmed.1002489",
    url: "https://doi.org/10.1371/journal.pmed.1002489",
    note: {
      en: "Six things. First, on what is counted and what is estimated, because this figure mixes the two and the distinction governs the card. The cohort, the number lost, the number traced and the number resolved are printed counts, and every share drawn from them is derived here: 28,111 of 165,464 is 17.0 per cent, 2,892 of 28,111 is 10.3 per cent, 2,163 of 2,892 is 74.8 per cent, each matching the figure the Results section states in prose. The mortality estimates and the 17 per cent are probability-weighted and are transcribed exactly as published; this deck derives only the size and direction of the correction and whether the intervals clear one another. Second, and it is the trap this card is most likely to invite: the correction is NOT the product of the two shares. Seventeen per cent of the cohort missing at a 17 per cent death rate would be 2.9 points, and the published correction is 5.1 points, because the revised figure is weighted survival over person-time rather than two proportions multiplied. The derivation module exports no such product and its test asserts the two do not agree, so nobody adds one later. Third, the largest limitation, stated by the authors: vital status could not be ascertained for about a quarter of those sampled for tracing, 729 of 2,892, so the correction rests on incomplete tracing. They report no difference in sociodemographic or clinical characteristics between those found and those not found, which supports the estimate without establishing it. Fourth, causes of death were not adjudicated, so this is all-cause mortality; the authors note that over 95 per cent of ascertained deaths were attributed to illness rather than to competing causes such as accidents or childbirth. Faith-based and other non-Ministry of Health sites were outside the sample. Fifth, an internal inconsistency worth recording rather than hiding: the Methods describe selecting a total of 32 facilities by probability proportional to size, while the abstract and the Results describe a network of 64 facilities. The card prints no facility count, and nothing it draws depends on which is right. Sixth, on the direction of the error across provinces, since it is counterintuitive and the card reports it: the ratio of revised to naive mortality was highest in urban Lusaka Province, at eight-fold for all ART users and nine-fold for new starters, against three to five-fold elsewhere. The authors read this as denser, more mobile urban populations having weaker passive reporting of deaths back to the clinic, and say further investigation is needed; the card presents it as their interpretation rather than as established.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Attrition_bias",
};
