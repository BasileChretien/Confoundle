import { describe, it, expect } from "vitest";
import { applyReview, newProgress, type SkillProgress } from "./schedule";
import {
  LocalProgressStore,
  exportAll,
  importAll,
  mergeProgress,
  parseStored,
  serialise,
} from "./store";

const T0 = 1_700_000_000_000;

/** An in-memory store, so these tests never touch a real browser API. */
class MemoryStore {
  private data: SkillProgress[] = [];
  async load() {
    return this.data;
  }
  async save(all: SkillProgress[]) {
    this.data = all;
  }
  async clear() {
    this.data = [];
  }
}

describe("reading stored progress", () => {
  it("survives an empty, absent or corrupt store", () => {
    expect(parseStored(null)).toEqual([]);
    expect(parseStored("")).toEqual([]);
    expect(parseStored("not json")).toEqual([]);
    expect(parseStored("{}")).toEqual([]);
    expect(parseStored('{"version":1}')).toEqual([]);
  });

  it("refuses data written by a different schema version", () => {
    const raw = JSON.stringify({
      version: 99,
      updatedAt: T0,
      skills: [newProgress("simpsons-paradox", T0)],
    });
    expect(parseStored(raw)).toEqual([]);
  });

  it("drops individual records that are not progress, keeping the rest", () => {
    const good = newProgress("simpsons-paradox", T0);
    const raw = JSON.stringify({
      version: 1,
      updatedAt: T0,
      skills: [good, { skill: "broken" }, null, 42, { ...good, stage: "three" }],
    });
    // A half-valid record would corrupt scheduling silently, so it is rejected
    // rather than coerced.
    expect(parseStored(raw)).toEqual([good]);
  });

  it("round-trips what it wrote", () => {
    const all = [newProgress("a", T0), newProgress("b", T0)];
    expect(parseStored(serialise(all, T0))).toEqual(all);
  });
});

describe("merging two devices", () => {
  it("keeps whichever record for a skill was touched last", () => {
    const early = newProgress("simpsons-paradox", T0);
    const later = applyReview(
      early,
      { correct: true, confidence: "sure", itemId: "sp-schools" },
      T0 + 60_000,
    );
    expect(mergeProgress([early], [later])[0]).toEqual(later);
    // Order of the arguments must not decide the winner.
    expect(mergeProgress([later], [early])[0]).toEqual(later);
  });

  it("unions skills that only one side has", () => {
    const merged = mergeProgress(
      [newProgress("a", T0)],
      [newProgress("b", T0)],
    );
    expect(merged.map((p) => p.skill)).toEqual(["a", "b"]);
  });

  it("is idempotent, so a repeated sync changes nothing", () => {
    const all = [newProgress("b", T0), newProgress("a", T0)];
    const once = mergeProgress(all, []);
    expect(mergeProgress(once, once)).toEqual(once);
  });
});

describe("export and import", () => {
  it("carries a local learner's history into another store", async () => {
    const from = new MemoryStore();
    await from.save([
      applyReview(
        newProgress("simpsons-paradox", T0),
        { correct: true, confidence: "certain", itemId: "sp-schools" },
        T0,
      ),
    ]);

    const to = new MemoryStore();
    const merged = await importAll(to, await exportAll(from, T0));

    expect(merged).toEqual(await from.load());
    expect(await to.load()).toEqual(merged);
  });

  it("merges rather than overwrites, so importing cannot silently destroy progress", async () => {
    const store = new MemoryStore();
    await store.save([newProgress("a", T0)]);
    const merged = await importAll(
      store,
      serialise([newProgress("b", T0)], T0),
    );
    expect(merged.map((p) => p.skill)).toEqual(["a", "b"]);
  });

  it("ignores a corrupt import instead of wiping what is there", async () => {
    const store = new MemoryStore();
    const existing = [newProgress("a", T0)];
    await store.save(existing);
    expect(await importAll(store, "garbage")).toEqual(existing);
  });
});

describe("the local store", () => {
  /**
   * The test runner has no DOM, so stand up the smallest localStorage that
   * behaves like the real one. Using a shim rather than switching the whole
   * suite to jsdom keeps the other 150 tests running in plain node.
   */
  function withLocalStorage(): void {
    const data = new Map<string, string>();
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, String(v)),
      removeItem: (k: string) => void data.delete(k),
      clear: () => data.clear(),
    };
  }

  it("degrades quietly when storage is unavailable, rather than throwing", async () => {
    delete (globalThis as Record<string, unknown>).localStorage;
    const store = new LocalProgressStore(() => T0);
    // Private browsing and quota-exceeded both look like this. A puzzle game
    // must still be playable; it just will not remember.
    await expect(store.save([newProgress("a", T0)])).resolves.toBeUndefined();
    expect(await store.load()).toEqual([]);
    await expect(store.clear()).resolves.toBeUndefined();
  });

  it("saves, reloads and then erases completely", async () => {
    withLocalStorage();
    const store = new LocalProgressStore(() => T0);
    await store.clear();
    expect(await store.load()).toEqual([]);

    const all = [newProgress("simpsons-paradox", T0)];
    await store.save(all);
    expect(await store.load()).toEqual(all);

    // This is the deletion primitive a data-erasure request resolves to.
    await store.clear();
    expect(await store.load()).toEqual([]);
  });
});
