import { describe, expect, it } from "vitest";
import { sleeperEffect } from "./sleeper-effect";
import { crossesOver, restrictDrift, seriesPoints } from "../../engine/charts/drift";

/**
 * Hovland and Weiss (1951), Tables 3 and 6, read from the rendered pages 643
 * and 645 because `pdftotext` scrambles both, putting the group sizes on the
 * wrong rows.
 *
 * The paper prints percentages, not counts, so the counts here are recovered.
 * These tests carry the whole reconciliation that made that safe, and they
 * recompute it from the authored numbers rather than asserting the published
 * figures directly, so a single mistyped count fails several of them at once.
 */
const raw = sleeperEffect.setup.data;
if (raw.type !== "drift") throw new Error("expected drift data");
const data = raw;

const at = (seriesId: string, checkpointId: string) => {
  const o = data.observations.find(
    (x) => x.seriesId === seriesId && x.checkpointId === checkpointId,
  );
  if (!o) throw new Error(`no observation for ${seriesId}/${checkpointId}`);
  return o;
};

const pct = (seriesId: string, checkpointId: string) => {
  const o = at(seriesId, checkpointId);
  return Number(((100 * o.net) / o.denominator).toFixed(1));
};

/** Table 3, per topic: net count and the group size it was measured over. */
const TABLE3 = {
  high: [
    [7, 31],
    [9, 25],
    [8, 35],
    [4, 31],
  ],
  low: [
    [4, 30],
    [0, 36],
    [-1, 26],
    [5, 30],
  ],
} as const;

/** Table 6, the further change from immediately after to four weeks later. */
const TABLE6 = {
  high: [
    [-2, 31],
    [-4, 25],
    [-4, 35],
    [-3, 31],
  ],
  low: [
    [2, 30],
    [5, 36],
    [4, 26],
    [-2, 30],
  ],
} as const;

const sum = (rows: ReadonlyArray<readonly [number, number]>) =>
  rows.reduce((s, r) => s + r[0], 0);

describe("sleeper effect data", () => {
  it("carries the four authored net counts", () => {
    expect(at("high", "immediately").net).toBe(28);
    expect(at("low", "immediately").net).toBe(8);
    expect(at("high", "four-weeks").net).toBe(15);
    expect(at("low", "four-weeks").net).toBe(17);
  });

  it("measures every cell over the 122 readers per column", () => {
    for (const o of data.observations) expect(o.denominator).toBe(122);
  });

  it("recovers the immediate counts from Table 3's four topics", () => {
    // Each topic's printed percentage times its printed group size gives a
    // whole number of readers, and the four sum to the authored total.
    expect(sum(TABLE3.high)).toBe(at("high", "immediately").net);
    expect(sum(TABLE3.low)).toBe(at("low", "immediately").net);
  });

  it("recovers the four-week counts by adding Table 6 to Table 3", () => {
    expect(sum(TABLE3.high) + sum(TABLE6.high)).toBe(at("high", "four-weeks").net);
    expect(sum(TABLE3.low) + sum(TABLE6.low)).toBe(at("low", "four-weeks").net);
  });

  it("reproduces the four printed column averages", () => {
    // 23.0 and 6.6 in Table 3, -10.7 and 7.4 in Table 6. None of these was used
    // to derive the counts, so all four are independent checks.
    const avg = (n: number) => Number(((100 * n) / 122).toFixed(1));
    expect(avg(sum(TABLE3.high))).toBe(23.0);
    expect(avg(sum(TABLE3.low))).toBe(6.6);
    expect(avg(sum(TABLE6.high))).toBe(-10.7);
    expect(avg(sum(TABLE6.low))).toBe(7.4);
  });

  it("reproduces the five printed differences in Table 6", () => {
    // The B minus A column: +13.2, +29.9, +26.8, +3.0, and +18.1 for the row
    // of averages. The paper subtracts its own ROUNDED percentages rather than
    // the exact values, which is visible here: topic one is 6.7 minus -6.5, not
    // 6.6667 minus -6.4516, and those give 13.2 and 13.1 respectively. Matching
    // the paper's arithmetic is the point of the test, so it rounds first.
    const p1 = (n: number, d: number) => Number(((100 * n) / d).toFixed(1));
    const diffs = TABLE6.low.map((l, i) =>
      Number((p1(l[0], l[1]) - p1(TABLE6.high[i][0], TABLE6.high[i][1])).toFixed(1)),
    );
    expect(diffs).toEqual([13.2, 29.9, 26.8, 3.0]);
    const avgDiff = p1(sum(TABLE6.low), 122) - p1(sum(TABLE6.high), 122);
    expect(Number(avgDiff.toFixed(1))).toBe(18.1);
  });

  it("adds counts rather than percentages, which changes the answer", () => {
    // Summing the printed percentages gives the distrusted source 14.0 at four
    // weeks. Summing the counts gives 13.9. The counts are what was measured,
    // and this test exists so nobody 'corrects' the file back to 14.0.
    expect(pct("low", "four-weeks")).toBe(13.9);
    expect(Number((6.6 + 7.4).toFixed(1))).toBe(14.0);
  });

  it("puts the trusted source at 23.0 and 12.3", () => {
    expect(pct("high", "immediately")).toBe(23.0);
    expect(pct("high", "four-weeks")).toBe(12.3);
  });

  it("keeps the crossover the whole lesson rests on", () => {
    // Asserted through the derivation rather than against two literals, so it
    // stays true if the data is ever re-read.
    expect(crossesOver(data, "high", "low")).toBe(true);
    expect(pct("high", "immediately")).toBeGreaterThan(pct("low", "immediately"));
    expect(pct("low", "four-weeks")).toBeGreaterThan(pct("high", "four-weeks"));
  });

  it("has the trusted source fall and the other rise", () => {
    const high = seriesPoints(data, "high").map((p) => p.percent);
    const low = seriesPoints(data, "low").map((p) => p.percent);
    expect(high[1]).toBeLessThan(high[0]);
    expect(low[1]).toBeGreaterThan(low[0]);
  });
});

