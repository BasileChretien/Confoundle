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

  it("reads the standing screen, which used to be inline on home", () => {
    expect(viewFromSearch("?progress=1")).toEqual({ name: "progress" });
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

/**
 * One view of every kind, as a `Record` keyed by `View["name"]`.
 *
 * The type is the point: a `Record` over the union REQUIRES an entry per name,
 * so adding a member to `View` fails `tsc` here until it is covered. The
 * previous version was a hand-written array and had already drifted, shipping
 * `trapHunt` without ever round-tripping it. That is the failure mode a list
 * maintained by memory always eventually has.
 */
const ONE_OF_EACH: Record<View["name"], View> = {
  home: HOME,
  lesson: { name: "lesson", slug: REAL_SLUG },
  review: { name: "review", practice: false },
  about: { name: "about" },
  lessons: { name: "lessons" },
  trapHunt: { name: "trapHunt" },
  progress: { name: "progress" },
};

describe("writing a view to the URL", () => {
  it("round-trips every view", () => {
    // The practice flag is the one case where a name carries a second state,
    // so it rides along with the exhaustive set.
    const views: View[] = [
      ...Object.values(ONE_OF_EACH),
      { name: "review", practice: true },
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
