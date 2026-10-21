"use client";

import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  pressed: boolean;
  onToggle: () => void;
  label: string;
  ariaLabel: string;
  tooltip: string;
  className?: string;
};

export function LearningToggle({
  pressed,
  onToggle,
  label,
  ariaLabel,
  tooltip,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-2xl px-4 sm:px-5",
        "bg-[color-mix(in_oklab,var(--accent)_25%,transparent)] text-[var(--text)]",
        "transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--accent)_40%,transparent)]",
        "aria-pressed:bg-[var(--accent)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]",
        className,
      )}
    >
      <GraduationCap className="size-7" aria-hidden="true" />
      <span className="hidden font-mono text-sm sm:inline">{label}</span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-full z-10 mt-2 hidden whitespace-nowrap rounded-md border border-[color-mix(in_oklab,var(--secondary)_40%,transparent)] bg-[var(--background)] px-2.5 py-1.5 font-mono text-xs text-[var(--text)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
      >
        {tooltip}
      </span>
    </button>
  );
}
