import React from "react";
import { motion } from "framer-motion";

const TopPerformingVolunteerCards = ({ data }) => {
  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex w-full items-center justify-between gap-3 border-b border-slate-100 px-2 py-3 last:border-b-0 hover:bg-slate-50"
    >
      {/* Volunteer Info */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-2 ring-white">
          {data?.profile?.url || data?.profile ? (
            <img
              className="h-full w-full object-cover"
              src={data?.profile?.url || data?.profile}
              alt={data?.name || "Volunteer"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-sm font-semibold text-indigo-600">
              {data?.name?.charAt(0)?.toUpperCase() || "V"}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-slate-700">
            {data?.name}
          </h3>

          <p className="text-xs text-slate-400">
            Volunteer
          </p>
        </div>
      </div>

      {/* Checked In */}
      <div className="shrink-0 rounded-lg bg-green-50 px-2.5 py-1">
        <span className="text-xs font-semibold text-green-600 md:text-sm">
          {data?.checkedIn ?? 0}
        </span>

        <span className="ml-1 text-xs text-green-500">
          Check-ins
        </span>
      </div>
    </motion.div>
  );
};

export default TopPerformingVolunteerCards;