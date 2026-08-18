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

/**
 * A rate as whole percent, in English, and NOT a rendering path.
 *
 * There is no locale anywhere in this: it rounds and appends a literal `%`, so
 * it draws Western digits at a reader of any language. It survives because
 * eight puzzle tests reconcile authored counts against it ("does 49 of 103
 * round to the 48% the card claims?"), which is a question about the arithmetic
 * and has no locale in it either.
 *
 * `FrequencyView` was its last caller on a render path and no longer is. A view
 * that needs a percentage builds its own `Intl.NumberFormat` from `useLocale()`,
 * the way every other figure in this directory does.
 */
export function formatPct(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}


/**
 * How much of each layer to draw at a point in the scrub between the pooled
 * view and the split one.
 *
 * WHY THIS SHAPE MORPHS NOTHING, unlike `risk`, and the difference is not
 * timidity. There, the two views measure against DIFFERENT denominators, so a
 * bar sliding between them is a rescale rather than a sequence of claims, and
 * suppressing the numerals was enough to keep it honest.
 *
 * Here both views put a RATE on the same implied scale. Tweening a bar's
 * height would therefore walk it through rates nobody observed, and, far
 * worse, through ORDERINGS that hold in neither view. On a Simpson's paradox
 * card the ordering is the entire lesson: the pooled figure says one group is
 * ahead and every stratum says the other is. A frame invented between those
 * two says something true of no reading of the data, and it says it at exactly
 * the moment the reader is looking hardest.
 *
 * So the two layers are drawn superimposed and the drag cross-dissolves
 * between them while the split panels separate laterally. Nothing interpolates
 * except opacity and position, and every numeral on screen at every instant
 * belongs to a view somebody authored. The reader still causes the reveal, and
 * still sees the pooled picture give way to the split one under their thumb.
 *
 * The bands overlap deliberately: the split panels begin arriving before the
 * pooled bars have finished leaving, so the swap reads as one movement rather
 * than as a gap with nothing in it.
 */
export interface RatesScrubFrame {
  /** Opacity of the pooled layer, 1 at the start. */
  pooled: number;
  /** Opacity of the split layer, 1 at the end. */
  split: number;
  /** 0 while the panels are together, 1 once fully separated. */
  separation: number;
}

/** Linear ramp from 0 to 1 across [from, to], flat outside it. */
function ramp(t: number, from: number, to: number): number {
  if (t <= from) return 0;
  if (t >= to) return 1;
  return (t - from) / (to - from);
}

export function ratesScrubFrame(phase: number): RatesScrubFrame {
  const t = Math.max(0, Math.min(1, phase));
  /*
    COMPLEMENTS, so the two opacities always sum to 1 and the figure never
    thins out. The first version faded the pooled layer over [0, 0.55] and
    brought the split one in over [0.35, 1], which left both at 0.2 around
    phase 0.44: a window where the chart is nearly invisible, which reads as a
    rendering fault rather than as a transition. The test caught it.

    Flat at both ends so the endpoints are crisp rather than merely close: at
    rest the reader is looking at exactly one authored view.
  */
  const across = ramp(t, 0.1, 0.9);
  return {
    pooled: 1 - across,
    split: across,
    separation: ramp(t, 0.2, 1),
  };
}
