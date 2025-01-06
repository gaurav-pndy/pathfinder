import Destinations from "@/components/custom/Destinations";
import Hero from "@/components/custom/Hero";
import React from "react";

const HomePage = () => {
  return (
    <div className=" sm:mx-3 lg:mx-40 mt-20 sm:mt-32">
      <Hero />
      <Destinations />
    </div>
  );
};

export default HomePage;
