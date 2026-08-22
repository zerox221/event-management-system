import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../landingPage/Navbar'
import UserNavBar from './UserNavBar'

const UserLayout = () => {
  return (
    <div>
      <UserNavBar/>
        <Outlet/>
    </div>
  )
}
export default UserLayout