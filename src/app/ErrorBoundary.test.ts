import { describe, it, expect, vi, afterEach } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CrashScreen, ErrorBoundary } from "./ErrorBoundary";
import { UI } from "./ui";

/**
 * There was no boundary anywhere in the source, so any thrown render took the
 * whole installed app to a blank screen with no message and no way back.
 *
 * `renderToStaticMarkup` does NOT run error boundaries: a throw propagates
 * straight out of it. So the boundary's own test covers what it can, the happy
 * path and the state transition, and `CrashScreen` is tested directly. That
 * split is why the screen is exported.
 */
const Fine = () => createElement("p", null, "the app");

const withLocale = (stored: string | null) => {
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => (k === "cf.locale" ? stored : null),
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  });
  //  falls through to the browser when nothing is stored, and
  // Node supplies a , so it has to be pinned or these assertions
  // depend on whatever language the machine running them is set to.
  vi.stubGlobal("navigator", { language: "en-GB", languages: ["en-GB"] });
};

afterEach(() => vi.restoreAllMocks());

describe("the boundary", () => {
  it("stays out of the way when nothing is wrong", () => {
    expect(
      renderToStaticMarkup(createElement(ErrorBoundary, null, createElement(Fine))),
    ).toBe("<p>the app</p>");
  });

  it("switches to the failed state when React hands it an error", () => {
    // The one part of the class a test can reach without a DOM, and the part
    // that decides whether the fallback is ever shown.
    expect(ErrorBoundary.getDerivedStateFromError()).toEqual({ failed: true });
  });

  it("actually shows the fallback once it has failed", () => {
    /*
      THE MUTANT THAT SURVIVED. `getDerivedStateFromError` was tested and
      `CrashScreen` was tested, and neutering `render()` to return children
      whatever the state passed all seven tests: React would keep computing
      `{failed: true}` and the app would keep going blank, which is the exact
      bug this file exists to remove.

      `renderToStaticMarkup` cannot run a boundary, and this project has no DOM
      environment, but `render()` is an ordinary method on an ordinary object
      and can simply be called.
    */
    const children = createElement("p", null, "the app");
    const boundary = new ErrorBoundary({ children });

    boundary.state = { failed: false };
    expect(boundary.render()).toBe(children);

    boundary.state = { failed: true };
    const shown = boundary.render() as { type: unknown };
    expect(shown.type).toBe(CrashScreen);
  });

  it("reports to the console and to nowhere else", () => {
    /*
      A stack trace can carry anything that was on screen, and this project has
      no error-reporting service. Adding one here would be collecting personal
      data at the moment somebody can least consent to it.
    */
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const boundary = new ErrorBoundary({ children: null });
    boundary.componentDidCatch(new Error("boom"));
    expect(spy).toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("the crash screen", () => {
  it("offers a way back rather than a blank page", () => {
    withLocale(null);
    const html = renderToStaticMarkup(createElement(CrashScreen));
    expect(html).toContain(UI.crashTitle!.en);
    expect(html).toContain(UI.crashReload!.en);
    expect(html).toContain("<button");
  });

  it("promises only what it can keep, and says nothing about where", () => {
    /*
      IT USED TO SAY "stored on this device", which is true of answers and
      streaks and false of the review schedule for anybody signed in: `progress`
      is a table in this project's D1 and `srs/remoteStore.ts` syncs it. The
      reassurance holds either way, because a render that throws touches neither
      storage nor the network, so the sentence makes the promise it can keep and
      stops short of the claim it cannot.

      Pinned here because the next person to reword this screen will be tempted
      to add the reassuring detail back.
    */
    withLocale(null);
    const html = renderToStaticMarkup(createElement(CrashScreen));
    expect(html).toContain("Nothing you have done has been lost");
    expect(html).not.toContain("on this device");
  });

  it("speaks the reader's language with no provider above it", () => {
    /*
      THE REASON IT RESOLVES ITS OWN LOCALE. The boundary sits above
      `LocaleProvider`, so a failure inside the provider is still caught, which
      means `useT` is unavailable. A fallback that could only speak English
      would tell nine readers in ten that something broke, in a language they
      did not choose, at the one moment the app has nothing else to offer.
    */
    withLocale("fr");
    vi.stubGlobal("navigator", { language: "en-GB", languages: ["en-GB"] });
    const html = renderToStaticMarkup(createElement(CrashScreen));
    expect(html).toContain(UI.crashTitle!.fr);
    expect(html).not.toContain(UI.crashTitle!.en);
  });

  it("falls back to English rather than failing when storage is unreadable", () => {
    // The screen shown when something already went wrong must not be the second
    // thing that goes wrong.
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    });
    expect(() => renderToStaticMarkup(createElement(CrashScreen))).not.toThrow();
  });
});
