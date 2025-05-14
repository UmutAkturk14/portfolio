import { CallToActionButton } from "../ui/CallToActionButton";
import { Download, Folder, BriefcaseBusiness } from "lucide-react";
import { useLanguage } from "../../context/languageContext";
import { useState, useEffect } from "react";

const HeroCallToActions = () => {
  const { language, translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 200); // fade duration
    return () => clearTimeout(timeout);
  }, [language]);

  const buttonLabels = translations[language]?.buttons || {};
  const { viewProjects, cv, hireMe } = buttonLabels;

  return (
    <div
      className={`xl:-mt-16 -mt-24 w-full flex justify-center gap-4 md:gap-12 xl:gap-24 smooth ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <CallToActionButton
        label={viewProjects || "Visit Projects"}
        href="#projects"
        icon={Folder}
      />
      <CallToActionButton
        label={cv || "Download CV"}
        href="/cv.pdf"
        icon={Download}
      />
      <CallToActionButton
        label={hireMe || "See the Code"}
        href="https://github.com/your-repo"
        icon={BriefcaseBusiness}
      />
    </div>
  );
};

export default HeroCallToActions;
