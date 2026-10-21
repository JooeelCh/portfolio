"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Row = { key: string; label: string; value: string };
type Status = "pending" | "typing" | "done";

type Props = {
  rows: Row[];
  speed?: number;
  className?: string;
};

export function AboutTypewriter({ rows, speed = 20, className }: Props) {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const [current, setCurrent] = useState(0);

  const started = inView && !reduceMotion;
  const finished = Boolean(reduceMotion) || current >= rows.length;

  return (
    <dl ref={ref} className={className}>
      {rows.map((row, i) => {
        const status: Status = finished
          ? "done"
          : !started
            ? "pending"
            : i < current
              ? "done"
              : i === current
                ? "typing"
                : "pending";

        return (
          <div key={row.key} className="contents">
            <dt className="text-foreground/60">{row.label}</dt>
            <dd>
              <TypewriterValue
                key={row.value}
                value={row.value}
                status={status}
                speed={speed}
                delay={i === 0 ? 0.2 : 0.12}
                onComplete={() => setCurrent((c) => (c === i ? i + 1 : c))}
              />
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

type ValueProps = {
  value: string;
  status: Status;
  speed: number;
  delay: number;
  onComplete: () => void;
};

function TypewriterValue({
  value,
  status,
  speed,
  delay,
  onComplete,
}: ValueProps) {
  const [count, setCount] = useState(0);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  });

  useEffect(() => {
    if (status !== "typing") return;
    const controls = animate(0, value.length, {
      duration: (value.length * speed) / 1000,
      delay,
      ease: "linear",
      onUpdate: (latest) => setCount(Math.round(latest)),
      onComplete: () => completeRef.current(),
    });

    return () => controls.stop();
  }, [status, value, speed, delay]);

  if (status === "done") return <>{value}</>;

  return (
    <>
      {value.slice(0, count)}
      {status === "typing" && <Cursor />}
      <span className="text-transparent">{value.slice(count)}</span>
    </>
  );
}

function Cursor() {
  return (
    <motion.span
      aria-hidden="true"
      className="relative"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
    >
      <span className="absolute top-[0.05em] left-px h-[1.1em] w-[0.3ch] bg-current" />
    </motion.span>
  );
}