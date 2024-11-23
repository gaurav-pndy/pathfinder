import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";

const InfoSection = ({ trip }) => {
  if (!trip || !trip.userSelection) {
    return <div>Loading trip details...</div>;
  }

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPhotos();
  }, [trip]);

  const GetPhotos = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[4].name
      );

      setPhotoUrl(PhotoURL);
    });
  };

  return (
    <div>
      <div className="relative mb-3 ">
        <img
          src={photoUrl || "/travelDemo.jpg"}
          alt="Trip Cover"
          className="w-full h-[250px] md:h-[470px] object-cover rounded-xl"
        />

        <h2 className="font-bold text-2xl md:text-4xl text-white absolute stroked-text bottom-2 md:bottom-5 left-2 md:left-5 z-10">
          {trip.userSelection.location.label}
        </h2>
      </div>
      <div className="flex gap-5 text-xs md:text-base">
        <h2 className="p-1 px-3 bg-green-800 rounded-full text-white">
          🗓️ {trip.userSelection.noOfDays} Days
        </h2>
        <h2 className="p-1 px-3 bg-blue-600 rounded-full text-white">
          💸 {trip.userSelection.budget}
        </h2>
        <h2 className="p-1 px-3 bg-orange-700 rounded-full text-white">
          🧑 {trip.userSelection.noOfPeople}
        </h2>
        {/* </div> */}
      </div>
    </div>
  );
};

export default InfoSection;
