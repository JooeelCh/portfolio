import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons"
import { heroContent } from "@/content/hero"

// Server Component: sin JS de cliente. Las animaciones de entrada son CSS puro.
// El id="hero" es el que espera useActiveSection (scroll spy del navbar).
export async function Hero() {
  const t = await getTranslations("Hero")
  const locale = await getLocale()
  const cvHref = heroContent.cv[locale === "en" ? "en" : "es"]
  const isAvailable = heroContent.availability === "available"

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="hero glow-bottom flex min-h-dvh items-center overflow-hidden px-6 md:px-12"
    >
      <div className="section-container relative z-10 grid items-center gap-10 pt-28 pb-16 lg:grid-cols-2 lg:gap-8 lg:pt-24">
        {/* Texto: en mobile va debajo de la foto */}
        <div className="order-2 flex flex-col items-start gap-3 lg:order-1">
          <span className="hero-badge hero-mono hero-reveal hero-d1">
            {isAvailable ? t("availability.available") : t("availability.busy")}
          </span>

          <h1
            id="hero-title"
            className="hero-reveal hero-d2 text-4xl leading-none sm:text-5xl lg:text-6xl"
          >
            {heroContent.name}
          </h1>

          <p className="hero-reveal hero-d3 text-sm sm:text-base">
            {t("role")}
          </p>

          <div className="hero-reveal hero-d4 mt-5 flex flex-wrap items-center gap-3">
            <a href={cvHref} download className="hero-btn">
              {t("cv")}
            </a>
            <a href="#contact" className="hero-btn">
              {t("contact")}
            </a>
            <a
              href={heroContent.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("githubLabel")}
              className="hero-btn hero-btn-icon"
            >
              <GithubIcon className="size-6" />
            </a>
            <a
              href={heroContent.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("linkedinLabel")}
              className="hero-btn hero-btn-icon"
            >
              <LinkedinIcon className="size-6" />
            </a>
          </div>
        </div>

        {/* Foto: es el LCP, por eso priority y sin animar opacidad */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="hero-photo relative aspect-square w-[min(70vw,20rem)] overflow-hidden rounded-full lg:w-full lg:max-w-xl">
            <Image
              src={heroContent.photo}
              alt={t("photoAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 576px, 70vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
