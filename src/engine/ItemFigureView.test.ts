import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { loadDictionary } from "../app/translations";
import { ItemFigureView } from "./ItemFigureView";
import { TEST_ITEMS, type ItemFigure } from "../puzzles/testItems";

/**
 * A chart in the item bank reads as a measurement, and these numbers are not.
 *
 * Prose is read as a hypothetical, which is why the bank has always been able
 * to say "a factory reports" without citing a factory. A figure cannot: this
 * project already learned that when invented scatter points shipped looking
 * like data and `CausalData.schematicNote` went from optional to required.
 *
 * So the notice is the DEFAULT and the only way to remove it is real
 * provenance. These tests are the guard on that, and on the property that makes
 * a figure worth having at all: the reveal must draw something the setup did
 * not.
 */
const figured = TEST_ITEMS.filter((i) => i.figure);

const render = (figure: ItemFigure, revealed: boolean, locale = "en") =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(ItemFigureView, { figure, revealed }),
    }),
  );

describe("a figured item", () => {
  beforeAll(async () => {
    await loadDictionary("bn");
  });

  it("exists in the bank, so the checks below are not vacuous", () => {
    expect(figured.length).toBeGreaterThan(0);
  });

  it("says its numbers were built rather than measured", () => {
    for (const item of figured) {
      const html = render(item.figure!, false);
      if (item.figure!.provenance) continue;
      expect(html, item.id).toContain("built to show the shape");
    }
  });

  it("draws a different view once the verdict is in", () => {
    /*
      The whole point. If the reveal redraws the same view, the item is prose
      with a picture on it and the reversal never happens.
    */
    for (const item of figured) {
      expect(item.figure!.initialView.kind, item.id).not.toBe(
        item.figure!.revealView.kind,
      );
      expect(render(item.figure!, false)).not.toBe(render(item.figure!, true));
    }
  });

  it("is not always a trap, or the chart itself would be the tell", () => {
    /*
      THE HEDGE RULE IN A NEW DIMENSION. If every item carrying a figure were a
      trap, a player could answer without reading: see a chart, say trap. The
      bank has broken this rule before along other axes, so it is asserted here
      before the slice grows.
    */
    const traps = figured.filter((i) => i.trap !== null).length;
    expect(traps).toBeGreaterThan(0);
    expect(traps).toBeLessThan(figured.length);
  });

  it("draws Latin numerals, which is a hole this did not dig", () => {
    /*
      ASSERTED AS IT IS RATHER THAN AS IT SHOULD BE, and worth the honesty.

      `RateChart` prints `{Math.round(value)}%` and `${numerator}/${denominator}`
      as raw template strings, so a Bengali reader sees Latin digits inside a
      fully translated figure. That is on `main` today and it is the `toFixed`
      hole `CLAUDE.md` records: the localised-numeral scan matches runs of Latin
      LETTERS and never looks at digits, so it sweeps this up clean.

      A figured item does not widen the hole, it just reaches it from a second
      place. Pinning the current behaviour means that whoever fixes `RateChart`
      gets a failure here telling them this test needs updating, rather than
      finding out later that a figure was never checked.
    */
    const html = render(figured[0]!.figure!, false, "bn");
    expect(/[0-9]/.test(html), "the chart draws digits at all").toBe(true);
    expect(
      /[০-৯]/.test(html),
      "RateChart now localises: update this test and delete the note above",
    ).toBe(false);
  });

  it("announces the scope of what is drawn, in both states", () => {
    for (const state of [false, true]) {
      const html = render(figured[0]!.figure!, state);
      expect(html).toContain("uppercase tracking-eyebrow");
    }
  });
});
