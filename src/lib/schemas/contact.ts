import * as z from "zod";

export const CONTACT_REASONS = ["project", "job", "other"] as const;
export type ContactReason = (typeof CONTACT_REASONS)[number];

export const REASON_TAGS: Record<ContactReason, string> = {
  project: "Proyecto freelance",
  job: "Oportunidad laboral",
  other: "Otro",
};

export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(80, "nameMax"),
  email: z
    .string()
    .trim()
    .pipe(z.email("emailInvalid").max(254, "emailInvalid")),
  reason: z.enum(CONTACT_REASONS, { error: "reasonRequired" }),
  subject: z.string().trim().min(3, "subjectMin").max(120, "subjectMax"),
  message: z.string().trim().min(10, "messageMin").max(2000, "messageMax"),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
