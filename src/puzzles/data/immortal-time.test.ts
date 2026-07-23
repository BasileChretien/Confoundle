import { describe, it, expect } from "vitest";
import { immortalTime } from "./immortal-time";
import { Puzzle } from "../schema";
import {
  atRiskTime,
  countedTime,
  immortalSummary,
  immortalTime as immortalTimeOf,
} from "../../engine/charts/timeline";

const data = immortalTime.setup.data;
if (data.type !== "timeline") {
  throw new Error("immortal-time must use the timeline shape");
}

const track = (id: string) => data.tracks.find((t) => t.id === id)!;

/**
 * The figure here is schematic, so these tests cannot check it against a
 * source. What they can check is that it still SHOWS the thing the puzzle
 * claims: a treated track whose immortal stretch is over half its counted time,
 * an untreated track with none, and a setup that flatters the drug for a reason
 * that has nothing to do with the drug.
 */
describe("immortal-time seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(immortalTime).success).toBe(true);
  });

  it("gives the treated track an immortal stretch and the untreated none", () => {
    expect(immortalTimeOf(track("treated"))).toBe(11);
    expect(immortalTimeOf(track("untreated"))).toBe(0);
    expect(track("untreated").immortalUntil).toBeUndefined();
  });

  it("marks the immortal stretch as ending exactly at the prescription", () => {
    // If these ever drifted apart the figure would shade a stretch that is not
    // the one the explanation describes.
    expect(track("treated").immortalUntil).toBe(track("treated").detectedAt);
  });

  it("echoes the published proportion: over half the counted time is immortal", () => {
    const treated = track("treated");
    expect(countedTime(treated)).toBe(22);
    expect(atRiskTime(treated)).toBe(11);
    // The paper's own split is 291.1 immortal against 276.3 at risk, which is
    // 51.3 percent immortal. The schematic must not undersell that.
    const share = immortalTimeOf(treated) / countedTime(treated);
    expect(share).toBeGreaterThanOrEqual(0.5);
  });

  it("summarises the whole figure the way the reveal describes it", () => {
    const summary = immortalSummary(data);
    expect(summary.counted).toBe(26); // 22 treated plus 4 untreated
    expect(summary.immortal).toBe(11);
    expect(summary.atRisk).toBe(15);
    expect(summary.counted).toBe(summary.immortal + summary.atRisk);
  });

  it("makes the drug look good for a reason that is not the drug", () => {
    // The setup's whole force is that the treated bar is far longer. That has
    // to be true of the data, not just of the prose.
    expect(countedTime(track("treated"))).toBeGreaterThan(
      countedTime(track("untreated")) * 4,
    );
    // And once the immortal stretch is struck out, the gap narrows sharply.
    const before = countedTime(track("treated")) / countedTime(track("untreated"));
    const after = atRiskTime(track("treated")) / countedTime(track("untreated"));
    expect(after).toBeLessThan(before / 1.9);
  });

  it("dies before the prescription in the untreated track, which is the mechanism", () => {
    // The untreated patient must die before the treated one's prescription,
    // otherwise the point that early deaths are forced into the untreated
    // group is not visible in the figure.
    expect(track("untreated").diedAt).toBeLessThan(track("treated").detectedAt);
  });

  it("opens on the counted view and reveals the marked one", () => {
    expect(immortalTime.setup.initialView.kind).toBe("counted");
    expect(immortalTime.reveal.view.kind).toBe("immortal");
  });
});

describe("the immortal-time schema guards", () => {
  const base = JSON.parse(JSON.stringify(immortalTime)) as typeof immortalTime;

  it("refuses an immortal stretch that runs past the death", () => {
    const broken = JSON.parse(JSON.stringify(base));
    broken.setup.data.tracks[0].immortalUntil = 99;
    expect(Puzzle.safeParse(broken).success).toBe(false);
  });

  it("refuses an immortal view with nothing to shade", () => {
    // Otherwise the reveal draws exactly the setup and the beat is empty.
    const broken = JSON.parse(JSON.stringify(base));
    delete broken.setup.data.tracks[0].immortalUntil;
    expect(Puzzle.safeParse(broken).success).toBe(false);
  });

  it("still accepts a timeline with no immortal stretch at all", () => {
    // The field is optional, so lead-time and length-time must be unaffected.
    const plain = JSON.parse(JSON.stringify(base));
    delete plain.setup.data.tracks[0].immortalUntil;
    plain.setup.initialView = { kind: "survival" };
    plain.reveal.view = { kind: "lifespan" };
    expect(Puzzle.safeParse(plain).success).toBe(true);
  });
});
