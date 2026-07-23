import { describe, it, expect } from "vitest";
import type { RiskData } from "../../puzzles/schema";
import { formatRiskPct, riskSummary } from "./risk";

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
