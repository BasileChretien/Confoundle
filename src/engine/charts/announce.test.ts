import { describe, it, expect } from "vitest";
import { fillSlots } from "./announce";

describe("fillSlots", () => {
  it("drops each value into its named slot", () => {
    expect(
      fillSlots("{group}: {percent} percent", { group: "Treated", percent: 34 }),
    ).toBe("Treated: 34 percent");
  });

  it("lets the translation put the slots in another order", () => {
    // The whole reason these are sentences with slots rather than fragments
    // glued to variables: the values are identical, only the clause order
    // moved, and that has to be the translator's to choose.
    const slots = { cause: "アイスクリーム", effect: "水難事故" };
    expect(fillSlots("{cause} and {effect} rise together", slots)).toBe(
      "アイスクリーム and 水難事故 rise together",
    );
    expect(fillSlots("{effect}は{cause}とともに増える", slots)).toBe(
      "水難事故はアイスクリームとともに増える",
    );
  });

  it("fills every occurrence of a repeated slot", () => {
    expect(fillSlots("{n} of {n}", { n: 7 })).toBe("7 of 7");
  });

  it("does not read dollar signs in a value as a back-reference", () => {
    // The reason this is `split`/`join` and not `String.replace`. `$&` in a
    // replacement means "the matched text", so `replace` would have expanded
    // this to "{cost}" and announced the slot name as though it were content.
    // Puzzle labels are authored prose and can hold a currency.
    expect(fillSlots("{cost} per patient", { cost: "$&12" })).toBe(
      "$&12 per patient",
    );
    expect(fillSlots("{a} and {b}", { a: "$'", b: "$`" })).toBe("$' and $`");
  });

  it("leaves a slot with no value visible rather than blank", () => {
    // A call site that stops passing a value should read as broken, not as a
    // finished sentence that quietly lost its number.
    expect(fillSlots("{arm}: {events} out of {total}", { arm: "Placebo" })).toBe(
      "Placebo: {events} out of {total}",
    );
  });

  it("leaves a sentence with no slots alone", () => {
    expect(fillSlots("Bullet holes cluster on the wings", {})).toBe(
      "Bullet holes cluster on the wings",
    );
  });
});
