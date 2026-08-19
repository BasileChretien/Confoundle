import { describe, it, expect } from "vitest";
import {
  HOME,
  landingRewrite,
  landingView,
  sameView,
  searchForView,
  viewFromSearch,
  type View,
} from "./navigation";
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

  it("reads the calibration run", () => {
    expect(viewFromSearch("?run=1")).toEqual({ name: "calibrationRun" });
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
  calibrationRun: { name: "calibrationRun" },
  dailyRun: { name: "dailyRun" },
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

describe("where the app opens", () => {
  const OPENER = "chocolate-nobel";

  it("drops a first-time visitor into the opening puzzle", () => {
    expect(landingView("", false, OPENER)).toEqual({
      name: "lesson",
      slug: OPENER,
    });
  });

  it("leaves a returning player on the home screen", () => {
    expect(landingView("", true, OPENER)).toEqual(HOME);
  });

  it("never overrides a URL that names something", () => {
    /*
      THE ONE THAT PROTECTS SHARING. A newcomer following a shared link, a
      bookmark, or a mid-puzzle refresh must land where the URL says. If the
      landing rule beat the URL, every link into the app would dump a new
      reader into the opener instead of the card they were actually sent.
    */
    expect(landingView(`?p=${REAL_SLUG}`, false, OPENER)).toEqual({
      name: "lesson",
      slug: REAL_SLUG,
    });
    expect(landingView("?about=1", false, OPENER)).toEqual({ name: "about" });
    expect(landingView("?hunt=1", false, OPENER)).toEqual({ name: "trapHunt" });
    expect(landingView("?lessons=1", false, OPENER)).toEqual({ name: "lessons" });
  });

  it("still fires on a URL carrying only tracking noise", () => {
    // `?utm_source=x` parses as home, so somebody arriving from a campaign
    // link is still a newcomer and still gets the puzzle rather than a pitch.
    expect(landingView("?utm_source=twitter", false, OPENER)).toEqual({
      name: "lesson",
      slug: OPENER,
    });
    expect(landingView("?utm_source=twitter", true, OPENER)).toEqual(HOME);
  });
});

describe("the landing rewrite", () => {
  const OPENER = "chocolate-nobel";

  it("sends a first-time visitor to the opener", () => {
    expect(landingRewrite("", false, OPENER)).toBe(`?p=${OPENER}`);
  });

  it("writes nothing at all when it did not redirect", () => {
    /*
      NULL IS THE POINT. Rewriting unconditionally through `searchForView`
      turned a byte-identical round trip into a lossy resynthesis: the
      fragment and every query parameter the `View` union does not model,
      campaign tags included, vanished on every single load. Nothing depended
      on them, which is exactly why it would have gone unnoticed.
    */
    expect(landingRewrite("", true, OPENER)).toBeNull();
    expect(landingRewrite(`?p=${REAL_SLUG}`, false, OPENER)).toBeNull();
    expect(landingRewrite("?about=1", true, OPENER)).toBeNull();
    expect(landingRewrite("?hunt=1", false, OPENER)).toBeNull();
  });

  it("is idempotent, so the URL it writes is a fixed point", () => {
    /*
      After the rewrite lands, every later mount reads the address bar. If
      applying the rule to its own output moved again, a remount could ping
      between two URLs.
    */
    const once = landingRewrite("", false, OPENER);
    expect(once).not.toBeNull();
    expect(landingRewrite(once!, false, OPENER)).toBeNull();
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
