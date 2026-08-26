import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import { Pencil } from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-toastify";
const ProfileCard = () => {
  const [changing,setChnaging] = useState(false);
  const {fetchUser} = useContext(userContext);

  async function updateProfile(e) {
    if(changing){
      return;
    }
    setChnaging(true);
    console.log(e.target.files);
    const file = e.target.files[0];
    const formData = new FormData;
    formData.append('dp',file);
    try {
      const response = await api.put('/api/v1/user/change/dp',formData);
      console.log(response.data.message);
      toast.success("profile picture updated successfully");
      fetchUser();
    } catch (error) {
      console.log(error.response.data.message);
      toast.success(error.response.data.message);
    }
    finally{
      setChnaging(false);
    }
    
  }



  const { user } = useContext(userContext);
  console.log(user);
  return (
    <div className="min-h-40 flex-col gap-3 flex  items-center w-full p-2">
      <div className="md:h-35 md:w-35 h-25 w-25 relative bg-gray-600 overflow-hidden rounded-full">
        <img
          className="h-full w-full object-cover shrink-0"
          src={user?.profile.url}
          alt="profile"
        />
      </div>
      <div>
        <label  htmlFor="profile" className="bg-indigo-400  p-1 px-2 rounded-md text-white">{changing ?"changing...":"change profile"}</label>
        <input onChange={updateProfile} className="hidden" id="profile" type="file" placeholder="change profile" />
      </div>
      <div className="flex flex-col items-center text-neutral-600">
        <span className="text-xl font-semibold">{user?.name}</span>
        <span>{user?.email}</span>
        <span className="font-light mt-2 text-indigo-600 bg-indigo-200 px-2 rounded-2xl ">
          {user?.role}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
