import TechStackCarousel from "../sectionComponents/TechStackCarousel";

const TechStack = () => {
  return (
    <section className="py-12 px-4 md:px-12 lg:px-24 bg-background text-foreground">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 font-heading">
        My Tech Stack
      </h1>

      <TechStackCarousel />

      <div className="space-y-16"></div>
    </section>
  );
};

export default TechStack;
