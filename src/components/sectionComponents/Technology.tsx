import React from "react";
import Tooltip from "./Tooltip"; // ⬅️ new import

interface TechnologyProps {
  name: string;
  description: string;
  icon: string;
  delay: number;
}

const Technology: React.FC<TechnologyProps> = ({
  name,
  description,
  icon,
  delay,
}) => {
  const animationDuration = `${0.9 + Math.random() * 0.3}s`;

  return (
    <Tooltip content={description} delayShow={500} position="top">
      <div
        className="tech-card flex-shrink-0 flex flex-col justify-center items-center h-50 w-50 sm:w-60 select-none my-4 float-anim"
        style={{
          animation: `float ${animationDuration} ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
        aria-label={`${name} technology logo with description`}
      >
        <div className="w-28 h-28 mt-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-md transition-all duration-300">
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-18 h-18 object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h4 className="mt-3 font-semibold text-primary dark:text-primary-contrast text-center">
            {name}
          </h4>
        </div>
      </div>
    </Tooltip>
  );
};

export default Technology;
