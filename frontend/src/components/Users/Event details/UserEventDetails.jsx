import { Calendar, Check, Clock, MapPin, UserCheck2, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInformation from "./EventInformation";
import api from "../../../api/axios";
import { motion } from "framer-motion";
import CretedBy from "./CretedBy";
import { toast } from "react-toastify";

const UserEventDetails = () => {

    const [loading,setLoading] = useState(false);
  const { id } = useParams();
    const [event,setEvent] = useState(null);
  async function fetchEventDetails (){
    try {
        const response = await api.get(`/api/v1/user/get/details/${id}`);
        setEvent(response.data.event)
    } catch (error) {
        console.log(error);
    }
  }


  async function registerUserHandler(){
    if(loading){
        return;
    }
    setLoading(true);
    try {
        const response = await api.post(`/api/v1/user/registration/${id}`)
        toast.success(response.data.message);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    finally{
        setLoading(false);
    }
  }


  useEffect(()=>{
    fetchEventDetails();
  },[id])


  console.log(id);
  return (
    <div className=" min-h-screen w-full flex flex-col gap-4 p-4 md:p-8 ">
      <div className="h-50 md:h-90 relative w-full rounded-xl overflow-hidden ">
        <img
          className="h-full w-full object-cover"
          src={event?.poster?.url}
          alt="poster"
        />
        <div className="absolute bottom-3 left-5 ">
          <span className="text-white bg-indigo-400 p-1 px-3 text-xs rounded-xl">
            {event?.category || "" }
          </span>
          <h1 className="md:text-2xl text-xl font-semibold text-white">
            {event?.titel || "Event titel"}
          </h1>
          <div className="flex text-neutral-50  gap-1">
            <span className="flex gap-1 items-center text-xs md:text-sm">
              <Calendar size={15} />
              <span>{event?.eventDate.split('T')[0]}</span>
            </span>

            <span className="flex items-center gap-1 text-xs  md:text-sm">
              <MapPin size={15} />
              <span>{event?.location}</span>
            </span>
          </div>
        </div>
      </div>

      <EventInformation event={event} />

      <div className="min-h-30 flex flex-col gap-4 p-4 w-full rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div>
          <span>
            <h1 className="font-medium">About The Event</h1>
          </span>
        </div>
        <div>
          <span className="text-sm text-neutral-500">{event?.description}</span>
        </div>
      </div>

      <CretedBy event = {event}/>

      <div>
        <motion.button 
        disabled={loading}
        onClick={registerUserHandler}
        whileTap={{
            scale:0.96,
        }}
        className="bg-[#059266] text-neutral-50 p-2 w-full rounded-md items-center gap-1 flex justify-center"><Check size={20}/> {loading?"Securing your spot...":"Register"}</motion.button>
      </div>
    </div>
  );
};

export default UserEventDetails;
