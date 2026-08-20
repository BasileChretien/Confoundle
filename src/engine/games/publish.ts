import type { LocalizedText } from "../../puzzles/schema";

/**
 * Publish or Perish: the multiplicity problem as something you do for points.
 *
 * THE DATASET CONTAINS NOTHING. Every patient's outcome is drawn with the same
 * probability whatever arm they are in and whatever traits they have, so there
 * is no effect anywhere to find, in any subgroup, ever. The game says so on
 * the first screen, because the surprise is not "was there something?" but how
 * fast you find five things anyway.
 *
 * That is also what makes the game honest rather than a rigged demo. If the
 * generator were biased even slightly, the player's discoveries would be real
 * and the lesson would be a lie told with numbers. So the null is a property
 * the tests check directly: p-values uniform, roughly one test in twenty
 * significant at 0.05, and a "finding" that replicates about as often as a
 * coin lands on its edge.
 *
 * WHY A GAME AND NOT ANOTHER SLIDER. A slider shows the mechanism; you watch a
 * number move and agree with it. Hunting for significance yourself, publishing
 * it, and then watching replication take it away is the difference between
 * knowing that p-hacking works and having done it. The deck already argues
 * about ISIS-2's astrological subgroup; this lets you be the investigator.
 *
 * NOTHING HERE NAMES A REAL JOURNAL, DRUG, OR INSTITUTION, and the treatment is
 * invented. The satire has to be unmistakably fiction, because a screenshot of
 * it will travel further than the page it came from.
 */

/** A patient in the invented cohort. */
export interface Patient {
  /** 1 if allocated the invented treatment, 0 for control. */
  arm: 0 | 1;
  /**
   * One flag per endpoint, each drawn with the SAME probability in both arms.
   *
   * SEVERAL ENDPOINTS BECAUSE ONE IS NOT ENOUGH TO HUNT IN, and because that
   * is what the practice actually looks like. Measured on the first version,
   * which had a single outcome: a player who tested all eighteen subgroups
   * found nothing in 58% of runs, so most sessions ended with no payoff at
   * all. Widening the search was the honest fix; making the null lean would
   * have been the dishonest one.
   */
  outcomes: readonly (0 | 1)[];
  /** One flag per hypothesis, all independent of arm and of outcome. */
  traits: readonly boolean[];
}

export interface Hypothesis {
  id: string;
  label: LocalizedText;
}

/**
 * The outcomes a player may look at. All independent, all null, all the kind of
 * thing a protocol lists and a paper quietly reorders.
 */
export const ENDPOINTS: readonly Hypothesis[] = [
  { id: "recovered", label: { en: "Recovered" } },
  { id: "improved", label: { en: "Improved at 30 days" } },
  { id: "complication-free", label: { en: "Free of complications" } },
] as const;

export interface TestResult {
  hypothesis: string;
  endpoint: string;
  /** Head counts, so the player can check the arithmetic if they want to. */
  treated: { n: number; events: number };
  control: { n: number; events: number };
  /** Two-sided p for the difference in proportions. */
  p: number;
  significant: boolean;
}

/**
 * The subgroups a player can test.
 *
 * Chosen to be recognisable rather than absurd. Every one of these has been a
 * real published subgroup somewhere, and the deck's own puzzle is about a trial
 * that split its patients by star sign, so the joke is not on people who take
 * subgroups seriously. It is on the practice.
 */
export const HYPOTHESES: readonly Hypothesis[] = [
  { id: "men", label: { en: "Men" } },
  { id: "women", label: { en: "Women" } },
  { id: "over-60", label: { en: "Over 60" } },
  { id: "under-40", label: { en: "Under 40" } },
  { id: "smokers", label: { en: "Smokers" } },
  { id: "diabetic", label: { en: "Diabetic" } },
  { id: "high-bp", label: { en: "High blood pressure" } },
  { id: "overweight", label: { en: "Overweight" } },
  { id: "early-treat", label: { en: "Treated within 4 hours" } },
  { id: "late-treat", label: { en: "Treated after 12 hours" } },
  { id: "severe", label: { en: "Severe cases" } },
  { id: "mild", label: { en: "Mild cases" } },
  { id: "left-handed", label: { en: "Left-handed" } },
  { id: "city", label: { en: "Recruited in a city" } },
  { id: "winter", label: { en: "Enrolled in winter" } },
  { id: "gemini-libra", label: { en: "Born under Gemini or Libra" } },
  { id: "coffee", label: { en: "Drinks coffee daily" } },
  { id: "first-100", label: { en: "The first 100 enrolled" } },
] as const;

