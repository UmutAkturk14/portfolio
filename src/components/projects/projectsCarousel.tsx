// components/projects/ProjectsCarousel.tsx
import { useEffect, useMemo, useState } from "react";
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

  return (
    <>
      <div className="border-1 dark:border-gray-200 w-4/5 flex justify-self-center"></div>
      <div className="mx-auto my-12 flex w-full min-h-[100svh] overflow-hidden">
        <ProjectMenu
          projects={projects}
          activeId={active}
          onSelect={setActive}
        />

        <section className="relative flex-1 flex items-center justify-center">
          {current && <ProjectCard project={current} />}
        </section>
      </div>
    </>
  );
}
