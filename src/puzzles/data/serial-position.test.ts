import { describe, expect, it } from "vitest";

import { serialPosition } from "./serial-position";
import type { RatesData } from "../schema";

/**
 * Source reconciliation for Ginsburgh and van Ours 2003, Table 2. Every number
 * the card draws is checked against the paper's own totals and statistic here,
 * so a later edit that "tidies" a count has to answer to the arithmetic.
 */
const data = serialPosition.setup.data as RatesData;
const obs = (groupId: string) => {
  const o = data.observations.find((x) => x.groupId === groupId);
  if (!o) throw new Error(`no observation for ${groupId}`);
  return o;
};

describe("the counts as published", () => {
  it("draws Table 2 exactly", () => {
    expect(obs("first")).toMatchObject({ numerator: 1, denominator: 11 });
    expect(obs("others")).toMatchObject({ numerator: 59, denominator: 121 });
  });

  it("reconciles to the 132 finalists the paper describes", () => {
    // Twelve finalists in each of eleven competitions.
    expect(obs("first").denominator + obs("others").denominator).toBe(132);
    expect(12 * 11).toBe(132);
  });

  it("has exactly one opening performer per competition", () => {
    // Eleven competitions, one musician opens each. If this ever stops being
    // 11 the group has been redefined and the whole claim changes.
    expect(obs("first").denominator).toBe(11);
  });

  it("agrees with the chi-squared the paper prints", () => {
    // Table 2's other cells: 10 below average among the first performers, 62
    // among the others. Recomputing from the four counts must give the 6.4 the
    // paper states, or the card and the source have drifted apart.
    const a = 10;
    const b = obs("first").numerator; // 1 above average
    const c = 62;
    const d = obs("others").numerator; // 59 above average
    const n = a + b + c + d;
    expect(n).toBe(132);
    const chi = (n * Math.pow(a * d - b * c, 2)) / ((a + b) * (c + d) * (a + c) * (b + d));
    expect(chi).toBeCloseTo(6.4, 1);
    // And it clears the critical value the paper names for 1 degree of freedom.
    expect(chi).toBeGreaterThan(3.84);
  });

  it("gives the percentages the reveal quotes", () => {
    const pct = (g: string) => (100 * obs(g).numerator) / obs(g).denominator;
    expect(pct("others")).toBeCloseTo(48.8, 1);
    expect(pct("first")).toBeCloseTo(9.1, 1);
  });
});

describe("the beats", () => {
  it("opens on the many and reveals the few", () => {
    // The setup draws the 121 alone; naming the eleven there would hand over
    // the entire reveal.
    expect(serialPosition.setup.initialView.groupIds).toEqual(["others"]);
    expect(serialPosition.reveal.view.groupIds).toBeUndefined();
  });

  it("keeps the framing sentence that earns the answer key", () => {
    /**
     * THE HEDGE GUARD. Framed only as "the order is random", the correct answer
     * is "nothing happens", and marking that wrong is the defect that had to be
     * repaired on the halo card. What licenses a direction is the fact that the
     * judges had never heard the concerto either and could not revise a mark.
     * Cutting these sentences silently would restore the defect, so they are
     * pinned here.
     */
    const framing = serialPosition.setup.framing.en;
    expect(framing).toContain("none of them has ever heard it played");
    expect(framing).toContain("cannot be changed once it has been turned in");
  });

  it("marks the lottery answer as the trap and only that one", () => {
    const traps = serialPosition.choices.filter((c) => c.isIntuitiveTrap);
    expect(traps).toHaveLength(1);
    expect(traps[0]!.id).toBe("about-the-same");
    const correct = serialPosition.choices.filter((c) => c.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0]!.id).toBe("worse");
  });

  it("offers four bands that point four different ways", () => {
    // The hedge rule's operational test: no two bands may share the direction
    // the setup licenses.
    expect(serialPosition.choices.map((c) => c.id)).toEqual([
      "about-the-same",
      "worse",
      "better",
      "talent-wins",
    ]);
  });
});

describe("the honesty constraints", () => {
  it("states the size of the group the claim rests on", () => {
    // Eleven people and one above-average rating. If this disappears from the
    // reveal the card is overselling a group of eleven.
    expect(serialPosition.reveal.body?.en).toContain("eleven musicians ever opened a final");
  });

  it("says the drawn outcome is a career measure, not the judges' marks", () => {
    expect(serialPosition.provenance.note?.en).toContain("downstream career outcome");
    expect(serialPosition.provenance.note?.en).toContain("11 of the 25");
  });

  it("does not draw the regression coefficients it quotes", () => {
    // They are in the reveal as prose. Drawing them would be a figure built out
    // of coefficients, which this project does not do.
    expect(serialPosition.reveal.explanation.en).toContain("2.958");
    expect(JSON.stringify(data)).not.toContain("2.958");
  });
});
