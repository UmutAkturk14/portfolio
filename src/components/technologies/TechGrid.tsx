import { useLanguage } from "../../context/languageContext";
import { useEffect, useState } from "react";
import Technology from "./Technology"; // ⬅️ new import
import "../sectionComponents/customStyles.css";

const TechGrid = () => {
  // debugger;
  const { language, translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const { title, stack } = translations.techStack ?? {};

  type Tech = {
    name: string;
    description: string;
    icon: string;
  };

  const techStack: Tech[] = stack ?? {};

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, [language]);

  return (
    <div
      className="overflow-x-auto no-scrollbar py-8 flex justify-center items-center flex-col"
      id="tech"
    >
      <h1
        className={`text-center font-heading mt-12 text-4xl my-6 text-black dark:text-white transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mx-1 sm:px-8 items-center">
        {Object.values(techStack).map(({ name, description, icon }, idx) => (
          <Technology
            key={name}
            name={name}
            description={description}
            icon={icon}
            delay={idx * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default TechGrid;
