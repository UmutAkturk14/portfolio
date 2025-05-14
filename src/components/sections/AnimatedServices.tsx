import { useEffect, useState } from "react";
import { useLanguage } from "../../context/languageContext";

function AnimatedServices() {
  const { language, translations } = useLanguage();
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const services = translations[language]?.hero?.services || [];
  const motto = translations[language]?.hero?.motto || "";

  // Handle cycling through services
  useEffect(() => {
    if (!services.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services]);

  // Handle fade in/out on language change
  useEffect(() => {
    setIsVisible(false);

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [language, translations]);

  return (
    <>
      <div
        className={`relative h-20 sm:h-20 xl:h-28 w-full dark:text-white mt-4 px-4 overflow-hidden text-lg sm:text-xl xl:text-4xl font-bold font-heading text-center transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {services.map((service: string, i: number) => (
          <span
            key={i}
            className={`absolute left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-md md:max-w-lg px-2 transition-all duration-700 ease-in-out text-center
    ${i === index ? "opacity-100 translate-y-6" : "opacity-0 translate-y-0"}
  `}
          >
            {service}
          </span>
        ))}
      </div>

      {motto && (
        <p
          className={`dark:text-white italic mt-2 text-center transition-opacity duration-300 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {motto}
        </p>
      )}
    </>
  );
}

export default AnimatedServices;
