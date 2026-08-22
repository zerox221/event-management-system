import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../../api/axios';
import EventInfo from './EventInfo';

const EventDetails = () => {
    const {id} = useParams();
    const [event , setEvent] = useState(null);
    async function fetchEvent(){
        try {
            const response = await api.get(`/api/v1/admin/get/event/${id}`);
            console.log(response.data)
            setEvent(response.data.event);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        fetchEvent();
    },[])

  return (
    <div className='min-h-screen w-full'>
        {/* event poster */}
        <div className='w-full h-40 bg-gray-400'>
            <img className='h-full w-full object-cover' src={event?.poster.url} alt="" />
        </div>
        <EventInfo event={event}/>
    </div>
  )
}

export default EventDetails