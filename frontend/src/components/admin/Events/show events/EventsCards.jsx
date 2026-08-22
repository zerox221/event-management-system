import React from "react";
import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowUpRight,
} from "lucide-react";

const EventsCards = ({ event }) => {
  const registrationPercentage = event?.maxParticpants
    ? Math.min(
        (event?.participants / event?.maxParticpants) * 100,
        100
      )
    : 0;

  return (
    <div className="group flex min-h-80 w-full md:max-w-70 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={event?.poster?.url}
          alt={event?.titel || "Event poster"}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
          <Users size={13} />
          <span>
            {event?.participants || 0}/{event?.maxParticpants || 0}
          </span>
        </div>
      </div>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
          {event?.titel}
        </h3>

        <div className="mt-3 flex flex-col gap-2">
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CalendarDays size={14} className="text-indigo-500" />
            <span>
              {event?.eventDate
                ? new Date(event.eventDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Date unavailable"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={14} className="shrink-0 text-indigo-500" />
            <span className="line-clamp-1">
              {event?.location || "Location unavailable"}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">
              Registration
            </span>

            <span className="text-xs font-semibold text-gray-700">
              {Math.round(registrationPercentage)}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              style={{
                width: `${registrationPercentage}%`,
              }}
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            />
          </div>

          <p className="mt-2 text-xs text-gray-400">
            {event?.participants || 0} of{" "}
            {event?.maxParticpants || 0} participants registered
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <NavLink
            to={`/admin/view/event/details/${event?._id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-medium text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Details
            <ArrowUpRight size={14} />
          </NavLink>

          <NavLink
            to={`/admin/registered/users/${event?._id}`}
            className="flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            Registrations
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EventsCards;