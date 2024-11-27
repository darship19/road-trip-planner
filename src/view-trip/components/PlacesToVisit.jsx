import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-4 border-t-2">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="">
            <h2 className="font-medium mt-3 text-lg">Day : {item.day}</h2>
            <div className="grid grid-col-2 gap-3">
            {item.plan.map((places, index) => (
              <div>
                <h2 className="font-medium text-sm text-purple-500">
                  {item["best time to visit"]}
                </h2>
                <PlaceCardItem places={places}/>
               
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
