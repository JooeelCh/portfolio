import { Terminal } from "lucide-react";
import { useTranslations } from "next-intl";
import { AboutTypewriter } from "@/components/layout/typewritter";

const ROWS = ["role", "education", "location", "focus", "openTo"] as const;

export function AboutProfileCard() {
  const t = useTranslations("About.card");

  const rows = ROWS.map((key) => ({
    key,
    label: t(`rows.${key}.label`),
    value: t(`rows.${key}.value`),
  }));

  return (
    <aside
      aria-label={t("title")}
      className="w-full rounded-2xl border border-secondary/30 bg-primary/10 p-6 font-text text-sm backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-secondary/30 pb-4 text-foreground/60">
        <p>{t("title")}</p>
        <a
          href="#projects"
          className="flex items-center gap-2 rounded-sm transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Terminal aria-hidden="true" size={18} />
          {t("cta")}
        </a>
      </div>

      <AboutTypewriter
        rows={rows}
        speed={80}
        className="mt-5 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-4"
      />
    </aside>
  );
}
