import { describe, expect, it } from "vitest";

import { puzzles } from "../../puzzles/all";
import type { ConditionalData } from "../../puzzles/schema";
import {
  restrictConditional,
  rowSeries,
  scaleFraction,
  spreadOf,
  spreadRatio,
} from "./conditional";

/**
 * A hand-built fixture rather than a shipped puzzle, so that the arithmetic
 * below keeps meaning what it says when the deck's content changes. The one
 * test that DOES read the registry is the last one, and it is deliberately
 * written to iterate rather than to name a puzzle.
 */
const DATA: ConditionalData = {
  type: "conditional",
  label: { en: "Score out of nine" },
  metricLabel: { en: "Mean score" },
  factorLabel: { en: "The cue" },
  meanNote: { en: "Means as published." },
  scale: { min: 1, max: 9, minLabel: { en: "low" }, maxLabel: { en: "high" } },
  rows: [
    { id: "strong", label: { en: "Strong" } },
    { id: "weak", label: { en: "Weak" } },
  ],
  columns: [
    { id: "up", label: { en: "Up" } },
    { id: "none", label: { en: "None" }, isBaseline: true },
    { id: "down", label: { en: "Down" } },
  ],
  cells: [
    { rowId: "strong", columnId: "up", mean: 6.7, sd: 1.57, n: 10 },
    { rowId: "strong", columnId: "none", mean: 6.6, sd: 1.35, n: 10 },
    { rowId: "strong", columnId: "down", mean: 5.9, sd: 1.6, n: 10 },
    { rowId: "weak", columnId: "up", mean: 5.2, sd: 1.55, n: 10 },
    { rowId: "weak", columnId: "none", mean: 4.7, sd: 1.95, n: 10 },
    { rowId: "weak", columnId: "down", mean: 2.7, sd: 1.34, n: 10 },
  ],
};

describe("rowSeries", () => {
  it("keeps rows and columns in authored order", () => {
    const series = rowSeries(DATA);
    expect(series.map((s) => s.rowId)).toEqual(["strong", "weak"]);
    // Column order is what the renderer walks left to right, so a silent
    // re-sort here would redraw every chart on this shape.
    expect(series[0]!.points.map((p) => p.columnId)).toEqual([
      "up",
      "none",
      "down",
    ]);
  });

  it("carries the mean, the n and the sd through untouched", () => {
    const first = rowSeries(DATA)[0]!.points[0]!;
    expect(first).toEqual({
      rowId: "strong",
      columnId: "up",
      mean: 6.7,
      sd: 1.57,
      n: 10,
    });
  });

  it("measures spread as widest minus narrowest mean", () => {
    const [strong, weak] = rowSeries(DATA);
    expect(strong!.spread).toBeCloseTo(0.8, 10); // 6.7 - 5.9
    expect(weak!.spread).toBeCloseTo(2.5, 10); // 5.2 - 2.7
  });

  it("throws rather than drawing a hole when a cell is missing", () => {
    // The schema rejects an incomplete grid, so reaching this means the schema
    // was bypassed. Silently omitting the point would draw a chart that looks
    // finished and is not.
    const holed: ConditionalData = {
      ...DATA,
      cells: DATA.cells.filter((c) => c.columnId !== "down"),
    };
    expect(() => rowSeries(holed)).toThrow(/no cell for/);
  });
});

describe("spreadOf and spreadRatio", () => {
  it("names the row it is asked about", () => {
    expect(spreadOf(DATA, "weak")).toBeCloseTo(2.5, 10);
    expect(() => spreadOf(DATA, "absent")).toThrow(/no row absent/);
  });

  it("divides the wide row by the narrow one", () => {
    expect(spreadRatio(DATA, "weak", "strong")).toBeCloseTo(2.5 / 0.8, 10);
  });

  it("is not symmetric, so the argument direction matters", () => {
    // Guards against a refactor that sorts the two rows before dividing, which
    // would make every ratio come out at least 1 and hide a reversed claim.
    expect(spreadRatio(DATA, "strong", "weak")).toBeCloseTo(0.8 / 2.5, 10);
  });

  it("returns infinity rather than NaN on a flat reference row", () => {
    const flat: ConditionalData = {
      ...DATA,
      cells: DATA.cells.map((c) =>
        c.rowId === "strong" ? { ...c, mean: 6 } : c,
      ),
    };
    expect(spreadRatio(flat, "weak", "strong")).toBe(Number.POSITIVE_INFINITY);
  });
});

