import React, { useContext } from 'react'
import { userContext } from '../../../context/UserContext'
import UserNavBar from '../UserNavBar';
import SearchBar from './SearchBar';
import FeaturedEvents from './FeaturedEvents';
import ExploreCategories from './ExploreCategories';
import UpcomingEvents from './UpcomingEvents';

const UserDashboard = () => {
  const {user} = useContext(userContext);  
  return (
    <div className='min-h-screen w-full flex flex-col'> 
      <div className='h-full w-full p-4 md:p-7'>
        <SearchBar/>
        <FeaturedEvents/>
        <ExploreCategories/>
        <UpcomingEvents/>
      </div>
    </div>
  )
}

export default UserDashboard