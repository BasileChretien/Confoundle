import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { puzzles } from "../puzzles";
import type { Puzzle } from "../puzzles/schema";
import { RevealView } from "./RevealView";
import { scopeLabel } from "./charts/DataViewRenderer";

/**
 * The reveal must not have happened before the player asks for it.
 *
 * WHAT THIS CATCHES. The old beat rendered the verdict badge, the score, the
 * reveal headline and the reaction line ON MOUNT, then flipped the chart on a
 * 1100ms timer. So the answer was on screen a full second before the picture
 * moved: the app printed the punchline and then played the joke. Under
 * `prefers-reduced-motion` the figure opened already flipped, so those players
 * never saw the before state at all and the two-views-of-one-dataset mechanism
 * was simply gone.
 *
 * `renderToStaticMarkup` is exactly the right instrument for this. It renders
 * initial state and runs no effects, which is precisely the moment in question:
 * whatever appears here is what the player sees before doing anything. The old
 * component fails this file on its first assertion.
 *
 * WHAT IT CANNOT COVER, stated rather than glossed. There is no DOM testing
 * library in this project, so the post-click state is not exercised here. The
 * `revealed` branch is ordinary JSX guarded by one boolean, and the property
 * that actually regressed is this one: things appearing before they are earned.
 */

function render(puzzle: Puzzle, locale = "en"): string {
  return renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale,
      children: createElement(RevealView, {
        puzzle,
        // The trap answer where there is one, so the wrong-answer path is what
        // gets rendered: that is the path the old code spoiled hardest.
        committed:
          puzzle.choices.find((c) => c.isIntuitiveTrap) ?? puzzle.choices[0]!,
        confidence: "certain",
        onNext: () => {},
      }),
    }),
  );
}

/** Strip tags so a headline split across elements still counts as present. */
function text(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
}

const SEED = puzzles.find((p) => p.slug === "kidney-stones") ?? puzzles[0]!;

describe("the reveal beat before the player pulls the lever", () => {
  it("offers the lever", () => {
    // If this ever stops matching, every absence assertion below becomes
    // vacuous: a component that rendered nothing would pass them all.
    expect(text(render(SEED))).toContain("Reveal the answer");
  });

  it("does not print the reveal headline", () => {
    const headline = SEED.reveal.headline.en;
    expect(headline.length).toBeGreaterThan(10);
    expect(text(render(SEED))).not.toContain(headline);
  });

  it("does not print the mechanism, which is the whole answer", () => {
    expect(text(render(SEED))).not.toContain(SEED.reveal.mechanismName.en);
    expect(text(render(SEED))).not.toContain(SEED.reveal.explanation.en);
  });

  it("does not deliver the verdict or the score", () => {
    const out = text(render(SEED));
    expect(out).not.toContain("The trap worked");
    expect(out).not.toContain("You caught it");
    expect(out).not.toContain("pts");
  });

  it("still says which answer the player gave", () => {
    // The one thing that belongs on screen before the flip: their own commit.
    expect(text(render(SEED))).toContain("You picked");
  });

  it("draws the view the player committed against, not the reveal's", () => {
    /*
      The load-bearing one. The figure has to open on the BEFORE state, or
      there is no before and after and the beat has nothing to show.
    */
    const out = text(render(SEED));
    const before = SEED.setup.initialView;
    const after = SEED.reveal.view;
    const beforeLabel = before.caption?.en ?? scopeLabel(before.kind);
    const afterLabel = after.caption?.en ?? scopeLabel(after.kind);

    expect(beforeLabel).not.toBe(afterLabel);
    expect(out).toContain(beforeLabel);
    expect(out).not.toContain(afterLabel);
  });

  it("holds every puzzle in the deck back, not just the seed", () => {
    const spoiled: string[] = [];
    for (const puzzle of puzzles) {
      const out = text(render(puzzle));
      if (out.includes(puzzle.reveal.mechanismName.en)) {
        spoiled.push(`${puzzle.slug}: mechanism`);
      }
      if (out.includes(puzzle.reveal.headline.en)) {
        spoiled.push(`${puzzle.slug}: headline`);
      }
    }
    expect(
      spoiled,
      `These puzzles show their answer before the player asks:\n${spoiled.join("\n")}`,
    ).toEqual([]);
  });
});
