// components/projects/ProjectMenu.tsx
import type { Project } from "../../types/Project";
import ProjectMenuItem from "./ProjectMenuItem";

interface Props {
  projects: Project[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function ProjectMenu({ projects, activeId, onSelect }: Props) {
  return (
    <aside className="flex flex-col items-start justify-center w-1/12 lg:w-1/12">
      {projects.map((p) => (
        <ProjectMenuItem
          key={p.id}
          project={p}
          active={p.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </aside>
  );
}