/** Everyone, before any subgroup is taken. */
export const OVERALL = "everyone";

/**
 * A small deterministic generator, so a run can be replayed, shared and tested.
 *
 * `Math.random` would make every claim in this file untestable and would let
 * the same seed give two different games, which is the one thing a scoreboard
 * cannot survive.
 */
function rng(seed: number): () => number {
  let a = (seed * 0x9e3779b1) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** How many patients each run enrols. */
export const COHORT_SIZE = 900;
/** The recovery rate, identical in both arms. */
const RECOVERY = 0.4;

/**
 * Build a cohort with no effect in it of any kind.
 *
 * Arm, outcome and every trait are drawn independently, so the outcome is
 * unrelated to the arm both overall AND inside every subgroup. There is
 * nothing to find. That is the premise of the game and the thing its tests
 * check rather than assume.
 */
export function cohort(seed: number): Patient[] {
  const rand = rng(seed);
  return Array.from({ length: COHORT_SIZE }, () => ({
    arm: (rand() < 0.5 ? 1 : 0) as 0 | 1,
    outcomes: ENDPOINTS.map(() => (rand() < RECOVERY ? 1 : 0) as 0 | 1),
    traits: HYPOTHESES.map(() => rand() < 0.5),
  }));
}

/**
 * The standard normal tail, by Abramowitz and Stegun 7.1.26.
 *
 * Written out rather than imported because the project has no statistics
 * dependency and one function is cheaper than one more thing to audit. Its
 * accuracy is pinned against known values in the tests, since a p-value that
 * is quietly wrong would make the game either impossible or trivial.
 */
function normalTail(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return 1 - y;
}

/** Two-sided p for a difference in two proportions, by the usual z test. */
export function twoProportionP(
  eventsA: number,
  nA: number,
  eventsB: number,
  nB: number,
): number {
  if (nA === 0 || nB === 0) return 1;
  const pooled = (eventsA + eventsB) / (nA + nB);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB));
  if (se === 0) return 1;
  const z = (eventsA / nA - eventsB / nB) / se;
  return Math.min(1, normalTail(z));
}

export const ALPHA = 0.05;

/**
 * Run one analysis: a subgroup crossed with an endpoint.
 *
 * `hypothesis` is a trait id or `OVERALL`; `endpoint` is one of `ENDPOINTS`.
 * The two together are the researcher's degrees of freedom, and the number of
 * combinations is the whole reason something turns up.
 */
export function analyse(
  patients: readonly Patient[],
  hypothesis: string,
  endpoint: string,
): TestResult {
  const index = HYPOTHESES.findIndex((h) => h.id === hypothesis);
  const outcome = Math.max(0, ENDPOINTS.findIndex((e) => e.id === endpoint));
  const inGroup = (p: Patient) => hypothesis === OVERALL || p.traits[index] === true;
  const treated = { n: 0, events: 0 };
  const control = { n: 0, events: 0 };
  for (const p of patients) {
    if (!inGroup(p)) continue;
    const side = p.arm === 1 ? treated : control;
    side.n++;
    side.events += p.outcomes[outcome]!;
  }
  const p = twoProportionP(treated.events, treated.n, control.events, control.n);
  return { hypothesis, endpoint, treated, control, p, significant: p < ALPHA };
}

/** Every question a player could ask, which is the size of the haystack. */
export const TEST_SPACE = HYPOTHESES.length * ENDPOINTS.length;

/**
 * Re-run a published finding on a fresh cohort, which is what replication is.
 *
 * The new cohort is a different draw of the same nothing, so a finding that was
 * chance the first time has only the same one-in-twenty chance of surviving.
 * This is the whole ending of the game, and the tests measure the survival rate
 * rather than trusting the argument.
 */
export function replicate(
  seed: number,
  hypothesis: string,
  endpoint: string,
): TestResult {
  return analyse(cohort(seed + 500_000), hypothesis, endpoint);
}
