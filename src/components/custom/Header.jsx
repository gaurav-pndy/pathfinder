import React, { useEffect, useState } from "react";
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

const Header = () => {
  const { user, setUser } = useUser();

  // const [openDialog, setopenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // function SignInHandler() {
  //   if (!user) {
  //     setopenDialog(true);
  //     return;
  //   }
  // }

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
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        // setopenDialog(false);
      });
  }

  return (
    <div className="header px-2 py-2 md:py-0 fixed top-0 w-full  md:px-10 lg:px-20  flex justify-between items-center bg-[#EAF6FF] z-20 shadow-sm ">
      <img
        onClick={() => (window.location.href = "/")}
        className="w-[40%] md:w-auto cursor-pointer"
        src="/logo.svg"
        alt=""
      />
      <div>
        {user ? (
          <div
            className="flex gap-2 md:gap-7 items-center
          "
          >
            <a href="/create-trip">
              <Button
                variant="outline"
                className="border border-black bg-transparent hover:bg-black hover:text-white  transition-all duration-300 text-[10px] px-2 h-8 md:h-10 md:text-base"
              >
                🞤 Create New Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="bg-blue-300 hover:bg-blue-800 hover:text-white  transition-all duration-300 text-[10px] px-4 h-8 md:h-10 md:text-base"
              >
                My Trips{" "}
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                {" "}
                <img
                  src={user.picture}
                  alt=""
                  className=" w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full border cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto h-auto py-2 bg-black text-white cursor-pointer">
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
                // onClick={SignInHandler}
                className="hover:bg-transparent hover:text-black border border-black transition-all duration-300"
              >
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="pt-0">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <img src="/logo.svg" className="w-[45%] " />
                  <span className=" text-black font-bold text-lg mt-3">
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
    </div>
  );
};

export default Header;
