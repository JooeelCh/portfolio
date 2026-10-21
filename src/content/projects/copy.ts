import type { ProjectSlug } from "./data";
import type { ProjectCopy } from "./schema";

export type ContentLocale = "es" | "en";

export const projectsCopy: Record<ContentLocale, Record<ProjectSlug, ProjectCopy>> = {
  es: {
    "ale-construcciones": {
      title: "Web Institucional Aleconstrucciones",
      description:
        "Sitio web institucional con muestra de servicios, proyectos e identidad de la marca, monitoreado y actualizado desde un panel de administracion propio.",
    },
  },
  en: {
    "ale-construcciones": {
      title: "Aleconstrucciones Institutional Website",
      description:
        "Institutional website showcasing services, projects, and brand identity, monitored and updated from its own administration panel.",
    },
  },
};
