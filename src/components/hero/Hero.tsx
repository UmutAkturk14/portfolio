import { useLanguage } from "../../context/languageContext";
import { useEffect, useState } from "react";
import AnimatedServices from "./AnimatedServices";

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
        <p className="font-heading text-4xl md:text-6xl lg:text-9xl text-primary">
          Umut Akturk
        </p>
        <p
          className={`smooth text-xl lg:text-3xl ease-in-out text-secondary ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </p>
        <AnimatedServices />
      </div>
    </>
  );
}

export default Hero;
