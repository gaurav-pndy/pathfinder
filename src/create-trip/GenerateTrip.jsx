import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { AI_PROMPT } from "@/constants/options";
import GenerateBtn from "./GenerateBtn";

import { DialogTitle } from "@radix-ui/react-dialog";
import Loader from "./Loader";

const GenerateTrip = ({ formData }) => {
  const { user, setUser } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.error("Login failed:", error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.noOfPeople
    ) {
      toast("Please fill all details", {
        style: {
          backgroundColor: "darkred",
          color: "#fff",
        },
      });
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replace("{totalDays}", formData.noOfDays)
      .replace("{noOfPeople}", formData.noOfPeople)
      .replace("{budget}", formData.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      saveAiTrip(result.response.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user.email,
        id: docId,
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip. Please try again.");
    }
  };

  const getUserProfile = (tokenInfo) => {
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
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast("Failed to sign in. Please try again.");
      });
  };

  return (
    <div>
      <div className="items-center flex flex-col md:flex-row justify-between w-full mt-0  absolute fade-in z-10">
        <div>
          <h2 className="hidden md:inline">
            <span className="text-3xl md:text-4xl block md:inline">🎉</span>
            Hit "Generate Trip" and let’s craft your ultimate adventure! 🚀
          </h2>
        </div>

        <div className="flex justify-start md:justify-end w-full md:w-auto mt-8 md:mt-0">
          {user ? (
            <Loader loading={loading} onGenerateTrip={onGenerateTrip} />
          ) : (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <GenerateBtn
                  onGenerateTrip={onGenerateTrip}
                  loading={loading}
                />
              </DialogTrigger>
              <DialogContent className="pt-0">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                    <img src="/logo.svg" className="w-[45%]" alt="Logo" />
                    <span className="text-black font-bold text-lg mt-3">
                      Sign in with Google
                    </span>
                    <Button
                      onClick={login}
                      className="w-full mt-5 flex items-center"
                    >
                      <img
                        src="/googlelogo.svg"
                        alt="Google Logo"
                        className="w-[9%]"
                      />{" "}
                      Sign in with Google
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateTrip;
