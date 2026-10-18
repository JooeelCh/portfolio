import "server-only";
import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";

type ContactEmailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  reason?: string;
};

export async function sendContactEmail(input: ContactEmailInput) {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: [env.CONTACT_TO_EMAIL],
    replyTo: input.email,
    subject: `[Portfolio] ${input.subject}`,
    text: [
      `Nombre: ${input.name}`,
      `Correo: ${input.email}`,
      input.reason ? `Motivo: ${input.reason}` : null,
      "",
      input.message,
    ]
      .filter((l) => l !== null)
      .join("\n"),
  });

  if (error) return { ok: false as const, error };
  return { ok: true as const, id: data?.id };
}