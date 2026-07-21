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
    "w-full rounded-xl px-5 py-3.5 text-center text-base font-semibold transition active:scale-[.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50";
  const look =
    variant === "primary"
      ? "bg-indigo-500 text-white hover:bg-indigo-400"
      : "bg-white/10 text-slate-200 hover:bg-white/15";
  return (
    <button className={`${base} ${look} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
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
      className="flex items-center justify-center gap-2"
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
            "h-1.5 rounded-full transition-all " +
            (i === index
              ? "w-6 bg-indigo-400"
              : i < index
                ? "w-1.5 bg-indigo-400/70"
                : "w-1.5 bg-white/20")
          }
        />
      ))}
    </div>
  );
}
