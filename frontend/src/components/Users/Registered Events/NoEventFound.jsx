import React from "react";
import { CalendarX } from "lucide-react";

const NoEventFound = () => {
  return (
    <div className="w-full min-h-100 flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-indigo-50">
        <CalendarX
          size={44}
          strokeWidth={1.5}
          className="text-indigo-500"
        />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-slate-900">
        No Events Found
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        You don't have any events in this category yet.
        Check another category or explore new events.
      </p>

    </div>
  );
};

export default NoEventFound;