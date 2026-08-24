import { useEffect, useRef, useState } from "react";
import { type EnemyKind, type WeaponId } from "./content";
import { lengthOf } from "./encounter";
import { VERB, completes } from "./verbs";
import { drawEncounter } from "./encounterDraw";
import { WeaponIcon } from "./WeaponIcon";

/**
 * FIRST CONTACT: the clock stops and you say what you think will happen.
 *
 * The animations existed before this did, and they were videos. A player who
 * watches a clip learns roughly nothing, because nothing was asked of them and
 * nothing they believed was ever put at risk. What makes it a mechanic is the
 * COMMIT: one tap, before the outcome, on a question with two answers.
 *
 * That is this project's own atomic unit, setup and commit and reveal, running
 * at a scale of about two seconds inside a real-time game. It costs nothing,
 * it cannot be wrong in a way that hurts the run, and a wrong guess turns the
 * next second and a half from a cutscene into a correction.
 *
 * WORDLESS, like everything else here. A filled circle and a struck-through
 * one: will this work, or will it not. Two shapes need no dictionary, and a
 * caption would be the answer written under the question.
 *
 * The pause consumes no simulated ticks, exactly as a level up does not, so
 * nothing about this reaches replay. `firstContact` is renderer-only and the
 * simulation never reads it back.
 */

const BG = "#150A12";

/**
 * Slower than the fight and faster than the gallery.
 *
 * The browsing demo runs at 0.4, which is right when somebody is studying one
 * mechanism on purpose. In a run the same sequence plus its hold came to
 * nearly four seconds, and this fires up to ten times: at that length it stops
 * being a beat and becomes an interruption people learn to dread. Just under
 * two seconds keeps the motion legible and keeps ten of them under twenty.
 */
const BEAT_SPEED = 0.7;

/** Ticks the outcome is held before play resumes, so the answer lands. */
const HOLD = 18;

type Phase = "asking" | "showing";

export function EncounterBeat({
  weapon,
  kind,
  onDone,
}: {
  weapon: WeaponId;
  kind: EnemyKind;
  onDone: (guessed: boolean | null, right: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("asking");
  const [guess, setGuess] = useState<boolean | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  /*
    HELD IN A REF, AND THE EFFECT MUST NOT DEPEND ON IT.

    `onDone` is a fresh closure on every render of the host, and the host
    re-renders every five frames to refresh the meter. With it in the
    dependency list the reveal's effect was torn down and rebuilt constantly,
    which resets `clock` to zero, so the sequence never reached its end and the
    beat NEVER CLOSED. The run sat at nine seconds forever with no error
    anywhere, in tests and, for exactly the same reason, in a real game.
  */
  const done = useRef(onDone);
  done.current = onDone;
  const works = completes(weapon, kind);
  const span = lengthOf(VERB[weapon]);

  useEffect(() => {
    if (phase !== "showing") return;
    /*
      THE CLOCK RUNS WHETHER OR NOT THERE IS ANYTHING TO DRAW ON.

      This effect used to bail out when the canvas or its context was missing,
      and bailing out means `onDone` is never called, which means the beat
      never closes, which means THE GAME HARD-LOCKS. Not a hypothetical: it is
      how three tests failed, sitting at 0:09 forever with no error anywhere,
      and a browser that refuses a 2D context for any reason would do the same
      thing to a real player.

      So the sequence is timed independently and the drawing is what is
      conditional. A beat with no canvas is a blank pause of the right length,
      which is a bad experience and an infinitely better one than a freeze.
    */
    const c = canvas.current;
    const ctx = c === null ? null : c.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let clock = 0;
    let previous = -1;
    let finished = false;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const step = previous < 0 ? 0 : ((now - previous) / 1000) * 60 * BEAT_SPEED;
      previous = now;
      clock += reduced ? step * 3 : step;

      if (c !== null && ctx !== null) {
        const dpr = Math.min(3, window.devicePixelRatio || 1);
        const w = c.clientWidth;
        const h = c.clientHeight;
        if (c.width !== Math.round(w * dpr)) {
          c.width = Math.round(w * dpr);
          c.height = Math.round(h * dpr);
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);
        const r = Math.min(w * 0.3, h * 0.34);
        drawEncounter(ctx, weapon, kind, w / 2, h / 2, r, Math.min(clock, span));
      }

      // A held beat on the outcome, then back to the fight. Long enough to
      // read, short enough that ten of them in a run is not a tax.
      if (!finished && clock > span + HOLD) {
        finished = true;
        done.current(guess, guess === null ? false : guess === works);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, weapon, kind, span, guess, works]);

  if (phase === "asking") {
    return (
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-black/85 backdrop-blur-sm">
        {/* Who is meeting what. No words, and no hint of the answer. */}
        <div className="flex items-center gap-6">
          <WeaponIcon id={weapon} size={64} />
          <PathogenFace kind={kind} />
        </div>
        <div className="flex gap-5">
          <Choice
            yes
            onPick={() => {
              setGuess(true);
              setPhase("showing");
            }}
          />
          <Choice
            yes={false}
            onPick={() => {
              setGuess(false);
              setPhase("showing");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-sm">
      <canvas ref={canvas} className="h-full w-full" />
      {/* What you said, kept on screen while the answer plays, so a wrong
          guess is a correction rather than a thing you have to remember. */}
      <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2">
        <Choice yes={guess === true} onPick={() => {}} small />
      </div>
    </div>
  );
}

/** Will it work, or will it not. Two shapes, no dictionary. */
function Choice({
  yes,
  onPick,
  small = false,
}: {
  yes: boolean;
  onPick: () => void;
  small?: boolean;
}) {
  const s = small ? 34 : 84;
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={yes ? "Predict it works" : "Predict it fails"}
      className={`rounded-full border-2 ${
        small ? "border-slate-600 opacity-70" : "border-slate-500 active:bg-slate-800"
      }`}
      style={{ width: s, height: s }}
    >
      <svg width={s} height={s} viewBox="0 0 40 40" aria-hidden>
        <circle
          cx="20"
          cy="20"
          r="11"
          fill={yes ? "#86EFAC" : "none"}
          stroke={yes ? "none" : "#94A3B8"}
          strokeWidth="2.5"
        />
        {!yes && (
          <path d="M12 28 L28 12" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}

function PathogenFace({ kind }: { kind: EnemyKind }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = canvas.current;
    if (c === null) return;
    const ctx = c.getContext("2d");
    if (ctx === null) return;
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    c.width = Math.round(64 * dpr);
    c.height = Math.round(64 * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, 64, 64);
    void import("./render").then((m) => m.drawPathogen(ctx, kind, 32, 32, 18, 0, false));
  }, [kind]);
  return <canvas ref={canvas} width={64} height={64} style={{ width: 64, height: 64 }} aria-hidden />;
}
