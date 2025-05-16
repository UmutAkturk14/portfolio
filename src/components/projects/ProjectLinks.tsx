import { Github, ExternalLink } from "lucide-react";
import { CallToActionButton } from "../ui/CallToActionButton";
import type { Project } from "../../types/Project";

interface Props {
  links: NonNullable<Project["links"]>;
}

export default function ProjectLinks({ links }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {Object.entries(links).map(([key, { buttonTitle, link }]) => (
        <CallToActionButton
          key={key}
          href={link}
          label={buttonTitle}
          icon={key === "github" ? Github : ExternalLink}
          iconPosition="left"
          size="sm"
          variant={key === "github" ? "elegantSilver" : "oceanBlue"}
          external
        />
      ))}
    </div>
  );
}
