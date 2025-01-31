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
    <div className="how-it-works  mt-8 mb-10 sm:my-20 px-2 md:px-8 lg:px-20">
      <h2 className="text-3xl sm:text-6xl text-blue-950 font-bold mb-7  sm:mb-20 flex items-center justify-center md:gap-2">
        <span className="z-10"> How It Works ?</span>
        <img
          src="how.gif"
          alt=""
          className="h-24 sm:h-52 opacity-30 absolute"
        />
      </h2>

      <div ref={stepRefPc} className="hidden lg:block mx-auto mt-10  ">
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

      <div className="flex justify-center">
        <Link to={"/create-trip"}>
          <Button variant="customBtn" className=" mt-10 ">
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
  );
};

export default HowItWorks;
