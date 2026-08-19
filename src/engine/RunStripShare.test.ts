import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { loadDictionary } from "../app/translations";
import { RunStripShare } from "./CalibrationRunView";
import { runNumber } from "../app/dailyRun";
import type { RunAnswer } from "../srs/calibrationRun";

/**
 * The block a player copies, which nothing could reach.
 *
 * It renders only after eight answers, inside a component holding its own
 * state, so `CalibrationRunView.test.ts` never sees it. A review changed which
 * number it printed and the entire suite stayed green. `StakeReadout` next door
 * was exported for exactly this reason and this was not, in the same file.
 */
const answer = (correct: boolean): RunAnswer =>
  ({ correct, confidence: "certain" }) as RunAnswer;

const SEED = Math.floor(Date.UTC(2026, 7, 22) / 86_400_000);
const eight = [true, false, true, true, true, false, true, true].map(answer);

const render = (day: number, answers: RunAnswer[], locale = "en"): string =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(RunStripShare, { day, answers }),
    }),
  );

describe("the copyable block", () => {
  beforeAll(async () => {
    await loadDictionary("bn");
  });

  it("draws one mark per call, in order", () => {
    expect(render(SEED, eight)).toContain("🎯🫠🎯🎯🎯🫠🎯🎯");
  });

  it("gives a screen reader the count instead of eight emoji", () => {
    // Eight marks read aloud one at a time is noise rather than a result, so
    // the row is hidden and a sentence carries the same fact.
    const html = render(SEED, eight);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("6 of 8 called correctly.");
  });

  it("counts in the reader's own numerals", () => {
    // Bengali digits. A hardcoded locale would pass every other assertion here.
    expect(render(SEED, eight, "bn")).toContain("৬");
  });

  it("survives a run with nothing answered", () => {
    const html = render(SEED, []);
    expect(html).not.toContain("NaN");
    expect(html).toContain("0 of 0 called correctly.");
  });

  it("does not print the seed anywhere a player can see", () => {
    /*
      The strip's own test covers the text `buildRunStrip` returns. This covers
      the component, which is where the wrong number was actually passed, and
      the two are different failures: one is a formatting bug, the other is a
      wiring bug, and only the second shipped.
    */
    const html = render(SEED, eight);
    expect(html).not.toContain(String(SEED));
    expect(runNumber(SEED)).toBeGreaterThan(0);
  });
});
