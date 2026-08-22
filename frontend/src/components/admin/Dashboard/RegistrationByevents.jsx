import React from 'react'
import RegstrationSummaryCards from './RegstrationSummaryCards'

const RegistrationByevents = ({data}) => {
    console.log(data)
  return (
    <div className='h-70 flex flex-col select-none gap-3 overflow-hidden overflow-y-scroll bar w-full md:w-[30%] p-3 rounded-xl border border-gray-300'>
        <div className='flex justify-between gap-5 items-center'>
            <h1>Registration Per Events</h1>
        </div>
        <div className='flex flex-col gap-4'>
            {
                data?.map((event,idx)=>{
                    return   <RegstrationSummaryCards event={event} key={idx}/>
                })
            }
     
        </div>
    </div>
  )
}

export default RegistrationByevents