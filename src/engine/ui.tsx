import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "w-full rounded-lg px-5 py-3.5 text-center text-base font-semibold transition-[transform,background-color,border-color] duration-200 active:scale-[.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50";
  const look =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-ink/90"
      : "border border-rule bg-transparent text-ink hover:border-ink/40 hover:bg-paper-3";
  return (
    <button className={`${base} ${look} ${className}`} {...rest}>
      {children}
    </button>
  );
}

type Tone = "ink" | "brand" | "rust" | "gold";
const TICK: Record<Tone, string> = {
  ink: "bg-ink-mute",
  brand: "bg-brand",
  rust: "bg-rust",
  gold: "bg-gold",
};

/** Editorial eyebrow: uppercase, tracked, with a small colored tick. */
export function Badge({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-ink-soft">
      <span className={`h-2 w-2 rounded-[1px] ${TICK[tone]}`} aria-hidden="true" />
      {children}
    </span>
  );
}

/** Four-beat progress indicator (setup → reveal → lesson → share). */
export function ProgressDots({
  total,
  index,
}: {
  total: number;
  index: number;
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={index + 1}
      aria-label={`Step ${index + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={
            "h-[3px] rounded-full transition-all duration-300 " +
            (i === index
              ? "w-7 bg-brand"
              : i < index
                ? "w-4 bg-brand/50"
                : "w-4 bg-rule")
          }
        />
      ))}
    </div>
  );
}

/**
 * Position on the SRS ladder, drawn as rungs rather than a percentage.
 *
 * A percentage bar was actively misleading here. Width was linear in the stage
 * index while the intervals are exponential, so Apprentice IV drew a 44% bar
 * after 36 hours of a journey whose last rung alone is a year. Reading "44%
 * mastered" three days in manufactures exactly the false confidence this app
 * exists to puncture, which made it the worst possible place to be sloppy.
 *
 * Rungs claim nothing about retention. They say which step you are on, out of
 * how many, which is all the ladder actually knows.
 */
export function StageRungs({
  stage,
  max,
  tone = "gold",
  label,
}: {
  stage: number;
  max: number;
  tone?: "gold" | "brand";
  label: string;
}) {
  return (
    <div
      className="mt-1.5 flex items-center gap-[3px]"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={
            "h-1 flex-1 rounded-full " +
            (i < stage
              ? tone === "brand"
                ? "bg-brand-ink"
                : "bg-gold-ink"
              : "bg-rule")
          }
        />
      ))}
    </div>
  );
}
