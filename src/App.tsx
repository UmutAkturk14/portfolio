import "./App.css";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Carousel from "./components/sectionComponents/Carousel";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Carousel />
    </>
  );
};

export default App;
