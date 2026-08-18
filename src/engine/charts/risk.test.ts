import { describe, it, expect } from "vitest";
import type { RiskData } from "../../puzzles/schema";
import { formatRiskPct, riskFrameAt, riskSummary } from "./risk";

const text = (en: string) => ({ en });

/** A fixture with round numbers, so every expectation below is checkable by eye. */
const data: RiskData = {
  type: "risk",
  label: text("A trial"),
  outcomeLabel: text("had the event"),
  control: { label: text("No drug"), events: 100, n: 1000 },
  treated: { label: text("Drug"), events: 50, n: 1000 },
  scale: 1000,
  relativeCaption: text("lower risk"),
  absoluteCaption: text("spared per 1,000"),
  nntCaption: text("treated to spare one"),
};

describe("risk derivation", () => {
  it("computes both reductions from the same four integers", () => {
    const s = riskSummary(data);
    expect(s.controlRisk).toBe(0.1);
    expect(s.treatedRisk).toBe(0.05);
    // Half the risk went away...
    expect(s.relativeReduction).toBeCloseTo(0.5, 10);
    // ...but only 5 people in 100 were spared anything.
    expect(s.absoluteReduction).toBeCloseTo(0.05, 10);
  });

  it("keeps the two apart, which is the entire lesson", () => {
    const s = riskSummary(data);
    expect(s.relativeReduction).toBeGreaterThan(s.absoluteReduction);
    expect(s.relativeReduction / s.absoluteReduction).toBeCloseTo(10, 6);
  });

  it("counts what the absolute view speaks in", () => {
    expect(riskSummary(data).avoidedPerScale).toBeCloseTo(50, 6);
    expect(riskSummary({ ...data, scale: 100 }).avoidedPerScale).toBeCloseTo(5, 6);
  });

  it("derives the number needed to treat", () => {
    expect(riskSummary(data).numberNeededToTreat).toBeCloseTo(20, 6);
  });

  it("draws the relative view as a share of the control bar", () => {
    expect(riskSummary(data).remainingShare).toBeCloseTo(0.5, 10);
  });

  it("goes quiet rather than wrong when the drug does nothing", () => {
    const useless: RiskData = {
      ...data,
      treated: { ...data.treated, events: 100 },
    };
    const s = riskSummary(useless);
    expect(s.relativeReduction).toBe(0);
    expect(s.absoluteReduction).toBe(0);
    expect(s.numberNeededToTreat).toBe(Number.POSITIVE_INFINITY);
  });

  it("shows a rarer disease pulling the two numbers apart", () => {
    // Same halving of risk, a tenth of the baseline: relative unchanged,
    // absolute benefit collapses.
    const rare = riskSummary({
      ...data,
      control: { ...data.control, events: 10 },
      treated: { ...data.treated, events: 5 },
    });
    expect(rare.relativeReduction).toBeCloseTo(0.5, 10);
    expect(rare.avoidedPerScale).toBeCloseTo(5, 6);
    expect(rare.numberNeededToTreat).toBeCloseTo(200, 6);
  });

  it("formats percentages without trailing zeroes", () => {
    expect(formatRiskPct(0.31)).toBe("31%");
    expect(formatRiskPct(0.075)).toBe("7.5%");
    expect(formatRiskPct(0.0527)).toBe("5.3%");
  });
});


/**
 * The scrub between the two views, and the property that makes it honest:
 * it interpolates LAYOUT and never VALUES.
 *
 * A bar's height is a position on the page and may move smoothly. A printed
 * number is a claim about the world, and no reading of the source table
 * supports "7.4%" at phase 0.37. On a deck whose stated position is that every
 * figure was read off a table, a tweened numeral would be a fabricated data
 * frame drawn by the app itself.
 */
describe("scrubbing between the two views", () => {
  const s = riskSummary(data);

  it("starts exactly on the relative view the puzzle authored", () => {
    /*
      THE ENDPOINTS ARE THE CONTRACT, asserted with equality rather than
      closeness. A scrub that merely passes near the two authored states shows
      a chart nobody wrote at the two moments a reader actually studies. This
      is also what caught the naive lerp, which missed its own endpoint by
      3e-17 and would have made the assertion below meaningless if softened.
    */
    expect(riskFrameAt(data, 0).fills).toEqual([1, s.remainingShare]);
    expect(riskFrameAt(data, 0).readouts).toBeNull();
    expect(riskFrameAt(data, 0).framed).toBe(false);
  });

  it("ends exactly on the absolute view the puzzle authored", () => {
    expect(riskFrameAt(data, 1).fills).toEqual([s.controlRisk, s.treatedRisk]);
    expect(riskFrameAt(data, 1).readouts).toEqual([
      formatRiskPct(s.controlRisk),
      formatRiskPct(s.treatedRisk),
    ]);
    expect(riskFrameAt(data, 1).framed).toBe(true);
  });

  it("prints no number anywhere in between", () => {
    for (let t = 0; t < 1; t += 0.01) {
      expect(
        riskFrameAt(data, t).readouts,
        `a numeral appeared mid-scrub at phase ${t.toFixed(2)}`,
      ).toBeNull();
    }
  });

  it("moves the control bar one way only, so a drag never doubles back", () => {
    let previous = riskFrameAt(data, 0).fills[0];
    for (let t = 0.02; t <= 1; t += 0.02) {
      const control = riskFrameAt(data, t).fills[0];
      expect(control).toBeLessThanOrEqual(previous + 1e-12);
      previous = control;
    }
  });

  it("clamps rather than extrapolating past either end", () => {
    // A pointer can report a value outside the track, and a bar drawn at
    // -0.2 or 1.4 is a figure nobody authored in either direction.
    expect(riskFrameAt(data, -3)).toEqual(riskFrameAt(data, 0));
    expect(riskFrameAt(data, 9)).toEqual(riskFrameAt(data, 1));
  });

  it("keeps every fill inside the drawn column", () => {
    for (let t = 0; t <= 1; t += 0.05) {
      for (const fill of riskFrameAt(data, t).fills) {
        expect(fill).toBeGreaterThanOrEqual(0);
        expect(fill).toBeLessThanOrEqual(1);
      }
    }
  });
});
