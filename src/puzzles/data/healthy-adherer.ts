import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #68, the healthy adherer, on the Coronary Drug Project (1980).
 *
 * HOW THIS LEAD WAS FOUND, because the method matters more than the card. The
 * backlog was empty, so the coverage record was searched instead, and its row
 * for healthy worker and healthy user read "partly inside indication". Opening
 * the card settled it in a line: `confounding-by-indication` is the DIG trial,
 * where the SICKER patients were the ones already prescribed digoxin. Healthy
 * user and healthy adherer run the other way. A grep across every puzzle and
 * the whole Trap Hunt bank found none of the three named anywhere. That is the
 * fifth coverage claim to fail on being opened rather than read.
 *
 * READ AT SOURCE from the paper Basile supplied through institutional access.
 * Table 1, five-year mortality by cumulative adherence to protocol prescription:
 *
 *                      CLOFIBRATE            PLACEBO
 *   adherence      n    % mortality      n    % mortality
 *   < 80%        357    24.6 +/- 2.3   882    28.2 +/- 1.5
 *   >= 80%       708    15.0 +/- 1.3  1813    15.1 +/- 0.8
 *   total       1065    18.2 +/- 1.2  2695    19.4 +/- 0.8
 *
 * WHY THE COUNTS ARE NOT AUTHORED, which is the reason the `published` shape
 * exists at all. This deck's first rule is that numbers are authored as raw
 * counts and rates derived. Table 1 prints denominators and percentages and no
 * deaths. Three of the four cells can be DECODED the way `hawthorne-effect`
 * decodes its two, since exactly one integer reproduces the printed figure:
 * 88/357, 106/708, 249/882. The fourth cannot. Both 273/1813 and 274/1813 print
 * as 15.1 per cent, and the placebo arm total cannot break the tie because 522,
 * 523 and 524 deaths all print as 19.4. That undecodable cell is the placebo
 * good adherers, which is the punchline of the card, so it may not rest on a
 * guess. The percentages are therefore the primary data and the figure says so
 * on its face.
 *
 * What DOES check out, and is asserted in the test file: the subgroup
 * denominators sum to the printed totals exactly, and weighting the subgroup
 * percentages by those denominators reproduces both printed arm totals, 18.22
 * against a printed 18.2 and 19.39 against a printed 19.4.
 *
 * THE ADJUSTED COLUMN IS LOAD-BEARING and is why this beats the usual retelling.
 * Poor adherers really were sicker at baseline, and Table 2 shows it. The
 * authors adjusted for 40 baseline characteristics and the placebo gap moved
 * only from 28.2 against 15.1 to 25.8 against 16.4, still p = 7.3e-9. They
 * write that adjustment "accounts for only a small portion of the observed
 * difference". A card that omitted this would be open to the obvious objection
 * it has already answered.
 *
 * ADJACENCY, checked against the card rather than assumed. `intention-to-treat`
 * (STICH) is the nearest and is a different mechanism: there the per-protocol
 * set EXCLUDES patients non-randomly, and dying is part of what caused the
 * exclusion. Here nobody is excluded; the comparison is within one arm, and the
 * placebo column is what proves the adherence groups differ as people. The two
 * pair as cause and remedy, and the lesson says so rather than pretending they
 * are unrelated.
 */
