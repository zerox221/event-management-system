import React, { useEffect, useState } from "react";
import TopPerformingVolunteerCards from "./TopPerformingVolunteerCards";
import api from "../../../api/axios";

const TopVolunteer = () => {
  const [volunteers, setVolunteer] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopVolunteers() {
    try {
      const response = await api.get(
        "/api/v1/admin/get/top/volunteer"
      );

      setVolunteer(response.data.volunteerSummary || []);
    } catch (error) {
      console.log("error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopVolunteers();
  }, []);

  return (
    <div className="flex h-60 flex-col rounded-xl border border-slate-200  p-4 shadow-sm">

      {/* Header */}
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">
            Top Volunteers
          </h1>

          <p className="text-xs text-slate-400">
            Based on total check-ins
          </p>
        </div>

        <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-600">
          THIS MONTH
        </span>
      </div>

      {/* Scrollable list */}
      <div className="bar flex flex-1 flex-col gap-1 overflow-y-auto">

        {loading ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-slate-400">
              Loading volunteers...
            </span>
          </div>
        ) : volunteers.length > 0 ? (
          volunteers.map((data) => (
            <TopPerformingVolunteerCards
              key={data._id}
              data={data}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-slate-400">
              No volunteer data available
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default TopVolunteer;