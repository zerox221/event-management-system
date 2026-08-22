import { Bot, Calendar, Clock, MapPin, ScanQrCode, Ticket } from "lucide-react";
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VolunteerEventsDetails = ({ event , type}) => {
  const months = [
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

  const navigate = useNavigate();
  const date = new Date(event?.eventDate);

  const duration = event?.duration || 0;

  //return time in miliseconds
  const startTime = date.getTime();

  //adding the duration in starttime converting hour into miliscond
  const completionTime = startTime + duration * 60 * 60 * 1000;

  //returns the date in milisconds since 1950
  const now = Date.now();
  //current date for comparing the date month and year with event
  const currentDate = new Date();

  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const isLive = now >= startTime && now <= completionTime;

  let status = "UPCOMING";

  if (isLive) {
    status = "LIVE";
  } else if (now > completionTime) {
    status = "COMPLETED";
  }



  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: {
          ease: "easeInOut",
        },
      }}
      className="min-h-60 shrink-0 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] select-none p-3 flex flex-col gap-2 w-full rounded-2xl border overflow-hidden border-gray-100"
    >
      <div className="text-blue-500 text-xs">{status}</div>
      <div className="flex justify-between items-center">
        <span className=" text-sm font-semibold line-clamp-1">
          {event?.titel}
        </span>
        <span
          className={`p-2 hover:bg-blue-500 hover:text-white bg-blue-100 rounded-md text-blue-600`}
        >
          <Ticket size={20} />
        </span>
      </div>
      <div className="flex flex-col text-neutral-600">
        <span className="flex gap-1 text-sm items-center">
          <Calendar size={15} />
          {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
        </span>
        <span className="flex gap-1 text-sm items-center">
          <Clock size={15} />
          {event?.time}
        </span>
        <span className="flex gap-1 text-sm items-center">
          <MapPin size={15} />
          {event?.location}
        </span>
      </div>
      <div className="p-2 mt-2 select-none rounded-md bg-purple-100 gap-3 px-2 text-neutral-600 flex">
        <div className="bg-purple-700 rounded-full h-fit w-fit text-white p-2 flex justify-center items-center ">
          <Bot size={18} className="" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium">ASSIGNED ROLE</span>
          <span className="text-sm text-purple-600">
            Entry Check-in volunteer
          </span>
        </div>
      </div>
      <div className="mt-3">
        {
          type==="completed" ? null
          :
           <button
          onClick={() => navigate(`/scan/qr/`)}
          disabled={!isLive}
          className={`flex justify-center items-center gap-1 text-sm w-full p-2 rounded-md ${
            isLive
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLive && <ScanQrCode className="text-white" size={18} />}

          <span className="text-white text-xs">
            {isLive
              ? "Scan Attendee QR"
              : "You can scan QR only if the event is live"}
          </span>
        </button>
        }
       
      </div>
    </motion.div>
  );
};

export default VolunteerEventsDetails;
