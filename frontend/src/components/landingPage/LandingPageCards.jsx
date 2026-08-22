import React from "react";
import {
  CalendarPlus,
  Users,
  BarChart3,
  Search,
  Ticket,
  QrCode,
} from "lucide-react";

const LandingPageCards = ({ step }) => {
    const Icon = step.icon;
  return (
    <div
      className=" w-full
  rounded-2xl
  border border-[#E8E8F0]
  bg-white
  px-6 py-7
  shadow-[0_8px_30px_rgba(15,23,42,0.05)]
  transition-all duration-300
  hover:-translate-y-1
  hover:shadow-[0_12px_35px_rgba(91,75,255,0.10)]"
    >
      <div className="h-15 flex justify-center items-center">
        {<Icon className="active" size={42} strokeWidth={1.8} />}
      </div>
      <div className="w-full flex flex-col items-center">
        <span className="text-[12px] text-center font-medium">
          {step.step}. {step.title}
        </span>
        <span className="text-[12px] text-center text-neutral-400 ">
          {step.description}
        </span>
      </div>
    </div>
  );
};

export default LandingPageCards;
