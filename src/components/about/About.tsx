import { useLanguage } from "../../context/languageContext";
import type { AboutMe } from "../../types/About";
import BioBlock from "./BioBlock";
import PhotoBlock from "./PhotoBlock";
import InterestTags from "./InterestTags";
import FunFactList from "./FunFactList";
import SkillList from "./SkillList";
import ContactLinks from "./ContactLinks";

const About = () => {
  const { language, translations } = useLanguage();
  const about: AboutMe = translations?.about ?? ({} as AboutMe);

  const {
    bio,
    contact,
    funFacts,
    interests,
    languageSkills,
    photo,
    techSkills,
  } = about;

  const sectionTitle = {
    en: "About me",
    fr: "À propos de moi",
    es: "Sobre mí",
    tr: "Hakkımda",
    de: "Über mich",
  }[language];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" id="about">
      <h2 className="text-4xl font-semibold mb-8 text-center font-heading text-primary">
        {sectionTitle}
      </h2>
      <PhotoBlock photoUrl={photo} />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <BioBlock bio={bio} />
          <InterestTags interests={interests} />
        </div>
      </div>

      <FunFactList facts={funFacts} />

      <div
        className={`mt-10 flex ${
          window.innerWidth < 768 ? "flex-col" : ""
        } justify-center items-center`}
      >
        <SkillList title="Tech Skills" skills={techSkills} />
        <SkillList title="Language Skills" skills={languageSkills} />
      </div>

      <ContactLinks contact={contact} />
    </div>
  );
};

export default About;
