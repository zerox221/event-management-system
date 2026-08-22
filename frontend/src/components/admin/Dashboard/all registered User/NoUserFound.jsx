import React from "react";
import { UsersRound } from "lucide-react";

const NoUsersFound = () => {
  return (
    <div className="flex min-h-100 w-full flex-col items-center  rounded-2xl  p-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        <UsersRound size={32} className="text-indigo-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">
        No Users Found
      </h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        There are currently no users matching your search criteria.
      </p>
    </div>
  );
};

export default NoUsersFound;