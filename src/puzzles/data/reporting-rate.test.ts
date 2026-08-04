import { describe, expect, it } from "vitest";
import { reportingRate } from "./reporting-rate";
import {
  changeBetween,
  crossoverPoint,
  ratioAt,
  restrictSeries,
  seriesShape,
} from "../../engine/charts/series";

/**
 * Source reconciliation for Francis and Walby (2025), read at source from the
 * open-access article, off the rendered tables rather than off a text layer and
 * never from the abstract.
 *
 * The paper prints counts, so unlike a percentages-only source there is nothing
 * to reconstruct: every number authored is a printed integer. What this file
 * checks is that the integers are the ones printed, that every derived quantity
 * in the puzzle's copy really follows from them, and that the two published
 * summaries the paper states in prose are reproduced from the tables.
 */

/** Table 5 (survey) and Table 6 (police), aligned totals, exactly as printed. */
const TABLES = {
  survey: {
    "2010-11": 872_361,
    "2013-14": 848_967,
    "2015-16": 776_001,
    "2017-18": 561_724,
    "2019-20": 575_933,
    "2022-23": 407_806,
  },
  police: {
    "2010-11": 576_484,
    "2013-14": 550_850,
    "2015-16": 794_937,
    "2017-18": 1_044_306,
    "2019-20": 1_190_845,
    "2022-23": 1_293_402,
  },
} as const;

/**
 * The paper's prose disagrees with its own tables in two places. Recorded here
 * so the difference is documented rather than quietly absorbed, and asserted to
 * be absent from the authored data.
 */
const PROSE_VARIANTS = ["1293492", "1,293,492", "848467", "848,467"];

const data = reportingRate.setup.data;
if (data.type !== "series") throw new Error("expected series data");

const yearOf = (pointId: string) =>
  data.points.find((p) => p.id === pointId)!.label.en as keyof typeof TABLES.survey;

describe("the authored counts are the printed table values", () => {
  it("carries every survey figure from Table 5 and every police figure from Table 6", () => {
    for (const o of data.observations) {
      const table = TABLES[o.lineId as "survey" | "police"];
      expect(table[yearOf(o.pointId)]).toBe(o.count);
    }
    // And nothing extra: six years, two instruments, twelve observations.
    expect(data.observations).toHaveLength(12);
    expect(new Set(data.observations.map((o) => o.pointId)).size).toBe(6);
  });

  it("uses the table values rather than the two figures the prose gives", () => {
    const { provenance, ...playerFacing } = reportingRate;
    const beats = JSON.stringify(playerFacing);
    for (const wrong of PROSE_VARIANTS) expect(beats).not.toContain(wrong);
    // The provenance note is the one place they belong, because its job is to
    // say which reading was taken and why.
    const note = JSON.stringify(provenance);
    expect(note).toContain("1,293,492");
    expect(note).toContain("848,467");
  });
});

describe("the paper's published summaries recompute from the tables", () => {
  it("reproduces the 134 per cent rise and the fall of just over half", () => {
    const changes = changeBetween(data, "y2013", "y2022");
    const police = changes.find((c) => c.lineId === "police")!;
    const survey = changes.find((c) => c.lineId === "survey")!;
    // The paper says the police series rose by 134 per cent.
    expect(police.change * 100).toBeCloseTo(134.8, 1);
    // And that the survey series fell by just over half.
    expect(survey.change * 100).toBeCloseTo(-52.0, 1);
    expect(survey.change).toBeLessThan(-0.5);
  });

  it("puts the police series at 3.17 times the survey by 2022-23", () => {
    expect(ratioAt(data, "y2022", "police", "survey")!).toBeCloseTo(3.17, 2);
    expect(ratioAt(data, "y2022", "police", "survey")!).toBeGreaterThan(3);
  });

  it("finds the crossover in 2015-16 rather than taking it on trust", () => {
    // Authored nowhere: the shape derives it from the counts.
    expect(crossoverPoint(data)).toBe("y2015");
    // Before it, the survey finds more violence than the police record.
    expect(TABLES.survey["2013-14"]).toBeGreaterThan(TABLES.police["2013-14"]);
    // At it and after it, the other way round.
    expect(TABLES.police["2015-16"]).toBeGreaterThan(TABLES.survey["2015-16"]);
    expect(TABLES.police["2022-23"]).toBeGreaterThan(TABLES.survey["2022-23"]);
  });
});

