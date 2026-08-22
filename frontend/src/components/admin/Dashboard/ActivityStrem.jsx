import React, { useEffect, useState } from "react";
import ActivityStreamCard from "./ActivityStreamCard";
import api from "../../../api/axios";

const ActivityStream = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchStreamActivity() {
    try {
      const response = await api.get(
        "/api/v1/admin/get/all/activity"
      );

      setRegisteredUsers(response.data.registerUsers || []);
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStreamActivity();
  }, []);

  return (
    <div className="flex h-90 md:h-60 flex-col rounded-xl border border-gray-300  p-4 ">

      {/* Fixed Header */}
      <div className="mb-3 shrink-0">
        <h1 className="text-lg font-semibold text-slate-800">
          Activity Stream
        </h1>

        <p className="text-xs text-slate-400">
          Latest registrations and activity
        </p>
      </div>

      {/* Scrollable Activity List */}
      <div className="bar flex flex-1 flex-col gap-2 overflow-y-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-slate-400">
              Loading activity...
            </span>
          </div>
        ) : registeredUsers.length > 0 ? (
          registeredUsers.map((info) => (
            <ActivityStreamCard
              key={info._id}
              info={info}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-slate-400">
              No recent activity
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

export default ActivityStream;