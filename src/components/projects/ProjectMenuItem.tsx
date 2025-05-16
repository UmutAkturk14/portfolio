// components/projects/ProjectMenuItem.tsx
import type { Project } from "../../types/Project";
import SVGElement from "../../utils/svgEngine";
import type { IconKey } from "../../utils/svgEngine";

interface Props {
  project: Project;
  active: boolean;
  onSelect: (id: string) => void;
}

export default function ProjectMenuItem({ project, active, onSelect }: Props) {
  const { id, color, title } = project;
  return (
    <button
      onClick={() => onSelect(id)}
      aria-current={active ? "true" : undefined}
      className={`relative px-8 md:px-12 lg:px-24 py-3 w-full text-left transition-opacity duration-300 ${
        active ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-75"
      }`}
      style={
        active ? { color: color, borderRight: `4px solid ${color}` } : undefined
      }
    >
      <div>
        <SVGElement
          title={id as IconKey}
          className="absolute left-4 top-1/2 dark:fill-white -translate-y-1/2 h-10 w-10 bg-center bg-no-repeat bg-[length:75%_75%]"
        />
        <span className="ml-2 text-primary hidden lg:flex">{title}</span>
      </div>
    </button>
  );
}
