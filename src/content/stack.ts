import type { LucideIcon } from "lucide-react";
import { CodeXml, Database, Wrench } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { siNextdotjs, siHtml5, siCss, siTailwindcss, siReact, siTypescript, siJavascript, siAngular } from "simple-icons"
import { siPython, siNodedotjs, siCplusplus, siMysql, siPostgresql, siFastapi, siExpress }  from "simple-icons"
import { siCursor, siPostman, siFigma, siNotion, siGit, siDocker, siN8n } from "simple-icons"

/**
 * Solo hacen falta `title` y `path`. Si una marca no existe en Simple Icons
 * (ej. LinkedIn), se usa un SVG propio: { title: "X", path: "M0 0h24v24H0z" }
 * (path en viewBox 0 0 24 24).
 */
export type TechIcon = Pick<SimpleIcon, "title" | "path">;

export type TechItem = {
  id: string,
  name: string;
  icon: TechIcon;
  learning?: boolean;
};

export type StackCategoryId = "frontend" | "backend" | "tools";

export type StackCategory = {
  id: StackCategoryId;
  icon: LucideIcon;
  items: readonly TechItem[];
};


const frontend = [
  { id: "html", name: "HTML", icon: siHtml5, learning: false },
  { id: "css", name: "CSS", icon: siCss, learning: false},
  { id: "javascript", name: "Javascript", icon: siJavascript, learning: false},
  { id: "typescript", name: "Typescript", icon: siTypescript, learning: false},
  { id: "react", name: "React", icon: siReact, learning: false },
  { id: "tailwind", name: "Tailwind", icon: siTailwindcss, learning: false},
  { id: "nextjs", name: "Next.js", icon: siNextdotjs, learning: false },
  { id: "angular", name: "Angular", icon: siAngular, learning: true }
] as const satisfies readonly TechItem[];

const backend = [
  { id: "python", name: "Python", icon: siPython, learning: false},
  { id: "nodejs", name: "Node.js", icon: siNodedotjs, learning: false},
  { id: "express", name: "Express", icon: siExpress, learning: false },
  { id: "cpp", name: "C++", icon: siCplusplus, learning: false },
  { id: "mysql", name: "MySQL", icon: siMysql, learning: false },
  { id: "postgresql", name: "PostgreSQL", icon: siPostgresql, learning: false },
  { id: "fastapi", name: "FastAPI", icon: siFastapi, learning: true}
] as const satisfies readonly TechItem[];

const tools = [
  { id: "cursor", name: "Cursor", icon: siCursor, learning: false},
  { id: "postman", name: "Postman", icon: siPostman, learning: false},
  { id: "figma", name: "Figma", icon: siFigma, learning: false},
  { id: "notion", name: "Notion", icon: siNotion, learning: false},
  { id: "docker", name: "Docker", icon: siDocker, learning: false},
  { id: "git", name: "GIT", icon: siGit, learning: false},
  { id: "n8n", name: "n8n", icon: siN8n, learning: false}
] as const satisfies readonly TechItem[];

export const stackCategories: readonly StackCategory[] = [
  { id: "frontend", icon: CodeXml, items: frontend },
  { id: "backend", icon: Database, items:backend },
  { id: "tools", icon: Wrench, items: tools},
];

export type TechId = (typeof frontend | typeof backend | typeof tools)[number]["id"];

const allTech: readonly TechItem[] = [...frontend, ...backend, ...tools];

export const techIds = allTech.map((t) => t.id) as [TechId, ...TechId[]];

export const techById = Object.fromEntries(
  allTech.map((t) => [t.id, t]),
) as Record<TechId, TechItem>;