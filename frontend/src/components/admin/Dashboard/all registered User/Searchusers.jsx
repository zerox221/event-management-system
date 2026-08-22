import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";

const Searchusers = ({setUsers,fetchAllUsers}) => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    search.trim('');
    if(search===""){
        fetchAllUsers()
        return;
    }
    const time = setTimeout(async ()=>{
        try {
            const response = await api.get(`/api/v1/admin/search/user/?query=${search}`);
            setUsers(response.data.user);
        } catch (error) {
         console.log(error);   
        }
    },500)
    return ()=>{
        clearTimeout(time);
    }
  }, [search]);

  return (
    <div className="min-h-15 w-full py-8 md:py-2">
      <div className="relative rounded-md">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="search Users"
          type="text"
          className="p-2 md:p-3  w-full rounded-md border text-neutral-600  border-neutral-100 outline-none placeholder:text-neutral-400 pl-10 md:pl-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        />
        <span className="absolute h-full left-2 top-0 flex items-center text-neutral-300">
          <Search size={20} />
        </span>
      </div>
    </div>
  );
};

export default Searchusers;
