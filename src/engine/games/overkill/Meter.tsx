import { useEffect, useRef, useState } from "react";
import { CUTS_PER_RUN, WEAPON_IDS, type WeaponId } from "./content";
import { WEAPON_COLOR, cutProgress } from "./render";
import type { RunView } from "./sim";
import { useNumbers } from "./format";
import { WeaponIcon } from "./WeaponIcon";

/**
 * The damage meter, which is also the way you switch a weapon off.
 *
 * PUTTING THE INTERVENTION ON THE MISLEADING NUMBER is the whole reason these
 * are one control and not two. The bar says 54%. Your thumb is already on it.
 * Holding it is how you find out whether the 54% was worth anything, and the
 * cost of finding out is eight seconds without it.
 *
 * The panel is labelled with the word for what it measures and nothing else.
 * A version with no label at all was considered and is worse: a meter that
 * says nothing is the game hiding the ball, where a meter that says exactly
 * what it counts is telling the whole truth to somebody who will read
 * importance into it anyway. The misreading has to be the player's.
 */

/** How long a press has to be held before it spends a cut. */
const HOLD_MS = 420;

export function Meter({
  view,
  onCut,
  label,
}: {
  view: RunView;
  onCut: (id: WeaponId) => void;
  label: string;
}) {
  const n = useNumbers();
  const [holding, setHolding] = useState<WeaponId | null>(null);
  const [progress, setProgress] = useState(0);
  const started = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    if (holding === null) return;
    const tick = (now: number) => {
      if (started.current === 0) started.current = now;
      const p = Math.min(1, (now - started.current) / HOLD_MS);
      setProgress(p);
      if (p >= 1) {
        onCut(holding);
        setHolding(null);
        started.current = 0;
        setProgress(0);
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame.current);
      started.current = 0;
    };
  }, [holding, onCut]);

  const total = WEAPON_IDS.reduce((s, id) => s + view.damage[id], 0);

  return (
    <div className="pointer-events-auto select-none rounded-lg bg-black/55 p-2 backdrop-blur-sm">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="text-[0.6rem] tracking-[0.18em] text-slate-400 uppercase">{label}</span>
        <span className="flex gap-1" aria-hidden>
          {Array.from({ length: CUTS_PER_RUN }, (_, i) => (
            <span
              key={i}
              className={`inline-block h-1.5 w-3 rounded-sm ${
                i < view.cutsLeft ? "bg-slate-200" : "bg-slate-700"
              }`}
            />
          ))}
        </span>
      </div>
      <div className="flex flex-col gap-[3px]">
        {WEAPON_IDS.map((id) => {
          const share = total > 0 ? view.damage[id] / total : 0;
          const cut = cutProgress(view, id);
          const held = holding === id;
          return (
            <button
              key={id}
              type="button"
              className="flex touch-none items-center gap-2 text-left"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                if (view.cutsLeft > 0 && cut === null) setHolding(id);
              }}
              onPointerUp={() => setHolding(null)}
              onPointerCancel={() => setHolding(null)}
              onPointerLeave={() => setHolding(null)}
            >
              <span className="flex-none">
                <WeaponIcon id={id} size={16} dim={cut !== null} />
              </span>
              <span className="relative h-2.5 w-24 flex-none overflow-hidden rounded-sm bg-slate-800">
                <span
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${Math.round(share * 100)}%`,
                    background: WEAPON_COLOR[id],
                    opacity: cut !== null ? 0.25 : 1,
                  }}
                />
                {cut !== null && (
                  <span
                    className="absolute inset-y-0 left-0 bg-slate-300/70"
                    style={{ width: `${Math.round((1 - cut) * 100)}%` }}
                  />
                )}
                {held && (
                  <span
                    className="absolute inset-y-0 left-0 bg-white/80"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                )}
              </span>
              <span
                className="w-9 flex-none text-right text-[0.7rem] tabular-nums"
                style={{ color: cut !== null ? "#64748B" : WEAPON_COLOR[id] }}
              >
                {n.percent(share)}
              </span>
              <span className="w-4 flex-none text-right text-[0.6rem] text-slate-500 tabular-nums">
                {n.int(view.levels[id])}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
