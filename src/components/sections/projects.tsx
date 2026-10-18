import { getLocale, getTranslations } from "next-intl/server";
import { getProjects } from "@/content/projects";
import { ProjectsCarousel } from "../layout/projectscarousel";

export async function Projects() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("Projects")]);
  const projects = getProjects(locale);

  return (
    // id="projects": lo usa el scroll spy del Navbar.
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="glow-bottom flex min-h-dvh w-full flex-col px-6 pb-16 pt-28 md:px-12"
    >
      <div className="section-container flex flex-1 flex-col gap-8">  
        <h2
          id="projects-title"
          className="text-4xl md:text-6xl"
        >
          {t("title")}
        </h2>
        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
}
