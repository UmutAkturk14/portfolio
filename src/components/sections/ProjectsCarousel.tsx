import { useState } from "react";
import { useLanguage } from "../../context/languageContext";

/** ------------------------------
 *  Data (taken from your Pug map)
 * -------------------------------- */
const fruits = [
  {
    id: "strawberry",
    title: "strawberry",
    text: `The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries).`,
    color: "#D64541",
    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/83067-200.png",
  },
  {
    id: "banana",
    title: "banana",
    text: `A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.`,
    color: "#F5D76E",
    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/53209-200.png",
  },
  {
    id: "apple",
    title: "apple",
    text: `The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple.`,
    color: "#00B16A",
    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/14333-200.png",
  },
  {
    id: "orange",
    title: "orange",
    text: `The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.`,
    color: "#F27935",
    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/9636-200.png",
  },
  {
    id: "quokkaJS",
    title: "QuokkaJS!",
    text: "QuokkaJS is a work-in-progress, modern, feature-rich library inspired by jQuery, built with TypeScript. The goal is to create a robust, modular, and developer-friendly library for DOM manipulation, storage access, async utilities, and more, while leveraging the power of TypeScript for type safety and modern JavaScript features.",
    color: "#F27935",
    icon: "https://videos.openai.com/vg-assets/assets%2Ftask_01jvavef4kfgkbh14thtcm909f%2F1747342311_img_0.webp?st=2025-05-15T21%3A57%3A03Z&se=2025-05-21T22%3A57%3A03Z&sks=b&skt=2025-05-15T21%3A57%3A03Z&ske=2025-05-21T22%3A57%3A03Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=lyd3BKj0g3tJ6ux%2F8LrRGj8N33YshP%2BSbWy1qx8nAvQ%3D&az=oaivgprodscus",
    links: {
      github: "url",
      deployment: "url",
    },
    stack: {
      tool: "TypeScript",
      icon: "url",
    },
    tags: [],
  },
];

/** ------------------------------
 *  Component
 * -------------------------------- */
const ProjectsCarousel = () => {
  const [active, setActive] = useState("strawberry");
  const { language, translations } = useLanguage();
  const projects = translations[language].projects ?? [];

  debugger;

  return (
    <>
      {/* key-frames ported from SCSS */}
      <style>
        {`
        @keyframes slidein   {0%{top:-400px;opacity:0;}100%{top:0;opacity:1;}}
        @keyframes slideout  {0%{top:0;opacity:1;}100%{top:-400px;opacity:0;}}
      `}
      </style>

      <div className="mx-auto my-10 flex w-full bg-white min-h-[80svh] shadow-md overflow-hidden">
        {/* LEFT MENU */}
        <div className="flex flex-col items-start justify-center w-[350px] border-r">
          {fruits.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`relative px-12 py-3 text-left w-full transition-opacity
                ${
                  active === f.id
                    ? "opacity-100 font-semibold"
                    : "opacity-50 hover:opacity-75"
                }`}
              style={
                active === f.id
                  ? { color: f.color, borderRight: `4px solid ${f.color}` }
                  : undefined
              }
            >
              {/* pictogram bubble */}
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-no-repeat bg-center bg-[length:75%_75%]"
                style={{ backgroundImage: `url(${f.icon})` }}
              />
              {f.title.charAt(0).toUpperCase() + f.title.slice(1)}
            </button>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="relative flex-1">
          {fruits.map((f) => (
            <article
              key={f.id}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-10"
              style={{
                animation:
                  active === f.id
                    ? "slidein 0.75s forwards ease-out"
                    : "slideout 0.75s forwards ease-out",
              }}
            >
              <div
                className="h-24 w-24 mb-4 bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${f.icon})` }}
              />
              <h1
                className="text-3xl font-bold mb-4"
                style={{ color: f.color }}
              >
                {f.title.charAt(0).toUpperCase() + f.title.slice(1)}
              </h1>
              <p className="max-w-[70%]">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsCarousel;
