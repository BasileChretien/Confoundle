// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { LocaleProvider } from "../../app/i18n";
import { puzzles } from "../../puzzles/all";
import type { FrequenciesData } from "../../puzzles/schema";
import { ScreenView } from "./ScreenView";
import { GROUP_PALETTE } from "./palette";
import { canScreen, screenFrame, screenModel } from "./screen";

/**
 * THE TOY'S CENTRAL CLAIM, CHECKED WHERE IT IS ACTUALLY MADE.
 *
 * `screen.test.ts` proves the model holds the test's characteristics still.
 * That is not the same as proving the FIGURE does, and review showed the
 * difference is not academic: rewriting the two "unchanged" rows to read the
 * current frame instead of the model survived the entire suite, because
 * `renderToStaticMarkup` cannot move a slider and every other test renders one
 * frame and stops.
 *
 * So this one drags. It is the only test in the file that can distinguish "the
 * numbers are right at the opening position" from "the numbers never move",
 * and the second is the whole promise.
 *
 * It also covers the things a single static render cannot see at all: that the
 * bar's two segments are sized by the counts rather than by each other, that
 * the slider spans the whole population, and that its spoken value tracks it.
 * All of those survived the suite before this file existed.
 */

const data = puzzles
  .map((p) => p.setup.data)
  .find((d): d is FrequenciesData => canScreen(d))!;

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
        children: createElement(ScreenView, { full: data }),
      }),
    );
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const slider = () => container.querySelector("input[type=range]")!;
const shareLine = () =>
  container.querySelector('[data-screen="share"]')!.textContent ?? "";
/** The two rows that must never move: whatever sits in the fixed list. */
const characteristics = () =>
  [...container.querySelectorAll("ul li span:last-child")].map(
    (n) => n.textContent ?? "",
  );
const segments = () =>
  [...container.querySelectorAll("div[style]")].map((n) => ({
    width: (n as HTMLElement).style.width,
    color: (n as HTMLElement).style.backgroundColor,
  }));

