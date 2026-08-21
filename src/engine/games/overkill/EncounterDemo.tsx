import { useEffect, useRef, useState } from "react";
import { ENEMIES, type EnemyKind } from "./content";
import { ENCOUNTER_SPEED, ENCOUNTER_TICKS, PORE_REACH, STILL_FRAMES, macAt } from "./encounter";
import { drawPathogen } from "./render";
import { WEAPON_COLOR } from "./palette";

/**
 * THE TEST. Two pathogens, one animation, run twice.
 *
 * Left is E. coli, wall 0.1 of a radius. Right is S. aureus, wall 0.36. The
 * membrane attack complex reaches 0.22. Everything else about the two runs is
 * identical, including the assembly, which is the point: complement is not
 * repelled by the gram positive, it builds perfectly well and then cannot get
 * through what it built on.
 *
 * If a viewer cannot say, unprompted and without words, why the right-hand one
 * survived, then the encounter idea is wrong and the nine remaining animations
 * should not be built. That is the whole purpose of this screen and it is why
 * it is not wired into the game.
 */

const BG = "#150A12";

export function EncounterDemo({ onExit }: { onExit: () => void }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [scrub, setScrub] = useState(0);
  const held = useRef(0);
  held.current = scrub;

  useEffect(() => {
    const c = canvas.current;
    if (c === null) return;
    const ctx = c.getContext("2d");
    if (ctx === null) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      } else if (still) {
        // Three held frames, a second and a half each, cross-faded by nothing:
        // the comparison is meant to be looked at rather than followed.
        const step = previous < 0 ? 0 : (now - previous) / 1000;
        previous = now;
        clock = (clock + step) % (STILL_FRAMES.length * 1.5);
        clock = STILL_FRAMES[Math.floor(clock / 1.5)]!;
      } else {
        const step = previous < 0 ? 0 : ((now - previous) / 1000) * 60 * ENCOUNTER_SPEED;
        previous = now;
        clock += step;
        // A held beat on the outcome before it loops, so the last thing seen
        // is the answer rather than the reset.
        if (clock > ENCOUNTER_TICKS + 40) clock = 0;
        setScrub(Math.min(clock, ENCOUNTER_TICKS));
      }

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      const r = Math.min(w * 0.19, h * 0.3);
      const y = h / 2;
      draw(ctx, "coli", w * 0.27, y, r, Math.min(clock, ENCOUNTER_TICKS));
      draw(ctx, "aureus", w * 0.73, y, r, Math.min(clock, ENCOUNTER_TICKS));

      // The one piece of chrome: a hairline down the middle, so the two read
      // as one comparison rather than two illustrations.
      ctx.strokeStyle = "#3F2233";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.12);
      ctx.lineTo(w / 2, h * 0.88);
      ctx.stroke();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: BG }}>
      <canvas ref={canvas} className="min-h-0 w-full flex-1" />
      <div className="flex items-center gap-3 px-4 pb-5">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200"
        >
          {paused ? "▶" : "‖"}
        </button>
        <input
          type="range"
          min={0}
          max={ENCOUNTER_TICKS}
          value={Math.round(scrub)}
          onChange={(e) => {
            setPaused(true);
            setScrub(Number(e.target.value));
          }}
          className="min-w-0 flex-1"
          aria-label="Scrub the encounter"
        />
        <button
          type="button"
          onClick={onExit}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200"
        >
          {"✕"}
        </button>
      </div>
    </div>
  );
}

function draw(
  ctx: CanvasRenderingContext2D,
  kind: EnemyKind,
  cx: number,
  cy: number,
  r: number,
  tick: number,
): void {
  const m = macAt(tick, kind);
  const colour = WEAPON_COLOR.complement;
  const spec = ENEMIES[kind];
  const swollen = r * (1 + m.swell);
  // Bursting: the body tears open over the last third of a successful lysis.
  const gone = m.stage === "lyse" ? Math.max(0, (m.t - 0.62) / 0.38) : 0;

  ctx.save();
  ctx.globalAlpha = 1 - gone;

  // The pathogen, drawn by the arena's own function so the wall a player sees
  // here is the wall they will meet in the fight.
  drawPathogen(ctx, kind, cx, cy, swollen, Math.round(tick * 3), false);

  // The wall, lit where the pore is working on it. On the thick one this is
  // the moment the whole screen exists for: the ring is resting ON the bright
  // band, and the dark interior below it is never touched.
  if (m.stage === "insert" || m.stage === "stall") {
    const heat = m.stage === "stall" ? Math.max(0, 1 - m.t * 1.4) : m.t;
    ctx.strokeStyle = "#FFFFFF";
    ctx.globalAlpha = (1 - gone) * 0.9 * heat;
    ctx.lineWidth = Math.max(2, swollen * spec.wall);
    ctx.beginPath();
    ctx.arc(cx, cy, swollen * (1 - spec.wall / 2), -0.8, 0.8);
    ctx.stroke();
    ctx.globalAlpha = 1 - gone;
  }

  // The pore: nine subunits, arriving scattered, sliding into an even ring,
  // then driving inward as far as they can go.
  const n = 9;
  const ringR = swollen * 0.34;
  const at = swollen * (1 - m.depth);
  for (let i = 0; i < n; i++) {
    const even = (i / n) * Math.PI * 2;
    // Scatter is a fixed per-subunit offset that shrinks to nothing, so the
    // assembly reads as the same nine objects tidying up rather than as a
    // dissolve between two pictures.
    const jitter = Math.sin(i * 12.9898) * 1.7;
    const a = even + jitter * m.scatter;
    // Before they land they are still flying in from outside.
    const fly = m.stage === "deposit" ? 1 + (1 - m.t) * 1.6 : 1;
    const px = cx + Math.cos(a) * ringR * fly + (m.stage === "stall" ? Math.sin(i + m.t * 40) * 1.2 : 0);
    const py = cy + Math.sin(a) * ringR * fly - (m.depth > 0 ? 0 : 0);
    // Two subunits give up and drift off once it is clear this is going nowhere.
    const lost = m.stage === "stall" && i % 4 === 0 ? m.t * 26 : 0;
    ctx.globalAlpha = (1 - gone) * (m.stage === "stall" ? Math.max(0, 1 - m.t * 0.9) : 1);
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(px + lost, py - lost * 0.4, swollen * 0.075, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1 - gone;

  // The hole, once there is one. Drawn in the background colour rather than
  // composited out, because `destination-out` erases the canvas beneath.
  if (m.penetrates && (m.stage === "insert" || m.stage === "lyse")) {
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.arc(cx, cy - at + swollen * 0.02, ringR * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  // And the contents leaving through it, which is why the cell dies.
  if (m.stage === "lyse") {
    ctx.fillStyle = "#FBCFE8";
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI / 2 + (i - 3) * 0.16;
      const d = swollen * (0.5 + m.t * 2.4 + i * 0.05);
      ctx.globalAlpha = (1 - gone) * Math.max(0, 1 - m.t * 1.1);
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, swollen * 0.05, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();

  // Nothing is written anywhere on this screen. If the picture needs a caption
  // it has failed, and the caption would be nine translations of the answer.
  void PORE_REACH;
}
