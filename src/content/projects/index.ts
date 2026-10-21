import { projectsCopy, type ContentLocale } from "./copy";
import { projectsShared } from "./data";
import { projectSchema, type Project } from "./schema";

export type { Project };

export function getProjects(locale: string): Project[] {
  const lang: ContentLocale = locale === "en" ? "en" : "es";
  return projectsShared.map((shared) =>
    projectSchema.parse({ ...shared, ...projectsCopy[lang][shared.slug] }),
  );
}
