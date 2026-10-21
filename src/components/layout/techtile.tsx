import { motion, useReducedMotion } from "motion/react";
import type { TechIcon as TechIconData, TechItem } from "@/content/stack";
import { cn } from "@/lib/utils";
import { DashedBorder } from "../layout/dashedborder";
import { TechIcon } from "./techicon";
import { tileVariants } from "../../content/motion";

type Props = {
  item: TechItem;
  learningIndex?: number;
  className?: string;
};

const LEARNING_STAGGER = 0.08;

function LitIcon({ icon, delay }: { icon: TechIconData; delay: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <TechIcon icon={icon} />;

  return (
    <span className="relative flex">
      <motion.span
        aria-hidden="true"
        className="absolute -inset-2 rounded-full bg-[color:var(--accent)] blur-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 1.6] }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      <motion.span
        className="relative flex"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        <TechIcon icon={icon} />
      </motion.span>
    </span>
  );
}

export function TechTile({ item, learningIndex = 0, className }: Props) {
  const learning = Boolean(item.learning);
  const delay = learningIndex * LEARNING_STAGGER;
  const motionProps = learning
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.35, delay, ease: "easeOut" as const },
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
      }
    : { variants: tileVariants };

  return (
    <motion.li
      layout
      {...motionProps}
      data-learning={learning ? "true" : "false"}
      className={cn(
        "group relative flex aspect-square min-w-0 flex-col items-center justify-center gap-2 rounded-xl border p-1.5 text-center sm:p-2",
        "border-[color-mix(in_oklab,var(--secondary)_40%,transparent)]",
        "bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]",
        "text-[color:var(--primary)] transition-colors duration-200",
        "hover:border-[color:var(--accent)] hover:text-[color:var(--text)]",
        "data-[learning=true]:border-transparent",
        className,
      )}
    >
      {learning && <DashedBorder delay={delay + 0.2} />}
      {learning ? (
        <LitIcon icon={item.icon} delay={delay + 0.55} />
      ) : (
        <TechIcon icon={item.icon} />
      )}
      <span className="block min-h-[2lh] text-balance font-mono text-[11px] leading-tight text-[color:var(--text)] [overflow-wrap:anywhere] sm:text-[13px]">
        {item.name}
      </span>
    </motion.li>
  );
}