export const healthyAdherer: Puzzle = {
  schemaVersion: 1,
  id: "healthy-adherer-cdp-1980",
  slug: "took-their-tablets",
  category: "statistical-reasoning",
  reasoningSkill: "healthy-adherer",
  difficulty: "hard",
  tags: ["clinical", "research", "statistics"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Heart patients who took their tablets reliably were far less likely to be dead in five years. Does taking your medicine keep you alive?",
    },
    framing: {
      en: "The Coronary Drug Project was a randomised, double-blind trial running from 1966, testing whether lipid-lowering drugs helped men who had already had a heart attack. One of the drugs was clofibrate, and 1,065 of the men given it were followed for five years with a record of how reliably they swallowed their capsules. The trial counted anyone who took at least 80 per cent of the prescribed dose as a good adherer. Among those good adherers, 15.0 per cent were dead within five years. Among the men who took less than 80 per cent, 24.6 per cent were dead. Nobody, patient or doctor, knew who was on what, and the adherence figure came from counting returned capsules at four-monthly visits rather than from asking.",
    },
    question: {
      en: "What is the safest reading of the gap between reliable and unreliable takers?",
    },
    data: {
      type: "published",
      label: { en: "Five-year mortality by how reliably the capsules were taken" },
      metricLabel: {
        en: "Each row is an adherence group, followed for five years. Percentages are of the men in that group.",
      },
      perLabel: { en: "Per cent dead within five years" },
      rateNote: {
        en: "Rates exactly as published. The paper's table prints denominators and percentages and no death counts, so no count is shown here.",
      },
      adjustedLabel: {
        en: "The hollow diamond is the same figure after the authors adjusted for 40 baseline characteristics.",
      },
      dispersionLabel: { en: "The whisker is one standard error, as printed." },
      axisMax: 35,
      arms: [
        {
          id: "clofibrate",
          label: { en: "Men given clofibrate" },
          short: { en: "Given clofibrate" },
        },
        {
          id: "placebo",
          label: { en: "Men given a placebo" },
          short: { en: "Given a placebo" },
        },
      ],
      /**
       * Poor adherers lead this array because the shape's gradient check reads
       * the first two rows, and the gradient has to run from worse to better.
       */
      rows: [
        {
          id: "poor",
          label: { en: "Took less than 80 per cent of their capsules" },
          short: { en: "Took less than 80 per cent" },
        },
        {
          id: "good",
          label: { en: "Took 80 per cent or more of their capsules" },
          short: { en: "Took 80 per cent or more" },
        },
      ],
      observations: [
        { rowId: "poor", armId: "clofibrate", rate: 24.6, se: 2.3, n: 357, adjusted: 22.5 },
        { rowId: "poor", armId: "placebo", rate: 28.2, se: 1.5, n: 882, adjusted: 25.8 },
        { rowId: "good", armId: "clofibrate", rate: 15.0, se: 1.3, n: 708, adjusted: 15.7 },
        { rowId: "good", armId: "placebo", rate: 15.1, se: 0.8, n: 1813, adjusted: 16.4 },
      ],
    },
    initialView: {
      kind: "onearm",
      strataIds: ["clofibrate"],
      caption: { en: "The arm that got the drug" },
    },
  },

  choices: [
    {
      /**
       * The intuitive trap, and the one that gets acted on in practice: it is
       * the reasoning behind a great deal of adherence-improvement policy.
       */
      id: "drug-works",
      label: {
        en: "The drug works",
      },
      sublabel: { en: "take your medicine" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "sicker-men",
      label: {
        en: "They were sicker, and adjusting fixes it",
      },
      sublabel: { en: "confounding, and fixable" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "too-small",
      label: {
        en: "Nothing, too few men to compare",
      },
      sublabel: { en: "not enough people" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "not-randomised",
      label: {
        en: "Real, but not about the drug",
      },
      sublabel: { en: "the split was not assigned" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "The same trial gave 2,695 men a placebo and counted their capsules too. Good adherers to a capsule with nothing in it: 15.1 per cent dead. Poor adherers: 28.2.",
    },
    mechanismLabel: { en: "And the arm that got nothing" },
    mechanismName: { en: "The tablets were never the point" },
    explanation: {
      en: "There was nothing in the placebo capsules. No drug, no dose, nothing to adhere to in any pharmacological sense, and the gap is there anyway, wider than in the clofibrate arm: 15.1 per cent against 28.2, where the drug arm gave 15.0 against 24.6. Whatever separates a man who takes 80 per cent of his capsules from one who does not, it is doing about ten to thirteen points of five-year mortality, and it is doing it just as well when the capsules are empty. Now look at what the drug itself did, which is the other half of the joke. Clofibrate against placebo, as randomised, over the whole trial: 20.0 per cent dead against 20.9, p = 0.55. Nothing. The comparison the trial was designed to make found no effect, and the comparison it was not designed to make found a large one, which is exactly the wrong way round if you believe the second one. The second answer deserves its own paragraph, because it is the intelligent objection and the authors had already met it. Poor adherers were sicker at baseline, and the paper's Table 2 shows it: more of them had ST-segment depression, more were on diuretics, more were in a worse functional class. So the researchers adjusted for 40 baseline characteristics, and the placebo gap barely moved, from 28.2 against 15.1 to 25.8 against 16.4, still at p = 7.3 x 10 to the minus 9. Their own words are that adjustment 'accounts for only a small portion of the observed difference'. Whatever it is that adherence marks, forty measured variables do not capture it.",
    },
    body: {
      en: "What is adherence a marker of, if not the drug? The honest answer is that nobody in 1980 could say, and the paper does not pretend to. It lists the candidates it could not measure: alcohol use, behaviour, social circumstances. The modern name for the pattern is the healthy adherer effect, and it turns up wherever adherence is compared with anything: people who take their tablets as prescribed also tend to keep appointments, follow advice, and be the sort of person whose life is arranged such that a daily capsule is easy to remember. None of that is measured by a trial and all of it predicts dying. Three things to keep straight about what this does and does not show. It does not show that adherence is irrelevant to a drug that works, which would be absurd; a drug you do not take cannot help you. It shows that you cannot measure how much it helps by comparing takers with non-takers, because that comparison is contaminated by whatever makes someone a taker. It does not show clofibrate was useless in every sense either, though as it happens later follow-up did not treat that drug kindly. And the sample is men who had already survived a heart attack, in the 1960s and 1970s, which is a particular group in a particular era. What generalises is not the size of the gap but the structure of the mistake."
    },
    view: {
      kind: "botharms",
      caption: { en: "And the arm that got nothing" },
    },
  },

  lesson: {
    skillName: { en: "The group that chose itself" },
    takeaway: {
      en: "Randomisation only protects the comparison it made. Split a trial by something the patients did afterwards, like whether they took their tablets, and you are comparing groups nobody assigned, so the difference between them belongs to the kind of person in each.",
    },
    body: {
      en: "A randomised trial buys you exactly one thing: two groups that differ, on average, in nothing except what you assigned. It is a remarkable thing to be able to buy, and it is spent the moment you regroup people by something that happened after the envelope was opened. Adherence is the classic case because it looks so innocent. It seems like a property of the treatment, a dose actually received, when it is mostly a property of the person. But the same hole opens under any post-randomisation split: patients whose cholesterol fell, patients who completed the course, patients who came to every appointment, patients who tolerated the drug. In every case the group was assembled by the patients themselves, and whatever sorted them is free to be the thing that also sorts their outcomes. This is why the intention-to-treat rule exists, and the two ideas sit either side of the same coin. The deck's `intention-to-treat` card shows the remedy in action, where analysing by assignment and analysing by what patients actually got reach opposite verdicts on the same trial. This card shows the disease: why the second analysis cannot be trusted even when it looks more sensible, more clinically relevant, and closer to the question you actually care about. The healthy adherer also has cousins worth knowing by name. The healthy user effect is the same thing at the point of prescription rather than the point of swallowing: people who accept a preventive treatment are more health-conscious in ways the treatment has nothing to do with, which is a large part of why hormone replacement therapy looked protective in observational data and did not in a trial. The healthy worker effect is the same again at the point of employment: people in work are healthier than the general population, so an occupational cohort compared against everybody looks as though the job protects them.",
    },
    howItWorks: {
      en: "The question to ask of any subgroup is simple and it is not about statistics: who put these people in this group? If the answer is a random number generator, the comparison is protected. If the answer is the patients themselves, their doctors, or anything that happened after allocation, it is not, and no amount of adjustment reliably fixes it. That last clause is the part people resist, so it is worth saying why. Adjustment can only correct for what was measured, and the Coronary Drug Project measured a great deal, adjusting for 40 baseline characteristics and moving the gap barely at all. If forty variables in a well-funded trial do not close it, a handful of covariates in a database study will not either. So when you meet a claim built on adherence, look for three things. Is there a placebo arm, and did anyone look at adherence within it? That is the single most informative check available, and it is why this trial is famous. Is the comparison being made as randomised, or by what people did? And if a paper adjusts for baseline differences and reports that the effect survived, ask whether it also reports how much adjustment moved things, because an effect that barely moves under heavy adjustment is usually being driven by something nobody measured rather than being robust. Outside medicine the same shape is everywhere. Employees who complete the optional training are promoted more often. Customers who join the loyalty scheme spend more. Students who use the study app get better grades. In each case someone will propose expanding the programme, and in each case the people who opted in were already the ones heading that way.",
    },
  },

  share: {
    title: { en: "The group that chose itself, a reasoning trap." },
    explainer: {
      en: "In the Coronary Drug Project, men who took at least 80 per cent of their clofibrate capsules had 15.0 per cent five-year mortality, against 24.6 per cent for those who took less. Then look at the placebo arm, where the capsules contained nothing: good adherers 15.1 per cent, poor adherers 28.2. The drug itself did nothing at all, 20.0 against 20.9, p = 0.55. And adjusting for 40 baseline characteristics barely touched the placebo gap. Nobody randomised who would swallow their capsules, so that comparison was never a comparison of treatments.",
    },
    captions: {
      competitive: { en: "Asked who put these men in this group." },
      selfDeprecating: { en: "I thought taking your medicine was the medicine." },
    },
  },

  provenance: {
    source:
      "The Coronary Drug Project Research Group. Influence of adherence to treatment and response of cholesterol on mortality in the Coronary Drug Project. New England Journal of Medicine. 1980;303(18):1038-1041. PMID 6999345, DOI 10.1056/NEJM198010303031804. Read at source. Design: randomised, double-blind, placebo-controlled multicentre trial in men aged 30 to 64 with electrocardiographic evidence of a previous myocardial infarction at least three months earlier; 8,341 patients entered from March 1966 to October 1969 across 53 clinical centres, approximately 1,100 randomised to each of five drug groups and 2,789 to placebo; follow-up every four months for a minimum of five and a maximum of 8.5 years, concluded summer 1974. Adherence was estimated at each four-monthly visit by counting returned capsules, expressed as the percentage of the protocol dosage of nine capsules per day actually taken, and cumulated over the first five years of follow-up or until death. Table 1, five-year mortality by cumulative adherence: clofibrate, under 80 per cent adherence 357 patients 24.6 per cent (22.5 adjusted), 80 per cent or more 708 patients 15.0 per cent (15.7 adjusted), total 1,065 patients 18.2 per cent; placebo, under 80 per cent 882 patients 28.2 per cent (25.8 adjusted), 80 per cent or more 1,813 patients 15.1 per cent (16.4 adjusted), total 2,695 patients 19.4 per cent. All percentages are given plus or minus one standard error. The clofibrate adherence difference gives z = -3.86, P = 0.00011; the placebo difference gives z = -8.12, P = 4.7 x 10^-16; the placebo difference after adjustment for 40 baseline characteristics gives z = -5.78, P = 7.3 x 10^-9. Five-year total mortality over the full randomised groups was 20.0 per cent in 1,103 clofibrate patients against 20.9 per cent in 2,789 placebo patients, P = 0.55.",
    year: 1980,
    doi: "10.1056/NEJM198010303031804",
    url: "https://pubmed.ncbi.nlm.nih.gov/6999345/",
    note: {
      en: "Five things. First, and it is the reason this card needed a new shape, Table 1 prints denominators and percentages and no death counts, so no count is authored anywhere. Three of the four cells could have been DECODED, since exactly one integer numerator reproduces the printed percentage: 88/357, 106/708 and 249/882. The fourth could not. Both 273/1813 and 274/1813 print as 15.1 per cent, and the placebo arm total cannot break the tie because 522, 523 and 524 deaths all print as 19.4. Since the undecodable cell is the placebo good adherers, which is the whole point of the card, nothing here rests on a decoded count and the figure states on its face that the rates are as published. Second, what does reconcile, and is asserted in this puzzle's test file: 357 plus 708 is the printed total of 1,065 and 882 plus 1,813 is the printed 2,695, and weighting each arm's subgroup percentages by those denominators reproduces both printed totals, 18.22 against a printed 18.2 and 19.39 against a printed 19.4. Third, a provenance trap for anyone quoting both sets of numbers. Table 1's totals of 1,065 and 2,695 are smaller than the randomised 1,103 and 2,789, because patients who died or left the study before any follow-up determination of adherence or serum cholesterol were excluded from these analyses; that is 38 and 94 men. The card quotes the randomised figures only for the drug-versus-placebo comparison and the Table 1 figures only within it, and never mixes them. Fourth, on the adjusted column, which is drawn because leaving it out would invite an objection the paper has already answered. Poor adherers genuinely were sicker: the paper's Table 2 lists 20 baseline characteristics more prevalent among them. Adjustment for 40 such characteristics moved the placebo gap from 28.2 against 15.1 to 25.8 against 16.4, and the authors write that this 'accounts for only a small portion of the observed difference'. Fifth, on scope. These were men who had already survived a myocardial infarction, recruited in the late 1960s in the United States, and clofibrate is not a drug in current use. The card claims the structure of the error and not the size of the gap, and the reveal says so. Note also that the paper's own conclusion is this lesson rather than a claim about adherence: that subgroups defined by patient responses after randomisation cannot serve as valid comparison groups, because the factors predicting who will adhere are 'not yet well identified, and those that are known are quite different in the two groups'.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Healthy_user_bias",
};
