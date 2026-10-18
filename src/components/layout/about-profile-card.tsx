import { useTranslations } from "next-intl";

const ROWS = ["role", "education", "location", "focus", "openTo"] as const;

/**
 * Card "whoami": datos clave escaneables para recruiters y clientes.
 * Es contenido real (dl semántico), no decoración, y todo el texto sale
 * de messages/{es,en}.json bajo "About.card".
 */
export function AboutProfileCard() {
  const t = useTranslations("About.card");

  return (
    <aside
      aria-label={t("title")}
      className="w-full rounded-2xl border border-secondary/30 bg-primary/10 p-6 font-mono text-sm backdrop-blur-sm"
    >
      <p className="border-b border-secondary/30 pb-4 text-foreground/60">
        {t("title")}
      </p>

      <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-4">
        {ROWS.map((key) => (
          <div key={key} className="contents">
            <dt className="text-foreground/60">{t(`rows.${key}.label`)}</dt>
            <dd>{t(`rows.${key}.value`)}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
