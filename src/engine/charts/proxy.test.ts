import { describe, expect, it } from "vitest";
import type { ProxyData } from "../../puzzles/schema";
import { proxyTarget } from "../../puzzles/data/proxy-target";
import { asPercentMore, gapsFor, gapsForScale, restrictProxy, widestGap } from "./proxy";

/**
 * The derivation behind the proxy shape.
 *
 * Every number the figure draws comes from here, so the setup's reassuring gap
 * and the reveal's alarming one are the same arithmetic on different rows and
 * cannot disagree with each other.
 */

const text = (en: string) => ({ en });

const data: ProxyData = {
  type: "proxy",
  label: text("figure"),
  trainedOnLabel: text("trained on"),
  mattersLabel: text("mattered"),
  basisNote: text("per patient-year"),
  groups: [
    { id: "w", label: text("White"), short: text("White") },
    { id: "b", label: text("Black"), short: text("Black") },
  ],
  measures: [
    { id: "cost", label: text("Cost"), scale: "proxy", unit: "currency" },
    { id: "adm", label: text("Admissions"), scale: "truth", unit: "count" },
  ],
  observations: [
    { measureId: "cost", groupId: "w", value: 7540 },
    { measureId: "cost", groupId: "b", value: 8442 },
    { measureId: "adm", groupId: "w", value: 0.09 },
    { measureId: "adm", groupId: "b", value: 0.13 },
  ],
};

describe("the gap on each scale", () => {
  it("computes the ratio the larger way round, whichever order the groups are in", () => {
    // A reader should never have to know which group was written first. The
    // ratio is always at least one and `higherGroupId` says who is on top.
    const [cost, adm] = gapsFor(data);
    expect(cost!.ratio).toBeCloseTo(8442 / 7540, 10);
    expect(cost!.higherGroupId).toBe("b");
    expect(adm!.ratio).toBeCloseTo(0.13 / 0.09, 10);
    expect(adm!.higherGroupId).toBe("b");

    const flipped: ProxyData = { ...data, groups: [data.groups[1]!, data.groups[0]!] };
    expect(gapsFor(flipped)[0]!.ratio).toBeCloseTo(8442 / 7540, 10);
    expect(gapsFor(flipped)[0]!.higherGroupId).toBe("b");
  });

  it("keeps the values in the data's own group order", () => {
    // So a renderer never sorts, and a colour resolved from position cannot
    // drift between the setup and the reveal.
    expect(gapsFor(data)[0]!.values.map((v) => v.groupId)).toEqual(["w", "b"]);
  });

  it("reproduces the paper's own arithmetic", () => {
    // 12% more spent, 44% more admissions. Both off one table, and the
    // difference between them is the entire lesson.
    const [cost, adm] = gapsFor(data);
    expect(asPercentMore(cost!.ratio!)).toBe(12);
    expect(asPercentMore(adm!.ratio!)).toBe(44);
  });

  it("refuses a ratio rather than reporting infinity", () => {
    // A group at zero has no ratio. Reporting Infinity would draw a bar of
    // unbounded length and read as a measurement rather than as an absence.
    const zeroed: ProxyData = {
      ...data,
      observations: data.observations.map((o) =>
        o.measureId === "adm" && o.groupId === "w" ? { ...o, value: 0 } : o,
      ),
    };
    expect(gapsFor(zeroed)[1]!.ratio).toBeNull();
    expect(gapsFor(zeroed)[1]!.higherGroupId).toBe("b");
  });

  it("says nothing is on top when the two are exactly equal", () => {
    const equal: ProxyData = {
      ...data,
      observations: data.observations.map((o) =>
        o.measureId === "cost" ? { ...o, value: 7540 } : o,
      ),
    };
    expect(gapsFor(equal)[0]!.higherGroupId).toBeNull();
    expect(gapsFor(equal)[0]!.ratio).toBe(1);
  });
});

describe("what each beat draws", () => {
  it("shows only the trained-on rows at the setup", () => {
    // THE TRAP, AS A FUNCTION. The setup must not contain a truth measure or
    // the reveal has nothing left to reveal.
    const setup = gapsForScale(data, ["proxy"]);
    expect(setup.map((g) => g.measureId)).toEqual(["cost"]);
    expect(setup.every((g) => g.scale === "proxy")).toBe(true);
  });

  it("shows both at the reveal, so the comparison is between comparisons", () => {
    expect(gapsForScale(data, ["proxy", "truth"]).map((g) => g.measureId)).toEqual([
      "cost",
      "adm",
    ]);
  });
});

describe("the widest gap", () => {
  it("takes the widest rather than an average across incompatible units", () => {
    // An average over a ratio of dollars and a ratio of admissions is the mean
    // of two things that were never the same thing. The widest is at least
    // something a reader can point at on the figure.
    const three: ProxyData = {
      ...data,
      measures: [
        ...data.measures,
        { id: "ed", label: text("Emergency"), scale: "truth", unit: "count" },
      ],
      observations: [
        ...data.observations,
        { measureId: "ed", groupId: "w", value: 0.19 },
        { measureId: "ed", groupId: "b", value: 0.35 },
      ],
    };
    const truth = gapsForScale(three, ["truth"]);
    expect(asPercentMore(widestGap(truth)!)).toBe(84);
  });

  it("refuses when any gap in the set is unmeasurable", () => {
    // Dropping the undefined one and reporting the rest would answer a
    // different question than the one asked, and answer it confidently.
    const zeroed: ProxyData = {
      ...data,
      observations: data.observations.map((o) =>
        o.measureId === "adm" && o.groupId === "w" ? { ...o, value: 0 } : o,
      ),
    };
    expect(widestGap(gapsForScale(zeroed, ["truth"]))).toBeNull();
  });

  it("has no widest gap in an empty set", () => {
    expect(widestGap([])).toBeNull();
  });
});

describe("the slice each beat is handed", () => {
  /*
    `restrictProxy` is what the renderer actually calls, and `gapsForScale`
    above is not. Testing only the second leaves the first free to hand the
    setup every row in the table, which would put the reveal's numbers on
    screen at the commit beat and cost the puzzle its entire point, with a
    green suite.
  */
  it("drops the measures the beat does not draw, and their observations with them", () => {
    const setup = restrictProxy(data, { scales: ["proxy"] });
    expect(setup.measures.map((m) => m.id)).toEqual(["cost"]);
    expect(setup.observations.map((o) => o.measureId)).toEqual(["cost", "cost"]);
  });

  it("keeps every group, because colour is resolved from the unrestricted list", () => {
    const setup = restrictProxy(data, { scales: ["proxy"] });
    expect(setup.groups).toEqual(data.groups);
  });

  it("gives the reveal the whole table back", () => {
    expect(restrictProxy(data, { scales: ["proxy", "truth"] })).toEqual(data);
  });

  it("shows the shipped puzzle no outcome at the beat it is asked to commit", () => {
    // The card itself, not a fixture. A puzzle authored later that marked a
    // truth measure as proxy would be caught here rather than in review.
    const shipped = proxyTarget.setup.data;
    expect(shipped.type).toBe("proxy");
    if (shipped.type !== "proxy") return;
    const atSetup = restrictProxy(shipped, { scales: ["proxy"] });
    expect(atSetup.measures.every((m) => m.scale === "proxy")).toBe(true);
    expect(atSetup.measures.length).toBeGreaterThan(0);
    expect(atSetup.measures.length).toBeLessThan(shipped.measures.length);
  });
});
