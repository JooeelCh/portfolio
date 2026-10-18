export type Availability = "available" | "busy"

export type HeroContent = {
  name: string
  availability: Availability
  photo: string
  cv: { es: string; en: string }
  social: { github: string; linkedin: string }
}

export const heroContent: HeroContent = {
  name: "Joel Chubrega",
  // Cambiá a "busy" cuando no tomes proyectos: el badge se actualiza solo
  availability: "available",
  photo: "/images/hero-avatar.webp",
  cv: { es: "/cv/cv-es.pdf", en: "/cv/cv-en.pdf" },
  social: {
    // TODO: reemplazar por tus URLs reales
    github: "https://github.com/JooeelCh",
    linkedin: "https://www.linkedin.com/in/joel-chubrega-bb6110249/",
  },
}
