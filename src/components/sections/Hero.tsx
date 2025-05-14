import { useLanguage } from "../../context/languageContext";
import { useEffect, useState } from "react";

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
  }, [language]);

  return (
    <div className="hero flex items-center justify-center h-screen flex-col">
      <p className="font-heading text-6xl dark:text-white">Umut Akturk</p>
      <p
        className={`transition-opacity text-2xl duration-300 ease-in-out dark:text-white ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export default Hero;
