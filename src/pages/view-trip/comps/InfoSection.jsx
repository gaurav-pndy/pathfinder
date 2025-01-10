import { GetPlaceDetails, GetPhotoRefUrl } from "@/service/GlobalAPI";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

const InfoSection = ({ trip }) => {
  if (!trip || !trip.userSelection) {
    return <div>Loading trip details...</div>;
  }

  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trip && GetPhotos();
  }, [trip]);

  const GetPhotos = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp.data.places[0].photos;

      const bestPhoto = photos.reduce((maxPhoto, currentPhoto) => {
        const maxPhotoArea = maxPhoto.heightPx * maxPhoto.widthPx;
        const currentPhotoArea = currentPhoto.heightPx * currentPhoto.widthPx;
        return currentPhotoArea > maxPhotoArea ? currentPhoto : maxPhoto;
      }, photos[0]);

      const photoUrl = GetPhotoRefUrl(bestPhoto.name);

      setPhotoUrl(photoUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };
  const textRef = useRef();
  useGSAP(
    () => {
      gsap.from(".stagger-text", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.5,
        stagger: {
          each: 0.2,
        },
      });
    },
    { scope: textRef }
  );

  return (
    <div>
      <div
        className="view-trip-pic fixed-bg h-[75vh] md:h-[95vh] mb-3 flex relative justify-center items-end py-6 md:py-2 "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${
            loading ? "/planeloading.gif" : photoUrl || "/travelDemo.jpg"
          })`,
          backgroundSize: `${loading ? "auto" : "cover"}`,
        }}
      >
        <div
          ref={textRef}
          className=" text-white  z-10 flex flex-col-reverse md:flex-col gap-3 md:gap-5 items-center "
        >
          <h2 className=" stagger-text stroked-text font-bold w-[95%] text-center text-3xl md:text-5xl">
            {trip.userSelection.location.label}
          </h2>
          <div className="flex gap-4 text-xs sm:text-sm md:text-lg font-semibold">
            <h2 className="stagger-text py-2 px-3 bg-green-800 rounded-full ">
              🗓️ {trip.userSelection.noOfDays} Days
            </h2>
            <h2 className="stagger-text py-2 px-3 bg-blue-600 rounded-full ">
              💸 {trip.userSelection.budget}
            </h2>
            <h2 className="stagger-text py-2 px-3 bg-orange-700 rounded-full ">
              🧑 {trip.userSelection.noOfPeople}
            </h2>
            {/* </div> */}
          </div>
          <p className="text-3xl stagger-text animate-bounce hidden md:block">
            <BsChevronDoubleDown />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
