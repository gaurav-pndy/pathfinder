import React from "react";
import heroImages from "../../data/heroImages.json";

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
