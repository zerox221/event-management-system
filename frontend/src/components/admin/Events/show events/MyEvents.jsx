import React, { useContext, useEffect, useState } from "react";
import EventsCards from "./EventsCards";
import api from "../../../../api/axios";
import { userContext } from "../../../../context/UserContext";

const MyEvents = () => {
  const { events, setEvents, fetchEvents } = useContext(userContext);
  useEffect(() => {
    fetchEvents();
  }, []);

  const currentTime = new Date();
  const upcomingEvents = events?.filter((event) => {
    return new Date(event?.eventDate) > currentTime;
  });
  const liveEvents = events?.filter((event) => {
    const eventTime = new Date(event?.eventDate);
    const startTime = eventTime.getTime();
    const duration = event?.duration;
    const endTime = startTime + duration * 60 * 60 * 1000;
    return currentTime.getTime() > startTime && currentTime.getTime() < endTime;
  });

  const completedEvents = events?.filter((event) => {
    const eventTime = new Date(event?.eventDate);
    const startTime = eventTime.getTime();
    const duration = event?.duration;
    const endTime = startTime + duration * 60 * 60 * 1000;
    return endTime < currentTime.getTime();
  });

  console.log(events, "iside events");
  const filters = ["upcoming", "completed", "live"];
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  console.log(selectedFilter);

  return (
    <div className="min-h-screen p-4 flex flex-col gap-10">
      <div className="select-none">
        <h1 className="text-2xl font-semibold ">My Events</h1>
        <span className="text-sm text-gray-400">
          List of events you have created : {events.length}
        </span>
      </div>
      <div className="flex gap-4 ">
        <select
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-xl outline-none"
          name="filter"
          id="filter"
        >
          {filters.map((filter, idx) => {
            return (
              <option
                value={filter}
                className="p-2 rounded-xl shrink-0 px-2"
                key={idx}
              >
                {filter}
              </option>
            );
          })}
        </select>
      </div>
      <div className="bar flex flex-wrap md:h-screen scrollbar-hide md:overflow-y-scroll justify-center md:justify-start items-center md:items-start gap-5">
        {selectedFilter === "upcoming"
          ? upcomingEvents?.map((event) => {
              return <EventsCards key={event._id} event={event} />;
            })
          : null}
        {selectedFilter === "live"
          ? liveEvents?.map((event) => {
              return <EventsCards key={event._id} event={event} />;
            })
          : null}
        {selectedFilter === "completed"
          ? completedEvents?.map((event) => {
              return <EventsCards key={event._id} event={event} />;
            })
          : null}
      </div>
    </div>
  );
};

export default MyEvents;
