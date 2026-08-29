import { beforeAll, describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { loadDictionary } from "../../app/translations";
import { puzzles } from "../../puzzles/all";
import type { PuzzleData, RatesData } from "../../puzzles/schema";
import { MixerView } from "./MixerView";
import { SlicerView } from "./SlicerView";
import { canMix } from "./mixer";
import { canSlice } from "./subgroups";

/**
 * A PERCENTAGE WITHOUT ITS SUBJECT IS NOT A FIGURE, IT IS A NUMBER.
 *
 * Both rates toys printed bare percentages and named a leader, and neither
 * said what was being counted. That is survivable on a success rate and
 * actively misleading on a mortality one: the slicer shows aspirin at 9.4%
 * against placebo at 11.8% and calls aspirin the leader, which reads as
 * backwards to anyone who assumes the number is something you want more of.
 *
 * `metricLabel` is required by the schema and puzzle-owned, so the fix was
 * only ever to render it. This test walks the registry rather than the two
 * puzzles that have toys today, so a fourth toy on a rates puzzle is covered
 * without its author knowing the test exists.
 */

beforeAll(async () => {
  await Promise.all(["fr", "ja"].map(loadDictionary));
}, 60_000);

const render = (
  View: typeof MixerView | typeof SlicerView,
  data: RatesData,
  locale: string,
) =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: locale as "en",
      children: createElement(View, { full: data }),
    }),
  );

const withToy = (accepts: (d: PuzzleData) => boolean) =>
  puzzles
    .filter((p) => accepts(p.setup.data))
    .map((p) => [p.slug, p.setup.data as RatesData] as const);

describe("the rates toys name what they are counting", () => {
  it("has a puzzle of each kind, or the cases below are vacuous", () => {
    expect(withToy(canMix).length).toBeGreaterThan(0);
    expect(withToy(canSlice).length).toBeGreaterThan(0);
  });

  it.each(withToy(canMix))("the mixer names the metric on %s", (_slug, data) => {
    expect(render(MixerView, data, "en")).toContain(data.metricLabel.en);
  });

  it.each(withToy(canSlice))("the slicer names the metric on %s", (_slug, data) => {
    expect(render(SlicerView, data, "en")).toContain(data.metricLabel.en);
  });

  /**
   * And it is the PUZZLE'S label, translated, not a sentence the engine wrote.
   * Rendering in a locale whose dictionary carries the label proves the value
   * came through `t()` rather than being spliced in as English.
   */
  it("translates it rather than printing the English", () => {
    const [, data] = withToy(canSlice)[0]!;
    const fr = render(SlicerView, data, "fr");
    expect(fr).not.toContain(data.metricLabel.en);
  });
});
