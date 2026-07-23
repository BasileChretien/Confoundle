import { describe, it, expect } from "vitest";
import { intentionToTreat } from "./intention-to-treat";
import { Puzzle } from "../schema";
import { formatPct, restrictRates, stratifiedRates } from "../../engine/charts/rates";

const data = intentionToTreat.setup.data;
if (data.type !== "rates") {
  throw new Error("intention-to-treat must use the rates shape");
}

const cell = (stratumId: string, groupId: string) =>
  stratifiedRates(data)
    .find((s) => s.stratumId === stratumId)!
    .rates.find((r) => r.groupId === groupId)!;

/**
 * The third panel is arithmetic over the first two, not a set of independent
 * figures, so it can be checked rather than trusted. These tests re-derive it
 * from scratch: if any count in this file is ever mistyped, the identities stop
 * closing and the suite fails, instead of shipping a mechanism panel that does
 * not belong to the trial it claims to come from.
 */
describe("intention-to-treat seed data", () => {
  it("satisfies the puzzle contract", () => {
    expect(Puzzle.safeParse(intentionToTreat).success).toBe(true);
  });

  it("matches the published counts", () => {
    expect(cell("randomised", "medical")).toMatchObject({ numerator: 244, denominator: 602 });
    expect(cell("randomised", "surgery")).toMatchObject({ numerator: 218, denominator: 610 });
    expect(cell("protocol", "medical")).toMatchObject({ numerator: 229, denominator: 537 });
    expect(cell("protocol", "surgery")).toMatchObject({ numerator: 188, denominator: 555 });
  });

  it("derives the excluded panel exactly, by subtraction", () => {
    for (const group of ["medical", "surgery"] as const) {
      expect({
        group,
        excluded: cell("excluded", group).denominator,
        deaths: cell("excluded", group).numerator,
      }).toEqual({
        group,
        excluded: cell("randomised", group).denominator - cell("protocol", group).denominator,
        deaths: cell("randomised", group).numerator - cell("protocol", group).numerator,
      });
    }
  });

  it("accounts for all 1,212 patients and all 462 deaths", () => {
    const total = (stratumId: string, field: "numerator" | "denominator") =>
      cell(stratumId, "medical")[field] + cell(stratumId, "surgery")[field];

    expect(total("randomised", "denominator")).toBe(1212);
    expect(total("randomised", "numerator")).toBe(462);
    expect(total("protocol", "denominator") + total("excluded", "denominator")).toBe(1212);
    expect(total("protocol", "numerator") + total("excluded", "numerator")).toBe(462);
  });

  it("reassembles the as-treated arms, which is the third check that closes", () => {
    // Those dropped from one arm are, by definition, treated as the other:
    // medical crossovers went to surgery, and surgical patients who never had
    // their operation stayed on medicine.
    const asTreatedMedical =
      cell("protocol", "medical").denominator + cell("excluded", "surgery").denominator;
    const asTreatedSurgery =
      cell("protocol", "surgery").denominator + cell("excluded", "medical").denominator;
    expect([asTreatedMedical, asTreatedSurgery]).toEqual([592, 620]);
    expect(asTreatedMedical + asTreatedSurgery).toBe(1212);

    const deathsMedical =
      cell("protocol", "medical").numerator + cell("excluded", "surgery").numerator;
    const deathsSurgery =
      cell("protocol", "surgery").numerator + cell("excluded", "medical").numerator;
    expect([deathsMedical, deathsSurgery]).toEqual([259, 203]);
    expect(deathsMedical + deathsSurgery).toBe(462);
  });

  it("reproduces the published percentages", () => {
    expect(formatPct(cell("randomised", "medical").rate)).toBe("41%");
    expect(formatPct(cell("randomised", "surgery").rate)).toBe("36%");
    expect(formatPct(cell("protocol", "medical").rate)).toBe("43%");
    expect(formatPct(cell("protocol", "surgery").rate)).toBe("34%");
  });

  it("shows the effect it teaches: excluding people nearly doubles the gap", () => {
    const gap = (stratumId: string) =>
      cell(stratumId, "medical").rate - cell(stratumId, "surgery").rate;
    expect(gap("randomised")).toBeGreaterThan(0.04);
    expect(gap("randomised")).toBeLessThan(0.05);
    expect(gap("protocol")).toBeGreaterThan(0.08);
    // Nearly doubled, with nobody's outcome having changed.
    expect(gap("protocol") / gap("randomised")).toBeGreaterThan(1.7);
  });

  it("shows the mechanism: the dropped surgical patients died far more often", () => {
    // This is the whole reveal. If it ever stopped holding, the puzzle would be
    // asserting a mechanism its own data did not support.
    const droppedFromSurgery = cell("excluded", "surgery").rate;
    const droppedFromMedicine = cell("excluded", "medical").rate;
    expect(droppedFromSurgery).toBeGreaterThan(0.5);
    expect(droppedFromMedicine).toBeLessThan(0.25);
    expect(droppedFromSurgery).toBeGreaterThan(droppedFromMedicine * 2);

    // And each removal pushes its own arm the flattering way: the surgical arm
    // sheds deaths above its average, the medical arm loses deaths below its.
    expect(droppedFromSurgery).toBeGreaterThan(cell("randomised", "surgery").rate);
    expect(droppedFromMedicine).toBeLessThan(cell("randomised", "medical").rate);
  });

  it("opens on the per-protocol panel alone, then shows all three", () => {
    const setup = restrictRates(data, intentionToTreat.setup.initialView);
    expect(setup.strata.map((s) => s.id)).toEqual(["protocol"]);
    expect(setup.observations).toHaveLength(2);
    expect(restrictRates(data, intentionToTreat.reveal.view).observations).toHaveLength(6);
  });

  it("refuses to pool the panels, or to crown the trap", () => {
    expect(data.strataAreSeparateSamples).toBe(true);
    expect(data.crownWinner).toBe(false);
    expect(intentionToTreat.setup.initialView.kind).not.toBe("aggregate");
    expect(intentionToTreat.reveal.view.kind).not.toBe("aggregate");
  });
});
