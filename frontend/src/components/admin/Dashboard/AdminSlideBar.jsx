import React, { useContext, useState } from "react";
import {
  LayoutTemplate,
  CirclePlus,
  CalendarPlus,
  UserShield,
  Users,
  ScanQrCode,
  Menu,
  X,
  CircleUser,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../../context/UserContext";

const AdminSlideBar = () => {
  const [show, setShow] = useState(false);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen hidden md:block w-60 md:w-90 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="flex flex-col gap-3 w-full px-5 border-b border-gray-200 py-10">
          <div>
            <span className="text-xl  text-[#5B4BFF] font-bold">EventHub</span>
          </div>
          {/* profile section */}
          <div className="flex items-center  gap-3 md:text-lg text-xs">
            <div
              onClick={() => navigate("profile")}
              className="md:h-12 h-12 w-12 md:w-12 overflow-hidden rounded-full  border border-[#5B4BFF]"
            >
              <img
                className="h-full w-full object-cover"
                src={user?.profile?.url || `https://api.dicebear.com/10.x/initials/svg?seed=${user?.name}` }
                alt="userProfile"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span>{user?.name}</span>
              <span className="bg-indigo-200 px-2 rounded-2xl w-fit text-indigo-600 text-[10px] md:text-sm">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Nav links */}

        <div className="p-5 flex flex-col gap-2 text-xs md:text-sm text-neutral-500">
          <NavLink
            to={"/admin"}
            onClick={() => setShow(!show)}
            className="flex gap-2 hover:bg-gray-200 p-2 rounded-md cursor-pointer  items-center"
          >
            <span>
              <LayoutTemplate size={20} />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to={"create/event"}
            onClick={() => setShow(!show)}
            className="flex gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer  items-center"
          >
            <span>
              <CirclePlus size={20} />
            </span>
            <span>Create Event</span>
          </NavLink>

          <NavLink
            to={"my/event"}
            onClick={() => setShow(!show)}
            className="flex gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer   items-center"
          >
            <span>
              <CalendarPlus size={20} />
            </span>
            <span>My Events</span>
          </NavLink>

          <NavLink
            to={"volunteers"}
            onClick={() => setShow(!show)}
            className="flex gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded-md  items-center"
          >
            <span>
              <UserShield size={20} />
            </span>
            <span>Volunteers</span>
          </NavLink>
          <NavLink
            to={"profile"}
            onClick={() => setShow(!show)}
            className="flex gap-2 p-2 hover:bg-gray-200 cursor-pointer  rounded-md  items-center"
          >
            <span>
              <CircleUser size={20} />
            </span>
            <span>Profile</span>
          </NavLink>
        </div>
      </div>

      {/* navbar for mobile screens */}
      <div className="h-15 relative z-50 flex px-3 justify-between md:hidden  items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="flex gap-3 items-center">
          <div>
            <Menu
              className="cursor-pointer"
              onClick={() => setShow(!show)}
              size={20}
            />
          </div>
          <div>
            <span
              onClick={() => navigate("/admin")}
              className="font-medium cursor-pointer text-[#5B4BFF] text-lg "
            >
              EventHub
            </span>
          </div>
        </div>
        <div>
          <div
            onClick={() => navigate("profile")}
            className="
    group relative h-10 w-10 cursor-pointer
    overflow-hidden rounded-full
    bg-neutral-200
    ring-2 ring-indigo-100
    transition-all duration-200
    hover:scale-105 hover:ring-indigo-300
  "
          >
            <img
              className="h-full w-full object-cover"
              src={user?.profile?.url}
              alt="Profile"
            />
          </div>
        </div>

        {/* menu bars */}

        {show && (
          <div className="absolute top-0 transition-all left-0 min-h-screen w-[60%] bg-white backdrop:blur-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="p-4 px-3 flex justify-between">
              <span className="text-lg font-semibold text-[#5B4BFF]">
                EventHub
              </span>
              <X className="cursor-pointer" onClick={() => setShow(!show)} />
            </div>
            <div className="flex flex-col gap-1 min-h-50 text-gray-500 text-sm py-10 px-2">
              <NavLink
                to={"/admin"}
                onClick={() => setShow(!show)}
                className="flex gap-2 hover:bg-gray-200 p-2 rounded-md cursor-pointer  items-center"
              >
                <span>
                  <LayoutTemplate size={20} />
                </span>
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to={"create/event"}
                onClick={() => setShow(!show)}
                className="flex gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer   items-center"
              >
                <span>
                  <CirclePlus size={20} />
                </span>
                <span>Create Event</span>
              </NavLink>

              <NavLink
                to={"my/event"}
                onClick={() => setShow(!show)}
                className="flex gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer   items-center"
              >
                <span>
                  <CalendarPlus size={20} />
                </span>
                <span>My Events</span>
              </NavLink>

              <NavLink
                to={"volunteers"}
                onClick={() => setShow(!show)}
                className="flex gap-2 p-2 hover:bg-gray-200 cursor-pointer rounded-md  items-center"
              >
                <span>
                  <UserShield size={20} />
                </span>
                <span>Volunteers</span>
              </NavLink>
              <NavLink
                to={"profile"}
                onClick={() => setShow(!show)}
                className="flex gap-2 p-2 hover:bg-gray-200 cursor-pointer  rounded-md  items-center"
              >
                <span>
                  <CircleUser size={20} />
                </span>
                <span>Profile</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSlideBar;
