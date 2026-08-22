import { CheckCircle2Icon } from "lucide-react";
import React, { useState } from "react";
import { Calendar, CheckCircle2, Clock, UserCheck2, Users,Dot } from "lucide-react";
import {motion} from "framer-motion"

const EventsInfoCards = ({ event }) => {
 
   const Eventsicon = event?.icon;
  return (
    
    <motion.div 
    whileHover={{
        boxShadow: "-1px 2px 5px 1px #a0aec0",
    }}
    className={`h-20 md:h-25  relative select-none cursor-pointer  group z-10 overflow-hidden  md:w-35 border border-gray-300 rounded-xl p-3 `}>
      <div className="absolute -top-2 -right-2 group-hover:scale-125 transition-all duration-300 ease-in-out group-hover:opacity-80 bg-violet-200 opacity-80 h-15 w-15 -z-10 rounded-full">

      </div>
      <div className={` flex gap-3  items-center`}>
        <Eventsicon className={`${event.name==="volunteer" ? "text-green-600":null } `} size={20}/> 
        <span className="text-wrap break-all line-clamp-1 uppercase text-xs md:text-sm">{event?.name}</span>
      </div>
      <div className="py-2">
        <h1 className="text-xl md:text-2xl font-semibold">{event?.value || 0} </h1>
   
      </div>

    </motion.div>
  );
};

export default EventsInfoCards;
