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
 * WHAT `LocaleProvider` DOES THAT ONLY A RUNNING DOM CAN SEE.
 *
 * Everything here is an EFFECT or a COMMITTED FRAME, and the rest of the suite
 * can observe neither. 166 files run under `environment: "node"`, and every
 * component test goes through `renderToStaticMarkup`, which runs no effects at
 * all. So the `ready` gate, the document's `lang` and `dir`, and the stored
 * locale choice were all invisible, and two reviews had to stand up a React
 * root by hand to answer questions about them.
 *
 * THE DOM IS OPTED INTO PER FILE, by the docblock above, and only here. It
 * costs about half a second of a 33-second run. `happy-dom` rather than
 * `jsdom` on the strength of its reputation for being cheaper to construct,
 * which is not something this repo has measured, since jsdom is not installed.
 *
 * WHAT IS PINNED, and why each one is here rather than merely true:
 *
 *   THE PAINT GATE. English and a warm cache must paint children on the FIRST
 *   commit; a language with no dictionary yet must hold the paint rather than
 *   flash English and swap; a load that fails must still open the gate, or the
 *   app is blank forever; and a load that lands after the reader has moved on
 *   must not open it early. Returning to a locale whose load failed must not
 *   tear the subtree down, which is the whole argument for caching the
 *   failure: `ready` seeds from the cache, and a miss takes auth and any
 *   half-finished puzzle with it.
 *
 *   THE DOCUMENT. `lang` and `dir` follow the locale. This effect had never
 *   been executed by a test in this repo, in either direction. Pinning it to
 *   "en"/"ltr" hands an Arabic reader a mirrored layout and tells a screen
 *   reader that Japanese is English, and the first version of THIS FILE
 *   shipped a DOM without covering it: review pinned five such regressions at
 *   once and the whole suite stayed green.
 *
 *   THE CHOICE. Picking a language survives a reload, and a code that is not
 *   a language is refused.
 */

declare global {
  /*
    React reads this to decide whether `act` is legitimate. Declared with `var`
    rather than `let` or `const` because only `var` augments `globalThis` in a
    TypeScript ambient block; the other two would leave `globalThis.IS_...`
    an implicit `any` and fail `tsc`.
  */
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  document.documentElement.lang = "";
  document.documentElement.dir = "";
  localStorage.clear();
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
 * A child that records every mount and unmount, and renders through `t` so the
 * language on screen is assertable rather than assumed. Counting renders would
 * not do: React re-renders constantly and only a remount loses state.
 */
function Probe({
  useTr,
  log,
}: {
  useTr: () => (text: { en: string }) => string;
  log: string[];
}) {
  const t = useTr();
  useEffect(() => {
    log.push("mount");
    return () => {
      log.push("unmount");
    };
  }, []);
  return createElement("span", null, t({ en: "child" }));
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
    THE HOOKS ARRIVE AS PROPS, and they have to. `vi.resetModules()` between
    tests means a static `import { useSetLocale } from "./i18n"` at the top of
    this file resolves to a DIFFERENT module instance than the
    `await import("./i18n")` inside `mount`, and therefore to a different React
    context. The hook then reads the context default, `setLocale` is a no-op,
    every switch below silently does nothing, and the tests describe the first
    locale forever while passing. Verified: the static form leaves the rendered
    text unchanged across a switch that the dynamic form empties.
  */
  useSet: () => (code: string) => void;
  take: (set: (code: string) => void) => void;
}) {
  const set = useSet();
  take(set);
  return null;
}

type Mounted = {
  setLocale: (code: string) => void;
  initialLocale: () => string;
};

function tree(
  i18n: typeof import("./i18n"),
  locale: string,
  log: string[],
  take: (set: (code: string) => void) => void,
) {
  return createElement(i18n.LocaleProvider, {
    locale,
    /*
      NO THIRD ARGUMENT TO `createElement`. Its signature is
      `(type, props, ...children)`, so an explicit `undefined` in the tail
      overwrites `props.children` and blanks the subtree, which reads exactly
      like the gate being shut and fails every assertion here identically.
    */
    children: createElement(Fragment, null, [
      createElement(Switcher, {
        key: "switcher",
        useSet: i18n.useSetLocale,
        take,
      }),
      createElement(Probe, { key: "probe", useTr: i18n.useT, log }),
    ]) as ReactNode,
  });
}

/** The tree under test. `./translations` is mocked per test to control loads. */
async function mount(locale: string, log: string[]): Promise<Mounted> {
  const i18n = await import("./i18n");
  let captured: ((code: string) => void) | undefined;
  await act(async () => {
    root.render(
      tree(i18n, locale, log, (set) => {
        captured = set;
      }),
    );
  });
  return {
    setLocale: (code: string) => captured!(code),
    initialLocale: i18n.initialLocale,
  };
}

