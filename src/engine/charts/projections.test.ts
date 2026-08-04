import { describe, expect, it } from "vitest";
import { PuzzleData, type ProjectionData } from "../../puzzles/schema";
import {
  areaFidelity,
  gallPeters,
  projectionShape,
  robinson,
  worstMistake,
} from "./projections";
import { WORLD_OUTLINES } from "./worldOutlines";

const data: ProjectionData = {
  type: "projection",
  label: { en: "Maps" },
  accusedLabel: { en: "Said it distorts" },
  exactLabel: { en: "Exact" },
  distortsLabel: { en: "Distorted" },
  percentNote: { en: "Of 31 people" },
  projections: [
    {
      id: "robinson",
      label: { en: "Robinson" },
      equalArea: false,
      saidDistorts: 10,
      mapId: "robinson",
    },
    {
      id: "gallpeters",
      label: { en: "Gall-Peters" },
      equalArea: true,
      saidDistorts: 39,
      mapId: "gallpeters",
    },
    {
      id: "goode",
      label: { en: "Goode" },
      equalArea: true,
      saidDistorts: 71,
    },
  ],
};

const parse = (d: unknown) => PuzzleData.safeParse(d);

/* ---------------------------------------------------------------------------
 * The claim the whole lesson rests on, proved from the projection formulae
 * rather than quoted from anybody.
 * ------------------------------------------------------------------------- */
describe("the two drawn projections do what the lesson says they do", () => {
  it("has Gall-Peters draw every latitude in exact proportion to its ground", () => {
    // The definition of an equal-area projection: drawn area over true area is
    // the same number everywhere. Checked from the equator to the far north.
    const values = [0, 10, 20, 30, 40, 50, 60, 70, 80].map((lat) =>
      areaFidelity(gallPeters, lat),
    );
    for (const v of values) expect(v).toBeCloseTo(values[0], 9);
    // And that constant is 1, so the map is not merely self-consistent but
    // true to the sphere it came from.
    expect(values[0]).toBeCloseTo(1, 9);
  });

  it("has Robinson inflate the far north against the tropics", () => {
    const equator = areaFidelity(robinson, 0);
    const far = areaFidelity(robinson, 70);
    expect(equator).toBeLessThan(0.9);
    expect(far).toBeGreaterThan(1.5);
    // Roughly double: a ten-degree cell at 70 north is drawn about twice the
    // size, relative to its ground, as one on the equator.
    expect(far / equator).toBeGreaterThan(1.8);
  });

  it("does not let Robinson pass as equal-area on any reading", () => {
    const values = [0, 20, 40, 60, 80].map((lat) => areaFidelity(robinson, lat));
    const spread = Math.max(...values) / Math.min(...values);
    expect(spread).toBeGreaterThan(1.5);
  });
});

describe("the outlines that ship", () => {
  it("has a stored outline for each projection the data draws", () => {
    for (const p of data.projections) {
      if (p.mapId) expect(WORLD_OUTLINES[p.mapId]).toBeTruthy();
    }
  });

  it("covers the same landmasses in both projections", () => {
    // Same source geometry, same filtering, so the two paths must contain the
    // same number of rings. If one day they diverge, the two maps would be
    // showing different worlds and the comparison would be meaningless.
    const count = (s: string) => (s.match(/Z/g) ?? []).length;
    expect(count(WORLD_OUTLINES.robinson)).toBe(
      count(WORLD_OUTLINES.gallpeters),
    );
    expect(count(WORLD_OUTLINES.robinson)).toBeGreaterThan(20);
  });

  it("keeps every outline inside the box it is drawn into", () => {
    for (const path of Object.values(WORLD_OUTLINES)) {
      const nums = path.match(/-?\d+\.?\d*/g)!.map(Number);
      const xs = nums.filter((_, i) => i % 2 === 0);
      const ys = nums.filter((_, i) => i % 2 === 1);
      expect(Math.min(...xs)).toBeGreaterThanOrEqual(-0.5);
      expect(Math.max(...xs)).toBeLessThanOrEqual(320.5);
      expect(Math.min(...ys)).toBeGreaterThanOrEqual(-0.5);
      expect(Math.max(...ys)).toBeLessThanOrEqual(200.5);
    }
  });
});

describe("projectionShape and worstMistake", () => {
  it("scales the bars against the most-accused projection", () => {
    const { rows, peak } = projectionShape(data);
    expect(peak).toBe(71);
    expect(rows[0].width).toBeCloseTo(10 / 71, 10);
    expect(rows[2].width).toBe(1);
  });

  it("attaches a path only to the projections that have one", () => {
    const { rows, drawn } = projectionShape(data);
    expect(drawn.map((r) => r.id)).toEqual(["robinson", "gallpeters"]);
    expect(rows[2].path).toBeNull();
  });

  it("finds the honest map people accused most and the liar they let off", () => {
    const w = worstMistake(data)!;
    expect(w.accusedHonest.id).toBe("goode");
    expect(w.excusedLiar.id).toBe("robinson");
    expect(w.ratio).toBeCloseTo(7.1, 10);
  });
});

describe("the schema refuses data that would make the lesson false", () => {
  it("accepts the well-formed case", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects data where nobody mistook an honest map for a dishonest one", () => {
    const out = parse({
      ...data,
      projections: [
        { ...data.projections[0], saidDistorts: 90 },
        { ...data.projections[1], saidDistorts: 5 },
        { ...data.projections[2], saidDistorts: 6 },
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects data with no area-exact projection at all", () => {
    const out = parse({
      ...data,
      projections: data.projections.map((p) => ({ ...p, equalArea: false })),
    });
    expect(out.success).toBe(false);
  });

  it("rejects data with fewer than two maps to look at", () => {
    const out = parse({
      ...data,
      projections: [
        data.projections[0],
        { ...data.projections[1], mapId: undefined },
        data.projections[2],
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects a duplicate projection id", () => {
    const out = parse({
      ...data,
      projections: [
        data.projections[0],
        { ...data.projections[1], id: "robinson" },
        data.projections[2],
      ],
    });
    expect(out.success).toBe(false);
  });
});
