import { describe, it, expect } from "vitest";
import type { EcologicalData } from "../../puzzles/schema";
import {
  formatR,
  higherAtPersonLevel,
  levelsDisagree,
  personRates,
  slopeLine,
} from "./ecological";

/** Robinson's printed 1930 counts, in thousands. */
const robinson: EcologicalData = {
  type: "ecological",
  label: { en: "x" },
  outcomeLabel: { en: "x" },
  unitLabel: { en: "x" },
  xLabel: { en: "x" },
  yLabel: { en: "x" },
  groupCorrelation: -0.53,
  personCorrelation: 0.118,
  schematicNote: { en: "x" },
  scaleNote: { en: "x" },
  groups: [
    { label: { en: "Born abroad" }, affected: 1304, total: 13217 },
    { label: { en: "Born in the country" }, affected: 2614, total: 84055 },
  ],
};

describe("counting people", () => {
  it("derives the rates from the printed counts", () => {
    const [foreign, native] = personRates(robinson);
    // 1,304 of 13,217 is 9.9 percent; 2,614 of 84,055 is 3.1 percent.
    expect(foreign.rate).toBeCloseTo(0.0987, 4);
    expect(native.rate).toBeCloseTo(0.0311, 4);
  });

  it("puts the immigrants higher, which is the direction the reveal turns on", () => {
    expect(higherAtPersonLevel(robinson)).toBe(0);
  });
});

describe("the fallacy itself", () => {
  it("is exactly the two levels disagreeing in sign", () => {
    expect(levelsDisagree(robinson)).toBe(true);
  });

  it("is absent when both levels point the same way", () => {
    expect(levelsDisagree({ ...robinson, groupCorrelation: 0.4 })).toBe(false);
  });
});

describe("drawing the group level", () => {
  it("slopes downward for a negative correlation and upward for a positive one", () => {
    const down = slopeLine(robinson);
    expect(down.y2).toBeGreaterThan(down.y1); // y grows downward on screen
    const up = slopeLine({ ...robinson, groupCorrelation: 0.53, personCorrelation: -0.1 });
    expect(up.y2).toBeLessThan(up.y1);
  });

  it("keeps the line inside the plot at any correlation", () => {
    for (const r of [-1, -0.53, -0.05, 0.05, 0.53, 1]) {
      const l = slopeLine({ ...robinson, groupCorrelation: r, personCorrelation: -r });
      for (const v of [l.y1, l.y2]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("quoting a correlation", () => {
  it("always carries its sign, because the sign is the whole point", () => {
    expect(formatR(-0.53, "en")).toBe("−0.53");
    expect(formatR(0.118, "en")).toBe("+0.12");
  });

  it("writes the decimal separator the reader's language writes", () => {
    // The figure groups its counts in the reader's locale, so a correlation
    // beside them that kept an English decimal point would be the
    // half-localised state `SurrogateView` argues against.
    expect(formatR(-0.53, "fr")).toBe("−0,53");
    expect(formatR(0.118, "ru")).toBe("+0,12");
  });

  it("keeps the typographic minus rather than Intl's hyphen", () => {
    // `signDisplay: "exceptZero"` is the tidier spelling and emits U+002D.
    // This figure has always drawn U+2212, which is what a published
    // correlation is set in, so the sign is still built by hand.
    expect(formatR(-0.53, "en").codePointAt(0)).toBe(0x2212);
    expect(formatR(-0.53, "bn").codePointAt(0)).toBe(0x2212);
  });

  it("draws the digits the locale's own numbering system uses", () => {
    expect(formatR(0.74, "bn")).toBe("+০.৭৪");
  });
});
