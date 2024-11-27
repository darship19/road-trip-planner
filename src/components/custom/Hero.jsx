import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-left mx-56 gap-9">
      <h2 className="font-extrabold text-[50px] text-left mt-16">
        <span className="text-[#520066]">
          Discover,
        </span>{" "}
       the Best Lovely Places !
      </h2>

      <p className="text-xl text-gray-500 text-left">
        Plan your next adventure effortlessly with our app—curated itineraries,
        seamless bookings, real-time updates, and unique experiences to make
        unforgettable journeys.
      </p>
      <Link to={'/create-trip'}>
      <Button>Discover Now</Button>
      </Link>
      
    </div>
  );
}

export default Hero;
