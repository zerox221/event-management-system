import { Calendar, MapPin } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedEventsCard = ({ event }) => {
    const navigate = useNavigate();
   
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = event.eventDate.split("T")[0].split("-");

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        transition: {
          ease: "easeInOut",
          duration: 0.2,
        },
      }}
      className="min-h-60  shrink-0 w-full md:w-65 rounded-2xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
    >
      <div className="h-35 relative w-full bg-gray-100">
        <img
          className="h-full w-full object-cover"
          src={event?.poster?.url || "#"}
          alt="event poster"
        />
        <div className="absolute items-center flex gap-1 bg-gray-50 p-1 px-3  text-indigo-600 rounded-2xl top-2 right-4">
          <Calendar size={15} />
          <span className="text-xs">{[Number(date[2])]} {months[Number(date[1])].substring(0,3)} {(date[0]).substring(2)}</span>
        </div>
      </div>
      <div className=" h-full w-full flex flex-col gap-1 p-3">
        <span className="text-indigo-600 text-xs">
          {(event?.category)?.toUpperCase() || "TECHNOLOGY"}
        </span>
        <h2 className="line-clamp-1">{event?.titel}</h2>
        <span className="flex gap-1   text-neutral-600 text-xs">
          <MapPin size={15} />
          {event?.location}
        </span>
        <div className="mt-3">
          <motion.button
          onClick={()=> navigate(`/user/event/detail/${event._id}`)}
            whileTap={{
              scale: 0.96,
            }}
            className="w-full rounded-md p-2 text-neutral-300  bg-linear-to-br from-blue-600 via-indigo-600 to-purple-500"
          >
            View Event
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedEventsCard;
