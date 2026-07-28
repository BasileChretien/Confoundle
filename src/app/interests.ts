import type { Puzzle, TagId } from "../puzzles/schema";
import { TAG_ORDER } from "../puzzles/tags";

/**
 * What the learner has said they want to study.
 *
 * Interests are TAGS, not categories: a tag says what a lesson is about and
 * where it bites ("everyday", "media", "clinical"), which is the axis a person
 * actually chooses along. A puzzle already carries several at once, so one
 * lesson can belong to medicine and to statistics and to everyday life without
 * being duplicated.
 *
 * An EMPTY selection means everything, deliberately. That way the default
 * costs no decision, a learner who never opens the chooser sees the whole
 * course, and clearing the chooser is the same as never having used it.
 *
 * Pure functions here, storage at the bottom, so the filtering can be tested
 * without a browser.
 */

const KEY = "confoundle:interests:v1";

/**
 * Tags that at least one puzzle actually carries, in canonical order.
 *
 * The chooser must never offer an interest that leads to an empty screen. Nine
 * of the twenty tags in the vocabulary have no puzzle yet (media, politics and
 * psychology among them), and they will appear here on their own the moment a
 * lesson claims them.
 */
export function availableInterests(list: readonly Puzzle[]): TagId[] {
  const used = new Set<TagId>();
  for (const p of list) for (const tag of p.tags) used.add(tag);
  return TAG_ORDER.filter((id) => used.has(id));
}

/** Does this puzzle match the selection? An empty selection matches everything. */
export function matchesInterests(
  puzzle: Puzzle,
  interests: readonly TagId[],
): boolean {
  if (interests.length === 0) return true;
  return puzzle.tags.some((tag) => interests.includes(tag));
}

/** The puzzles worth showing, in registry order. */
export function filterByInterests(
  list: readonly Puzzle[],
  interests: readonly TagId[],
): Puzzle[] {
  return list.filter((p) => matchesInterests(p, interests));
}

/**
 * Drop anything that is no longer a real, populated interest. A tag can leave
 * the vocabulary, or lose its last puzzle, between one visit and the next, and
 * a stale selection would silently hide the whole course.
 */
export function pruneInterests(
  interests: readonly string[],
  list: readonly Puzzle[],
): TagId[] {
  const allowed = new Set<string>(availableInterests(list));
  return interests.filter((i): i is TagId => allowed.has(i));
}

/** Toggle one interest on or off, immutably, keeping canonical order. */
export function toggleInterest(
  interests: readonly TagId[],
  tag: TagId,
): TagId[] {
  const next = interests.includes(tag)
    ? interests.filter((i) => i !== tag)
    : [...interests, tag];
  return TAG_ORDER.filter((id) => next.includes(id));
}

// ---- storage (local only, like every other preference in this app) ----

export function readInterests(list: readonly Puzzle[]): TagId[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return pruneInterests(parsed.filter((x): x is string => typeof x === "string"), list);
  } catch {
    return [];
  }
}

export function writeInterests(interests: readonly TagId[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(interests));
  } catch {
    // storage unavailable (private mode, quota), degrade to session-only
  }
}
