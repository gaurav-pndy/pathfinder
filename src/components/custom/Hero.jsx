import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  // Refs for animation
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Create the timeline
    const tl = gsap.timeline();

    tl.fromTo(
      imgRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5" // Start 0.5 seconds earlier
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3" // Overlap animation
      );
  }, []);

  return (
    <div className="flex justify-center md:mx-3 lg:mx-28 mt-20 md:mt-36 items-center  flex-col-reverse md:flex-row bg-[#EAF6FF]">
      <div className="hero-text md:w-1/2 px-5 lg:px-8 mb-3 ">
        <h2
          ref={textRef}
          className="text-center text-[1.6rem] md:text-[2rem] lg:text-[3rem] font-bold text-purple-950"
        >
          Unlock Your Perfect Journey with Pathfinder:
        </h2>
        <h3
          ref={subtextRef}
          className="text-center text-[1rem] md:text-[0.9rem] lg:text-[1.5rem] mb-4 lg:px-5 text-gray-500"
        >
          Plan, explore, and make every journey unforgettable. Your perfect trip
          starts here - <br />
          Find the best destinations and personalized itineraries on your
          fingertips.
        </h3>
        <div ref={buttonRef} className="text-center">
          <Link to={"/create-trip"}>
            <Button className="bg-slate-800 hover:scale-110 transition-all duration-300">
              Get Started →
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-img  md:w-1/2 flex justify-center ">
        <img
          ref={imgRef}
          src="/rb_1247.png"
          alt="img"
          className="w-[80%] md:w-[90%] "
        />
      </div>
    </div>
  );
};

export default Hero;
