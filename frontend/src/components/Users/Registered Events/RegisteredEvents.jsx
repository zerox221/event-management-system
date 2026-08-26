import React, { useEffect, useState } from "react";
import RegisteredUserCards from "./RegisteredUserCards";
import api from "../../../api/axios";
import NoEventFound from "./NoEventFound";

const RegisteredEvents = () => {
  const filters = ["upcoming","completed","live"];
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("upcoming");

  //for upcoming events
  const upcomingEvents = registeredEvents.filter((event) => {
    return new Date(event?.event?.eventDate) > Date.now();
  });

  //for copleted events
  const completedEvents = registeredEvents.filter((event) => {
    return new Date(event?.event?.eventDate) < Date.now();
  });

  //for live events
  const liveEvent = registeredEvents.filter((event) => {
    const startTime = new Date(event?.event?.eventDate);
    const endTime = new Date(
      startTime.getTime() + event?.event?.duration * 60 * 60 * 1000,
    );
    const now = new Date();
    return startTime <= now && now < endTime;
  });

  async function FetchAllRegisteredEvents() {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.get("/api/v1/user/view/my/Events");
      setRegisteredEvents(response.data.showMyEvents);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchAllRegisteredEvents();
  }, []);

  return (
    <div className="min-h-screen gap-8 flex flex-col w-full md:7 p-4 bg-slate-50 ">
      <div className="flex gap-3 bg-gray-200 p-1 w-fit rounded-xl">
        {filters.map((filter,idx) => {
          return (
            <span 
            key={idx}
              onClick={() => setSelectedFilter(filter)}
              className={`${selectedFilter === filter ? "bg-indigo-600 text-white" : ""} text-xs p-1 px-2 rounded-xl text-neutral-500 select-none cursor-pointer  md:text-sm font-medium`}
            >
              {filter}
            </span>
          );
        })}
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className="flex gap-5h-full gap-8 justify-center flex-wrap md:items-start items-center">
          {(selectedFilter).toLowerCase() === "upcoming" ? upcomingEvents?.length!==0 ?
            upcomingEvents?.map((event) => {
              return <RegisteredUserCards key={event._id} event={event.event} />;
            }):<NoEventFound/>
            :null
          }
            {
             (selectedFilter).toLowerCase()==="completed" ? completedEvents?.length!==0 ?
              completedEvents?.map((event)=>{
                return  <RegisteredUserCards key={event._id} event={event.event} />;
              }):<NoEventFound/>
              :null
            }
            {
             (selectedFilter).toLowerCase()==="live" ?  liveEvent?.length!==0 ? 
              liveEvent?.map((event)=>{
                return  <RegisteredUserCards event={event.event} />;
              }):<NoEventFound/>
              :null
            }
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;
