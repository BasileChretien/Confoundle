import { describe, it, expect } from "vitest";
import { buildResultLine, parseResultLine, parseResults } from "./result";

describe("result line", () => {
  it("round-trips a caught result", () => {
    const r = { name: "Basile", puzzleNo: 42, caught: true, score: 30, streak: 5 };
    expect(parseResultLine(buildResultLine(r))).toEqual(r);
  });

  it("round-trips a fooled, negative-score result", () => {
    const r = { name: "Sam", puzzleNo: 7, caught: false, score: -10, streak: 0 };
    expect(parseResultLine(buildResultLine(r))).toEqual(r);
  });

  it("pulls valid result lines out of a chat dump", () => {
    const dump =
      "hey look\nBasile · Confoundle #3 · 🎯 +20 · 🔥2\nlol\nSam · Confoundle #3 · 🫠 -5 · 🔥0\n";
    const rows = parseResults(dump);
    expect(rows.map((r) => r.name)).toEqual(["Basile", "Sam"]);
  });

  it("ignores lines that aren't results", () => {
    expect(parseResultLine("just chatting here")).toBeNull();
  });
});
