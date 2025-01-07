import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "./DestinationCard";
import { GetDestinations } from "@/service/GlobalAPI";
import { Button } from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaArrowButtons";
import { Link } from "react-router-dom";
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
      delay: 2000,
      stopOnInteraction: false,
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

      console.log("stop");
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
        threshold: 0.1,
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, [emblaApi]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="hot-dest pt-16 pb-8 z-30 h-screen sm:h-[110vh]">
      <h1 className=" text-4xl sm:text-5xl text-orange-300 font-extrabold  text-center  flex justify-center items-end">
        <span className="dest-head"> Hot Destinations </span>{" "}
        <img src="fire.gif" alt="" className="w-12 sm:w-16" />
      </h1>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <img src="binocular.gif" alt="Loading..." className="w-40" />
        </div>
      ) : (
        <>
          <section ref={carouselRef} className="embla relative  mt-12 sm:mt-0 ">
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
            >
              <div className="embla__buttons  w-full flex justify-between">
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>
            </div>
          </section>
          <Link to={"/create-trip"}>
            <Button variant="customBtn" className="mx-auto ">
              <>
                <span className="transition-all duration-1000 md:group-hover:hidden">
                  Plan a trip Now
                </span>
                <span className="group-hover:scale-[500%] transition-transform duration-500">
                  ❤️‍🔥
                </span>
              </>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Destinations;
