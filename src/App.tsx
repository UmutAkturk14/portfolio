import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import TechGrid from "./components/technologies/TechGrid";
import ProjectsCarousel from "./components/projects/projectsCarousel";
import FireflyCursor from "./components/ui/cursors/FireflyCursor";
import ConstellationCursor from "./components/ui/cursors/ConstellationCursor";
import Writings from "./components/writings/Writings";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import GoToTop from "./components/ui/GoToTop";
import { useEffect } from "react";
import { $ } from "quokka-js";

export default function App() {
  const animatedElements: string[] = [
    "#tech",
    ".tech-card-tooltip",
    ".project-card",
    ".project-name",
    "#writings",
    "#about",
  ];

  useEffect(() => {
    $("body").directionalFade(true, "slide", animatedElements.join(", "));
  });

  return (
    <>
      <ConstellationCursor color="#b6fadd" />
      <FireflyCursor />
      <Navbar />
      <Hero />
      <TechGrid />
      <ProjectsCarousel />
      <Writings />
      <About />
      <Footer />
      <GoToTop />
    </>
  );
}
