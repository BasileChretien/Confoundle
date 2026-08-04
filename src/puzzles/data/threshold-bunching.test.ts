import { describe, expect, it } from "vitest";
import { thresholdBunching } from "./threshold-bunching";
import {
  cliffAcross,
  excessBeforeLine,
  restrictBunching,
} from "../../engine/charts/bunching";

/**
 * Allen, Dechow, Pope and Wu (2017). The six one-minute counts are printed in
 * prose on page 1661 and were read off the rendered page, then checked against
 * the file's text layer. Table 2 on page 1663 was read the same way.
 *
 * The reading is confirmed by Table 2 reconciling nine times over, so those
 * checks live here rather than being asserted in prose. A single misread digit
 * in the table moves one of them.
 */
const raw = thresholdBunching.setup.data;
if (raw.type !== "bunching") throw new Error("expected bunching data");
const data = raw;

const count = (id: string): number => {
  const b = data.bins.find((x) => x.id === id);
  if (!b) throw new Error(`no bin ${id}`);
  return b.count;
};

/**
 * Table 2, page 1663: reference point, actual finishers in the four-minute
 * window, counterfactual finishers from the fitted trend, printed % excess.
 */
const TABLE2 = [
  { at: "3:00", actual: 90762, counterfactual: 73077, pct: 24.2 },
  { at: "3:10", actual: 115770, counterfactual: 109077, pct: 6.1 },
  { at: "3:20", actual: 165968, counterfactual: 164131, pct: 1.1 },
  { at: "3:30", actual: 259756, counterfactual: 234405, pct: 10.8 },
  { at: "4:00", actual: 419945, counterfactual: 371715, pct: 13.0 },
  { at: "4:30", actual: 316967, counterfactual: 303231, pct: 4.5 },
  { at: "5:00", actual: 218170, counterfactual: 206858, pct: 5.5 },
  { at: "5:30", actual: 115737, counterfactual: 113314, pct: 2.1 },
  { at: "6:00", actual: 63643, counterfactual: 61694, pct: 3.2 },
] as const;

describe("threshold bunching data", () => {
  it("carries the six printed one-minute counts", () => {
    expect(data.bins.map((b) => b.count)).toEqual([
      100294, 103018, 97012, 74968, 69648, 67861,
    ]);
  });

  it("puts the line between 3:59 and 4:00", () => {
    expect(data.bins.filter((b) => !b.past).map((b) => b.id)).toEqual([
      "357",
      "358",
      "359",
    ]);
    expect(data.bins.filter((b) => b.past).map((b) => b.id)).toEqual([
      "400",
      "401",
      "402",
    ]);
  });

  it("has a real cliff rather than a continuation of the slope", () => {
    // The three bins before the line vary by a few per cent; the step across
    // it is an order of magnitude bigger than that variation. That contrast is
    // the entire puzzle, so it gets an assertion rather than a comment.
    const before = [count("357"), count("358"), count("359")];
    const wobble =
      (Math.max(...before) - Math.min(...before)) / Math.max(...before);
    const step = cliffAcross(data)?.dropFraction ?? 0;
    expect(wobble).toBeLessThan(0.06);
    expect(step).toBeGreaterThan(0.22);
    expect(step / wobble).toBeGreaterThan(3.5);
  });

  it("derives the drop the reveal quotes", () => {
    const c = cliffAcross(data);
    expect(c?.before).toBe(97012);
    expect(c?.after).toBe(74968);
    expect(c?.drop).toBe(22044);
    expect(thresholdBunching.reveal.explanation.en).toContain("22,044");
  });

  it("derives 29.4 per cent and does not repeat the paper's printed 29.5", () => {
    // The paper states 29.5 per cent more finishers before the line than after.
    // Its own counts give 29.4. The deck derives from the counts and records
    // the discrepancy in the provenance note instead of quoting either figure
    // in the puzzle body.
    expect(Math.round(1000 * (excessBeforeLine(data) ?? 0)) / 10).toBe(29.4);
    const body = `${thresholdBunching.reveal.explanation.en} ${thresholdBunching.reveal.body?.en ?? ""}`;
    expect(body).not.toContain("29.5");
    expect(body).not.toContain("29.4");
  });
});

