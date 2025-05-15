import { useLanguage } from "../../context/languageContext";
import { useEffect, useState } from "react";
import "./customStyles.css";

const Carousel = () => {
  const { language, translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const { title, stack } = translations[language].techStack ?? {};

  const techStack: Record<
    string,
    { name: string; description: string; icon: string }
  > = stack ?? {};

  const techClasses =
    "flex-shrink-0 flex flex-col justify-between items-center h-70 xl:h-80 w-50 sm:w-60 select-none border-2 hover:border-gray-400 border-gray-200 dark:border-gray-800 rounded-3xl hover:bg-gradient-to-br hover:dark:from-gray-800 hover:dark:via-gray-950 hover:dark:to-gray-900";

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, [language]);

  return (
    <>
      <div className="overflow-x-auto no-scrollbar py-8">
        <h1
          className={`text-center font-heading text-4xl my-6 text-black dark:text-white transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mx-1 sm:px-8 items-center">
          {Object.values(techStack).map(({ name, description, icon }, idx) => {
            const animationDuration = `${0.9 + Math.random() * 0.3}s`;

            return (
              <div
                key={name}
                className={`${techClasses} my-4 float-anim`}
                style={{
                  animation: `float ${animationDuration} ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`,
                }}
                tabIndex={0}
                aria-label={`${name} technology logo with description`}
              >
                <div className="w-26 h-26 mt-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-md hover:animate-pulse transition-all duration-300">
                  <img
                    src={icon}
                    alt={`${name} icon`}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <h4 className="mt-3 font-semibold text-primary dark:text-primary-contrast text-center">
                    {name}
                  </h4>
                  <p
                    className={`mt-1 text-xs text-secondary dark:text-gray-400 text-center p-4 min-h-28 transition-opacity duration-500 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;
