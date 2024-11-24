import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BudgetOptions, NoOfTravellers } from "@/constants/options";
import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import GenerateTrip from "./GenerateTrip";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  function handleInputChange(name, value) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // **************GSAP Animations****************
  useEffect(() => {
    gsap.fromTo(
      ".img-anim",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      }
    );
  }, []);

  return (
    <div className="px-4 md:px-28 lg:px-56 mt-28 md:mt-36">
      <h2 className="font-bold text-3xl md:text-4xl fade-in">
        Tell Us About Your Dream Getaway! 🌍✨
      </h2>
      <p className="mt-3 text-gray-500 md:text-xl fade-in">
        Answer a few quick questions, and our magical trip planner will whip up
        a personalized itinerary just for you!
      </p>

      <div className="ct-img1 img-anim">
        <img src="/planes.png" alt="" className="scale-100 md:scale-110" />
      </div>
      <div className="relative flex flex-col gap-5 md:gap-10">
        <div className="relative flex flex-col fade-in gap-5 md:gap-10">
          <div className="">
            <h2 className="text-xl md:text-2xl my-3 font-semibold">
              Where do you want to go?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
              selectProps={{
                place,
                onClick: () => setPlacesOpen(true),
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                placeholder: "🌟 Pick your dream destination!",
                styles: {
                  control: (base) => ({
                    ...base,
                    border: "1px solid #D1D5DB",
                    background: "#EAF6FF",
                    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                    borderRadius: "1rem",
                    padding: "0.8rem 0.7rem",
                    color: "#1F2937",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    zIndex: "100",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: window.innerWidth < 768 ? "1rem" : "1.2rem",
                    color: "#6B7280",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: "100",
                    maxHeight: "160px",
                    overflowY: "auto",
                  }),
                },
              }}
            />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl my-3 font-semibold ">
              How many days of adventure?
            </h2>
            <Input
              className="border text-lg md:text-lg pl-7 border-gray-300 bg-[#EAF6FF] shadow-inner rounded-2xl py-8 text-gray-80 placeholder:text-base md:placeholder:text-lg placeholder-gray-500 transition-all duration-300"
              placeholder="📅 Type a number and let the countdown begin!"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div className="fade-in md:z-0">
          <h2 className="text-xl md:text-2xl my-3 font-semibold">
            What’s your budget vibe?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 mt-5">
            {BudgetOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-5 border rounded-lg hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 bg-[#daeeff] flex flex-col md:gap-1 ${
                  formData.budget === item.title && " bg-purple-900  text-white"
                }`}
              >
                <h2 className="text-4xl md:text-5xl">{item.icon}</h2>
                <h2 className="font-bold text-lg md:text-xl">{item.title}</h2>
                <h2
                  className={`text-sm md:text-base text-gray-500 ${
                    formData.budget === item.title && "  text-gray-300"
                  } `}
                >
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="fade-in relative z-10">
            <h2 className="text-xl md:text-2xl my-3 font-semibold">
              Who’s joining you on this adventure?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 mt-5">
              {NoOfTravellers.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleInputChange("noOfPeople", item.people)}
                  className={`p-5 border rounded-lg hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 bg-[#daeeff] flex flex-col md:gap-1 ${
                    formData.noOfPeople === item.people &&
                    "bg-[#870267] text-white"
                  }`}
                >
                  <h2 className="text-4xl md:text-5xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg md:text-xl">{item.title}</h2>
                  <h2 className="text-xs ">({item.people})</h2>
                  <h2
                    className={`text-sm md:text-base text-gray-500  ${
                      formData.noOfPeople === item.people && "  text-gray-300"
                    }`}
                  >
                    {item.desc}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="ct-img2 img-anim absolute top-[26rem] md:top-[19.5rem] z-0">
            <img src="/buildings.png" alt="" />
          </div>
          <GenerateTrip formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
