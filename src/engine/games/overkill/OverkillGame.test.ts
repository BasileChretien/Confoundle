// @vitest-environment happy-dom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { LocaleProvider } from "../../../app/i18n";
import { loadDictionary } from "../../../app/translations";
import { OverkillGame } from "./OverkillGame";

/**
 * PLAYING THE GAME, because nothing else in the suite can.
 *
 * `sim.test.ts` proves the simulation is right and `render.test.ts` proves the
 * drawing is right, and between them they still cannot say whether the thing
 * in front of a player advances, pauses at a level up, or ever reaches the
 * death screen. That is the loop, and the loop lives in a component.
 *
 * THE FRAME CLOCK IS DRIVEN BY HAND. `requestAnimationFrame` is replaced with
 * a queue this file pumps, and the timestamps handed to it are made up. That
 * is not a workaround, it is the only honest way to test a fixed-timestep loop:
 * a real clock makes the number of simulated ticks depend on how busy the
 * machine was, so the test would assert something different on every run.
 *
 * It also happens to be the only way to run this at all in an environment that
 * never composites, which is worth writing down: the in-app browser pane does
 * not fire animation frames, so the game silently sits at 0:00 there and looks
 * broken while being perfectly fine.
 */

let container: HTMLDivElement;
let root: Root;
let queued: Map<number, FrameRequestCallback>;
let nextHandle: number;
let now: number;

beforeAll(async () => {
  await loadDictionary("en");
}, 60_000);

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  queued = new Map();
  nextHandle = 1;
  now = 0;
  // Modelled properly, handles and all. A no-op cancelAnimationFrame leaves
  // every superseded loop still queued, so each re-registration adds another
  // one and simulated time runs at a multiple of real time: the first version
  // of this file asked for three seconds and got five.
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    const h = nextHandle++;
    queued.set(h, cb);
    return h;
  });
  vi.stubGlobal("cancelAnimationFrame", (h: number) => {
    queued.delete(h);
  });
  // happy-dom has no 2D context, and the renderer is tested elsewhere. This
  // stub is here so the loop can call it without throwing.
  HTMLCanvasElement.prototype.getContext = (() => null) as HTMLCanvasElement["getContext"];
  Object.defineProperty(HTMLCanvasElement.prototype, "clientWidth", { value: 400, configurable: true });
  Object.defineProperty(HTMLCanvasElement.prototype, "clientHeight", { value: 800, configurable: true });
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

function mount(onExit = () => {}) {
  act(() => {
    root.render(
      createElement(LocaleProvider, {
        locale: "en",
        children: createElement(OverkillGame, { seed: 12345, onExit }),
      }),
    );
  });
}

/** Advance the wall clock by `ms` and let the loop run one frame over it. */
function frame(ms = 16.7) {
  now += ms;
  const due = [...queued.values()];
  queued.clear();
  act(() => {
    for (const cb of due) cb(now);
  });
}

/**
 * Roughly this many simulated seconds, one frame at a time, then a few frames
 * of no duration at all.
 *
 * THE TRAILING FRAMES ARE NOT PADDING. The readouts are deliberately refreshed
 * only every fifth frame, because re-rendering the tree sixty times a second
 * to move a bar is waste; that means the clock on screen can sit up to five
 * frames behind the simulation. Zero-length frames advance no simulated time
 * and force the refresh, so what this reads is the state the loop is actually
 * in rather than the state it was in a moment ago. Without them the assertions
 * here fail intermittently at second boundaries, and look exactly like a
 * simulation running slow.
 */
function play(seconds: number) {
  // The first frame only establishes the clock, so it buys no ticks.
  frame(0);
  const frames = Math.ceil((seconds * 1000) / 16.7);
  for (let i = 0; i < frames; i++) frame();
  for (let i = 0; i < 6; i++) frame(0);
}

