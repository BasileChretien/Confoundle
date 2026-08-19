import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  playedDailyRun,
  recordDailyRun,
  runCountsTowardRecord,
  runNumber,
} from "./dailyRun";

function memoryStorage(seed: Record<string, string> = {}) {
  const m = new Map<string, string>(Object.entries(seed));
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
    map: m,
  };
}

const TODAY = 20_680;

describe("one scored attempt a day", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("is unspent until it is played", () => {
    expect(playedDailyRun(TODAY)).toBe(false);
    recordDailyRun(TODAY);
    expect(playedDailyRun(TODAY)).toBe(true);
  });

  it("comes back tomorrow", () => {
    recordDailyRun(TODAY);
    expect(playedDailyRun(TODAY + 1)).toBe(false);
  });

  it("cannot be won back by moving the clock", () => {
    /*
      Stored as a day rather than a set, and compared with `>=`, so a device
      whose clock goes backwards reports today as already spent instead of
      handing out a second scored attempt. A daily whose score can be farmed by
      replaying is not a measurement of anything.
    */
    recordDailyRun(TODAY);
    expect(playedDailyRun(TODAY - 1)).toBe(true);
    expect(playedDailyRun(TODAY - 400)).toBe(true);
  });

  it("does not move the record backwards", () => {
    const store = memoryStorage();
    vi.stubGlobal("localStorage", store);
    recordDailyRun(TODAY);
    recordDailyRun(TODAY - 5);
    expect(store.map.get("confoundle:dailyrun:v1")).toBe(String(TODAY));
  });

  it("treats unreadable storage as unspent rather than as spent", () => {
    // The generous failure: it costs an extra counted attempt, never a lost
    // one. Refusing to score somebody because their storage is blocked would
    // make the mode disappear for them with no explanation.
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
      removeItem: () => {},
      clear: () => {},
    });
    expect(playedDailyRun(TODAY)).toBe(false);
    expect(() => recordDailyRun(TODAY)).not.toThrow();
  });

  it("ignores a corrupt value instead of throwing into the beat", () => {
    vi.stubGlobal("localStorage", memoryStorage({ "confoundle:dailyrun:v1": "yesterday" }));
    expect(playedDailyRun(TODAY)).toBe(false);
  });
});

describe("the number a player sees", () => {
  it("counts from the day the daily started, not from 1970", () => {
    /*
      The seed is days since the Unix epoch, because every day-keyed thing here
      already is. Shown raw that reads "#20680", which looks like a bug rather
      than a counter. These two numbers must never be confused: one seeds the
      draw and keys the record, the other is for human eyes and for the strip.
    */
    const first = Math.floor(Date.UTC(2026, 7, 19) / 86_400_000);
    expect(runNumber(first)).toBe(1);
    expect(runNumber(first + 1)).toBe(2);
    expect(runNumber(first + 364)).toBe(365);
  });

  it("is not the seed", () => {
    const first = Math.floor(Date.UTC(2026, 7, 19) / 86_400_000);
    expect(runNumber(first)).not.toBe(first);
  });
});

describe("what may touch the record", () => {
  it("refuses the daily replayed after its scored attempt", () => {
    /*
      THE FIX THAT HAD NO GUARD. `drawDailyRun` is pure in the day, so a replay
      is the same eight items in the same order, after the player has been shown
      every answer. The record counts correct calls, which is confidence-blind
      and not memory-blind, so a guaranteed 8 of 8 would go in as a best.
    */
    expect(runCountsTowardRecord(true, false)).toBe(false);
  });

  it("allows every draw that is actually a draw", () => {
    // A first daily attempt is a fresh set, and a private run excludes what it
    // has recently shown, so neither is a guaranteed repeat.
    expect(runCountsTowardRecord(true, true)).toBe(true);
    expect(runCountsTowardRecord(false, true)).toBe(true);
    expect(runCountsTowardRecord(false, false)).toBe(true);
  });
});
