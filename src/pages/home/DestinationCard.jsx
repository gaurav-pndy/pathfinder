import React, { useEffect, useState } from "react";
import { GetPhotoRefUrl, GetPlaceDetails } from "@/service/GlobalAPI";

const DestinationCard = ({ destination }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPhotos();
  }, []);

  const GetPhotos = async () => {
    const data = {
      textQuery: destination.displayName.text,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoURL = GetPhotoRefUrl(resp.data.places[0].photos[0].name);

      setPhotoUrl(PhotoURL);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-60 h-60 xs:w-72 xs:h-72 sm:w-80 sm:h-80">
        <img src="binocular.gif" alt="Loading..." className="w-10 xs:w-20" />
      </div>
    );
  }

  return (
    <div className="bg-[#eaeaea] p-5 dest-card shadow-lg shadow-gray-800 my-10 hover:scale-105 cursor-pointer -rotate-[4deg]   md:hover:rotate-0  transition-all duration-300 ease-in-out">
      <div className="overflow-hidden flex justify-center">
        <img
          src={photoUrl || "/binoculars.gif"}
          className="w-60 h-60 xs:w-72 xs:h-72 sm:w-80 sm:h-80 object-cover polaroid-photo "
        />
      </div>
      <h2 className=" dest-card-text mt-2 text-2xl sm:text-3xl  text-center text-slate-700 py-4">
        {destination.displayName.text}
      </h2>
    </div>
  );
};

export default DestinationCard;
