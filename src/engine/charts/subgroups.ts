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
 * DETERMINISTIC, so a given deal always shows the same thing. A figure that
 * reshuffled on every render would change while the reader looked at it, and
 * its claims could not be tested.
 *
 * BUT THE READER CAN RE-DEAL, and that turned out to be the difference between
 * a toy and a lie. An earlier version had one deal per slice count and drew a
 * lesson from it: cut ISIS-2 twelve ways and nothing contradicts it, therefore
 * groups of seven hundred are too big to reverse, therefore the cap must be
 * higher than twelve. Measured over two thousand deals, 43.8% give no
 * contradiction at twelve and 56.2% give at least one, mean 0.70. The claim
 * was a property of one seed, not of the trial.
 *
 * That mattered twice over. It was false, and it made the page argue with
 * itself: this puzzle is about a trial that WAS cut twelve ways and DID produce
 * a subgroup pointing the other way, and the toy beside it said twelve ways
 * finds nothing. Re-dealing removes the whole problem. No single deal carries
 * a claim, the reader sees contradictions come and go at a fixed number of
 * cuts, and THAT is the lesson: not that subgroups always mislead, but that
 * whether they do is luck.
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
 * AN EARLIER COMMENT HERE SAID THE SEED WAS ARBITRARY AND THAT NOTHING
 * DEPENDED ON IT. That was wrong, and it was wrong in the dangerous direction:
 * review measured that changing it broke two tests, because those tests were
 * quietly asserting facts about one particular deal. The comment would have
 * invited the next reader to make the change and then "fix" the failing test.
 * Nothing depends on the seed NOW, and the reason is structural rather than a
 * promise: the reader can re-deal, so every claim the module makes has to hold
 * across deals, and the tests assert it across deals.
 */
export function sliceFrame(
  model: SlicerModel,
  splits: number,
  deal = 0,
): Subgroup[] {
  const k = Math.max(1, Math.round(splits));
  /*
    The slice count and the deal both feed the seed, so every combination is
    its own arrangement and none of them is privileged. Nothing anywhere may
    depend on which: that was the bug.
  */
  const rand = dealer(k * 7919 + deal);
  const events = model.groups.map(() => new Array<number>(k).fill(0));
  const totals = model.groups.map(() => new Array<number>(k).fill(0));

  model.groups.forEach((g, gi) => {
    for (let p = 0; p < g.total; p++) {
      // `Math.min` is belt and braces: `rand()` is strictly below 1, so the
      // floor cannot reach `k`. Kept because the cost of being wrong is a
      // subgroup that exists in one array and not the other.
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
  /*
    THREE OF THESE FOUR REFUSALS ARE UNREACHABLE IN THE SHIPPED DECK, and
    saying so is better than letting the next reader assume they are load
    bearing. `canSlice` admits only two-arm tables, so `undefined` cannot
    happen through the app; the ≥480 floor means no bucket is empty, so `NaN`
    cannot either; and an exact tie between two rates over a few hundred people
    does not occur anywhere in the deck's range, which is why `contraryCount`'s
    own tie handling is tested on a hand-built frame rather than a dealt one.
    They are kept because a comparison that returns a winner for data it cannot
    compare is the kind of thing that becomes reachable later, quietly.
  */
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
 * The most slices worth offering.
 *
 * Twenty-four, twice what ISIS-2 did, so the slider spans the trial's own
 * analysis and keeps going. The average number of contradictions rises with
 * the number of cuts, which is the trend worth being able to see; at any fixed
 * number it varies from deal to deal, which is what the re-deal button is for.
 *
 * AN EARLIER VERSION JUSTIFIED THIS NUMBER WITH A MEASUREMENT THAT WAS NOT ONE.
 * It said twelve produces no contradiction, therefore the cap must be higher.
 * Twelve produces no contradiction in 43.8% of deals and at least one in the
 * other 56.2%. The cap is not load-bearing for the lesson any more, because no
 * single deal is.
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
