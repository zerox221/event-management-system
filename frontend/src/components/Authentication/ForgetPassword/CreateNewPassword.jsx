import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../../../api/axios";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const CreateNewPassword = () => {
  const forgotPasswordSchema = z
    .object({
      newPassword: z
        .string()
        .min(6, {
          message: "password must contain more then 6 characters",
        })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        }),
      confirmPassword: z.string().min(1, {
        message: "Please confirm your password",
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [loading, setLoading] = useState(false);
  const { forgetPasswordEmail } = useContext(userContext);
  const navigate = useNavigate();

  if (!forgetPasswordEmail) {
    navigate("/login");
  }

  async function ForgotPasswordHandler(data) {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/api/v1/auth/forget/password", {
        email: forgetPasswordEmail,
        newPassword: data.newPassword,
      });

      console.log(response.data.message);
      toast.success(response.data.message);
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-full flex md:py-20 py-15 justify-center p-2">
      <form
        onSubmit={handleSubmit(ForgotPasswordHandler)}
        className="h-fit md:min-h-100  md:w-100 w-full border p-3 py-6 md:p-3 border-slate-300 rounded-md flex flex-col gap-8"
      >
        {loading && (
          <div className=" bg-white/30 h-full w-full absolute top-0 left-0"></div>
        )}
        <div className="flex flex-col gap-1 items-center">
          <h2 className="text-xl font-semibold">Create New Password</h2>
          <span className="text-sm text-neutral-600 text-center">
            Set a strong password for your account to <br /> keep it safe.
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword" className="text-xs ">
            New Password
          </label>
          <input
            {...register("newPassword")}
            placeholder="Enter new password"
            type="text"
            id="newPassword"
            className="p-2 border border-slate-300 rounded-md outline-none"
          />

          {errors.newPassword ? (
            <span className="text-xs text-red-600">
              {errors.newPassword.message}
            </span>
          ) : (
            <span className="text-xs text-neutral-600">
              Must be atleast 6 character long.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-xs ">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="text"
            id="confirmPassword"
            className="p-2 border border-slate-300 rounded-md outline-none"
            placeholder="Re-enter new password"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
          {/* <span className='text-xs text-neutral-600'>Must be atleast 6 character long.</span> */}
        </div>
        <div>
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="p-2 font-medium rounded-md bg-indigo-700 text-white w-full text-center"
          >
            {loading ? " Updating password..." : "Reset Password"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPassword;
