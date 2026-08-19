import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { LOCALES } from "../../app/locales";
import { puzzles } from "../../puzzles";
import type { RatesData } from "../../puzzles/schema";
import { LessonView } from "../LessonView";
import { MixerView } from "./MixerView";
import {
  OPENING_MIX,
  canMix,
  mixerFrame,
  mixerModel,
  reversedAt,
} from "./mixer";

/**
 * The toy's promise is narrow and total: the rates WITHIN each group are the
 * measured ones and never move, and the only thing the reader changes is how
 * the cases were split. If the figure ever prints a within-group rate that is
 * not in the source table, the whole thing becomes a lie that happens to be
 * animated, which is worse than not shipping it.
 *
 * `renderToStaticMarkup` cannot drag a slider, so the movement itself is
 * pinned in `mixer.test.ts` against the pure model. What is checked here is
 * everything a pure test cannot see: that the measured rates reach the page,
 * that the numerals follow the reader's locale rather than the runtime's, and
 * that the caption claiming a reversal is not printed before one has happened.
 */

const mixable = (): RatesData[] =>
  puzzles.map((p) => p.setup.data).filter((d): d is RatesData => canMix(d));

const render = (data: RatesData, locale: string) =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: locale as "en",
      children: createElement(MixerView, { full: data }),
    }),
  );

/*
  A LOCALE WITH NO DICTIONARY LOADED RENDERS THE EMPTY STRING, not English, and
  a numeral check against an empty string passes every "not Latin" assertion
  ever written. Found by this file's own script check reporting `''`.
*/
beforeAll(async () => {
  await Promise.all(LOCALES.map((l) => l.code).map(loadDictionary));
  /*
    SIXTY SECONDS, BECAUSE THIS HOOK LOADS ALL TEN. Measured in isolation on a
    cold cache it takes nine to ten seconds against a default ceiling of ten,
    and under suite load it goes over. A hook that times out does not fail its
    file's tests, it SKIPS them, so the cost of being wrong here is a green
    summary over a figure nobody checked.
  */
}, 60_000);