describe("sleeper effect framing", () => {
  it("shows only the immediate checkpoint at the setup", () => {
    expect(sleeperEffect.setup.initialView.strataIds).toEqual(["immediately"]);
  });

  it("really withholds the four-week bars", () => {
    const shown = restrictDrift(sleeperEffect.setup.data as never, {
      strataIds: sleeperEffect.setup.initialView.strataIds,
    });
    expect(shown.observations).toHaveLength(2);
    const revealed = restrictDrift(sleeperEffect.setup.data as never, {
      strataIds: sleeperEffect.reveal.view.strataIds,
    });
    expect(revealed.observations).toHaveLength(4);
  });

  it("explains that the bar is a balance, not a headcount", () => {
    // Without this the reader would take a net of 28 for 28 people persuaded.
    const framing = sleeperEffect.setup.framing.en;
    expect(framing).toContain("minus the share who moved away");
    expect(data.baselineLabel.en).toContain("balance rather than a headcount");
  });

  it("gives the reasoner the handle without giving the answer", () => {
    // The source was one line; the argument ran for pages. That licenses the
    // inference, which is what makes marking the hedge wrong legitimate.
    expect(sleeperEffect.setup.framing.en).toContain("name of its source at the head");
    const hedge = sleeperEffect.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
  });

  it("offers exactly one band carrying the direction the skill licenses", () => {
    const gainers = sleeperEffect.choices.filter((c) =>
      /distrusted source's readers/i.test(c.label.en),
    );
    expect(gainers).toHaveLength(1);
    expect(gainers[0].isCorrect).toBe(true);
    expect(sleeperEffect.choices.find((c) => c.isIntuitiveTrap)?.id).toBe(
      "trusted-still",
    );
  });

  it("corrects the forgetting story the effect is usually told with", () => {
    const body = sleeperEffect.reveal.body?.en ?? "";
    expect(body).toContain("That turned out not to be it");
    expect(body).toContain("no longer used that fact");
  });
});

describe("sleeper effect lesson", () => {
  it("answers the nobody-believes-that-outlet argument", () => {
    const body = sleeperEffect.lesson.body?.en ?? "";
    expect(body).toContain("does no harm because nobody believes it");
  });

  it("gives a defence you can act on rather than an instruction to be careful", () => {
    const how = sleeperEffect.lesson.howItWorks?.en ?? "";
    expect(how).toContain("Writing down why you dismissed something");
    expect(how).toContain("Refusing to repeat a claim you do not believe");
  });

  it("states the symmetry, that trusted sources decay too", () => {
    expect(sleeperEffect.lesson.howItWorks?.en ?? "").toContain("uncomfortable half");
  });
});

describe("sleeper effect provenance note", () => {
  const note = sleeperEffect.provenance.note?.en ?? "";

  it("says why the shape was needed", () => {
    expect(note).toContain("signed quantity");
    expect(note).toContain("five of the sixteen cells");
  });

  it("records the counts-not-percentages decision", () => {
    expect(note).toContain("14.0 per cent, where adding the counts gives 13.9");
  });

  it("concedes the effect is conditional rather than selling it", () => {
    const deepDive = sleeperEffect.lesson.examples?.[0];
    expect(deepDive?.summary.en).toContain("Capon and Hulbert");
    expect(deepDive?.summary.en).toContain("accept the null hypothesis");
    expect(deepDive?.provenance.doi).toBe("10.1037/0033-2909.130.1.143");
  });

  it("admits the study used the weaker arrangement", () => {
    expect(note).toContain("named the source before the article");
    expect(note).toContain("understates");
  });
});