function dragTo(value: number) {
  const el = slider() as HTMLInputElement;
  const set = Object.getOwnPropertyDescriptor(
    globalThis.HTMLInputElement.prototype,
    "value",
  )!.set!;
  act(() => {
    set.call(el, String(value));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("dragging the screening toy", () => {
  it("never moves the test's two characteristics", () => {
    const atOpening = characteristics();
    expect(atOpening).toEqual(["100%", "5%"]);

    for (const n of [0, 48, 200, 500, data.total]) {
      dragTo(n);
      expect(characteristics()).toEqual(atOpening);
    }
  });

  it("moves the share all the way from almost none to almost all", () => {
    dragTo(1);
    expect(shareLine()).toContain("2%");
    dragTo(500);
    expect(shareLine()).toContain("95%");
    dragTo(0);
    expect(shareLine()).toContain("0%");
  });

  /**
   * The bar is the only part of the figure that is not words, and its two
   * segments are the counts. Sizing the real one by the false count, or
   * swapping the colours, left the whole suite green while the picture
   * contradicted the sentence printed underneath it.
   */
  it("sizes and colours the bar by the counts it is drawn from", () => {
    dragTo(200);
    const frame = screenFrame(screenModel(data), 200);
    const positives = frame.truePositives + frame.falsePositives;
    const [real, fake] = segments();
    expect(real!.width).toBe(`${(frame.truePositives / positives) * 100}%`);
    expect(fake!.width).toBe(`${(frame.falsePositives / positives) * 100}%`);
    // happy-dom keeps the authored form rather than normalising to rgb().
    expect(real!.color).toBe(GROUP_PALETTE[0]);
    expect(fake!.color).toBe(GROUP_PALETTE[1]);
  });

  it("lets the reader reach every base rate, one person at a time", () => {
    const el = slider() as HTMLInputElement;
    expect(el.min).toBe("0");
    expect(el.max).toBe(String(data.total));
    expect(el.step).toBe("1");
  });

  /**
   * And the spoken value tracks the dial. Nothing asserted this existed at
   * all, so renaming the attribute away was invisible.
   */
  it("speaks its position, and keeps speaking it as it moves", () => {
    expect(slider().getAttribute("aria-valuetext")).toBe("1 of 1,000");
    dragTo(500);
    expect(slider().getAttribute("aria-valuetext")).toBe("500 of 1,000");
  });

  /**
   * THE WAY BACK TO THE MEASUREMENT.
   *
   * Exactly one position on this slider is a study rather than a what-if, and
   * before this control nothing on screen said which, nor could a reader on a
   * phone return to it: a thousand stops across 375 px puts one person at
   * about a third of a pixel, and the first four values share the first one.
   *
   * Both halves are asserted, because either alone is useless. A button that
   * restores without naming the number leaves the reader unable to tell a
   * measurement from a guess; one that names it without restoring is a caption
   * pretending to be a control.
   */
  it("names the measured base rate and goes back to it", () => {
    const back = container.querySelector("button")!;
    expect(back.textContent).toBe("Back to the measured 1 in 1,000");

    dragTo(500);
    expect(shareLine()).toContain("95%");

    act(() => {
      back.dispatchEvent(new Event("click", { bubbles: true }));
    });
    expect((slider() as HTMLInputElement).value).toBe(
      String(data.withCondition),
    );
    expect(shareLine()).toContain("2%");
  });

  /**
   * And it names the PUZZLE'S number rather than a remembered one.
   *
   * ASSERTED AGAINST A DIFFERENT TABLE, because asserting it against this one
   * proves nothing: a label hardcoded to "1 in 1,000" renders correctly on the
   * only screening puzzle that exists, and the mutation survived until this
   * test rendered a second. That is the third time on these toys that the
   * shipped puzzle's own numbers have hidden a bug, after `sensitivity: 1` and
   * the rounding direction, so it is now the default suspicion rather than a
   * surprise: a figure with one puzzle behind it is tested against that
   * puzzle's coincidences unless a synthetic one says otherwise.
   */
  it("takes that number from the puzzle, not from the engine", () => {
    const other: FrequenciesData = {
      ...data,
      total: 400,
      withCondition: 37,
      positiveGivenCondition: 30,
      positiveGivenNoCondition: 36,
    };
    const second = document.createElement("div");
    document.body.appendChild(second);
    const secondRoot = createRoot(second);
    act(() => {
      secondRoot.render(
        createElement(LocaleProvider, {
          locale: "en",
          children: createElement(ScreenView, { full: other }),
        }),
      );
    });
    expect(second.querySelector("button")!.textContent).toBe(
      "Back to the measured 37 in 400",
    );
    act(() => secondRoot.unmount());
    second.remove();
  });

  /**
   * THE NUMBER THAT MOVES HAS TO BE THE NUMBER THAT IS SPOKEN.
   *
   * Asserting that the markup contains `aria-live="polite"` somewhere is not
   * this: the verdict has its own region, so that check stayed green with the
   * share left outside every one of them, which is precisely the state review
   * found. A screen-reader user then hears the dial and the conclusion and
   * never the 2% to 95% swing in between. So the assertion walks up from the
   * share itself.
   */
  it("puts the share inside a live region, not merely somewhere on the page", () => {
    const share = container.querySelector('[data-screen="share"]')!;
    expect(share.closest("[aria-live]")).not.toBeNull();
  });

  /**
   * The two fixed rows describe different things, and swapping the puzzle's
   * two labels made the panel read "Of the people who test positive, it
   * catches" with the suite still green.
   */
  it("describes each characteristic with the right label", () => {
    const rows = [...container.querySelectorAll("ul li")].map(
      (n) => n.textContent ?? "",
    );
    expect(rows[0]).toContain("have the disease");
    expect(rows[1]).not.toContain("have the disease");
  });
});
