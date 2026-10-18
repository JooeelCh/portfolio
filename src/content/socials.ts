// TODO: reemplazar por tus URLs reales (o unificar con las del Hero si ya las tienes).
export const socialLinks = [
  { id: "github", href: "https://github.com/tu-usuario", external: true },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/tu-usuario",
    external: true,
  },
  { id: "email", href: "mailto:tu@correo.com", external: false },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];
