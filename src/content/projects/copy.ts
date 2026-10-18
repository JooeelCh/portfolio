import type { ProjectSlug } from "./data";
import type { ProjectCopy } from "./schema";

export type ContentLocale = "es" | "en";

/**
 * Textos por idioma. `Record<ProjectSlug, …>` hace que TypeScript marque error
 * si agregás un proyecto en data.ts y te olvidás de traducirlo.
 * Máximo 260 caracteres por descripción (lo valida Zod).
 */
export const projectsCopy: Record<ContentLocale, Record<ProjectSlug, ProjectCopy>> = {
  es: {
    "mock-ecommerce": {
      title: "Tienda online demo",
      description:
        "Tienda con catálogo, carrito y checkout pensada para pequeños comercios. Se genera de forma estática para cargar rápido y permite actualizar productos sin tocar código.",
    },
    "mock-whatsapp-bot": {
      title: "Bot de atención por WhatsApp",
      description:
        "Asistente que califica consultas, responde preguntas frecuentes y deriva a una persona cuando hace falta. Automatiza el primer contacto con clientes y registra cada lead.",
    },
    "mock-dashboard": {
      title: "Panel de gestión",
      description:
        "Panel para seguir proyectos, tareas y aprobaciones entre equipos. Incluye roles con permisos, filtros guardados, notificaciones y una vista de estado en tiempo real para que cada área vea solo lo que le corresponde.",
    },
    "mock-inventory": {
      title: "Catálogo e inventario",
      description:
        "Catálogo público con consultas de clientes y panel admin para controlar stock y precios. Una plantilla reutilizable que se adapta a cada negocio.",
    },
  },
  en: {
    "mock-ecommerce": {
      title: "Demo online store",
      description:
        "Store with catalog, cart and checkout built for small businesses. It's statically generated for fast loads and lets owners update products without touching code.",
    },
    "mock-whatsapp-bot": {
      title: "WhatsApp support bot",
      description:
        "Assistant that qualifies inquiries, answers common questions and hands off to a person when needed. It automates first contact with customers and logs every lead.",
    },
    "mock-dashboard": {
      title: "Management dashboard",
      description:
        "Dashboard to track projects, tasks and approvals across teams. It includes permission-based roles, saved filters, notifications and a real-time status view so each area sees only what is relevant to it.",
    },
    "mock-inventory": {
      title: "Catalog & inventory",
      description:
        "Public catalog with customer inquiries and an admin panel to control stock and prices. A reusable template that adapts to each business.",
    },
  },
};
