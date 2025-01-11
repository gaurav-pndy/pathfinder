import React from "react";
import PlaceCard from "./PlaceCard";
import { Link } from "react-router-dom";

const Itinerary = ({ trip }) => {
  if (!trip || !trip.userSelection) {
    return <div></div>;
  }

  const sortedDays = Object.keys(trip.tripData.itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace("day", ""), 10);
    const dayB = parseInt(b.replace("day", ""), 10);
    return dayA - dayB;
  });

  return (
    <div className="px-2 md:px-10 lg:px-28">
      <h2 className="font-bold text-2xl md:text-4xl mt-5 text-blue-950">
        Your Personalized Itinerary:
      </h2>

      <div>
        {sortedDays.map((dayKey, index) => {
          const day = trip.tripData.itinerary[dayKey];

          return (
            <div key={index} className=" mt-3 mb-12">
              <h3 className="font-medium md:font-normal  text-2xl md:text-3xl">{`Day ${
                index + 1
              }: ${day.theme}`}</h3>
              <p className="text-cyan-900 mb-3 md:text-lg">
                Best Time: {day.bestTime}
              </p>

              <div className="grid lg:grid-cols-2 gap-5 md:gap-8">
                {day.schedule.map((place, idx) => (
                  <div key={idx}>
                    <Link
                      to={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        place?.placeName +
                        "," +
                        trip.userSelection.location.label
                      }
                      target="_blank"
                    >
                      <PlaceCard place={place} trip={trip} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itinerary;
