import { describe, it, expect } from "vitest";
import { leadTime } from "./lead-time";
import {
  deathsAligned,
  leadTimeSpread,
  timelineDurations,
} from "../../engine/charts/timeline";

const data = leadTime.setup.data;
if (data.type !== "timeline") {
  throw new Error("lead-time must use the timeline shape");
}

/**
 * The puzzle rests on one property. If a number in the data file is ever
 * changed so that the earlier diagnosis also postpones the death, the lesson
 * stops being lead-time bias, and these fail rather than shipping it.
 */
describe("lead-time seed data", () => {
  it("shows a much longer survival for the screened track", () => {
    const [symptoms, screened] = timelineDurations(data);
    expect(symptoms.survivalFromDiagnosis).toBe(2);
    expect(screened.survivalFromDiagnosis).toBe(5);
    expect(leadTimeSpread(data)).toBe(3);
  });

  it("kills both on exactly the same day", () => {
    expect(deathsAligned(data)).toBe(true);
  });

  it("leaves the disease itself running for the same length of time", () => {
    const durations = timelineDurations(data);
    const lives = new Set(durations.map((d) => d.lifeFromOnset));
    expect(lives.size).toBe(1);
    expect(durations[0].lifeFromOnset).toBe(7);
  });

  it("moves only the moment of diagnosis", () => {
    const onsets = new Set(data.tracks.map((t) => t.onsetAt));
    const found = new Set(data.tracks.map((t) => t.detectedAt));
    expect(onsets.size).toBe(1); // the disease starts when it starts
    expect(found.size).toBe(2); // screening is the only thing that moved
  });
});
