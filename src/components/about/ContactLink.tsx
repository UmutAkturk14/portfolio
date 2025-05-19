import type { ReactNode } from "react";

type ContactLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
};

const ContactLink = ({ href, icon, label }: ContactLinkProps) => {
  return (
    <a
      href={href}
      className="
        flex items-center gap-3
        bg-gray-200/70 dark:bg-gray-700/70
        text-gray-900 dark:text-gray-100
        rounded-xl
        px-4 py-2
        w-2/4
        sm:w-1/3
        justify-center
        font-medium
        select-none
        shadow-sm
        transition
        duration-300
        ease-in-out
        hover:bg-blue-600 hover:text-white
        hover:shadow-lg
        hover:scale-105
        relative
      "
      target="_blank"
      rel="noopener noreferrer"
    >
      <span
        className="inline-block transition-transform duration-300 ease-in-out hover:-rotate-3"
        style={{ display: "inline-flex" }}
      >
        {icon}
      </span>
      <span className="mt-0.5">{label}</span>
      {/* Glow effect */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none
        opacity-0 hover:opacity-30
        bg-blue-500 blur-lg
        transition-opacity duration-300"
      ></span>
    </a>
  );
};

export default ContactLink;
