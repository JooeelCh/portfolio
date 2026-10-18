import type { Variants } from "motion/react";

/** Contenedor de las 3 cards: las hace entrar una tras otra. */
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Card: entra y luego dispara el stagger de sus tiles. */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delayChildren: 0.15,
      staggerChildren: 0.05,
    },
  },
};

/** Tile individual (también lo usan los tiles de "aprendiendo"). */
export const tileVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/** Lista de tiles "aprendiendo": stagger propio al abrir el toggle. */
export const learningListVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.05 } },
};
