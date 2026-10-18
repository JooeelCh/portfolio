import "server-only";
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "Falta RESEND_API_KEY"),
  CONTACT_TO_EMAIL: z.string().email("CONTACT_TO_EMAIL inválido"),
  // Acepta "email@dominio.com" o "Nombre <email@dominio.com>"
  CONTACT_FROM_EMAIL: z
    .string()
    .regex(/^(.+ <[^<>\s]+@[^<>\s]+>|[^<>\s]+@[^<>\s]+)$/, "CONTACT_FROM_EMAIL inválido"),
});

export type ServerEnv = z.infer<typeof envSchema>;

let cached: ServerEnv | undefined;

/** Se evalúa al llamarla (dentro de la action), no al importar: no rompe el build. */
export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
    throw new Error(`Variables de entorno inválidas → ${issues.join(" | ")}`);
  }
  cached = parsed.data;
  return cached;
}