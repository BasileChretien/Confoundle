import { describe, it, expect } from "vitest";
import { puzzles } from "../../puzzles/all";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { canScrub, DataViewRenderer } from "./DataViewRenderer";

/**
 * Which puzzles may be dragged, asked of every puzzle in the deck.
 *
 * THE TEST THAT WAS MISSING, and its absence is why a defect shipped past a
 * green suite. `rates` was added to a set of scrubbable TYPES, verified
 * against `kidney-stones`, and described as covering the 31 rates puzzles.
 * Exactly two of the 31 author the aggregate/stratified pair the code
 * assumed, and one of those runs the other way round. Of the other 29, eighteen are
 * stratified on both beats and differ only by which groups or strata each
 * view restricts, which the scrub had no way to honour: it drew the withheld
 * group at phase 0 and spoiled the setup before the reader touched anything.
 *
 * The lesson is not "rates was the wrong shape". It is that a capability
 * verified on ONE puzzle was asserted of THIRTY, and nothing walked the deck
 * to check. So this walks the deck.
 */

/** Narrowing through the filter, so the flag below is reachable on the type. */
type RatesPuzzle = (typeof puzzles)[number] & {
  setup: { data: { type: "rates"; strataAreSeparateSamples?: boolean } };
};
const RATES = puzzles.filter(
  (p): p is RatesPuzzle => p.setup.data.type === "rates",
);

const scrubs = (p: (typeof puzzles)[number]) =>
  canScrub(p.setup.data, p.setup.initialView, p.reveal.view);

describe("which puzzles can be dragged", () => {
  it("has a deck to walk, so the assertions below are not vacuous", () => {
    expect(puzzles.length).toBeGreaterThan(50);
    expect(RATES.length).toBeGreaterThan(20);
  });

  it("refuses any rates puzzle whose beats are not a pooled/split pair", () => {
    /*
      THE ONE THAT MATTERS. Two stratified views differ by which slice each
      draws, which is an arrival rather than a transformation, and drawing it
      as a cross-dissolve between a pooled layer and a split one shows the
      reader a pooled total the puzzle never authored.
    */
    for (const p of RATES) {
      const forward =
        p.setup.initialView.kind === "aggregate" &&
        p.reveal.view.kind === "stratified";
      expect(
        scrubs(p),
        `${p.slug} scrubs=${scrubs(p)} with beats ${p.setup.initialView.kind} then ${p.reveal.view.kind}`,
      ).toBe(forward && p.setup.data.strataAreSeparateSamples !== true);
    }
  });

  it("never pools two views of the same people", () => {
    /*
      `strataAreSeparateSamples` marks a puzzle whose strata are overlapping
      samples of one cohort, so summing them double counts. `aggregateRates`
      knows nothing of that flag, and a scrub is the only thing that would
      ever call it on such a puzzle.
    */
    for (const p of RATES) {
      if (p.setup.data.strataAreSeparateSamples !== true) continue;
      expect(scrubs(p), `${p.slug} would pool overlapping samples`).toBe(false);
    }
  });

  it("lets exactly the puzzles that can be drawn continuously be dragged", () => {
    // Named, so that a puzzle joining or leaving this list is a decision
    // somebody made rather than something that happened.
    const dragging = puzzles.filter(scrubs).map((p) => p.slug).sort();
    expect(dragging).toEqual(["kidney-stones", "relative-risk"]);
  });

  it("refuses shapes whose two beats are unrelated drawings", () => {
    // `causal` is a scatter and then a node diagram; `ecological` changes the
    // unit of analysis, so a smooth path between its views teaches the
    // opposite of its lesson.
    for (const type of ["causal", "ecological"] as const) {
      for (const p of puzzles.filter((x) => x.setup.data.type === type)) {
        expect(scrubs(p), `${p.slug} should not scrub`).toBe(false);
      }
    }
  });
});


/**
 * Which layer the reader is shown, across the drag, on a puzzle whose beats
 * run the OTHER way round.
 *
 * `stage-migration` is stratified at the setup and aggregate at the reveal,
 * the opposite of `kidney-stones`. Every direction bug in this feature has
 * surfaced there and nowhere else, twice now, because it is the only puzzle
 * that can tell a direction-aware rule from a direction-blind one. The
 * midpoint is included deliberately: the two opacities are exactly equal
 * there, so any rule that breaks the tie by comparing them is blind to which
 * end is the reveal, and 0.5 is an ordinary place for a step-0.01 slider to
 * rest.
 */
