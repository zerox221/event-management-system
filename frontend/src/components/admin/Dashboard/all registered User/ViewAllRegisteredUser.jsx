import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import RegisteredUserCard from "../../Events/registered users/RegisteredUserCard";
import Searchusers from "./Searchusers";
import NoUsersFound from "./NoUserFound";
import Loader from "../../../loaders/AppLoading";
import RegisteredUsersSkeleton from "../../../loaders/SkeletonScreen";

const ViewAllRegisteredUser = () => {
  const [loading, setLoading] = useState(false);
  const [registeredUsers, setRegsiteredUsers] = useState([]);

  async function fetchRegisteredUsers() {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/admin/get/all/registered/User");
      setRegsiteredUsers(response.data.AllRegistrations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-5 md:gap-8 w-full p-4 md:p-7 ">
      <div className="flex flex-col gap-1">
        <h1 className="md:text-2xl text-xl font-semibold ">
          All registered User
        </h1>
        <span className="text-sm text-neutral-700 ">
          search all the registered users by their name or email Id
        </span>
      </div>
      <div className="w-full">
        <Searchusers
          setUsers={setRegsiteredUsers}
          fetchAllUsers={fetchRegisteredUsers}
        />
      </div>
      <div>
        <span>Total Registration {registeredUsers?.length}</span>
      </div>
      <div className="flex flex-col gap-6">
        {loading ? (
          <RegisteredUsersSkeleton />
        ) : registeredUsers.length !== 0 ? (
          registeredUsers?.map((data) => {
            return (
              <RegisteredUserCard key={data._id} data={data.userDetails} />
            );
          })
        ) : (
          <NoUsersFound />
        )}
      </div>
    </div>
  );
};

export default ViewAllRegisteredUser;
