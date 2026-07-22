import { useEffect, useState } from "react";

/**
 * Animates a number from 0 up to `target`. Returns `target` immediately when
 * inactive or when reduced motion is requested, so callers can drive both a
 * bar's height and its label off one value and stay in sync, with zero motion
 * for users who ask for none.
 */
export function useCountUp(
  target: number,
  active: boolean,
  durationMs = 800,
  reduced = false,
): number {
  const [value, setValue] = useState<number>(
    reduced || !active ? target : 0,
  );

  useEffect(() => {
    if (reduced || !active) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, durationMs, reduced]);

  return value;
}
