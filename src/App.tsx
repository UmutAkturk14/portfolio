import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import TechGrid from "./components/technologies/TechGrid";
import ProjectsCarousel from "./components/projects/projectsCarousel";
import FireflyCursor from "./components/ui/cursors/FireflyCursor";
import ConstellationCursor from "./components/ui/cursors/ConstellationCursor";
import Writings from "./components/writings/Writings";
import About from "./components/about/About";

export default function App() {
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
    </>
  );
}
