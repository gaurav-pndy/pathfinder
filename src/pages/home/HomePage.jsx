import Destinations from "@/components/custom/Destinations";
import Hero from "@/components/custom/Hero";
import HomeCard from "@/components/custom/HomeCard";
import TravelNews from "@/components/custom/TravelNews";
import React from "react";
import homeCardsData from "../../constants/homeCardsData";

const HomePage = () => {
  return (
    <div className="  ">
      <Hero />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-14 mx-3 sm:mx-20 my-6 sm:my-20">
        {homeCardsData.map(({ id, image, title, desc }) => (
          <HomeCard key={id} image={image} title={title} desc={desc} />
        ))}
      </div>
      <Destinations />
      <TravelNews />
    </div>
  );
};

export default HomePage;
