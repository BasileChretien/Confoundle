import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { LOCALES } from "../../app/locales";
import { puzzles } from "../../puzzles/all";
import type { FrequenciesData } from "../../puzzles/schema";
import { LessonView } from "../LessonView";
import { ScreenView } from "./ScreenView";
import { canScreen, screenFrame, screenModel } from "./screen";

/**
 * The toy's promise is narrow and total: the two numbers that describe the TEST
 * are the measured ones and never move, and the only thing the reader changes
 * is who gets tested. If the figure ever prints a characteristic that is not in
 * the source table, it becomes a lie that happens to be interactive.
 *
 * `renderToStaticMarkup` cannot drag a slider, so the movement is pinned in
 * `screen.test.ts` against the pure model. What is checked here is what a pure
 * test cannot see: that the measured numbers reach the page, that the numerals
 * follow the reader's locale rather than the runtime's, that no English
 * survives in a translated locale, and that the thing is actually mounted.
 */

const screenable = (): FrequenciesData[] =>
  puzzles.map((p) => p.setup.data).filter((d): d is FrequenciesData => canScreen(d));

const render = (data: FrequenciesData, locale: string) =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: locale as "en",
      children: createElement(ScreenView, { full: data }),
    }),
  );

beforeAll(async () => {
  await Promise.all(LOCALES.map((l) => l.code).map(loadDictionary));
  /*
    Sixty seconds because this loads all ten dictionaries, about 23 MB of
    TypeScript. A hook that times out does not fail its file's tests, it SKIPS
    them, so the cost of being wrong here is a green summary over a figure
    nobody checked.
  */
}, 60_000);

describe("ScreenView", () => {
  it("has a puzzle to draw, or it is dead code", () => {
    expect(screenable().length).toBeGreaterThan(0);
  });

  /**
   * THE OPENING STATE IS THE PUBLISHED STUDY. Unlike the Simpson mixer, whose
   * opening mix is a what-if, this one starts exactly where the puzzle's own
   * figure sits, so the first thing the reader sees is a measurement and every
   * drag away from it is visibly their own doing.
   */
  it("opens on the puzzle's own counts", () => {
    const data = screenable()[0]!;
    const html = render(data, "en");
    const frame = screenFrame(screenModel(data), data.withCondition);
    expect(frame.truePositives).toBe(data.positiveGivenCondition);
    expect(frame.falsePositives).toBe(data.positiveGivenNoCondition);
    // 1 real out of 51 positives, which is the figure the reveal prints.
    expect(html).toContain("51");
  });

  /** And the test's own characteristics, read off the source counts. */
  it("prints the measured characteristics of the test", () => {
    const data = screenable()[0]!;
    const html = render(data, "en");
    const model = screenModel(data);
    const rate = new Intl.NumberFormat("en", {
      style: "percent",
      maximumFractionDigits: 1,
    });
    expect(html).toContain(rate.format(model.sensitivity));
    expect(html).toContain(rate.format(model.falsePositiveRate));
  });

  /**
   * THE NUMERAL RULE, checked against what `Intl` produces FOR THAT LOCALE
   * rather than against a script, because the scripts are not the contract:
   * CLDR gives Arabic Latin digits by default and Bengali its own.
   *
   * Read off the summary's own element. A `toContain` over the whole page
   * cannot see a mistake here: at the opening position the count of people
   * with the condition, the count of true positives and the numeral 1 are all
   * the same character, so the search succeeds against the slider label while
   * the summary prints anything at all.
   */
  it.each(LOCALES.map((l) => l.code))("formats its numerals for %s", (loc) => {
    const data = screenable()[0]!;
    const html = render(data, loc);
    const model = screenModel(data);
    const frame = screenFrame(model, data.withCondition);
    const num = new Intl.NumberFormat(loc);
    const pct = new Intl.NumberFormat(loc, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    const summary = html.match(/data-screen="share"[^>]*>([^<]*)</)?.[1] ?? "";
    expect(summary).toContain(num.format(frame.truePositives));
    expect(summary).toContain(
      num.format(frame.truePositives + frame.falsePositives),
    );
    expect(summary).toContain(pct.format(frame.shareReal!));

    /*
      The way-back control prints the measured base rate, so it is a numeral
      the reader sees and has to follow their locale like the rest. Read off
      its own element for the same reason the summary is: at this position the
      count and the numeral 1 coincide.
    */
    const back = html.match(/<button[^>]*>([^<]*)<\/button>/)?.[1] ?? "";
    expect(back).toContain(num.format(data.withCondition));
    expect(back).toContain(num.format(data.total));
  });

  /**
   * NOTHING IN THIS PROJECT CATCHES A BARE ENGLISH STRING IN THIS FILE.
   * `inlineChrome.test.ts` scans the source for strings that ARE wrapped in
   * `t()` and is blind to one that is not; `chartsLocalized.test.ts` renders
   * through `DataViewRenderer`, which never mounts this. So sweep it directly,
   * attributes included, since `aria-valuetext` is a sentence too.
   */
  it.each(["ja", "zh", "ru", "hi", "bn", "ar"])(
    "leaves no English in the chrome for %s",
    (loc) => {
      const data = screenable()[0]!;
      const html = render(data, loc);
      const text = html
        .replace(/<[^>]*>/g, " ")
        .concat(
          " ",
          ...[...html.matchAll(/aria-valuetext="([^"]*)"/g)].map((m) => m[1]!),
        );
      expect([...text.matchAll(/[A-Za-z]{2,}/g)].map((m) => m[0])).toEqual([]);
    },
  );

  it("puts the verdict in a live region", () => {
    expect(render(screenable()[0]!, "en")).toContain('aria-live="polite"');
  });
});

/**
 * AND THAT THE FEATURE IS MOUNTED. Every test above renders the component
 * directly, so all of them would go on passing over a feature deleted from the
 * app: that is exactly what happened to the Simpson mixer, where removing its
 * three lines from `LessonView` left 164 files and 2201 tests green.
 */
describe("the screening toy's place in the lesson beat", () => {
  beforeAll(() => {
    // `LessonView` renders `ShareLesson`, which reads `window.location.origin`.
    vi.stubGlobal("window", { location: { origin: "https://confoundle.org" } });
  });

  const lessonHtml = (slug: string) => {
    const puzzle = puzzles.find((p) => p.slug === slug)!;
    return renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(LessonView, {
          puzzle,
          onNext: () => {},
          onHome: () => {},
        }),
      }),
    );
  };

  it("renders on the puzzle that opted in", () => {
    expect(lessonHtml("medical-test")).toContain("About the test, unchanged");
  });

  /**
   * And NOT on the puzzle with the same shape that did not. One crime
   * happened; how many couples did it is not a dial.
   */
  it("stays off the puzzle that did not", () => {
    expect(lessonHtml("courtroom-odds")).not.toContain(
      "About the test, unchanged",
    );
  });

  it("keeps it behind the fold rather than in the beat itself", () => {
    const html = lessonHtml("medical-test");
    const details = html.indexOf("<details");
    expect(details).toBeGreaterThan(-1);
    expect(html).not.toContain("<details open");
    expect(html.indexOf("About the test, unchanged")).toBeGreaterThan(details);
  });
});
