import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { LOCALES } from "../../app/locales";
import { puzzles } from "../../puzzles/all";
import type { RatesData } from "../../puzzles/schema";
import { LessonView } from "../LessonView";
import { SlicerView } from "./SlicerView";
import { canSlice, slicerModel } from "./subgroups";

/**
 * What the panel says, in every language, at the position that is a
 * measurement.
 *
 * The movement itself is pinned in `subgroups.test.ts` against the pure model,
 * and the dragging in `SlicerViewDrag.test.ts`. What is checked here is what
 * neither can see: that the trial's published counts reach the page, that the
 * numerals follow the reader's locale, that no English survives a translated
 * locale, and that the thing is actually mounted in the beat.
 */

const sliceable = (): RatesData[] =>
  puzzles.map((p) => p.setup.data).filter((d): d is RatesData => canSlice(d));

const render = (data: RatesData, locale: string) =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: locale as "en",
      children: createElement(SlicerView, { full: data }),
    }),
  );

beforeAll(async () => {
  await Promise.all(LOCALES.map((l) => l.code).map(loadDictionary));
}, 60_000);

describe("SlicerView", () => {
  it("has a trial to draw, or it is dead code", () => {
    expect(sliceable().length).toBeGreaterThan(0);
  });

  /** The published trial, which is the row that must never move. */
  it("prints the trial's own counts", () => {
    const data = sliceable()[0]!;
    const html = render(data, "en");
    for (const g of slicerModel(data).groups) {
      expect(html).toContain(`${g.events.toLocaleString("en")} of`);
      expect(html).toContain(g.total.toLocaleString("en"));
    }
  });

  it.each(LOCALES.map((l) => l.code))("formats its numerals for %s", (loc) => {
    const data = sliceable()[0]!;
    const html = render(data, loc);
    const num = new Intl.NumberFormat(loc);
    for (const g of slicerModel(data).groups) {
      expect(html).toContain(num.format(g.events));
      expect(html).toContain(num.format(g.total));
    }
  });

  /**
   * NOTHING ELSE IN THIS PROJECT CATCHES A BARE ENGLISH STRING HERE.
   * `inlineChrome.test.ts` reads the source for strings that ARE wrapped in
   * `t()` and is blind to one that is not; `chartsLocalized.test.ts` renders
   * through `DataViewRenderer`, which never mounts this.
   *
   * It has already earned its place: the Japanese intro shipped past `tsc`,
   * past the dictionary parity check and past a full green suite with the
   * English word "group" sitting in the middle of it, because a dictionary
   * value is just a string and nothing was reading it.
   */
  it.each(["ja", "zh", "ru", "hi", "bn", "ar"])(
    "leaves no English in the chrome for %s",
    (loc) => {
      const data = sliceable()[0]!;
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
    const html = render(sliceable()[0]!, "en");
    const verdict = html.match(/data-slicer="verdict"/);
    expect(verdict).not.toBeNull();
    expect(html).toContain('aria-live="polite"');
  });
});

describe("the slicer's place in the lesson beat", () => {
  beforeAll(() => {
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

  it("renders on the randomised trial", () => {
    expect(lessonHtml("written-in-the-stars")).toContain(
      "Both arms pooled, unchanged",
    );
  });

  /** And never on the observational comparison, whatever else it looks like. */
  it("stays off the observational comparison", () => {
    expect(lessonHtml("kidney-stones")).not.toContain(
      "Both arms pooled, unchanged",
    );
  });

  it("keeps it behind the fold rather than in the beat itself", () => {
    const html = lessonHtml("written-in-the-stars");
    const details = html.indexOf("<details");
    expect(details).toBeGreaterThan(-1);
    expect(html).not.toContain("<details open");
    expect(html.indexOf("Both arms pooled, unchanged")).toBeGreaterThan(details);
  });
});
