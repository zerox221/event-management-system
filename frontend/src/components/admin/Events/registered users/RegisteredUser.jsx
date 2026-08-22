import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../../api/axios';
import RegisteredUserCard from './RegisteredUserCard';

const RegisteredUser = () => {
  const [registeredUsers,setRegisteredUsers] = useState([]);
  const obj = useParams();
  console.log(obj);

  async function fetchRegisteredUsers(){
    try {
      const response = await api.get(`api/v1/admin/registered/users/${obj.id}`);
      console.log(response.data);
      setRegisteredUsers(response.data.registerUsers);
      console.log(response.data.registerUsers)
    } catch (error) {
        console.log(error.response.data);
    }
  }

  useEffect(()=>{
    fetchRegisteredUsers();
  },[])
  return (
    <div className='min-h-screen w-full flex flex-col gap-4 p-3 md:p-4'>
          <div>
            <span className='text-indigo-600 md:text-2xl font-medium'>{registeredUsers[0]?.event?.titel} </span>
            <h2 className='md:text-2xl text-xl font-semibold'>Registered Users</h2>
          </div>
          <div className=' bar md:h-screen flex flex-col gap-4 md:overflow-y-scroll md:p-2'>
            {
              registeredUsers?.map((data)=>{
                return  <RegisteredUserCard key={data._id} status= {data?.status} data={data.user} />
              })
            }
             
          </div>
    </div> 
  )
}

export default RegisteredUser