import { useEffect, useRef, useState } from "react";
import { ENEMIES, WEAPON_IDS, type EnemyKind, type WeaponId } from "./content";
import { ENCOUNTER_SPEED, encounterAt, lengthOf, stillFrames } from "./encounter";
import { VERB, blockerOf } from "./verbs";
import { drawEncounter } from "./encounterDraw";
import { drawPathogen } from "./render";
import { WeaponIcon } from "./WeaponIcon";

/**
 * EVERY MEETING, ONE AT A TIME, SLOWLY.
 *
 * Pick an effector down the side and a pathogen along the bottom and watch
 * that one encounter alone, at 0.4x, with a scrubber. Nothing here scores
 * anything and nothing is wired into a run: it exists so the mechanisms can be
 * looked at, argued with, and corrected before any of them is asked to teach
 * somebody something during combat.
 *
 * THE COMPARISON IS THE POINT, so two panels run side by side and the second
 * one is chosen for you: whatever the current pathogen's most instructive
 * partner is. Complement against E. coli sits beside complement against
 * S. aureus, because a pore that sinks through beside a pore that sits on top
 * is the entire lesson of the second wave and neither half means much alone.
 *
 * There is no text on the canvas in any of it. If a picture needs a caption it
 * has failed, and the caption would be nine translations of the answer.
 */

const BG = "#150A12";
const KINDS = Object.keys(ENEMIES) as EnemyKind[];

/**
 * Who to show beside this one.
 *
 * MINIMAL PAIRS, in the sense The Witness uses: two cases differing in one
 * feature, so that feature is the only thing that can explain the difference.
 * Chosen by hand because "one feature apart" is a judgement about which
 * feature matters, and there is no honest way to derive that.
 */
const PARTNER: Readonly<Record<EnemyKind, EnemyKind>> = {
  // Thin wall against thick: the whole of wave two.
  coli: "aureus",
  aureus: "coli",
  // In the open against inside one of your own cells: the whole of wave three.
  virion: "infected",
  infected: "virion",
  // Big enough to need spraying against far too big to do anything else with.
  candida: "worm",
  worm: "candida",
};

export function EncounterDemo({ onExit }: { onExit: () => void }) {
  const [weapon, setWeapon] = useState<WeaponId>("complement");
  const [kind, setKind] = useState<EnemyKind>("coli");
  const [paused, setPaused] = useState(false);
  const [scrub, setScrub] = useState(0);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const held = useRef(0);
  held.current = scrub;

  const span = lengthOf(VERB[weapon]);

  useEffect(() => {
    const c = canvas.current;
    if (c === null) return;
    const ctx = c.getContext("2d");
    if (ctx === null) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames = stillFrames(VERB[weapon]);

    let raf = 0;
    let clock = 0;
    let previous = -1;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== Math.round(w * dpr)) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (paused) {
        clock = held.current;
      } else if (reduced) {
        // Three held frames rather than a sequence. Not a degraded fallback:
        // holding the comparison still is arguably the better teaching object.
        const step = previous < 0 ? 0 : (now - previous) / 1000;
        previous = now;
        const cycle = (clock + step) % (frames.length * 1.5);
        clock = cycle;
        setScrub(frames[Math.floor(cycle / 1.5)] ?? 0);
      } else {
        const step = previous < 0 ? 0 : ((now - previous) / 1000) * 60 * ENCOUNTER_SPEED;
        previous = now;
        clock += step;
        // A held beat on the outcome before it loops, so the last thing seen
        // is the answer rather than the reset.
        if (clock > span + 40) clock = 0;
        setScrub(Math.min(clock, span));
      }

      const at = reduced ? (frames[Math.floor((clock / 1.5) % frames.length)] ?? 0) : Math.min(clock, span);

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      const r = Math.min(w * 0.17, h * 0.3);
      const y = h / 2;
      drawEncounter(ctx, weapon, kind, w * 0.29, y, r, at);
      drawEncounter(ctx, weapon, PARTNER[kind], w * 0.75, y, r, at);

      // The one piece of chrome: a hairline down the middle, so the two read
      // as one comparison rather than two illustrations.
      ctx.strokeStyle = "#3F2233";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.1);
      ctx.lineTo(w / 2, h * 0.9);
      ctx.stroke();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [paused, weapon, kind, span]);

  const state = encounterAt(weapon, kind, Math.round(scrub));

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: BG }}>
      <div className="flex min-h-0 flex-1">
        {/* Effectors down the side, drawn as the cells they are. */}
        <div className="flex flex-col justify-center gap-1 px-2">
          {WEAPON_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setWeapon(id)}
              aria-pressed={id === weapon}
              className={`rounded-md border p-1.5 ${
                id === weapon ? "border-slate-300 bg-slate-800/70" : "border-transparent"
              }`}
            >
              <WeaponIcon id={id} size={26} dim={id !== weapon} />
            </button>
          ))}
        </div>
        <canvas ref={canvas} className="min-h-0 min-w-0 flex-1" />
      </div>

      {/* Pathogens along the bottom, drawn by the arena's own function. */}
      <div className="flex items-center justify-center gap-1 px-2">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={k === kind}
            className={`rounded-md border p-1 ${
              k === kind ? "border-slate-300 bg-slate-800/70" : "border-transparent"
            }`}
          >
            <PathogenChip kind={k} dim={k !== kind} />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 pb-5 pt-2">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200"
        >
          {paused ? "▶" : "‖"}
        </button>
        <input
          type="range"
          min={0}
          max={span}
          value={Math.round(scrub)}
          onChange={(ev) => {
            setPaused(true);
            setScrub(Number(ev.target.value));
          }}
          className="min-w-0 flex-1"
          aria-label="Scrub the encounter"
        />
        {/* The one readout, and it is for whoever is BUILDING these rather than
            for a player: which step is running and whether it is stuck. It has
            no place in the game and is why this screen is not in the game. */}
        <span className="w-32 text-right font-mono text-[0.65rem] text-slate-500">
          {state.step}
          {state.stalled ? ` ⊘${blockerOf(weapon, kind) ?? ""}` : ""}
        </span>
        <button
          type="button"
          onClick={onExit}
          className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200"
        >
          {"✕"}
        </button>
      </div>
    </div>
  );
}

function PathogenChip({ kind, dim }: { kind: EnemyKind; dim: boolean }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = canvas.current;
    if (c === null) return;
    const ctx = c.getContext("2d");
    if (ctx === null) return;
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    c.width = Math.round(34 * dpr);
    c.height = Math.round(34 * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, 34, 34);
    drawPathogen(ctx, kind, 17, 17, 9, 0, false);
  }, [kind]);
  return (
    <canvas
      ref={canvas}
      width={34}
      height={34}
      style={{ width: 34, height: 34, opacity: dim ? 0.35 : 1, display: "block" }}
      aria-hidden
    />
  );
}
