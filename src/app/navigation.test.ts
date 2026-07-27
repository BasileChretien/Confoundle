import { describe, it, expect } from "vitest";
import { HOME, sameView, searchForView, viewFromSearch, type View } from "./navigation";
import { puzzles } from "../puzzles";

const REAL_SLUG = puzzles[0].slug;

describe("reading a view from the URL", () => {
  it("opens a shared lesson link straight into that lesson", () => {
    expect(viewFromSearch(`?p=${REAL_SLUG}`)).toEqual({
      name: "lesson",
      slug: REAL_SLUG,
    });
  });

  it("ignores a slug that no longer exists rather than showing a blank screen", () => {
    // Lessons can be renamed or retired; an old link must degrade to the list.
    expect(viewFromSearch("?p=this-was-deleted")).toEqual(HOME);
  });

  it("distinguishes a scheduled review from practice", () => {
    expect(viewFromSearch("?review=1")).toEqual({ name: "review", practice: false });
    expect(viewFromSearch("?review=practice")).toEqual({ name: "review", practice: true });
  });

  it("reads the about screen", () => {
    expect(viewFromSearch("?about=1")).toEqual({ name: "about" });
  });

  it("reads the all-lessons screen", () => {
    expect(viewFromSearch("?lessons=1")).toEqual({ name: "lessons" });
  });

  it("falls back to home for anything unrecognised", () => {
    expect(viewFromSearch("")).toEqual(HOME);
    expect(viewFromSearch("?utm_source=twitter")).toEqual(HOME);
    expect(viewFromSearch("?review=nonsense")).toEqual(HOME);
  });

  it("prefers a lesson over other parameters, since that is the shared link", () => {
    expect(viewFromSearch(`?p=${REAL_SLUG}&progress=1`)).toEqual({
      name: "lesson",
      slug: REAL_SLUG,
    });
  });
});

describe("writing a view to the URL", () => {
  it("round-trips every view", () => {
    const views: View[] = [
      HOME,
      { name: "lesson", slug: REAL_SLUG },
      { name: "review", practice: false },
      { name: "review", practice: true },
      { name: "about" },
      { name: "lessons" },
    ];
    for (const v of views) {
      const search = searchForView(v);
      // "." means home with no query, which parses as home.
      expect(viewFromSearch(search === "." ? "" : search)).toEqual(v);
    }
  });

  it("leaves no stale parameter behind on the way home", () => {
    // Returning home used to be a state flip with the URL untouched, so a
    // refresh would reopen whatever the query string still said.
    expect(searchForView(HOME)).toBe(".");
  });

  it("escapes a slug rather than trusting it", () => {
    expect(searchForView({ name: "lesson", slug: "a b&c" })).toBe("?p=a%20b%26c");
  });
});

describe("comparing views", () => {
  it("treats identical views as one history entry", () => {
    expect(sameView(HOME, HOME)).toBe(true);
    expect(
      sameView({ name: "lesson", slug: REAL_SLUG }, { name: "lesson", slug: REAL_SLUG }),
    ).toBe(true);
  });

  it("separates a review from practice, so back works between them", () => {
    expect(
      sameView({ name: "review", practice: false }, { name: "review", practice: true }),
    ).toBe(false);
  });
});
