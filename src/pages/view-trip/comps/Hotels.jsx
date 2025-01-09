import React from "react";

import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  if (!trip || !trip.userSelection) {
    return <div></div>;
  }

  return (
    <div className="px-2 md:px-28 mt-8 md:mt-10">
      <h2 className="font-bold text-2xl md:text-4xl  text-blue-950">
        Recommended Hotels:
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 mt-3 md:mt-8">
        {trip?.tripData?.hotels.map((hotel, idx) => (
          <HotelCard key={idx} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
