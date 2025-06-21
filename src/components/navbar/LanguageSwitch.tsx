import { useState, useRef } from "react";
import { useLanguage } from "../../context/languageContext";
import iconMap from "../../types/Icons";

type Language = "en" | "fr" | "de" | "es" | "tr";

const LANGUAGES: Record<
  Language,
  { label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  en: { label: "English", Icon: iconMap["english"] },
  fr: { label: "Français", Icon: iconMap["french"] },
  de: { label: "Deutsch", Icon: iconMap["german"] },
  es: { label: "Español", Icon: iconMap["spanish"] },
  tr: { label: "Türkçe", Icon: iconMap["turkish"] },
};

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.setAttribute("lang", newLang);
    setOpen(false);
  };

  const { Icon: CurrentIcon, label: currentLabel } = LANGUAGES[language];

  const cancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const scheduleClose = () => {
    cancelClose();
    timeoutRef.current = setTimeout(() => setOpen(false), 200); // slight delay prevents flicker
  };

  return (
    <div
      className="relative inline-block text-left"
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      {/* Trigger */}
      <div
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onMouseLeave={scheduleClose}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
        }}
        className="flex items-center gap-2 select-none"
        aria-label="Select language"
      >
        <CurrentIcon className="w-8 h-8" />
        <span className="text-lg font-bold">{currentLabel}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 focus:outline-none z-50"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {Object.entries(LANGUAGES).map(([code, { label, Icon }]) => (
            <li
              key={code}
              role="option"
              aria-selected={language === code}
              tabIndex={0}
              onClick={() => handleSelect(code as Language)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(code as Language);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer select-none ${
                language === code
                  ? "font-semibold text-cyan-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-6 h-6" />
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitch;
