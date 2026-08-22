import React from "react";
import LandingPageCards from "./LandingPageCards";
import {
  CalendarPlus,
  Users,
  BarChart3,
  Search,
  Ticket,
  QrCode,
} from "lucide-react";

const organizerSteps = [
  {
    step: 1,
    icon: CalendarPlus,
    title: "Create Event",
    description: "Organizers can easily create events with all the details.",
  },
  {
    step: 2,
    icon: Users,
    title: "Manage & Share",
    description:
      "Share event links, invite volunteers, and manage registrations.",
  },
  {
    step: 3,
    icon: BarChart3,
    title: "Track & Analyze",
    description:
      "Scan QR codes, track check-ins, and analyze event performance.",
  },
];

const userSteps = [
  {
    step: 1,
    icon: Search,
    title: "Discover Events",
    description: "Users can browse and search events that interest them.",
  },
  {
    step: 2,
    icon: Ticket,
    title: "Register & Join",
    description: "Register for events and get your digital QR ticket.",
  },
  {
    step: 3,
    icon: QrCode,
    title: "Check-in & Enjoy",
    description:
      "Show your QR at the venue, get checked-in, and enjoy the event!",
  },
];

const LandingPageInfo = () => {
  return (
    <div className=" w-full font-sans ">
      <div className="w-full flex-col items-center flex justify-center">
        <span className="text-xs font-bold active">HOW IT WORKS</span>
      </div>
      {/* for organisers steps  */}
      <div className="w-full flex-col gap-8  flex h-auto py-5">
        <div className="w-full flex flex-col gap-4 ">
          <div className="text-center">
            <span className="text-xl font-medium">FOR ORGANIZER'S</span>
          </div>
          <div className="flex md:flex-row flex-col gap-10 w-full justify-around">
            {organizerSteps.map((step,idx) => {
              return <LandingPageCards key={idx} step={step} />;
            })}
          </div>
        </div>
        {/* for users steps */}

        <div className="w-full flex flex-col gap-4 ">
          <div className="text-center">
            <span className="text-xl font-medium">FOR USER'S</span>
          </div>
          <div className="flex md:flex-row flex-col w-full gap-10 justify-around">
            {userSteps.map((step,idx) => {
              return <LandingPageCards key={idx} step={step} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageInfo;
