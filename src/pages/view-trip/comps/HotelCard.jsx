import { GetPhotoRefUrl, GetPlaceDetails } from "@/service/GlobalAPI";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const HotelCard = ({ hotel }) => {
  if (!hotel) {
    return <div></div>;
  }

  const cardRef = useRef();

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPhotos();
  }, [hotel]);

  const GetPhotos = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoURL = GetPhotoRefUrl(resp.data.places[0].photos[0].name);

      setPhotoUrl(PhotoURL);
    });
  };

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <div ref={cardRef} className="rounded-lg mb-5">
      <img
        src={photoUrl || "/hotelDemo.webp"}
        alt=""
        className="rounded-xl h-[120px] sm:h-[140px] md:h-[250px] w-full object-cover "
      />
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center relative  ">
        <div className=" my-1 md:my-2">
          <h3 className="font-semibold text-sm md:text-xl pr-5">
            {hotel?.hotelName}
          </h3>
          <h3 className="text-xs  text-gray-600"> 📍{hotel?.hotelAddress}</h3>
          <h3 className=" text-xs md:text-sm">
            {" "}
            💵
            {hotel?.price.range}
          </h3>
          <h3 className=" text-xs md:text-sm"> 🌟{hotel?.rating}</h3>
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
