import type { TargetData } from "../../puzzles/schema";

/**
 * Pure derivation for the `target` shape. No React, no formatting decisions that
 * belong to a renderer, so a future Remotion template can reuse it.
 *
 * The axis is everyone who came through the door, ordered by how long they took.
 * A performer's bar therefore reads left to right as: finished early, finished
 * in the final stretch before the deadline, missed the deadline. Every one of
 * those three segments is derived from the two published shares, so none of them
 * can drift from the source.
 */

export type TargetRow = {
  id: string;
  label: TargetData["performers"][number]["label"];
  short?: TargetData["performers"][number]["short"];
  n: number;
  /** Published: share that missed the deadline. */
  breachPercent: number;
  /** Published: share that finished inside the final stretch. */
  lateSharePercent: number;
  /** Derived: share that finished in time at all. Never authored. */
  withinPercent: number;
  /** Derived: share that finished before the final stretch even began. */
  earlyPercent: number;
  /** Derived: did this performer pass? */
  meetsTarget: boolean;
  /** Derived: how much room it had to spare, in points. */
  headroom: number;
};

export type TargetShape = {
  rows: TargetRow[];
  targetPercent: number;
};

/** Rows with the three segments of each bar worked out. */
export function targetShape(data: TargetData): TargetShape {
  const rows: TargetRow[] = data.performers.map((p) => {
    const withinPercent = 100 - p.breachPercent;
    return {
      id: p.id,
      label: p.label,
      short: p.short,
      n: p.n,
      breachPercent: p.breachPercent,
      lateSharePercent: p.lateSharePercent,
      withinPercent,
      earlyPercent: withinPercent - p.lateSharePercent,
      meetsTarget: withinPercent >= data.targetPercent,
      headroom: withinPercent - data.targetPercent,
    };
  });
  return { rows, targetPercent: data.targetPercent };
}

/**
 * How far apart the two performers are on the metric anybody actually looks at.
 *
 * The whole setup rests on this being tiny. A caller can use it to check that
 * the puzzle it is drawing really does present two performers that look alike.
 */
export function headlineGap(data: TargetData): number | null {
  const { rows } = targetShape(data);
  if (rows.length < 2) return null;
  return Math.abs(rows[0].withinPercent - rows[1].withinPercent);
}

/**
 * How many times more of one performer's people finish in the final stretch
 * than the other's. The reveal in one number.
 *
 * Returns null when the smaller share is zero, rather than dividing by it.
 */
export function crowdingRatio(data: TargetData): {
  crowded: TargetRow;
  spread: TargetRow;
  ratio: number;
} | null {
  const { rows } = targetShape(data);
  if (rows.length < 2) return null;
  const [a, b] = rows;
  const crowded = a.lateSharePercent >= b.lateSharePercent ? a : b;
  const spread = crowded === a ? b : a;
  if (spread.lateSharePercent <= 0) return null;
  return {
    crowded,
    spread,
    ratio: crowded.lateSharePercent / spread.lateSharePercent,
  };
}

/**
 * Where the final stretch sits on the axis, as a fraction from 0 to 1.
 *
 * Used by the renderer to place the band. It is the tail of the compliant part,
 * so it ends exactly where the deadline does and starts `lateSharePercent`
 * earlier, which is what makes the band read as a crowd pressed against the
 * line rather than as a free-floating quantity.
 */
export function lateBand(row: TargetRow): { start: number; end: number } {
  return { start: row.earlyPercent / 100, end: row.withinPercent / 100 };
}
