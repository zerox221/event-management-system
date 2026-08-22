import React from 'react'
import ScannerScreen from './ScannerScreen'

import { useNavigate } from 'react-router-dom'

const CommonRoute = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col w-full  justify-center items-center p-2'>
      <ScannerScreen/>
    </div>
  )
}

export default CommonRoute