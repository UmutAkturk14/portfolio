import "./App.css";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import TechGrid from "./components/sections/TechGrid";
import ProjectsCarousel from "./components/projects/projectsCarousel";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TechGrid />
      <ProjectsCarousel />
    </>
  );
};

export default App;
