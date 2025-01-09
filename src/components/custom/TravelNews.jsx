import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const TravelNews = () => {
  const newsApiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

  const [newsArray, setNewsArray] = useState([]);

  useEffect(() => {
    const fetchTravelNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apiKey=${newsApiKey}&category=tourism&language=en`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setNewsArray(data.results);
        console.log("newsArray");
      } catch (error) {
        console.error("Failed to fetch travel news:", error);
      }
    };

    fetchTravelNews();
  }, []);

  return (
    <div className="travel-news my-8 sm:my-16 px-2 sm:px-20">
      <h2 className="text-3xl sm:text-5xl text-blue-950 font-bold mb-2 sm:mb-4 flex  items-center md:gap-2">
        What's New in Tourism ?
        <img src="globetravel.gif" alt="" className="h-20 sm:h-28 " />
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:px-0 sm:gap-10">
        {newsArray?.slice(0, 6).map((news) => (
          <NewsCard key={news.article_id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default TravelNews;
