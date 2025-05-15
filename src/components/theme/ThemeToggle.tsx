import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark =
      storedTheme === "dark" || (!storedTheme && systemPrefersDark);

    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="ml-auto focus:outline-none focus:ring-0 w-14 h-8 flex items-center px-1 rounded-full smooth border border-default bg-primary"
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md transform smooth
          ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <Sun size={16} className="text-yellow-400" />
        ) : (
          <Moon size={16} className="text-gray-800" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
