import type { TestItem } from "../puzzles/testItems";

/**
 * Trap Hunt: the checkpoint test. Pure logic so rounds and grading are
 * unit-testable and reproducible.
 */

/**
 * Biases learned per checkpoint. Set to 3 while the library is small (4 puzzles)
 * so a checkpoint is actually reachable; raise to 5 once there are more biases.
 */
export const CHECKPOINT_EVERY = 3;
export const ROUND_SIZE = 5;

/** Deterministic shuffle: a given seed always yields the same round. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = Math.abs(seed) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

/**
 * A round mixes traps the player has actually learned with genuinely sound
 * items, so it measures detection rather than "always answer trap". Roughly a
 * third of the round is sound, and never zero.
 */
export function selectItems(
  learned: string[],
  all: TestItem[],
  count: number = ROUND_SIZE,
  seed = 1,
): TestItem[] {
  const traps = all.filter((i) => i.trap !== null && learned.includes(i.trap));
  const sound = all.filter((i) => i.trap === null);
  const soundWanted = Math.min(sound.length, Math.max(1, Math.round(count / 3)));
  const picked = [
    ...seededShuffle(traps, seed).slice(0, count - soundWanted),
    ...seededShuffle(sound, seed + 7).slice(0, soundWanted),
  ];
  return seededShuffle(picked, seed + 13);
}

export interface Answer {
  isTrap: boolean;
  trap?: string | null;
}

/** Correct means the verdict is right, and for a trap, the bias is named right. */
export function gradeAnswer(item: TestItem, a: Answer): boolean {
  if (item.trap === null) return !a.isTrap;
  return a.isTrap && a.trap === item.trap;
}

const RANKS: { min: number; label: string }[] = [
  { min: 0, label: "Novice" },
  { min: 5, label: "Sceptic" },
  { min: 15, label: "Detective" },
  { min: 30, label: "Analyst" },
  { min: 50, label: "Sharp eye" },
];

export function rankFor(totalCorrect: number): string {
  let label = RANKS[0].label;
  for (const r of RANKS) if (totalCorrect >= r.min) label = r.label;
  return label;
}

/** Due once another CHECKPOINT_EVERY biases have been learned since the last one. */
export function checkpointDue(
  learnedCount: number,
  lastCheckpointAt: number,
): boolean {
  return (
    Math.floor(learnedCount / CHECKPOINT_EVERY) >
    Math.floor(lastCheckpointAt / CHECKPOINT_EVERY)
  );
}

/** Spaced review: due a week after the previous one. */
export function reviewDue(
  lastReviewDay: number | null,
  todayDay: number,
): boolean {
  if (lastReviewDay === null) return false;
  return todayDay - lastReviewDay >= 7;
}
