import type { PuzzleData, RatesData } from "../../puzzles/schema";

/**
 * The subgroup slicer: multiplicity as something you do, rather than read about.
 *
 * WHAT IT DOES. The trial's overall result is held exactly as measured and
 * never moves. The reader chooses how many ways to slice the patients, and
 * watches subgroups appear in which the treatment looks useless, or harmful.
 * Nothing about the treatment changed. They cut the same data more ways.
 *
 * That is the whole of the multiple-comparisons problem, and it is the one
 * thing the puzzle's own figure cannot show: ISIS-2 printed ONE subgroup split,
 * the astrological one, and a reader can always tell themselves that particular
 * split was unlucky. Doing it themselves, repeatedly, on data with no subgroup
 * effect in it at all, is a different kind of knowing.
 *
 * THE PATIENTS ARE DEALT, NOT SIMULATED, and that distinction is the whole
 * honesty of the shape. Every subgroup is a handful of the trial's REAL
 * patients, each carrying the outcome they really had; the only invented thing
 * is which handful they landed in. Two consequences follow, and both matter.
 * The subgroup counts always sum to the published totals, because they are the
 * published totals rearranged. And at one slice the figure IS the trial, to the
 * patient, which is the same anchor the other two toys have: exactly one
 * position where the picture is a measurement rather than a what-if.
 *
 * Drawing outcomes from a fitted rate instead would have been easier and would
 * have printed numbers nobody counted.
 *
 * DETERMINISTIC, so the same slider position always shows the same deal. A
 * figure that reshuffled under the reader on every render would be a slot
 * machine, and worse, its claims could not be tested.
 */

export interface SlicerModel {
  groups: readonly {
    id: string;
    /** Everyone in this arm, across every stratum the puzzle authored. */
    total: number;
    /** How many of them had the event. */
    events: number;
  }[];
  /** Which direction counts as better, read off the puzzle. */
  higherIsBetter: boolean;
}

export interface Subgroup {
  /**
   * Head counts per arm, in the order the puzzle declares them. THE COUNTS
   * ARE THE PRIMARY THING and the rates are derived from them, not the other
   * way round: these subgroups are the trial's own patients rearranged, so a
   * test can add them back up and a caption can say "3 of 41" without anyone
   * reconstructing whole people from a percentage.
   */
  events: readonly number[];
  totals: readonly number[];
  /** Event rate per arm, derived from the counts above. */
  rates: readonly number[];
  /** Which arm looks better here, or null when they are level. */
  leader: string | null;
}

/** The trial as published: every arm pooled over every stratum. */
export function slicerModel(data: RatesData): SlicerModel {
  return {
    higherIsBetter: data.higherIsBetter,
    groups: data.groups.map((g) => {
      const rows = data.observations.filter((o) => o.groupId === g.id);
      return {
        id: g.id,
        total: rows.reduce((n, o) => n + o.denominator, 0),
        events: rows.reduce((n, o) => n + o.numerator, 0),
      };
    }),
  };
}

/**
 * A small deterministic generator.
 *
 * `Math.random` is unusable here for two separate reasons, and only one of them
 * is testing. A figure that reshuffles on every render would change while the
 * reader looked at it, so nothing on screen could be pointed at and discussed.
 * The same seed for the same slice count means the picture is a fact about that
 * position, which is what lets a caption make a claim about it.
 */
