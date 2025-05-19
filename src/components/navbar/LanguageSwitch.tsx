import { useLanguage } from "../../context/languageContext";
import iconMap from "../../types/Icons";

/** Supported language codes */
type Language = "en" | "fr" | "de" | "es" | "tr";

/** Centralised configuration: label + SVG component for each language */
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    setLanguage(newLang);
    document.documentElement.setAttribute("lang", newLang);
  };

  const { Icon, label } = LANGUAGES[language];

  return (
    <div className="relative flex items-center gap-2">
      {/* Flag + current language name */}
      <div className="flex items-center justify-between gap-2 mr-4">
        <Icon className="w-8 h-8" />
        <div className="w-px h-4 bg-white" />
        <p className="text-lg font-bold">{label}</p>
      </div>

      {/* Native selector overlaid invisibly */}
      <select
        value={language}
        onChange={handleChange}
        className="absolute inset-0 opacity-0 dark:bg-gray-900"
        aria-label="Select language"
      >
        {Object.entries(LANGUAGES).map(([code, { label }]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;
