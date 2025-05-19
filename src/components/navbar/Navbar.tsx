import ThemeToggle from "../theme/ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

const Navbar = () => {
  return (
    <nav
      className="w-full z-50 fixed top-0 text-primary flex items-center justify-between smooth"
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
