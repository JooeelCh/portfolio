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
  availability: "available",
  photo: "/images/hero-avatar.webp",
  cv: { es: "/cv/cv-es.pdf", en: "/cv/cv-en.pdf" },
  social: {
    github: "https://github.com/JooeelCh",
    linkedin: "https://www.linkedin.com/in/joel-chubrega-bb6110249/",
  },
}
