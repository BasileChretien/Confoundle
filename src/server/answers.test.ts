import { describe, it, expect, beforeEach, afterEach } from "vitest";

import {
  answerDistribution,
  InvalidAnswer,
  isShowable,
  MIN_ANSWERS_TO_SHOW,
  parseSubmission,
  recordAnswer,
} from "./answers";
import { createTestDatabase, type TestDatabase } from "./testing/sqliteD1";
import { loadMigration } from "./testing/schema";

const TODAY = 20_680;

describe("validating what an unauthenticated caller sends", () => {
  /**
   * This endpoint takes input from anybody on the internet and writes it to a
   * table whose entire claim is that it holds nothing identifying. So these
   * are not hygiene tests: the validation IS the privacy boundary.
   */
  const good = {
    slug: "the-slot-they-drew",
    choiceId: "worse",
    confidence: "certain",
    day: TODAY,
  };

  it("accepts a well-formed submission", () => {
    expect(parseSubmission(good, TODAY)).toEqual(good);
  });

  it("drops any extra field rather than storing it", () => {
    // The attack this stops: smuggling an identifier into a schema designed
    // not to have one, by adding a property and hoping it is passed through.
    const parsed = parseSubmission(
      { ...good, accountId: "abc123", email: "x@example.com" },
      TODAY,
    );
    expect(Object.keys(parsed).sort()).toEqual([
      "choiceId",
      "confidence",
      "day",
      "slug",
    ]);
    expect(JSON.stringify(parsed)).not.toContain("abc123");
    expect(JSON.stringify(parsed)).not.toContain("example.com");
  });

  it("refuses an id that is not a short lowercase slug", () => {
    for (const slug of [
      "",
      "Has-Capitals",
      "has spaces",
      "has_underscores",
      "-leading-hyphen",
      "a".repeat(65),
      "../../etc/passwd",
      "<script>",
    ]) {
      expect(() => parseSubmission({ ...good, slug }, TODAY), slug).toThrow(
        InvalidAnswer,
      );
    }
  });

  it("refuses a confidence the app does not offer", () => {
    for (const confidence of ["", "CERTAIN", "very-sure", "1", null])
      expect(() =>
        parseSubmission({ ...good, confidence }, TODAY),
      ).toThrow(InvalidAnswer);
  });

  it("refuses a day outside the window the daily can be played in", () => {
    // One either side covers every timezone. Beyond that, somebody is either
    // seeding a future day or rewriting history.
    expect(() => parseSubmission({ ...good, day: TODAY - 1 }, TODAY)).not.toThrow();
    expect(() => parseSubmission({ ...good, day: TODAY + 1 }, TODAY)).not.toThrow();
    expect(() => parseSubmission({ ...good, day: TODAY - 2 }, TODAY)).toThrow(InvalidAnswer);
    expect(() => parseSubmission({ ...good, day: TODAY + 400 }, TODAY)).toThrow(InvalidAnswer);
    expect(() => parseSubmission({ ...good, day: 1.5 }, TODAY)).toThrow(InvalidAnswer);
  });

  it("refuses a body that is not an object", () => {
    for (const body of [null, "string", 42, []])
      expect(() => parseSubmission(body, TODAY)).toThrow(InvalidAnswer);
  });
});

describe("the tally itself", () => {
  let db: TestDatabase;

  beforeEach(() => {
    db = createTestDatabase(loadMigration());
  });
  afterEach(() => db.close());

  const submit = (choiceId: string, confidence: string, day = TODAY) =>
    recordAnswer(db, { slug: "p", choiceId, confidence, day });

  it("counts rather than storing a row per answer", async () => {
    await submit("a", "certain");
    await submit("a", "certain");
    await submit("a", "certain");
    const rows = await db
      .prepare("SELECT count FROM answer_tally WHERE slug = ? AND choice_id = ?")
      .bind("p", "a")
      .all<{ count: number }>();
    // One row, count three. Three rows would mean three separable events.
    expect(rows.results).toHaveLength(1);
    expect(rows.results![0]!.count).toBe(3);
  });

  it("holds no column that could identify anybody", async () => {
    await submit("a", "sure");
    const cols = await db.prepare("PRAGMA table_info(answer_tally)").all<{ name: string }>();
    expect((cols.results ?? []).map((c) => c.name).sort()).toEqual([
      "choice_id",
      "confidence",
      "count",
      "day",
      "slug",
    ]);
  });

  it("sums across confidence for the headline and keeps the certain split", async () => {
    await submit("a", "certain");
    await submit("a", "hunch");
    await submit("b", "certain");
    const d = await answerDistribution(db, "p", TODAY);
    expect(d.total).toBe(3);
    expect(d.choices).toEqual([
      { choiceId: "a", count: 2 },
      { choiceId: "b", count: 1 },
    ]);
    // The claim this deck is actually about: of those who were sure, who was.
    expect(d.certain).toEqual([
      { choiceId: "a", count: 1 },
      { choiceId: "b", count: 1 },
    ]);
  });

  it("separates days, and can pool them when asked", async () => {
    await submit("a", "sure", TODAY);
    await submit("a", "sure", TODAY - 1);
    expect((await answerDistribution(db, "p", TODAY)).total).toBe(1);
    expect((await answerDistribution(db, "p")).total).toBe(2);
  });

  it("returns an empty distribution for a puzzle nobody has answered", async () => {
    const d = await answerDistribution(db, "never-played");
    expect(d).toEqual({ slug: "never-played", total: 0, choices: [], certain: [] });
  });

  it("refuses to read with an id that failed validation", async () => {
    await expect(answerDistribution(db, "Bad Slug")).rejects.toThrow(InvalidAnswer);
  });
});

describe("the floor below which nothing is shown", () => {
  it("hides a distribution too small to be evidence", () => {
    const d = (total: number) => ({ slug: "p", total, choices: [], certain: [] });
    expect(isShowable(d(MIN_ANSWERS_TO_SHOW - 1))).toBe(false);
    expect(isShowable(d(MIN_ANSWERS_TO_SHOW))).toBe(true);
    // A percentage of four people is noise dressed as evidence, which is the
    // exact mistake this deck exists to teach, and a tally of one or two is
    // also the only state in which an aggregate could describe a person.
    expect(isShowable(d(0))).toBe(false);
    expect(isShowable(d(4))).toBe(false);
  });
});
