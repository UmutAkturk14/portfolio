import {
  FaRegEye,
  FaCode,
  FaBriefcase,
  FaPenNib,
  FaUser,
} from "react-icons/fa";
import React, { useState } from "react";
import type { MouseEvent } from "react";

type NavItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const navItems: NavItem[] = [
  { href: "#tech", icon: <FaCode />, label: "Tech Stack" },
  { href: "#projects", icon: <FaBriefcase />, label: "Projects" },
  { href: "#writings", icon: <FaPenNib />, label: "Writings" },
  { href: "#about", icon: <FaUser />, label: "About Me" },
];

const RADIUS = 60;

const smoothScroll = (e: MouseEvent<HTMLButtonElement>, href: string) => {
  e.preventDefault();
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const FloatingNavButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/close on mobile tap
  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <div className="relative flex justify-center items-center select-none">
      {/* Base center button */}
      <button
        aria-label="View Menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
        className="
          flex items-center justify-center w-12 h-12 rounded-full
           text-white shadow-lg
           transition
          focus:outline-none
          bg-gradient-to-br from-sky-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 dark:from-sky-400 dark:to-blue-500 dark:hover:from-sky-400 dark:hover:to-sky-700
          "
      >
        <FaRegEye className="w-6 h-6" />
      </button>

      {/* Spoke buttons */}
      {navItems.map((item, idx) => {
        const angle = (idx / navItems.length) * 2 * Math.PI;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        return (
          <button
            key={item.href}
            aria-label={item.label}
            onClick={(e) => {
              smoothScroll(e, item.href);
              setIsOpen(false); // close menu after navigation on mobile
            }}
            className={`
              absolute flex items-center justify-center w-10 h-10 rounded-full
              bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100
              shadow-md transition-all duration-300 ease-out
              hover:bg-blue-500 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              ${
                // Desktop: show on group hover, mobile: show if isOpen
                isOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:pointer-events-auto"
              }
            `}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              transitionDelay: `${idx * 70}ms`,
            }}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
};

export default FloatingNavButton;
