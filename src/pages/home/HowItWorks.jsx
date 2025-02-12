import React, { useRef } from "react";
import howItWorks from "../../constants/howItWorks";
import howItWorksMob from "../../constants/howItWorksMob";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const stepRefPc = useRef();
  const stepRefMob = useRef();
  // const overlayRef = useRef();

  useGSAP(
    () => {
      gsap.to(
        ".cont-overlay",

        {
          height: 0,
          duration: 1,
          stagger: 1,
          scrollTrigger: {
            trigger: stepRefPc.current,

            // markers: true,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    },
    { scope: stepRefPc }
  );

  useGSAP(
    () => {
      gsap.to(".mob-overlay", {
        height: 0,
        duration: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: stepRefMob.current,
          // markers: true,
          start: "top bottom",
          end: "bottom 10%",
          scrub: 1,
        },
      });
    },
    { scope: stepRefMob }
  );

  return (
    <div className="how-it-works  mt-8 mb-10 sm:my-20 px-2 md:px-8 lg:px-20 lg:flex">
      <div className="lg:w-1/2 flex flex-col items-center justify-center px-1 md:px-10">
        <h2 className=" text-3xl sm:text-6xl text-blue-950 font-bold mb-7  sm:mb-20 flex items-center justify-center md:gap-2">
          <span className="z-10"> How It Works ?</span>
          <img
            src="how.gif"
            alt=""
            className="h-24 sm:h-52 opacity-30 absolute"
          />
        </h2>
        <p className="text-sm md:text-xl text-cyan-900">
          Planning your trip has never been easier! Our AI-powered trip planner
          creates a personalized itinerary based on your destination, the number
          of travelers, budget, and trip duration. With smart recommendations,
          it ensures you make the most of your journey by selecting the best
          attractions, accommodations, and activities tailored to your
          preferences.
        </p>{" "}
        <br />
        <p className="text-xs md:text-xl text-cyan-900 hidden md:block">
          Whether you're looking for a budget-friendly adventure or a luxurious
          getaway, our system optimizes your itinerary to balance time, cost,
          and experiences. Simply enter your details, and let AI handle the
          logistics while you focus on enjoying every moment of your trip!
        </p>
        <div className="flex justify-center">
          <Link to={"/create-trip"}>
            <Button
              variant="customBtn"
              className=" mt-5 mb-8 md:mb-0 md:mt-10 "
            >
              <>
                <span className="transition-all duration-1000 md:group-hover:hidden">
                  Try it Out Now
                </span>
                <span className="group-hover:scale-[500%] transition-transform duration-500">
                  🚘
                </span>
              </>
            </Button>
          </Link>
        </div>
      </div>

      <div ref={stepRefPc} className="lg:w-1/2 hidden lg:block mx-auto mt-10  ">
        {howItWorks.map((step) => (
          <div className="relative" key={step.id}>
            <div className="cont-overlay  absolute bottom-0 h-full w-full z-10 der-black bg-[#E4E8FF]"></div>
            <img
              src={step.image}
              alt=""
              className="stagger-step   w-[90%] mx-auto"
            />
          </div>
        ))}
      </div>

      <div ref={stepRefMob} className="block lg:hidden   ">
        {howItWorksMob.map((step) => (
          <div className="relative" key={step.id}>
            <div className="mob-overlay  absolute bottom-0 h-full w-full z-10 bg-[#E4E8FF]"></div>
            <img src={step.image} alt="" className="stagger-step-mob" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
