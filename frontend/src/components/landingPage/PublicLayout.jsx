import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const PublicLayout = () => {
  return (
    <>
        <Navbar/>
        <main className='bg-white'>
            <Outlet/>
        </main>
    </>
  )
}

export default PublicLayout