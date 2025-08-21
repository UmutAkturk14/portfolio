// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { LanguageType } from "../types/Language";

import en from "../config/en.json";
import fr from "../config/fr.json";
import de from "../config/de.json";
import es from "../config/es.json";
import tr from "../config/tr.json";

type Language = "en" | "fr" | "de" | "es" | "tr";

const translationsMap: Record<Language, LanguageType> = {
  en,
  fr,
  de,
  es,
  tr,
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: LanguageType;
}>({
  language: "en",
  setLanguage: () => {},
  translations: en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [currentTranslations, setCurrentTranslations] = useState(
    translationsMap["en"]
  );

  // Get saved language from localStorage or fall back to browser language
  useEffect(() => {
    const savedLang = localStorage.getItem(
      "preferredLanguage"
    ) as Language | null;

    let lang: Language;
    if (savedLang && translationsMap[savedLang]) {
      lang = savedLang;
    } else {
      const browserLang = navigator.language.slice(0, 2); // e.g., "en", "fr"
      lang = ["en", "fr", "de", "es", "tr"].includes(browserLang)
        ? (browserLang as Language)
        : "en";
    }

    setLanguageState(lang);
    setCurrentTranslations(translationsMap[lang]);
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("preferredLanguage", lang);
    setLanguageState(lang);
    setCurrentTranslations(translationsMap[lang]);
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