describe("the scrub across the whole drag", () => {
  const FORWARD = puzzles.find((p) => p.slug === "kidney-stones")!;
  const REVERSED = puzzles.find((p) => p.slug === "stage-migration")!;

  const exposedLayer = (phase: number): "pooled" | "split" => {
    const html = renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(DataViewRenderer, {
          data: FORWARD.setup.data,
          view: FORWARD.reveal.view,
          animate: false,
          scrub: {
            from: FORWARD.setup.initialView,
            to: FORWARD.reveal.view,
            phase,
          },
        }),
      }),
    );
    const wrappers = [...html.matchAll(/aria-hidden="(true|false)"/g)].map(
      (m) => m[1],
    );
    expect(
      wrappers.filter((w) => w === "false").length,
      `exactly one layer must be announced at phase ${phase}`,
    ).toBe(1);
    // The pooled wrapper is written first, so the first flag describes it.
    return wrappers[0] === "false" ? "pooled" : "split";
  };

  it("refuses the reversed puzzle rather than handling it", () => {
    /*
      `stage-migration` is stratified at the setup and aggregate at the
      reveal. Supporting it cost two defects, both in direction handling, so
      the gate now refuses it and the code path is gone. It keeps the discrete
      flip. If somebody re-admits it, they have to restore that path
      deliberately, and this fails until they do.
    */
    expect(REVERSED.setup.initialView.kind).toBe("stratified");
    expect(REVERSED.reveal.view.kind).toBe("aggregate");
    expect(scrubs(REVERSED)).toBe(false);
  });

  /**
   * Both halves of one wrapper div, read together.
   *
   * `aria-hidden` and the opacity are computed from different expressions,
   * `phase < 0.5` and `ratesScrubFrame`, and nothing had ever compared them.
   * A review pass swapped the two `opacity` values between the wrappers and
   * every test in the suite still passed: assistive tech and the caption stayed
   * correct while the visible crossfade ran backwards, so the layer announced
   * as the setup was drawn transparent and the reveal was on screen from the
   * start. That is the defect the two earlier passes fixed, inverted to fool
   * the sighted reader instead of the screen reader.
   */
  const wrappers = (phase: number): { opacity: number; exposed: boolean }[] => {
    const html = renderToStaticMarkup(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(DataViewRenderer, {
          data: FORWARD.setup.data,
          view: FORWARD.reveal.view,
          animate: false,
          scrub: {
            from: FORWARD.setup.initialView,
            to: FORWARD.reveal.view,
            phase,
          },
        }),
      }),
    );
    const found = [
      ...html.matchAll(/style="opacity:([\d.]+)"[^>]*aria-hidden="(true|false)"/g),
    ].map((m) => ({ opacity: Number(m[1]), exposed: m[2] === "false" }));
    expect(found, `two layers must carry both flags at phase ${phase}`).toHaveLength(2);
    return found;
  };

  it("never announces the layer it is drawing the fainter of the two", () => {
    // At the midpoint the two are exactly equal, which the >= admits: that is
    // the crossing point, not a disagreement. Everywhere else the layer the
    // reader is told about has to be the one they can actually see.
    for (let i = 0; i <= 20; i++) {
      const phase = i / 20;
      const [pooled, split] = wrappers(phase) as [
        { opacity: number; exposed: boolean },
        { opacity: number; exposed: boolean },
      ];
      const shown = pooled.exposed ? pooled : split;
      const hidden = pooled.exposed ? split : pooled;
      expect(
        shown.opacity,
        `phase ${phase}: the announced layer is the fainter one`,
      ).toBeGreaterThanOrEqual(hidden.opacity);
    }
  });

  it("shows the setup's view until the midpoint and the reveal's after", () => {
    expect(exposedLayer(0)).toBe("pooled");
    expect(exposedLayer(0.25)).toBe("pooled");
    expect(exposedLayer(0.499)).toBe("pooled");
    expect(exposedLayer(0.5)).toBe("split");
    expect(exposedLayer(0.75)).toBe("split");
    expect(exposedLayer(1)).toBe("split");
  });

  it("agrees with the caption rule at every step of the track", () => {
    /*
      `RevealView` picks the figcaption with `phase >= 0.5` against the
      authored from/to pair. If the chart disagrees anywhere, the reader is
      told they are looking at one view while shown the other, which is the
      defect this feature has now produced twice.
    */
    for (let i = 0; i <= 100; i++) {
      const phase = i / 100;
      const captionSide = phase >= 0.5 ? "reveal" : "setup";
      // Pooled is the setup and split is the reveal, which the gate now
      // guarantees for every rates puzzle that scrubs.
      const chartSide = exposedLayer(phase) === "split" ? "reveal" : "setup";
      expect(chartSide, `caption and chart disagree at phase ${phase}`).toBe(
        captionSide,
      );
    }
  });
});
