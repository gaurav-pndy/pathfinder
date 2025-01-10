import { GetPhotoRefUrl, GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyTripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPhotos();
  }, [trip]);

  const GetPhotos = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoURL = GetPhotoRefUrl(resp.data.places[0].photos[4].name);

      setPhotoUrl(PhotoURL);
    });
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div>
        <img
          src={photoUrl}
          alt=""
          className="object-cover rounded-xl h-[140px] md:h-[240px] w-full"
        />
        <div>
          <h2 className="font-bold md:text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-gray-700 text-xs md:text-sm">
            {trip?.userSelection?.noOfDays} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default MyTripCard;
