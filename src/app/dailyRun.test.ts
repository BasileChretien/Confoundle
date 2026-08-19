import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { playedDailyRun, recordDailyRun } from "./dailyRun";

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
