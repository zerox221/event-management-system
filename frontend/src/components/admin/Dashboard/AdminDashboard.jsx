import React from "react";
import EventsInfoCards from "./EventsInfoCards";
import api from "../../../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck2,
  UserRoundIcon,
  Users,
} from "lucide-react";
import RegistrationByevents from "./RegistrationByevents";
import TopPerformingEvents from "./TopPerformingEvents";
import TopVolunteer from "./TopVolunteer";
import ActivityStrem from "./ActivityStrem";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";

const AdminDashboard = () => {

  const {topPerformingEvents,summary,data,EventsSummary} = useContext(userContext);
  console.log("event summary",EventsSummary)

  const summaryObj = [
{ name: "total Regi..", value: summary?.totalRegisteredUsers, icon: Users },
    {
      name: "checked-in",
      value: summary?.totalAttendedUsers,
      icon: UserCheck2,
    },
    { name: "totalEvents", value: summary?.totalEvents, icon: Calendar },
    { name: "completed", value: summary?.completedEvents, icon: CheckCircle2 },
    { name: "upcoming", value: summary?.upcomingEvents, icon: Clock },
    { name: "volunteer", value: summary?.totalVolunteers, icon: UserRoundIcon },
  ]

  summaryObj.forEach((summary)=>{
    EventsSummary.push(summary)
  })

  return (
    <div className="min-h-screen select-none md:h-screen md:p-4  p-2 flex flex-col gap-10 overflow-y-scroll">
      <div className="min-h-20 mt-5 ">
        <h1 className="text-xl md:text-2xl font-semibold">Welcome Organizer</h1>
        <span className="text-sm text-neutral-600">
          Manage your events , registration and attendance from one cohesive
          command center
        </span>
      </div>

      <div>
        <div className="flex gap-4 items-center w-full bar  overflow-x-scroll">
          < NavLink to={'/admin/create/event'} className="border text-sm bg-indigo-600 border-gray-100 shrink-0 p-1 px-2 md:p-2 md:px-4 text-neutral-100 rounded-xl">
            Create Event
          </NavLink>
          <NavLink
          to={'view/all/registered/users'}
          className="border text-sm border-gray-300 shrink-0 p-1 px-2 md:p-2 md:px-4 text-neutral-700 rounded-xl">
            View Registrations
          </NavLink>
        </div>
      </div>

      <div className="h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4   md:gap-6  w-full">
        {EventsSummary?.map((event, idx) => {
          return <EventsInfoCards key={idx} event={event} />;
        })}
      </div>

      <div className="h-full  w-full flex md:flex-row flex-col gap-6 md:gap-2">
        <TopPerformingEvents data={topPerformingEvents || []} />
        <RegistrationByevents data={data || []} />
      </div>

      <div className="w-full">
        <TopVolunteer />
      </div>
      <div className="w-full">
        <ActivityStrem />
      </div>
    </div>
  );
};

export default AdminDashboard;
