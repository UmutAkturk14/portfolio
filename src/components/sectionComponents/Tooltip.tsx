// components/Tooltip.tsx
import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delayShow?: number;
  active?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  delayShow = 1000,
  active = false,
}) => {
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative group tech-card-tooltip" tabIndex={0}>
      {children}
      <div
        className={`
          absolute z-50 w-48 px-3 py-2 text-sm text-white
          transition-opacity duration-300
          group-hover:opacity-100
          opacity-0
          bg-black rounded shadow-lg pointer-events-none
          ${active ? "" : "hidden"}
          ${positionClasses[position]}
        `}
        style={{ transitionDelay: `${delayShow}ms` }}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
