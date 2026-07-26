import { describe, it, expect } from "vitest";
import {
  BUCKETS,
  bucketCounts,
  bucketOf,
  reviewForecast,
  stageName,
  weeklyForecast,
} from "./buckets";
import { BURNED, newProgress, STAGES, type SkillProgress } from "./schedule";

const NOW = 1_760_000_000_000;
const HOUR = 3_600_000;

function at(skill: string, stage: number, dueAt = NOW + HOUR): SkillProgress {
  return { ...newProgress(skill, NOW), stage, dueAt };
}

describe("buckets", () => {
  it("covers every rung of the ladder, with no gaps and no overlap", () => {
    // If a rung fell between two buckets a skill would vanish from the dashboard.
    for (let stage = 0; stage < STAGES.length; stage += 1) {
      const matches = BUCKETS.filter((b) => stage >= b.from && stage <= b.to);
      expect(matches, `stage ${stage} (${STAGES[stage].name})`).toHaveLength(1);
    }
  });

  it("puts a freshly learned skill with the apprentices", () => {
    expect(bucketOf(at("a", 0))).toBe("apprentice");
    expect(bucketOf(at("a", 4))).toBe("apprentice");
  });

  it("matches the ladder's own stage names", () => {
    expect(bucketOf(at("a", 5))).toBe("guru");
    expect(stageName(5)).toBe("Guru I");
    expect(bucketOf(at("a", 7))).toBe("master");
    expect(stageName(7)).toBe("Master");
    expect(bucketOf(at("a", 8))).toBe("enlightened");
    expect(stageName(8)).toBe("Enlightened");
    expect(bucketOf(at("a", BURNED))).toBe("burned");
  });

  it("counts every skill exactly once", () => {
    const all = [at("a", 0), at("b", 5), at("c", 7), at("d", 8), at("e", BURNED)];
    const counts = bucketCounts(all);
    expect(counts).toEqual({
      apprentice: 1,
      guru: 1,
      master: 1,
      enlightened: 1,
      burned: 1,
    });
    const total = Object.values(counts).reduce((n, x) => n + x, 0);
    expect(total).toBe(all.length);
  });
});

describe("review forecast", () => {
  it("collapses everything overdue into one slot, because it is one action", () => {
    const all = [
      at("a", 2, NOW - 5 * HOUR),
      at("b", 2, NOW - HOUR),
      at("c", 2, NOW + 3 * HOUR),
    ];
    const forecast = reviewForecast(all, NOW);
    expect(forecast[0]).toEqual({ inMs: 0, count: 2 });
    expect(forecast[1].count).toBe(1);
  });

  it("groups upcoming reviews by the hour they land in", () => {
    const all = [at("a", 2, NOW + 90 * 60_000), at("b", 2, NOW + 100 * 60_000)];
    const forecast = reviewForecast(all, NOW);
    expect(forecast).toHaveLength(1);
    expect(forecast[0]).toEqual({ inMs: 2 * HOUR, count: 2 });
  });

  it("forecasts burned skills too, now that they come back annually", () => {
    // Hiding them was part of why a finished deck looked like a dead app.
    const all = [at("a", BURNED, NOW - HOUR), at("b", BURNED, NOW + HOUR)];
    const forecast = reviewForecast(all, NOW);
    expect(forecast[0]).toEqual({ inMs: 0, count: 1 });
    expect(forecast[1].count).toBe(1);
  });

  it("returns nothing when there is nothing scheduled", () => {
    expect(reviewForecast([], NOW)).toEqual([]);
  });

  it("orders soonest first and respects the limit", () => {
    const all = Array.from({ length: 10 }, (_, i) => at(`s${i}`, 2, NOW + (i + 1) * HOUR));
    const forecast = reviewForecast(all, NOW, 3);
    expect(forecast).toHaveLength(3);
    expect(forecast.map((f) => f.inMs)).toEqual([HOUR, 2 * HOUR, 3 * HOUR]);
  });
});

describe("weeklyForecast", () => {
  const DAY = 86_400_000;
  const base = (() => {
    const d = new Date(NOW);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  })();

  it("buckets due dates into the next seven days, overdue folded into today", () => {
    const all = [
      at("overdue", 3, base - HOUR), // -> today (0)
      at("today", 3, base + HOUR), // today (0)
      at("tomorrow", 3, base + DAY + HOUR), // day 1
      at("d3", 3, base + 3 * DAY + HOUR), // day 3
      at("beyond", 3, base + 10 * DAY), // outside the window, dropped
    ];
    const f = weeklyForecast(all, NOW, 7);
    expect(f).toHaveLength(7);
    expect(f.map((s) => s.inDays)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(f[0].count).toBe(2);
    expect(f[1].count).toBe(1);
    expect(f[3].count).toBe(1);
    expect(f.reduce((n, s) => n + s.count, 0)).toBe(4);
  });
});
