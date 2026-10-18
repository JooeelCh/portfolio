import * as z from "zod";

export const CONTACT_REASONS = ["project", "job", "other"] as const;
export type ContactReason = (typeof CONTACT_REASONS)[number];

/**
 * Etiquetas que se usan en el asunto del mail que recibes (siempre en español,
 * independientemente del idioma del sitio).
 */
export const REASON_TAGS: Record<ContactReason, string> = {
  project: "Proyecto freelance",
  job: "Oportunidad laboral",
  other: "Otro",
};

/**
 * Los mensajes de error son CLAVES del namespace "Contact.errors" de next-intl,
 * no textos. El cliente las traduce según el idioma activo.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(80, "nameMax"),
  email: z
    .string()
    .trim()
    .pipe(z.email("emailInvalid").max(254, "emailInvalid")),
  reason: z.enum(CONTACT_REASONS, { error: "reasonRequired" }),
  subject: z.string().trim().min(3, "subjectMin").max(120, "subjectMax"),
  message: z.string().trim().min(10, "messageMin").max(2000, "messageMax"),
  // Honeypot: NO se valida acá. Lo evalúa la action y responde con éxito falso.
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
