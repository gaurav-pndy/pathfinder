import { Button } from "@/components/ui/button";
import React from "react";

const Footer = () => {
  return (
    <div className="home-footer fixed-bg   py-8 lg:p-16 flex flex-col sm:flex-row z-30    ">
      <div className="sm:w-2/3 p-5 sm:p-8">
        <h2 className="text-[2.5rem] sm:text-[1.8rem] md:text-[2.5rem] lg:text-[4rem] font-extrabold mb-6 sm:mb-3 text-blue-100 leading-tight sm:leading-normal">
          Ready to Embark on Your Next Adventure?
        </h2>
        <h3 className=" text-[1.1rem] md:text-[1rem] lg:text-[1.5rem]  text-sky-300">
          Plan your perfect getaway with ease. Discover top destinations,
          customize your itinerary, and set off on a journey tailored just for
          you. Start your adventure today!
        </h3>
      </div>
      <div className="sm:w-1/3 flex justify-center items-center">
        <a href="mailto:gauravpandey2310@gmail.com" target="_blank">
          <Button
            variant="outline"
            className="bg-transparent border-blue-100 text-blue-100 text-xl hover:bg-blue-100 p-7 transition-all duration-500"
          >
            Contact Us
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Footer;
