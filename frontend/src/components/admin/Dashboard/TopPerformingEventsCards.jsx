import React from 'react'

const TopPerformingEventsCards = ({data,index}) => {
  return (
    <div className='min-h-10 bg-indigo-50  rounded-xl border border-gray-200 p-2'>
        <div className='flex gap-4 items-center'>
            <span className='bg-indigo-100 flex justify-center items-center font-semibold h-10 w-10 rounded-md text-indigo-600'>0{index+1}</span>
            <div className='md:text-sm text-xs text-neutral-700 flex flex-col '>
                <h3 className='font-semibold text-sm'>{data?.eventName}</h3>
                <span className='text-xs'>{data?.registrationCount} registration</span>
            </div>
        </div>
    </div>
  )
}
export default TopPerformingEventsCards