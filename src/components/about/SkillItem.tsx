import { useState } from "react";
import "./skillDots.css"; /* <- keyframes live here */

type SkillItemProps = {
  name: string;
  level: number; // 1-5
};

export default function SkillItem({ name, level }: SkillItemProps) {
  const [burstAt, setBurstAt] = useState<number | null>(null);

  const handleClick = (idx: number) => setBurstAt(idx);

  return (
    <div className="flex items-center justify-between w-60">
      <div className="w-full">
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          {name}
        </span>
      </div>
      <div className="w-full">
        <div className="flex gap-1.5 w-full">
          {Array.from({ length: 5 }).map((_, i) => {
            const filled = i < level;
            return (
              <div
                key={i}
                onClick={() => handleClick(i)}
                className={[
                  "relative w-4 h-4 rounded-full transition-transform",
                  filled
                    ? "dot-filled after:content-['']"
                    : "bg-gray-300 dark:bg-gray-600 hidden",
                  /* initial staggered scale+fade */
                  `animate-[dotIn_0.4s_ease_${i * 100}ms_forwards]`,
                  /* glow pulse on hover */
                  filled && "hover:animate-pulse",
                  /* starburst */
                  burstAt === i && "animate-burst",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
