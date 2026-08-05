import type { CeilingData } from "../../puzzles/schema";

/**
 * Pure derivation for the `ceiling` shape. No React, no formatting decisions
 * that belong to a renderer, so a future Remotion template can reuse it.
 *
 * One rule governs the whole module: a data file authors the published values
 * for each arm and the published location of the fitted peak, and NOTHING
 * else. Every difference, every mean, the place where the difference is
 * largest, and how much room each arm has before it meets a bound are all
 * computed here. This is a lesson about what arithmetic on a bounded measure
 * does to a curve, so taking any of that arithmetic from the file rather than
 * from the numbers would be the one unforgivable shortcut.
 */

export type CeilingPoint = {
  binId: string;
  label: CeilingData["bins"][number]["label"];
  short?: CeilingData["bins"][number]["short"];
  /** Where the bin sits on the axis, in the axis's own units. */
  at: number;
  value: number;
  sd?: number;
  /** Position along the axis, 0 to 1, from axis.min to axis.max. */
  x: number;
  /** Height as a fraction of the span between the floor and the ceiling. */
  y: number;
};

export type CeilingCurve = {
  armId: string;
  label: CeilingData["arms"][number]["label"];
  short?: CeilingData["arms"][number]["short"];
  points: CeilingPoint[];
};

const valueAt = (data: CeilingData, armId: string, binId: string): number | null =>
  data.observations.find((o) => o.armId === armId && o.binId === binId)?.value ?? null;

const xOf = (data: CeilingData, at: number) =>
  (at - data.axis.min) / (data.axis.max - data.axis.min);

const yOf = (data: CeilingData, value: number) =>
  (value - data.bounds.min) / (data.bounds.max - data.bounds.min);

/** Both arms, placed against the floor and the ceiling. */
export function ceilingCurves(data: CeilingData): CeilingCurve[] {
  return data.arms.map((arm) => ({
    armId: arm.id,
    label: arm.label,
    short: arm.short,
    points: data.bins
      .map((bin) => {
        const o = data.observations.find(
          (x) => x.armId === arm.id && x.binId === bin.id,
        );
        if (!o) return null;
        return {
          binId: bin.id,
          label: bin.label,
          short: bin.short,
          at: bin.at,
          value: o.value,
          sd: o.sd,
          x: xOf(data, bin.at),
          y: yOf(data, o.value),
        };
      })
      .filter((p) => p !== null),
  }));
}

export type CeilingDifference = {
  binId: string;
  label: CeilingData["bins"][number]["label"];
  short?: CeilingData["bins"][number]["short"];
  at: number;
  /** Second arm minus first, in the outcome's own units. */
  difference: number;
  x: number;
  /** Height as a fraction of the LARGEST difference anywhere in the data. */
  y: number;
};

/**
 * The difference between the arms, bin by bin. This is what the setup draws,
 * and it is the only thing the setup draws: the reader is shown the derived
 * curve and not the two curves it came from.
 *
 * Scaled against the largest difference rather than against the bounds,
 * because a difference of eight hundredths drawn on a zero-to-one axis is a
 * flat line and shows nothing at all.
 */
export function differenceCurve(data: CeilingData): CeilingDifference[] {
  const raw = data.bins.map((bin) => {
    const [base, treated] = data.arms;
    const lo = valueAt(data, base.id, bin.id);
    const hi = valueAt(data, treated.id, bin.id);
    return {
      bin,
      difference: lo === null || hi === null ? null : hi - lo,
    };
  });
  const peak = raw.reduce((m, r) => Math.max(m, r.difference ?? 0), 0);
  return raw
    .map(({ bin, difference }) =>
      difference === null
        ? null
        : {
            binId: bin.id,
            label: bin.label,
            short: bin.short,
            at: bin.at,
            difference,
            x: xOf(data, bin.at),
            y: peak > 0 ? difference / peak : 0,
          },
    )
    .filter((d) => d !== null);
}

/** The bin where the measured difference is largest. Derived, never authored. */
export function largestDifference(data: CeilingData): CeilingDifference | null {
  const curve = differenceCurve(data);
  if (curve.length === 0) return null;
  return curve.reduce((best, d) => (d.difference > best.difference ? d : best));
}

/** The difference in one named bin. */
export function differenceAt(data: CeilingData, binId: string): number | null {
  return differenceCurve(data).find((d) => d.binId === binId)?.difference ?? null;
}

/**
 * The unweighted mean of one arm across the bins.
 *
 * Unweighted because the bins are the unit the source published; it prints no
 * per-bin item counts. Whether that reproduces the source's own overall figure
 * is exactly the kind of thing a puzzle's test should check, and this is the
 * function it checks with.
 */
export function armMean(data: CeilingData, armId: string): number {
  const values = data.bins
    .map((b) => valueAt(data, armId, b.id))
    .filter((v): v is number => v !== null);
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

/** How far the two arms are apart on average, over the whole axis. */
export function overallDifference(data: CeilingData): number {
  const [base, treated] = data.arms;
  return armMean(data, treated.id) - armMean(data, base.id);
}

/**
 * How much room the nearest arm has left before it meets a bound, in one bin.
 *
 * This is the mechanism, as a number. Where a bin's arms sit close to the floor
 * or close to the ceiling there is nowhere for a difference to open up, however
 * hard whatever is being measured is pushing.
 */
export function roomToBound(data: CeilingData, binId: string): number | null {
  const values = data.arms
    .map((a) => valueAt(data, a.id, binId))
    .filter((v): v is number => v !== null);
  if (values.length === 0) return null;
  return Math.min(
    ...values.map((v) => Math.min(v - data.bounds.min, data.bounds.max - v)),
  );
}

/** The bin with the most room, i.e. the one furthest from either bound. */
export function roomiestBin(data: CeilingData): { binId: string; room: number } | null {
  const rooms = data.bins
    .map((b) => ({ binId: b.id, room: roomToBound(data, b.id) }))
    .filter((r): r is { binId: string; room: number } => r.room !== null);
  if (rooms.length === 0) return null;
  return rooms.reduce((best, r) => (r.room > best.room ? r : best));
}

/**
 * Does the interval around the measured peak reach the point where an effect of
 * constant size would have peaked? This is the verdict, and the reason the peak
 * and its interval are authored: they come from a model fitted to the
 * individual items, which binned means cannot reproduce.
 */
export function peakReachesNeutral(data: CeilingData): boolean {
  return data.peak.low <= data.neutralPoint && data.neutralPoint <= data.peak.high;
}

/**
 * How far the measured peak sits from the neutral point, as a fraction of the
 * interval's half-width. Below one means the neutral point is inside.
 */
export function peakOffsetInHalfWidths(data: CeilingData): number | null {
  const halfWidth = (data.peak.high - data.peak.low) / 2;
  if (halfWidth <= 0) return null;
  return Math.abs(data.peak.at - data.neutralPoint) / halfWidth;
}
