import { ArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { socialLinks } from "@/content/socials";
import { Link } from "@/i18n/navigation";


const NAV_IDS = ["about", "stack", "projects", "contact"] as const;
const muted = "text-[color-mix(in_oklab,var(--text)_70%,transparent)]";
const interactive =
  "transition-colors motion-reduce:transition-none hover:text-[var(--text)] " +
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navbar");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background/80 backdrop-blur-md px-6 py-4 md:px-12">
      <div
        className={`section-container flex flex-col items-center gap-6 font-mono text-sm md:grid md:grid-cols-3 md:gap-4 ${muted}`}
      >
        <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
          <p>{t("copyright", { year })}</p>
        </div>

        <nav aria-label={t("navLabel")} className="md:justify-self-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <Link href={`/#${id}`} className={interactive}>
                  {tNav(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:justify-self-end">
          <ul aria-label={t("socialLabel")} className="flex items-center gap-1">
            {socialLinks.map(({ id, href, Icon, external }) => (
              <li key={id}>
                <a
                  href={href}
                  aria-label={t(`social.${id}`)}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`inline-flex size-9 items-center justify-center ${interactive}`}
                >
                  <Icon aria-hidden className="size-5" />
                </a>
              </li>
            ))}
          </ul>

          <span
            aria-hidden
            className="h-5 w-px bg-[color-mix(in_oklab,var(--text)_20%,transparent)]"
          />

          <Link
            href="/#hero"
            className={`inline-flex items-center gap-2 px-1 py-2 ${interactive}`}
          >
            <ArrowUp aria-hidden className="size-4" />
            <span className="hidden sm:inline">{t("backToTop")}</span>
            <span className="sr-only sm:hidden">{t("backToTop")}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
