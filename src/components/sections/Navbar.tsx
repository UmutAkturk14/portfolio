import ThemeToggle from "../theme/ThemeToggle";
import LanguageSwitch from "../ui/LanguageSwitch";

const Navbar = () => {
  return (
    <nav
      className="w-full z-50 md:fixed top-0 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex justify-between transition duration-500"
      id="navbar"
    >
      <div className="flex">
        <ThemeToggle />
      </div>
      <div className="flex">
        <LanguageSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
