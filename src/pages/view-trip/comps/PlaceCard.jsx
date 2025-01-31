import CustomCursor from "@/components/custom/CustomCursor";
import { GetPhotoRefUrl, GetPlaceDetails } from "@/service/GlobalAPI";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const PlaceCard = ({ place, trip }) => {
  if (!place || !trip) {
    return <div></div>;
  }

  const cardRef = useRef();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPhotos();
  }, [place]);

  const GetPhotos = async () => {
    const data = {
      textQuery: place?.placeName + trip.userSelection.location.label,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      if (
        resp.data &&
        resp.data.places &&
        resp.data.places[0].photos &&
        resp.data.places[0].photos.length > 0
      ) {
        const PhotoURL = GetPhotoRefUrl(resp.data.places[0].photos[0].name);
        setPhotoUrl(PhotoURL);
      } else {
        setPhotoUrl(null);
      }
    });
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    requestAnimationFrame(() => {
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  };

  useGSAP(() => {
    gsap.from(cardRef.current, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: {
        each: 0.2,
      },
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="place-card mx-1 md:mx-0 relative rounded-lg shadow-md shadow-slate-400 overflow-hidden h-[210px] sm:h-[230px] md:h-[400px] cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <CustomCursor
          cardRef={cardRef}
          cursorPos={cursorPos}
          text="View on Map
      "
        />
      )}
      <img
        src={photoUrl || "/noimage.png"}
        alt="Place"
        className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-[115%]"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div className="absolute pointer-events-none inset-0 bg-gradient-to-b from-black/90 to-transparent h-[70%]  md:h-[50%] z-0"></div>

      <div className=" px-2 md:px-4 pt-2 absolute z-10">
        <h4 className="text-sm md:text-lg font-bold text-yellow-400 ">
          {place.time}
        </h4>
        <h3 className="font-bold text-xl md:text-3xl leading-snug text-purple-50">
          {place.placeName}
        </h3>
        <h3 className="text-slate-300 text-sm md:text-base ">
          {place.placeDetails}
        </h3>
      </div>

      <div className="shadow-[-4px_-4px_10px_rgba(0,0,0,0.6)] text-xs md:text-lg font-bold absolute bottom-0 right-0 rounded-br-lg rounded-tl-2xl min-h-[30%] md:min-h-[27%] min-w-[25%] md:min-w-[23%] px-2 pt-1 md:pt-2 bg-black/60 text-white backdrop-blur-sm leading-5">
        <h2>💵 {place.ticketPricing?.split(/(\(|,|\.|per)/i)[0]}</h2>
        <h2>⌚ {place.travelTime?.split("(")[0]}</h2>
        <h2>⭐ {place.rating}</h2>
      </div>
    </div>
  );
};

export default PlaceCard;
