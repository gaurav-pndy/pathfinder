import { useUser } from "@/context/UserContext";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTripCard from "./MyTripCard";

const MyTrips = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  async function GetUserTrips() {
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  }
  return (
    <div className="px-4 md:px-28 lg:px-56 mt-20 md:mt-36">
      <h2 className="font-bold text-3xl">My trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-6">
        {userTrips?.length > 0
          ? userTrips.map((trip, idx) => <MyTripCard key={idx} trip={trip} />)
          : [1, 2, 3, 4, 5, 6].map((item, ind) => (
              <div
                key={ind}
                className="h-[240px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default MyTrips;
