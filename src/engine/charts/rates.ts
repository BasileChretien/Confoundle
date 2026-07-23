import type { RatesData } from "../../puzzles/schema";

/**
 * Pure derivation of rates from raw observations. No React, no DOM, importable
 * by the web engine AND (later) by Remotion card/clip templates, so every
 * surface shows exactly the same numbers. This is where Simpson's paradox
 * actually lives: aggregate() pools the counts, stratified() keeps them split.
 */

export interface Rate {
  groupId: string;
  numerator: number;
  denominator: number;
  rate: number; // 0..1
}

export interface StratumRates {
  stratumId: string;
  rates: Rate[]; // one entry per group, in data.groups order
}

function toRate(groupId: string, numerator: number, denominator: number): Rate {
  return {
    groupId,
    numerator,
    denominator,
    rate: denominator > 0 ? numerator / denominator : 0,
  };
}

/**
 * A view can ask for part of the data (see `DataView.groupIds` / `strataIds`).
 * Returns a new RatesData holding only the named groups and strata, so every
 * derivation below stays unaware that any filtering happened. Immutable: the
 * authored data is never touched.
 */
export function restrictRates(
  data: RatesData,
  filter?: { groupIds?: string[]; strataIds?: string[] },
): RatesData {
  const wantGroups = filter?.groupIds;
  const wantStrata = filter?.strataIds;
  if (!wantGroups && !wantStrata) return data;

  const groups = wantGroups
    ? data.groups.filter((g) => wantGroups.includes(g.id))
    : data.groups;
  const strata = wantStrata
    ? data.strata.filter((s) => wantStrata.includes(s.id))
    : data.strata;
  const keptGroups = new Set(groups.map((g) => g.id));
  const keptStrata = new Set(strata.map((s) => s.id));

  return {
    ...data,
    groups,
    strata,
    observations: data.observations.filter(
      (o) => keptGroups.has(o.groupId) && keptStrata.has(o.stratumId),
    ),
  };
}

/** One pooled rate per group, summed across all strata. */
export function aggregateRates(data: RatesData): Rate[] {
  return data.groups.map((g) => {
    const obs = data.observations.filter((o) => o.groupId === g.id);
    const numerator = obs.reduce((sum, o) => sum + o.numerator, 0);
    const denominator = obs.reduce((sum, o) => sum + o.denominator, 0);
    return toRate(g.id, numerator, denominator);
  });
}

/** One rate per group, per stratum. */
export function stratifiedRates(data: RatesData): StratumRates[] {
  return data.strata.map((s) => ({
    stratumId: s.id,
    rates: data.groups.map((g) => {
      const o = data.observations.find(
        (x) => x.groupId === g.id && x.stratumId === s.id,
      );
      return toRate(g.id, o?.numerator ?? 0, o?.denominator ?? 0);
    }),
  }));
}

/** Winning group id under a set of rates, honoring metric direction. */
export function bestGroupId(
  rates: Rate[],
  higherIsBetter: boolean,
): string | null {
  // A winner needs something to beat. A view showing a single group (a setup
  // beat quoting one published figure) has no contest, so it crowns nobody.
  if (rates.length < 2) return null;
  const best = rates.reduce((b, r) => {
    const better = higherIsBetter ? r.rate > b.rate : r.rate < b.rate;
    return better ? r : b;
  });
  // A tie has no winner. Marking one arbitrarily would be a lie, and some
  // puzzles turn on the two totals being exactly equal.
  const tied = rates.some(
    (r) => r.groupId !== best.groupId && r.rate === best.rate,
  );
  return tied ? null : best.groupId;
}

export function formatPct(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}
