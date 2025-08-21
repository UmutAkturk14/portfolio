import type { Writing as WritingType } from "../../types/Writing";
import Writing from "./Writing";
import { useLanguage } from "../../context/languageContext";

const Writings = () => {
  const { translations } = useLanguage();
  const writings = translations?.writings ?? [];
  const { articles, sectionTitle } = writings;

  return (
    <section id="writings" className="min-h-[100svh] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary font-heading mb-12 text-center">
          {sectionTitle}
        </h2>

        {/* Mobile carousel */}
        <div className="sm:hidden overflow-x-auto flex gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary scroll- scrollbar-track-transparent">
          {articles.map((item: WritingType) => (
            <div key={item.link} className="snap-start flex-shrink-0 w-[95vw]">
              <Writing writing={item} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item: WritingType) => (
            <Writing key={item.link} writing={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writings;
