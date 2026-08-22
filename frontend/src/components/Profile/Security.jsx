import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Security = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);

  const changePasswordHandler = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/api/v1/user/change/password", data);
      console.log(response.data.message);
      toast.success("password changed successfully");
      reset();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-30 w-full flex flex-col gap-5 rounded-md p-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div>
        <span className="md:text-xl text-neutral-700 font-semibold ">
          Change password
        </span>
      </div>
      <form
        onSubmit={handleSubmit(changePasswordHandler)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label
            className="text-xs md-text-sm font-medium "
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            {...register("currentPassword", {
              required: "*required",
            })}
            type="password"
            id="currentPassword"
            className="p-3 w-full rounded-md  placeholder:text-neutral-300 text-neutral-500   outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          {errors.currentPassword && (
            <span className="tetx-xs text-red-600">
              {errors.currentPassword.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-xs md-text-sm font-medium "
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            {...register("newPassword", {
              required: "*required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            type="password"
            id="newPassword"
            className="p-3 w-full rounded-md  placeholder:text-neutral-300 text-neutral-500   outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
          />
          {errors.newPassword && (
            <span className="tetx-xs text-red-600">
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div>
          <button className="w-full p-2 rounded-md bg-indigo-600 text-neutral-200 hover:opacity-95 cursor-pointer">
            change password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
