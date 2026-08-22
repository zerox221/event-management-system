import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  UserRound,
  Phone,
  LoaderCircle,
} from "lucide-react";

const JoinAsVolunteer = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [Event, setEvent] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { event, token } = useParams();

  async function joinHandler() {
    if (!phoneNumber.trim()) {
      setMessage("Please enter your phone number.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post(
        `/api/v1/user/join/${event}/${token}`,
        {
          join: true,
          phoneNumber,
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function fetchEventDetails() {
    try {
      const response = await api.get(
        `/api/v1/user/get/details/${event}`
      );

      setEvent(response.data.event);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEventDetails();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

        {/* Poster */}
        <div className="h-32 w-full overflow-hidden bg-gray-200">
          <img
            className="h-full w-full object-cover"
            src={Event?.poster?.url}
            alt="Event poster"
          />
        </div>

        <div className="p-4">

          {/* Title */}
          <div className="mb-3">
            <span className="text-[11px] font-medium text-indigo-600">
              VOLUNTEER OPPORTUNITY
            </span>

            <h1 className="line-clamp-1 text-lg font-semibold text-gray-900">
              {Event?.titel}
            </h1>
          </div>

          {/* Compact Event Details */}
          <div className="space-y-2 text-xs text-gray-500">

            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-indigo-600" />

              <span>
                {Event?.eventDate
                  ? new Date(Event.eventDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "No date"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-indigo-600" />

              <span className="line-clamp-1">
                {Event?.location || "Location unavailable"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <UserRound size={15} className="text-indigo-600" />

              <span>
                Organizer:{" "}
                <span className="font-medium text-gray-700">
                  {Event?.admin?.name}
                </span>
              </span>
            </div>

          </div>

          {/* Phone Input */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              Contact number
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-indigo-400">
              <Phone size={16} className="text-indigo-600" />

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your number"
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`mt-3 rounded-lg px-3 py-2 text-xs ${
                messageType === "success"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Button */}
          <button
            onClick={joinHandler}
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading && (
              <LoaderCircle size={16} className="animate-spin" />
            )}

            {loading ? "Joining..." : "Join as Volunteer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinAsVolunteer;