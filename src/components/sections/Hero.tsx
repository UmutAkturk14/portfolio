import { useLanguage } from "../../context/languageContext";
import { useEffect, useState } from "react";
import AnimatedServices from "./AnimatedServices";
import HeroCallToActions from "./HeroCallToActions";

function Hero() {
  const { language, translations } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    // Start fade out
    setIsVisible(false);

    const timeout = setTimeout(() => {
      setText(translations[language]?.hero?.title || "");
      setIsVisible(true); // Trigger fade in
    }, 200); // match with transition duration

    return () => clearTimeout(timeout);
  }, [language, translations]);

  return (
    <>
      <div className="hero flex items-center justify-center min-h-[100svh] flex-col">
        <p className="font-heading text-4xl md:text-6xl lg:text-9xl dark:text-white">
          Umut Akturk
        </p>
        <p
          className={`transition-opacity text-xl lg:text-3xl duration-300 ease-in-out dark:text-white ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </p>
        <AnimatedServices />
      </div>
      <HeroCallToActions />
    </>
  );
}

export default Hero;
