// components/projects/ProjectMenuItem.tsx
import type { Project } from "../../types/Project";
import iconMap from "../../types/Icons";

interface Props {
  project: Project;
  active: boolean;
  onSelect: (id: string) => void;
}

export default function ProjectMenuItem({ project, active, onSelect }: Props) {
  const { id, color, title } = project;
  const IconComponent = iconMap[id];

  return (
    <button
      onClick={() => onSelect(id)}
      aria-current={active ? "true" : undefined}
      className={`relative pr-4 md:px-12 xl:px-18  py-3 w-full text-left transition-opacity duration-300 ${
        active
          ? "opacity-100 font-semibold active-menu-item"
          : "opacity-50 hover:opacity-75 menu-item"
      }`}
      style={
        active ? { color: color, borderLeft: `4px solid ${color}` } : undefined
      }
    >
      <div>
        <IconComponent className="absolute left-4 top-1/2 dark:fill-white -translate-y-1/2 h-8 w-8 bg-center bg-no-repeat bg-[length:75%_75%]" />
        <span className="ml-2 text-primary hidden lg:flex truncate">
          {title}
        </span>
      </div>
    </button>
  );
}
