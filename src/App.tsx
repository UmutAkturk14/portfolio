import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { techStack } from "./assets/svgs";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => {
      return count + 1;
    });
  };

  return (
    <>
      <Navbar />
      <img src={techStack.get("tailwind")} alt="Tailwind CSS Logo" />

      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Edited here...</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
