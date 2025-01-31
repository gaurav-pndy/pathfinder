import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsCard = ({ news }) => {
  const newsCardRef = useRef();

  useGSAP(() => {
    gsap.from(newsCardRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: newsCardRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const date = new Date(news.pubDate);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return (
    <div
      ref={newsCardRef}
      className="news-card rounded-xl overflow-hidden cursor-pointer shadow-md shadow-slate-500"
    >
      <div
        className="news-wrapper h-64 sm:h-80 relative"
        style={{
          background: `linear-gradient(rgba(0, 10, 23, 0.4), rgba(1, 6, 25, 0.7)), url("${
            news.image_url?.trim() ? news.image_url : "/newsDefault.jpg"
          }") center/cover no-repeat`,
        }}
      >
        <div className="news-header p-3 flex justify-between">
          <span className="text-xs sm:text-sm text-cyan-300 font-semibold">
            {formattedDate}
          </span>
          <span className="text-xs sm:text-sm text-neutral-200">
            {news.country[0].toUpperCase()}
          </span>
        </div>
        <div className="news-data absolute bottom-0 w-full translate-y-28 transition-all duration-300">
          <div className="news-content px-3 py-2 relative z-10">
            <span className="news-author text-xs sm:text-sm flex items-center gap-2 text-zinc-300">
              <img
                src={news.source_icon || "newsSource.jpg"}
                alt="source icon"
                className="w-6"
              />
              {news.source_name}
            </span>

            <h1 className="news-title text-blue-50 font-semibold text-xl sm:text-2xl overflow-hidden text-ellipsis line-clamp-3 leading-6 sm:leading-normal">
              {news.title}
            </h1>
            <p className="news-text h-20 my-1 mt-2 sm:my-2 text-sm text-gray-300 overflow-hidden text-ellipsis line-clamp-5 sm:line-clamp-4 leading-4 sm:leading-normal">
              {news.description || "No description available."}
            </p>
            <a
              href={news.link}
              target="_blank"
              className="news-read-btn block w-24 mx-auto text-emerald-200 text-center text-sm relative font-bold animate-bounce"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
