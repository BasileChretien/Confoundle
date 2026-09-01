import type { Puzzle } from "../schema.ts";

/**
 * Puzzle #33, allocation concealment, on the PHANTASi trial (Alam et al. 2018).
 * This closes gap 2 of plan-syllabus-gaps.md, which is rang A in France and
 * completes the blinding family whose other half already shipped.
 *
 * The plan warned that this was the sourcing risk: Schulz's meta-epidemiology
 * gives odds ratios rather than head counts, and the one clean historical case
 * study of subverted concealment (Kennedy et al., Trials 2017) reports medians
 * and interquartile ranges, which this deck cannot author from. PHANTASi solves
 * it, because the subversion shows up in the arm sizes themselves.
 *
 * From the paper: 2698 enrolled, 2672 in the intention-to-treat analysis, 1535
 * in the intervention arm and 1137 in usual care, randomised 1:1 in blocks of
 * four. At 28 days, 120 of 1535 and 93 of 1137 had died, relative risk 0.95.
 *
 * RECONCILED FIVE WAYS, all asserted in the test file:
 *   1535 + 1137 = 2672, the stated ITT total.
 *   1535 / 2672 = 57.4 per cent, matching the 57 per cent reported elsewhere.
 *   120 / 1535 = 7.8 per cent, which rounds to the printed 8.
 *   93 / 1137 = 8.2 per cent, which also rounds to the printed 8.
 *   (120/1535) / (93/1137) = 0.956, matching the printed relative risk of 0.95.
 *
 * WHY IT IS IMPOSSIBLE BY CHANCE. A fair 1:1 split of 2672 has an expectation of
 * 1336 per arm and a standard deviation of about 25.9. The observed 1535 is 199
 * above expectation, which is 7.7 standard deviations. And that figure is a
 * CONSERVATIVE bound, because block randomisation in blocks of four constrains
 * imbalance far more tightly than a free coin toss would. The puzzle says at
 * least seven standard deviations rather than quoting a p value, because the
 * exact tail probability under blocking is not something the paper computes.
 *
 * NO NEW SHAPE. `rates` with two strata and `strataAreSeparateSamples` set,
 * because how the patients were split and what happened to them are two
 * different countings of the same trial and pooling them would be meaningless.
 *
 * SETUP SHOWS THE ALLOCATION, NOT THE OUTCOME, and this ordering is forced. The
 * mortality stratum carries 1535 and 1137 as its denominators, so showing it
 * first would print the arm sizes and give the answer away. A test asserts the
 * setup shows the allocation stratum alone.
 *
 * WHAT THIS MUST NOT BECOME. Not an accusation. The crews were not cheating for
 * gain; they believed antibiotics helped and were trying to help patients, which
 * is precisely why concealment exists. The investigators found the problem,
 * reported it in the paper, and retrained the crews. And the trial's conclusion
 * may well be right. The claim here is narrower and harder to argue with: an
 * allocation that cannot have come from chance was not random, whatever the
 * methods section calls it.
 */
