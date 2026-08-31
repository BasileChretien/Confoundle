// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { LocaleProvider } from "../../app/i18n";
import { puzzles } from "../../puzzles/all";
import type { RatesData } from "../../puzzles/schema";
import { declaredColors } from "./palette";
import { SlicerView } from "./SlicerView";
import { MAX_SLICES, canSlice, contraryCount, sliceFrame, slicerModel } from "./subgroups";

/**
 * THE CLAIM, CHECKED WHERE IT IS MADE.
 *
 * `subgroups.test.ts` proves the model leaves the trial alone. That is not the
 * same as proving the FIGURE does, and on the screening toy the difference was
 * not academic: rewriting its fixed rows to read the moving frame survived the
 * entire suite, because `renderToStaticMarkup` cannot move a slider.
 *
 * So this one drags, and asserts the two things a single render cannot: that
 * the trial's own counts never move however finely the patients are cut, and
 * that cutting them finely really does produce subgroups contradicting it.
 */

const data = puzzles
  .map((p) => p.setup.data)
  .find((d): d is RatesData => canSlice(d))!;
const model = slicerModel(data);

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(SlicerView, { full: data }),
      }),
    );
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const slider = () => container.querySelector("input[type=range]") as HTMLInputElement;
const trialRows = () =>
  [
    ...container.querySelectorAll('[data-slicer="pooled"] li span:last-child'),
  ].map((n) => n.textContent ?? "");
const verdict = () =>
  container.querySelector('[data-slicer="verdict"]')!.textContent ?? "";
const cells = () => container.querySelectorAll("div[aria-hidden] > span").length;
const counts = () =>
  [...container.querySelectorAll('[aria-live] ul li span:last-child')].map(
    (n) => n.textContent ?? "",
  );

function dragTo(value: number) {
  const el = slider();
  const set = Object.getOwnPropertyDescriptor(
    globalThis.HTMLInputElement.prototype,
    "value",
  )!.set!;
  act(() => {
    set.call(el, String(value));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("dragging the subgroup slicer", () => {
  it("never moves the trial's own counts", () => {
    const atOpening = trialRows();
    expect(atOpening[0]).toContain("804 of 8,585");
    expect(atOpening[1]).toContain("1,015 of 8,599");

    for (const k of [2, 7, 13, MAX_SLICES]) {
      dragTo(k);
      expect(trialRows()).toEqual(atOpening);
    }
  });

  it("draws one cell per subgroup", () => {
    expect(cells()).toBe(1);
    dragTo(MAX_SLICES);
    expect(cells()).toBe(MAX_SLICES);
  });

  /**
   * THE PAYOFF, AND THE HONEST SHAPE OF IT. At the trial's own twelve
   * subgroups nothing contradicts it; the contradictions arrive when the
   * reader keeps cutting. Both halves are asserted, because a toy that only
   * ever showed contradictions would teach that subgroups are always wrong,
   * and one that never showed any would teach that they are always fine.
   */
  /**
   * THE VERDICT REPORTS THE DEAL IN FRONT OF THE READER, whatever it happens
   * to be. An earlier version asserted that twelve finds nothing, which was
   * true of one deal and false of most.
   */
  it("says whether this deal contradicts the trial, and counts it", () => {
    dragTo(MAX_SLICES);
    const contrary = contraryCount(model, sliceFrame(model, MAX_SLICES, 0));
    expect(contrary).toBeGreaterThan(0);
    expect(verdict()).toBe("Some subgroups now disagree with the trial.");
    expect(counts()).toEqual([
      `${MAX_SLICES - contrary} of ${MAX_SLICES}`,
      `${contrary} of ${MAX_SLICES}`,
    ]);
  });

  /**
   * RE-DEALING IS THE MOST IMPORTANT CONTROL HERE, because every arrangement
   * is one draw and a reader who saw only one would take it for a fact about
   * the trial. At the trial's own twelve, contradictions come and go.
   */
  it("re-deals the same patients into a different arrangement", () => {
    dragTo(12);
    const first = counts();
    const seen = new Set([first.join("|")]);
    const again = container.querySelectorAll("button")[0]!;
    expect(again.textContent).toBe("Deal them again");
    for (let i = 0; i < 12; i++) {
      act(() => {
        again.dispatchEvent(new Event("click", { bubbles: true }));
      });
      seen.add(counts().join("|"));
    }
    // The trial is untouched by all of it.
    expect(trialRows()[0]).toContain("804 of 8,585");
    expect(seen.size).toBeGreaterThan(1);
  });

  /**
   * THE CELLS ARE THE ONLY PART OF THE FIGURE THAT IS NOT WORDS, and nothing
   * checked what their colours meant: swapping them survived the whole suite.
   *
   * They are coloured by WHICH ARM LED, through `declaredColors`, so a colour
   * here means what the same colour means anywhere else in the app. An earlier
   * version coloured by agreement-with-the-trial while borrowing the group
   * palette's first two slots, which coincide on this puzzle only because its
   * overall leader happens to be the first-declared arm. On a trial whose
   * winner is the second, cells agreeing with it would have taken the first
   * arm's colour, under a reveal chart drawing that arm in the other one. That
   * is the `reporting-rate-violent-crime` defect, in a renderer
   * `declaredColors.test.ts` cannot reach.
   */
  it("colours each cell by the arm that led in it", () => {
    dragTo(MAX_SLICES);
    const frame = sliceFrame(model, MAX_SLICES, 0);
    const swatches = [...container.querySelectorAll("div[aria-hidden] > span")].map(
      (n) => (n as HTMLElement).style.backgroundColor,
    );
    const expected = frame.map((s) =>
      s.leader === null ? "var(--color-paper-3)" : declaredColors(data.groups)(s.leader),
    );
    expect(swatches).toEqual(expected);
    // And both arms really do appear, or the assertion above is vacuous.
    expect(new Set(swatches).size).toBeGreaterThan(1);
  });

  it("speaks its position, and keeps speaking it as it moves", () => {
    // One slice is not a subgroup, so it does not announce itself as "1
    // subgroups". Found by reading the panel in a browser.
    expect(slider().getAttribute("aria-valuetext")).toBe("Not cut up");
    dragTo(13);
    expect(slider().getAttribute("aria-valuetext")).toBe("Cut into 13");
  });

  /**
   * AND THE SENTENCE AT ONE SLICE IS ABOUT THE TRIAL, not about a subgroup.
   * The verdict read "All 1 subgroups still favour Aspirin", which is both
   * ungrammatical and wrong about what the reader is looking at: the opening
   * position is the published result, not one of the rearrangements.
   */
  it("describes the uncut position as the trial", () => {
    expect(verdict()).toBe("Uncut, this is both arms pooled.");
    expect(counts()).toEqual([]);
    dragTo(2);
    expect(verdict()).not.toContain("pooled");
    expect(counts()).toHaveLength(2);
  });

  /** Exactly one position is the trial, and there is a way back to it. */
  it("goes back to the trial itself", () => {
    dragTo(MAX_SLICES);
    const back = [...container.querySelectorAll("button")].find(
      (b) => b.textContent === "Back to the trial itself",
    )!;
    expect(back.textContent).toBe("Back to the trial itself");
    act(() => {
      back.dispatchEvent(new Event("click", { bubbles: true }));
    });
    expect(slider().value).toBe("1");
    expect(cells()).toBe(1);
  });
});
