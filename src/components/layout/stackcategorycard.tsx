import { AnimatePresence, motion } from "motion/react";
import type { StackCategory } from "@/content/stack";
import { cn } from "@/lib/utils";
import { TechTile } from "./techtile";
import { cardVariants } from "../../content/motion";

type Props = {
  category: StackCategory;
  title: string;
  subtitle: string;
  showLearning: boolean;
};

const GRID = "grid grid-cols-3 gap-3 sm:gap-4";

export function StackCategoryCard({
  category,
  title,
  subtitle,
  showLearning,
}: Props) {
  const Icon = category.icon;
  const current = category.items.filter((item) => !item.learning);
  const learning = category.items.filter((item) => item.learning);

  return (
    <motion.article
      layout
      variants={cardVariants}
      style={{ borderRadius: 24 }}
      className={cn(
        "flex flex-col border p-5 sm:p-7",
        "border-[color-mix(in_oklab,var(--secondary)_25%,transparent)]",
        "bg-gradient-to-b from-transparent to-[color-mix(in_oklab,var(--secondary)_22%,transparent)]",
      )}
    >
      <motion.header
        layout
        className="border-b border-[color-mix(in_oklab,var(--secondary)_30%,transparent)] pb-5"
      >
        <h3 className="flex items-center gap-3 font-display text-2xl text-[color:var(--text)]">
          <Icon className="size-5 text-[color:var(--accent)]" aria-hidden="true" />
          {title}
        </h3>
        <p className="mt-3 font-sans text-sm text-[color:var(--primary)]">
          {subtitle}
        </p>
      </motion.header>

      <motion.ul layout className={cn(GRID, "grow content-start pt-6")}>
        {current.map((item) => (
          <TechTile key={item.name} item={item} />
        ))}
        <AnimatePresence initial={false}>
          {showLearning &&
            learning.map((item, i) => (
              <TechTile key={item.name} item={item} learningIndex={i} />
            ))}
        </AnimatePresence>
      </motion.ul>
    </motion.article>
  );
}