import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

// TODO: apuntar este import a donde tengas los SVG de GitHub/LinkedIn del Hero.
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { socialLinks, type SocialId } from "@/content/socials";
import { ContactForm } from "../layout/contactform";
import { Reveal } from "../layout/reveal";

const socialIcons: Record<SocialId, React.ComponentType<{ className?: string }>> =
  {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    email: Mail,
  };

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="glow-bottom flex min-h-dvh w-full flex-col px-6 pt-28 pb-20 md:px-12 md:pt-36"
    >
      <div className="section-container">
        <h2 id="contact-title" className="text-5xl md:text-6xl">
          {t("title")}
        </h2>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal className="flex flex-col gap-6">
            <h3 className="text-3xl uppercase md:text-4xl">
              {t("heading")}
            </h3>
            <div className="flex max-w-[44ch] flex-col gap-5 font-heading text-sm leading-relaxed md:text-base">
              <p>{t("intro")}</p>
              <p>{t("cta")}</p>
            </div>

            <ul className="mt-2 flex gap-4">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.id];
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-label={t(`socials.${link.id}`)}
                      title={t(`socials.${link.id}`)}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors hover:bg-secondary/80 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
      </div>

      </div>
    </section>
  );
}
