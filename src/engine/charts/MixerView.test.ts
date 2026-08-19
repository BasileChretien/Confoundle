import { beforeAll, describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { LOCALES } from "../../app/locales";
import { puzzles } from "../../puzzles";
import type { RatesData } from "../../puzzles/schema";
import { MixerView } from "./MixerView";
import { canMix, mixerModel, reversedAt } from "./mixer";

/**
 * The toy's promise is narrow and total: the rates WITHIN each group are the
 * measured ones and never move, and the only thing the reader changes is who
 * got the hard cases. If the figure ever prints a within-group rate that is
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
});

describe("MixerView", () => {
  it("has at least one puzzle to draw, or it is dead code", () => {
    expect(mixable().length).toBeGreaterThan(0);
  });

  it.each(mixable().map((d) => [d.groups.map((g) => g.id).join(" vs "), d] as const))(
    "prints the measured within-group rates for %s",
    (_name, data) => {
      const html = render(data, "en");
      const model = mixerModel(data);
      /*
        Read off the model, which reads off the raw observations, so this
        compares the page against the source counts and not against a second
        copy of the same rounding.
      */
      for (const g of model.groups) {
        for (const rate of g.byStratum) {
          expect(html).toContain(`${Math.round(rate * 100)}%`);
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
      expect(reversedAt(mixerModel(data), 0.5)).toBeNull();
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
      maximumFractionDigits: 0,
    });
    for (const g of mixerModel(data).groups) {
      for (const rate of g.byStratum) {
        expect(html).toContain(pct.format(rate));
      }
    }
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
});
