import React from "react";
import PlaceCard from "./PlaceCard";
import { Link } from "react-router-dom";

const Itinerary = ({ trip }) => {
  if (!trip || !trip.userSelection) {
    return <div></div>;
  }

  const sortedDays = Object.keys(trip.tripData.itinerary).sort((a, b) => {
    // Extract numeric values from "day1", "day2", etc.
    const dayA = parseInt(a.replace("day", ""), 10);
    const dayB = parseInt(b.replace("day", ""), 10);
    return dayA - dayB;
  });

  return (
    <div>
      <h2 className="font-bold text-xl md:text-2xl mt-5">
        Your Personalized Itinerary:
      </h2>

      <div>
        {sortedDays.map((dayKey, index) => {
          const day = trip.tripData.itinerary[dayKey];

          return (
            <div key={index} className=" mt-2 mb-12">
              <h2 className="font-medium md:font-normal  text-xl md:text-3xl">{`Day ${
                index + 1
              }: ${day.theme}`}</h2>
              <p className="text-gray-600 mb-3 md:text-lg">
                Best Time: {day.bestTime}
              </p>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
