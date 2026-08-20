// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Fragment,
  act,
  createElement,
  useEffect,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

/**
 * WHAT `LocaleProvider` PAINTS, AND WHEN IT PAINTS NOTHING.
 *
 * This is the one part of the app whose failure mode is a WHITE SCREEN rather
 * than a wrong string, and until now nothing tested it. Every other test of
 * this provider goes through `renderToStaticMarkup`, which runs no effects at
 * all, so the entire `ready` gate, the thing that decides whether children
 * exist, was invisible to the suite. Two separate reviews had to stand up a
 * real React root by hand to answer questions about it.
 *
 * WHY A SECOND ENVIRONMENT IS WORTH IT. The rest of the suite is deliberately
 * `environment: "node"`, because the engine is pure derivation and a DOM would
 * be 165 files of overhead for nothing. So the DOM is opted into per file, by
 * the docblock above, and only here. `happy-dom` rather than `jsdom` because it
 * is markedly faster to construct and this suite's timing is already the
 * subject of its own commit.
 *
 * WHAT IS ACTUALLY BEING PINNED. Three behaviours, each of which has either
 * already been broken once or is the reason another decision is correct:
 *
 *   1. A dictionary that FAILS still ends with children on screen, in English.
 *      The provider renders `null` until `ready`, so a failure that left
 *      `ready` false forever would be a blank app, not a fallback.
 *   2. Returning to a locale whose load failed does NOT unmount the subtree.
 *      This is the whole reason the failure is cached: `ready` initialises
 *      from the cache, so a hit short-circuits, and a miss drops `ready` to
 *      false and takes auth and in-progress puzzle state down with it.
 *   3. A first visit in a non-English locale DOES hold the paint. That is the
 *      deliberate trade the provider's own comment argues for, and a test that
 *      only checked "children eventually appear" would pass just as happily
 *      with the flash-of-English it exists to prevent.
 */

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.resetModules();
  vi.doUnmock("./translations");
});

/**
 * A child that records every mount and unmount, which is what turns "the
 * subtree was torn down and rebuilt" from an invisible event into an
 * assertion. Counting renders would not do: React re-renders constantly and
 * only a remount loses state.
 */
function Probe({ log }: { log: string[] }) {
  useEffect(() => {
    log.push("mount");
    return () => {
      log.push("unmount");
    };
  }, []);
  return createElement("span", null, "child");
}

/**
 * A child that hands the provider's own `setLocale` back to the test.
 *
 * THE `locale` PROP CANNOT DRIVE THIS. `LocaleProvider` seeds its state from
 * `fixedLocale` in a `useState` initialiser and never syncs it again, so
 * re-rendering with a different prop changes nothing and every assertion about
 * switching quietly describes the first locale. The context setter is also the
 * real path: it is what the language `<select>` calls.
 *
 * Capturing it is safe across the gate closing. `setLocale` is the PROVIDER's
 * callback, memoised with no dependencies, and the provider stays mounted
 * while `ready` is false; only its children go.
 */
function Switcher({
  useSet,
  take,
}: {
  /*
    THE HOOK ARRIVES AS A PROP, and it has to. `vi.resetModules()` between
    tests means a static `import { useSetLocale } from "./i18n"` at the top of
    this file resolves to a DIFFERENT module instance than the
    `await import("./i18n")` inside `mount`, and therefore to a different
    React context. The hook then reads the context default, `setLocale` is a
    no-op, every switch below silently does nothing, and the tests describe
    the first locale forever while passing.
  */
  useSet: () => (code: string) => void;
  take: (set: (code: string) => void) => void;
}) {
  const set = useSet();
  take(set);
  return null;
}

/**
 * The provider under test, with `./translations` mocked so a locale can be
 * made to fail on demand. Mocked at the module the provider imports rather
 * than at the network, because the provider's contract is with this module.
 */
async function mount(
  locale: string,
  log: string[],
): Promise<{ setLocale: (code: string) => void }> {
  const { LocaleProvider, useSetLocale } = await import("./i18n");
  let captured: ((code: string) => void) | undefined;
  await act(async () => {
    root.render(
      /*
        NO THIRD ARGUMENT TO `createElement`. Its signature is
        `(type, props, ...children)`, so an explicit `undefined` in the tail
        overwrites `props.children` and blanks the subtree, which reads exactly
        like the gate being shut and fails every assertion here identically.
      */
      createElement(LocaleProvider, {
        locale,
        children: createElement(Fragment, null, [
          createElement(Switcher, {
            key: "switcher",
            useSet: useSetLocale,
            take: (set: (code: string) => void) => {
              captured = set;
            },
          }),
          createElement(Probe, { key: "probe", log }),
        ]) as ReactNode,
      }),
    );
  });
  return {
    setLocale: (code: string) => captured!(code),
  };
}

