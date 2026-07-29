import { describe, it, expect } from "vitest";
import type { FramingData } from "../../puzzles/schema";
import {
  formatPercent,
  marginOf,
  preferenceOf,
  reverses,
  swing,
  totalAsked,
} from "./framing";

/** The figures Tversky and Kahneman printed for the Asian disease problem. */
const asianDisease: FramingData = {
  type: "framing",
  label: { en: "x" },
  stakeLabel: { en: "x" },
  sureLabel: { en: "x" },
  gambleLabel: { en: "x" },
  percentNote: { en: "x" },
  frames: [
    {
      id: "saved",
      label: { en: "Lives saved" },
      sureText: { en: "200 will be saved" },
      gambleText: { en: "one third chance all 600 saved" },
      surePercent: 72,
      gamblePercent: 28,
      n: 152,
    },
    {
      id: "died",
      label: { en: "Lives lost" },
      sureText: { en: "400 will die" },
      gambleText: { en: "one third chance nobody dies" },
      surePercent: 22,
      gamblePercent: 78,
      n: 155,
    },
  ],
};

describe("what each wording produced", () => {
  it("reads the majority off the printed shares", () => {
    expect(preferenceOf(asianDisease.frames[0])).toBe("sure");
    expect(preferenceOf(asianDisease.frames[1])).toBe("gamble");
  });

  it("measures how decisively each majority won", () => {
    expect(marginOf(asianDisease.frames[0])).toBe(44);
    expect(marginOf(asianDisease.frames[1])).toBe(56);
  });
});

describe("the claim the puzzle actually makes", () => {
  it("is that rewording one identical choice reverses it", () => {
    expect(reverses(asianDisease)).toBe(true);
  });

  it("would be false, and must fail, if both wordings agreed", () => {
    const agreeing: FramingData = {
      ...asianDisease,
      frames: [
        asianDisease.frames[0],
        { ...asianDisease.frames[1], surePercent: 70, gamblePercent: 30 },
      ],
    };
    expect(reverses(agreeing)).toBe(false);
  });

  it("puts the size of the shift at 50 points of the certain option", () => {
    // 72 per cent took the sure thing when it was framed as saving lives;
    // 22 per cent took the identical option framed as deaths.
    expect(swing(asianDisease)).toBe(50);
  });

  it("counts everyone who was asked", () => {
    expect(totalAsked(asianDisease)).toBe(307);
  });
});

describe("quoting the shares", () => {
  it("never invents precision the source did not print", () => {
    expect(formatPercent(72)).toBe("72%");
    expect(formatPercent(22)).toBe("22%");
  });
});
