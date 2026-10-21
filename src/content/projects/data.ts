import type { ProjectShared } from "./schema";

export const projectsShared = [
  {
    slug: "ale-construcciones",
    image: "/projects/aleconstrucciones.avif",
    tech: ["nextjs", "typescript", "tailwind", "postgresql", { name: "Strapi" }],
    liveUrl: "https://www.aleconstrucciones.com.ar/",
  },
] as const satisfies readonly ProjectShared[];

export type ProjectSlug = (typeof projectsShared)[number]["slug"];
