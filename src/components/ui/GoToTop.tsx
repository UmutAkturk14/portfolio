import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"; // or use Heroicons if preferred

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;

      setVisible(scrollY / pageHeight > 0.4);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`fixed bottom-6 right-6 p-2 rounded-full transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUp className="w-8 h-8 text-primary" />
    </button>
  );
};

export default GoToTop;
