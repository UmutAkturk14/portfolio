import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMedium,
  FaDownload,
} from "react-icons/fa";
import ContactLink from "./ContactLink";

type ContactLinksProps = {
  contact: {
    email: string;
    linkedin: string;
    github: string;
    medium?: string;
  };
};

const ContactLinks = ({
  contact: { email, linkedin, github, medium },
}: ContactLinksProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8">
      <ContactLink
        href={linkedin}
        icon={<FaLinkedin className="w-5 h-5" />}
        label="LinkedIn"
      />
      <ContactLink
        href={github}
        icon={<FaGithub className="w-5 h-5" />}
        label="GitHub"
      />
      {medium && (
        <ContactLink
          href={medium}
          icon={<FaMedium className="w-5 h-5" />}
          label="Medium"
        />
      )}
      <ContactLink
        href={`mailto:${email}`}
        icon={<FaEnvelope className="w-5 h-5" />}
        label="Email"
      />
      <ContactLink
        href="https://lavender-babs-22.tiiny.site/"
        icon={<FaDownload className="w-5 h-5" />}
        label="Resume"
      />
    </div>
  );
};

export default ContactLinks;
