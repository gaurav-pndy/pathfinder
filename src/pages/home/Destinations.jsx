import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "./DestinationCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import destinations from "../../constants/destinations";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Destinations = () => {
  const carouselRef = useRef();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplayPlugin = emblaApi.plugins().Autoplay;

    const handlePlay = () => {
      if (autoplayPlugin) autoplayPlugin.play();
    };

    const handleStop = () => {
      if (autoplayPlugin) autoplayPlugin.stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handlePlay();
        } else {
          handleStop();
        }
      },
      {
        threshold: 0.8,
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, [emblaApi]);

  const destRef = useRef();

  useGSAP(() => {
    gsap.from(destRef.current, {
      height: "0vh",

      duration: 0.8,
      ease: "power4.out",

      scrollTrigger: {
        trigger: destRef.current,
        start: "top 80%",
        end: "top 30%",
        // markers: true,
        scrub: 1,
      },
    });
  });

  return (
    <div className="h-[60vh]  mt-10 sm:mt-24 sm:h-[80vh] ">
      <div
        ref={destRef}
        className="hot-dest h-full fixed-bg overflow-hidden flex items-center justify-center "
      >
        <section
          ref={carouselRef}
          className="embla relative  my-5 xs:my-8 lg:my-10 "
        >
          <div className="embla__viewport  overflow-hidden" ref={emblaRef}>
            <div className="embla__container  ">
              {destinations.map((destination) => (
                <div key={destination.id} className="embla__slide ">
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </div>
          </div>
          <div
            className="embla__controls absolute top-[40%] w-full 
            "
          ></div>
        </section>
      </div>
    </div>
  );
};

export default Destinations;
