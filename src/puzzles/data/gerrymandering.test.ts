import { describe, it, expect } from "vitest";
import { gerrymandering } from "./gerrymandering";
import { Puzzle } from "../schema";
import { restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = gerrymandering.setup.data;
if (data.type !== "rates") {
  throw new Error("gerrymandering must use the rates shape");
}

const cell = (stratum: string, group: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratum)!
    .rates.find((r) => r.groupId === group)!;

describe("gerrymandering seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(gerrymandering).success).toBe(true);
  });

  it("matches the figures printed on Griffith p. 73", () => {
    expect(cell("votes", "federalists")).toMatchObject({ numerator: 51766, denominator: 101930 });
    expect(cell("votes", "democrats")).toMatchObject({ numerator: 50164, denominator: 101930 });
    expect(cell("seats", "federalists")).toMatchObject({ numerator: 11, denominator: 40 });
    expect(cell("seats", "democrats")).toMatchObject({ numerator: 29, denominator: 40 });
  });

  it("reconciles both ways, as the source's own total does", () => {
    // The page prints the 101,930 total independently of the two party figures,
    // so this is a genuine second reading rather than a restatement.
    expect(51766 + 50164).toBe(101930);
    expect(cell("votes", "federalists").denominator).toBe(101930);
    expect(11 + 29).toBe(40);
    expect(cell("seats", "democrats").denominator).toBe(40);
  });

  it("shows the reversal it teaches: more votes, far fewer seats", () => {
    const fedVotes = cell("votes", "federalists").rate;
    const demVotes = cell("votes", "democrats").rate;
    const fedSeats = cell("seats", "federalists").rate;
    const demSeats = cell("seats", "democrats").rate;
    // The Federalists genuinely won the popular vote...
    expect(fedVotes).toBeGreaterThan(demVotes);
    expect(fedVotes).toBeGreaterThan(0.5);
    // ...and took barely a quarter of the chamber.
    expect(fedSeats).toBeLessThan(0.3);
    expect(demSeats).toBeGreaterThan(0.7);
    // Which is the whole puzzle: the winner swaps between the two strata.
    expect(fedVotes > demVotes).toBe(true);
    expect(fedSeats > demSeats).toBe(false);
  });

  it("refuses to pool votes with seats, which would be meaningless", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
    expect(gerrymandering.setup.initialView.kind).not.toBe("aggregate");
    expect(gerrymandering.reveal.view.kind).not.toBe("aggregate");
  });

  it("opens on the votes alone, then adds the seats", () => {
    const setup = restrictRates(data, gerrymandering.setup.initialView);
    expect(setup.strata.map((s) => s.id)).toEqual(["votes"]);
    expect(setup.observations).toHaveLength(2);
    expect(restrictRates(data, gerrymandering.reveal.view).observations).toHaveLength(4);
  });

  it("gives the framing the fact the deduction needs", () => {
    // Winnability rests on knowing who drew the map and that they had a stake.
    // Without it, "far fewer than half" stops being deducible.
    const framing = gerrymandering.setup.framing.en;
    expect(framing).toMatch(/redrawn the senate districts/i);
    expect(framing).toMatch(/that party drew the boundaries/i);
    const hedge = gerrymandering.choices.find((c) => c.id === "cannot-tell")!;
    expect(hedge.isCorrect).toBe(false);
    expect(gerrymandering.choices.find((c) => c.isCorrect)!.id).toBe("far-fewer");
    expect(gerrymandering.choices.find((c) => c.isIntuitiveTrap)!.id).toBe("about-half");
  });

  it("refuses to make this about any living party", () => {
    // The single reason a 1907 source beat far better modern evidence. If a
    // future edit swapped in a modern case, this is what should stop it.
    const prose = [
      gerrymandering.lesson.body?.en ?? "",
      gerrymandering.share.explainer.en,
      gerrymandering.provenance.note?.en ?? "",
    ].join(" ");
    expect(prose).toMatch(/whichever side happened to hold the pen/i);
    expect(prose).toMatch(/extinct for two centuries|long gone/i);
    // And the note must warn against reading the 1812 Democrats as a modern party.
    expect(gerrymandering.provenance.note?.en).toMatch(/not the ancestor of any single modern party/i);
  });
});
