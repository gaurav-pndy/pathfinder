import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import React, { useEffect, useRef } from "react";

const DestinationCard = ({ destination }) => {
  const destCardRef = useRef();

  useGSAP(() => {
    gsap.from(destCardRef.current, {
      duration: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: destCardRef.current,
        start: "top 80%",
        end: "top 30%",
        // markers: true,
        scrub: 1,
      },
    });
  });
  return (
    <div
      ref={destCardRef}
      className="bg-[#eaeaea] p-5  dest-card shadow-lg shadow-gray-800 my-10 md:hover:scale-110 cursor-pointer -rotate-[4deg]   md:hover:rotate-0  transition-all duration-300 ease-in-out overflow-hidden"
    >
      <div className="overflow-hidden flex justify-center">
        <img
          loading="lazy"
          src={destination.image || "/binoculars.gif"}
          className="w-60 h-60 xs:w-72 xs:h-72 sm:h-[19rem] object-cover polaroid-photo "
        />
      </div>
      <h2 className=" dest-card-text mt-2 text-2xl sm:text-3xl  text-center text-slate-700 py-4">
        {destination.name}
      </h2>
    </div>
  );
};

export default DestinationCard;
