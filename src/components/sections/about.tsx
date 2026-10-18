import { useTranslations } from "next-intl";
import { AboutProfileCard } from "@/components/layout/about-profile-card";
import { Button } from "@/components/ui/button";

export function About() {
  const t = useTranslations("About");
  const paragraphs = [t("p1"), t("p2"), t("p3")];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="glow-top min-h-dvh scroll-mt-24 px-6 pt-28 pb-20 md:px-12"
    >
      <div className="section-container flex flex-col gap-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16">
          <div>
            <h2
              id="about-title"
              className="text-4xl leading-tight md:text-6xl"
            >
              {t("title")}
            </h2>

            <div className="mt-10 max-w-[90ch] space-y-6 text-base leading-relaxed md:text-lg">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          <AboutProfileCard />
        </div>

        <div className="rounded-3xl bg-linear-to-b from-secondary/20 to-transparent px-6 py-10 text-center md:px-12">
          <p className="mx-auto max-w-[120ch] font-heading text-sm leading-relaxed md:text-base">
            {t("cta.text")}
          </p>
          <Button className="mt-6">
            <a href="#contact">{t("cta.button")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