describe("MixerView", () => {
  it("has at least one puzzle to draw, or it is dead code", () => {
    expect(mixable().length).toBeGreaterThan(0);
  });

  it.each(mixable().map((d) => [d.groups.map((g) => g.id).join(" vs "), d] as const))(
    "prints the measured within-group rates for %s",
    (_name, data) => {
      const html = render(data, "en");
      const model = mixerModel(data);
      const en = new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      /*
        Read off the model, which reads off the raw observations, so this
        compares the page against the source counts and not against a second
        copy of the same rounding.
      */
      for (const g of model.groups) {
        for (const rate of g.byStratum) {
          expect(html).toContain(en.format(rate));
        }
      }
    },
  );

  /**
   * THE CAPTION IS A CLAIM, so it may not appear before it is true. At the
   * opening mix each group carries half the hard cases, and on every shipped
   * puzzle that leaves the within-group winner ahead overall too: there is no
   * paradox on screen yet, and saying there is would spend the surprise the
   * reader is supposed to cause.
   */
  it.each(mixable().map((d) => [d.groups.map((g) => g.id).join(" vs "), d] as const))(
    "withholds the reversal caption at the opening mix for %s",
    (_name, data) => {
      expect(reversedAt(mixerModel(data), OPENING_MIX / 100)).toBeNull();
      expect(render(data, "en")).not.toContain("behind overall");
    },
  );

  /**
   * And that the reversal is reachable at all. A mixer that can never cross is
   * a slider attached to nothing, which would render perfectly and teach the
   * opposite of the lesson.
   */
  it.each(mixable().map((d) => [d.groups.map((g) => g.id).join(" vs "), d] as const))(
    "can be dragged into a reversal for %s",
    (_name, data) => {
      const model = mixerModel(data);
      const somewhere = [0, 0.1, 0.25, 0.4, 0.6, 0.75, 0.9, 1].some(
        (t) => reversedAt(model, t) !== null,
      );
      expect(somewhere).toBe(true);
    },
  );

  /**
   * THE NUMERAL RULE, which no other test here can see. A percentage built
   * from a pinned `en-US`, or from an argument-less `Intl.NumberFormat()` that
   * silently follows the runtime, renders identically in English and wrongly
   * for the nine readers who are not reading English.
   *
   * The check is against what `Intl` produces FOR THAT LOCALE rather than
   * against a script, because the scripts are not the contract: CLDR gives
   * Arabic Latin digits by default and Bengali its own, so an assertion that
   * Arabic must be in Arabic-Indic numerals fails correct code. What has to
   * hold is that the reader's locale is the one being asked.
   */
  it.each(LOCALES.map((l) => l.code))("formats its numerals for %s", (loc) => {
    const data = mixable()[0]!;
    const html = render(data, loc);
    const pct = new Intl.NumberFormat(loc, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const model = mixerModel(data);
    /*
      BOTH THE STILL ROWS AND THE MOVING BARS. Written against `byStratum`
      alone, this passed with the overall percentages rewritten as
      `toFixed(0)`, which localises nothing: the one part of the figure the
      reader actually watches was the one part unguarded, and
      `localeNumerals.test.ts` cannot help because `toFixed` is outside its
      scope by design. Half a converted figure is the state CLAUDE.md calls
      worse than either choice made consistently.
    */
    for (const g of model.groups) {
      for (const rate of g.byStratum) expect(html).toContain(pct.format(rate));
    }

    /*
      AND THE MOVING BARS SEPARATELY, read off their own elements.
      `toContain` over the whole page cannot see them: at the opening mix each
      group's overall rate equals one of its own stratum rates, so the search
      succeeds against the still rows above while the bars print whatever they
      like. That is not a contrived case, it is the arithmetic of the slider's
      end, and it is how these values survived a review with `toFixed`.
    */
    const bars = [...html.matchAll(/data-mixer="overall"[^>]*>([^<]*)</g)].map(
      (m) => m[1]!,
    );
    expect(bars).toEqual(
      mixerFrame(model, OPENING_MIX / 100).map((r) => pct.format(r)),
    );
  });

  /**
   * And that the caption sits in a live region. Inserted into the DOM at the
   * moment the reversal becomes true it would be announced by nothing, so a
   * reader arrowing the slider causes the paradox and is never told. Nothing
   * else here can see it: the caption is absent at the opening mix, and
   * `renderToStaticMarkup` cannot move a slider to bring it in.
   */
  it("puts the reversal caption in a live region", () => {
    expect(render(mixable()[0]!, "en")).toContain('aria-live="polite"');
  });

  /**
   * And that the check above is not vacuous. If every locale formatted a
   * percentage identically, a hardcoded `en-US` would satisfy all ten and the
   * test would be a decoration.
   */
  it("renders a numeral that English would have written differently", () => {
    const data = mixable()[0]!;
    const differs = LOCALES.map((l) => l.code).filter(
      (loc) => render(data, loc) !== render(data, "en"),
    );
    expect(differs.length).toBeGreaterThan(0);
  });

  /**
   * NOTHING IN THIS PROJECT CATCHES A BARE ENGLISH STRING IN THIS FILE, and
   * review proved it: deleting `t()` from the slider label and from the intro
   * paragraph both left the whole suite green.
   *
   * Neither guard can reach here, and neither is broken.
   * `inlineChrome.test.ts` scans the source for `t({ en: "..." })` and checks
   * the dictionaries have that key, so it sees strings that ARE wrapped and is
   * blind to one that is not. `chartsLocalized.test.ts` renders through
   * `DataViewRenderer`, and this component is mounted from `LessonView`, so its
   * sweep never arrives. That is structurally the same hole that let the share
   * card's glyph captions ship English in ten languages.
   *
   * So sweep this component directly, the way that file sweeps charts: render
   * it in the non-Latin locales, where every correctly translated word is
   * outside the Latin alphabet, and require no Latin run of two or more
   * letters to survive. The group names are single characters ("A", "B") and
   * the numerals are digits, so both fall under the threshold by construction.
   */
  it.each(["ja", "zh", "ru", "hi", "bn", "ar"])(
    "leaves no English in the chrome for %s",
    (loc) => {
      const data = mixable()[0]!;
      const text = render(data, loc)
        .replace(/<[^>]*>/g, " ")
        // Attribute values are chrome too: `aria-valuetext` is a sentence.
        .concat(" ", ...[...render(data, loc).matchAll(/aria-valuetext="([^"]*)"/g)].map((m) => m[1]!));
      const latin = [...text.matchAll(/[A-Za-z]{2,}/g)].map((m) => m[0]);
      expect(latin).toEqual([]);
    },
  );
});

/**
 * AND THAT THE FEATURE IS ACTUALLY MOUNTED.
 *
 * Deleting the three lines in `LessonView` that render the mixer left 164
 * files and 2201 tests green. Every test above renders the component directly,
 * so all of them would have gone on passing over a feature that had been
 * removed from the app.
 */
describe("the mixer's place in the lesson beat", () => {
  /*
    `LessonView` renders `ShareLesson`, which builds a URL from
    `window.location.origin`. The suite runs in the node environment, so the
    whole beat throws without one. Stubbed rather than switched to jsdom, which
    would change how 162 other files run to test three assertions.
  */
  beforeAll(() => {
    vi.stubGlobal("window", { location: { origin: "https://confoundle.org" } });
  });
  afterAll(() => vi.unstubAllGlobals());

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

  it("renders the mixer on a puzzle that can take one", () => {
    const html = lessonHtml("kidney-stones");
    expect(canMix(puzzles.find((p) => p.slug === "kidney-stones")!.setup.data)).toBe(true);
    expect(html).toContain("Who got the");
  });

  it("leaves it out of a puzzle that cannot", () => {
    // `spectrum-bias` crosses but has no dominant group, so it is refused.
    const html = lessonHtml("spectrum-bias");
    expect(html).not.toContain("Who got the");
  });

  it("keeps it behind the fold rather than in the beat itself", () => {
    // The lesson beat opens on the answer; the toy is for whoever wants more.
    const html = lessonHtml("kidney-stones");
    const details = html.indexOf("<details");
    expect(details).toBeGreaterThan(-1);
    expect(html).not.toContain("<details open");
    expect(html.indexOf("Who got the")).toBeGreaterThan(details);
  });
});
