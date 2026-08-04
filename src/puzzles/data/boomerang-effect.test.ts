import { describe, expect, it } from "vitest";
import { boomerangEffect } from "./boomerang-effect";
import { restrictRates } from "../../engine/charts/rates";

/**
 * Hovland, Harvey and Sherif (1957), Table 3 on page 249, read off the rendered
 * page and then confirmed against the file's text layer, which agreed on every
 * digit.
 *
 * The table prints percentages, so the counts are reconstructed. This file
 * carries the reconstruction rather than trusting it: every printed percentage
 * is resolved by enumerating all possible integers out of the stated group
 * size, and the surviving integers must be unique and must sum to that group
 * size. A misread digit fails one of those two conditions.
 */
const raw = boomerangEffect.setup.data;
if (raw.type !== "rates") throw new Error("expected rates data");
const data = raw;

const cell = (groupId: string): [number, number] => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return [o.numerator, o.denominator];
};

/** Every integer out of `n` whose share rounds to the printed percentage. */
const candidates = (pct: number, n: number): number[] => {
  const out: number[] = [];
  for (let k = 0; k <= n; k++)
    if (Number(((100 * k) / n).toFixed(1)) === pct) out.push(k);
  return out;
};

/** Table 3, page 249: per cent changing towards, not at all, and away. */
const TABLE3 = [
  { row: "drys hear the wet speech", n: 69, pct: [27.5, 49.3, 23.2], net: 4.5 },
  { row: "unselected hear the wet speech", n: 92, pct: [52.2, 23.9, 23.9], net: 28.3 },
  { row: "wets hear the dry speech", n: 25, pct: [24.0, 56.0, 20.0], net: 4.0 },
  { row: "drys hear the moderate speech", n: 114, pct: [31.6, 49.1, 19.3], net: 12.3 },
] as const;

describe("the reconstruction", () => {
  it("resolves each printed percentage to exactly one integer", () => {
    for (const { row, n, pct } of TABLE3)
      for (const p of pct)
        expect({ row, p, options: candidates(p, n).length }).toEqual({
          row,
          p,
          options: 1,
        });
  });

  it("has those integers sum to the printed group size", () => {
    // The group size is a printed quantity that was not used to pick the
    // integers, so this is the check that the reading is right.
    for (const { row, n, pct } of TABLE3) {
      const total = pct.reduce((s, p) => s + candidates(p, n)[0], 0);
      expect({ row, total }).toEqual({ row, total: n });
    }
  });

  it("gives the counts the puzzle authors", () => {
    const [towards, unchanged, away] = TABLE3[0].pct.map(
      (p) => candidates(p, 69)[0],
    );
    expect([towards, unchanged, away]).toEqual([19, 34, 16]);
    expect(cell("towards")).toEqual([19, 69]);
    expect(cell("unchanged")).toEqual([34, 69]);
    expect(cell("away")).toEqual([16, 69]);
  });

  it("accounts for every one of the 69", () => {
    const sum = data.observations.reduce((s, o) => s + o.numerator, 0);
    expect(sum).toBe(69);
    expect(data.observations.every((o) => o.denominator === 69)).toBe(true);
  });
});

describe("the discrepancies, recorded rather than smoothed", () => {
  it("notes that the drys' printed net does not follow from their own cells", () => {
    const derived = Number((((19 - 16) / 69) * 100).toFixed(1));
    expect(derived).toBe(4.3);
    expect(TABLE3[0].net).toBe(4.5);
    // The reveal says "about four per cent", which is what the paper's own
    // prose says, rather than quoting either figure to a decimal.
    const body = `${boomerangEffect.reveal.explanation.en} ${boomerangEffect.reveal.body?.en ?? ""}`;
    expect(body).toContain("about four per cent");
    expect(body).not.toContain("4.5");
    expect(body).not.toContain("4.3");
  });

  it("records the row where no integer produces the printed percentage", () => {
    // The unselected group hearing the dry speech: 33.4 per cent of 87 is not
    // any whole number of people. This row is not used by the puzzle.
    expect(candidates(33.4, 87)).toEqual([]);
    expect(boomerangEffect.provenance.note?.en ?? "").toContain("33.4 per cent");
  });

  it("recovers the other three nets exactly", () => {
    for (const { row, n, pct, net } of TABLE3.slice(1)) {
      const [toward, , away] = pct.map((p) => candidates(p, n)[0]);
      const derived = Number((((toward - away) / n) * 100).toFixed(1));
      expect({ row, derived }).toEqual({ row, derived: net });
    }
  });
});

