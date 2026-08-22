import React, { useState , useEffect} from "react";
import UpcomingEventsCard from "./UpcomingEventsCard";
import api from "../../../api/axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  //

  async function fetchEvents() {
    try {
      const response = await api.get('/api/v1/user/upcoming/events');
      setEvents(response.data.events);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-40 w-full flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Upcoming Events</h1>
      </div>
      <div className="flex flex-col gap-5">
        {events?.map((event) => {
          return <UpcomingEventsCard key={event._id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
