import { CallToActionButton } from "../ui/CallToActionButton";
import { Download, BriefcaseBusiness } from "lucide-react";
import { useLanguage } from "../../context/languageContext";
import { useState, useEffect } from "react";
import FloatingNavButton from "../ui/FloatingNavButton";

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
  const { cv, hireMe } = buttonLabels;

  return (
    <div
      className={`-mt-20 md:-mt-30 p-0.5 w-full flex justify-center gap-4 md:gap-12 xl:gap-24 smooth ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <FloatingNavButton />

      <CallToActionButton
        label={cv || "Download CV"}
        href="https://lavender-babs-22.tiiny.site/"
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
