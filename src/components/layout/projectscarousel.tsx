"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project } from "@/content/projects";
import { ProjectCard } from "./projectcard";

type Direction = 1 | -1;

const OFFSET = 24;

const variants = {
  enter: (d: Direction) => ({ opacity: 0, y: d * OFFSET }),
  center: { opacity: 1, y: 0 },
  exit: (d: Direction) => ({ opacity: 0, y: d * -OFFSET }),
};

const arrowClass =
  "mx-auto flex h-10 w-16 items-center justify-center rounded-full text-text " +
  "transition-opacity hover:opacity-70 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-30";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const [{ index, direction }, setState] = useState<{ index: number; direction: Direction }>({
    index: 0,
    direction: 1,
  });

  const total = projects.length;
  if (total === 0) return null;

  const canPrev = index > 0;
  const canNext = index < total - 1;

  const go = (dir: Direction) =>
    setState((s) => {
      const next = s.index + dir;
      return next < 0 || next >= total ? s : { index: next, direction: dir };
    });

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" && canNext) {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowUp" && canPrev) {
      e.preventDefault();
      go(-1);
    }
  };

  const project = projects[index];
  const position = t("position", { current: index + 1, total });

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("title")}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-6 rounded-2xl outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      >
        <div className="relative flex justify-center">
          <button
            type="button"
            aria-label={t("previous")}
            aria-disabled={!canPrev}
            onClick={() => go(-1)}
            className={arrowClass}
          >
            <ChevronUp className="size-8" strokeWidth={1.25} aria-hidden />
          </button>
          <span
            aria-hidden
            className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-sm tabular-nums text-text/70"
          >
            {index + 1} / {total}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={project.slug}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="group"
            aria-roledescription="slide"
            aria-label={position}
          >
            <ProjectCard project={project} />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label={t("next")}
          aria-disabled={!canNext}
          onClick={() => go(1)}
          className={arrowClass}
        >
          <ChevronDown className="size-8" strokeWidth={1.25} aria-hidden />
        </button>

        <p className="sr-only" aria-live="polite">
          {position}
        </p>
      </div>
    </MotionConfig>
  );
}
