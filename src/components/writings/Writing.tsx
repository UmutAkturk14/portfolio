import type { Writing as WritingType } from "../../types/Writing";
import { ExternalLink } from "lucide-react";

interface Props {
  writing: WritingType;
}

export default function Writing({ writing }: Props) {
  const { title, description, date, link, tags, coverImage, themeColor } =
    writing;

  return (
    <article
      className="group relative overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
      style={{ backgroundColor: themeColor + "1A" /* 10% opacity tint */ }}
    >
      {/* Cover image */}
      <img
        src={coverImage}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Card content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-xl font-semibold">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 hover:underline text-primary underline-offset-6"
          >
            {title}
            <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 ml-1" />
          </a>
        </h3>

        {/* Date */}
        <time className="text-sm text-gray-500 dark:text-gray-400">{date}</time>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/40 dark:bg-yellow-100 backdrop-blur-sm px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
