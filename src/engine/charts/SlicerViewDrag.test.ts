// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { LocaleProvider } from "../../app/i18n";
import { puzzles } from "../../puzzles";
import type { RatesData } from "../../puzzles/schema";
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
  [...container.querySelectorAll("ul li span:last-child")].map(
    (n) => n.textContent ?? "",
  );
const verdict = () =>
  container.querySelector('[data-slicer="verdict"]')!.textContent ?? "";
const cells = () => container.querySelectorAll("div[aria-hidden] > span").length;

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
  it("finds no contradiction at twelve and several by the end", () => {
    dragTo(12);
    expect(verdict()).toContain("All 12 subgroups still favour");

    dragTo(MAX_SLICES);
    const expected = contraryCount(model, sliceFrame(model, MAX_SLICES));
    expect(expected).toBeGreaterThan(0);
    expect(verdict()).toContain(`${expected} of the ${MAX_SLICES} subgroups`);
  });

  it("speaks its position, and keeps speaking it as it moves", () => {
    // One slice is not a subgroup, so it does not announce itself as "1
    // subgroups". Found by reading the panel in a browser.
    expect(slider().getAttribute("aria-valuetext")).toBe("Not cut up");
    dragTo(13);
    expect(slider().getAttribute("aria-valuetext")).toBe("13 subgroups");
  });

  /**
   * AND THE SENTENCE AT ONE SLICE IS ABOUT THE TRIAL, not about a subgroup.
   * The verdict read "All 1 subgroups still favour Aspirin", which is both
   * ungrammatical and wrong about what the reader is looking at: the opening
   * position is the published result, not one of the rearrangements.
   */
  it("describes the uncut position as the trial", () => {
    expect(verdict()).toBe("Uncut, this is the whole trial.");
    dragTo(2);
    expect(verdict()).not.toContain("whole trial");
  });

  /** Exactly one position is the trial, and there is a way back to it. */
  it("goes back to the trial itself", () => {
    dragTo(MAX_SLICES);
    expect(verdict()).not.toContain("All 1 subgroups");
    const back = container.querySelector("button")!;
    expect(back.textContent).toBe("Back to the trial itself");
    act(() => {
      back.dispatchEvent(new Event("click", { bubbles: true }));
    });
    expect(slider().value).toBe("1");
    expect(cells()).toBe(1);
  });
});
