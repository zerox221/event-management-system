import React from "react";

const RegisteredUsersSkeleton = () => {
  return (
    <div className="w-full animate-pulse">

      {/* User Rows */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="items-center justify-between flex gap-4 rounded-xl border border-gray-200 p-4"
          >

            <div className="col-span-4 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

              <div className="flex flex-col gap-2">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-3 w-40 rounded bg-gray-200" />
              </div>
            </div>

            <div className="col-span-3 flex justify-end">
              <div className="h-9 w-24 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsersSkeleton;