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

  it("refuses to teach that screening is useless, on the share card too", () => {
    // The lesson beat has always carried this caveat. The SHARE CARD did not,
    // and it is the one artefact built to travel with none of the surrounding
    // context, so a reader meeting only the card could reasonably conclude that
    // screening is a con. For a health behaviour that is a real harm, not an
    // inelegance. Guarded here because prose is easy to tighten and lose.
    expect(leadTime.share.explainer.en).toMatch(/genuinely do cut deaths/);
    expect(leadTime.lesson.body?.en).toContain("does not mean early detection is worthless");
    // And the counterexample where screening demonstrably worked must stay in
    // the deep dive, since it is what makes the caveat evidence, not a hedge.
    const worked = leadTime.lesson.examples?.some((e) =>
      /Minnesota|fecal occult blood/i.test(e.provenance.source),
    );
    expect(worked).toBe(true);
  });
});
