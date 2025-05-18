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
    <div className="lg:flex absolute h-full hidden z-20 cursor-none">
      <aside className="flex flex-col items-center justify-center h-full">
        {projects.map((p) => (
          <ProjectMenuItem
            key={p.id}
            project={p}
            active={p.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </aside>
    </div>
  );
}
