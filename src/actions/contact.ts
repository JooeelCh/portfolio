"use server";

import { Resend } from "resend";
import { REASON_TAGS, contactSchema } from "@/lib/schemas/contact";
import { getServerEnv } from "@/lib/env";

/**
 * La action devuelve CÓDIGOS, no textos: el cliente los traduce
 * al idioma activo (Contact.toast.error.<code>).
 */
export type ContactResult =
  | { ok: true }
  | { ok: false; code: "validation" | "send_failed" | "unknown" };

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendContactMessage(
  input: unknown,
): Promise<ContactResult> {
  // 1) Honeypot: si viene lleno es un bot. Éxito falso y sin enviar nada.
  if (
    typeof input === "object" &&
    input !== null &&
    "website" in input &&
    typeof input.website === "string" &&
    input.website.trim() !== ""
  ) {
    return { ok: true };
  }

  // 2) Revalidación en el servidor con el mismo schema del cliente.
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: "validation" };
  }

  const { name, email, reason, subject, message } = parsed.data;

  try {
    // El SDK de Node devuelve { data, error } y no lanza en errores de la API.
    const env = getServerEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[${REASON_TAGS[reason]}] ${oneLine(subject)} — ${oneLine(name)}`,
      text: [
        `Nombre: ${oneLine(name)}`,
        `Correo: ${email}`,
        `Motivo: ${REASON_TAGS[reason]}`,
        `Asunto: ${oneLine(subject)}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rechazó el envío:", error);
      return { ok: false, code: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] Error inesperado al enviar:", err);
    return { ok: false, code: "unknown" };
  }
}
