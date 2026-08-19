import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { CalibrationRunView } from "./CalibrationRunView";
import { drawDailyRun } from "../srs/dailyRun";
import { todayDayNumber } from "../app/session";

/**
 * The wiring that makes the daily a daily, which nothing tested.
 *
 * `srs/dailyRun.ts` is well covered and none of it matters if the view calls
 * the other draw. A review pointed out that this file has never had a test at
 * all, and that this is exactly how a defect reached it: the record was written
 * on a guaranteed-repeat replay, with a green suite.
 *
 * `renderToStaticMarkup` runs no effects, but the draw happens in a `useMemo`
 * on mount, so the FIRST item is on screen in the initial render. That is
 * enough to prove which draw ran.
 */
function memoryStorage(seed: Record<string, string> = {}) {
  const m = new Map<string, string>(Object.entries(seed));
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, String(v)),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
  };
}

const render = (daily: boolean): string =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: "en",
      children: createElement(CalibrationRunView, { daily, onDone: () => {} }),
    }),
  );

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

describe("the run view's draw", () => {
  beforeEach(() => vi.stubGlobal("localStorage", memoryStorage()));
  afterEach(() => vi.restoreAllMocks());

  it("opens the daily on today's shared first item", () => {
    const expected = drawDailyRun(todayDayNumber())[0]!;
    const html = render(true);
    expect(html).toContain(esc(expected.scenario.en));
  });

  it("draws something else when it is not the daily", () => {
    /*
      The private run passes `recentlySeen()` and `Math.random`, so this is the
      one assertion that can be flaky by design. A thousand-item bank makes a
      collision with today's first item a one-in-a-thousand event, and the
      point is only that the two paths are not the same call.
    */
    const daily = drawDailyRun(todayDayNumber())[0]!;
    const seen = new Set<string>();
    for (let i = 0; i < 12; i++) {
      const html = render(false);
      seen.add(html.includes(esc(daily.scenario.en)) ? "same" : "other");
    }
    expect(seen.has("other")).toBe(true);
  });

  it("says it is practice once the day is spent, and not before", () => {
    expect(render(true)).not.toContain("Practice.");

    vi.stubGlobal(
      "localStorage",
      memoryStorage({ "confoundle:dailyrun:v1": String(todayDayNumber()) }),
    );
    expect(render(true)).toContain("Practice.");
    // And a private run is never practice, whatever the daily's state.
    expect(render(false)).not.toContain("Practice.");
  });

  it("labels the daily with its number and the private run without one", () => {
    expect(render(true)).toContain("Today&#x27;s run");
    expect(render(false)).toContain("Calibration run");
    expect(render(false)).not.toContain("Today&#x27;s run");
  });
});

/**
 * That the view ASKS the predicate, which rendering cannot show.
 *
 * `runCountsTowardRecord` is tested directly and the view calls it after eight
 * answers, which no test can reach through a component holding its own state:
 * deleting the call leaves every other test here green. So this reads the
 * source, and it is worth being exact about what that buys. It proves the guard
 * is still called before the write, in this file, in this order. It cannot
 * prove the arguments are the right way round, and it would not notice a second
 * write added elsewhere.
 *
 * A tripwire on a defect that already happened once, not a proof.
 */
describe("the record is still gated", () => {
  const SOURCE = import.meta.glob("./CalibrationRunView.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const src = Object.values(SOURCE)[0];

  it("read the file rather than an empty glob", () => {
    expect(src).toBeDefined();
    expect(src!.length).toBeGreaterThan(1000);
  });

  it("asks the predicate before it writes", () => {
    const body = src!;
    const guard = body.indexOf("runCountsTowardRecord(");
    const write = body.indexOf("recordRun(");
    expect(guard, "the guard is gone").toBeGreaterThan(-1);
    expect(write, "the write is gone").toBeGreaterThan(-1);
    expect(guard, "the write happens before the guard").toBeLessThan(write);
  });

  it("writes the record exactly once", () => {
    // A second call site would be outside the guard above and nothing else
    // would notice.
    expect(src!.split("recordRun(").length - 1).toBe(1);
  });
});