describe("the reveal adds a line without moving the one already drawn", () => {
  it("keeps the police line at exactly the same heights in both beats", () => {
    // This is the property the whole puzzle rests on. If the setup rescaled,
    // the reveal would be a different chart and the player would be right to
    // distrust it.
    const setupView = restrictSeries(data, { groupIds: ["police"] });
    const setup = seriesShape(setupView, data);
    const reveal = seriesShape(data);
    const policeInReveal = reveal.lines.find((l) => l.id === "police")!;
    expect(setup.peak).toBe(reveal.peak);
    expect(setup.lines[0].dots.map((d) => d.y)).toEqual(
      policeInReveal.dots.map((d) => d.y),
    );
    expect(setup.lines).toHaveLength(1);
  });

  it("shows the player only the police series before they commit", () => {
    expect(reportingRate.setup.initialView).toEqual({
      kind: "oneinstrument",
      groupIds: ["police"],
    });
    // Both series live in one data object, as every puzzle's reveal data does;
    // what the setup beat draws is the restricted copy, and that is what has to
    // be clean.
    const drawn = restrictSeries(data, { groupIds: ["police"] });
    expect(drawn.lines.map((l) => l.id)).toEqual(["police"]);
    expect(drawn.observations.every((o) => o.lineId === "police")).toBe(true);

    // And no survey figure may appear in the prose the player reads first.
    const { data: _data, ...prose } = reportingRate.setup;
    void _data;
    const visible = JSON.stringify({ prose, choices: reportingRate.choices });
    for (const n of Object.values(TABLES.survey)) {
      expect(visible).not.toContain(String(n));
      expect(visible).not.toContain(n.toLocaleString("en-US"));
    }

    // The figure's own caption is drawn under both beats, so it must not give
    // the second instrument away. Everything about the alignment between the
    // two series lives in the crossover label, which only the reveal draws.
    for (const s of [data.label.en, data.metricLabel.en, data.statNote.en])
      expect(s.toLowerCase()).not.toContain("survey");
    expect(data.crossoverLabel!.en).toContain("survey");
  });
});

describe("the commit beat is answerable and the hedge is the right answer", () => {
  it("marks only the hedge correct, and warns that the count counts records", () => {
    const correct = reportingRate.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("cannot-tell");
    // The discriminator lives in the framing, the statistical-power pattern:
    // the player is told the line counts what was recorded and asked about the
    // violence, so a careful reader can separate the two without the reveal.
    expect(reportingRate.setup.framing.en).toContain("offences the police recorded");
    expect(reportingRate.setup.question.en).toContain("violence");
  });

  it("gives exactly one trap and no second band that could also be defended", () => {
    const traps = reportingRate.choices.filter((c) => c.isIntuitiveTrap);
    expect(traps).toHaveLength(1);
    expect(traps[0].id).toBe("doubled");
    // The three wrong bands each assert something the single drawn line cannot
    // establish: a real rise, a fall, or a cause for the rise.
    expect(reportingRate.choices.map((c) => c.id)).toEqual([
      "doubled",
      "fell",
      "recording",
      "cannot-tell",
    ]);
  });
});

describe("what the puzzle refuses to claim", () => {
  it("never presents the survey as the true measure", () => {
    const said = JSON.stringify(reportingRate);
    // The survey's own limitations are stated in the beats, not buried in the
    // provenance note, because the lesson is that neither instrument is clean.
    expect(reportingRate.reveal.body!.en).toContain("42 per cent");
    expect(said).toContain("improved recording");
  });

  it("draws no year the paper does not tabulate", () => {
    const printed = Object.keys(TABLES.survey);
    expect(data.points.map((p) => p.label.en)).toEqual(printed);
  });
});
