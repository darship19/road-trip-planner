import React from "react";

function Hotel({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommentation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotels, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps/search/?api=1&query=${hotels["Hotel address"]} ${hotels.HotelName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img src="/placeHolder.jpg" className="rounded-xl" />
              <div className="my-2 flex flex-col">
                <h2 className="font-medium">{hotels.HotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍{hotels["Hotel address"]}
                </h2>
                <h2 className="text-xs text-gray-500">
                  💰{hotels?.Price} per night
                </h2>
                <h2 className="text-xs text-gray-500">
                  ⭐Rating : {hotels?.rating}
                </h2>
                <h2 className="text-xs text-gray-500">
                  💬{hotels?.descriptions}
                </h2>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
