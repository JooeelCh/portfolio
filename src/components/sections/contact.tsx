import { useTranslations } from "next-intl";

import { socialLinks } from "@/content/socials";
import { ContactForm } from "../layout/contactform";
import { Reveal } from "../layout/reveal";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="glow-bottom flex min-h-dvh w-full flex-col px-6 pt-28 pb-[calc(var(--footer-overlap,0px)+2rem)] md:px-12 md:pt-36"
    >
      <div className="section-container flex flex-1 flex-col">
        <h2 id="contact-title" className="text-4xl sm:text-5xl lg:text-6xl">
          {t("title")}
        </h2>

        <div className="flex flex-1 items-center py-8">
          <div className="grid w-full gap-10 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-20">
            <Reveal className="flex flex-col gap-6">
              <h3 className="text-2xl uppercase sm:text-3xl lg:text-4xl">
                {t("heading")}
              </h3>
              <div className="flex max-w-prose flex-col gap-5 font-heading text-sm leading-relaxed md:text-base lg:max-w-[44ch]">
                <p>{t("intro")}</p>
                <p>{t("cta")}</p>
              </div>

              <ul className="mt-2 flex gap-4">
                {socialLinks.map(({ id, href, Icon, external }) => (
                  <li key={id}>
                    <a
                      href={href}
                      aria-label={t(`socials.${id}`)}
                      title={t(`socials.${id}`)}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex size-11 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-secondary/80 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                    >
                      <Icon aria-hidden className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}