"use client";

import { useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { stackCategories } from "@/content/stack";
import { LearningToggle } from "../layout/learningtoggle";
import { StackCategoryCard } from "../layout/stackcategorycard";
import { containerVariants } from "../../content/motion";

export function Stack() {
  const t = useTranslations("Stack");
  const [showLearning, setShowLearning] = useState(false);

  return (
    // reducedMotion="user": con "reducir movimiento" solo queda el fade (sin y/scale)
    <MotionConfig reducedMotion="user">
      <section
        id="stack"
        aria-labelledby="stack-title"
        className="scroll-mt-24 px-6 py-24 sm:py-28 md:px-12"
      >
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2
              id="stack-title"
              className="text-4xl sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
            <LearningToggle
              pressed={showLearning}
              onToggle={() => setShowLearning((prev) => !prev)}
              label={t("learning.label")}
              ariaLabel={t("learning.show")}
              tooltip={showLearning ? t("learning.hide") : t("learning.show")}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid items-stretch gap-6 lg:grid-cols-3"
          >
            {stackCategories.map((category) => (
              <StackCategoryCard
                key={category.id}
                category={category}
                showLearning={showLearning}
                title={t(`categories.${category.id}.title`)}
                subtitle={t(`categories.${category.id}.subtitle`)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
