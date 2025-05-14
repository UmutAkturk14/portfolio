import { type FC } from "react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "primary"
  | "primaryOutline"
  | "primaryGhost"
  | "secondary"
  | "secondaryOutline"
  | "secondaryGhost"
  | "danger"
  | "dangerOutline"
  | "success"
  | "successOutline"
  | "warning"
  | "warningOutline"
  | "neutral"
  | "neutralOutline"
  | "link"
  | "transparent"
  | "subtle";

type CTAButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

const variantClasses = {
  solid: "bg-blue-600 text-white hover:bg-blue-700",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  ghost: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  primaryOutline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  primaryGhost: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  secondary: "bg-purple-600 text-white hover:bg-purple-700",
  secondaryOutline:
    "border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
  secondaryGhost:
    "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
  subtle:
    "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-800/30",
  danger: "bg-red-600 text-white hover:bg-red-700",
  dangerOutline:
    "border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
  success: "bg-green-600 text-white hover:bg-green-700",
  successOutline:
    "border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20",

  warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  warningOutline:
    "border border-yellow-500 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20",

  neutral: "bg-gray-600 text-white hover:bg-gray-700",
  neutralOutline:
    "border border-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/20",

  link: "text-blue-600 underline-offset-2 hover:underline dark:text-blue-400",

  transparent: "bg-transparent text-blue-600 hover:underline",
};

export const CallToActionButton: FC<CTAButtonProps> = ({
  label,
  href,
  onClick,
  icon: Icon,
  iconPosition = "left",
  variant = "solid",
  size = "md",
  external = false,
  className = "",
}) => {
  const commonClasses = clsx(
    "justify-center inline-flex items-center gap-2 font-medium rounded transition-all duration-200 text-sm md:text-md",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const iconSize = 18;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={iconSize} />}
      {label}
      {Icon && iconPosition === "right" && <Icon size={iconSize} />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        className={commonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {content}
    </button>
  );
};