/**
 * Commit without running passive effects, which is the frame the reader
 * actually sees first.
 *
 * `act` FLUSHES THE COMMIT AND THE EFFECTS TOGETHER, so it cannot tell a
 * one-commit render from a two-commit one: both end with the child on screen.
 * That is not a nicety. Dropping the cache check from the `ready` initialiser
 * is invisible to every `act`-based test in this file and is, in a browser, a
 * committed frame of nothing, because `useEffect` runs after the paint.
 *
 * The act flag is lowered around it deliberately: `flushSync` inside an act
 * environment warns on every run, and that warning is noise rather than signal.
 */
function commitOnly(render: () => void) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  try {
    flushSync(render);
  } finally {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  }
}

function mockTranslations(over: Partial<typeof import("./translations")>): void {
  vi.doMock("./translations", async () => {
    const actual =
      await vi.importActual<typeof import("./translations")>("./translations");
    return { ...actual, ...over };
  });
}

describe("LocaleProvider's paint gate", () => {
  /**
   * THE MAJORITY PATH, and the one the first version of this file left open.
   * English needs no dictionary, so it must never be held back. Review found
   * that dropping only `|| locale === DEFAULT_LOCALE` from the initialiser
   * survived all five tests here, which is a blank committed frame for every
   * English reader: the default, and most of them.
   */
  it("paints English on the first commit, with no dictionary to wait for", async () => {
    mockTranslations({
      cachedDictionary: () => undefined,
      loadDictionary: () => Promise.resolve(),
    });
    const i18n = await import("./i18n");
    const log: string[] = [];
    commitOnly(() => {
      root.render(tree(i18n, "en", log, () => {}));
    });
    expect(container.textContent).toBe("child");
    await act(async () => {});
    expect(log).toEqual(["mount"]);
  });

  /** And the same for a language whose dictionary is already in hand. */
  it("paints a cached language on the first commit too", async () => {
    mockTranslations({
      cachedDictionary: () => ({ child: "শিশু" }),
      loadDictionary: () => Promise.resolve(),
    });
    const i18n = await import("./i18n");
    const log: string[] = [];
    commitOnly(() => {
      root.render(tree(i18n, "bn", log, () => {}));
    });
    expect(container.textContent).toBe("শিশু");
    await act(async () => {});
    expect(log).toEqual(["mount"]);
  });

  /**
   * AND THE TRADE IS REAL. The provider holds the paint on a first visit in a
   * language it has no dictionary for, rather than painting English and
   * swapping. A test that only waited for children would not tell the two
   * apart, so this one looks while the load is still in flight.
   */
  it("holds the paint while a first dictionary is in flight", async () => {
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    let dict: Record<string, string> | undefined;
    mockTranslations({
      cachedDictionary: () => dict,
      loadDictionary: () =>
        pending.then(() => {
          dict = { child: "শিশু" };
        }),
    });

    const log: string[] = [];
    await mount("bn", log);
    expect(container.textContent).toBe("");
    expect(log).toEqual([]);

    await act(async () => {
      release();
      await pending;
    });
    expect(container.textContent).toBe("শিশু");
    expect(log).toEqual(["mount"]);
  });

  /**
   * THE WHITE-SCREEN CASE. The provider renders `null` until `ready`, so a
   * load that never opened the gate would be a blank app rather than a
   * fallback. The mock is the real post-failure state and not a convenient
   * one: `loadDictionary` RESOLVES and caches `{}`, which is exactly what
   * `translations/index.ts` does, and what an earlier version of this file got
   * wrong by leaving `cachedDictionary` undefined forever.
   */
  it("opens the gate on a failed load, and falls back to English", async () => {
    const remembered = new Map<string, Record<string, string>>();
    mockTranslations({
      cachedDictionary: (code: string) => remembered.get(code),
      loadDictionary: (code: string) => {
        remembered.set(code, {});
        return Promise.resolve();
      },
    });

    const log: string[] = [];
    await mount("bn", log);
    expect(container.textContent).toBe("child");
    expect(log).toEqual(["mount"]);
  });

  /**
   * THE REASON A FAILURE IS CACHED. With it remembered, `ready` initialises
   * true and the subtree survives the switch. Without, the effect drops
   * `ready` to false and every child unmounts: auth, and whatever puzzle the
   * reader was part way through.
   */
  it("does not tear down the subtree on returning to a failed locale", async () => {
    const remembered = new Map<string, Record<string, string>>();
    let release!: () => void;
    const slowFirstLoad = new Promise<void>((resolve) => {
      release = resolve;
    });
    mockTranslations({
      cachedDictionary: (code: string) => remembered.get(code),
      loadDictionary: (code: string) =>
        /*
          THE FIRST ATTEMPT HAS TO BE SLOW OR THIS TEST PROVES NOTHING, and
          finding that out is half of why the file exists. A load that settles
          in a microtask lets React batch `ready` false and true into one
          commit, so the blank is never painted and the child never unmounts
          even with the cache disabled entirely. The teardown is real but only
          visible once a paint lands between the two states.
        */
        slowFirstLoad.then(() => {
          remembered.set(code, {});
        }),
    });

    const log: string[] = [];
    const { setLocale } = await mount("en", log);
    expect(log).toEqual(["mount"]);

    await act(async () => setLocale("bn"));
    expect(container.textContent).toBe("");
    expect(log).toEqual(["mount", "unmount"]);

    await act(async () => {
      release();
      await slowFirstLoad;
    });
    expect(log).toEqual(["mount", "unmount", "mount"]);

    await act(async () => setLocale("en"));
    const beforeReturn = log.length;
    await act(async () => setLocale("bn"));
    expect(log.slice(beforeReturn)).toEqual([]);
    expect(container.textContent).toBe("child");
  });

  /**
   * AND A LOAD THAT LANDS AFTER THE READER HAS MOVED ON MUST NOT OPEN THE
   * GATE. The effect's cleanup sets `cancelled`, and without it the first
   * language to arrive paints the app while the language actually selected is
   * still loading: the flash of the wrong language the gate exists to prevent,
   * arriving by the back door.
   */
  it("ignores a dictionary that arrives after the reader has switched again", async () => {
    const releases = new Map<string, () => void>();
    const dicts = new Map<string, Record<string, string>>();
    mockTranslations({
      cachedDictionary: (code: string) => dicts.get(code),
      loadDictionary: (code: string) =>
        new Promise<void>((resolve) => releases.set(code, resolve)).then(() => {
          dicts.set(code, { child: code });
        }),
    });

    const log: string[] = [];
    const { setLocale } = await mount("en", log);
    await act(async () => setLocale("bn"));
    await act(async () => setLocale("zh"));
    expect(container.textContent).toBe("");

    // Bengali lands, but the reader is on Chinese and Chinese is still loading.
    await act(async () => {
      releases.get("bn")!();
      await Promise.resolve();
    });
    expect(container.textContent).toBe("");

    await act(async () => {
      releases.get("zh")!();
      await Promise.resolve();
    });
    expect(container.textContent).toBe("zh");
  });
});

