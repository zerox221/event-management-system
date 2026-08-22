import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";

const AdditionalInfo = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(userContext);
  const [phone, setPhone] = useState(user?.additionalInfo?.phone || "");
  const [address, setAddress] = useState(user?.additionalInfo?.address || "");
  const [bio, setBio] = useState(user?.additionalInfo?.bio || "");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [change,setChange] = useState(false);

  async function submitAdditionalDetails(data) {
    if (loading) {
      return;
    }
    if(!change){
      setError("update some values");
      return 
    }

    console.log(data);
    setLoading(true);
    try {
      const response = await api.post("/api/v1/user/additional/info", data);
      console.log(response.data.message);
      toast.success("inofrmation updated");
    } catch (error) {
      console.log(error.response.data.message || "something went wrong");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-40 w-full gap-5 flex flex-col p-3     rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div>
        <span className="md:text-xl text-neutral-700 font-semibold ">
          Additional Info
        </span>
      </div>
      <form
        onSubmit={handleSubmit(submitAdditionalDetails)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs md-text-sm font-medium " htmlFor="phone">
            Phone
          </label>
          <input
            {...register("phone", {
              required: "*required",
            })}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setChange(true);
            }}
            type="tel"
            id="phone"
            placeholder="+91 89429000"
            className="p-3 w-full rounded-md  placeholder:text-neutral-300 text-neutral-500   outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          {errors.phone && (
            <span className="text-xs text-red-600">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs md-text-sm font-medium " htmlFor="address">
            Address
          </label>
          <input
            {...register("address", {
              required: "*required",
            })}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            setChange(true);
            }}
            type="text"
            id="address"
            placeholder="city country"
            className="p-3 w-full  placeholder:text-neutral-300 text-neutral-500  rounded-md outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          {errors.address && (
            <span className="text-xs text-red-600">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs md-text-sm font-medium " htmlFor="bio">
            Bio
          </label>
          <textarea
            {...register("bio", {
              required: "*required",
            })}
            value={bio}
            onChange={(e) => {
              setBio(e.target.value)
              setChange(true);
            }}
            type="tel"
            id="bio"
            rows={6}
            placeholder="about"
            className="p-3 w-full placeholder:text-neutral-300 text-neutral-500  rounded-md outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          {errors.bio && (
            <span className="text-xs  text-red-600">{errors.bio.message}</span>
          )}
        </div>

        <div>
     {   error &&   <span className="text-xs  text-red-600">{error}</span>}
          <button disabled={loading} className={` ${loading ? "opacity-80" : ""} mt-4 w-full p-2 rounded-md bg-indigo-600 text-neutral-200 hover:opacity-95 cursor-pointer`}>
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalInfo;
