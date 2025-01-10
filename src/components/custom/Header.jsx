import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CalendarPlus } from "lucide-react";

const Header = () => {
  const { user, setUser } = useUser();
  const [bgColor, setBgColor] = useState("transparent");
  const [textColor, setTextColor] = useState("text-black");
  const headerRef = useRef(null);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  function getUserProfile(tokenInfo) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
      });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgColor("transparent");
          setTextColor("white");
        } else {
          setBgColor("#b7d3fabc");
          setTextColor("black");
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const marker = document.getElementById("marker");
    if (marker) {
      observer.observe(marker);
    }

    return () => {
      if (marker) {
        observer.unobserve(marker);
      }
    };
  }, []);

  const navRef = useRef();

  useGSAP(
    () => {
      gsap.from(".stagger-class", {
        opacity: 0,
        y: -100,
        duration: 0.7,
        ease: "power2.inOut",
        stagger: {
          each: 0.3,
        },
      });
    },
    { scope: navRef }
  );

  return (
    <div ref={headerRef}>
      <div
        id="marker"
        style={{ position: "absolute", top: "0", width: "100%", height: "1px" }}
      ></div>

      <nav
        ref={navRef}
        className={`header px-2 py-2 md:pt-1 top-0 fixed w-full md:px-5 lg:px-20 flex justify-between items-center z-20 transition-all  ${
          bgColor !== "transparent"
            ? "shadow-md backdrop-blur-xl rounded-b-[20%]  sm:rounded-b-[30%]"
            : "bg-gradient-to-b pb-5 from-[#00000090] "
        }`}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Link className={textColor}>
          <img
            className="stagger-class w-[80%] sm:w-[80%] md:w-[100%] cursor-pointer "
            src="/logo.svg"
            alt=""
          />
        </Link>
        <div className={`stagger-class `}>
          {user ? (
            <div className="flex gap-2 md:gap-7 items-center">
              <Link to={"/create-trip"}>
                <Button
                  variant="outline"
                  className={`border border-${textColor} text-${textColor} bg-transparent ${
                    textColor == "white"
                      ? "hover:bg-white hover:text-black"
                      : "hover:bg-black hover:text-white"
                  }  transition-all duration-300 text-[9px] px-1 sm:px-2 h-8 md:h-12 md:text-lg `}
                >
                  <CalendarPlus /> Create New Trip
                </Button>
              </Link>

              <Link to="/my-trips">
                <Button
                  variant="outline"
                  className={`bg-blue-300 hover:bg-blue-800 hover:text-white transition-all duration-300 text-[9px] px-2 sm:px-4 h-8 md:h-12 md:text-lg `}
                >
                  My Trips{" "}
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user.picture}
                    alt=""
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full border cursor-pointer max-w-16"
                  />
                </PopoverTrigger>

                <PopoverContent className="w-auto mt-2 py-2 bg-black text-white cursor-pointer text-[10px] px-4 h-8 md:h-12 md:text-lg">
                  <h2
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      setUser(null);
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={`hover:bg-transparent hover:text-black border border-black transition-all duration-300 text-[10px] px-4 h-8 md:h-12 md:text-lg ${textColor}`}
                >
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="pt-0">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                    <img src="/logo.svg" className="w-[45%]" />
                    <span className="text-black font-bold text-lg mt-3">
                      Sign in with Google
                    </span>

                    <Button
                      onClick={login}
                      className="w-full mt-5 flex items-center"
                    >
                      <img src="/googlelogo.svg" alt="" className="w-[9%]" />{" "}
                      Sign in with Google
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