describe("LocaleProvider's paint gate", () => {
  it("shows children immediately in English, which needs no dictionary", async () => {
    const log: string[] = [];
    await mount("en", log);
    expect(container.textContent).toBe("child");
    expect(log).toEqual(["mount"]);
  });

  /**
   * THE WHITE-SCREEN CASE. A rejected load that was not swallowed would leave
   * `ready` false and this container empty forever.
   */
  it("ends with children on screen when the dictionary fails", async () => {
    vi.doMock("./translations", async () => {
      const actual =
        await vi.importActual<typeof import("./translations")>("./translations");
      return {
        ...actual,
        cachedDictionary: () => undefined,
        loadDictionary: () => Promise.resolve(),
      };
    });
    const log: string[] = [];
    await mount("bn", log);
    expect(container.textContent).toBe("child");
    expect(log).toContain("mount");
  });

  /**
   * THE REASON A FAILURE IS CACHED. With the failure remembered,
   * `cachedDictionary` returns `{}`, `ready` initialises true, and the subtree
   * survives the switch. Without it, the effect drops `ready` to false and
   * every child unmounts: auth, and whatever puzzle the reader was part way
   * through.
   */
  it("does not tear down the subtree on returning to a failed locale", async () => {
    const remembered = new Map<string, Record<string, string>>();
    let release!: () => void;
    const slowFirstLoad = new Promise<void>((resolve) => {
      release = resolve;
    });
    vi.doMock("./translations", async () => {
      const actual =
        await vi.importActual<typeof import("./translations")>("./translations");
      return {
        ...actual,
        cachedDictionary: (code: string) => remembered.get(code),
        loadDictionary: (code: string) =>
          /*
            THE FIRST ATTEMPT HAS TO BE SLOW OR THIS TEST PROVES NOTHING, and
            finding that out is half of why the file exists. A load that
            settles in a microtask lets React batch `ready` false and true into
            one commit, so the blank is never painted and the child never
            unmounts even with the cache disabled entirely. The teardown this
            test is about is real, but only visible once a paint lands between
            the two states. So the first load is held open deliberately.
          */
          slowFirstLoad.then(() => {
            remembered.set(code, {});
          }),
      };
    });

    const log: string[] = [];
    const { setLocale } = await mount("en", log);
    expect(log).toEqual(["mount"]);

    // First visit to a locale with no dictionary: the paint is held, so the
    // subtree really is torn down. That part is the deliberate trade.
    await act(async () => setLocale("bn"));
    expect(container.textContent).toBe("");
    expect(log).toEqual(["mount", "unmount"]);

    await act(async () => {
      release();
      await slowFirstLoad;
    });
    expect(log).toEqual(["mount", "unmount", "mount"]);

    // Away, and back. NOW the failure is remembered, `ready` initialises true,
    // and nothing may tear down: this is the whole reason a failure is cached.
    await act(async () => setLocale("en"));
    const beforeReturn = log.length;
    await act(async () => setLocale("bn"));
    expect(log.slice(beforeReturn)).toEqual([]);
    expect(container.textContent).toBe("child");
  });

  /**
   * AND THE TRADE IS REAL. The provider holds the paint on a first visit in a
   * language it has no dictionary for, rather than painting English and
   * swapping. A test that only waited for children would not tell the two
   * apart, so this one looks while the load is still in flight.
   */
  it("holds the paint while a first non-English dictionary is in flight", async () => {
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    vi.doMock("./translations", async () => {
      const actual =
        await vi.importActual<typeof import("./translations")>("./translations");
      return {
        ...actual,
        cachedDictionary: () => undefined,
        loadDictionary: () => pending,
      };
    });

    const log: string[] = [];
    await mount("bn", log);
    expect(container.textContent).toBe("");
    expect(log).toEqual([]);

    await act(async () => {
      release();
      await pending;
    });
    expect(container.textContent).toBe("child");
    expect(log).toEqual(["mount"]);
  });

  /**
   * AND A REMOUNT WITH A WARM CACHE MUST NOT BLANK FIRST.
   *
   * `ready` is seeded by a `useState` initialiser that consults the cache, and
   * that initialiser is the only thing standing between a warm remount and one
   * committed frame of nothing. The effect below it cannot help: `useEffect`
   * runs AFTER the commit, so by the time it sets `ready` the blank has already
   * been painted.
   *
   * WHY `flushSync` RATHER THAN `act`. Every other test here wraps the render
   * in `act`, which flushes the commit and the passive effects together and so
   * cannot tell a one-commit render from a two-commit one: both end with the
   * child on screen. `flushSync` commits without running passive effects, which
   * is exactly the frame the reader would see. Dropping the cache check from
   * the initialiser is invisible to all four tests above and fails this one.
   */
  it("paints children on the first commit when the dictionary is already cached", async () => {
    vi.doMock("./translations", async () => {
      const actual =
        await vi.importActual<typeof import("./translations")>("./translations");
      return {
        ...actual,
        cachedDictionary: () => ({ hello: "হ্যালো" }),
        loadDictionary: () => Promise.resolve(),
      };
    });

    const { LocaleProvider } = await import("./i18n");
    const log: string[] = [];
    flushSync(() => {
      root.render(
        createElement(LocaleProvider, {
          locale: "bn",
          children: createElement(Probe, { log }) as ReactNode,
        }),
      );
    });
    // The first committed frame, before any passive effect has run.
    expect(container.textContent).toBe("child");
    await act(async () => {});
    expect(log).toEqual(["mount"]);
  });
});
