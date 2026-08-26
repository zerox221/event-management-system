import React from "react";
import { ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const EnterDetailsForForget = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { forgetPasswordEmail, setForgetPasswordEmail } =
    useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false);

  async function forgetPasswordHandler(data) {
    if (loading) {
      return true;
    }
    const { email } = data;
    setForgetPasswordEmail(email);
    try {
      setLoading(true);
      const response = await api.post("/api/v1/auth/forget/password/otp", data);
      console.log(response.data.message);
      if (response.data.success) {
        navigate("/forget/password/verfiy");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    const time = setTimeout(()=>{
        setError(false);
    },5000)

    return (()=>{
        clearTimeout(time);
    })
  })

  return (
    <div className="h-screen py-15 md:py-20  w-full flex flex-col bar items-center gap-10 p-2 ">
      <div className="min-h-70  md:w-100 relative w-full border p-4  border-gray-300 rounded-xl ">
        <form
          onSubmit={handleSubmit(forgetPasswordHandler)}
          className="flex  flex-col gap-8 h-full w-full "
        >
          <div className="flex flex-col gap-2 items-center">
            <h1 className="md:text-2xl text-xl font-semibold ">
              Forgot Password
            </h1>
            <span className="text-sm text-neutral-600 text-center">
              Enter your email address to recieve a password recent code.
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-neutral-400">
              EMAIL ADDRESS
            </label>
            <input
              {...register("email", {
                required: "*required",
              })}
              type="email"
              className="p-2 w-full rounded-md outline-none border border-gray-300 placeholder:text-neutral-200"
              placeholder="name@gmail.com"
            />
            {error && <span className="text-xs text-red-600">{error}</span> }
            {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col gap-4">
            <motion.button
            disabled ={loading}
              whileTap={{
                scale: 0.95,
              }}
              className={`p-3 rounded-md text-sm text-white flex  justify-center  bg-indigo-600`}
            >
              <span>{loading? "Sending...":"Send Code"}</span>
              <ChevronRight size={20} />
            </motion.button>
          </div>
          <div className="w-full flex  justify-center  ">
            <NavLink
              to={"/login"}
              className="text-sm  text-blue-500 underline font-medium"
            >
              Return To login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterDetailsForForget;
