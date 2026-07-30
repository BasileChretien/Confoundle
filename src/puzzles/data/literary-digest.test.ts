import { describe, expect, it } from "vitest";
import { literaryDigest } from "./literary-digest";
import { stratifiedRates } from "../../engine/charts/rates";

/**
 * The numbers are the point of this puzzle, so they are checked here rather
 * than trusted. Every figure comes from one of two primary sources, and each
 * source reconciles at least two ways, which is what these tests assert.
 */
const raw = literaryDigest.setup.data;
if (raw.type !== "rates") throw new Error("expected the rates shape");
// Arrow consts rather than function declarations, so the narrowing above is in
// scope inside them: a hoisted `function` would see the whole PuzzleData union.
const data = raw;

const ratesIn = (stratumId: string) => {
  const s = stratifiedRates(data).find((x) => x.stratumId === stratumId);
  if (!s) throw new Error(`no stratum ${stratumId}`);
  return s.rates;
};

const count = (groupId: string, stratumId: string): { n: number; d: number } => {
  const o = data.observations.find(
    (x) => x.groupId === groupId && x.stratumId === stratumId,
  );
  if (!o) throw new Error(`no observation for ${groupId}/${stratumId}`);
  return { n: o.numerator, d: o.denominator };
};

describe("the Literary Digest poll of 1936", () => {
  it("reconciles the magazine's own count two ways", () => {
    const landon = count("landon", "ballots");
    const roosevelt = count("roosevelt", "ballots");
    // Squire quotes the Digest's three figures: Landon, Roosevelt and Lemke.
    // The two authored here plus the Lemke figure must give the printed total,
    // which is also the denominator both are expressed over.
    const lemke = 83610;
    expect(landon.n + roosevelt.n + lemke).toBe(2350176);
    expect(landon.d).toBe(2350176);
    expect(roosevelt.d).toBe(2350176);

    // Second check: the magazine printed 55 and 41 per cent, and both recompute.
    expect(Math.round((100 * landon.n) / landon.d)).toBe(55);
    expect(Math.round((100 * roosevelt.n) / roosevelt.d)).toBe(41);
  });

  it("reconciles the official return two ways", () => {
    const landon = count("landon", "election");
    const roosevelt = count("roosevelt", "election");
    // The Clerk of the House prints six party columns and a grand total. The
    // two majors plus the four others must give it exactly.
    const others = 882479 + 187720 + 80159 + 340203; // Lemke, Thomas, Browder, Other
    expect(landon.n + roosevelt.n + others).toBe(45646817);
    expect(landon.d).toBe(45646817);

    // Second check, from a source the official return never saw: Squire quotes
    // Landon at 37 per cent, and the official figures give that independently.
    expect(Math.round((100 * landon.n) / landon.d)).toBe(37);
  });

  it("keeps the participation rate under the quarter Squire reports", () => {
    // "Over 2.3 million ballots were returned ... representing less than a 25%
    // participation rate", against more than 10 million mailed.
    const returned = count("landon", "ballots").d;
    expect(returned / 10_000_000).toBeLessThan(0.25);
    expect(returned / 10_000_000).toBeGreaterThan(0.2);
  });

  it("reverses the winner between the two strata, which is the whole puzzle", () => {
    const poll = ratesIn("ballots");
    const election = ratesIn("election");
    const pollLeader = [...poll].sort((a, b) => b.rate - a.rate)[0];
    const electionLeader = [...election].sort((a, b) => b.rate - a.rate)[0];
    expect(pollLeader.groupId).toBe("landon");
    expect(electionLeader.groupId).toBe("roosevelt");
  });

  it("swings by more than thirty points, so the error is not a near miss", () => {
    const poll = ratesIn("ballots");
    const election = ratesIn("election");
    const margin = (rows: typeof poll) => {
      const l = rows.find((r) => r.groupId === "landon")!.rate;
      const r = rows.find((r) => r.groupId === "roosevelt")!.rate;
      return l - r;
    };
    expect(margin(poll)).toBeGreaterThan(0.13);
    expect(margin(election) - margin(poll)).toBeLessThan(-0.3);
  });

  it("never pools two countings that are not one population", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
  });

  it("shows only the magazine's ballots in the setup", () => {
    const view = literaryDigest.setup.initialView;
    expect(view.kind).toBe("stratified");
    if (view.kind !== "stratified") throw new Error("unreachable");
    expect(view.strataIds).toEqual(["ballots"]);
  });

  it("marks the hedge wrong, which is a deliberate call", () => {
    const hedge = literaryDigest.choices.find((c) => c.id === "cannot-tell");
    expect(hedge?.isCorrect).toBe(false);
    // The framing must supply both defects, or the hedge would be defensible.
    const framing = literaryDigest.setup.framing.en;
    expect(framing).toContain("automobile registration");
    expect(framing).toContain("2,350,176");
    expect(framing).toContain("ten million");
  });

  it("corrects the famous explanation rather than repeating it", () => {
    // The folk version, that the magazine simply missed the poor, is what
    // Squire's evidence contradicts. If this puzzle ever stops saying so it has
    // become a puzzle that teaches something false.
    const lesson = literaryDigest.lesson.body?.en ?? "";
    expect(lesson).toContain("is not what the evidence shows");
    expect(lesson).toContain("would have called the winner correctly");
  });

  it("records the limits of the 1937 survey in the provenance note", () => {
    const note = literaryDigest.provenance.note?.en ?? "";
    // The 49-respondent gap between Squire's tables must never be hidden.
    expect(note).toContain("829");
    expect(note).toContain("780");
    // And the American Labor Party point, so a reader checking elsewhere is not
    // left thinking the puzzle is wrong.
    expect(note).toContain("American Labor Party");
  });
});
