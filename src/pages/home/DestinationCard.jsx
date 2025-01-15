import React from "react";

const DestinationCard = ({ destination }) => {
  return (
    <div className="bg-[#eaeaea] p-5 dest-card shadow-lg shadow-gray-800 my-10 hover:scale-105 cursor-pointer -rotate-[4deg]   md:hover:rotate-0  transition-all duration-300 ease-in-out">
      <div className="overflow-hidden flex justify-center">
        <img
          loading="lazy"
          src={destination.image || "/binoculars.gif"}
          className="w-60 h-60 xs:w-72 xs:h-72 sm:w-80 sm:h-80 object-cover polaroid-photo "
        />
      </div>
      <h2 className=" dest-card-text mt-2 text-2xl sm:text-3xl  text-center text-slate-700 py-4">
        {destination.name}
      </h2>
    </div>
  );
};

export default DestinationCard;
