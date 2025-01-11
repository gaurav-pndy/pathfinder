import React, { useRef } from "react";
import howItWorks from "../../constants/howItWorks";
import howItWorksMob from "../../constants/howItWorksMob";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const stepRefPc = useRef();
  const stepRefMob = useRef();

  useGSAP(
    () => {
      gsap.from(
        ".stagger-step",

        {
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          stagger: 1,
          scrollTrigger: {
            trigger: stepRefPc.current,

            // markers: true,
            start: "top 90%",
            end: "bottom 90%",
            scrub: 1,
          },
        }
      );
    },
    { scope: stepRefPc }
  );

  useGSAP(
    () => {
      gsap.from(".stagger-step-mob", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: stepRefMob.current,

          start: "top bottom", // Start when the top of the element reaches the top of the viewport
          end: "bottom 10%", // End when the bottom of the element reaches the bottom of the viewport
          scrub: 1,
        },
      });
    },
    { scope: stepRefMob }
  );

  return (
    <div className="how-it-works my-8 sm:my-16 px-2 md:px-8 lg:px-20">
      <h2 className="text-3xl sm:text-5xl text-blue-950 font-bold  sm:mb-4 flex items-center justify-between sm:justify-normal md:gap-2">
        How It Works ?
        <img src="how.gif" alt="" className="h-20 sm:h-28 " />
      </h2>

      <div ref={stepRefPc} className="hidden lg:block mx-auto mt-10  ">
        {howItWorks.map((step) => (
          <div key={step.id}>
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
          <div key={step.id}>
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
