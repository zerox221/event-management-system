import React, { useContext, useState } from "react";
import { Calendar } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userContext } from "../../../context/UserContext";
import api from "../../../api/axios";

const RegistrForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {email,setEmail} = useContext(userContext);
  const navigate = useNavigate();

  async function submitHandler(data) {
    if(loading){
        return;
    }
   
    console.log(data);
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
         setLoading(true);
        const response = await api.post(`/api/v1/auth/register`,data,)
        console.log(response.data);
        setEmail(response.data.email);
        navigate('/verify');
        reset();
    } catch (error) {
        console.log(error.response);
        setError(error.response.data.message)
    }
    finally{
        setLoading(false);
    }
  }
  return (
    <div className=" rounded-md  w-[95%] md:w-120 gap-10  p-5 flex flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      {/* form headings  */}
      <div className="flex gap-3 items-center flex-col">
        <div className="flex w-fit p-2 rounded-md bg-[#5B4BFF] ">
          <Calendar className="text-white" size={40} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-semibold">Event Flow</span>
          <span className="text-lg font-medium text-gray-800">
            Welcome Back
          </span>
        </div>
      </div>
      {/* form */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label
            className="text-xs font-semibold font-black/40"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            {...register("name", {
              required: "*required",
            })}
            type="text"
            placeholder="Alex"
            className="w-full
    rounded-md
    border border-[#c2c6d0]
    bg-white
    px-4 py-3
    text-sm text-[#111827]
    placeholder:text-[#94A3B8]
    outline-none
     focus:ring-1
    ring-indigo-400
   "
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-xs font-semibold font-black/40"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            {...register("email", {
              required: "*required",
            })}
            type="email"
            placeholder="Alex@gmail.com"
            className="w-full
    rounded-md
    border border-[#c2c6d0]
    bg-white
    px-4 py-3
    text-sm text-[#111827]
    placeholder:text-[#94A3B8]
    outline-none
     focus:ring-1
    ring-indigo-400
   "
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-black/40  font-semibold "
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "*required",
              })}
              type="password"
              id="password"
              placeholder="enter password"
              className="  rounded-md
             border border-[#c2c6d0]
             bg-white
           px-4 py-3
            text-sm text-[#111827]
    placeholder:text-[#94A3B8]
    outline-none
    focus:ring-1
    ring-indigo-400
    "
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* confirm password field if the form is off signup type */}

          <div className="flex flex-col gap-1">
            <label
              className="text-xs font-semibold font-black/40"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "*required",
              })}
              type="password"
              placeholder="confirm password"
              className="w-full
    rounded-md
    border border-[#c2c6d0]
    bg-white
    px-4 py-3
    text-sm text-[#111827]
    placeholder:text-[#94A3B8]
    outline-none
     focus:ring-1
    ring-indigo-400
   "
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div>
    {error && <span className="text-xs text-red-600">{error}</span>}
        </div>

        <div className="flex justify-center mt-5">
          <button disabled={loading} className={`w-full p-2 ${loading ? "bg-[#938dd2]" : ""} bg-[#5B4BFF] rounded-md text-white`}>
            Create Account
          </button>
        </div>

        <div className="flex text-sm justify-center mt-8">
          <span>
            already have an account?{" "}
            <NavLink to={"/login"} className="text-[#5B4BFF]">
              login
            </NavLink>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegistrForm;