function dealer(seed: number): () => number {
  let a = (seed * 0x9e3779b1) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deal every patient into one of `splits` subgroups, keeping the outcome they
 * actually had.
 *
 * The arms are dealt from ONE generator rather than one each, so the two arms
 * do not receive the same pattern.
 *
 * Seeding from `k` is arbitrary and nothing depends on it: the deal already
 * differs at every slice count because the number of buckets does, so seeding
 * from a constant would work equally well. Said plainly because a mutation
 * replacing it changes no observable behaviour, and the next person to notice
 * that should not have to wonder what they have broken.
 */
export function sliceFrame(model: SlicerModel, splits: number): Subgroup[] {
  const k = Math.max(1, Math.round(splits));
  const rand = dealer(k);
  const events = model.groups.map(() => new Array<number>(k).fill(0));
  const totals = model.groups.map(() => new Array<number>(k).fill(0));

  model.groups.forEach((g, gi) => {
    for (let p = 0; p < g.total; p++) {
      const bucket = Math.min(k - 1, Math.floor(rand() * k));
      totals[gi]![bucket]!++;
      // The first `events` patients are the ones who had the event. Which
      // patient carries which outcome is irrelevant: they are exchangeable
      // within an arm, which is exactly what randomisation bought.
      if (p < g.events) events[gi]![bucket]!++;
    }
  });

  return Array.from({ length: k }, (_, i) => {
    const e = model.groups.map((_, gi) => events[gi]![i]!);
    const t = model.groups.map((_, gi) => totals[gi]![i]!);
    const rates = t.map((d, gi) => (d === 0 ? NaN : e[gi]! / d));
    return { events: e, totals: t, rates, leader: leaderOf(model, rates) };
  });
}

function leaderOf(model: SlicerModel, rates: readonly number[]): string | null {
  const [a, b] = rates;
  if (a === undefined || b === undefined) return null;
  if (Number.isNaN(a) || Number.isNaN(b) || a === b) return null;
  const aAhead = model.higherIsBetter ? a > b : a < b;
  return aAhead ? model.groups[0]!.id : model.groups[1]!.id;
}

/** Which arm the whole trial favours, which is the thing that never moves. */
export function overallLeader(model: SlicerModel): string | null {
  return leaderOf(
    model,
    model.groups.map((g) => g.events / g.total),
  );
}

/**
 * How many of these subgroups point the OTHER way from the trial.
 *
 * The number the caption reports, so it is a function with a test rather than a
 * filter written inside a renderer. Subgroups that come out level are counted
 * as neither: they contradict nothing.
 */
export function contraryCount(model: SlicerModel, frame: Subgroup[]): number {
  const overall = overallLeader(model);
  if (overall === null) return 0;
  return frame.filter((s) => s.leader !== null && s.leader !== overall).length;
}

/**
 * The most slices worth offering, and the number was measured rather than
 * chosen.
 *
 * Twelve was the obvious pick, because twelve is what ISIS-2 did. Dealing this
 * trial twelve ways produces NO subgroup that contradicts it: aspirin wins all
 * twelve, and the closest is a dead tie. The effect is simply too strong to
 * reverse in groups of seven hundred, and a toy capped there would have let a
 * reader drag the whole range and conclude that subgroups are fine.
 *
 * Reversals begin at thirteen and are routine from seventeen. At
 * twenty-four the trial's own patients produce four subgroups saying the
 * opposite of the trial, in groups of about 360, which is an entirely ordinary
 * size for a published subgroup. So the cap is twenty-four, and the shape of
 * the slider is now the lesson: the further you cut, the more contradictions
 * you buy, and none of them mean anything.
 *
 * WHAT WAS NOT DONE is worth recording. The alternative fix was to keep twelve
 * and hunt for a seed that produced a reversal there. That is exactly the
 * search this puzzle condemns, run by the author of the figure about it, and
 * the fact that it would have been invisible in the diff is the reason to say
 * so out loud.
 */
export const MAX_SLICES = 24;

/**
 * THE SLICER IS OFFERED ONLY WHERE RE-DEALING THE PATIENTS MEANS SOMETHING.
 *
 * `armsAreRandomised` is what licenses the whole shape, and no arrangement of
 * the counts can tell you it is true. Random subgroups model something only
 * because randomisation made patients exchangeable between the arms: deal an
 * OBSERVATIONAL comparison this way and every subgroup silently inherits
 * whatever confounding sorted people into the groups in the first place, so
 * the figure would be teaching that those differences are chance when they are
 * the opposite. `kidney-stones` is the deck's standing example of exactly that
 * data, and it must never get this toy.
 *
 * The rest is arithmetic. Two arms, or there is no comparison to reverse. A
 * clear overall winner, or "points the other way" has no other way to point.
 * And enough patients that twelve subgroups are not a dozen anecdotes.
 */
export function canSlice(data: PuzzleData): data is RatesData {
  if (data.type !== "rates") return false;
  if (data.armsAreRandomised !== true) return false;
  if (data.groups.length !== 2) return false;
  if (data.strataAreSeparateSamples === true) return false;
  const model = slicerModel(data);
  if (model.groups.some((g) => g.total < MAX_SLICES * 20)) return false;
  return overallLeader(model) !== null;
}
