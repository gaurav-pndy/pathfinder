import React from "react";

const TravelNews = () => {
  return (
    <div>
      {heroImages.map(({ path, id }) => (
        <img src={path} key={id} />
      ))}
    </div>
  );
};

export default TravelNews;
