import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "../../../app/i18n";
import { PLAYER_HP, TICK_HZ, type WeaponId } from "./content";
import { createRun, type Dir, type Run, type RunView } from "./sim";
import { recorder, type Recorder, type RunLog } from "./replay";
import {
  MAX_PARTICLES,
  WEAPON_COLOR,
  drawFrame,
  spawnDeathParticles,
  stepParticles,
  type Particle,
  type Pulse,
} from "./render";
import { dirFromKeys, dirFromOffset, isMovementKey } from "./input";
import { useNumbers } from "./format";
import { Meter } from "./Meter";
import { WeaponIcon } from "./WeaponIcon";
import { DeathScreen } from "./DeathScreen";
import { BriefingSheet } from "./BriefingSheet";

/**
 * The whole game on one screen.
 *
 * FIXED TIMESTEP, VARIABLE FRAME RATE, which is the only arrangement that
 * keeps a recorded run replayable. The browser calls back whenever it feels
 * like it; the simulation advances in whole sixtieths and never in "however
 * long the last frame took". A slow phone drops frames and plays the same
 * game; a fast one draws the same game more often.
 *
 * THE HOT PATH KEEPS OUT OF REACT. Sixty state updates a second would re-render
 * the whole tree sixty times a second for no reason, so the loop writes to refs
 * and paints the canvas directly. React is told only about the things that
 * change the SHAPE of the screen: a level up arriving, the player dying. The
 * meter is the one exception and it is throttled to about twelve updates a
 * second, which is faster than anybody can read a bar anyway.
 */

const STEP_MS = 1000 / TICK_HZ;
/** Never simulate more than this much time in one frame after a stall. */
const MAX_CATCHUP_MS = 250;
const METER_EVERY = 5;

type Phase =
  | { at: "playing" }
  | { at: "levelup"; offers: readonly WeaponId[] }
  | {
      at: "briefing";
      waveIndex: number;
      unlocked: readonly WeaponId[];
      active: readonly WeaponId[];
    }
  | { at: "dead"; log: RunLog };

