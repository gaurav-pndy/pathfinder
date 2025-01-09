import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
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

      // Find the photo with the largest dimensions
      const bestPhoto = photos.reduce((maxPhoto, currentPhoto) => {
        const maxPhotoArea = maxPhoto.height * maxPhoto.width;
        const currentPhotoArea = currentPhoto.height * currentPhoto.width;
        return currentPhotoArea > maxPhotoArea ? currentPhoto : maxPhoto;
      }, photos[0]);

      const photoUrl = PHOTO_REF_URL.replace("{NAME}", bestPhoto.name);
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
        className="view-trip-pic hot-dest h-[75vh] md:h-[95vh] mb-3 flex relative justify-center items-end py-10 md:py-2 "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 10, 23, 0.1), rgba(1, 6, 25, 0.5)), url(${
            loading ? "/planeloading.gif" : photoUrl || "/travelDemo.jpg"
          })`,
        }}
      >
        <div
          ref={textRef}
          className=" text-white  z-10 flex flex-col-reverse md:flex-col gap-3 md:gap-5 items-center "
        >
          <h2 className=" stagger-text stroked-text font-bold w-[95%] text-center text-3xl md:text-5xl">
            {trip.userSelection.location.label}
          </h2>
          <div className="flex gap-4 text-sm md:text-lg font-semibold">
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
