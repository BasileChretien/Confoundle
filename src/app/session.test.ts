import { describe, it, expect } from "vitest";
import { computeStats } from "./session";
import type { PlayRecord } from "./session";

const rec = (correct: boolean, confidence: PlayRecord["confidence"] = "sure"): PlayRecord => ({
  choiceId: "x",
  correct,
  confidence,
  playedAt: "",
});

describe("computeStats", () => {
  it("counts plays, catches and rate", () => {
    const s = computeStats(
      { "a@2026-07-20": rec(true), "b@2026-07-21": rec(false) },
      "2026-07-21",
    );
    expect(s.played).toBe(2);
    expect(s.caught).toBe(1);
    expect(s.catchRate).toBe(0.5);
  });

  it("counts a run of consecutive days as one streak", () => {
    const s = computeStats(
      {
        "a@2026-07-19": rec(true),
        "b@2026-07-20": rec(true),
        "c@2026-07-21": rec(false),
      },
      "2026-07-21",
    );
    expect(s.currentStreak).toBe(3);
    expect(s.maxStreak).toBe(3);
  });

  it("keeps the streak alive when today isn't played yet but yesterday was", () => {
    const s = computeStats({ "a@2026-07-20": rec(true) }, "2026-07-21");
    expect(s.currentStreak).toBe(1);
  });

  it("breaks the current streak after a missed day", () => {
    const s = computeStats(
      { "a@2026-07-18": rec(true), "b@2026-07-21": rec(true) },
      "2026-07-21",
    );
    expect(s.currentStreak).toBe(1);
    expect(s.maxStreak).toBe(1);
  });

  it("splits accuracy by confidence for calibration", () => {
    const s = computeStats(
      {
        "a@2026-07-20": rec(true, "certain"),
        "b@2026-07-21": rec(false, "certain"),
        "c@2026-07-22": rec(true, "hunch"),
      },
      "2026-07-22",
    );
    expect(s.byConfidence.certain).toEqual({ played: 2, caught: 1 });
    expect(s.byConfidence.hunch).toEqual({ played: 1, caught: 1 });
  });
});
