// components/projects/ProjectCard.tsx
import type { Project } from "../../types/Project";
import StackIconGrid from "./StackIconGrid";
import TagPill from "./TagPill";
import ProjectLinks from "./ProjectLinks";
import "../sectionComponents/customStyles.css";
import SVGElement from "../../utils/svgEngine";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article
      key={project.id}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 animate-[slidein_0.75s_ease-out_forwards]"
    >
      <div className="h-36 w-36 flex justify-center items-center">
        <SVGElement
          title="quokka"
          className="h-24 w-24 mb-4 bg-none dark:fill-white"
        />
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: project.color }}>
        {project.title}
      </h1>
      <p className="max-w-[70%] text-primary">{project.text}</p>

      {project.stack && <StackIconGrid stack={project.stack} />}

      {project.tags && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {project.tags.map((tag, idx) => (
            <TagPill key={tag} tag={tag} delay={idx * 0.1} />
          ))}
        </div>
      )}

      {project.links && <ProjectLinks links={project.links} />}
    </article>
  );
}
