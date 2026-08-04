import { describe, expect, it } from "vitest";
import { PuzzleData, type TargetData } from "../../puzzles/schema";
import {
  crowdingRatio,
  headlineGap,
  lateBand,
  targetShape,
} from "./targets";

/** Made up. The real numbers are proved in the puzzle's own test. */
const data: TargetData = {
  type: "target",
  label: { en: "Two teams" },
  targetLabel: { en: "90 per cent in time" },
  targetPercent: 90,
  withinLabel: { en: "In time" },
  breachedLabel: { en: "Late" },
  lateLabel: { en: "In the last stretch" },
  percentNote: { en: "Published shares" },
  performers: [
    {
      id: "a",
      label: { en: "Team A" },
      n: 1000,
      breachPercent: 5,
      lateSharePercent: 40,
    },
    {
      id: "b",
      label: { en: "Team B" },
      n: 800,
      breachPercent: 5.5,
      lateSharePercent: 10,
    },
  ],
};

const parse = (d: unknown) => PuzzleData.safeParse(d);

describe("targetShape", () => {
  it("derives the compliant share rather than taking it on trust", () => {
    const { rows } = targetShape(data);
    expect(rows[0].withinPercent).toBe(95);
    expect(rows[1].withinPercent).toBe(94.5);
  });

  it("splits the compliant part into early and final stretch", () => {
    const { rows } = targetShape(data);
    // 95 in time, 40 of them in the last stretch, so 55 finished before it.
    expect(rows[0].earlyPercent).toBe(55);
    expect(rows[1].earlyPercent).toBe(84.5);
  });

  it("has the three segments of every bar account for everybody", () => {
    for (const r of targetShape(data).rows) {
      expect(r.earlyPercent + r.lateSharePercent + r.breachPercent).toBeCloseTo(
        100,
        10,
      );
    }
  });

  it("works out who passed and by how much", () => {
    const { rows } = targetShape(data);
    expect(rows.map((r) => r.meetsTarget)).toEqual([true, true]);
    expect(rows[0].headroom).toBe(5);
    expect(rows[1].headroom).toBe(4.5);
  });
});

describe("the two numbers the puzzle turns on", () => {
  it("keeps the headline gap small, which is the setup's premise", () => {
    expect(headlineGap(data)).toBeCloseTo(0.5, 10);
  });

  it("reports the crowding as a ratio, naming which side is crowded", () => {
    const c = crowdingRatio(data)!;
    expect(c.crowded.id).toBe("a");
    expect(c.spread.id).toBe("b");
    expect(c.ratio).toBe(4);
  });

  it("returns null rather than dividing by a zero share", () => {
    expect(
      crowdingRatio({
        ...data,
        performers: [
          data.performers[0],
          { ...data.performers[1], lateSharePercent: 0 },
        ],
      }),
    ).toBeNull();
  });

  it("places the final stretch as the tail of the compliant part", () => {
    const { rows } = targetShape(data);
    const band = lateBand(rows[0]);
    // Ends exactly at the deadline, starts 40 points earlier.
    expect(band.end).toBeCloseTo(0.95, 10);
    expect(band.start).toBeCloseTo(0.55, 10);
    expect(band.end - band.start).toBeCloseTo(0.4, 10);
  });
});

describe("the schema refuses data that would break the lesson", () => {
  it("accepts the well-formed case", () => {
    expect(parse(data).success).toBe(true);
  });

  it("rejects a performer that missed the target", () => {
    // The puzzle is about hitting a target and gaming it. A shortfall is a
    // different and much less interesting story.
    const out = parse({
      ...data,
      performers: [
        { ...data.performers[0], breachPercent: 15 },
        data.performers[1],
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects a final stretch wider than the compliant part", () => {
    const out = parse({
      ...data,
      performers: [
        { ...data.performers[0], lateSharePercent: 99 },
        data.performers[1],
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects two performers who crowd the line alike, leaving nothing to reveal", () => {
    const out = parse({
      ...data,
      performers: [
        data.performers[0],
        { ...data.performers[1], lateSharePercent: 38 },
      ],
    });
    expect(out.success).toBe(false);
  });

  it("rejects two performers who already look different in the setup", () => {
    const out = parse({
      ...data,
      performers: [
        data.performers[0],
        { ...data.performers[1], breachPercent: 9 },
      ],
    });
    expect(out.success).toBe(false);
  });
});
