import { describe, expect, it } from "vitest";
import type { DriftData } from "../../puzzles/schema";
import {
  crossesOver,
  maxExcursion,
  points,
  restrictDrift,
  seriesPoints,
} from "./drift";

const t = (en: string) => ({ en });

const data: DriftData = {
  type: "drift",
  label: t("Movement"),
  metricLabel: t("Net movers"),
  baselineLabel: t("Where they started"),
  series: [
    { id: "a", label: t("A") },
    { id: "b", label: t("B") },
  ],
  checkpoints: [
    { id: "then", label: t("Then") },
    { id: "later", label: t("Later") },
  ],
  observations: [
    // Authored out of order on purpose, so the ordering helper is really tested.
    { seriesId: "b", checkpointId: "later", net: 12, denominator: 100 },
    { seriesId: "a", checkpointId: "then", net: 20, denominator: 100 },
    { seriesId: "b", checkpointId: "then", net: 4, denominator: 100 },
    { seriesId: "a", checkpointId: "later", net: -6, denominator: 100 },
  ],
};

describe("drift derivation", () => {
  it("derives a signed percentage from a signed count", () => {
    const all = points(data);
    expect(all.find((p) => p.seriesId === "a" && p.checkpointId === "later")?.percent).toBe(-6);
    expect(all.find((p) => p.seriesId === "b" && p.checkpointId === "later")?.percent).toBe(12);
  });

  it("keeps negative movement negative rather than taking a magnitude", () => {
    // The entire reason this shape exists. A shape that lost the sign would
    // draw a fall as a rise.
    expect(points(data).some((p) => p.percent < 0)).toBe(true);
  });

  it("orders a series by checkpoint, not by authoring order", () => {
    expect(seriesPoints(data, "a").map((p) => p.checkpointId)).toEqual([
      "then",
      "later",
    ]);
    expect(seriesPoints(data, "a").map((p) => p.net)).toEqual([20, -6]);
  });

  it("scales both directions off one excursion", () => {
    // 20 up is the largest movement anywhere, so a 6 down must be drawn at
    // 6/20 of the axis rather than filling the downward half.
    expect(maxExcursion(data)).toBe(20);
  });

  it("detects a crossover, which is what the lesson turns on", () => {
    expect(crossesOver(data, "a", "b")).toBe(true);
  });

  it("does not call it a crossover when the order holds", () => {
    const parallel: DriftData = {
      ...data,
      observations: [
        { seriesId: "a", checkpointId: "then", net: 20, denominator: 100 },
        { seriesId: "a", checkpointId: "later", net: 15, denominator: 100 },
        { seriesId: "b", checkpointId: "then", net: 4, denominator: 100 },
        { seriesId: "b", checkpointId: "later", net: 9, denominator: 100 },
      ],
    };
    expect(crossesOver(parallel, "a", "b")).toBe(false);
  });

  it("does not call a tie a crossover", () => {
    const tied: DriftData = {
      ...data,
      observations: [
        { seriesId: "a", checkpointId: "then", net: 10, denominator: 100 },
        { seriesId: "a", checkpointId: "later", net: 5, denominator: 100 },
        { seriesId: "b", checkpointId: "then", net: 10, denominator: 100 },
        { seriesId: "b", checkpointId: "later", net: 9, denominator: 100 },
      ],
    };
    expect(crossesOver(tied, "a", "b")).toBe(false);
  });

  it("compares like with like when denominators differ", () => {
    // A net of 9 out of 60 is a bigger movement than 12 out of 100, and the
    // derivation has to say so or the chart would rank raw counts.
    const uneven: DriftData = {
      ...data,
      observations: [
        { seriesId: "a", checkpointId: "then", net: 1, denominator: 100 },
        { seriesId: "a", checkpointId: "later", net: 12, denominator: 100 },
        { seriesId: "b", checkpointId: "then", net: 1, denominator: 60 },
        { seriesId: "b", checkpointId: "later", net: 9, denominator: 60 },
      ],
    };
    const last = (id: string) => seriesPoints(uneven, id).slice(-1)[0].percent;
    expect(last("b")).toBeGreaterThan(last("a"));
  });
});

describe("drift restriction", () => {
  it("draws only the checkpoints a view asks for", () => {
    const shown = restrictDrift(data, { strataIds: ["then"] });
    expect(shown.checkpoints.map((c) => c.id)).toEqual(["then"]);
    expect(shown.observations).toHaveLength(2);
  });

  it("draws only the series a view asks for", () => {
    const shown = restrictDrift(data, { groupIds: ["a"] });
    expect(shown.series.map((s) => s.id)).toEqual(["a"]);
    expect(shown.observations).toHaveLength(2);
  });

  it("draws everything when the view asks for nothing", () => {
    expect(restrictDrift(data, {}).observations).toHaveLength(4);
  });

  it("never mutates the authored data", () => {
    const before = JSON.stringify(data);
    restrictDrift(data, { groupIds: ["a"], strataIds: ["then"] });
    expect(JSON.stringify(data)).toBe(before);
  });
});
