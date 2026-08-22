import React, { useState } from 'react'
import EventForm from './EventForm'

const CreateEvent = () => {
  const [loading,setLoading] = useState(false);

  return (
    <div className='min-h-screen relative  flex flex-col gap-5 w-full p-3 md:p-5'>
      {loading && 
      <div className='absolute z-50 top-0 left-0 h-full w-full bg-gray-50 opacity-30 backdrop-blur-8xl'>

      </div>}
      {/* headings */}
      <div className='flex flex-col'>
          <h1 className='text-lg md:text-xl font-semibold '>Create New Event</h1>
          <span className='text-xs md:text-sm text-gray-400'>Fill in the details to publish your next event to the hub.</span>
      </div>
      <EventForm setLoading={setLoading} loading={loading}  eventDate={""}/>
    </div>
  )
}

export default CreateEvent