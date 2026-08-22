import React from 'react'
import TopPerformingEventsCards from './TopPerformingEventsCards'
import { TrendingUp } from 'lucide-react'

const TopPerformingEvents = ({data}) => {
  return (
    <div className='60 flex flex-col gap-5 select-none overflow-y-scroll bar overflow-hidden w-full p-3 md:w-[70%] border border-gray-300 rounded-xl'>
        <div className='flex justify-between gap-2'>
            <h1 className='md:text-sm text-xs flex gap-2 font-medium items-center '>Top Performing Events <TrendingUp size={20} className='text-green-600'/></h1>
            <span className='text-xs text-green-600'>PUBLISHED</span>
        </div>
        <div className='flex flex-col gap-3 '>
            {
                data?.map((event,idx)=>{
                    return   <TopPerformingEventsCards key={event._id} data={event} index={idx}/>
                })
            }
        </div>
    </div>
  )
}

export default TopPerformingEvents