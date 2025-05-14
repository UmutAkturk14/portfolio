import { useLanguage } from "../context/languageContext";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "fr" | "de" | "es" | "tr");
    document.documentElement.setAttribute("lang", e.target.value); // Update the lang attribute in HTML
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">🇬🇧 English</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="es">🇪🇸 Español</option>
      <option value="tr">🇹🇷 Türkçe</option>
    </select>
  );
};

export default LanguageSwitch;
