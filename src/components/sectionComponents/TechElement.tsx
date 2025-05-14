import { useEffect, useState } from "react";

type TechProps = {
  name: string;
  description: string;
  icon: string;
};

const TechElement = ({ name, description, icon }: TechProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [name, description]); // Trigger animation on language change (indirectly)

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 w-56 h-64 bg-card rounded-2xl shadow-lg text-center transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <img src={icon} alt={name} className="w-16 h-16 mb-4" />
      <h3 className="text-xl font-semibold text-primary">{name}</h3>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  );
};

export default TechElement;
