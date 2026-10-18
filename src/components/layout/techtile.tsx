import { motion } from "motion/react";
import type { TechItem } from "@/content/stack";
import { cn } from "@/lib/utils";
import { TechIcon } from "./techicon";
import { tileVariants } from "../../content/motion";

type Props = {
  item: TechItem;
  className?: string;
};

export function TechTile({ item, className }: Props) {
  return (
    <motion.li
      variants={tileVariants}
      data-learning={item.learning ? "true" : "false"}
      className={cn(
        "group flex aspect-square min-w-0 flex-col items-center justify-center gap-2 rounded-xl border p-1.5 text-center sm:p-2",
        "border-[color-mix(in_oklab,var(--secondary)_40%,transparent)]",
        "bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]",
        "text-[var(--primary)] transition-colors duration-200",
        "hover:border-[var(--accent)] hover:text-[var(--text)]",
        // Lo que estoy aprendiendo se distingue por el borde punteado
        "data-[learning=true]:border-dashed",
        className,
      )}
    >
      <TechIcon icon={item.icon} />
      {/* 2 líneas reservadas: todos los íconos quedan alineados aunque el nombre sea corto */}
      <span className="font-mono text-[11px] leading-tight text-[var(--text)] [overflow-wrap:anywhere] sm:text-[13px]">
        {item.name}
      </span>
    </motion.li>
  );
}
