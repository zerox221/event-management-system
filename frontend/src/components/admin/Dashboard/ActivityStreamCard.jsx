import { UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

const ActivityStreamCard = ({ info }) => {
  const [time, setTime] = useState(0);
  const [timeType, setTimeType] = useState("seconds");

  //calculating time
  function calculateTime() {
    const userTime = new Date(info?.createdAt);
    const userTimeInMilisconds = userTime.getTime();
    const currentTime = Date.now();
    const difference = currentTime - userTimeInMilisconds;
    const userTimeInSeconds = Math.floor(difference / 1000);

    const userTimeInMinute = Math.floor(userTimeInSeconds / 60);
    const userTimeInHour = Math.floor(userTimeInMinute / 60);
    const userTimeInday = Math.floor(userTimeInHour / 24);

    if (userTimeInSeconds < 60) {
      console.log("in seconds", userTimeInSeconds);
      setTime(userTimeInSeconds);
    } else if (userTimeInSeconds > 60 && userTimeInMinute < 60) {
      setTimeType("minute");
      console.log("in minute", userTimeInMinute);
      setTime(userTimeInMinute);
    } else if (userTimeInMinute > 60 && userTimeInHour < 24) {
      setTimeType("hour");
      console.log("in hour", userTimeInHour);
      setTime(userTimeInHour);
    } else if (userTimeInHour > 24) {
      setTimeType("day");
      console.log("in days", userTimeInday);
      setTime(userTimeInday);
    }
  }

  useEffect(() => {
    calculateTime();
  }, []);

  return (
    <div className="flex gap-4 p-2 items-center">
      <div className="bg-indigo-600 shrink-0 h-10 w-10 rounded-full flex justify-center items-center">
        <UserPlus className="text-white" size={20} />
      </div>
      <div className="text-sm flex  flex-col w-full">
        <div>
          <span className="font-bold">{info?.name} </span>
          {info?.status} for{" "}
          <span className="text-indigo-700">{info?.eventName}</span>
        </div>
        {timeType === "second" && (
          <span className="md:text-sm text-xs text-neutral-600">{time} sec ago</span>
        )}
        {timeType === "minute" && (
          <span className="md:text-sm text-xs text-neutral-600">{time} min ago</span>
        )}
        {timeType === "hour" && (
          <span className="md:text-sm text-xs text-neutral-600">{time} hour ago</span>
        )}
        {timeType === "day" && (
          <span className="md:text-sm text-xs text-neutral-600">{time} day ago</span>
        )}
      </div>
    </div>
  );
};

export default ActivityStreamCard;
