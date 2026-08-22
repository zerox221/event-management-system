import React from 'react'
import { Calendar, Clock, MapPin, UserCheck2, UsersRound } from 'lucide-react';
const InfoCard = ({type}) => {
    console.log(type)
    const Icon = type.Icon;
  return (
    <div className='min-h-20 flex justify-center text-neutral-600 p-2 w-full rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] '>
        <div className='flex flex-col justify-center items-center gap-1'>
            <div className='bg-blue-200 p-2 w-fit text-blue-500 rounded-xl'>
                <Icon size={20}/>
            </div>
            <span className='text-xs md:text-sm'>{type.type}</span>
            <span>{type.value}</span>
        </div>
    </div>
  )
}

export default InfoCard