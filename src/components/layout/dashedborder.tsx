import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  delay?: number;
};

const RECT = { x: 0.7, y: 0.7, width: 98.6, height: 98.6, rx: 11 };

export function DashedBorder({ delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const maskId = `dash-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 size-full"
    >
      <defs>
        <mask id={maskId}>
          <motion.rect
            {...RECT}
            fill="none"
            stroke="white"
            strokeWidth={4}
            initial={{ pathLength: reduceMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay, ease: "easeInOut" }}
          />
        </mask>
      </defs>

      <motion.rect
        {...RECT}
        fill="none"
        strokeWidth={1.4}
        strokeDasharray="5 4"
        mask={`url(#${maskId})`}
        className="stroke-[color-mix(in_oklab,var(--primary)_55%,transparent)] transition-colors duration-200 group-hover:stroke-[color:var(--accent)]"
        animate={reduceMotion ? undefined : { opacity: [1, 0.45, 1] }}
        transition={{
          duration: 3.2,
          delay: delay + 1,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </svg>
  );
}