import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const HotelCard = ({ hotel }) => {
  if (!hotel) {
    return <div></div>;
  }

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPhotos();
  }, [hotel]);

  const GetPhotos = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <div className="rounded-lg mb-5">
      <img
        src={photoUrl || "/hotelDemo.jpg"}
        alt=""
        className="rounded-xl h-[140px] md:h-[250px] w-full object-cover "
      />
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center relative  ">
        <div className=" my-1 md:my-2">
          <h2 className="font-semibold text-sm md:text-base pr-5">
            {hotel?.hotelName}
          </h2>
          <h2 className="text-xs text-gray-600"> 📍{hotel?.hotelAddress}</h2>
          <h2 className=" text-xs md:text-sm">
            {" "}
            💵
            {hotel?.price.range}
          </h2>
          <h2 className=" text-xs md:text-sm"> 🌟{hotel?.rating}</h2>
        </div>
        <a
          href={
            "https://www.google.com/maps/search/?api=1&query=" +
            hotel?.hotelName +
            "," +
            hotel?.hotelAddress
          }
          target="_blank"
          className=" mr-1 md:mr-3 hover:scale-125 transition-all duration-200 absolute md:static top-2 right-1"
        >
          <span className=" text-lg  md:text-2xl">
            <FaPaperPlane />
          </span>
        </a>
      </div>
    </div>
  );
};

export default HotelCard;
