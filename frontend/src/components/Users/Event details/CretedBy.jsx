import React from 'react'

const CretedBy = ({event}) => {
  return (
    <div className='min-h-30 flex flex-col gap-4 p-4 text-neutral-700 w-full rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        <div>
            <h1 className='font-medium'>Created by </h1>
        </div>
        <div className='flex  gap-3 items-center text-wrap text-sm '>
            <div className='bg-gray-200 h-15 w-15 rounded-md overflow-hidden'>
                    <img className='h-full w-full object-cover' src={event?.admin?.profile.url} alt="" />
            </div>
            <div className='flex flex-col'>
                <span>{event?.admin?.name}</span>
            <span className='break-all text-xs md:text-sm'>{event?.admin?.email}</span>
            </div>
        </div>
    </div>
  )
}

export default CretedBy