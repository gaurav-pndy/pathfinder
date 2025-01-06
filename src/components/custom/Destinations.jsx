import axios from "axios";
import React, { useEffect, useState } from "react";
import DestinationCard from "./DestinationCard";
import { GetDestinations } from "@/service/GlobalAPI";
import { Button } from "../ui/button";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      const result = await GetDestinations();

      console.log(result.data.places, "res");
      setDestinations(result.data.places);
      setLoading(false);
    };

    fetchPopularDestinations();
  }, []);

  return (
    <div className="hot-dest mt-5">
      <h1 className="font-bold text-4xl text-purple-950 font-serif text-center">
        Hot Destinations <span className="animate-pulse ">🔥</span>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <img src="binocular.gif" alt="Loading..." className="w-40" />
        </div>
      ) : (
        <>
          <div className=" mt-8 mb-12 grid grid-cols-2 md:grid-cols-3  gap-x-8 gap-y-10">
            {destinations.slice(0, 6).map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <Button variant="customBtn" className="mx-auto">
            <>
              <span className="transition-all duration-1000 md:group-hover:hidden">
                Plan a trip Now
              </span>
              <span className="group-hover:scale-[500%] transition-transform duration-500">
                ❤️‍🔥
              </span>
            </>
          </Button>
        </>
      )}
    </div>
  );
};

export default Destinations;
