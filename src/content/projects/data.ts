import type { ProjectShared } from "./schema";

/**
 * Datos de MOCKUP: reemplazalos por tus proyectos reales.
 * El orden del array es el orden del carrusel.
 * - `tech`: ids de stack.ts, o { name } para tecnologías fuera del Stack.
 * - `repoUrl` / `liveUrl`: opcionales; si faltan, el botón no se renderiza.
 * - `image`: opcional; si falta, se muestra un fallback.
 */
export const projectsShared = [
  {
    slug: "mock-ecommerce",
    image: "/projects/mock-ecommerce.svg",
    tech: ["nextjs", "typescript", "tailwind", "postgresql", { name: "Stripe" }],
    repoUrl: "https://github.com/username/ecommerce-demo",
    liveUrl: "https://example.com",
  },
  {
    // Sin imagen y sin sitio: prueba el fallback y un solo botón.
    slug: "mock-whatsapp-bot",
    tech: ["python", "fastapi", "docker", "n8n", { name: "Twilio" }],
    repoUrl: "https://github.com/username/whatsapp-bot-demo",
  },
  {
    // 6 tecnologías y solo sitio (repo privado): prueba el wrap de tags.
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
