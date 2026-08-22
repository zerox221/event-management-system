import React, { useState, useEffect } from "react";
import VolunteersInfo from "./VolunteersInfo";
import { useParams } from "react-router-dom";
import api from "../../../../api/axios";

const SeeVolunteers = () => {
  const { id } = useParams();
  const [volunteers, setVolunteers] = useState([]);


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
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-5 w-full p-3 md:p-4">
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl text-[#5B4BFF] font-semibold">
          Volunteers
        </span>
        <span className="text-xs neutral-600 md:text-sm">
          Manage your team for event name
        </span>
         <span className="text-neutral-500 mt-5">Volunteers for the events : {volunteers.length}</span>
      </div>
      {
        volunteers?.map((volunteer)=>{
            return <VolunteersInfo key={volunteer._id} user={volunteer} />
        })
      }
    </div>
  );
};

export default SeeVolunteers;
