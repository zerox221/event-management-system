import { Mail, Phone, UserRound } from "lucide-react";
import React from "react";

const VolunteersInfo = ({ user }) => {
  const phone = user?.additionalInfo?.phone;

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-indigo-100 hover:shadow-md">
      
      <div className="flex min-w-0 items-center gap-3">
        
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-indigo-50 ring-2 ring-indigo-50">
          {user?.profile?.url ? (
            <img
              className="h-full w-full object-cover"
              src={user.profile.url}
              alt={user?.name || "Volunteer"}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-indigo-600">
              <UserRound size={20} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {user?.name}
          </h3>

          <p className="mt-0.5 truncate text-xs text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <a
          href={`mailto:${user?.email}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-xs font-medium text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Mail size={15} />
          <span>Message</span>
        </a>
        <a
          href={phone ? `tel:${phone}` : undefined}
          className={`flex w-11 items-center justify-center rounded-lg border border-gray-200 transition ${
            phone
              ? "text-gray-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              : "cursor-not-allowed bg-gray-50 text-gray-300"
          }`}
          onClick={(e) => {
            if (!phone) e.preventDefault();
          }}
          title={phone ? `Call ${phone}` : "Phone number unavailable"}
        >
          <Phone size={16} />
        </a>
      </div>
    </div>
  );
};

export default VolunteersInfo;