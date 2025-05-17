// components/projects/ProjectCard.tsx
import type { Project } from "../../types/Project";
import StackIconGrid from "./StackIconGrid";
import TagPill from "./TagPill";
import ProjectLinks from "./ProjectLinks";
import "../sectionComponents/customStyles.css";
import iconMap from "../../types/Icons";
import { CalendarDays } from "lucide-react";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const { id, title, text, stack, tags, links, subTechs, date } = project;
  const IconComponent = iconMap[project.id];

  return (
    <article
      key={id}
      className="inset-0 flex flex-col items-center justify-center text-center px-10 animate-[slidein_0.75s_ease-out_forwards]"
    >
      <div className="h-36 w-36 flex justify-center items-center">
        <IconComponent className="w-32 h-32 dark:fill-gray-200 dark:stroke-gray-200" />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-primary">{title}</h1>
      <h1 className="inline-flex my-4 items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-sm text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-gray-300 dark:ring-gray-700">
        <CalendarDays className="w-4 h-4 text-indigo-500 dark:text-indigo-300" />
        {date}
      </h1>

      <p className=" text-primary sm:w-2/3 md:2/1">{text}</p>

      {stack && <StackIconGrid stack={stack} />}

      {tags && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {tags.map((tag, idx) => (
            <TagPill key={tag} tag={tag} delay={idx * 0.1} />
          ))}
        </div>
      )}

      {subTechs && subTechs.length > 0 && (
        <div className="flex flex-wrap w-1/3 justify-center gap-2 mt-2 px-4">
          {subTechs.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200
 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {links && <ProjectLinks links={links} />}
    </article>
  );
}
