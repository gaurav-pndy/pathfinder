import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

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
      const PhotoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[0].name
      );

      setPhotoUrl(PhotoURL);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 h-64">
        <img src="binocular.gif" alt="Loading..." className="w-20" />
      </div>
    );
  }

  return (
    <div className="bg-[#eaeaea] p-5 dest-card shadow-lg shadow-gray-800 my-10">
      <img
        src={photoUrl || "/binoculars.gif"}
        className="w-96 h-96 object-cover "
      />
      <h2 className=" dest-card-text mt-2 text-3xl  text-center text-slate-700 py-4">
        {destination.displayName.text}
      </h2>
    </div>
  );
};

export default DestinationCard;
