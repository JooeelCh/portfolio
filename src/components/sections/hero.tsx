import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons"
import { heroContent } from "@/content/hero"
import { File, MessageCircle } from "lucide-react"

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
        <div className="order-2 flex flex-col items-start gap-3 lg:order-1">
          <span className="hero-badge hero-mono hero-reveal hero-d1 gap-2.5 px-4 py-1">
              <span aria-hidden="true" className="relative flex size-2.5">
                {isAvailable && (
                  <span className="absolute inset-0 rounded-full bg-status-available motion-safe:animate-status-pulse" />
                )}
                <span
                  className={
                    isAvailable
                      ? "relative size-2.5 rounded-full bg-status-available shadow-[0_0_8px_var(--status-available)]"
                      : "relative size-2.5 rounded-full bg-status-busy shadow-[0_0_8px_var(--status-busy)]"
                  }
                />
              </span>
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
            <a href={cvHref} download className="btn gap-1.5">
              <File  width={20} height={20}/>
              {t("cv")}
            </a>
            <a href="#contact" className="btn gap-1.5">
              <MessageCircle width={20} height={20} />
              {t("contact")}
            </a>
            <a
              href={heroContent.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("githubLabel")}
              className="btn btn-icon"
            >
              <GithubIcon className="size-6" />
            </a>
            <a
              href={heroContent.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("linkedinLabel")}
              className="btn btn-icon"
            >
              <LinkedinIcon className="size-6" />
            </a>
          </div>
        </div>

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