describe("Table 2, the check on the reading", () => {
  it("recovers every printed excess percentage from the two counts", () => {
    for (const row of TABLE2) {
      const derived =
        Math.round((1000 * (row.actual - row.counterfactual)) / row.counterfactual) / 10;
      expect({ at: row.at, derived }).toEqual({ at: row.at, derived: row.pct });
    }
  });

  it("reproduces two prose claims it was not used to derive", () => {
    const displaced = TABLE2.map((r) => ({
      at: r.at,
      n: r.actual - r.counterfactual,
    }));
    const biggest = displaced.reduce((m, x) => (x.n > m.n ? x : m));
    expect(biggest).toEqual({ at: "4:00", n: 48230 });

    const strongest = TABLE2.reduce((m, x) => (x.pct > m.pct ? x : m));
    expect({ at: strongest.at, pct: strongest.pct }).toEqual({
      at: "3:00",
      pct: 24.2,
    });
  });

  it("keeps the deep dive's numbers matching the table", () => {
    const summary = thresholdBunching.lesson.examples?.[0]?.summary.en ?? "";
    expect(summary).toContain("48,230");
    expect(summary).toContain("17,685");
    expect(summary).toContain("24.2");
    expect(summary).toContain("1.1");
    // 17,685 is the three-hour displacement, and it is not printed in the
    // paper: it is actual minus counterfactual, so it must match the table.
    expect(TABLE2[0].actual - TABLE2[0].counterfactual).toBe(17685);
  });
});

describe("threshold bunching framing", () => {
  it("shows only the bins before the line at the setup", () => {
    expect(thresholdBunching.setup.initialView.groupIds).toEqual([
      "357",
      "358",
      "359",
    ]);
    const shown = restrictBunching(
      data,
      thresholdBunching.setup.initialView,
    );
    expect(shown.bins).toHaveLength(3);
    expect(shown.bins.every((b) => !b.past)).toBe(true);
    const revealed = restrictBunching(data, thresholdBunching.reveal.view);
    expect(revealed.bins).toHaveLength(6);
  });

  it("cannot state the drop at the setup, because it is not drawn", () => {
    expect(
      cliffAcross(restrictBunching(data, thresholdBunching.setup.initialView)),
    ).toBeNull();
  });

  it("tells the reader the question is about size, not direction", () => {
    // Two bands point downward, which the hedge audit forbids unless the
    // discriminator is in the framing. This is that discriminator.
    const framing = thresholdBunching.setup.framing.en;
    expect(framing).toContain("The question is not whether the count falls");
    expect(framing).toContain("how big the step is");
    expect(framing).toContain("commonest time goal");
  });

  it("offers exactly one correct band and makes the smooth reading the trap", () => {
    const correct = thresholdBunching.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("far-lower");
    expect(
      thresholdBunching.choices.find((c) => c.isIntuitiveTrap)?.id,
    ).toBe("little-lower");
  });

  it("puts the correct band around the number that actually occurs", () => {
    // A band saying "around 75,000" has to contain 74,968, or a right answer
    // is being marked by wording rather than by the data.
    const label =
      thresholdBunching.choices.find((c) => c.isCorrect)?.label.en ?? "";
    expect(label).toContain("75,000");
    expect(Math.abs(count("400") - 75000)).toBeLessThan(2500);
  });
});

describe("threshold bunching lesson", () => {
  it("names the Goodhart connection without renaming the puzzle for it", () => {
    const body = thresholdBunching.lesson.body?.en ?? "";
    expect(body).toContain("a measure stops being a good measure once it becomes a target");
    expect(thresholdBunching.reasoningSkill).toBe("threshold-bunching");
  });

  it("separates the mechanism from cheating", () => {
    expect(thresholdBunching.lesson.body?.en ?? "").toContain(
      "Nobody falsified a time",
    );
  });

  it("gives a procedure rather than an attitude", () => {
    const how = thresholdBunching.lesson.howItWorks?.en ?? "";
    expect(how).toContain("what the distribution looks like within a whisker of it");
    expect(how).toContain("mostly the same people");
  });
});

describe("threshold bunching provenance note", () => {
  const note = thresholdBunching.provenance.note?.en ?? "";

  it("records the two independent readings", () => {
    expect(note).toContain("text layer");
  });

  it("records the discrepancy rather than smoothing it over", () => {
    expect(note).toContain("29.5 per cent");
    expect(note).toContain("29.4 per cent");
    expect(note).toContain("one part in a thousand");
  });

  it("flags that the table's counterfactual is fitted, not observed", () => {
    expect(note).toContain("fitted quintic polynomial, not an observation");
  });
});