export const allocationConcealment: Puzzle = {
  schemaVersion: 1,
  id: "allocation-concealment-2018",
  slug: "randomised-in-name-only",
  category: "statistical-reasoning",
  reasoningSkill: "allocation-concealment",
  difficulty: "medium",
  tags: ["clinical", "research"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "A large trial, randomised one to one. Here is where its 2,672 patients ended up.",
    },
    framing: {
      en: "Ambulance crews across the Netherlands took part in a trial of giving antibiotics to patients with suspected sepsis on the way to hospital, rather than waiting until they arrived. The protocol randomised patients one to one, using blocks of four, which is a method designed to keep the two arms almost exactly level as recruitment goes along. The trial could not be blinded, since a crew giving an injection knows they are giving it, and the allocation reached them as sealed envelopes to be opened in the field. In the end 2,672 patients were analysed.",
    },
    question: {
      en: "The split you are looking at came from a one to one randomisation. Could chance have produced it?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Share" },
      higherIsBetter: true,
      // Two different countings of the same trial: how the patients were split,
      // and what happened to them. Pooling them would be meaningless.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "antibiotics",
          label: { en: "Antibiotics in the ambulance" },
          short: { en: "Antibiotics" },
        },
        {
          id: "usual-care",
          label: { en: "Usual care" },
          short: { en: "Usual care" },
        },
      ],
      strata: [
        { id: "allocation", label: { en: "Share of the 2,672 patients analysed" } },
        { id: "deaths", label: { en: "Died within 28 days" } },
      ],
      observations: [
        { groupId: "antibiotics", stratumId: "allocation", numerator: 1535, denominator: 2672 },
        { groupId: "usual-care", stratumId: "allocation", numerator: 1137, denominator: 2672 },
        { groupId: "antibiotics", stratumId: "deaths", numerator: 120, denominator: 1535 },
        { groupId: "usual-care", stratumId: "deaths", numerator: 93, denominator: 1137 },
      ],
    },
    initialView: {
      kind: "stratified",
      // The allocation alone. The mortality stratum carries the arm sizes as its
      // denominators, so showing it first would hand over the answer.
      strataIds: ["allocation"],
      caption: { en: "Where the patients went" },
    },
  },

  choices: [
    {
      id: "ordinary",
      label: { en: "Easily. Randomisation wobbles" },
      sublabel: { en: "you never get exactly half and half" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "unusual",
      label: { en: "Unlikely, but possible in a trial this size" },
      sublabel: { en: "big numbers leave room for a big gap" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "impossible",
      label: { en: "No. Something other than chance decided this" },
      sublabel: { en: "blocks of four are meant to prevent exactly this" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Wrong here: the framing gives the allocation ratio, the block
      // size, and the fact that envelopes were opened in the field.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "1,535 against 1,137. A fair coin would land that far out about once in a hundred million million.",
    },
    mechanismLabel: { en: "What randomised did and did not guarantee" },
    mechanismName: {
      en: "Randomising is a procedure, and a procedure can be got around",
    },
    explanation: {
      en: "A one to one split of 2,672 should put about 1,336 in each arm, and chance alone would rarely move it more than about fifty either way. The antibiotics arm got 1,535, which is 199 too many, or more than seven standard deviations. Blocking in fours makes it worse, not better, because blocking exists precisely to hold the arms level. Some crews had been opening sealed envelopes and setting aside the ones that said usual care until they found one that said antibiotics.",
    },
    body: {
      en: "Nobody here was cheating for gain. The crews believed the antibiotics would help and were trying to give their patients the better option, which is exactly the situation allocation concealment is built for. The point of concealment is not to stop dishonest people. It is to stop well-meaning people from acting on a guess about which arm is better, because the moment who gets which treatment depends on anyone's judgement, the two groups stop being comparable and the comparison stops meaning what it appears to mean. The trial's investigators found this, said so in the paper, and retrained the crews. Notice also what the second row does to the first. The headline result, that the two arms had almost identical death rates, is the number this trial is cited for. It sits on top of two groups that were not assembled by chance.",
    },
    view: {
      kind: "stratified",
      caption: { en: "How they were split, and what happened to them" },
    },
  },

  lesson: {
    skillName: { en: "Allocation concealment" },
    takeaway: {
      en: "Randomised describes a procedure, not a result. What makes the two groups comparable is that nobody deciding who enters the trial can see which arm the next patient will get, and a trial can be randomised in name while failing that completely.",
    },
    body: {
      en: "It is worth separating two things that get said in one breath. Blinding is about who knows the assignment after it has been made, and it protects the measurement of the outcome. Concealment is about who can see the assignment before it has been made, and it protects the formation of the groups. They fail differently and they are defeated differently. This trial could not be blinded at all, which is unavoidable and was not the problem. What went wrong was concealment: the next assignment was sitting in an envelope in the ambulance, and a crew that wanted a particular answer could keep opening envelopes until they got it. The tell here is unusual and worth remembering, because most concealment failures leave no trace at all. This one left an arithmetic fingerprint: an allocation ratio that no random process could produce. When you can check that, check it.",
    },
    howItWorks: {
      en: "The mechanism is selection, and it can run in either direction. Suppose a clinician is enrolling a very sick patient and can see that the next envelope says usual care. If they believe the treatment works, they may find a reason not to enrol that patient at all, and wait for the next one. Nothing dishonest has to happen and no rule has to be broken; they are simply doing what they think is best for the person in front of them. But the sickest patients are now being steered away from one arm, and the trial will report a difference that was created at the door rather than by the treatment. This is why the modern standard is central randomisation: you telephone or click, a computer that has never met your patient returns the allocation, and by the time you know it you cannot unmake the enrolment. Sequentially numbered opaque sealed envelopes are the accepted fallback and they can work, but they are the method that fails in practice, and the ways they fail are catalogued: holding them to a light, opening them out of order, opening several at once. Two things to carry. First, when you read that a trial was randomised, that word alone tells you very little; what you want to know is how the sequence was generated and how it was concealed, and a report that does not say is a report that has not told you. Second, this whole family of problems is invisible in the results table. The place it shows up is the allocation ratio and the baseline characteristics, so those are the parts of a trial report worth a second look before you get to the outcome everyone is quoting.",
    },
    examples: [
      {
        title: { en: "The same trial, before and after the telephone" },
        summary: {
          en: "A surgical trial in the 1990s ran in two periods with everything the same except the concealment method. In the first, allocations came in sequentially numbered sealed envelopes. In the second, clinicians rang a central telephone line and a computer returned the allocation. In the envelope period the two arms differed sharply in age, with a median of 59 years against 63, and the gap was concentrated in particular surgeons: one had arms with medians of 33 and 69 years. In the telephone period the same trial, the same surgeons and the same patients produced arms with medians of 59 and 57, a difference easily explained by chance. Nothing about the disease or the population changed between the two periods. Only the question of whether the person enrolling could see what was coming next. That is as close to a controlled experiment on allocation concealment as the literature offers, and the reason this deck's puzzle uses a different trial is only that these figures are medians, and this deck authors from counts.",
        },
        provenance: {
          source:
            "Kennedy ADM, Torgerson DJ, Campbell MK, Grant AM. Subversion of allocation concealment in a randomised controlled trial: a historical case study. Trials. 2017;18:204. doi 10.1186/s13063-017-1946-z. Sealed envelope period: experimental n=169, median age 59; control n=158, median age 63; p<0.01. Central telephone period: experimental n=162, median 59; control n=165, median 57; p=0.37. Clinician 4 in the envelope period: experimental n=13, median 33; control n=13, median 69; p<0.001.",
          year: 2017,
          doi: "10.1186/s13063-017-1946-z",
        },
      },
    ],
  },

  share: {
    title: { en: "Allocation concealment, a reasoning trap." },
    explainer: {
      en: "A trial randomised 2,672 patients one to one, in blocks of four, to get antibiotics in the ambulance or usual care. A one to one split should put about 1,336 in each arm. The antibiotics arm got 1,535. That is more than seven standard deviations from chance, and blocks of four should have made it tighter still. Some ambulance crews had been opening sealed envelopes until they found one that said antibiotics, because they believed antibiotics would help. Randomised describes a procedure, not a result, and a procedure can be got around by people acting in good faith.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Alam N, Oskam E, Stassen PM, et al. Prehospital antibiotics in the ambulance for sepsis: a multicentre, open label, randomised trial. Lancet Respiratory Medicine. 2018;6(1):40-50. 2698 patients enrolled, 2672 in the intention-to-treat analysis, 1535 in the intervention group and 1137 in usual care, randomly assigned 1:1 using block randomisation with blocks of four. At day 28, 120 (8 per cent) had died in the intervention group and 93 (8 per cent) in the usual care group, relative risk 0.95, 95 per cent CI 0.74 to 1.24.",
    year: 2018,
    doi: "10.1016/S2213-2600(17)30469-1",
    note: {
      en: "The figures reconcile five ways. The two arms sum to the stated intention-to-treat total of 2,672. The intervention share of 57.4 per cent matches the 57 per cent reported for this trial elsewhere in the methodological literature. 120 of 1,535 is 7.8 per cent and 93 of 1,137 is 8.2 per cent, both of which round to the 8 per cent the paper prints. And the two rates give a relative risk of 0.956, matching the printed 0.95. Three things to be careful about. The seven standard deviations quoted is a deliberately conservative figure: it treats the allocation as a free one to one coin toss, whereas block randomisation in blocks of four constrains imbalance much more tightly, so the true departure is larger and the exact tail probability under blocking is not something the paper computes. This puzzle is not an accusation of misconduct: the crews believed the antibiotics would help their patients, the investigators identified the problem, reported it openly in the paper and retrained the crews, and the trial's overall conclusion may well be correct. And an unequal allocation ratio demonstrates that the process was not random; it does not by itself measure how different the two groups were in prognosis, which is a separate question this trial's baseline table would have to answer.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Allocation_concealment",
};
