import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  const destCardRef = useRef();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    gsap.from(destCardRef.current, {
      duration: 0.8,
      opacity: 0,
      ease: "power4.in",
      scrollTrigger: {
        trigger: destCardRef.current,
        start: "top 80%",
        end: "top 50%",
      },
    });
  });

  const handleMouseMove = (e) => {
    const rect = destCardRef.current.getBoundingClientRect();
    const scaleX = destCardRef.current.offsetWidth / rect.width; // Fix for scale
    const scaleY = destCardRef.current.offsetHeight / rect.height; // Fix for scale

    setCursorPos({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    });
  };

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/create-trip")}
      ref={destCardRef}
      className="relative bg-[#eaeaea] p-5 dest-card shadow-lg shadow-gray-800 my-10 md:hover:scale-110 -rotate-[4deg] md:hover:rotate-0 transition-all duration-300 ease-in-out overflow-hidden md:cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom Cursor Box */}
      {isHovering && (
        <div
          className="absolute hidden md:flex w-16 h-16 p-2 pt-3 bg-[#5344fbcf] rounded-full pointer-events-none z-10 text-white text-center leading-4 text-sm items-center  justify-center "
          style={{
            top: `${cursorPos.y}px`,
            left: `${cursorPos.x}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          Plan Now
          <br />➝
        </div>
      )}

      {/* Image */}
      <div className="overflow-hidden flex justify-center">
        <img
          loading="lazy"
          src={destination.image || "/binoculars.gif"}
          className="w-60 h-60 xs:w-72 xs:h-72 sm:h-[19rem] object-cover polaroid-photo"
        />
      </div>

      {/* Destination Name */}
      <h2 className="dest-card-text mt-2 text-2xl sm:text-3xl text-center text-slate-700 py-4">
        {destination.name}
      </h2>
    </div>
  );
};

export default DestinationCard;
