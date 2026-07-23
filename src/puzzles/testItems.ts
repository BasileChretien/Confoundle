import { z } from "zod";
import { LocalizedText } from "./schema";

/**
 * Trap Hunt items: short, neutral scenarios used to test whether a player can
 * DETECT a reasoning trap when nobody has told them one is there.
 *
 * Two rules keep this a real test rather than a bias-naming quiz:
 *  1. Some items are genuinely sound (`trap: null`). Without them, players learn
 *     that the answer is always "trap" and the score means nothing.
 *  2. The wording must not telegraph the flaw the way a teaching puzzle does.
 *
 * These are deliberately hypothetical scenarios, not claims about the world, so
 * they carry no provenance. Anything asserting a real finding belongs in a
 * puzzle (which does require provenance), not here.
 */
export const TestItem = z.object({
  id: z.string().min(1),
  scenario: LocalizedText,
  /** null = the reasoning is sound; otherwise the reasoningSkill it trips on. */
  trap: z.string().nullable(),
  explanation: LocalizedText,
});
export type TestItem = z.infer<typeof TestItem>;

const items: TestItem[] = [
  // ---- Simpson's paradox ----
  {
    id: "sp-schools",
    scenario: {
      en: "Two schools publish exam results. School B has the higher pass rate overall, 75% against 70%. When results are split by student background, School A comes out ahead in every single group. The district praises School B.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "A wins in every group but loses overall, which happens when the groups are mixed unevenly. The pooled number is the misleading one here.",
    },
  },
  {
    id: "sp-factory",
    scenario: {
      en: "A factory reports its new process has a lower defect rate than the old one, 3% against 4%. Looking at simple parts and complex parts separately, the old process had fewer defects in both.",
    },
    trap: "simpsons-paradox",
    explanation: {
      en: "Better in both categories yet worse overall means the two processes handled very different mixes of simple and complex parts.",
    },
  },

  // ---- Base-rate fallacy ----
  {
    id: "br-screening",
    scenario: {
      en: "A condition affects about 1 in 2,000 people. A screening test is 99% accurate. A patient tests positive and is told they almost certainly have the condition.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "With a condition this rare, the 1% error rate produces far more false positives than there are real cases, so a positive is still more likely to be a false alarm.",
    },
  },
  {
    id: "br-security",
    scenario: {
      en: "A system flags travellers as suspicious and is 95% accurate. About 1 in 1,000 travellers is actually a threat. An official states that a flagged traveller is 95% likely to be a threat.",
    },
    trap: "base-rate-fallacy",
    explanation: {
      en: "That confuses the test's accuracy with the odds after a flag. Because threats are rare, the overwhelming majority of flags are ordinary travellers.",
    },
  },

  // ---- Correlation is not causation ----
  {
    id: "cc-parks",
    scenario: {
      en: "Neighbourhoods with more parks have lower obesity rates. A council report concludes that building parks will reduce obesity, and proposes a park-building programme.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Wealth and urban planning plausibly drive both park provision and health, so the link may not be the parks doing the work.",
    },
  },
  {
    id: "cc-library",
    scenario: {
      en: "Students who visit the library more often get higher grades. A university announces mandatory weekly library visits to raise grades.",
    },
    trap: "correlation-not-causation",
    explanation: {
      en: "Motivated students both study more and visit the library. Forcing the visit does not import the motivation that produced the grades.",
    },
  },

  // ---- Survivorship bias ----
  {
    id: "sv-companies",
    scenario: {
      en: "A business book studies companies that have thrived for fifty years and finds nearly all had bold, risk-taking leaders. It concludes that bold leadership causes lasting success.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "The bold companies that went under are not in the sample. Boldness may equally well cause spectacular failure, which the study cannot see.",
    },
  },
  {
    id: "sv-rehab",
    scenario: {
      en: "A clinic reviews patients who completed its demanding rehabilitation programme and finds excellent outcomes. It reports the programme as highly effective.",
    },
    trap: "survivorship-bias",
    explanation: {
      en: "Patients who dropped out are excluded, and they are likely the ones doing worst. Counting only finishers flatters the programme.",
    },
  },

  // ---- Prosecutor's fallacy ----
  {
    id: "pf-dna",
    scenario: {
      en: "A database search turns up one man whose DNA matches a crime-scene sample. The lab reports that the profile occurs in about 1 person in a million. The prosecutor tells the jury there is therefore about a one in a million chance that he is innocent.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "The 1 in a million is the chance of a match if he is innocent, not the chance he is innocent given a match. In a large pool other people match too, so the two numbers are nowhere near the same.",
    },
  },
  {
    id: "pf-fibres",
    scenario: {
      en: "Fibres on a suspect's coat match the victim's carpet. An expert says only about 1 coat in 5,000 would carry such fibres. Counsel concludes the suspect is 4,999 times more likely to be guilty than innocent.",
    },
    trap: "prosecutors-fallacy",
    explanation: {
      en: "A rarity figure describes the evidence, not the person. How many innocent people could have picked up those fibres depends on how many people were ever near that carpet.",
    },
  },

  // ---- Will Rogers phenomenon ----
  {
    id: "wr-scanner",
    scenario: {
      en: "A hospital installs a more sensitive scanner. Over the next two years it reports that survival improved in every severity grade of the disease, from the mildest to the most advanced, and concludes that its care has got better.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "A sharper scanner regrades patients. Those moved out of a mild grade were its sickest, and they arrive in a severe grade as its healthiest, so both averages rise without anyone doing better.",
    },
  },
  {
    id: "wr-streaming",
    scenario: {
      en: "A school adopts a placement test that is much better at identifying struggling pupils, and uses it to sort them into a top and a bottom stream. The next year, average results rise in both streams. The head teacher credits the new teaching methods.",
    },
    trap: "will-rogers-phenomenon",
    explanation: {
      en: "The pupils reclassified out of the top stream were its weakest and become the strongest of the bottom stream, so both averages climb on reshuffling alone.",
    },
  },

  // ---- Genuinely sound reasoning (decoys) ----
  {
    id: "ok-no-migration",
    scenario: {
      en: "A hospital reports that survival improved in every severity grade over five years. It also reports that the grading criteria did not change in that time, that no new diagnostic test was introduced, and that the number of patients in each grade stayed about the same.",
    },
    trap: null,
    explanation: {
      en: "This is the case where the improvement is real. Nothing reclassified the patients, and the grades held the same share of people, so no reshuffling could have manufactured the gain.",
    },
  },
  {
    id: "ok-match-stated-well",
    scenario: {
      en: "An expert testifies that the DNA profile occurs in roughly 1 person in a million, and adds that in a city of two million this means about two other people would be expected to match as well, so the match alone does not single out the defendant.",
    },
    trap: null,
    explanation: {
      en: "This is the rarity figure stated correctly. The expert converts it into expected matches in the population instead of flipping it into a probability of innocence.",
    },
  },
  {
    id: "ok-rct",
    scenario: {
      en: "Patients are assigned at random to a drug or a placebo. The drug group has fewer strokes, and the difference holds within every age group. The researchers conclude the drug reduces strokes.",
    },
    trap: null,
    explanation: {
      en: "Randomisation balances the hidden differences, and the effect survives splitting by age. This reasoning is sound.",
    },
  },
  {
    id: "ok-common-condition",
    scenario: {
      en: "A test with a 1% false-positive rate is used in a clinic where about 40% of those tested genuinely have the condition. A doctor tells a patient that a positive result makes the condition much more likely.",
    },
    trap: null,
    explanation: {
      en: "The base rate matters, and here it is high. With 40% prevalence a positive really is strong evidence, so applying the rare-disease lesson would be a mistake.",
    },
  },
  {
    id: "ok-speed-limit",
    scenario: {
      en: "A city compares road deaths before and after lowering a speed limit, adjusts for traffic volume, and checks the national trend over the same years. The local drop is larger than the national trend.",
    },
    trap: null,
    explanation: {
      en: "They accounted for the obvious confounders and for the background trend, which is what makes a before-and-after comparison credible.",
    },
  },
  {
    id: "ok-full-cohort",
    scenario: {
      en: "A trial reports outcomes for everyone who was enrolled, including those who stopped treatment early, and states how many dropped out and why.",
    },
    trap: null,
    explanation: {
      en: "Reporting the whole enrolled group, dropouts included, is exactly the defence against counting only the survivors.",
    },
  },
];

/** Fail fast on malformed items, same contract discipline as puzzles. */
export const TEST_ITEMS: TestItem[] = items.map((item) => {
  const parsed = TestItem.safeParse(item);
  if (!parsed.success) {
    throw new Error(
      `Invalid test item "${item.id}": ${parsed.error.issues.map((i) => i.message).join("; ")}`,
    );
  }
  return parsed.data;
});
