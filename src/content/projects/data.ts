import type { ProjectShared } from "./schema";

export const projectsShared = [
  {
    slug: "ale-construcciones",
    image: "/projects/aleconstrucciones.avif",
    tech: ["nextjs", "typescript", "tailwind", "postgresql", { name: "Strapi" }],
    liveUrl: "https://www.aleconstrucciones.com.ar/",
  },

  {
    slug: "mock-whatsapp-bot",
    tech: ["python", "fastapi", "docker", "n8n", { name: "Twilio" }],
    repoUrl: "https://github.com/username/whatsapp-bot-demo",
  },

  {
    slug: "mock-dashboard",
    image: "/projects/mock-dashboard.svg",
    tech: ["react", "typescript", "nodejs", "express", "mysql", "figma"],
    liveUrl: "https://example.com",
  },

  {
    slug: "mock-inventory",
    image: "/projects/mock-inventory.svg",
    tech: ["nextjs", "tailwind", "postgresql", { name: "Supabase" }, { name: "Vercel" }],
    repoUrl: "https://github.com/username/inventory-demo",
    liveUrl: "https://example.com",
  },
] as const satisfies readonly ProjectShared[];

export type ProjectSlug = (typeof projectsShared)[number]["slug"];
