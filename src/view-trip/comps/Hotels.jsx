import React from "react";

import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  if (!trip || !trip.userSelection) {
    return <div></div>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl md:text-2xl mt-6 md:mt-10">
        Recommended Hotels:
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 mt-3">
        {trip?.tripData?.hotels.map((hotel, idx) => (
          <HotelCard key={idx} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
