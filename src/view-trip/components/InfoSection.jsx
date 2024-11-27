import { Button } from "@/components/ui/button";
import React from "react";
import { CiShare2 } from "react-icons/ci";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src="/placeHolder.jpg"
        alt="Placeholder"
        className="h-[300px] w-full object-cover rounded-none"
      />
      <div className="flex justify-between items-center"> 
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userChoice?.start} to {trip?.userChoice?.end}
          </h2>
          <div className="flex gap-5 ">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip.userChoice?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip.userChoice?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              😎No of Travelers {trip.userChoice?.people}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🚞By {trip.userChoice?.tripmode} Day
            </h2>
          </div>
        </div>
        <Button><CiShare2 />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