describe("scaleFraction", () => {
  it("places a mean on the authored scale, not on the data range", () => {
    // 1..9, so the midpoint is 5 and NOT the mean of the six cells.
    expect(scaleFraction(DATA, 1)).toBeCloseTo(0, 10);
    expect(scaleFraction(DATA, 5)).toBeCloseTo(0.5, 10);
    expect(scaleFraction(DATA, 9)).toBeCloseTo(1, 10);
    expect(scaleFraction(DATA, 6.7)).toBeCloseTo((6.7 - 1) / 8, 10);
  });

  it("centres rather than dividing by zero on a degenerate scale", () => {
    const point: ConditionalData = { ...DATA, scale: { ...DATA.scale, max: 1 } };
    expect(scaleFraction(point, 1)).toBe(0.5);
  });
});

describe("restrictConditional", () => {
  it("drops the rows a beat did not name, and their cells with them", () => {
    const setup = restrictConditional(DATA, { groupIds: ["strong"] });
    expect(setup.rows.map((r) => r.id)).toEqual(["strong"]);
    expect(setup.cells).toHaveLength(3);
    expect(setup.cells.every((c) => c.rowId === "strong")).toBe(true);
  });

  it("leaves the columns and the scale alone", () => {
    // Restricting a row must not rescale the axis, or the setup and the reveal
    // would draw the same mean at two different heights and the reveal would
    // look like new data rather than more of it.
    const setup = restrictConditional(DATA, { groupIds: ["strong"] });
    expect(setup.columns).toEqual(DATA.columns);
    expect(setup.scale).toEqual(DATA.scale);
  });

  it("returns everything when no rows are named", () => {
    expect(restrictConditional(DATA, {})).toEqual(DATA);
    expect(restrictConditional(DATA, { groupIds: [] })).toEqual(DATA);
  });

  it("does not mutate the data it was given", () => {
    const before = JSON.stringify(DATA);
    restrictConditional(DATA, { groupIds: ["weak"] });
    expect(JSON.stringify(DATA)).toBe(before);
  });
});

describe("every shipped conditional puzzle", () => {
  // Iterates the registry rather than naming a puzzle, so a second card on this
  // shape is covered the day it lands instead of the day someone remembers.
  const shipped = puzzles.filter((p) => p.setup.data.type === "conditional");

  it("has at least one, or this whole file is dead weight", () => {
    expect(shipped.length).toBeGreaterThan(0);
  });

  for (const puzzle of shipped) {
    it(`reveals a superset of what ${puzzle.id} set up`, () => {
      const data = puzzle.setup.data as ConditionalData;
      const setupRows = restrictConditional(
        data,
        puzzle.setup.initialView,
      ).rows.map((r) => r.id);
      const revealRows = restrictConditional(
        data,
        puzzle.reveal.view ?? {},
      ).rows.map((r) => r.id);
      expect(setupRows.length).toBeGreaterThan(0);
      // Superset, and strictly bigger: a reveal that redraws the setup exactly
      // has no reveal in it.
      for (const id of setupRows) expect(revealRows).toContain(id);
      expect(revealRows.length).toBeGreaterThan(setupRows.length);
    });

    it(`draws every ${puzzle.id} mean inside its authored scale`, () => {
      const data = puzzle.setup.data as ConditionalData;
      for (const point of rowSeries(data).flatMap((s) => s.points)) {
        const f = scaleFraction(data, point.mean);
        expect(f).toBeGreaterThanOrEqual(0);
        expect(f).toBeLessThanOrEqual(1);
      }
    });
  }
});
