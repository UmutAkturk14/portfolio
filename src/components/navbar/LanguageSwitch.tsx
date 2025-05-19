import { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.setAttribute("lang", newLang);
    setOpen(false);
  };

  const { Icon: CurrentIcon, label: currentLabel } = LANGUAGES[language];

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
      }}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 focus:outline-none"
        aria-label="Select language"
      >
        <CurrentIcon className="w-8 h-8" />
        <span className="text-lg font-bold select-none">{currentLabel}</span>
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
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-transparent focus:outline-none z-50"
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
              className={`flex items-center gap-2 px-4 py-2 cursor-none select-none ${
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
