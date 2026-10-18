import Image from "next/image";
import { Globe } from "lucide-react";
import { siGithub } from "simple-icons";
import { useTranslations } from "next-intl";
import type { Project } from "@/content/projects";

const iconButtonClass =
  "grid size-10 place-items-center rounded-lg bg-secondary/80 text-text " +
  "transition-transform hover:-translate-y-0.5 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={siGithub.path} />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const { title, description, tech, image, repoUrl, liveUrl } = project;

  return (
    <article className="grid gap-2.5 lg:grid-cols-[36fr_64fr]">
      {/* Info (angosta). En mobile va debajo de la imagen. */}
      <div className="order-2 flex flex-col rounded-[0_0_2rem_2rem] bg-gradient-to-b from-[color-mix(in_oklab,var(--secondary)_22%,transparent)] to-transparent p-6 sm:p-8 lg:order-1 lg:rounded-[2rem_0_0_2rem]">
        <h3 className="font-display text-2xl uppercase leading-tight text-text">{title}</h3>
        <p className="mt-5 font-mono text-[15px] leading-relaxed text-text">{description}</p>

        <div className="mt-auto flex flex-col gap-6 pt-8">
          <ul aria-label={t("techLabel")} className="flex flex-wrap gap-2.5">
            {tech.map((name) => (
              <li
                key={name}
                className="rounded-full bg-secondary/70 px-4 py-0.5 font-mono text-xs text-text"
              >
                {name}
              </li>
            ))}
          </ul>

          {(repoUrl || liveUrl) && (
            <div className="flex justify-end gap-2.5">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewRepo", { title })}
                  className={iconButtonClass}
                >
                  <GithubIcon className="size-5" />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewSite", { title })}
                  className={iconButtonClass}
                >
                  <Globe className="size-5" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Frame de la demo: 3:2 para capturas de escritorio, ancladas arriba. */}
      <div className="relative order-1 aspect-3/2 overflow-hidden rounded-[2rem_2rem_0_0] lg:order-2 lg:rounded-[0_2rem_2rem_0]">
        {image ? (
          <Image
            src={image}
            alt={t("imageAlt", { title })}
            fill
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="object-cover object-top"
            // next/image no optimiza SVG; los placeholders del mockup son SVG.
            unoptimized={image.endsWith(".svg")}
          />
        ) : (
          <div className="grid size-full place-items-center bg-linear-to from-secondary/30 to-transparent p-8 text-center">
            <p className="font-display text-3xl uppercase text-text/70">{t("noPreview")}</p>
          </div>
        )}
      </div>
    </article>
  );
}
