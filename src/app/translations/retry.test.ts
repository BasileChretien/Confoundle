import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * A DICTIONARY THAT FAILED TO LOAD IS NOT A DICTIONARY SAYING "USE ENGLISH".
 *
 * `loadDictionary` swallows a failed chunk load on purpose: English is always
 * available as the source text, so an offline reader gets a working app rather
 * than a blank one. That part is right and stays.
 *
 * What was wrong was writing `{}` into the same cache the early return
 * consults. One dropped request pinned that locale to English for the whole
 * session, with no retry and nothing said anywhere. The reader picks Bengali
 * on a train, the request fails once, and the ten-language app they were
 * promised is an English app until they think to reload it.
 *
 * Nothing could have caught it by inspection: the failure path and the success
 * path both resolve, both leave the app rendering, and the only difference is
 * a language. So the test drives the failure directly, by making the module
 * that holds the dictionary throw on first import and succeed on the second.
 */
describe("loadDictionary", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("./bn");
  });

  it("retries a locale whose chunk failed, instead of pinning it to English", async () => {
    let attempt = 0;
    vi.doMock("./bn", () => {
      attempt += 1;
      if (attempt === 1) throw new Error("chunk failed to load");
      return { bn: { hello: "হ্যালো" } };
    });

    const { loadDictionary, cachedDictionary } = await import("./index");

    // The failure resolves rather than rejecting, so the app renders.
    await expect(loadDictionary("bn")).resolves.toBeUndefined();
    // And it leaves no answer behind, which is what lets the next call retry.
    expect(cachedDictionary("bn")).toBeUndefined();

    await loadDictionary("bn");
    expect(attempt).toBe(2);
    expect(cachedDictionary("bn")).toEqual({ hello: "হ্যালো" });
  });

  /**
   * The other half of the contract, which the fix could plausibly have broken:
   * a load that LANDS is still remembered, so callers can read it without
   * awaiting anything.
   *
   * COUNTING IMPORTS CANNOT PROVE THIS and an earlier version of this test
   * tried. `import("./bn")` is deduped by the ES module registry, so the count
   * stays at one with the cache lookup deleted outright: the assertion was
   * measuring the language, not the code. What the cache actually buys is a
   * synchronous read afterwards, which is what `cachedDictionary` exists for
   * and what every caller in the app depends on, so that is what is asserted.
   */
  it("remembers a dictionary that landed, so it can be read without awaiting", async () => {
    vi.doMock("./bn", () => ({ bn: { hello: "হ্যালো" } }));
    const { loadDictionary, cachedDictionary } = await import("./index");

    expect(cachedDictionary("bn")).toBeUndefined();
    await loadDictionary("bn");
    expect(cachedDictionary("bn")).toEqual({ hello: "হ্যালো" });
  });

  /**
   * And that concurrent callers still share one in-flight request.
   *
   * WRITTEN ONCE AS "the loader runs once" AND IT PROVED NOTHING. Counting
   * imports passes with `inFlight` deleted, because the ES module registry
   * dedupes `import("./bn")` by itself: the count stays at one whatever this
   * file does. What `inFlight` actually promises is narrower and is the thing
   * that can break, so that is what is asserted: callers arriving together get
   * back the SAME promise, rather than each building a fresh chain over the
   * same import and racing to write the cache.
   */
  it("hands concurrent callers the same in-flight promise", async () => {
    vi.doMock("./bn", () => ({ bn: { hello: "হ্যালো" } }));
    const { loadDictionary } = await import("./index");

    const first = loadDictionary("bn");
    const second = loadDictionary("bn");
    expect(second).toBe(first);
    await Promise.all([first, second]);
  });

  /**
   * And once it has landed, a later caller gets a resolved promise rather than
   * the stored in-flight one, which is what `finally` is clearing.
   */
  it("stops handing out the in-flight promise once it has landed", async () => {
    vi.doMock("./bn", () => ({ bn: { hello: "হ্যালো" } }));
    const { loadDictionary } = await import("./index");

    const first = loadDictionary("bn");
    await first;
    expect(loadDictionary("bn")).not.toBe(first);
  });
});
