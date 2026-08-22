import { ArrowUpFromLine, Upload } from "lucide-react";
import { React, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../../../context/UserContext";

const EventForm = ({setLoading,loading}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState(false);
 
  const { fetchEvents } = useContext(userContext);

  async function formSubmitHnadler(data) {
    if (loading) return; // Prevent multiple submissions while loading
    console.log(data);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("titel", data.titel);
      formData.append("description", data.description);
      formData.append("eventDate", data.eventDate);
      formData.append("time", data.time);
      formData.append("location", data.location);
      formData.append("poster", data.poster[0]);
      formData.append("maxParticpants", data.maxParticpants);
      formData.append("duration", data.duration);
      formData.append("category",data.category);

      const response = await api.post("/api/v1/admin/create/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event created successfully:", response.data);
      toast.success("Event created successfully!");
      fetchEvents();
      reset(); // 
    } catch (error) {
      setLoading(false);
      setError(
        error.response.data.message ||
          "An error occurred while creating the event.",
      );
      console.log("error in creating event", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(formSubmitHnadler)}
      className="flex flex-col relative  md:flex-row gap-5"
    >
      {/*first section of the form  */}
      <div className="flex md:w-[60%] flex-col gap-5">
        <div className="flex flex-col gap-5 p-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div>
            <span className="font-semibold ">Event details</span>
          </div>
          <div className="flex flex-col gap-3   ">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" htmlFor="titel">
                Event Titel
              </label>
              <input
                {...register("titel", {
                  required: "*required",
                })}
                id="titel"
                className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
                type="text"
                placeholder="eg. annul fest event"
              />
              {errors.titel && (
                <span className="text-xs text-red-600">
                  {errors.titel.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" htmlFor="description">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "*required",
                })}
                id="description"
                rows={5}
                className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
                type="text"
                placeholder="provide a detailed description for your event"
              />
              {errors.description && (
                <span className="text-xs text-red-600">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex  w-full flex-col gap-3 p-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div>
            <span className="font-semibold ">Schedule & Location</span>
          </div>

          <div className="flex md:flex-row justify-between gap-5 flex-col">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" htmlFor="date">
                Event Date
              </label>
              <input
                {...register("eventDate", {
                  required: "*required",
                })}
                id="date"
                className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
                type="date"
              />
              {errors.eventDate && (
                <span className="text-xs text-red-600">
                  {errors.eventDate.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" htmlFor="time">
                Time
              </label>
              <input
                {...register("time", {
                  required: "*required",
                })}
                id="time"
                className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
                type="time"
              />
              {errors.time && (
                <span className="text-xs text-red-600">
                  {errors.time.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" htmlFor="location">
              Location
            </label>
            <input
              {...register("location", {
                required: "*required",
              })}
              id="location"
              className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
              type="text"
              placeholder="eg. uttrakhand dehradun "
            />
            {errors.location && (
              <span className="text-xs text-red-600">
                {errors.location.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex md:w-[40%]  flex-col gap-5 p-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div>
          <div>
            <span className="font-semibold ">Poster Image</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label
                htmlFor="poster"
                className="
    flex h-40 w-full cursor-pointer
    flex-col items-center justify-center
    gap-3 rounded-xl
    border border-dashed border-[#D8D5FF]
    bg-[#FAFAFF]
    hover:bg-[#F5F3FF]
  "
              >
                <Upload size={40} className="text-[#5B4BFF]" />
                <p className="text-center text-sm font-medium">
                  Click or drag Image to upload
                </p>
                <span className="text-xs text-gray-400">SVG GIF PNG JPEG</span>
                <input
                  {...register("poster", {
                    required: "*required",
                  })}
                  id="poster"
                  type="file"
                  className="sr-only"
                />
              </label>
              {errors.poster && (
                <span className="text-xs text-red-600">
                  {errors.poster.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">

            <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" htmlFor="category">
              Category
            </label>
            <input
              {...register("category", {
                required: "*required",
              })}
              id="Category"
              className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
              type="text"
              placeholder="enter Category"
            />
            {errors.category && (
              <span className="text-xs text-red-600">
                {errors.category.message}
              </span>
            )}
          </div>





          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" htmlFor="duration">
              Duration
              <span className="text-[8px] md:text[10px] font-light text-red-500">
                {" "}
                *just enter the number of hours for duration
              </span>
            </label>
            <input
              {...register("duration", {
                required: "*required",
                valueAsNumber: true,
                validate: (value) =>
                  Number.isInteger(value) || "Duration must be a whole number",
              })}
              id="duration"
              className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
              type="number"
              placeholder="enter duration of event in hr"
            />
            {errors.duration && (
              <span className="text-xs text-red-600">
                {errors.duration.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold" htmlFor="capacity">
              Capacity
            </label>
            <input
              {...register("maxParticpants", {
                required: "*required",
              })}
              id="capacity"
              className="p-2 border border-gray-200 rounded-md outline-none placeholder:text-gray-300 text-sm"
              type="number"
              placeholder="Enter no of participants "
            />
            {errors.maxParticpants && (
              <span className="text-xs text-red-600">
                {errors.maxParticpants.message}
              </span>
            )}
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div>
          <button
            disabled={loading}
            className={`p-2 ${loading ? "bg-indigo-200 " : "bg-indigo-600"} flex gap-1 justify-center items-center  text-white rounded-md w-full text-center`}
          >
            <ArrowUpFromLine size={15} />
            Publish Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
