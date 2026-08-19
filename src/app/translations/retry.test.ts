import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * What `loadDictionary` promises, and what it cannot.
 *
 * THIS FILE PREVIOUSLY ASSERTED SOMETHING FALSE. It was written to prove that a
 * locale whose chunk failed would be retried on the next call, and it passed,
 * because `vi.doMock`'s factory is re-invoked after it throws: the mock models a
 * loader you can ask twice. A browser does not. A dynamic `import()` that fails
 * is recorded in the realm's module map against that specifier, and every later
 * `import()` of it rejects straight from the map. Measured, not assumed: three
 * sequential imports of a missing module gave three rejections and exactly one
 * network request. So the retry re-entered the function, re-invoked the loader,
 * and was refused instantly, having fetched nothing.
 *
 * The lesson is narrower than "mocks lie". It is that a mock stands in for a
 * dependency's INTERFACE and not for its rules, and this dependency's rule,
 * that a failure is permanent, was the entire subject of the test. When the
 * thing under test is a failure path, find out what the real failure does
 * before modelling it.
 *
 * So these assert what is true and breakable: the failure resolves rather than
 * rejecting, so nothing blocks; it is REMEMBERED, so the app does not re-enter
 * a load that cannot succeed; a success is remembered too; and callers
 * arriving together share one request.
 */
describe("loadDictionary", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("./bn");
  });

  /**
   * The load that fails must still settle, because `LocaleProvider` renders
   * NOTHING until it does. A rejection here is not an English fallback, it is
   * a white screen.
   */
  it("resolves when the chunk fails, so the app still renders", async () => {
    vi.doMock("./bn", () => {
      throw new Error("chunk failed to load");
    });
    const { loadDictionary } = await import("./index");
    await expect(loadDictionary("bn")).resolves.toBeUndefined();
  });

  /**
   * AND THE FAILURE IS REMEMBERED. This is the one that guards both halves of
   * the mechanism at once, which is why it counts loader calls rather than
   * reading the cache: it fails if the `catch` stops recording the failure,
   * AND it fails if `loadDictionary` stops consulting the cache before
   * re-entering.
   *
   * That second half had no guard at all. Review deleted
   * `if (cache.has(locale)) return Promise.resolve()` outright and the whole
   * suite passed, 166 files and 2225 tests, because nothing anywhere called
   * this function twice for one locale and then looked at what happened.
   */
  it("remembers a failure instead of asking again", async () => {
    let attempts = 0;
    vi.doMock("./bn", () => {
      attempts += 1;
      throw new Error("chunk failed to load");
    });
    const { loadDictionary, cachedDictionary } = await import("./index");

    await loadDictionary("bn");
    expect(attempts).toBe(1);
    await loadDictionary("bn");
    await loadDictionary("bn");
    expect(attempts).toBe(1);

    /*
      And what it remembers reads as "English for now" rather than as a
      dictionary: `translate` falls through an empty object to the default
      locale, and `LocaleProvider` sees a cache hit and never drops `ready`,
      which is what stops a failed locale unmounting the whole subtree beneath
      the provider, auth and puzzle state with it.
    */
    expect(cachedDictionary("bn")).toEqual({});
  });

  /**
   * The same question for the path that works, and it guards the cache WRITE
   * where the test above guards the read.
   *
   * COUNTING IMPORTS CANNOT PROVE THIS ONE, and an earlier version tried:
   * `import("./bn")` is deduped by the ES module registry, so the count stays
   * at one with the cache deleted outright. Reading `cachedDictionary` is what
   * separates them, because that is the value every caller depends on being
   * there without awaiting.
   */
  it("remembers a dictionary that landed, so it can be read without awaiting", async () => {
    vi.doMock("./bn", () => ({ bn: { hello: "হ্যালো" } }));
    const { loadDictionary, cachedDictionary } = await import("./index");

    expect(cachedDictionary("bn")).toBeUndefined();
    await loadDictionary("bn");
    expect(cachedDictionary("bn")).toEqual({ hello: "হ্যালো" });
  });

  /**
   * And that callers arriving together share one in-flight request.
   *
   * PINNING PROMISE IDENTITY ON PURPOSE, which is worth saying out loud
   * because it makes a semantically neutral refactor fail: returning
   * `existing.then(() => {})` is identical for every caller and turns this
   * red. Identity is asserted anyway because every wider formulation proves
   * nothing here. Counting imports is deduped by the module registry, and
   * counting requests needs a browser. What `inFlight` uniquely provides, and
   * the only part of it observable from this file, is that the second caller
   * gets the FIRST caller's promise instead of a second chain racing to write
   * the same cache entry.
   *
   * The narrow reading is deliberate. If this ever fails on a refactor that
   * kept the behaviour, widen the test; do not assume the refactor broke
   * something.
   */
  it("hands concurrent callers the same in-flight promise", async () => {
    vi.doMock("./bn", () => ({ bn: { hello: "হ্যালো" } }));
    const { loadDictionary } = await import("./index");

    const first = loadDictionary("bn");
    const second = loadDictionary("bn");
    expect(second).toBe(first);
    await Promise.all([first, second]);
  });
});
