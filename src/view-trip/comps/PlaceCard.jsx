import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

const PlaceCard = ({ place, trip }) => {
  if (!place || !trip) {
    return <div></div>;
  }

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPhotos();
  }, [place]);

  const GetPhotos = async () => {
    const data = {
      textQuery: place?.placeName + trip.userSelection.location.label,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[0].name
      );

      setPhotoUrl(PhotoURL);
    });
  };

  return (
    <div className="mx-3 md:mx-0 relative  border-t border-gray-200 rounded-2xl shadow-md shadow-slate-400 overflow-hidden md:hover:scale-105 transition-all duration-300">
      <div className="px-4 pt-2 absolute z-10">
        <h4 className="text-sm md:text-base font-bold text-orange-600 ">
          {place.time}
        </h4>
        <h2 className="font-bold md:text-xl leading-snug">{place.placeName}</h2>
        <h2 className="text-gray-800 text-sm md:text-base ">
          {place.placeDetails}
        </h2>
      </div>
      <div className="relative">
        <img
          src={photoUrl || "/demo.jpg"}
          alt=""
          className="placeImg w-full h-[170px] md:h-[260px] object-cover mt-[68px] md:mt-20  border-black"
        />
        {/* Gradient overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#EAF6FF] h-[40%] "></div>
      </div>

      <div className="shadow-[-4px_-4px_10px_rgba(0,0,0,0.6)] text-xs md:text-base font-bold absolute bottom-0 right-0 rounded-br-lg rounded-tl-2xl min-h-[30%] md:min-h-[27%] min-w-[25%] md:min-w-[23%] px-1 pt-2 bg-black/60 text-white backdrop-blur-sm leading-5">
        <h2>💵 {place.ticketPricing?.split(/(\(|,|\.|per)/i)[0]}</h2>
        <h2>⌚ {place.travelTime?.split("(")[0]}</h2>
        <h2>⭐ {place.rating}</h2>
      </div>
    </div>
  );
};

export default PlaceCard;
