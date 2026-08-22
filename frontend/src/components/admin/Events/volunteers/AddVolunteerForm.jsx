import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../../api/axios";
import { useParams } from "react-router-dom";
import { CopyCheck, File } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const AddVolunteerForm = () => {
  const [link, setLink] = useState(false);
  const [copy, setCopy] = useState(false);
  const [loading,setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  if (copy) {
    const time = setTimeout(() => {
      setCopy(false);
    }, 5000);
  }

  const handleCopy = async (link) => {
    await navigator.clipboard.writeText(link);
    setCopy(true);
  };
  async function fetchLinkHandler(data) {
    if(loading){
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(
        `/api/v1/admin/add/volunteer/${id}`,
        data,
      );
      console.log(response);
      setLink(response.data.link);
    } catch (error) {
      console.log(error.response);
    } finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleSubmit(fetchLinkHandler)}
        className="w-full min-h-50 flex flex-col p-3 rounded-md gap-6 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" htmlFor="volunteer">
            How many volunteers do you need
          </label>
          <input
            {...register("maxVolunteers", {
              required: "*required",
            })}
            type="number"
            className="p-2 text-sm rounded-md placeholder:text-gray-400 outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          <span
            id="volunteer"
            className="p-2 bg-red-200 rounded-md text-red-600 text-xs md:text-sm"
          >
            this cannot be edited later. To change you have to delete link or
            remove all the voulnteers
          </span>
          {errors.maxVolunteers && (
            <span className="text-xs text-red-500">
              {errors.maxVolunteers.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="text-xs font-medium" htmlFor="expire">
              Link expiration
            </label>
            <span className="md:text-sm text-xs text-neutral-500">
              Set how long th invite link will remain active. the value will be
              in minutes so enter in minutes
            </span>
          </div>
          <input
            {...register("time", {
              required: "*required",
            })}
            placeholder="enter in minute eg.15"
            type="number"
            className="p-2 text-sm rounded-md placeholder:text-gray-400 outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          {errors.time && (
            <span className="text-xs text-red-500">{errors.time.message}</span>
          )}
        </div>

        <div>
          <button
            disabled={link}
            className={`w-full ${link ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-90 hover:scale-99"} p-2 bg-indigo-600 text-neutral-200 rounded-md `}
          >
            {loading ? "Genrating..." : link ? "Genrated" : "Genrate Link"}
          </button>
        </div>
      </form>

      {/* links genrated  */}

      <AnimatePresence>
        {link && (
          <motion.div
            initial={{
              y: 20,
            }}
            animate={{
              y: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.2,
            }}
            exit={{
              y: 20,
            }}
            className="w-full relative flex flex-col gap-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-[0px_4px_12px_-4px_rgba(0,0,0,0.08)]"
          >
            <div className="text-indigo-600 font-semibold text-sm">
              Link generated successfully
            </div>

            <div className="text-sm text-slate-500 leading-relaxed">
              Share this secure link with your prospective volunteers. It
              expires based on your settings.
            </div>

            <div className="w-full flex items-center gap-3 p-2 rounded-lg border border-slate-200 bg-slate-50">
              <span className="flex-1 min-w-0 px-2 text-sm text-slate-700 break-all">
                {link}
              </span>

              <span
                onClick={() => handleCopy(link)}
                className="shrink-0 hover:scale-105 p-2 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
              >
                {copy ? <CopyCheck size={18} /> : <File size={18} />}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddVolunteerForm;
