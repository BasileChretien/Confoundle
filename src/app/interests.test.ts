import { describe, it, expect } from "vitest";
import type { Puzzle, TagId } from "../puzzles/schema";
import { puzzles } from "../puzzles";
import {
  availableInterests,
  filterByInterests,
  matchesInterests,
  pruneInterests,
  toggleInterest,
} from "./interests";

/** Just enough of a puzzle to carry tags; the helpers only read `tags`. */
const withTags = (tags: TagId[]): Puzzle => ({ tags } as unknown as Puzzle);

describe("what the chooser is allowed to offer", () => {
  it("never offers an interest that would empty the screen", () => {
    const offered = availableInterests(puzzles);
    for (const tag of offered) {
      expect(filterByInterests(puzzles, [tag]).length).toBeGreaterThan(0);
    }
  });

  it("leaves out the tags no puzzle carries yet", () => {
    const offered = availableInterests(puzzles);
    // The expansion areas are in the vocabulary but have no lessons yet, so the
    // chooser must not advertise them. This flips on its own once one lands.
    expect(offered).not.toContain("media");
    expect(offered).not.toContain("politics");
    // ...while the areas the deck really covers are offered.
    expect(offered).toContain("everyday");
    expect(offered).toContain("clinical");
  });

  it("offers them in the canonical order, not registry order", () => {
    const offered = availableInterests(puzzles);
    expect(offered.indexOf("everyday")).toBeLessThan(offered.indexOf("clinical"));
  });
});

describe("matching", () => {
  const medical = withTags(["clinical", "epidemiology"]);
  const civic = withTags(["everyday", "statistics"]);

  it("treats an empty selection as everything, so the default costs no decision", () => {
    expect(matchesInterests(medical, [])).toBe(true);
    expect(filterByInterests([medical, civic], [])).toHaveLength(2);
  });

  it("keeps a puzzle that carries ANY chosen tag, since lessons carry several", () => {
    expect(matchesInterests(medical, ["epidemiology"])).toBe(true);
    expect(matchesInterests(medical, ["everyday"])).toBe(false);
    expect(filterByInterests([medical, civic], ["everyday"])).toEqual([civic]);
  });

  it("widens rather than narrows as more interests are picked", () => {
    const one = filterByInterests(puzzles, ["clinical"]).length;
    const two = filterByInterests(puzzles, ["clinical", "everyday"]).length;
    expect(two).toBeGreaterThanOrEqual(one);
  });
});

describe("keeping a stored selection honest", () => {
  it("drops tags that are not real, so junk in storage cannot hide the course", () => {
    expect(pruneInterests(["clinical", "not-a-tag", ""], puzzles)).toEqual(["clinical"]);
  });

  it("drops a tag that has lost its last puzzle", () => {
    expect(pruneInterests(["media"], puzzles)).toEqual([]);
  });
});

describe("toggling", () => {
  it("adds, removes, and keeps canonical order however they were clicked", () => {
    let sel = toggleInterest([], "clinical");
    expect(sel).toEqual(["clinical"]);
    sel = toggleInterest(sel, "everyday");
    // everyday precedes clinical in TAG_ORDER, whichever was chosen first.
    expect(sel).toEqual(["everyday", "clinical"]);
    sel = toggleInterest(sel, "clinical");
    expect(sel).toEqual(["everyday"]);
  });
});
