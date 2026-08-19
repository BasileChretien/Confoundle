import { describe, it, expect, beforeAll } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { loadDictionary } from "../app/translations";
import type { RunAnswer } from "../srs/calibrationRun";
import { StakeReadout } from "./CalibrationRunView";

/**
 * The one number this mode exists to give a player, rendered.
 *
 * IT WAS INLINE IN A COMPONENT NO TEST COULD REACH. A review swapped the two
 * slots, so "1 of 3" would have rendered as "3 of 1", and the entire suite
 * passed: the block draws only after eight items are answered, which cannot be
 * reached through a component holding its own state. That is why the read-out
 * is now its own pure component.
 *
 * A read-out that misdescribes the player to themselves is the one failure this
 * mode cannot absorb, because being wrong about your own reliability is the
 * exact thing it is teaching people to notice.
 */
const answer = (correct: boolean, confidence: RunAnswer["confidence"]): RunAnswer =>
  ({ correct, confidence }) as RunAnswer;

function render(answers: RunAnswer[], locale = "en"): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(StakeReadout, { answers }),
    }),
  );
}

describe("the stake read-out", () => {
  beforeAll(async () => {
    await loadDictionary("bn");
  });

  it("puts the hits first and the calls second, not the reverse", () => {
    // The exact mutation that survived the whole suite. The two numbers differ
    // on purpose: equal ones cannot tell the orderings apart.
    const html = render([
      answer(true, "certain"),
      answer(false, "certain"),
      answer(false, "certain"),
    ]);
    expect(html).toContain("1 of 3");
    expect(html).not.toContain("3 of 1");
  });

  it("names a stake that was never used rather than showing it as zero", () => {
    // "0 of 0" is a ratio with no denominator, on a deck about denominators.
    const html = render([answer(true, "sure")]);
    expect(html).toContain("not staked");
    expect(html).not.toContain("0 of 0");
  });

  it("draws every stake, so a missing row cannot hide a bad one", () => {
    const html = render([
      answer(true, "hunch"),
      answer(true, "sure"),
      answer(false, "certain"),
    ]);
    expect(html).toContain("1 of 1");
    expect(html).toContain("0 of 1");
    expect(html.match(/<li/g)).toHaveLength(3);
  });

  it("survives a run with no answers at all", () => {
    const html = render([]);
    expect(html).not.toContain("NaN");
    expect(html.match(/<li/g)).toHaveLength(3);
  });

  it("draws the reader's own numerals", () => {
    const html = render(
      [answer(true, "certain"), answer(false, "certain")],
      "bn",
    );
    expect(html).toContain("১"); // Bengali one
    expect(html).not.toContain("1 of 2");
  });
});
