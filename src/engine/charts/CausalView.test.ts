import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../../app/i18n";
import { puzzles } from "../../puzzles";
import type { CausalData } from "../../puzzles/schema";
import { CausalView } from "./CausalView";

/**
 * The causal trend figure draws no data points, and says where its line came
 * from. Both halves are load-bearing, and both were absent.
 *
 * WHAT SHIPPED. `CausalView` held a module-level `SCATTER` array of seven
 * hardcoded coordinates, commented as "a handful of points sitting near the
 * rising trend line", and drew them as circles along the slope. They were
 * invented. Nothing on the figure disclosed it, the aria-label said only that
 * the two quantities "rise together", and every other shape in the deck draws
 * counts read off a source table. On a project whose stated position is that
 * one sloppy error hands critics the whole thing, those were the only numbers
 * nobody sourced, and a reader had no way to tell.
 *
 * WHY A TEST AND NOT JUST A DELETION. `EcologicalData` already carries a
 * required `schematicNote` for exactly this reason, which is evidence that the
 * project knows the rule and can still miss a case. `CausalData` now requires
 * one too, so omitting it is a tsc error, but nothing would stop a later
 * change from reintroducing plotted points beside it. This asserts the figure
 * itself, which is the thing the reader actually sees.
 */

function render(data: CausalData, view: "trend" | "cause"): string {
  return renderToStaticMarkup(
    createElement(
      LocaleProvider,
      { locale: "en", children: createElement(CausalView, { data, view }) },
    ),
  );
}

/** The one shipped puzzle on this shape. */
function causalPuzzleData(): CausalData {
  const puzzle = puzzles.find((p) => p.setup.data.type === "causal");
  if (!puzzle || puzzle.setup.data.type !== "causal") {
    throw new Error("no causal puzzle in the registry");
  }
  return puzzle.setup.data;
}

describe("CausalView", () => {
  it("draws no plotted points on the trend view", () => {
    const markup = render(causalPuzzleData(), "trend");
    expect(markup).toContain("<svg");
    expect(
      markup,
      "the trend figure is drawing point marks again; a line carries the " +
        "published correlation, dots assert observations nobody sourced",
    ).not.toContain("<circle");
  });

  it("shows the schematic disclosure on the trend view", () => {
    const data = causalPuzzleData();
    const markup = render(data, "trend");
    expect(markup).toContain(data.schematicNote.en);
  });

  it("keeps the disclosure in the rendered text, not only in an aria-label", () => {
    /*
      A note that lived only in `aria-label` would tell a screen-reader user
      the figure is schematic and leave a sighted reader believing it is
      measured, which is the wrong way round for a disclosure.
    */
    const data = causalPuzzleData();
    const markup = render(data, "trend");
    const withoutAriaLabels = markup.replace(/aria-label="[^"]*"/g, "");
    expect(withoutAriaLabels).toContain(data.schematicNote.en);
  });
});
