import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "./DestinationCard";
import { GetDestinations } from "@/service/GlobalAPI";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      const result = await GetDestinations();

      setDestinations(result.data.places);
      setLoading(false);
    };

    fetchPopularDestinations();
  }, []);

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
      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <img src="binocular.gif" alt="Loading..." className="w-40" />
        </div>
      ) : (
        <>
          <section
            ref={carouselRef}
            className="embla relative  my-5 xs:my-8 lg:my-0 "
          >
            <div className="embla__viewport  overflow-hidden" ref={emblaRef}>
              <div className="embla__container  ">
                {destinations.slice(0, 6).map((destination, index) => (
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
        </>
      )}
    </div>
  );
};

export default Destinations;
