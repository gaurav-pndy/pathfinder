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
  const [loading, setLoading] = useState(true);

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
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    setUserTrips(trips);
    setLoading(false);
  }

  return (
    <div className="my-trips-cont px-4 md:px-10 lg:px-36 mt-20 md:mt-36">
      <h2 className="font-bold text-3xl">My trips</h2>
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mt-6">
          {[1, 2, 3, 4, 5, 6].map((item, ind) => (
            <div
              key={ind}
              className="h-[240px] w-full bg-cyan-600 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mt-6">
          {userTrips.map((trip, idx) => (
            <MyTripCard key={idx} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="mt-6 h-[45vh] flex justify-center items-center font-semibold text-3xl text-cyan-600">
          <p>You have not created any trips yet :(</p>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
