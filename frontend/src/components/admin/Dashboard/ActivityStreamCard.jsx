import { UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

const ActivityStreamCard = ({ info }) => {
  const [hour, setHour] = useState(null);
  const [minute, setMinut] = useState(null);
  const [day, setDay] = useState(null);

  const Eventdate = new Date(info?.createdAt);
  const currentTime = Date.now();
  const minutes = Math.round(Eventdate.getTime() / 60000);

  const timeSinceActivity = Math.round(currentTime / 60000) - minutes;

  useEffect(() => {
    setMinut(timeSinceActivity);
  }, []);

  if (timeSinceActivity >= 60) {
    let hour = currentTime / (1000 * 60 * 60) - Eventdate.getTime() / (1000 * 60 * 60);
    const result = Number(hour.toFixed(1));

    if(hour>24){
        const day = hour / 24;
        setDay(day);
    }

    useEffect(() => {
      setHour(result);
    }, []);
  }
  return (
    <div className="flex gap-4 p-2 items-center">
      <div className="bg-indigo-600 shrink-0 h-10 w-10 rounded-full flex justify-center items-center">
        <UserPlus className="text-white" size={20} />
      </div>
      <div className="text-sm flex  flex-col w-full">
        <div>
          <span className="font-bold">{info?.name} </span>
          {info?.status} for {" "}
          <span className="text-indigo-700">{info?.eventName}</span>
        </div>
        {hour && (
          <span className="md:text-sm text-xs text-neutral-600">
            {hour} hr ago
          </span>
        )}
        {!hour && (
          <span className="md:text-sm text-xs text-neutral-600">
            {minute} min ago
          </span>
        )}
        {day && (
          <span className="md:text-sm text-xs text-neutral-600">
            {day} min ago
          </span>
        )}
      </div>
    </div>
  );
};

export default ActivityStreamCard;
