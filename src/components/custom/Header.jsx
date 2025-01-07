import React, { useEffect, useRef, useState } from "react";
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

const Header = () => {
  const { user, setUser } = useUser();
  const [bgColor, setBgColor] = useState("transparent"); // Initial background color is transparent

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
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBgColor("#cce1fb");
      } else {
        setBgColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoRef = useRef(null);
  const navRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(
      navRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 1 },
      "-=0.5"
    );
  }, []);

  return (
    <nav
      className={`header px-2 py-2 md:py-0 top-0 fixed w-full md:px-5 lg:px-20 flex justify-between items-center z-20 transition-all bg-[${bgColor}] ${
        bgColor !== "transparent" ? "shadow-md backdrop-blur-xl" : ""
      } `}
    >
      <Link>
        <img
          className="w-[90%] sm:w-[80%] md:w-[100%] cursor-pointer"
          src="/logo.svg"
          alt=""
          ref={logoRef}
        />
      </Link>
      <div>
        {user ? (
          <div ref={navRef} className="flex gap-2 md:gap-7 items-center">
            <Link to={"/create-trip"}>
              <Button
                variant="outline"
                className="border border-black bg-transparent hover:bg-black hover:text-white transition-all duration-300 text-[9px] px-1 sm:px-2 h-7 md:h-12 md:text-lg"
              >
                🞤 Create New Trip
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button
                variant="outline"
                className="bg-blue-300 hover:bg-blue-800 hover:text-white transition-all duration-300 text-[9px] px-2 sm:px-4 h-7 md:h-12 md:text-lg"
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
              <Button className="hover:bg-transparent hover:text-black border border-black transition-all duration-300  text-[10px] px-4 h-8 md:h-12 md:text-lg">
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
                    <img src="/googlelogo.svg" alt="" className="w-[9%]" /> Sign
                    in with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  );
};

export default Header;
