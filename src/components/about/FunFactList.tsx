import {
  Sparkles,
  Globe2,
  Coffee,
  BookOpenText,
  Brain,
  RefreshCw,
} from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti"; // ← new
import clsx from "clsx";

type FunFactListProps = {
  facts: string[];
};

const icons = [
  <Sparkles className="text-purple-500 w-5 h-5 shrink-0 mt-1" />,
  <Coffee className="text-amber-500 w-5 h-5 shrink-0 mt-1" />,
  <Globe2 className="text-blue-500 w-5 h-5 shrink-0 mt-1" />,
  <BookOpenText className="text-green-500 w-5 h-5 shrink-0 mt-1" />,
  <Brain className="text-pink-500 w-5 h-5 shrink-0 mt-1" />,
];

export default function FunFactList({ facts }: FunFactListProps) {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * facts.length)
  );
  const [spinning, setSpin] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (spinning) return;
    setSpin(true);

    /* pick a new index different from current one */
    let newIndex = Math.floor(Math.random() * facts.length);
    while (newIndex === index)
      newIndex = Math.floor(Math.random() * facts.length);

    /* 500 ms matches the CSS rotate duration ↓ */
    setTimeout(() => {
      setIndex(newIndex);
      setSpin(false);
      popConfetti(); // 🎉 fire!
    }, 500);
  };

  /* --- confetti burst --- */
  const popConfetti = () => {
    if (!cardRef.current) return;

    const { left, width, top, height } =
      cardRef.current.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 55,
      origin: {
        x: (left + width / 2) / window.innerWidth,
        y: (top + height / 2) / window.innerHeight,
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-6 max-w-xl mx-auto">
      {/* FUN–FACT CARD */}
      <div
        ref={cardRef}
        className={clsx(
          "w-full p-6 rounded-2xl bg-white/80 dark:bg-white/5 shadow-md border border-gray-200 dark:border-gray-800 transition-transform duration-500 ease-in-out",
          spinning && "rotate-[720deg]"
        )}
      >
        <div className="flex items-center gap-3">
          {icons[index % icons.length]}
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
            {facts[index]}
          </p>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={spin}
        disabled={spinning}
        className={clsx(
          "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all",
          "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95",
          spinning && "opacity-50 cursor-not-allowed"
        )}
      >
        <RefreshCw className={clsx("w-4 h-4", spinning && "animate-spin")} />
        Show another fun fact
      </button>
    </div>
  );
}
