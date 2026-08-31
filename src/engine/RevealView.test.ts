import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { puzzles } from "../puzzles/all";
import type { Puzzle } from "../puzzles/schema";
import { RevealView } from "./RevealView";
import { canScrub, scopeLabel } from "./charts/DataViewRenderer";

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
    /*
      If this ever stops matching, every absence assertion below becomes
      vacuous: a component that rendered nothing would pass them all.

      Either control counts. The seed is a `rates` puzzle and `rates` is now
      scrubbable, so it offers a slider rather than the button, and a guard
      that named only the button would have started failing for a reason that
      has nothing to do with what it guards.
    */
    const html = render(SEED);
    const offered =
      html.includes('type="range"') || text(html).includes("Reveal the answer");
    expect(offered, "the beat offers no way forward at all").toBe(true);
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


describe("a shape you drag rather than tap", () => {
  const RISK = puzzles.find((p) => p.slug === "relative-risk")!;
  /** A shape that cannot scrub, for the contrast. */
  const FLAT = puzzles.find((p) => p.setup.data.type === "causal")!;

  it("is the shape this covers, so the assertions below are about a scrub", () => {
    /*
      Guards the rest: if `risk` ever leaves SCRUBBABLE these become vacuous.
      The negative case has to be a shape that genuinely cannot scrub, and the
      seed stopped being one when `rates` opted in. `causal` is a real "cannot":
      its two beats are a scatter and a node diagram, two unrelated drawings
      with no path between them.
    */
    expect(
      canScrub(RISK.setup.data, RISK.setup.initialView, RISK.reveal.view),
    ).toBe(true);
    expect(
      canScrub(FLAT.setup.data, FLAT.setup.initialView, FLAT.reveal.view),
    ).toBe(false);
  });

  it("offers a slider instead of the button", () => {
    const html = render(RISK);
    expect(html).toContain('type="range"');
    expect(text(html)).not.toContain("Reveal the answer");
  });

  it("still gives an unscrubbable shape the button", () => {
    const html = render(FLAT);
    expect(html).not.toContain('type="range"');
    expect(text(html)).toContain("Reveal the answer");
  });

  it("captions the figure as the view the reader is actually looking at", () => {
    /*
      THE BUG THIS CATCHES. A scrubbed figure is handed the REVEAL view, because
      the renderer interpolates between the two itself from `phase`. Passing
      that same view to the caption made it read "Compared to the people" from
      the first paint, while the chart was still drawing the relative layout,
      for the whole first half of every drag. A figure captioned as something it
      is not is a small version of the dishonesty this feature exists to avoid.
    */
    const before = scopeLabel(RISK.setup.initialView.kind);
    const after = scopeLabel(RISK.reveal.view.kind);
    expect(before).not.toBe(after);

    const out = text(render(RISK));
    expect(out, "the caption jumped ahead of the chart").toContain(before);
    expect(out, "the caption is showing the reveal before the drag").not.toContain(
      after,
    );
  });

  it("still withholds the answer behind the drag", () => {
    // The scrub is the same beat, not a laxer one.
    const out = text(render(RISK));
    expect(out).not.toContain(RISK.reveal.headline.en);
    expect(out).not.toContain(RISK.reveal.mechanismName.en);
  });
});

/**
 * The legend follows the drag, and nothing real can prove it yet.
 *
 * A scrubbable beat renders `puzzle.reveal.view` for the whole drag, because
 * the chart interpolates between the two authored views itself. The legend was
 * handed that same view and never varied with the phase, so it named the
 * reveal's groups from phase 0. `kidney-stones` cannot show this: it draws both
 * groups on both beats, which is why the whole suite passes with the bug in
 * place. Twenty-nine of the thirty-one rates puzzles restrict groups between
 * their beats, so the first one of those to become scrubbable would have had
 * its setup spoiled by the legend alone: the same dropped-restriction defect
 * this feature already shipped once, through the one component the fix for it
 * did not touch.
 *
 * Hence a synthetic puzzle. It is `kidney-stones` with a setup that draws one
 * group instead of two, which is the ordinary authored shape everywhere else in
 * the deck and is exactly the case no scrubbable puzzle happens to occupy.
 */
describe("the legend during a drag", () => {
  const base = puzzles.find((p) => p.slug === "kidney-stones")!;
  const withRestrictedSetup: Puzzle = {
    ...base,
    setup: {
      ...base.setup,
      initialView: { ...base.setup.initialView, groupIds: ["A"] },
    },
  };

  it("names only the groups the setup draws, before the reader has dragged", () => {
    expect(
      canScrub(
        withRestrictedSetup.setup.data,
        withRestrictedSetup.setup.initialView,
        withRestrictedSetup.reveal.view,
      ),
    ).toBe(true);
    const html = render(withRestrictedSetup);
    const data = base.setup.data;
    if (data.type !== "rates") throw new Error("kidney-stones must be rates");
    const a = data.groups.find((g) => g.id === "A")!;
    const b = data.groups.find((g) => g.id === "B")!;
    expect(html).toContain(a.label.en);
    // B arrives when the reader drags. Naming it at rest is the spoiler.
    expect(html).not.toContain(b.label.en);
  });
});
