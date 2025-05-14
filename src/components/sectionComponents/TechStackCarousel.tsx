import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/languageContext";
import TechElement from "./TechElement";

type TechItem = {
  name: string;
  icon: string;
  description: string;
};

const TechStackCarousel = () => {
  const { language, translations } = useLanguage();
  const stackData: Record<string, TechItem> =
    translations[language]?.techStack ?? {};

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  // Auto-scroll with reset to beginning
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollStep = 1;
    const scrollSpeed = 20;

    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (!carouselRef.current || isHovered || isDragging) return;

        const container = carouselRef.current;
        container.scrollLeft += scrollStep;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, scrollSpeed);
    };

    startAutoScroll();

    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isHovered, isDragging]);

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const el = carouselRef.current;
    if (!el) return;

    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const el = carouselRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Touch Events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const el = carouselRef.current;
    if (!el) return;

    startX.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const el = carouselRef.current;
    if (!el) return;

    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="w-full my-8 px-2 relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth no-scrollbar select-none h-96"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {Object.entries(stackData).map(([key, tech]) => (
          <div key={key} className="shrink-0 w-1/2 sm:w-1/4 xl:w-1/6">
            <TechElement
              name={tech.name}
              description={tech.description}
              icon={tech.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackCarousel;
