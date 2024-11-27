import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig"; // Adjust the path to match your configuration file

import InfoSection from "../components/InfoSection";
import Hotel from "../components/Hotel"
import PlacesToVisit from "../components/PlacesToVisit";

//dynamic pagge
function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]); // Correct useState syntax

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);
  //what is await  - async
  //all the acode come from firebase
  //search how to featch document
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such Documnet");
      toast("No trip found");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Pass trip data components in InfoSection */}
      <InfoSection trip={trip} />
      <Hotel trip={trip} />
      <PlacesToVisit trip={trip} />




    </div>

   
  );
}

export default ViewTrip;