import { ChevronRight, Clock } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UpcomingEventsCard = ({ event }) => {
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
  const colors = [
    "text-teal-500",
    "text-violet-500 ",
    "text-blue-500",
    "text-green-500",
  ];
  const date = event?.eventDate.split("T")[0].split("-");

  return (
    <motion.div
      onClick={() => navigate(`/user/event/detail/${event._id}`)}
    whileHover={{
        scale:1.01,
        boxShadow:"1px solid black",
        transition:{
            duration:0.2,
            ease:"easeInOut"
        }
    }}

    className="min-h-20 flex justify-between items-center w-full  rounded-md p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex gap-2">
        <div className="h-15 w-15 rounded-md overflow-hidden bg-teal-200">
          <img
            className="h-full w-full object-cover"
            src={event?.poster?.url}
            alt="poster"
          />
        </div>
        <div className="flex flex-col justify-center leading-5">
          <span
            className={`${colors[Math.floor(Math.random() * 4)]}   text-xs`}
          >
            {event?.category || "NETWORKING"}
          </span>
          <span className="text-sm">{event?.titel}</span>
          <span className="flex items-center text-xs text-neutral-500 gap-1">
            <Clock size={12} />
            {date[2]} {months[Number(date[1])]} {date[0]}
          </span>
        </div>
      </div>
      <div
      
        className="bg-blue-300 text-blue-500 p-1 md:p-2 rounded-full"
      >
        <ChevronRight size={20} />
      </div>
    </motion.div>
  );
};

export default UpcomingEventsCard;
