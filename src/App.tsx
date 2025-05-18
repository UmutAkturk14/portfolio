import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import TechGrid from "./components/sections/TechGrid";
import ProjectsCarousel from "./components/projects/projectsCarousel";
import FireflyCursor from "./components/ui/cursors/FireflyCursor";
import ConstellationCursor from "./components/ui/cursors/ConstellationCursor";

export default function App() {
  return (
    <>
      <ConstellationCursor color="#b6fadd" />
      <FireflyCursor />
      <Navbar />
      <Hero />
      <TechGrid />
      <ProjectsCarousel />
    </>
  );
}
