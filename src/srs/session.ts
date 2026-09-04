import type { TestItem } from "../puzzles/testItems";
import { hasSpot } from "./spotTheTell";
import { isTrap } from "./trapHunt";

/**
 * The shape of a session, as opposed to the shape of a question.
 *
 * WHAT WAS WRONG. Three modes draw from one bank and all ask the same thing:
 * read a paragraph, decide whether it falls for something, press a button. The
 * calibration run adds a stake, which is a second tap rather than a second
 * question, since `RunAnswer extends TrapHuntAnswer` and the question underneath
 * is the same binary. So a session was eight repetitions of one verb, at one
 * difficulty, ending when the counter ran out.
 *
 * This module decides which items get a FOLLOW-UP and which follow-up they get,
 * so a session has three questions in it instead of one.
 *
 *   judge  Does this fall for something? The binary the bank was built for.
 *   name   For WHAT? Pick the skill from four. Free: the answer is already on
 *          the item and the four names are already translated.
 *   spot   Point at the clause. Only where the annotation exists.
 *
 * WHY THE FOLLOW-UP IS DRAWN AND NOT POSITIONAL, which is the one decision here
 * that a reasonable person would get wrong. The obvious design is a difficulty
 * ramp: easy questions first, the clause question last. But `name` and `spot`
 * can only be asked of a TRAP, so any ramp makes the last items always traps,
 * and a player who has played twice knows the answer to the binary before
 * reading the scenario. The mode would have taught exactly the habit its own
 * thoughtless-score line exists to punish.
 *
 * So the items are drawn with the bank's own mix, the order is untouched, and
 * the follow-ups are scattered over whichever of them can carry one. Difficulty
 * escalates WITHIN an item rather than across the session, which is the only
 * version that costs nothing in predictability.
 *
 * The follow-up appears after the binary is answered, right or wrong. A player
 * who said "sound" has just been told otherwise, and being asked what kind and
 * where is the cheapest way to show them what they walked past.
 */

export type Beat = "judge" | "name" | "spot";

export interface SessionStep {
  readonly item: TestItem;
  /** In order, always beginning with the binary. */
  readonly beats: readonly Beat[];
}

/** How many of a session's items carry a follow-up, by default. */
export const FOLLOW_UPS = 3;

/** How many skill names a `name` beat offers, including the right one. */
export const NAME_OPTIONS = 4;

/**
 * Pairs the deck itself argues are easy to confuse, so one is never offered as
 * a wrong answer to the other.
 *
 * WHY THIS EXISTS. A `name` beat picks three wrong skills at random out of
 * seventy-nine, and almost any three are obviously wrong. The exceptions are
 * the near-cousins, and a player who picks one of those has not made a mistake:
 * they have given a defensible reading and been marked wrong for it, which is
 * the failure `docs/hedge-audit.md` is about and which the four answer bands of
 * every puzzle are audited against. The bank deserves the same audit.
 *
 * The pairs are the ones the deck has already written down for itself: nearly
 * every card that sits close to another carries a "why it is not X" paragraph,
 * and those paragraphs are this list in prose. It is symmetric, it is checked
 * against the registry so it cannot name a skill that does not exist, and IT IS
 * MEANT TO GROW. When review finds a pair that reads as ambiguous, add it.
 */
