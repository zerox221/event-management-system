import { ShieldCheck ,Lock} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const UserSecurity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


   async function passwordResetHandler(data) {
    console.log(data);
    console.log(data);
    try {
      const response = await api.post("/api/v1/user/change/password", data);
      console.log(response.data.message);
      toast.success("password changed successfully");
      reset();
    } catch (error) {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    }
  }


  return (
    <form
      onSubmit={handleSubmit(passwordResetHandler)}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm"
    >
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Security</h2>

            <p className="text-sm text-slate-500">Keep your account secure</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Current Password */}
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-medium text-neutral-600"
            htmlFor="currentPassword "
          >
            Current Password
          </label>
          <input
            {...register("currentPassword", {
              required: "*required",
            })}
            type="password"
            id="currentPassword"
            placeholder="Current password"
            className="p-2 rounded-xl border border-gray-100 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-medium text-neutral-600"
            htmlFor="newPassword "
          >
            New Password
          </label>
          <input
            {...register("newPassword", {
              required: "*required",
              minLength: {
                value: 6,
                message: "password must be of atleast 6 characters",
              },
            })}
            type="password"
            id="newPassword"
            placeholder="New password"
            className="p-2 rounded-xl border border-gray-100 outline-none"
          />
          {errors.newPassword && (
            <span className="text-xs text-red-600">
              {errors.newPassword.message}
            </span>
          )}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
        <button
          type="submit"
          className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                bg-slate-900
                hover:bg-slate-800
                text-white
                text-sm
                font-medium
              "
        >
          <Lock size={17} />
          Change Password
        </button>
      </div>
    </form>
  );
};

export default UserSecurity;
