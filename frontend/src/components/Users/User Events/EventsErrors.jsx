import { CalendarDays } from "lucide-react";
import React, { useContext } from "react";
import { userContext } from "../../../context/UserContext";

const EventsErrors = () => {
    const {fetchAllEvents} = useContext(userContext);
  return (
    <div className="min-h-screen w-full  flex-col  flex items-center ">
      <div className="md:h-65 h-50 md:w-70 bg-slate-500 rounded-md">
        <img src="/notFound.png" alt="not found image" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-xl text-[#1F2937] font-medium">No events found</h2>
        <div className="text-xs md:text-sm flex flex-col justify-center text-center text-[#4B5563]">
          <span>We couldn't find any events matching your search</span>
          <span>Try a different keyword and check back later</span>
        </div>
      </div>
      <div>
        <button onClick={()=> fetchAllEvents()} className="flex mt-4 gap-1 p-2 px-5 bg-[#5B4BDB] hover:bg-[#4C3FC4] items-center rounded-md text-neutral-300">
            <CalendarDays size={15}/>
            Browse All Events
            </button>
      </div>
    </div>
  );
};

export default EventsErrors;