describe("boomerang framing", () => {
  it("shows only the people who moved towards the speech", () => {
    expect(boomerangEffect.setup.initialView.groupIds).toEqual(["towards"]);
    const shown = restrictRates(
      boomerangEffect.setup.data as never,
      boomerangEffect.setup.initialView,
    );
    expect(shown.observations).toHaveLength(1);
    const revealed = restrictRates(
      boomerangEffect.setup.data as never,
      boomerangEffect.reveal.view,
    );
    expect(revealed.observations).toHaveLength(3);
  });

  it("gives the reader the towards count so the question is answerable", () => {
    // Without the 19 on the table, "how many moved away" has no scale and the
    // bands would be guesses.
    expect(boomerangEffect.setup.question.en).toContain("Nineteen of the 69");
  });

  it("does not let the setup reveal the answer by subtraction", () => {
    // Showing the unchanged bar as well would leave 69 minus 19 minus 34, and
    // the reader could just compute it.
    const shown = restrictRates(
      boomerangEffect.setup.data as never,
      boomerangEffect.setup.initialView,
    );
    expect(shown.observations.map((o) => o.groupId)).not.toContain("unchanged");
  });

  it("offers one correct band, at the number that actually occurred", () => {
    const correct = boomerangEffect.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].id).toBe("nearly-as-many");
    expect(correct[0].label.en).toContain("Sixteen");
    expect(cell("away")[0]).toBe(16);
    expect(boomerangEffect.choices.find((c) => c.isIntuitiveTrap)?.id).toBe("a-few");
  });

  it("keeps the wrong bands genuinely wrong", () => {
    // "More than nineteen" has to be false, or the deck would be teaching that
    // backfire is the normal outcome, which this study does not show.
    expect(cell("away")[0]).toBeLessThan(cell("towards")[0]);
  });
});

describe("boomerang lesson", () => {
  it("refuses to sell the non-significant comparison", () => {
    const body = boomerangEffect.reveal.body?.en ?? "";
    expect(body).toContain("not statistically significant");
    expect(body).toContain("a hint, not a finding");
  });

  it("makes the point about net figures hiding both directions", () => {
    const how = boomerangEffect.lesson.howItWorks?.en ?? "";
    expect(how).toContain("thirty up and twenty-seven down");
    expect(how).toContain("counting both directions");
  });

  it("does not overcorrect into never stating a position", () => {
    const how = boomerangEffect.lesson.howItWorks?.en ?? "";
    expect(how).toContain("not an argument for having no position");
  });

  it("keeps the deep dive matching the table", () => {
    const summary = boomerangEffect.lesson.examples?.[0]?.summary.en ?? "";
    expect(summary).toContain("Forty-eight");
    expect(summary).toContain("22");
    const [toward, unchanged, away] = TABLE3[1].pct.map((p) => candidates(p, 92)[0]);
    expect([toward, unchanged, away]).toEqual([48, 22, 22]);
  });
});

describe("boomerang provenance note", () => {
  const note = boomerangEffect.provenance.note?.en ?? "";

  it("explains the reconstruction and its test", () => {
    expect(note).toContain("enumerating every possibility");
    expect(note).toContain("19, 34 and 16");
    expect(note).toContain("48, 22 and 22");
  });

  it("states the limit on what the puzzle claims", () => {
    expect(note).toContain("not statistically significant");
    expect(note).toContain("equally persuasive");
  });
});
