import { describe, expect, it } from "vitest";
import type { RatingsData } from "../../puzzles/schema";
import {
  anchorPosition,
  distanceFromAnchor,
  gapBetween,
  points,
  restrictRatings,
} from "./ratings";

const t = (en: string) => ({ en });

const data: RatingsData = {
  type: "ratings",
  label: t("Ratings"),
  metricLabel: t("Rated effect"),
  scale: {
    min: 1,
    max: 5,
    minLabel: t("1, large positive"),
    maxLabel: t("5, large negative"),
    anchorAt: 3,
    anchorLabel: t("3, no effect"),
  },
  dispersionLabel: t("one standard deviation"),
  series: [
    { id: "self", label: t("On me") },
    { id: "others", label: t("On other people") },
  ],
  observations: [
    // Authored out of series order on purpose.
    { seriesId: "others", mean: 3.62, sd: 1.07, n: 492 },
    { seriesId: "self", mean: 3.23, sd: 0.64, n: 492 },
  ],
};

describe("ratings derivation", () => {
  it("places a mean as a fraction of its own scale, not of zero", () => {
    // 3.23 on a 1 to 5 scale is 55.75 per cent along, not 64.6 per cent of 5.
    const self = points(data).find((p) => p.seriesId === "self");
    expect(self?.position).toBeCloseTo((3.23 - 1) / 4, 10);
  });

  it("returns points in series order rather than authoring order", () => {
    expect(points(data).map((p) => p.seriesId)).toEqual(["self", "others"]);
  });

  it("puts the dispersion whisker either side of the mean", () => {
    const self = points(data).find((p) => p.seriesId === "self");
    expect(self?.low).toBeCloseTo((3.23 - 0.64 - 1) / 4, 10);
    expect(self?.high).toBeCloseTo((3.23 + 0.64 - 1) / 4, 10);
  });

  it("clamps a whisker that would run off the end of the scale", () => {
    // A mean near an endpoint with a wide sd is common and must not draw
    // outside the axis.
    const edge: RatingsData = {
      ...data,
      observations: [
        { seriesId: "self", mean: 1.2, sd: 0.9, n: 10 },
        { seriesId: "others", mean: 4.9, sd: 0.9, n: 10 },
      ],
    };
    const [a, b] = points(edge);
    expect(a.low).toBe(0);
    expect(b.high).toBe(1);
  });

  it("omits the whisker entirely when the source printed no sd", () => {
    const noSd: RatingsData = {
      ...data,
      observations: [
        { seriesId: "self", mean: 3.23, n: 492 },
        { seriesId: "others", mean: 3.62, n: 492 },
      ],
    };
    expect(points(noSd).every((p) => p.low === undefined && p.high === undefined)).toBe(
      true,
    );
  });

  it("places the anchor where the source put it", () => {
    expect(anchorPosition(data)).toBeCloseTo(0.5, 10);
  });

  it("has no anchor position when the puzzle draws none", () => {
    const { anchorAt, anchorLabel, ...rest } = data.scale;
    void anchorAt;
    void anchorLabel;
    expect(anchorPosition({ ...data, scale: rest })).toBeUndefined();
  });

  it("derives the gap rather than letting a puzzle author it", () => {
    expect(gapBetween(data, "self", "others")).toBe(0.39);
  });

  it("signs the gap by direction", () => {
    expect(gapBetween(data, "others", "self")).toBe(-0.39);
  });

  it("measures distance from the anchor, which is what the lesson turns on", () => {
    expect(distanceFromAnchor(data, "self")).toBe(0.23);
    expect(distanceFromAnchor(data, "others")).toBe(0.62);
  });

  it("returns no anchor distance when there is no anchor", () => {
    const { anchorAt, anchorLabel, ...rest } = data.scale;
    void anchorAt;
    void anchorLabel;
    expect(distanceFromAnchor({ ...data, scale: rest }, "self")).toBeUndefined();
  });
});

describe("ratings restriction", () => {
  it("draws only the series a view asks for", () => {
    const shown = restrictRatings(data, { groupIds: ["self"] });
    expect(shown.series.map((s) => s.id)).toEqual(["self"]);
    expect(shown.observations).toHaveLength(1);
  });

  it("draws everything when the view asks for nothing", () => {
    expect(restrictRatings(data, {}).observations).toHaveLength(2);
  });

  it("never mutates the authored data", () => {
    const before = JSON.stringify(data);
    restrictRatings(data, { groupIds: ["self"] });
    expect(JSON.stringify(data)).toBe(before);
  });
});
