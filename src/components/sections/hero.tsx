import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons"
import { heroContent } from "@/content/hero"
import { File, MessageCircle } from "lucide-react"

const ctaButton =
  "btn min-h-11 min-w-max flex-1 basis-[calc(50%_-_0.375rem)] gap-1.5 [--btn-px:0.75rem] [--btn-fs:0.85rem] sm:flex-none sm:basis-auto sm:[--btn-px:2.25rem] sm:[--btn-fs:0.95rem]"

const socialButton = "btn btn-icon [--btn-icon:2.75rem]"

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
      <div className="section-container relative z-10 grid items-center gap-10 pt-24 pb-12 lg:grid-cols-2 lg:gap-8 lg:pb-16">
        <div className="order-2 flex flex-col items-center gap-3 text-center lg:order-1 lg:items-start lg:text-left">
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
            className="hero-reveal hero-d2 text-4xl leading-none sm:text-5xl xl:text-6xl"
          >
            {heroContent.name}
          </h1>

          <p className="hero-reveal hero-d3 text-sm text-balance sm:text-base">
            {t("role")}
          </p>

          <div className="hero-reveal hero-d4 mt-5 flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto lg:justify-start">
            <a href={cvHref} download className={ctaButton}>
              <File className="size-4 sm:size-5" />
              {t("cv")}
            </a>
            <a href="#contact" className={ctaButton}>
              <MessageCircle className="size-4 sm:size-5" />
              {t("contact")}
            </a>
            <a
              href={heroContent.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("githubLabel")}
              className={socialButton}
            >
              <GithubIcon className="size-6" />
            </a>
            <a
              href={heroContent.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("linkedinLabel")}
              className={socialButton}
            >
              <LinkedinIcon className="size-6" />
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="hero-photo relative aspect-square w-[clamp(9rem,calc(100dvh_-_28.5rem),min(70vw,20rem))] overflow-hidden rounded-full lg:w-[clamp(16rem,calc(100dvh_-_10rem),min(100%,36rem))]">
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