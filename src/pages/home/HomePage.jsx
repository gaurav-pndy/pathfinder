import Destinations from "@/pages/home/Destinations";
import Hero from "@/pages/home/Hero";
import HomeCard from "@/pages/home/HomeCard";
import TravelNews from "@/pages/home/TravelNews";
import React from "react";
import homeCardsData from "../../constants/homeCardsData";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="home-page-cont  ">
      <Hero />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-14 mx-3 lg:mx-20 my-6 sm:my-20">
        {homeCardsData.map(({ id, image, title, desc }) => (
          <HomeCard key={id} image={image} title={title} desc={desc} />
        ))}
      </div>
      <Destinations />
      <HowItWorks />
      <TravelNews />
      <Footer />
    </div>
  );
};

export default HomePage;
