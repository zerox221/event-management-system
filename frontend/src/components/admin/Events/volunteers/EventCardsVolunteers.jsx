import { CalendarDays, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const EventCardsVolunteers = ({ event }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const now = new Date();

    const start = new Date(event.eventDate);

    const [hours, minutes] = event.time.split(":");
    start.setHours(Number(hours), Number(minutes), 0, 0);

    const end = new Date(start);
    end.setHours(end.getHours() + Number(event.duration));

    if (now < start) {
      setStatus("upcoming");
    } else if (now >= start && now < end) {
      setStatus("live");
    } else {
      setStatus("completed");
    }
  }, [event]);

  const statusStyles = {
    upcoming: "bg-blue-50 text-blue-600",
    live: "bg-green-50 text-green-600",
    completed: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="group flex w-full md:max-w-65 flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      <div className="relative h-28 w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={event?.poster?.url}
          alt="event poster"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
            statusStyles[status]
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
          {event?.titel}
        </h3>

        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays size={14} className="text-indigo-500" />

            <span>
              {event?.eventDate
                ? new Date(event.eventDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year : "numeric",
                  })
                : "No date"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={14} className="shrink-0 text-indigo-500" />

            <span className="line-clamp-1">
              {event?.location || "No location"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <NavLink
          to={
            event?.volunteers
              ? `/admin/see/volunteers/${event?._id}`
              : `/admin/add/volunteers/${event?._id}`
          }
          className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-xs font-medium text-white transition hover:bg-indigo-700"
        >
          {event?.volunteers
            ? "See Volunteers"
            : "Add Volunteers"}
        </NavLink>
      </div>
    </div>
  );
};

export default EventCardsVolunteers;