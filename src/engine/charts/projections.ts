import type { ProjectionData } from "../../puzzles/schema";
import { WORLD_OUTLINES } from "./worldOutlines";

/**
 * Pure derivation for the `projection` shape. No React, no formatting decisions
 * that belong to a renderer, so a future Remotion template can reuse it.
 */

export type ProjectionRow = {
  id: string;
  label: ProjectionData["projections"][number]["label"];
  short?: ProjectionData["projections"][number]["short"];
  equalArea: boolean;
  saidDistorts: number;
  /** SVG path data, when this projection has a map to draw. */
  path: string | null;
  /** Bar width as a fraction of the widest accusation drawn, 0 to 1. */
  width: number;
};

export type ProjectionShape = {
  rows: ProjectionRow[];
  /** Only the projections that actually have an outline to draw. */
  drawn: ProjectionRow[];
  /** The largest share of people accusing any one projection. */
  peak: number;
};

export function projectionShape(data: ProjectionData): ProjectionShape {
  const peak = data.projections.reduce(
    (m, p) => Math.max(m, p.saidDistorts),
    0,
  );
  const rows: ProjectionRow[] = data.projections.map((p) => ({
    id: p.id,
    label: p.label,
    short: p.short,
    equalArea: p.equalArea,
    saidDistorts: p.saidDistorts,
    path: p.mapId ? (WORLD_OUTLINES[p.mapId] ?? null) : null,
    width: peak > 0 ? p.saidDistorts / peak : 0,
  }));
  return { rows, drawn: rows.filter((r) => r.path !== null), peak };
}

/**
 * The paradox in one number pair: the area-exact projection people accused most,
 * against the area-distorting projection they accused least.
 *
 * Returns null when the data has no example of each, which the schema already
 * refuses, so a caller getting null is looking at a bug rather than at a puzzle.
 */
export function worstMistake(data: ProjectionData): {
  accusedHonest: ProjectionRow;
  excusedLiar: ProjectionRow;
  ratio: number;
} | null {
  const { rows } = projectionShape(data);
  const exact = rows.filter((r) => r.equalArea);
  const distorting = rows.filter((r) => !r.equalArea);
  if (exact.length === 0 || distorting.length === 0) return null;
  const accusedHonest = exact.reduce((a, b) =>
    b.saidDistorts > a.saidDistorts ? b : a,
  );
  const excusedLiar = distorting.reduce((a, b) =>
    b.saidDistorts < a.saidDistorts ? b : a,
  );
  if (excusedLiar.saidDistorts <= 0) return null;
  return {
    accusedHonest,
    excusedLiar,
    ratio: accusedHonest.saidDistorts / excusedLiar.saidDistorts,
  };
}

/* ---------------------------------------------------------------------------
 * The projection formulae, kept here so the test can prove from arithmetic what
 * the lesson asserts in words: that one of these maps is exactly area-true and
 * the other is not. Nothing in the app calls these at runtime; the outlines are
 * precomputed. They exist so the claim is checkable rather than quoted.
 * ------------------------------------------------------------------------- */

/** Robinson's published table of X and Y, at every five degrees of latitude. */
const ROBINSON_X = [
  1.0, 0.9986, 0.9954, 0.99, 0.9822, 0.973, 0.96, 0.9427, 0.9216, 0.8962,
  0.8679, 0.835, 0.7986, 0.7597, 0.7186, 0.6732, 0.6213, 0.5722, 0.5322,
];
const ROBINSON_Y = [
  0.0, 0.062, 0.124, 0.186, 0.248, 0.31, 0.372, 0.434, 0.4958, 0.5571, 0.6176,
  0.6769, 0.7346, 0.7903, 0.8435, 0.8936, 0.9394, 0.9761, 1.0,
];

export function robinson(lon: number, lat: number): [number, number] {
  const a = Math.abs(lat) / 5;
  const i = Math.min(Math.floor(a), 17);
  const t = a - i;
  const x =
    (ROBINSON_X[i] + (ROBINSON_X[i + 1] - ROBINSON_X[i]) * t) *
    0.8487 *
    ((lon * Math.PI) / 180);
  const y =
    (ROBINSON_Y[i] + (ROBINSON_Y[i + 1] - ROBINSON_Y[i]) * t) * 1.3523;
  return [x, lat >= 0 ? y : -y];
}

/** Cylindrical equal area with standard parallel 45 degrees. */
export function gallPeters(lon: number, lat: number): [number, number] {
  return [
    (lon * Math.PI) / 180 / Math.SQRT2,
    Math.SQRT2 * Math.sin((lat * Math.PI) / 180),
  ];
}

/**
 * How much a projection inflates or shrinks a patch of ground: the area it
 * draws a small cell as, divided by the true area of that cell on a sphere.
 *
 * An equal-area projection returns the same number at every latitude, by
 * definition. Anything else does not, and the spread is the distortion.
 */
export function areaFidelity(
  proj: (lon: number, lat: number) => [number, number],
  lat: number,
  size = 10,
): number {
  const pts = [
    proj(0, lat),
    proj(size, lat),
    proj(size, lat + size),
    proj(0, lat + size),
  ];
  let drawn = 0;
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    drawn += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
  }
  drawn = Math.abs(drawn) / 2;
  const rad = Math.PI / 180;
  const trueArea =
    size * rad * (Math.sin((lat + size) * rad) - Math.sin(lat * rad));
  return drawn / trueArea;
}