describe("what LocaleProvider writes outside itself", () => {
  /**
   * THE EFFECT THAT HAD NEVER RUN IN A TEST. `renderToStaticMarkup` executes
   * no effects, so nothing in 166 files could reach this, and the first
   * version of this file added a DOM without covering it: review pinned
   * `lang` to "en" and `dir` to "ltr" and the whole suite stayed green.
   *
   * Both directions are asserted, because a mirrored layout for an Arabic
   * reader and an English `lang` on Japanese content are two different bugs,
   * and a test of one is not a test of the other.
   */
  it("keeps the document's lang and dir in step with the locale", async () => {
    mockTranslations({
      cachedDictionary: () => ({}),
      loadDictionary: () => Promise.resolve(),
    });
    const { setLocale } = await mount("en", []);
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dir).toBe("ltr");

    await act(async () => setLocale("ar"));
    expect(document.documentElement.lang).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");

    await act(async () => setLocale("ja"));
    expect(document.documentElement.lang).toBe("ja");
    expect(document.documentElement.dir).toBe("ltr");
  });

  /**
   * The choice has to survive a reload, which is the only reason it is written
   * down at all. Asserted through `initialLocale`, the function that reads it
   * back on the next visit, rather than through the storage key, so the test
   * describes the contract instead of the implementation.
   */
  it("remembers the language so the next visit starts there", async () => {
    mockTranslations({
      cachedDictionary: () => ({}),
      loadDictionary: () => Promise.resolve(),
    });
    const { setLocale, initialLocale } = await mount("en", []);
    await act(async () => setLocale("bn"));
    expect(initialLocale()).toBe("bn");
  });

  /** And a code that is not one of the ten is refused rather than stored. */
  it("refuses a locale that is not a language it has", async () => {
    mockTranslations({
      cachedDictionary: () => ({}),
      loadDictionary: () => Promise.resolve(),
    });
    const { setLocale, initialLocale } = await mount("en", []);
    await act(async () => setLocale("xx"));
    expect(document.documentElement.lang).toBe("en");
    expect(initialLocale()).toBe("en");
  });
});
