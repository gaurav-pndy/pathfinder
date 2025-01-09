import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const HomeCard = ({ image, title, desc }) => {
  const cardRef = useRef();

  useGSAP(() => {
    gsap.from(cardRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col text-center justify-center items-center gap-3 sm:gap-10"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-32 h-32 sm:w-48 sm:h-48"
      />
      <h3 className="text-lg sm:text-2xl font-semibold text-blue-950">
        {title}
      </h3>
      <span className="text-cyan-800 leading-5 text-xs sm:text-base">
        {desc}
      </span>
    </div>
  );
};

export default HomeCard;
