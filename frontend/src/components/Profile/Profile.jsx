import React from 'react'
import { NavLink } from 'react-router-dom'
import ProfileCard from './ProfileCard'
import AdditionalInfo from './AdditionalInfo'
import Security from './Security'
import LogOut from '../Users/Profile/LogOut'

const Profile = () => {
          {/* <NavLink to={'/admin/edit/profile'}>edit</NavLink> */}
  return (
    <div className='min-h-screen w-full flex flex-col p-2 md:p-4 '>
      <div className='w-full flex flex-col gap-8'>
      <ProfileCard/>
      <AdditionalInfo/>
      <Security/>
      <LogOut/>
      </div>
    </div>
  )
}

export default Profile