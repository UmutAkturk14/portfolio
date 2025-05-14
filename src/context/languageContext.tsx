// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import translations from "../config/translations.json"; // Import translations directly

type Language = "en" | "fr" | "de" | "es" | "tr";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, any>; // Store translations globally
}>({
  language: "en",
  setLanguage: () => {},
  translations: translations, // Set initial translations
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [currentTranslations, setCurrentTranslations] = useState(translations); // Load translations only once

  useEffect(() => {
    // Here, you can dynamically load translations if needed (e.g., from an API or a file)
    // This is where you'd make an async call to fetch translations if not static
  }, []); // Empty dependency array ensures it runs once

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations: currentTranslations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
