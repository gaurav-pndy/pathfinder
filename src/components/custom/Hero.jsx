import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);

  // GSAP animation optimizations
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current,
      { opacity: 0, scale: 1.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.8 }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.2"
      );
  }, []);

  // IntersectionObserver for video (optimizing play/pause)
  useEffect(() => {
    const video = videoRef.current;

    // Lazy loading video when it is almost visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play the video only when it's 80% visible in viewport
          video.play();
        } else {
          // Pause the video when it's not visible in viewport
          video.pause();
        }
      },
      {
        threshold: 0.8, // Trigger when 80% of the video is in the viewport
      }
    );

    if (video) {
      observer.observe(video);
    }

    // Cleanup when the component is unmounted
    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero-section flex justify-center items-center flex-col-reverse sm:flex-row rounded-b-full sm:rounded-b-[10%]"
    >
      {/* Lazy load the video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        loading="lazy" // Lazy load video when it is needed
        className="w-full h-auto object-cover"
      >
        <source src="herobgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-text z-10 px-5 lg:px-2 mb-3">
        <h2
          ref={textRef}
          className="text-center text-[3rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[4rem] font-extrabold mb-6 sm:mb-3 text-blue-100"
        >
          Unlock Your Perfect Journey with{" "}
          <span className="text-[#8f96e4]">Pathfinder</span>
        </h2>
        <h3
          ref={subtextRef}
          className="text-center text-[1.1rem] md:text-[0.9rem] lg:text-[1.5rem] mb-8 lg:px-5 text-sky-300"
        >
          Plan, explore, and make every journey unforgettable. Your perfect trip
          starts here - <br />
          Find the best destinations and personalized itineraries at your
          fingertips.
        </h3>
        <div ref={buttonRef} className="text-center flex justify-center">
          <Link to={"/create-trip"}>
            <Button variant="customBtn">
              <>
                <span className="transition-all duration-1000 md:group-hover:hidden">
                  Get Started
                </span>
                <span className="group-hover:scale-[500%] transition-transform duration-500">
                  🚀
                </span>
              </>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
