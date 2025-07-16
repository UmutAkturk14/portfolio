import { useMemo, useState } from "react";
import { useLanguage } from "../../context/languageContext";
import type { Project } from "../../types/Project";

const FILTERS = ["All", "Full Stack", "Front End", "Back End", "Open Source"];

export default function ProjectsSection() {
  const { language, translations } = useLanguage();

  const projects: Project[] = useMemo(
    () => translations[language].projects ?? [],
    [language, translations]
  );

  const [tagFilter, setTagFilter] = useState<string>("All");
  const [stackFilter, setStackFilter] = useState<string>("All");

  // Extract all unique stack tools from projects
  const stackOptions = useMemo(() => {
    const stackSet = new Set<string>();
    projects.forEach((project) => {
      project.stack?.forEach((tech) => {
        if (tech.tool) {
          stackSet.add(tech.tool);
        }
      });
    });
    return ["All", ...Array.from(stackSet).sort()];
  }, [projects]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag =
        tagFilter === "All" ||
        (Array.isArray(project.tags) &&
          project.tags
            .map((tag) => tag.toLowerCase())
            .includes(tagFilter.toLowerCase()));

      const matchesStack =
        stackFilter === "All" ||
        (project.stack &&
          project.stack.some(
            (tech) => tech.tool.toLowerCase() === stackFilter.toLowerCase()
          ));

      return matchesTag && matchesStack;
    });
  }, [tagFilter, stackFilter, projects]);

  const portfolioTitle = {
    en: "Project Showcase",
    fr: "Vitrine de Projets",
    es: "Exposición de Proyectos",
    de: "Projektpräsentation",
    tr: "Projeler",
  }[language];

  return (
    <section id="projects" className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
        {portfolioTitle}
      </h2>

      {/* Tag Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {FILTERS.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tagFilter === tag
                ? "bg-emerald-700 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-500"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <hr className="my-8 mx-auto w-2/3 border-t border-indigo-700 dark:border-amber-400 opacity-40 rounded-full" />

      {/* Stack Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {stackOptions.map((stack) => (
          <button
            key={stack}
            onClick={() => setStackFilter(stack)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              stackFilter === stack
                ? "bg-indigo-700 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-500"
            }`}
          >
            {stack}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`
              flex flex-col justify-between rounded-xl border-t-4 p-6 min-h-[60svh]
              transition duration-500 ease-in-out
              bg-white dark:bg-gray-900
              border-opacity-80
              hover:shadow-2xl hover:shadow-gray-400
            `}
            style={{
              borderColor: project.color,
            }}
          >
            {/* Top Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.date}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 min-h-48">
                {project.text}
              </p>

              {/* Tech Stack Icons */}
              <div className="min-h-36">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-4">
                  {project.stack?.map((tech) => (
                    <div
                      key={tech.tool}
                      className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg transition-transform duration-200 ease-out hover:scale-110 hover:shadow-lg group"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.tool}
                        className="w-8 h-8"
                      />

                      {/* Tooltip */}
                      <span
                        className="
                          pointer-events-none
                          absolute bottom-0 mb-1
                          left-1/2 transform -translate-x-1/2 translate-y-full
                          bg-gray-900 text-white text-xs rounded px-2 py-1
                          opacity-0 group-hover:opacity-100 transition-opacity duration-150
                          whitespace-nowrap
                        "
                      >
                        {tech.tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-800 dark:text-gray-300 mb-6">
                {project.subTechs.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Bottom Section - Links */}
            <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-gray-200 dark:border-gray-700">
              {project.links?.deployment && (
                <a
                  href={project.links.deployment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                >
                  {project.links.deployment.buttonTitle}
                </a>
              )}
              {project.links?.documentation && (
                <a
                  href={project.links.documentation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  {project.links.documentation.buttonTitle}
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {project.links.github.buttonTitle}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
