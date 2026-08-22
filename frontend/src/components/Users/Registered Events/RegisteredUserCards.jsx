import { Calendar, Check, CheckCircle2, Clock, MapPin } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisteredUserCards = ({event}) => {
    const date = new Date(event?.eventDate);
    const navigate = useNavigate();
    const Eventstatus = (date>Date.now())?"Upcoming":"Completed";

  return (
    <div className="min-h-65 md:w-80  w-full rounded-2xl overflow-hidden bg-white flex flex-col gap-2 border border-[#E2E8F0] hover:shadow-[0_8px_30px_rgba(15,23,42,0.10)] shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
      <div className="h-40 relative w-full rounded-xl overflow-hidden bg-slate-500">
        <img
          className="h-full w-full object-cover"
          src={event?.poster?.url}
          alt="poster"
        />
        <span className="absolute bottom-0 bg-indigo-500 text-white p-1 text-xs md:text-sm rounded-r">
          {Eventstatus.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-2 py-3">
        <h2 className="line-clamp-1">{event?.titel}</h2>
        <div className="flex gap-2 text-neutral-500  flex-wrap">
          <div className=" flex items-center gap-1">
            <Calendar size={15} />
            <span  className="text-sm ">{event?.eventDate?.split('T')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={15} />
            <span className="text-sm ">{event?.time}</span>
          </div>
        </div>

        <div className="flex gap-1 items-center text-neutral-500 ">
                <MapPin size={15}/>
                <span className="text-sm ">{event?.location}</span>
        </div>

        <div className="p-1 rounded-md  bg-green-50 text-green-700 border border-green-100">
          <span className="flex items-center gap-1 md:text-sm text-xs">
            <CheckCircle2 size={15} />
            Registration Confirmed
          </span>
        </div>

        <div className="flex mt-2 w-full">
          <button
            onClick={()=> navigate(`/user/event/detail/${event._id}`)}
           className="p-2 w-full text-sm  bg-indigo-600  text-white border border-indigo-300  rounded-xl hover:bg-slate-50">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUserCards;
