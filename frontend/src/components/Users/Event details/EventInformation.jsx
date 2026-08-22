import React from 'react'
import InfoCard from './InfoCard'
import { Calendar, Clock, MapPin, UserCheck2, UsersRound } from 'lucide-react';

const EventInformation = ({event}) => {
     const cardInfo = [
        {
            type : "time",
            Icon : Clock,
            value : event?.time,
        },
        {
            type : "maximum particpants",
            Icon : UsersRound,
            value : event?.maxParticpants,
        },
        {
            type : "partcipants join",
            Icon : UserCheck2,
            value : event?.participants,
        },
    ]
  return (
    <div className='min-h-30 py-5 flex md:flex-row flex-col gap-4 justify-between  w-full'>
        {
            cardInfo.map((type)=>{
                return <InfoCard type={type}/>
            })
        }
    </div>
  )
}

export default EventInformation