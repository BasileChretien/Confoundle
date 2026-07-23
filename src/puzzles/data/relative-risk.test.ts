import { describe, it, expect } from "vitest";
import { relativeRisk } from "./relative-risk";
import { Puzzle } from "../schema";
import { formatRiskPct, riskSummary } from "../../engine/charts/risk";

const data = relativeRisk.setup.data;
if (data.type !== "risk") {
  throw new Error("relative-risk must use the risk shape");
}
const s = riskSummary(data);

/**
 * Every number the puzzle says out loud is derived from four integers, so this
 * is where the prose and the chart are held to each other. If a count is ever
 * mistyped, the reveal's "23 men in a thousand" and the choices' "about 23"
 * stop matching the figure, and these fail.
 */
describe("relative-risk seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(relativeRisk).success).toBe(true);
  });

  it("matches the published event counts", () => {
    expect(data.control.events).toBe(248);
    expect(data.treated.events).toBe(174);
    expect(data.control.n + data.treated.n).toBe(6595); // the trial's total
  });

  it("derives the two risks the reveal quotes", () => {
    expect(formatRiskPct(s.controlRisk)).toBe("7.5%");
    expect(formatRiskPct(s.treatedRisk)).toBe("5.3%");
    // "about 75 men in 1,000" against "about 53"
    expect(Math.round(s.controlRisk * 1000)).toBe(75);
    expect(Math.round(s.treatedRisk * 1000)).toBe(53);
  });

  it("is about a third in relative terms", () => {
    expect(s.relativeReduction).toBeGreaterThan(0.29);
    expect(s.relativeReduction).toBeLessThan(0.32);
  });

  it("is about 23 in a thousand in absolute terms", () => {
    expect(Math.round(s.avoidedPerScale)).toBe(23);
  });

  it("gives the number needed to treat the choices promise", () => {
    expect(Math.round(s.numberNeededToTreat)).toBe(44);
  });

  it("keeps the trap an order of magnitude away from the truth", () => {
    // The point of the puzzle: "a third" of 1,000 people is not the answer,
    // and it is out by more than tenfold.
    const thirdOfEveryone = s.relativeReduction * data.scale;
    expect(thirdOfEveryone / s.avoidedPerScale).toBeGreaterThan(10);
  });

  it("opens on the relative view and reveals the absolute one", () => {
    expect(relativeRisk.setup.initialView.kind).toBe("relative");
    expect(relativeRisk.reveal.view.kind).toBe("absolute");
  });
});
