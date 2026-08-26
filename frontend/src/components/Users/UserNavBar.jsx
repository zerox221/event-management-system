import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const UserNavBar = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Home", to: "/user" },
    { name: "RegisteredEvents", to: "registered/events" },
    { name: "Events", to: "/user/events" },
    { name: "Volunteer", to: "/user/volunteer" },
    { name: "Profile", to: "/user/profile" },
  ];

  const { user } = useContext(userContext);
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-15 relative flex justify-between p-2 items-center px-4 md:px-6 border-b border-neutral-200 w-full  ">
      <div
        onClick={() => navigate("/user/profile")}
        className="md:h-17 md:w-17 h-10 w-10  rounded-full bg-neutral-500 overflow-hidden"
      >
        <img
          className="h-full w-full object-cover shrink-0"
          src={user?.profile?.url || `https://api.dicebear.com/10.x/initials/svg?seed=${user?.name}`}
          alt="profile"
        />
      </div>
      <div className="md:text-sm hidden md:flex gap-8 text-neutral-600">
        <NavLink to={"/user"}>Home</NavLink>
        <NavLink to={"/user/events"}>Events</NavLink>
        <NavLink to={"registered/events"}>RegisteredEvents</NavLink>
        <NavLink to={"/user/volunteer"}>Volunteer</NavLink>
        <NavLink to={"/user/profile"}>Profile</NavLink>
      </div>
      <div className="flex md:hidden">
        <Menu size={20} onClick={() => setShow(!show)} />
      </div>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute w-full top-0 left-0 min-h-55 woverflow-hidden p-2 bg-neutral-50 z-50 backdrop-blur-md   "
          >
            <span className="w-full   flex p-2 px-3 justify-end">
              <X
                onClick={() => setShow(!show)}
                size={22}
                className="cursor-pointer"
              />
            </span>
            <div className="md:text-sm flex flex-col py-2  gap-3 text-neutral-600">
              {links.map((link, idx) => {
                return (
                  <NavLink
                    to={link.to}
                    key={idx}
                    onClick={() => setShow(!show)}
                    className={"hover:bg-neutral-200 rounded-md p-2"}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNavBar;
