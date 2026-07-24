import { describe, it, expect } from "vitest";
import { agreementRows, agreementScale } from "./agreement";
import type { AgreementData } from "../../puzzles/schema";

/** The real Klemetti & Saxen 1967 drug rows, so the test guards the puzzle too. */
const DATA = {
  type: "agreement",
  label: { en: "x" },
  beforeLabel: { en: "x" },
  afterLabel: { en: "x" },
  repeatedLabel: { en: "x" },
  forgottenLabel: { en: "x" },
  inventedLabel: { en: "x" },
  itemLabel: { en: "x" },
  groups: [
    { label: { en: "Healthy child" }, n: 203, reportedBefore: 182, repeated: 33, invented: 41 },
    { label: { en: "Death or malformation" }, n: 203, reportedBefore: 187, repeated: 23, invented: 57 },
  ],
} satisfies AgreementData;

describe("agreement rows", () => {
  it("derives what was forgotten rather than trusting an authored total", () => {
    const [healthy, patho] = agreementRows(DATA);
    expect(healthy.forgotten).toBe(182 - 33);
    expect(patho.forgotten).toBe(187 - 23);
  });

  it("computes the share of earlier answers that survived", () => {
    const [healthy, patho] = agreementRows(DATA);
    // The heart of the lesson: both groups lost most of their own earlier reports.
    expect(healthy.repeatedShare).toBeCloseTo(33 / 182, 10);
    expect(patho.repeatedShare).toBeCloseTo(23 / 187, 10);
    expect(healthy.repeatedShare!).toBeLessThan(0.2);
    expect(patho.repeatedShare!).toBeLessThan(0.2);
  });

  it("expresses invented answers against the later positives they inflate", () => {
    const [healthy, patho] = agreementRows(DATA);
    expect(healthy.inventedShare).toBeCloseTo(41 / (33 + 41), 10);
    expect(patho.inventedShare).toBeCloseTo(57 / (23 + 57), 10);
  });

  it("reproduces the paper's printed two-thirds across both groups", () => {
    // 98 of 154 retrospective positives had no prospective history (p. 2074).
    const rows = agreementRows(DATA);
    const invented = rows.reduce((n, r) => n + r.invented, 0);
    const later = rows.reduce((n, r) => n + r.repeated + r.invented, 0);
    expect(invented).toBe(98);
    expect(later).toBe(154);
    expect(invented / later).toBeGreaterThan(0.63);
    expect(invented / later).toBeLessThan(0.64);
  });

  it("reproduces the totals the paper states in prose", () => {
    const rows = agreementRows(DATA);
    expect(rows.reduce((n, r) => n + r.reportedBefore, 0)).toBe(369);
  });

  it("survives a group nobody reported anything in, without dividing by zero", () => {
    const rows = agreementRows({
      ...DATA,
      groups: [
        { label: { en: "a" }, n: 10, reportedBefore: 0, repeated: 0, invented: 0 },
        DATA.groups[1],
      ],
    });
    expect(rows[0].repeatedShare).toBeNull();
    expect(rows[0].inventedShare).toBeNull();
  });
});

describe("agreement scale", () => {
  it("puts every group on one scale, so two groups stay comparable", () => {
    expect(agreementScale(agreementRows(DATA))).toBe(187);
  });

  it("never returns zero, so a bar cannot divide by it", () => {
    const rows = agreementRows({
      ...DATA,
      groups: [
        { label: { en: "a" }, n: 5, reportedBefore: 0, repeated: 0, invented: 0 },
        { label: { en: "b" }, n: 5, reportedBefore: 0, repeated: 0, invented: 0 },
      ],
    });
    expect(agreementScale(rows)).toBe(1);
  });
});
