import { useLanguage } from "../context/languageContext";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "fr" | "de" | "es" | "tr");
    document.documentElement.setAttribute("lang", e.target.value); // Update the lang attribute in HTML
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="focus:outline-none focus:ring-0"
    >
      <option className="dark:bg-gray-900 bg:gray-50" value="en">
        🇬🇧 English
      </option>
      <option className="dark:bg-gray-900 bg:gray-50" value="fr">
        🇫🇷 Français
      </option>
      <option className="dark:bg-gray-900 bg:gray-50" value="de">
        🇩🇪 Deutsch
      </option>
      <option className="dark:bg-gray-900 bg:gray-50" value="es">
        🇪🇸 Español
      </option>
      <option className="dark:bg-gray-900 bg:gray-50" value="tr">
        🇹🇷 Türkçe
      </option>
    </select>
  );
};

export default LanguageSwitch;
