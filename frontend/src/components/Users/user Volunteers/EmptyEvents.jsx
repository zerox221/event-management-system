import React from "react";
import { CalendarX2, Radio, Clock3 } from "lucide-react";

const EmptyEvents = ({ type }) => {
  const content = {
    live: {
      icon: Radio,
      title: "No Live Events",
      description:
        "There are no events happening right now. Check back later for live volunteer opportunities.",
    },

    upcoming: {
      icon: Clock3,
      title: "No Upcoming Events",
      description:
        "You don't have any upcoming volunteer events at the moment. New opportunities will appear here.",
    },

    completed: {
      icon: CalendarX2,
      title: "No Completed Events",
      description:
        "You haven't completed any volunteer events yet. Your completed events will appear here.",
    },
  };

  const current = content[type] || content.upcoming;
  const Icon = current.icon;

  return (
    <div className="flex min-h-87.5 w-full items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        
        {/* Icon */}
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Icon className="h-8 w-8 text-indigo-500" strokeWidth={1.8} />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-slate-800">
          {current.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {current.description}
        </p>
      </div>
    </div>
  );
};

export default EmptyEvents;