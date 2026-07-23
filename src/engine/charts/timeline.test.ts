import { describe, it, expect } from "vitest";
import type { TimelineData } from "../../puzzles/schema";
import {
  deathsAligned,
  formatDuration,
  leadTimeSpread,
  timelineDurations,
} from "./timeline";

const text = (en: string) => ({ en });

/** A minimal two-track fixture: same life, found at two different moments. */
const data: TimelineData = {
  type: "timeline",
  label: text("One life"),
  unit: text("years"),
  span: 12,
  onsetLabel: text("begins"),
  detectedLabel: text("found"),
  diedLabel: text("died"),
  survivalLabel: text("survival after diagnosis"),
  tracks: [
    { id: "late", label: text("Found late"), onsetAt: 2, detectedAt: 7, diedAt: 9 },
    { id: "early", label: text("Found early"), onsetAt: 2, detectedAt: 4, diedAt: 9 },
  ],
};

describe("timeline derivation", () => {
  it("makes survival from diagnosis differ", () => {
    const [late, early] = timelineDurations(data);
    expect(late.survivalFromDiagnosis).toBe(2);
    expect(early.survivalFromDiagnosis).toBe(5);
    expect(early.survivalFromDiagnosis).toBeGreaterThan(
      late.survivalFromDiagnosis,
    );
  });

  it("leaves the life itself exactly the same length", () => {
    const [late, early] = timelineDurations(data);
    expect(late.lifeFromOnset).toBe(7);
    expect(early.lifeFromOnset).toBe(7);
    expect(early.lifeFromOnset).toBe(late.lifeFromOnset);
  });

  it("reports the deaths as aligned", () => {
    expect(deathsAligned(data)).toBe(true);
  });

  it("notices when a death instant actually moves", () => {
    const postponed: TimelineData = {
      ...data,
      tracks: [data.tracks[0], { ...data.tracks[1], diedAt: 10 }],
    };
    expect(deathsAligned(postponed)).toBe(false);
  });

  it("measures the apparent gain as the spread in survival", () => {
    expect(leadTimeSpread(data)).toBe(3);
  });

  it("formats whole and fractional durations", () => {
    expect(formatDuration(5)).toBe("5");
    expect(formatDuration(2.5)).toBe("2.5");
  });
});
