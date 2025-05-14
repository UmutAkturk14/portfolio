// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import translations from "../config/translations.json";

type Language = "en" | "fr" | "de" | "es" | "tr";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, any>;
}>({
  language: "en",
  setLanguage: () => {},
  translations: translations,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [currentTranslations] = useState(translations);

  // Get saved language from localStorage or fall back to browser language
  useEffect(() => {
    const savedLang = localStorage.getItem(
      "preferredLanguage"
    ) as Language | null;

    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2); // e.g., "en", "fr"
      const supportedLang = ["en", "fr", "de", "es", "tr"].includes(browserLang)
        ? (browserLang as Language)
        : "en";
      setLanguageState(supportedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("preferredLanguage", lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations: currentTranslations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
