import React from "react";
import AddVolunteerForm from "./AddVolunteerForm";
import { useParams } from "react-router-dom";

const AddVolunteeers = () => {
  return (
    <div className="min-h-screen gap-8 w-full p-2 md:p-4 flex flex-col">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-semibold text-indigo-600 md:text-2xl">
          Setup your voulnteer invites
        </span>
        <span className="text-xs md:text-sm text-wrap text-neutral-700">
          Genrate a secure , single use or multiuse link to onboard your event
          staff quickly and efficiently.
        </span>
      </div>
      <AddVolunteerForm/>
    </div>
  );
};

export default AddVolunteeers;
