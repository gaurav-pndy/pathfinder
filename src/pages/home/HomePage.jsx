import Destinations from "@/components/custom/Destinations";
import Hero from "@/components/custom/Hero";
import TravelNews from "@/components/custom/TravelNews";
import React from "react";

const HomePage = () => {
  return (
    <div className="  mt-20 sm:mt-24">
      <Hero />
      <Destinations />
      {/* <TravelNews /> */}
    </div>
  );
};

export default HomePage;
