import type { Puzzle } from "../schema";

/**
 * Puzzle #34, the Hawthorne effect, on Wu et al. (2018). Closes gap 6 of
 * plan-syllabus-gaps.md, which the plan expected might end in a documented
 * refusal. It did not, but two sources failed first and the reasons are on the
 * record in that file.
 *
 * THE COUNTS ARE DECODED, WHICH IS NOT THE SAME AS RECONSTRUCTED. Table 2 prints
 * pair counts as integers and compliance to one decimal place. For these two
 * rows exactly ONE integer numerator reproduces the printed percentage, so the
 * count is determined by the published data rather than guessed:
 *
 *   Intensive care unit,  880 pairs: 80.6% -> 709 unique, 69.2% -> 609 unique
 *   Outpatient department, 133 pairs: 64.7% ->  86 unique, 24.1% ->  32 unique
 *
 * The test file asserts that uniqueness, which turns the decoding from a liberty
 * into a checked property. The overall row (3,047 pairs) and the nurse row
 * (2,105) have three and two candidates respectively and are therefore NOT
 * authored anywhere in this puzzle.
 *
 * INDEPENDENTLY CONFIRMED. The decoded counts reproduce the paper's own printed
 * Hawthorne effect column exactly: 709/880 minus 609/880 is 11.4 percentage
 * points, and 86/133 minus 32/133 is 40.6. Both match Table 2 to the decimal.
 *
 * WHY THIS LESSON RATHER THAN PLAIN HAWTHORNE. That being watched changes
 * behaviour is not surprising enough to be a puzzle. That it changes behaviour
 * nearly four times as much in one setting as another is, and it is the finding
 * that actually matters, because it means an audited compliance figure cannot be
 * compared across wards even when the audit method is identical.
 *
 * NO NEW SHAPE. `rates` with two groups and two strata, setup filtered to the
 * intensive care stratum and the reveal dropping the filter.
 */
