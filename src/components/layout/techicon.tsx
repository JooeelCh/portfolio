import type { TechIcon as TechIconData } from "@/content/stack";
import { cn } from "@/lib/utils";

type Props = {
  icon: TechIconData;
  className?: string;
};

/** SVG monocromo: hereda el color del texto (currentColor). */
export function TechIcon({ icon, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn("size-7 shrink-0 sm:size-8", className)}
    >
      <path d={icon.path} />
    </svg>
  );
}
