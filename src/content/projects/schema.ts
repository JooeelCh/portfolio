import { z } from "zod";
import { techById, techIds, type TechId } from "@/content/stack";

/** Un id del Stack (tipado) o una tech puntual fuera del Stack (solo texto). */
export type ProjectTech = TechId | { name: string };

/** Campos que NO cambian por idioma. */
export type ProjectShared = {
  slug: string;
  tech: readonly ProjectTech[];
  /** Ruta bajo /public/projects/. Opcional: sin imagen se muestra un fallback. */
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
};

/** Campos traducibles. */
export type ProjectCopy = {
  title: string;
  description: string;
};

const techSchema = z.union([
  z.enum(techIds),
  z.object({ name: z.string().min(1) }),
]);

/**
 * Valida el proyecto ya fusionado (shared + copy del idioma) y resuelve
 * `tech` a nombres listos para renderizar. Corre en build (SSG): si algo
 * está mal, `next build` falla en vez de romper en producción.
 */
export const projectSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1).max(60),
    // El límite protege el layout de la columna angosta (versión 1).
    description: z.string().min(1).max(260),
    image: z.string().startsWith("/projects/").optional(),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    tech: z.array(techSchema).min(1).max(8),
  })
  .transform((p) => ({
    ...p,
    tech: p.tech.map((t) => (typeof t === "string" ? techById[t].name : t.name)),
  }));

export type Project = z.output<typeof projectSchema>;
