import ThemeToggle from "../theme/ThemeToggle";
import LanguageSwitch from "../ui/LanguageSwitch";

const Navbar = () => {
  return (
    <nav
      className="w-full z-50 top-0 text-primary flex justify-between smooth"
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
