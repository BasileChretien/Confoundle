import { describe, expect, it } from "vitest";

import { calibrationByDay, calibrationDaysPlayed } from "./session";

/**
 * The calibration week is what the share card draws, so its failure modes are
 * public. Two of them matter more than correctness of the happy path: leaking
 * something about the puzzle, and misreporting a replay as the player's real
 * commit.
 */

const play = (
  slug: string,
  date: string,
  correct: boolean,
  confidence: "hunch" | "sure" | "certain",
  time = "09:00:00",
) => [`${slug}@${date}`, { choiceId: "band-2", correct, confidence, playedAt: `${date}T${time}.000Z` }] as const;

const mapOf = (...entries: ReturnType<typeof play>[]) =>
  Object.fromEntries(entries) as Parameters<typeof calibrationByDay>[2];

describe("the calibration week", () => {
  it("returns one entry per day, oldest first, ending today", () => {
    const week = calibrationByDay(7, "2026-08-14", mapOf());
    expect(week).toHaveLength(7);
    expect(week[0]!.date).toBe("2026-08-08");
    expect(week[6]!.date).toBe("2026-08-14");
  });

  it("reports a day with no play as skipped, carrying no stake", () => {
    const week = calibrationByDay(3, "2026-08-14", mapOf());
    expect(week.every((d) => d.outcome === "skipped")).toBe(true);
    // A skipped day must not invent a confidence, or the card would draw a bar
    // for a day nobody played.
    expect(week.every((d) => d.confidence === undefined)).toBe(true);
  });

  it("carries the outcome and the stake for a day that was played", () => {
    const week = calibrationByDay(2, "2026-08-14", mapOf(play("a", "2026-08-14", false, "certain")));
    expect(week[1]).toEqual({
      date: "2026-08-14",
      outcome: "fooled",
      confidence: "certain",
    });
  });

  it("leaks neither the puzzle nor the answer", () => {
    /**
     * THE ONE THAT MATTERS. This week is rendered onto a card people post
     * while the puzzle is still live for everyone else. If a slug or a choice
     * id ever reaches it, the card becomes a spoiler.
     */
    const week = calibrationByDay(
      2,
      "2026-08-14",
      mapOf(play("the-slot-they-drew", "2026-08-14", true, "sure")),
    );
    const serialised = JSON.stringify(week);
    expect(serialised).not.toContain("the-slot-they-drew");
    expect(serialised).not.toContain("band-2");
    expect(Object.keys(week[1]!).sort()).toEqual(["confidence", "date", "outcome"]);
  });

  it("reports the FIRST play of a day, not a later replay", () => {
    /**
     * A replay happens after the reveal, so its confidence is worthless: the
     * player already knows the answer. Taking the last write would let anyone
     * turn a fooled day into a caught one by replaying, which is both wrong
     * and an invitation to game the card.
     */
    const week = calibrationByDay(
      1,
      "2026-08-14",
      mapOf(
        play("a", "2026-08-14", false, "certain", "08:00:00"),
        play("a-replay", "2026-08-14", true, "certain", "20:00:00"),
      ),
    );
    expect(week[0]!.outcome).toBe("fooled");
  });

  it("ignores days outside the window", () => {
    const week = calibrationByDay(
      2,
      "2026-08-14",
      mapOf(play("old", "2026-07-01", true, "certain")),
    );
    expect(week.every((d) => d.outcome === "skipped")).toBe(true);
  });

  it("counts only played days, which is what gates the strip", () => {
    const week = calibrationByDay(
      7,
      "2026-08-14",
      mapOf(
        play("a", "2026-08-12", true, "sure"),
        play("b", "2026-08-14", false, "certain"),
      ),
    );
    expect(calibrationDaysPlayed(week)).toBe(2);
    // Below three the card keeps the single-day line instead, because one bar
    // reads as a broken chart rather than as a first day.
    expect(calibrationDaysPlayed(week) < 3).toBe(true);
  });
});
