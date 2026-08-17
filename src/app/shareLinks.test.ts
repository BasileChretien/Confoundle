import { describe, it, expect } from "vitest";
import { puzzles } from "../puzzles";
import { viewFromSearch } from "./navigation";
import { appUrl, displayHost, puzzleUrl } from "./shareLinks";

/**
 * The share loop's one job is that somebody who receives a card can reach the
 * app. Before this module the card carried no address at all, and the single
 * hardcoded URL in the codebase pointed at the stale preview host.
 */

const ORIGIN = "https://confoundle.org";

describe("puzzleUrl", () => {
  it("produces a link the app's own router resolves back to that puzzle", () => {
    /*
      THE ASSERTION THAT MATTERS. A share link is only worth anything if the
      app parses it, so this round-trips through the real `viewFromSearch`
      rather than matching a string. Note `viewFromSearch` rejects a slug that
      is not in the registry, so this also proves the slug survived encoding.
    */
    const puzzle = puzzles[0]!;
    const url = puzzleUrl(ORIGIN, puzzle.slug);
    const search = url.slice(url.indexOf("?"));
    expect(viewFromSearch(search)).toEqual({ name: "lesson", slug: puzzle.slug });
  });

  it("round-trips every puzzle in the deck", () => {
    for (const puzzle of puzzles) {
      const url = puzzleUrl(ORIGIN, puzzle.slug);
      expect(viewFromSearch(url.slice(url.indexOf("?")))).toEqual({
        name: "lesson",
        slug: puzzle.slug,
      });
    }
  });

  it("opens the puzzle, not the lesson page that gives the answer away", () => {
    // `/l/<slug>/` is the prerendered explanation and opens on the answer by
    // design. A challenge card must never point there.
    const url = puzzleUrl(ORIGIN, "chocolate-nobel");
    expect(url).toBe("https://confoundle.org/?p=chocolate-nobel");
    expect(url).not.toContain("/l/");
  });

  it("does not double the slash when the origin carries one", () => {
    expect(puzzleUrl("https://confoundle.org/", "chocolate-nobel")).toBe(
      "https://confoundle.org/?p=chocolate-nobel",
    );
  });

  it("emits a link to wherever it is actually running", () => {
    // A preview deployment, a fork and a dev server each share themselves.
    expect(puzzleUrl("http://localhost:5173", "chocolate-nobel")).toBe(
      "http://localhost:5173/?p=chocolate-nobel",
    );
  });
});

describe("appUrl", () => {
  it("is the bare front door", () => {
    expect(appUrl(ORIGIN)).toBe("https://confoundle.org/");
    expect(appUrl("https://confoundle.org/")).toBe("https://confoundle.org/");
  });
});

describe("displayHost", () => {
  it("prints what a person can retype off an image", () => {
    expect(displayHost(ORIGIN)).toBe("confoundle.org");
    expect(displayHost("https://www.confoundle.org")).toBe("confoundle.org");
    expect(displayHost("http://localhost:5173")).toBe("localhost:5173");
  });

  it("carries no query string, because that is the part people mistype", () => {
    expect(displayHost(ORIGIN)).not.toContain("?");
  });
});
