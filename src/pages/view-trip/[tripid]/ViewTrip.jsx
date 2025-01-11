import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../comps/InfoSection";
import Hotels from "../comps/Hotels";
import Itinerary from "../comps/Itinerary";

const ViewTrip = () => {
  const { tripid } = useParams();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    tripid && getTripData();
  }, [tripid]);

  const getTripData = async () => {
    const docRef = doc(db, "AiTrips", tripid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="view-trip-cont">
      {trip ? (
        <>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <Itinerary trip={trip} />
        </>
      ) : (
        <div>Loading trip details...</div>
      )}
    </div>
  );
};

export default ViewTrip;
