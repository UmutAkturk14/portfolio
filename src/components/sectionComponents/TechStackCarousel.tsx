import { useLanguage } from "../../context/languageContext";
import TechElement from "./TechElement";

type TechCategory = "front-end" | "back-end" | "tools";

type TechStackCarouselProps = {
  category: TechCategory;
};

const TechStackCarousel = ({ category }: TechStackCarouselProps) => {
  const { language, translations } = useLanguage();
  const stackData = translations[language]?.techStack?.[category] || {};

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 capitalize text-primary text-center">
        {category.replace("-", " ")}
      </h2>

      <div className="flex gap-6 overflow-x-auto px-2 py-4 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
        {Object.entries(stackData).map(([key, tech]) => (
          <TechElement
            key={key}
            name={tech.name}
            description={tech.description}
            icon={tech.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStackCarousel;