export const COUSINS: readonly (readonly [string, string])[] = [
  ["collider-stratification", "simpsons-paradox"],
  ["collider-stratification", "berksons-bias"],
  ["collider-stratification", "table-two-fallacy"],
  ["collider-stratification", "effect-modification-vs-confounding"],
  ["prevalent-user-bias", "survivorship-bias"],
  ["prevalent-user-bias", "healthy-adherer"],
  ["prevalent-user-bias", "immortal-time-bias"],
  ["healthy-adherer", "intention-to-treat"],
  ["healthy-adherer", "attrition-bias"],
  ["attrition-bias", "intention-to-treat"],
  ["detection-bias", "performance-bias"],
  ["detection-bias", "pygmalion-effect"],
  ["performance-bias", "hawthorne-effect"],
  ["effect-modification-vs-confounding", "simpsons-paradox"],
  ["effect-modification-vs-confounding", "table-two-fallacy"],
  ["table-two-fallacy", "confounding-by-indication"],
  ["confounding-by-indication", "reverse-causality"],
  ["correlation-not-causation", "reverse-causality"],
  ["correlation-not-causation", "ecological-fallacy"],
  ["campbells-law", "gerrymandering"],
  ["campbells-law", "threshold-bunching"],
  ["proxy-target", "campbells-law"],
  ["proxy-target", "fairness-impossibility"],
  ["cross-site-generalisation", "spectrum-bias"],
  ["lead-time-bias", "length-time-bias"],
  ["lead-time-bias", "overdiagnosis"],
  ["length-time-bias", "overdiagnosis"],
  ["berksons-bias", "self-selection"],
  ["self-selection", "survivorship-bias"],
  ["base-rate-fallacy", "prosecutors-fallacy"],
  ["relative-vs-absolute-risk", "magnitude-compression"],
  ["statistical-power", "statistical-vs-clinical-significance"],
  ["multiple-comparisons", "publication-bias"],
  ["recall-bias", "misinformation-effect"],
  ["illusory-truth", "continued-influence-effect"],
  ["framing-effect", "metaphor-framing"],
  ["anchoring", "framing-effect"],
  ["halo-effect", "rater-leniency"],
  ["mean-vs-median", "magnitude-compression"],
  ["misleading-axis", "magnitude-compression"],
  ["composite-endpoints", "surrogate-endpoints"],
  ["competing-risks", "immortal-time-bias"],
  ["regression-to-the-mean", "floor-and-ceiling"],
  ["paltering", "innuendo-effect"],
  ["false-balance", "source-count-illusion"],
  ["whataboutism", "false-balance"],
];

/** Every skill too close to this one to be offered as a wrong answer. */
export function cousinsOf(skill: string): Set<string> {
  const out = new Set<string>();
  for (const [a, b] of COUSINS) {
    if (a === skill) out.add(b);
    if (b === skill) out.add(a);
  }
  return out;
}

/**
 * Which items get a follow-up, and which one.
 *
 * `spot` is preferred wherever the annotation exists, because eleven items
 * carry one out of a thousand and a session that drew them and then asked the
 * ordinary question would waste the only ones that can ask the hard one.
 *
 * The plan is a function of the draw and the randomness handed in, so a caller
 * that wants a reproducible session gets one.
 */
export function planSteps(
  items: readonly TestItem[],
  random: () => number,
  followUps = FOLLOW_UPS,
): SessionStep[] {
  const eligible = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => isTrap(item));

  // Annotated items first, so the scarce beat is never passed over, then the
  // rest in a shuffled order so the same draw does not always decorate the same
  // positions.
  const ranked = [...eligible].sort((a, b) => {
    const byKind = Number(hasSpot(b.item)) - Number(hasSpot(a.item));
    return byKind;
  });
  const spotters = ranked.filter(({ item }) => hasSpot(item));
  const others = shuffle(ranked.filter(({ item }) => !hasSpot(item)), random);
  const chosen = [...spotters, ...others].slice(0, Math.max(0, followUps));

  const beatFor = new Map<number, Beat>();
  for (const { item, index } of chosen) {
    beatFor.set(index, hasSpot(item) ? "spot" : "name");
  }

  return items.map((item, index) => {
    const extra = beatFor.get(index);
    return { item, beats: extra ? (["judge", extra] as const) : (["judge"] as const) };
  });
}

/** Partial Fisher-Yates, the same shape `drawRound` settled on and for the same
 * reason: a generator that returns one value must terminate. */
function shuffle<T>(list: readonly T[], random: () => number): T[] {
  const out = [...list];
  for (let i = 0; i < out.length; i++) {
    const j = i + Math.floor(random() * (out.length - i));
    const at = Math.min(j, out.length - 1);
    [out[i], out[at]] = [out[at]!, out[i]!];
  }
  return out;
}

/**
 * The four skills a `name` beat offers, the right one among them.
 *
 * Returns fewer than asked only when the deck itself is too small to fill the
 * list, which cannot happen at seventy-nine skills but is the honest behaviour
 * rather than a throw: a short list is a usable question, an exception is a
 * blank screen.
 */
export function nameOptions(
  item: TestItem,
  skills: readonly string[],
  random: () => number,
  count = NAME_OPTIONS,
): string[] {
  const answer = item.trap;
  if (answer === null) return [];
  const banned = cousinsOf(answer);
  const pool = skills.filter((s) => s !== answer && !banned.has(s));
  const wrong = shuffle(pool, random).slice(0, Math.max(0, count - 1));
  return shuffle([answer, ...wrong], random);
}

export function gradeName(item: TestItem, picked: string): boolean {
  return item.trap !== null && picked === item.trap;
}
