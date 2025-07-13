// components/projects/StackIconGrid.tsx
import type { TechItem } from "../../types/Project";

interface Props {
  stack: TechItem[];
}

export default function StackIconGrid({ stack }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {stack.map(({ icon, tool }, idx) => (
        <div
          key={tool}
          className="tech-icon w-24 h-24
  flex items-center justify-center
  rounded-3xl
  border-3
  bg-gradient-to-br from-white to-gray-100
  dark:from-emerald-400 dark:to-gray-700
  border-gray-300 dark:border-emerald-500
  shadow-md dark:shadow-lg
  transition duration-300
  hover:scale-105
  hover:shadow-gray-700/30 dark:hover:shadow-emerald-500/50
  backdrop-blur-sm  "
          style={{ animationDelay: `${idx * 0.2}s` }}
        >
          <img
            src={icon}
            alt={tool}
            title={tool}
            className="h-14 w-14 object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
