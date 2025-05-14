import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

const Navbar = () => {
  return (
    <nav
      className="w-full z-50 md:fixed top-0 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex justify-between transition duration-500"
      id="navbar"
    >
      <div></div>
      <div className="flex">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
