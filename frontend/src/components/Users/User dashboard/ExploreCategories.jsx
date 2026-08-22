import React from 'react'
import { useNavigate } from 'react-router-dom'

const ExploreCategories = () => {
    const navigate = useNavigate();

    const Categories = [{
        name : "Technology",
        style : "bg-blue-100 text-blue-500"
    },{
        name : "Music",
        style : "bg-teal-100 text-teal-500"
    },{
        name : "Sports",
        style : "bg-indigo-100 text-indigo-400"
    },{
        name : "Education",
        style : "bg-green-100 text-green-500"
    }]

  return (
    <div className=' min-h-30 flex flex-col gap-5 py-5 '>
            <div>
                <h1 className='text-sm  font-semibold'>Explore Categories</h1>
            </div>
            <div className='w-full flex gap-4 overflow-x-scroll bar'>
                    {
                        Categories.map((category,idx)=>{
                            return <span  key={idx} className={`${category.style} py-1 px-3 text-xs select-none cursor-pointer md:text-sm rounded-xl`}>{category.name}</span>
                        })
                    }
            </div>  
    </div>
  )
}
export default ExploreCategories