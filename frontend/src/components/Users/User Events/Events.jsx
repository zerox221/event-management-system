import React, { useContext, useEffect, useState } from "react";
import api from "../../../api/axios";
import FeaturedEventsCard from "../User dashboard/FeaturedEventsCard";
import SearchBar from "../User dashboard/SearchBar";
import { userContext } from "../../../context/UserContext";
import EventsErrors from "./EventsErrors";
import { useParams } from "react-router-dom";

const Events = () => {
  const { allEvents } = useContext(userContext);
  console.log(allEvents);



  return (
    <div className="min-h-screen w-full flex gap-3 flex-col md:p-7 p-4 ">
      <div className=" w-full">
        <h1 className="text-xl font-semibold">Events</h1>
      </div>
 
      <div>
        <SearchBar />
      </div>

      <div>
      </div>
      <div className="flex flex-wrap h-full w-full md:flex-row flex-col gap-5 justify-start items-center md:items-start">
        {allEvents?.length === 0 ? (
          <EventsErrors />
        ) : (
          allEvents?.map((event) => {
            return <FeaturedEventsCard key={event._id} event={event} />;
          })
        )}
      </div>
    </div>
  );
};

export default Events;
