import { describe, expect, it } from "vitest";
import { PuzzleData, type SeriesData } from "../../puzzles/schema";
import {
  changeBetween,
  crossoverPoint,
  ratioAt,
  restrictSeries,
  seriesShape,
} from "./series";

/** Made up. The real numbers are proved in the puzzle's own test. */
const data: SeriesData = {
  type: "series",
  label: { en: "Two instruments" },
  metricLabel: { en: "Things counted" },
  statNote: { en: "Made up" },
  lines: [
    { id: "survey", label: { en: "Survey" } },
    { id: "official", label: { en: "Official" } },
  ],
  points: [
    { id: "y1", label: { en: "Year 1" } },
    { id: "y2", label: { en: "Year 2" } },
    { id: "y3", label: { en: "Year 3" } },
    { id: "y4", label: { en: "Year 4" } },
  ],
  observations: [
    { lineId: "survey", pointId: "y1", count: 800 },
    { lineId: "survey", pointId: "y2", count: 700 },
    // y3 deliberately missing for the survey: a suspended year.
    { lineId: "survey", pointId: "y4", count: 400 },
    { lineId: "official", pointId: "y1", count: 500 },
    { lineId: "official", pointId: "y2", count: 750 },
    { lineId: "official", pointId: "y3", count: 900 },
    { lineId: "official", pointId: "y4", count: 1000 },
  ],
};

const parse = (d: unknown) => PuzzleData.safeParse(d);

describe("seriesShape", () => {
  it("scales both lines against the largest count anywhere in the data", () => {
    const { peak, lines } = seriesShape(data);
    expect(peak).toBe(1000);
    expect(lines[0].dots[0].y).toBeCloseTo(0.8, 10);
  });

  it("keeps the first line at the same height when only it is drawn", () => {
    // This is the property the reveal depends on. Drawing the official line
    // alone must not rescale it, so the peak comes from the full data.
    const drawn = restrictSeries(data, { groupIds: ["official"] });
    const alone = seriesShape(drawn, data);
    const together = seriesShape(data);
    const officialTogether = together.lines.find((l) => l.id === "official")!;
    expect(alone.peak).toBe(together.peak);
    expect(alone.lines[0].dots.map((d) => d.y)).toEqual(
      officialTogether.dots.map((d) => d.y),
    );
  });

  it("leaves a gap rather than inventing a value for an unmeasured year", () => {
    const { lines } = seriesShape(data);
    const survey = lines.find((l) => l.id === "survey")!;
    expect(survey.dots.map((d) => d.pointId)).toEqual(["y1", "y2", "y4"]);
    // And the surviving dots keep their true position on the axis, so the gap
    // is visible as a gap rather than closed up.
    expect(survey.dots[2].x).toBe(1);
  });

  it("places points evenly along the axis in array order", () => {
    const { lines } = seriesShape(data);
    const official = lines.find((l) => l.id === "official")!;
    expect(official.dots.map((d) => d.x)).toEqual([0, 1 / 3, 2 / 3, 1]);
  });
});

describe("the crossover, derived and never authored", () => {
  it("finds the first point where the lines have swapped places", () => {
    // Survey starts above (800 to 500) and official is above by y2 (750 to 700).
    expect(crossoverPoint(data)).toBe("y2");
  });

  it("returns null when the lines never swap", () => {
    const parallel: SeriesData = {
      ...data,
      observations: data.observations.map((o) =>
        o.lineId === "official" ? { ...o, count: o.count / 10 } : o,
      ),
    };
    expect(crossoverPoint(parallel)).toBeNull();
  });

  it("measures each line's travel between two named points", () => {
    const changes = changeBetween(data, "y1", "y4");
    const survey = changes.find((c) => c.lineId === "survey")!;
    const official = changes.find((c) => c.lineId === "official")!;
    expect(survey.change).toBeCloseTo(-0.5, 10);
    expect(official.change).toBeCloseTo(1, 10);
  });

  it("reports how far one line stands above the other", () => {
    expect(ratioAt(data, "y4", "official", "survey")).toBeCloseTo(2.5, 10);
    expect(ratioAt(data, "y3", "official", "survey")).toBeNull();
  });
});

describe("the schema refuses data that would break the lesson", () => {
  it("accepts the well-formed case", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects two lines that never swap places", () => {
    const out = parse({
      ...data,
      observations: data.observations.map((o) =>
        o.lineId === "official" ? { ...o, count: o.count / 10 } : o,
      ),
    });
    expect(out.success).toBe(false);
  });

  it("rejects an observation pointing at a line that does not exist", () => {
    const out = parse({
      ...data,
      observations: [...data.observations, { lineId: "nope", pointId: "y1", count: 1 }],
    });
    expect(out.success).toBe(false);
  });

  it("rejects two observations for the same line and point", () => {
    const out = parse({
      ...data,
      observations: [...data.observations, { lineId: "survey", pointId: "y1", count: 9 }],
    });
    expect(out.success).toBe(false);
  });

  it("rejects data where the lines are never both measured together", () => {
    const out = parse({
      ...data,
      observations: [
        { lineId: "survey", pointId: "y1", count: 800 },
        { lineId: "survey", pointId: "y2", count: 700 },
        { lineId: "survey", pointId: "y3", count: 600 },
        { lineId: "official", pointId: "y4", count: 1000 },
        { lineId: "official", pointId: "y1", count: 500 },
        { lineId: "official", pointId: "y2", count: 750 },
      ].filter((o) => !(o.lineId === "official" && o.pointId !== "y4")),
    });
    expect(out.success).toBe(false);
  });
});
