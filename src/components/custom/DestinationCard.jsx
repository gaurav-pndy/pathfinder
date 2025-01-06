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

  return (
    <div>
      <img
        src={photoUrl || "/destinationDemo.jpg"}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="mt-1 text-2xl font-semibold text-center text-sky-900">
        {destination.displayName.text}
      </h2>
    </div>
  );
};

export default DestinationCard;
