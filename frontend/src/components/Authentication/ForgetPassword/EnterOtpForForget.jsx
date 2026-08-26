import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const EnterOtpForForget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { forgetPasswordEmail } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  if (!forgetPasswordEmail) {
    navigate("/login");
  }

  async function forgetPasswordHandler(data) {
    if (loading) {
      return;
    }
    const { otp } = data;
    console.log("email : ", forgetPasswordEmail);
    console.log("otp : ", otp);
    console.log(data);
    try {
      setLoading(true);
      const response = await api.post("/api/v1/auth/verify/forget/otp", {
        otp,
        email: forgetPasswordEmail,
      });
      if (response.data.success) {
        navigate("/forget/password");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen py-15 md:py-20  flex flex-col items-center  gap-20 w-full p-2">
       
      <div className="min-h-40 w-full relative rounded-xl border border-gray-300 p-4">
        {loading &&  <div className=" bg-white/20 h-full w-full absolute top-0 left-0">

            </div>}
        <form
          onSubmit={handleSubmit(forgetPasswordHandler)}
          className="flex  flex-col gap-6 w-full"
        >
            
          <div className="text-2xl font-semibold text-center text-blue-700">
            <h1>Verify OTP</h1>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-medium md:text-2xl text-center">
              Check your email
            </h1>
            <span className="text-center text-neutral-600">
              We've sent a 6-digit code to your email {forgetPasswordEmail}.
              <br />
              Enter it below to continue.{" "}
            </span>
          </div>
          <div>
            <input
              {...register("otp", {
                required: "*required",
              })}
              type="number"
              className="p-3 w-full rounded-md font-medium border border-gray-300 outline-none"
            />
            {error && <span className="text-xs text-red-600">{error}</span>}
          </div>
          <div className="w-full flex  justify-center ">
            {/*  to={'/forget/password'} */}
            <motion.button
            whileTap={{
                scale: 0.95,
            }}
              disabled={loading}
              className={`p-3 ${loading?"bg-indigo-400":""} rounded-md w-full text-center bg-indigo-700 text-white`}
            >
              {loading ? "Verfying..." : " Verify & Continue "}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterOtpForForget;
