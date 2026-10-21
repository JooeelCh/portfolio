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
    "ale-construcciones": {
      title: "Aleconstrucciones Institutional Website",
      description:
        "Institutional website showcasing services, projects, and brand identity, monitored and updated from its own administration panel.",
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
