import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 👈 You can replace with your icons
import { useLanguage } from "../../context/languageContext";
import ProjectMenu from "./ProjectMenu";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../types/Project";
import "../sectionComponents/customStyles.css";

export default function ProjectsCarousel() {
  const { language, translations } = useLanguage();
  const projects: Project[] = useMemo(
    () => translations[language].projects ?? [],
    [language, translations]
  );

  const [active, setActive] = useState<string>(projects[0]?.id ?? "");
  useEffect(() => {
    if (projects.length) setActive(projects[0].id);
  }, [projects]);

  const current = useMemo(
    () => projects.find((p) => p.id === active),
    [active, projects]
  );

  const handleNext = () => {
    const currentIndex = projects.findIndex((p) => p.id === active);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActive(projects[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = projects.findIndex((p) => p.id === active);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActive(projects[prevIndex].id);
  };

  const portfolioTitle = {
    en: "Project Showcase",
    fr: "Vitrine de Projets",
    es: "Exposición de Proyectos",
    de: "Projektpräsentation",
    tr: "Projeler",
  }[language];

  return (
    <>
      <div className="w-full flex justify-center" id="projects">
        <div className="border-1 border-gray-100 dark:border-gray-800 w-1/3"></div>
      </div>
      <div className="relative mx-auto flex w-full min-h-[100svh]">
        {/* ⬅️ Prev / Next Buttons */}
        <div className="absolute top-4 right-4 lg:hidden flex gap-2 z-20">
          {projects.length > 1 && (
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              </button>
            </div>
          )}
        </div>

        <ProjectMenu
          projects={projects}
          activeId={active}
          onSelect={setActive}
        />

        <section className="relative flex-col flex-1 flex items-center justify-around sm:mt-0">
          <h1 className="font-heading text-3xl mb-20 text-primary">
            {portfolioTitle}
          </h1>
          {current && <ProjectCard project={current} />}
        </section>
      </div>
    </>
  );
}
