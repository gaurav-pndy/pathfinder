import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Hero from "./components/custom/Hero";

function App() {
  return (
    <div className="md:px-16">
      <Hero />
    </div>
  );
}

export default App;
