import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { StackCategory } from "@/content/stack";
import { cn } from "@/lib/utils";
import { TechTile } from "./techtile";
import { cardVariants, learningListVariants } from "../../content/motion";

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
  const reduceMotion = useReducedMotion();
  const Icon = category.icon;
  const current = category.items.filter((item) => !item.learning);
  const learning = category.items.filter((item) => item.learning);

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "flex flex-col rounded-3xl p-5 sm:p-7",
        "bg-gradient-to-b from-transparent to-[color-mix(in_oklab,var(--secondary)_22%,transparent)]",
      )}
    >
      <header className="border-b border-[color-mix(in_oklab,var(--secondary)_30%,transparent)] pb-5">
        <h3 className="flex items-center gap-3 font-display text-2xl text-[var(--text)]">
          <Icon className="size-5 text-[var(--accent)]" aria-hidden="true" />
          {title}
        </h3>
        <p className="mt-3 font-sans text-sm text-[var(--primary)]">{subtitle}</p>
      </header>

      <ul className={cn(GRID, "pt-6")}>
        {current.map((item) => (
          <TechTile key={item.name} item={item} />
        ))}
      </ul>

      {/* Se monta/desmonta con el toggle: la altura se anima y al cerrar no queda en el DOM */}
      <AnimatePresence initial={false}>
        {showLearning && learning.length > 0 && (
          <motion.div
            key="learning"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.ul
              variants={learningListVariants}
              initial="hidden"
              animate="visible"
              className={cn(GRID, "pt-3 sm:pt-4")}
            >
              {learning.map((item) => (
                <TechTile key={item.name} item={item} />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
