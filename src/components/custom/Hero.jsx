import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import heroImages from "../../data/heroImages.json";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const Hero = () => {
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      carouselRef.current,
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
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
    Fade(),
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
        threshold: 0.1,
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, [emblaApi]);

  return (
    <div className="flex justify-center items-center flex-col-reverse sm:flex-row mb-20 h-[80vh] sm:mx-3 lg:mx-40 ">
      <div className="hero-text sm:w-1/2 px-5 lg:px-2 mb-3">
        <h2
          ref={textRef}
          className="text-center text-[3rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[3.3rem] font-bold text-purple-950"
        >
          Unlock Your Perfect Journey with Pathfinder:
        </h2>
        <h3
          ref={subtextRef}
          className="text-center text-[1.1rem] md:text-[0.9rem] lg:text-[1.5rem] mb-6 lg:px-5 text-gray-500"
        >
          Plan, explore, and make every journey unforgettable. Your perfect trip
          starts here - <br />
          Find the best destinations and personalized itineraries on your
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

      <div className="sm:w-1/2 " ref={carouselRef}>
        <div ref={emblaRef} className="embla__hero">
          <div className="embla__container__hero flex">
            {heroImages.map(({ name, id, path }) => (
              <div className="embla__slide__hero flex justify-center " key={id}>
                <img src={path} alt={name} className="w-[100%] " />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
