import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "./DestinationCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import destinations from "../../constants/destinations";

const Destinations = () => {
  const carouselRef = useRef();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 4000,
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

  return (
    <div className="hot-dest fixed-bg flex items-center justify-center h-[60vh] sm:mt-24 sm:h-[75vh] ">
      <section
        ref={carouselRef}
        className="embla relative  my-5 xs:my-8 lg:my-0 "
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
  );
};

export default Destinations;
