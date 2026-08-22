import React from "react";

const RegisteredUserCard = ({ data, status }) => {
  return (
    <div className="p-2 flex flex-col gap-1 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex gap-1 items-center">
        <div className="md:h-15 h-10 w-10 md:w-15 overflow-hidden rounded-full bg-amber-600">
          <img
            className="h-full w-full object-cover"
            src={data?.profile?.url || data?.profile}
            alt=""
          />
        </div>
        <div className="flex flex-col leading-4">
          <span className="md:text-lg text-sm  md:font-medium">
            {data?.name}
          </span>
          <span className="text-xs md:text-sm">{data?.email}</span>
        </div>
      </div>
      <div className="flex text-neutral-600 justify-between text-xs md:text-sm">
        <div>Regsiteration Date</div>
        <div>{data?.createdAt.split("T")[0]}</div>
      </div>

      {status && (
        <div className="flex text-neutral-600 justify-between text-xs md:text-sm">
          <div>Status</div>
          <div className="bg-indigo-200 px-2  rounded-2xl">{status}</div>
        </div>
      )}
    </div>
  );
};

export default RegisteredUserCard;
