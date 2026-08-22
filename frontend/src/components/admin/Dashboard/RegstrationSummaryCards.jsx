import React from "react";

const RegstrationSummaryCards = ({ event }) => {
  const percentage = Math.min(
    (event?.count / event?.maxParticpants) * 100 || 0
  );

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md">
      
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-700">
            {event?.name}
          </h3>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-indigo-600">
            {event?.count ?? 0}
            <span className="font-normal text-slate-400">
              /{event?.maxParticpants ?? 0}
            </span>
          </p>
        </div>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>Registration progress</span>
        <span className="font-medium text-slate-500">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default RegstrationSummaryCards;