export const hawthorneEffect: Puzzle = {
  schemaVersion: 1,
  id: "hawthorne-effect-2018",
  slug: "when-the-auditor-is-watching",
  category: "statistical-reasoning",
  reasoningSkill: "hawthorne-effect",
  difficulty: "medium",
  tags: ["clinical", "research", "everyday"],
  supportedLocales: ["en"],

  setup: {
    headline: {
      en: "Hand hygiene in an intensive care unit, measured twice: once with an auditor in view, once without.",
    },
    framing: {
      en: "A hospital watched its staff wash their hands in two ways. Sometimes an auditor stood openly on the ward with a clipboard, which is how hand hygiene figures are normally collected and published. Sometimes an observer recorded the same thing without anyone knowing they were doing it. Every overt observation was then matched to a covert one on the same ward, the same job, the same shift and the same kind of moment, so that the only difference left between the pair was whether the staff knew they were being watched. In the intensive care unit that gave 880 matched pairs. An intensive care unit is a closed room where staff work within sight of one another all day; an outpatient clinic is not, and its staff move between rooms alone.",
    },
    question: {
      en: "The same hospital did this in its outpatient department too. How big was the gap there?",
    },
    data: {
      type: "rates",
      metricLabel: { en: "Cleaned their hands when they should have" },
      higherIsBetter: true,
      // Two locations from the same study, deliberately not pooled: the paper's
      // overall row cannot be decoded to integers, so it is never authored.
      strataAreSeparateSamples: true,
      groups: [
        {
          id: "overt",
          label: { en: "An auditor was standing there" },
          short: { en: "Watched" },
        },
        {
          id: "covert",
          label: { en: "Nobody knew they were being observed" },
          short: { en: "Not watched" },
        },
      ],
      strata: [
        { id: "icu", label: { en: "Intensive care unit" } },
        { id: "opd", label: { en: "Outpatient department" } },
      ],
      observations: [
        { groupId: "overt", stratumId: "icu", numerator: 709, denominator: 880 },
        { groupId: "covert", stratumId: "icu", numerator: 609, denominator: 880 },
        { groupId: "overt", stratumId: "opd", numerator: 86, denominator: 133 },
        { groupId: "covert", stratumId: "opd", numerator: 32, denominator: 133 },
      ],
    },
    initialView: {
      kind: "stratified",
      strataIds: ["icu"],
      caption: { en: "Intensive care, watched against not watched" },
    },
  },

  choices: [
    {
      id: "same",
      label: { en: "About the same, ten points or so" },
      sublabel: { en: "an auditor is an auditor wherever they stand" },
      isCorrect: false,
      isIntuitiveTrap: true,
    },
    {
      id: "smaller",
      label: { en: "Smaller. Clinics are calmer than intensive care" },
      sublabel: { en: "less pressure, fewer corners cut" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
    {
      id: "much-bigger",
      label: { en: "Far bigger. Around four times the gap" },
      sublabel: { en: "ask how much of a change the auditor actually is" },
      isCorrect: true,
      isIntuitiveTrap: false,
    },
    {
      // The hedge. Wrong here: the framing contrasts a room where staff are
      // already in constant view with one where they are not.
      id: "cannot-tell",
      label: { en: "There is no way to tell" },
      sublabel: { en: "too little to go on" },
      isCorrect: false,
      isIntuitiveTrap: false,
    },
  ],

  reveal: {
    headline: {
      en: "Eleven points in intensive care. Forty-one in the clinic.",
    },
    mechanismLabel: { en: "What the auditor changed, and where" },
    mechanismName: {
      en: "Being watched does not move everyone by the same amount",
    },
    explanation: {
      en: "In intensive care, 709 of 880 moments were handled correctly with an auditor present and 609 of 880 without: a gap of about eleven points. In the outpatient department it was 86 of 133 against 32 of 133, a gap of about forty-one points. Same hospital, same audit method, same matching. In the clinic, nearly two thirds of the compliance that the audit recorded existed only while the audit was happening.",
    },
    body: {
      en: "Look at what the unwatched numbers alone would tell you. Intensive care sat at 69 per cent and the clinic at 24, so the real difference between these two places is enormous. Now look at the watched numbers: 81 and 65. The gap between the two settings has shrunk to a third of its true size, because the auditor lifted the worse performer far more than the better one. That is the part that should worry anyone reading a published compliance table. It is not merely that audited figures are too high. It is that they are too high by different amounts in different places, so the ranking you build from them is not the ranking of how clean people's hands actually are.",
    },
    view: {
      kind: "stratified",
      caption: { en: "Both settings, watched and not" },
    },
  },

  lesson: {
    skillName: { en: "The Hawthorne effect" },
    takeaway: {
      en: "People change what they do when they know they are being measured. The trap is not that this happens, which everyone accepts, but that it happens by different amounts in different places, so measurements taken under observation can reorder things that were never in that order.",
    },
    body: {
      en: "The name comes from the Hawthorne Works, an electrical factory outside Chicago where experiments in the 1920s and 1930s appeared to show that productivity rose whatever was done to the lighting, as though the attention itself were the active ingredient. That story is worth treating carefully. The illumination experiments have been reanalysed several times since the original data were rediscovered, and the tidy pattern largely dissolves: the rises are better explained by things like the working week, the day of the week, and workers being replaced. So the effect is real, the modern evidence for it is good, and the study it is named after is not that evidence. This deck builds the lesson on a hospital in 2018 rather than a factory in 1927 for exactly that reason, and the history belongs in the story rather than in the data.",
    },
    howItWorks: {
      en: "The mechanism is not mysterious and it is not about being nervous. Somebody who knows they are being assessed does the thing they would have skipped, and that is a genuine change in behaviour, not a measurement error in the usual sense. What makes it awkward is that the size of the change depends on how far the observed situation is from the unobserved one. In a closed unit where staff already work all day within each other's sight, an auditor adds little; in a clinic where a nurse moves alone between rooms, the auditor is the first person to have watched all week. That is why the gap here was four times larger in one place than the other, and it generalises well past hand hygiene. Any figure produced by somebody who knows the figure is being collected has this property: teaching observed by an inspector, driving with a examiner in the car, a kitchen on the day of an inspection, output on the week of a review. Three things follow. First, prefer measures that do not depend on anyone knowing: electronic counts, routine records collected for another purpose, outcomes rather than process. Second, when you cannot avoid observation, be suspicious of comparisons rather than of levels, because the bias does not cancel when you subtract two audited numbers from different settings. Third, if a published figure is high and the method was open observation, the useful question is not whether it is inflated but by how much here compared with there, and that question usually has no answer in the report, which is itself worth noticing.",
    },
    examples: [
      {
        title: { en: "The same effect, measured by the dispensers themselves" },
        summary: {
          en: "A Canadian hospital fitted its alcohol gel and soap dispensers with electronic sensors and a real-time location system that knew where the hand hygiene auditors were standing. That let them compare the same dispensers at moments when an auditor was in view and moments when none was. Hand hygiene events ran at about 3.75 per dispenser per hour within sight of an auditor, against 1.48 in the same hallways at the same time with no auditor visible, and 1.07 for those same dispensers a week earlier. The rise began after the auditors arrived, which is what makes it their doing rather than a coincidence of the hour. Roughly threefold, measured by hardware rather than by a person with a clipboard, which removes the obvious objection that the covert observer might simply have been missing things. It is reported as events per dispenser per hour rather than as a proportion of opportunities, which is why this deck's puzzle is built on a different study.",
        },
        provenance: {
          source:
            "Srigley JA, Furness CD, Baker GR, Gardam M. Quantification of the Hawthorne effect in hand hygiene compliance monitoring using an electronic monitoring system: a retrospective cohort study. BMJ Quality and Safety. 2014;23(12):974-980. Hand hygiene event rates of 3.75 per dispenser per hour when an auditor was visible, against 1.48 with no auditor visible in the same location at the same time (p=0.001) and 1.07 for the same dispensers one week earlier (p<0.001).",
          year: 2014,
          doi: "10.1136/bmjqs-2014-003080",
        },
      },
    ],
  },

  share: {
    title: { en: "The Hawthorne effect, a reasoning trap." },
    explainer: {
      en: "A hospital measured hand hygiene twice: with an auditor standing there, and with nobody knowing. In intensive care the gap was eleven points, 709 of 880 moments against 609 of 880. In the outpatient clinic it was forty-one, 86 of 133 against 32 of 133. Same hospital, same method. Being watched does not lift everyone equally, so audited figures are not merely too high, they are too high by different amounts in different places. The ranking you build from them is not the ranking of what actually happens.",
    },
    captions: {
      competitive: { en: "Caught it. Bet you can't." },
      selfDeprecating: { en: "I totally fell for this." },
    },
  },

  provenance: {
    source:
      "Wu K-S, Lee SS-J, Chen J-K, et al. Identifying heterogeneity in the Hawthorne effect on hand hygiene observation: a cohort study of overtly and covertly observed results. BMC Infectious Diseases. 2018;18:369. Table 2, location rows: intensive care unit 880 matched pairs with 80.6 per cent compliance under overt observation and 69.2 per cent under covert; outpatient department 133 matched pairs with 64.7 per cent and 24.1 per cent. 31,522 opportunities were observed in total, 4,581 overtly and 26,941 covertly, matched 1:1 into 3,047 pairs.",
    year: 2018,
    doi: "10.1186/s12879-018-3292-5",
    note: {
      en: "The counts here are decoded rather than printed, and that distinction matters. Table 2 gives pair counts as whole numbers and compliance to one decimal place, and for these two rows exactly one integer numerator reproduces the published percentage: 709 and 609 of 880, and 86 and 32 of 133. No other integer rounds to the figures the paper prints, so the counts are determined by the published data rather than estimated from it, and the test file asserts that uniqueness rather than taking it on trust. Two rows of the same table are not decodable in this way, the overall row of 3,047 pairs and the nurse row of 2,105, which admit three and two candidate numerators, and neither is used anywhere in this puzzle. As an independent check, the decoded counts reproduce the paper's own Hawthorne effect column exactly, at 11.4 and 40.6 percentage points. Three limits. This is one hospital, and the outpatient row rests on 133 pairs, which is small enough that the forty-one point gap is imprecise even though its direction is clear. Covert observation has its own difficulties, both practical and ethical, and an observer who is unnoticed may also be less well placed to see. And the matching controlled ward, occupation, shift and indication, but matched pairs are not randomised, so residual differences between the compared moments remain possible.",
    },
  },

  goDeeperUrl: "https://en.wikipedia.org/wiki/Hawthorne_effect",
};
