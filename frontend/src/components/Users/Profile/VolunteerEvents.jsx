import { CheckCircle, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const VolunteerEvents = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  async function getVolunteerEventCount() {
    try {
      const response = await api.get(
        "/api/v1/user/all/volunteers/events/count",
      );
      setCount(response.data.userVoulnteersEvents);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVolunteerEventCount();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
            <Users size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Volunteer Activity</h2>

            <p className="text-sm text-slate-500">
              Your contribution to events
            </p>
          </div>
        </div>

        <div className=" gap-4 mt-6">
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Users size={16} />
              Volunteer Events
            </div>

            <p className="text-2xl font-bold text-slate-900 mt-2">{count}</p>
          </div>

        </div>
        <button
        onClick={()=> navigate('/user/volunteer/?filter=completed')}
          type="button"
          className="
                mt-5
                w-full
                border border-blue-200
                text-blue-600
                hover:bg-blue-50
                py-3
                rounded-xl
                text-sm
                font-medium
                transition
              "
        >
          View Volunteer History
        </button>
      </div>

    </div>
  );
};

export default VolunteerEvents;
