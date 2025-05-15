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
  | "subtle"
  | "oceanBlue"
  | "royalViolet"
  | "mintGreen"
  | "warmSunset"
  | "elegantSilver"
  | "crispRed"
  | "dualTone";

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
  sm: "text-xs sm:text-sm md:text-base lg:text-md px-2 sm:px-3 py-1 sm:py-1.5",
  md: "text-sm sm:text-base lg:text-lg xl:text-xl px-3 sm:px-4 py-1.5 sm:py-2",
  lg: "text-base sm:text-lg lg:text-xl xl:text-2xl px-4 sm:px-6 py-2 sm:py-3",
};

const variantClasses = {
  solid:
    "bg-gradient-to-br from-sky-600 to-blue-800 text-white hover:from-blue-500 hover:to-blue-700 dark:from-sky-400 dark:to-blue-500 dark:hover:from-sky-400 dark:hover:to-sky-700",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  ghost: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",

  primary:
    "bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800",
  primaryOutline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  primaryGhost: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",

  secondary:
    "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700",
  secondaryOutline:
    "border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
  secondaryGhost:
    "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",

  subtle:
    "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 dark:from-blue-900/20 dark:to-blue-800/30",

  danger:
    "bg-gradient-to-br from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800",
  dangerOutline:
    "border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",

  success:
    "bg-gradient-to-br from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800",
  successOutline:
    "border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20",

  warning:
    "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700",
  warningOutline:
    "border border-yellow-500 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20",

  neutral:
    "bg-gradient-to-br from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800",
  neutralOutline:
    "border border-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/20",

  link: "text-blue-600 underline-offset-2 hover:underline dark:text-blue-400",

  transparent: "bg-transparent text-blue-600 hover:underline",
  oceanBlue:
    "bg-gradient-to-br from-sky-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 dark:from-sky-400 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-600",

  royalViolet:
    "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 dark:from-indigo-400 dark:to-purple-500 dark:hover:from-purple-500 dark:hover:to-purple-600",

  mintGreen:
    "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white hover:from-emerald-500 hover:to-emerald-700 dark:from-emerald-500 dark:to-emerald-700 dark:hover:from-emerald-300 dark:hover:to-emerald-500",

  warmSunset:
    "bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 dark:from-amber-300 dark:to-orange-400 dark:hover:from-orange-400 dark:hover:to-orange-500",

  elegantSilver:
    "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400 dark:from-gray-700 dark:to-gray-600 dark:text-white dark:hover:from-gray-600 dark:hover:to-gray-500",

  crispRed:
    "bg-gradient-to-br from-rose-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 dark:from-rose-400 dark:to-red-500 dark:hover:from-red-500 dark:hover:to-red-600",

  dualTone:
    "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white hover:brightness-110 hover:shadow-lg dark:from-blue-400 dark:via-indigo-500 dark:to-purple-500 dark:hover:brightness-110 dark:hover:shadow-xl",
};

export const CallToActionButton: FC<CTAButtonProps> = ({
  label,
  href,
  onClick,
  icon: Icon,
  iconPosition = "left",
  variant = "solid",
  size = "sm",
  external = true,
  className = "",
}) => {
  const commonClasses = clsx(
    "justify-center inline-flex items-center gap-2 font-medium rounded transition-all duration-500 hover:font-bold hover:tracking-widest ",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const iconSize = 18;

  const content = (
    <div className="flex justify-center items-center gap-2">
      {Icon && iconPosition === "left" && <Icon size={iconSize} />}
      <span className="">{label}</span>
      {Icon && iconPosition === "right" && <Icon size={iconSize} />}
    </div>
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
