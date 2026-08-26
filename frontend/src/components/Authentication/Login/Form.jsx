import React, { useContext, useState } from "react";
import { Calendar } from "lucide-react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userContext } from "../../../context/UserContext";
import api from "../../../api/axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const { user, setUser } = useContext(userContext);

  async function submitHandler(data) {
    if (loading) {
      return;
    }

    setLoading(true);
    console.log(data);
    try {
      const response = await api.post(`/api/v1/auth/login`, data);
      const loggedInUser = response.data.user;

      setUser(response.data.user);

      if (loggedInUser.role === "organizer") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

      reset();
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" rounded-md  w-[95%] md:w-120 gap-10  p-5 flex flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
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

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
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

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <label
              className="text-xs font-black/40  font-semibold "
              htmlFor="password"
            >
              Password
            </label>
            <NavLink to={'/forget/password/request?'} className='text-[10px] text-blue-500 font-medium' >FORGOT PASSWORD</NavLink>
          </div>
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

        {error && (
          <div>
            <span className="text-xs text-red-600">{error}</span>
          </div>
        )}

        <div className="flex justify-center mt-5">
          <button
            disabled={loading}
            className={`${loading ? "bg-[#877eeb] " : ""} w-full p-2 cursor-pointer  bg-[#5B4BFF] rounded-md text-white`}
          >
            Login
          </button>
        </div>

        <div className="flex text-sm justify-center mt-8">
          <span>
            Dont have an account?
            <NavLink to={"/register"} className="text-[#5B4BFF]">
              Register
            </NavLink>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Form;
