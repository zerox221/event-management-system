import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSlideBar from './Dashboard/AdminSlideBar'

const AdminLayout = () => {
  return (
    <div className='flex md:flex-row bg-[#F8F7FF] flex-col'>
      <AdminSlideBar/>
        <main className='w-full'>
          <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout