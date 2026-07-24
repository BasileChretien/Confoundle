import { describe, it, expect } from "vitest";
import { accuracyOf, lessonProgressFor } from "./lessonState";
import { BURNED, FIRST_STAGE, newProgress, type SkillProgress } from "../srs/schedule";

const NOW = 1_760_000_000_000;

function at(skill: string, stage: number, extra: Partial<SkillProgress> = {}): SkillProgress {
  return { ...newProgress(skill, NOW), stage, ...extra };
}

describe("lesson progress", () => {
  it("calls a skill new when it has never been learned", () => {
    const p = lessonProgressFor("simpsons-paradox", []);
    expect(p.state).toBe("new");
    expect(p.stage).toBe(0);
    expect(p.dueAt).toBeNull();
  });

  it("calls an enrolled skill learned, and carries its stage", () => {
    const p = lessonProgressFor("a", [at("a", FIRST_STAGE + 2)]);
    expect(p.state).toBe("learned");
    expect(p.stage).toBe(FIRST_STAGE + 2);
  });

  it("calls a skill at the top of the ladder mastered", () => {
    const p = lessonProgressFor("a", [at("a", BURNED)]);
    expect(p.state).toBe("mastered");
  });

  it("keeps the due date for a mastered skill, which now returns annually", () => {
    // Burning used to end the schedule, so a date would have been a lie. Now
    // it means an annual check, so hiding the date would be the lie instead.
    const p = lessonProgressFor("a", [at("a", BURNED, { dueAt: NOW + 5000 })]);
    expect(p.dueAt).toBe(NOW + 5000);
  });

  it("keeps the due date while a skill is still in progress", () => {
    const p = lessonProgressFor("a", [at("a", FIRST_STAGE, { dueAt: NOW + 5000 })]);
    expect(p.dueAt).toBe(NOW + 5000);
  });

  it("surfaces the misconceived flag", () => {
    const p = lessonProgressFor("a", [at("a", FIRST_STAGE, { misconceived: true })]);
    expect(p.misconceived).toBe(true);
  });

  it("does not confuse one skill with another", () => {
    const p = lessonProgressFor("b", [at("a", BURNED)]);
    expect(p.state).toBe("new");
  });
});

describe("accuracy", () => {
  it("is null before any review, rather than a misleading zero", () => {
    expect(accuracyOf(lessonProgressFor("a", []))).toBeNull();
  });

  it("is the share of reviews answered correctly", () => {
    const p = lessonProgressFor("a", [
      at("a", FIRST_STAGE, { lifetime: { correct: 3, wrong: 1 } }),
    ]);
    expect(accuracyOf(p)).toBe(0.75);
  });
});
