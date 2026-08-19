import { describe, it, expect } from "vitest";
import { buildRunStrip, stripGlyphs } from "./runShare";
import { parseResultLine } from "./result";
import type { RunAnswer } from "../srs/calibrationRun";
import { runNumber } from "../app/dailyRun";

/** A real seed: days since the Unix epoch, as `todayRunDay()` returns it. */
const SEED = Math.floor(Date.UTC(2026, 7, 22) / 86_400_000);

const answer = (correct: boolean): RunAnswer =>
  ({ correct, confidence: "certain" }) as RunAnswer;

describe("the daily run's strip", () => {
  const eight = [true, false, true, true, true, false, true, true].map(answer);

  it("marks each call in the order it was made", () => {
    expect(stripGlyphs(eight)).toBe("🎯🫠🎯🎯🎯🫠🎯🎯");
    // Order carries information: two people with the same score and different
    // strips read the day differently, which is the whole appeal of the grid.
    expect(stripGlyphs([...eight].reverse())).not.toBe(stripGlyphs(eight));
  });

  it("prints the number a player sees, never the seed", () => {
    /*
      THE ONE THAT SHIPPED PAST 2127 TESTS. The conversion used to happen at the
      call site, so `RunStripShare` could hand this the raw day and the strip
      would read "Confoundle run 20684" instead of "run 4". Two numbers of the
      same type, four lines apart, called `day` in both places and meaning
      something different in each. The conversion is in here now, so there is
      nothing at the call site to get wrong.
    */
    const line = buildRunStrip({ day: SEED, answers: eight });
    expect(line).toContain(`Confoundle run ${runNumber(SEED)}`);
    expect(line).not.toContain(String(SEED));
    expect(line).toContain("6/8");
    expect(line).toContain("🎯🫠🎯🎯🎯🫠🎯🎯");
  });

  it("spoils nothing for somebody who has not played", () => {
    /*
      The strip is posted in front of people who are about to play the same
      eight. It may not name an item, a skill, a verdict or a stake.
    */
    const line = buildRunStrip({ day: SEED, answers: eight });
    for (const leak of ["trap", "sound", "certain", "sure", "hunch"]) {
      expect(line.toLowerCase()).not.toContain(leak);
    }
    // And only the two marks, so no third glyph can smuggle a distinction in.
    expect(new Set([...stripGlyphs(eight)]).size).toBe(2);
  });

  it("encodes no stake, because a stake is the one thing worth gaming", () => {
    // Same calls, different staking: identical strips. The run has already had
    // two records removed for being reachable by a staking pattern rather than
    // by reading, and a published one would be a third.
    const timid = eight.map((a) => ({ ...a, confidence: "hunch" }) as RunAnswer);
    expect(stripGlyphs(timid)).toBe(stripGlyphs(eight));
  });

  it("is not mistaken for a puzzle result by the board that parses those", () => {
    /*
      THE TEST THIS FILE EXISTS FOR. `result.ts` carries the other shareable
      line, whose number names a card in the registry, and `FriendsBoard`
      groups by it. A run strip parsed as a puzzle result would file day 20680
      as puzzle 20680 and pool it with a card that does not exist: the same
      cross-denominator defect removed three times already.
    */
    const line = buildRunStrip({ day: SEED, answers: eight });
    expect(parseResultLine(line)).toBeNull();
    for (const one of line.split("\n")) {
      expect(parseResultLine(one)).toBeNull();
    }
  });

  it("handles a run of one and a run of none without drawing nonsense", () => {
    expect(stripGlyphs([])).toBe("");
    expect(buildRunStrip({ day: SEED, answers: [] })).toContain("0/0");
    expect(buildRunStrip({ day: SEED, answers: [answer(true)] })).toContain("1/1");
  });
});
