import React, { useContext } from 'react'
import EventCardsVolunteers from './EventCardsVolunteers'
import { userContext } from '../../../../context/UserContext'

const Volunteers = () => {
  const {events} = useContext(userContext);

  return (
    <div className='min-h-screen w-full flex flex-col gap-4 p-3 md:p-4'>
      <div className='flex flex-col '>
        <span className='md:text-2xl text-xl text-[#5B4BFF] font-semibold'>Select Event</span>
        <span className='text-sm md:text-xl text-neutral-600'>Choose an event to see volunteers and recruit volunteers.</span>
       
      </div>
      <div className='md:h-screen  px-2 bar md:overflow-y-scroll flex  flex-wrap  items-start  gap-5 w-full  py-4'>
          {
            events.map((event)=>{
              return  <EventCardsVolunteers key={event._id} event={event}/>
            })
          }
      </div>
    </div>
  )
}

export default Volunteers