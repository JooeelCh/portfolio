import { z } from "zod";
import { techById, techIds, type TechId } from "@/content/stack";

export type ProjectTech = TechId | { name: string };
export type ProjectShared = {
  slug: string;
  tech: readonly ProjectTech[];
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type ProjectCopy = {
  title: string;
  description: string;
};

const techSchema = z.union([
  z.enum(techIds),
  z.object({ name: z.string().min(1) }),
]);

export const projectSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1).max(60),
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