/**
 * Answers whatever briefing is on screen, if one is.
 *
 * EVERY TEST IN THIS FILE NEEDS IT, because the run now opens on a briefing
 * and halts there: the stepper returns `awaitingLoadout` forever until
 * somebody deploys, so without this the clock reads 0:00 for as many frames as
 * a test cares to pump, which looks exactly like a broken loop. Six tests here
 * failed that way the moment the mechanic landed, and every one of them said
 * "expected 0:00 to be 0:03" rather than anything about a briefing.
 *
 * The sheet opens with the current loadout already selected, so answering it
 * is one click. Found by the commit button's accessible name, which is the one
 * hook here that is load bearing for a reason other than testing: it exists so
 * a screen reader has something to announce, so a styling pass cannot quietly
 * remove it the way a class name or a DOM shape can.
 */
function deploy(): boolean {
  const confirm = container.querySelector('button[aria-label="Deploy"]');
  if (confirm === null) return false;
  act(() => confirm.dispatchEvent(new Event("click", { bubbles: true })));
  return true;
}

/**
 * Answers the first-contact beat if one is on screen.
 *
 * NEEDED FOR THE SAME REASON `deploy` IS: the beat halts the run until
 * somebody commits a prediction, so a test that pumps frames past one sees the
 * clock stop and reports it as a broken loop. Three tests failed exactly that
 * way when the beat landed, and every one of them said "expected 0:09" rather
 * than anything about an encounter.
 *
 * Predicts "works" every time, which is fine because nothing is scored on it:
 * the commit exists to put the player's belief at risk, not to grade them.
 */
function predict(): boolean {
  const yes = container.querySelector('button[aria-label="Predict it works"]');
  if (yes === null) return false;
  act(() => yes.dispatchEvent(new Event("click", { bubbles: true })));
  // The reveal then plays on its own clock and closes itself; frames drive it.
  // The reveal plays on its own clock and closes itself. A pore sequence is
  // 60 ticks plus an 18 tick hold at 0.7 speed, so about 111 frames; 160 is
  // margin for the longer verbs.
  for (let i = 0; i < 160; i++) frame();
  return true;
}

/** Mount, then get past the opening briefing, which is what a player does. */
function start(onExit = () => {}) {
  mount(onExit);
  // TWO FRAMES, and the second one has to have DURATION. The loop only calls
  // `step` once it has banked a whole tick of wall clock, and the very first
  // frame spends itself establishing the clock, so a zero-length frame never
  // reaches the stepper and the briefing is never asked for. The briefing gate
  // returns before consuming a tick, so this still leaves the clock at zero
  // and the first test can go on asserting that.
  frame(0);
  frame();
  if (!deploy()) throw new Error("the run did not open on a briefing");
}

const cardsOnScreen = () =>
  [...container.querySelectorAll("button")].filter((b) => b.className.includes("flex-col"));

/**
 * Plays, moving, until three cards appear.
 *
 * IT HAS TO MOVE. Levels are earned by killing and by walking over what drops,
 * so there is no tick a test can name in advance; and a player who stands
 * perfectly still is surrounded and killed before the first level arrives,
 * which is what the first version of this helper did and reported as "no
 * level up inside 60s".
 */
function playUntilLevelUp(limitSeconds = 90) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
  try {
    for (let i = 0; i < limitSeconds; i++) {
      play(1);
      // Waves end mid-run and each one briefs before it starts, so this has to
      // answer them too or it stalls at the first boundary and reports "no
      // level up" about a game that is simply waiting to be told something.
      deploy();
      predict();
      if (cardsOnScreen().length === 3) return;
      if (text().includes("worth most")) throw new Error("died before any level up");
    }
  } finally {
    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
  }
  throw new Error("no level up inside " + limitSeconds + "s");
}

const text = () => container.textContent ?? "";
const clock = () => (text().match(/\d+:\d\d/) ?? ["?"])[0];
const seconds = () => {
  const [m, s] = clock().split(":").map(Number);
  return m! * 60 + s!;
};

