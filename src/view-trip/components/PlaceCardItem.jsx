import { Button } from '@/components/ui/button'
import React from 'react'
import { FaLocationCrosshairs } from "react-icons/fa6";

function PlaceCardItem({places}) {
  return (
    <a
    href={`https://www.google.com/maps/search/?api=1&query=${places.placeName}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer  '>

        <img src='/placeHolder.jpg'
        className='w-[150px] h-[150px] rounded-xl'
        />
        <div>
            <h2 className='font-bold text-lg'>{places.placeName}</h2>
            <p className='text-sm text-gray-400'>
                {places['Place Details']}
            </p>
            <h2 className='font-sm text-gray-500 mt-3'>⌛{places['Time to travel']}</h2>
        </div>
    </div>
    </a>
  )
}

export default PlaceCardItem