import React from "react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {

  return (
    <div className="flex items-center  justify-between">
      <div className="flex h-auto  ">
        <div className="flex flex-col gap-4">
          <div className="text-4xl md:text-6xl md:font-bold font-medium">
            <h1>Manage events</h1>
            <h1 className="active">Connect People</h1>
          </div>
          <span className="flex text-xs  md:text-sm text-neutral-700 text-wrap">
            EventHub is a complete event management system that helps organizers <br/>
            create, manage, and track events effortlessly while users discover,<br/>
            register, and participate with ease.
          </span>
          <div>
            <NavLink to={'/login'} className="p-2 px-4 rounded-md text-white  bg-[#5B4BFF]">
              Get Started
            </NavLink>
          </div>
        </div>
        <div></div>
      </div>

      <div className="bg-amber-400 md:flex hidden h-auto">
        <div className="w-120">
          <img
            className="h-full w-full object-cover"
            src={"/landingPage.png"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
