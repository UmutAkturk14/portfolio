import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { fetchTranslations } from "./utils/translationFetcher";
import Hero from "./components/sections/Hero";

const App = () => {
  const [count, setCount] = useState(0);
  fetchTranslations();

  const handleClick = () => {
    setCount((count) => {
      return count + 1;
    });
  };

  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default App;
