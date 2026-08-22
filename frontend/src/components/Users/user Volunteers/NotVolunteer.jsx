import React from "react";
import { ShieldX, ArrowLeft, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotVolunteer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <ShieldX size={32} strokeWidth={1.8} />
        </div>

        {/* Content */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Volunteer Access Required
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          You are not assigned as a volunteer for this event.
          This section is only available to users who have been
          selected as event volunteers.
        </p>

        {/* Info */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
          <div className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Looking for your volunteer events?
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Check your dashboard for events you're assigned to.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/user")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotVolunteer;