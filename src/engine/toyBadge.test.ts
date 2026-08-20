import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LocaleProvider } from "../app/i18n";
import { puzzles } from "../puzzles";
import { LessonView } from "./LessonView";
import { canMix } from "./charts/mixer";
import { canScreen } from "./charts/screen";

/**
 * THE BADGE PROMISES SOMETHING TO PLAY WITH, SO IT HAS TO BE THERE.
 *
 * Both toys are the most engaging thing in the lesson beat and the least
 * discoverable: they sit inside a collapsed fold whose summary says "The
 * longer answer", which promises reading. The badge is what tells a reader
 * there is something to drag.
 *
 * That makes it a claim like any other in this project, and it can fail in two
 * directions. Missing, and the toy stays unfound, which is the whole reason it
 * exists. Present on a puzzle with no toy, and it is a promise the fold cannot
 * keep, which is worse: a reader who opens it for the toy and finds prose
 * learns not to trust the badge, and the 71 puzzles without one vastly
 * outnumber the two with.
 *
 * SO THE CHECK WALKS THE WHOLE REGISTRY rather than the two puzzles I happen
 * to be thinking about. That is the same rule `declaredColors.test.ts` and
 * `scopeLabels.test.ts` follow: read the enumeration off a runtime source, so
 * the puzzle somebody adds next year is covered without its author knowing
 * this file exists. A hand-written list of two slugs would pass forever and
 * check nothing about the third toy.
 */

const BADGE = "Try it";

beforeAll(() => {
  // `LessonView` renders `ShareLesson`, which reads `window.location.origin`.
  vi.stubGlobal("window", { location: { origin: "https://confoundle.org" } });
});

const lessonHtml = (puzzle: (typeof puzzles)[number]) =>
  renderToStaticMarkup(
    createElement(LocaleProvider, {
      locale: "en",
      children: createElement(LessonView, {
        puzzle,
        onNext: () => {},
        onHome: () => {},
      }),
    }),
  );

describe("the fold's 'try it' badge", () => {
  it("is offered by some puzzles and not others, or it proves nothing", () => {
    const withToy = puzzles.filter(
      (p) => canMix(p.setup.data) || canScreen(p.setup.data),
    );
    expect(withToy.length).toBeGreaterThan(0);
    expect(withToy.length).toBeLessThan(puzzles.length);
  });

  it.each(puzzles.map((p) => [p.slug, p] as const))(
    "shows it on %s exactly when that puzzle has a toy",
    (_slug, puzzle) => {
      const hasToy = canMix(puzzle.setup.data) || canScreen(puzzle.setup.data);
      expect(lessonHtml(puzzle).includes(BADGE)).toBe(hasToy);
    },
  );
});
