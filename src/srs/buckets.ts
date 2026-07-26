import { BURNED, isBurned, STAGES, type SkillProgress } from "./schedule";

/**
 * Grouping the ladder the way WaniKani does, because the ladder already is
 * WaniKani's: the stage names in schedule.ts are Apprentice I to IV, Guru I and
 * II, Master, Enlightened, Burned. Ten rungs is too many to show at once and
 * five buckets is the right amount of detail for "where is my knowledge".
 *
 * Pure, so the dashboard and any future summary agree on what Guru means.
 */

export type BucketId = "apprentice" | "guru" | "master" | "enlightened" | "burned";

export interface Bucket {
  id: BucketId;
  /** English name; the view translates via UI strings keyed on the id. */
  name: string;
  /** Inclusive stage range on the ten-rung ladder. */
  from: number;
  to: number;
}

/**
 * Stage 0 ("Learned") sits with Apprentice: a skill you have just met is an
 * apprentice at it, and giving a freshly taught skill its own bucket would put
 * a permanent 0 on most dashboards.
 */
export const BUCKETS: Bucket[] = [
  { id: "apprentice", name: "Apprentice", from: 0, to: 4 },
  { id: "guru", name: "Guru", from: 5, to: 6 },
  { id: "master", name: "Master", from: 7, to: 7 },
  { id: "enlightened", name: "Enlightened", from: 8, to: 8 },
  { id: "burned", name: "Burned", from: BURNED, to: BURNED },
];

export function bucketOf(progress: SkillProgress): BucketId {
  if (isBurned(progress)) return "burned";
  const found = BUCKETS.find((b) => progress.stage >= b.from && progress.stage <= b.to);
  // Anything off the end of the ladder is clamped rather than dropped, so a
  // dashboard total can never silently disagree with the number of skills.
  return found?.id ?? "apprentice";
}

export function bucketCounts(all: readonly SkillProgress[]): Record<BucketId, number> {
  const counts: Record<BucketId, number> = {
    apprentice: 0,
    guru: 0,
    master: 0,
    enlightened: 0,
    burned: 0,
  };
  for (const p of all) counts[bucketOf(p)] += 1;
  return counts;
}

export interface ForecastSlot {
  /** Milliseconds from now until this batch comes due; 0 means already due. */
  inMs: number;
  count: number;
}

/**
 * When the next reviews land, as WaniKani's forecast does. Everything already
 * due collapses into one slot at 0, because "three overdue" is one action, not
 * three future events.
 *
 * Burned skills appear like any other now that they come back for an annual
 * check. Hiding them was part of why a finished deck looked like a dead app.
 */
export function reviewForecast(
  all: readonly SkillProgress[],
  now: number,
  limit = 6,
): ForecastSlot[] {
  const pending = all;
  const dueNow = pending.filter((p) => p.dueAt <= now).length;

  const upcoming = new Map<number, number>();
  for (const p of pending) {
    if (p.dueAt <= now) continue;
    // Bucket to the hour so a forecast is a short list, not one row per skill.
    const hour = Math.ceil((p.dueAt - now) / 3_600_000);
    upcoming.set(hour, (upcoming.get(hour) ?? 0) + 1);
  }

  const slots: ForecastSlot[] = [...upcoming.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([hour, count]) => ({ inMs: hour * 3_600_000, count }));

  return (dueNow > 0 ? [{ inMs: 0, count: dueNow }, ...slots] : slots).slice(0, limit);
}

/** The ladder rung's own name, for a per-skill detail line. */
export function stageName(stage: number): string {
  return STAGES[Math.min(Math.max(stage, 0), STAGES.length - 1)].name;
}

export interface DayForecast {
  /** Whole days from today; 0 is today. */
  inDays: number;
  count: number;
}

/**
 * How many reviews fall on each of the next `days` calendar days, for a small
 * bar chart. Anything already overdue counts against today, because an overdue
 * review is something to do today, not a past event. Complements
 * `reviewForecast`, which answers "how soon" in hours; this answers "how my
 * week looks" in days, and always returns one slot per day (zeros included) so
 * the chart has a stable shape.
 */
export function weeklyForecast(
  all: readonly SkillProgress[],
  now: number,
  days = 7,
): DayForecast[] {
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const base = startOfToday.getTime();

  const slots: DayForecast[] = Array.from({ length: days }, (_, i) => ({
    inDays: i,
    count: 0,
  }));
  for (const p of all) {
    const offset = Math.floor((p.dueAt - base) / 86_400_000);
    const clamped = Math.max(0, Math.min(days - 1, offset));
    // Only count things that land within the window (or are overdue -> today).
    if (offset < days) slots[clamped].count += 1;
  }
  return slots;
}