describe("the loop", () => {
  it("starts stopped at zero and advances once frames arrive", () => {
    start();
    expect(clock()).toBe("0:00");
    play(3);
    expect(clock()).toBe("0:03");
  });

  it("advances by simulated time rather than by frame count", () => {
    // The property that makes a recording replayable: a machine getting ten
    // frames a second and one getting sixty must reach the same tick.
    //
    // Seven and a half seconds because the clock resolves only to a whole
    // second, so a duration landing exactly on a tick boundary lets one tick
    // of floating point drift flip the number on screen. Mid-second measures
    // the thing this test is about rather than the last bit of a division.
    start();
    frame(0);
    for (let i = 0; i < 75; i++) frame(100);
    for (let i = 0; i < 6; i++) frame(0);
    const slow = clock();
    expect(slow).toBe("0:07");

    act(() => root.unmount());
    container.remove();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    queued = new Map();
    now = 0;
    start();
    play(7.5);
    expect(clock()).toBe(slow);
  });

  it("refuses to swallow a long stall, so tabbing away does not kill you", () => {
    start();
    frame(0);
    frame(60_000);
    // Capped at a quarter second of catch-up, not a minute of it.
    expect(clock()).toBe("0:00");
    play(1);
    expect(clock()).toBe("0:01");
  });
});

describe("the level up", () => {
  it("stops the clock and offers three cards", () => {
    // The stepper is what actually holds time still here, not the loop: see
    // the note in OverkillGame.tsx. This asserts the behaviour a player sees
    // and does not claim to isolate which layer produces it.
    start();
    playUntilLevelUp();
    expect(cardsOnScreen().length).toBe(3);
    const held = clock();
    play(2);
    expect(clock()).toBe(held);
  });

  it("does not repay the time spent reading the cards", () => {
    // The flood this catches is real and would be invisible in play: bank the
    // seconds spent deciding and they are all simulated in one frame when the
    // modal closes, so the player reappears surrounded by things that walked
    // in while they were reading.
    //
    // Three seconds of stalling against two of play, so a version that banked
    // the time would land five seconds on and could not be mistaken for drift.
    //
    // Two mechanisms currently produce this and the test cannot tell them
    // apart: the loop drops the carry, and the effect that owns the carry is
    // rebuilt when the modal closes anyway. That is written up where the code
    // is; what is asserted here is only what a player would see.
    start();
    playUntilLevelUp();
    const before = seconds();
    for (let i = 0; i < 180; i++) frame();
    for (let i = 0; i < 6; i++) frame(0);
    expect(seconds()).toBe(before);

    const card = [...container.querySelectorAll("button")].find((b) =>
      b.className.includes("flex-col"),
    )!;
    act(() => card.dispatchEvent(new Event("click", { bubbles: true })));
    play(2);
    expect(seconds() - before).toBeGreaterThan(0);
    expect(seconds() - before).toBeLessThanOrEqual(2);
  });
});

describe("the end", () => {
  it("reaches the death screen and asks the question", () => {
    start();
    // Long enough for a player who never chooses anything to be overwhelmed.
    for (let round = 0; round < 40; round++) {
      play(10);
      // Waves brief before they start, so a run that answers nothing stops at
      // 0:55 forever and this reported "the death screen never came" about a
      // game that was patiently waiting to be told what to deploy.
      deploy();
      predict();
      const card = [...container.querySelectorAll("button")].find((b) =>
        b.className.includes("flex-col"),
      );
      if (card !== undefined) act(() => card.dispatchEvent(new Event("click", { bubbles: true })));
      if (text().includes("worth most")) break;
    }
    expect(text()).toContain("Which of these was worth most?");
  }, 60_000);

  it("can be left at any time", () => {
    let left = false;
    start(() => {
      left = true;
    });
    play(2);
    const exit = [...container.querySelectorAll("button")].find(
      (b) => b.getAttribute("aria-label") === "Leave the game",
    )!;
    act(() => exit.dispatchEvent(new Event("click", { bubbles: true })));
    expect(left).toBe(true);
  });
});