export function OverkillGame({ seed, onExit }: { seed: number; onExit: () => void }) {
  const t = useT();
  const n = useNumbers();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const run = useRef<Run | null>(null);
  const rec = useRef<Recorder | null>(null);
  const pulses = useRef<Pulse[]>([]);
  const particles = useRef<Particle[]>([]);
  /** Decays every frame. Pure feedback: nothing reads it back. */
  const shake = useRef(0);
  const keys = useRef(new Set<string>());
  const stick = useRef<{ id: number; x: number; y: number } | null>(null);
  const pointerDir = useRef<Dir>(0);
  const wantCut = useRef<WeaponId | null>(null);
  const [phase, setPhase] = useState<Phase>({ at: "playing" });
  const [meter, setMeter] = useState(0);
  const [generation, setGeneration] = useState(0);

  // One run per generation. Rebuilt on "play again" by bumping the counter.
  useEffect(() => {
    const seeds = { spawnSeed: (seed + generation * 7919) >>> 0, offerSeed: (seed ^ 0x5bf03635) >>> 0 };
    const r = recorder(
      {
        move: () => (pointerDir.current !== 0 ? pointerDir.current : dirFromKeys(keys.current)),
        cut: () => {
          const w = wantCut.current;
          wantCut.current = null;
          return w;
        },
      },
      seeds,
    );
    rec.current = r;
    run.current = createRun({ ...seeds, driver: r.driver });
    pulses.current = [];
    particles.current = [];
    shake.current = 0;
    setPhase({ at: "playing" });
  }, [seed, generation]);

  // The loop.
  //
  // NOTE ON WHO ACTUALLY HOLDS TIME STILL DURING A LEVEL UP: the stepper does,
  // not this branch. `step()` returns `awaitingUpgrade` over and over until
  // somebody chooses, so no tick passes whether or not the loop asks. Mutation
  // testing proved that: forcing this branch open changed nothing anywhere.
  // The check stays because without it the loop calls `step()` sixty times a
  // second behind a modal and hands React a fresh phase object each time, which
  // re-registers this very effect every frame. That is a cost argument, not a
  // correctness one, and the tests below claim nothing more than it earns.
  useEffect(() => {
    let raf = 0;
    // Minus one rather than zero: a real timestamp of zero exists (the first
    // frame after a page load, and every frame in a test that drives the
    // clock by hand), and using zero as the sentinel silently throws that
    // frame away.
    let previous = -1;
    let carry = 0;
    let frames = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const r = run.current;
      const c = canvas.current;
      if (r === null || c === null) return;

      const elapsed = previous < 0 ? 0 : Math.min(MAX_CATCHUP_MS, now - previous);
      previous = now;

      if (phase.at === "playing") {
        carry += elapsed;
        while (carry >= STEP_MS) {
          carry -= STEP_MS;
          const status = r.step();
          for (const w of r.view.firedThisTick) pulses.current.push({ weapon: w, tick: r.view.tick });
          spawnDeathParticles(r.view, particles.current);
          stepParticles(particles.current, r.view);
          // A hit is the one moment the screen is allowed to shout.
          if (r.view.hurtThisTick) shake.current = 7;
          if (status === "awaitingUpgrade") {
            setPhase({ at: "levelup", offers: [...r.offers] });
            carry = 0;
            break;
          }
          if (status === "awaitingLoadout") {
            // Copied out rather than held: `view` is explicitly documented as
            // valid only until the next step, and a briefing sheet outlives
            // several thousand of them.
            setPhase({
              at: "briefing",
              waveIndex: r.view.waveIndex,
              unlocked: [...r.view.unlocked],
              active: [...r.view.active],
            });
            carry = 0;
            break;
          }
          if (status === "over") {
            setPhase({ at: "dead", log: rec.current!.log() });
            carry = 0;
            break;
          }
        }
        if (pulses.current.length > 40) pulses.current.splice(0, pulses.current.length - 40);
        if (particles.current.length > MAX_PARTICLES) {
          particles.current.splice(0, particles.current.length - MAX_PARTICLES);
        }
      } else {
        // Dropping the accumulated time rather than banking it, so a level up
        // spent reading is not repaid as a burst of catch-up ticks the instant
        // it closes.
        //
        // REDUNDANT TODAY, and mutation testing is how that was found rather
        // than guessed: `carry` is a local of this effect, and the effect is
        // rebuilt whenever `phase` changes, so closing the modal already
        // discards it. The line stays because that is an incidental property
        // of the dependency array rather than a decision anybody made, and it
        // would stop being true the moment `carry` moved to a ref to avoid the
        // rebuild. The test below asserts the behaviour a player would notice
        // and does not claim to isolate this line.
        carry = 0;
      }

      shake.current *= 0.82;
      if (shake.current < 0.3) shake.current = 0;
      paint(c, r.view, pulses.current, particles.current, shake.current);
      frames += 1;
      if (frames % METER_EVERY === 0) setMeter((m) => m + 1);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isMovementKey(e.key)) return;
      e.preventDefault();
      keys.current.add(e.key);
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key);
    const blur = () => keys.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  const onCut = useCallback((id: WeaponId) => {
    wantCut.current = id;
  }, []);

  const view = run.current?.view;
  const hp = view === undefined ? PLAYER_HP : Math.max(0, view.hp);

  return (
    <div className="fixed inset-0 touch-none overscroll-none bg-[#080C11] select-none">
      <canvas
        ref={canvas}
        className="absolute inset-0 h-full w-full"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          stick.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          const s = stick.current;
          if (s === null || s.id !== e.pointerId) return;
          pointerDir.current = dirFromOffset(e.clientX - s.x, e.clientY - s.y);
        }}
        onPointerUp={() => {
          stick.current = null;
          pointerDir.current = 0;
        }}
        onPointerCancel={() => {
          stick.current = null;
          pointerDir.current = 0;
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            aria-label={t({ en: "Leave the game" })}
            className="rounded-md bg-black/55 px-2.5 py-1 text-sm text-slate-300 backdrop-blur-sm"
          >
            ×
          </button>
          <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-slate-100 transition-[width] duration-150"
              style={{ width: `${(hp / PLAYER_HP) * 100}%` }}
            />
          </div>
        </div>
        <span className="rounded-md bg-black/55 px-2 py-1 text-sm text-slate-200 tabular-nums backdrop-blur-sm">
          {/*  is the INDEX of the tick being simulated, so the
              number that have elapsed is one more. Reading the index straight
              onto the clock loses a tick, which is invisible at a glance and
              exactly the kind of thing that turns into a real bug once
              anything is measured against it. */}
          {n.clock((view?.tick ?? -1) + 1)}
        </span>
      </div>

      {/* EXPERIENCE, full width across the top. In the reference game this is
          the bar your eye lives on, because it is the one that keeps promising
          something is about to happen. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-slate-900">
        <div
          className="h-full bg-sky-400"
          style={{
            width: `${Math.round(((view?.xp ?? 0) / Math.max(1, view?.xpNeeded ?? 1)) * 100)}%`,
          }}
        />
      </div>

      {view !== undefined && (
        <div key={meter} className="pointer-events-none absolute right-3 bottom-3">
          <Meter view={view} onCut={onCut} label={t({ en: "Damage" })} />
        </div>
      )}

      {phase.at === "briefing" && (
        <BriefingSheet
          waveIndex={phase.waveIndex}
          unlocked={phase.unlocked}
          active={phase.active}
          onDeploy={(ids) => {
            run.current?.chooseLoadout(ids);
            rec.current?.noteLoadout(view?.tick ?? 0, phase.waveIndex, phase.unlocked, ids);
            setPhase({ at: "playing" });
          }}
        />
      )}

      {phase.at === "levelup" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="grid w-full max-w-sm grid-cols-3 gap-3">
            {phase.offers.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  run.current?.chooseUpgrade(id);
                  rec.current?.noteUpgrade(view?.tick ?? 0, phase.offers, id);
                  setPhase({ at: "playing" });
                }}
                className="flex flex-col items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-5 active:bg-slate-800"
                style={{ borderColor: WEAPON_COLOR[id] + "66" }}
              >
                <WeaponIcon id={id} size={40} />
                {/* Pips rather than a numeral: how many you already have is a
                    quantity to glance at, not one to read. */}
                <span className="flex gap-[3px]" aria-hidden>
                  {Array.from({ length: Math.min(6, view?.levels[id] ?? 1) }, (_, k) => (
                    <span
                      key={k}
                      className="inline-block h-1 w-1 rounded-full"
                      style={{ background: WEAPON_COLOR[id] }}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase.at === "dead" && (
        <DeathScreen log={phase.log} onAgain={() => setGeneration((g) => g + 1)} />
      )}
    </div>
  );
}

function paint(
  canvas: HTMLCanvasElement,
  view: RunView,
  pulses: readonly Pulse[],
  particles: readonly Particle[],
  shake: number,
): void {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  const ctx = canvas.getContext("2d");
  if (ctx === null) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawFrame(ctx, { view, pulses, particles, width: w, height: h, shake });
}
