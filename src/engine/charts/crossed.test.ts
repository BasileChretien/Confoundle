import { describe, expect, it } from "vitest";
import { PuzzleData, type CrossedData } from "../../puzzles/schema";
import {
  allGaps,
  axisFraction,
  cellsInA,
  cleanGaps,
  confoundedGaps,
  gap,
  points,
  restrictCrossed,
} from "./crossed";

/** Hurst 2019's four cells, which is the figure this shape was built for. */
const data: CrossedData = {
  type: "crossed",
  label: { en: "1000 m time by what they were told and what they were given" },
  metricLabel: { en: "mean time, seconds" },
  scale: {
    min: 165,
    max: 185,
    minLabel: { en: "165 s, faster" },
    maxLabel: { en: "185 s, slower" },
  },
  lowerIsBetter: true,
  factorALabel: { en: "What they were told" },
  factorBLabel: { en: "What they were given" },
  aLevels: [
    { id: "toldcaf", label: { en: "Told caffeine" } },
    { id: "toldpla", label: { en: "Told placebo" } },
  ],
  bLevels: [
    { id: "gotcaf", label: { en: "Given caffeine" } },
    { id: "gotpla", label: { en: "Given placebo" } },
  ],
  cells: [
    { id: "cc", aId: "toldcaf", bId: "gotcaf", mean: 172.7, n: 11 },
    { id: "pp", aId: "toldpla", bId: "gotpla", mean: 176.7, n: 11 },
    { id: "cp", aId: "toldcaf", bId: "gotpla", mean: 172.6, n: 11 },
    { id: "pc", aId: "toldpla", bId: "gotcaf", mean: 174.3, n: 11 },
  ],
  reference: { label: { en: "Baseline" }, mean: 175.9 },
};

const clone = (): CrossedData => JSON.parse(JSON.stringify(data)) as CrossedData;

describe("crossed derivation", () => {
  it("keeps the cells in declaration order", () => {
    expect(points(data).map((p) => p.cellId)).toEqual(["cc", "pp", "cp", "pc"]);
  });

  it("groups cells by a level of the first factor", () => {
    expect(cellsInA(data, "toldcaf").map((p) => p.cellId)).toEqual(["cc", "cp"]);
    expect(cellsInA(data, "toldpla").map((p) => p.cellId)).toEqual(["pp", "pc"]);
  });

  it("works out which factors a pair varies rather than being told", () => {
    expect(gap(data, "cc", "cp").varies).toEqual(["b"]);
    expect(gap(data, "cc", "pc").varies).toEqual(["a"]);
    expect(gap(data, "cc", "pp").varies).toEqual(["a", "b"]);
  });

  it("takes the difference as from minus to", () => {
    expect(gap(data, "pp", "cc").difference).toBeCloseTo(4.0, 10);
    expect(gap(data, "cc", "cp").difference).toBeCloseTo(0.1, 10);
  });

  it("finds every pair exactly once", () => {
    expect(allGaps(data)).toHaveLength(6);
    expect(confoundedGaps(data)).toHaveLength(2);
    expect(cleanGaps(data, "a")).toHaveLength(2);
    expect(cleanGaps(data, "b")).toHaveLength(2);
  });

  /**
   * The arithmetic the card rests on, kept here so a data edit that broke it
   * fails in the shape's own suite and not only in the puzzle's.
   */
  it("separates the confounded diagonal from the pair that barely moves", () => {
    const diagonal = gap(data, "pp", "cc");
    const alongB = gap(data, "cc", "cp");
    expect(diagonal.varies).toEqual(["a", "b"]);
    expect(alongB.varies).toEqual(["b"]);
    expect(Math.abs(diagonal.difference)).toBeGreaterThan(
      Math.abs(alongB.difference) * 10,
    );
  });

  it("throws rather than guessing when asked for a cell that is not there", () => {
    expect(() => gap(data, "cc", "zz")).toThrow(/no crossed cell/);
  });

  it("places a value on the axis as a fraction of a window that is not zero based", () => {
    expect(axisFraction(data, 165)).toBeCloseTo(0, 10);
    expect(axisFraction(data, 185)).toBeCloseTo(1, 10);
    expect(axisFraction(data, 175)).toBeCloseTo(0.5, 10);
  });

  it("draws only the named cells, and everything when none are named", () => {
    expect(restrictCrossed(data, { groupIds: ["cc", "pp"] }).cells.map((c) => c.id)).toEqual(
      ["cc", "pp"],
    );
    expect(restrictCrossed(data, {}).cells).toHaveLength(4);
    expect(restrictCrossed(data, { groupIds: [] }).cells).toHaveLength(4);
  });

  it("shares the scale and the reference across the restriction, so nothing moves", () => {
    const setup = restrictCrossed(data, { groupIds: ["cc", "pp"] });
    expect(setup.scale).toEqual(data.scale);
    expect(setup.reference).toEqual(data.reference);
    expect(axisFraction(setup, 172.7)).toBe(axisFraction(data, 172.7));
  });
});

describe("crossed schema", () => {
  const parse = (d: CrossedData) => PuzzleData.safeParse(d);

  it("accepts the fixture", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects a mean outside its own axis window", () => {
    const d = clone();
    d.cells[0]!.mean = 200;
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/outside the 165 to 185 scale/);
  });

  it("rejects a reference outside the window", () => {
    const d = clone();
    d.reference = { label: { en: "Baseline" }, mean: 40 };
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/reference 40 is outside/);
  });

  it("rejects a missing combination, since that is not a crossed design", () => {
    const d = clone();
    d.cells[3] = { id: "dup", aId: "toldcaf", bId: "gotcaf", mean: 173, n: 11 };
    const s = JSON.stringify(parse(d).error?.issues);
    expect(s).toMatch(/two cells for toldcaf with gotcaf/);
    expect(s).toMatch(/no cell for toldpla with gotcaf|is not a crossed design/);
  });

  it("rejects a cell naming a level that does not exist", () => {
    const d = clone();
    d.cells[0]!.aId = "toldnothing";
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(
      /no level with id toldnothing on the first factor/,
    );
  });

  it("rejects four cells with no near-tie among them", () => {
    // Evenly spread: every pair is a visible gap, so no pair can show a factor
    // doing almost nothing and the reveal lands on nothing.
    const d = clone();
    d.cells[0]!.mean = 170;
    d.cells[1]!.mean = 176;
    d.cells[2]!.mean = 172;
    d.cells[3]!.mean = 174;
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/no pair shows a factor doing/);
  });

  it("rejects four identical cells", () => {
    const d = clone();
    for (const c of d.cells) c.mean = 173;
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/all four cells are equal/);
  });

  it("rejects an inverted axis and duplicate level ids", () => {
    const d = clone();
    d.scale = { ...d.scale, min: 185, max: 165 };
    expect(JSON.stringify(parse(d).error?.issues)).toMatch(/scale max must be above/);
    const e = clone();
    e.aLevels = [e.aLevels[0]!, { ...e.aLevels[0]! }];
    expect(JSON.stringify(parse(e).error?.issues)).toMatch(/duplicate level id/);
  });
});
