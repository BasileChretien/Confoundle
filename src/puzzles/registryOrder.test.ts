import { describe, it, expect } from "vitest";
import { puzzles, puzzleNumberOf } from "./index";

/**
 * THE REGISTRY ORDER IS PART OF THE PRODUCT, and this is the only thing saying so.
 *
 * A shared result line reads "Confoundle #7" and the friends board groups by
 * that number, so it has to keep meaning the same card. It is derived from the
 * position in `puzzles`, which makes an insertion anywhere but the end a silent
 * renumbering of everything after it: lines already pasted into group chats
 * would start referring to different puzzles, and no test, type or build would
 * notice.
 *
 * So the sequence is frozen here. NEW PUZZLES ARE APPENDED, and appending is
 * the only edit this file should ever need: one slug at the end. If this test
 * fails on a reorder, the fix is to restore the order rather than to update the
 * list, unless the numbers have genuinely never been shared.
 *
 * The number this pins is also what `puzzleForDay` cycles through, so the daily
 * rotation is stable for free.
 */
describe("the registry sequence", () => {
  const FROZEN = [
  "kidney-stones",
  "medical-test",
  "chocolate-nobel",
  "bomber-armor",
  "courtroom-odds",
  "stage-migration",
  "lead-time",
  "spectrum-bias",
  "hospital-sample",
  "relative-risk",
  "why-they-got-it",
  "screen-detected",
  "what-got-printed",
  "who-got-left-out",
  "asked-twice",
  "the-months-before",
  "the-dummy-pill",
  "asked-before-and-after",
  "back-toward-average",
  "average-of-two-worlds",
  "who-graded-it",
  "certainly-tiny",
  "states-and-people",
  "same-choice-other-words",
  "which-way-is-up",
  "the-average-paper",
  "heard-it-before",
  "same-sum-backwards",
  "more-votes-fewer-seats",
  "the-biggest-poll-ever-taken",
  "the-glass-that-was-never-there",
  "no-difference-found",
  "randomised-in-name-only",
  "when-the-auditor-is-watching",
  "who-paid-for-the-review",
  "what-comes-to-mind-first",
  "written-in-the-stars",
  "two-things-at-once",
  "what-it-calls-itself",
  "one-word-in-the-report",
  "the-small-favour-first",
  "both-sides-of-what",
  "strike-that-from-the-record",
  "the-source-you-forget",
  "every-word-was-true",
  "not-me-though",
  "just-asking",
  "four-cards",
  "just-under-the-line",
  "you-do-it-too",
  "the-speech-that-pushed-back",
  "warned-in-advance",
  "how-big-is-denmark",
  "which-map-lies",
  "both-hit-the-target",
  "what-everyone-thinks",
  "the-crime-that-doubled",
  "a-lead-that-is-not-a-lead",
  "nowhere-left-to-go",
  "one-voice-three-times",
  "back-where-it-started",
  "nobody-got-worse",
  "count-it-differently",
  "the-extra-cases",
  "filed-as-lost",
  "what-the-doctor-believed",
  "told-and-given",
  "took-their-tablets",
  "the-beats-went-away",
  "thin-and-then-dead",
  "the-photo-on-the-essay",
  "the-slot-they-drew",
  "who-marked-it",
  ];

  it("is unchanged, and grew only at the end", () => {
    const live = puzzles.map((p) => p.slug);
    // Compared as a prefix first, so an APPEND reports as an append and a
    // reorder reports as a reorder, rather than both arriving as one opaque
    // array diff that a reader is tempted to paste over the top of.
    expect(live.slice(0, FROZEN.length)).toEqual(FROZEN);
    expect(live.length).toBeGreaterThanOrEqual(FROZEN.length);
  });

  it("numbers every puzzle from one, in that order", () => {
    expect(puzzleNumberOf(FROZEN[0]!)).toBe(1);
    expect(puzzleNumberOf(FROZEN[6]!)).toBe(7);
    expect(puzzleNumberOf(puzzles[puzzles.length - 1]!.slug)).toBe(puzzles.length);
  });

  it("has no number for a slug that is not a puzzle", () => {
    // The share beat draws no board rather than "Confoundle #0".
    expect(puzzleNumberOf("not-a-puzzle")).toBeUndefined();
    expect(puzzleNumberOf("")).toBeUndefined();
  });

  it("gives every puzzle a distinct number", () => {
    const numbers = puzzles.map((p) => puzzleNumberOf(p.slug));
    expect(new Set(numbers).size).toBe(puzzles.length);
    expect(numbers).not.toContain(undefined);
  });
});
