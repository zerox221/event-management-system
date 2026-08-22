import {
  Calendar,
  Clock,
  Locate,
  MapPin,
  Trash,
  Trash2,
  UserRoundCheck,
  UserShield,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../../../../api/axios";
import { toast } from "react-toastify";

const EventInfo = ({ event }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [volunteers, setVolunteers] = useState([]);
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState(false);

  async function fetchCheckedInUsers() {
    try {
      const response = await api.get(`/api/v1/admin/checked/in/users/${id}`);
      setCheckedInUsers(response.data.users);
    } catch {
      console.log(error.response.data);
    }
  }

  async function fetchVolunteers() {
    try {
      const response = await api.get(`/api/v1/admin/view/volunteer/${id}`);
      setVolunteers(response.data.users.volunteers);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchVolunteers();
    fetchCheckedInUsers();
  }, []);

  async function deleteEventHandler() {
    setDeleteEvent(false);
    try {
      const response = await api.put(`/api/v1/admin/delete/event/${id}`);
      navigate(-1);
      toast.success("event deleted successfully");
    } catch (error) {
      consol.log(error);
    }
  }

  return (
    <div className="min-h-screen relative w-full p-4 flex flex-col gap-7 bg-white">
      {/* name and into of events */}
      <div className="flex flex-col py-3 gap-2">
        <div className="mb-5">
          <span className="text-2xl font-semibold">{event?.titel}</span>
        </div>
        <div className="flex gap-1 items-center">
          <Calendar className="text-indigo-600" size={20} />
          <span className="text-neutral-600 md:text-lg text-sm">
            {event?.eventDate?.split("T")[0]}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Clock className=" text-indigo-600" size={20} />
          <span className="text-neutral-600  md:text-lg text-sm">
            {event?.time}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <MapPin className=" text-indigo-600" size={20} />
          <span className="text-neutral-600  md:text-lg text-sm">
            {event?.location}
          </span>
        </div>
      </div>

      <div className="text-sm text-neutral-600 flex flex-col md:text-lg ">
        <span className="font-semibold text-lg md:text-xl">Description</span>
        <span>{event?.description}</span>
      </div>

      <div className="min-h-20 gap-2 w-full p-2 py-3 flex flex-col rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <span className="text-sm font-semibold ">REGISTRATIONS</span>
        <div>
          <span className="text-sm font-semibold flex justify-between">
            {event?.participants} / {event?.maxParticpants}
            <span>
              {Math.floor((event?.participants / event?.maxParticpants) * 100)}% full
            </span>
          </span>
          <div className="h-2 w-full rounded-full overflow-hidden bg-slate-300">
            <div
              style={{
                width: `${(event?.participants / event?.maxParticpants) * 100}%`,
              }}
              className="h-full w-[80%] bg-indigo-600 "
            ></div>
          </div>
        </div>
      </div>

      <div className="min-h-20 w-full gap-2 flex  ">
        <div className="w-1/2 p-2 gap-2  rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex gap-1 items-center">
            <span>
              <UserRoundCheck size={20} className="text-indigo-600" />
            </span>
            <span>checked-in</span>
          </div>
          <span className="text-xl font-semibold">{checkedInUsers.length}</span>
        </div>

        <NavLink
          to={`/admin/see/volunteers/${id}`}
          className="w-1/2 p-2 gap-2 rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        >
          <div className="flex gap-1 items-center">
            <span>
              <UserShield size={20} className="text-indigo-600" />
            </span>
            <span>volunteer</span>
          </div>
          <span className="text-xl font-semibold">{volunteers.length}</span>
        </NavLink>
      </div>

      <div className="min-h-20 gap-2 justify-center w-full p-2 py-3 flex flex-col rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <button
          onClick={() => setDeleteEvent(!deleteEvent)}
          className="bg-red-800 text-neutral-200 hover:bg-red-700 hover:scale-99 p-2 rounded-md"
        >
          Remove Event
        </button>
      </div>
      {deleteEvent && (
        <div className="h-screen  left-0 flex-col justify-center items-center flex bottom-0 p-5 bg-black/70 fixed w-full backdrop-blur-xs">
          <div className="min-h-50 justify-center md:w-80 gap-4 bg-white   p-3 flex flex-col items-center w-full rounded-xl ">
            <div className="bg-indigo-200 w-fit rounded-md p-2">
              <Trash2 className="text-indigo-600" />
            </div>
            <div className="flex flex-col  gap-1 items-center ">
              <span className="text-black text-center font-medium">
                Delete event?
              </span>
              <span className="text-xs text-center text-black">
                This will permanently delete this event.
              </span>
            </div>
            <div className="flex gap-8 justify-between">
              <button
                onClick={() => setDeleteEvent(false)}
                className="p-1 px-4  text-black border border-gray-300 rounded-2xl cursor-pointer"
              >
                cancel
              </button>
              <button
                onClick={deleteEventHandler}
                className="p-1 px-4 bg-[#862b2e] text-white rounded-2xl cursor-pointer"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
