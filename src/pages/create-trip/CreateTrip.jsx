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
      { opacity: 0, scale: 0.3 },
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
    <div className="overflow-hidden create-trip-cont text-blue-950  pt-28 md:pt-36 create-trip-cont ">
      <h2 className="create-trip-head font-bold px-3 md:px-10 lg:px-28 text-2xl sm:text-4xl fade-in">
        Tell Us About Your Dream Getaway! 🌍✨
      </h2>
      <p className="mt-3 px-4 md:px-10 lg:px-28 text-cyan-700 md:text-xl fade-in">
        Answer a few quick questions, and our magical trip planner will whip up
        a personalized itinerary just for you!
      </p>

      <div className="ct-img1 img-anim">
        <img src="/planes.png" alt="" />
      </div>
      <div className="relative  flex flex-col gap-5 md:gap-10">
        <div className="relative z-10 px-4 md:px-10 lg:px-36 flex flex-col lg:flex-row fade-in gap-5 md:gap-10">
          <div className="lg:w-1/2">
            <h2 className="text-xl md:text-3xl my-3 font-bold">
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

                    background: "#c1e2ff",
                    boxShadow: "inset 0 2px 3px #1e3a8a7a",
                    borderRadius: "1rem",
                    padding: "1rem 0.4rem",
                    color: "#1F2937",
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                    zIndex: "100",
                    cursor: "text",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: window.innerWidth < 768 ? "1rem" : "1.2rem",
                    color: "#6B7280",
                  }),
                  menu: (base) => ({
                    ...base,

                    overflowY: "auto",
                    backgroundColor: "skyblue",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: "3px 6px",
                  }),
                  option: (base, state) => ({
                    ...base,
                    padding: "13px",
                    margin: "3px 0",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor: state.isSelected ? "#6f76fc" : "#a7abfc",
                    color: state.isSelected ? "#ffffff" : "#333",
                    fontSize: "1.1rem",
                    "&:hover": {
                      backgroundColor: "#6f76fc",
                      color: "#ffffff",
                    },
                  }),
                },
              }}
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-xl md:text-3xl my-3 font-bold ">
              How many days of adventure?
            </h2>
            <Input
              className=" text-lg md:text-lg pl-4  bg-[#c1e2ff] shadow-inner  shadow-[#1e3a8a7a] rounded-2xl py-9 text-gray-80 placeholder:text-base md:placeholder:text-lg placeholder-gray-500 transition-all duration-300"
              placeholder="📅 Type a number and let the countdown begin!"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div className="fade-in px-4 md:px-10 lg:px-36 z-0">
          <h2 className="text-xl md:text-3xl my-3 font-bold">
            What’s your budget vibe?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-5">
            {BudgetOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-3 md:p-6 shadow-md rounded-2xl hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 ${
                  formData.budget === item.title
                    ? "bg-purple-950 text-white"
                    : "bg-[#cdcafb] text-purple-950"
                } flex flex-col md:gap-1`}
              >
                <h2 className="text-4xl md:text-6xl ">{item.icon}</h2>
                <h2 className="font-bold text-lg md:text-2xl">{item.title}</h2>
                <h2
                  className={`text-sm md:text-base opacity-80 ${
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
          <div className="fade-in px-4 md:px-10 lg:px-36 relative z-10">
            <h2 className="text-xl md:text-3xl my-3 font-bold">
              Who’s joining you on this adventure?
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-5">
              {NoOfTravellers.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleInputChange("noOfPeople", item.people)}
                  className={`p-3 md:p-6 shadow-md rounded-2xl hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 ${
                    formData.noOfPeople === item.people
                      ? "bg-pink-900 text-white"
                      : "bg-[#cdcafb] text-purple-950"
                  } flex flex-col md:gap-1`}
                >
                  <h2 className="text-4xl md:text-6xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg md:text-2xl">
                    {item.title}
                  </h2>
                  <h2 className="text-xs ">({item.people})</h2>
                  <h2
                    className={`text-sm md:text-base opacity-80  ${
                      formData.noOfPeople === item.people && "  text-gray-300"
                    } `}
                  >
                    {item.desc}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <GenerateTrip formData={formData} />
          <div className="ct-img2 img-anim mt-4 lg:-mt-28 z-0">
            <img src="/buildings.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
