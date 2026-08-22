import React, { useEffect, useState } from "react";
import FeaturedEventsCard from "./FeaturedEventsCard";
import { NavLink } from "react-router-dom";
import api from "../../../api/axios";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    try {
      const response = await api.get(`/api/v1/user/get/latest/events`);
      setEvents(response.data.events);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(()=>{
        fetchEvents();
  },[])

  return (
    <div className="min-h-20 w-full py-5 flex flex-col gap-4 ">
      <div className="flex justify-between">
        <h2 className="md:text-2xl text-xl font-semibold">Fetaured Events</h2>
        <NavLink to={'events'} className='text-violet-800' >View all</NavLink>
      </div>
      <div className="bar px-1 py-2 overflow-hidden flex gap-5 md:gap-6 overflow-x-scroll">
        {
            events?.map((event)=>{
                return      <FeaturedEventsCard key={event._id} event={event} />
            })
        }
      </div>
    </div>
  );
};

export default FeaturedEvents;
