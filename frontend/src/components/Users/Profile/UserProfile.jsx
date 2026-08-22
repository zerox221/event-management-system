import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  CheckCircle,
  Pencil,
  Save,
} from "lucide-react";
import { userContext } from "../../../context/UserContext";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import UserSecurity from "./UserSecurity";
import VolunteerEvents from "./VolunteerEvents";
import LogOut from "./LogOut";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user, fetchUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState(user?.additionalInfo?.address || "");
  const [bio, setBio] = useState(user?.additionalInfo?.bio || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phone: user?.additionalInfo?.phone || "",
      address: user?.additionalInfo?.address || "",
      bio: user?.additionalInfo?.bio || "",
    },
  });




  const [change, setChange] = useState(false);
  const [error, setError] = useState(false);

  async function dpChangeHandler(e) {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("dp", e.target.files[0]);
    try {
      const response = await api.put("/api/v1/user/change/dp", formData);
      fetchUser();
      toast.success("profile picture updated");
    } catch (error) {
      console.log(error);
      toast.error("error while chnaging the profile picture");
    } finally {
      setLoading(false);
    }
  }

  async function submitAdditionalDetails(data) {
    console.log(change);
    if (!change) {
      setError("No changes detected. Your information remains the same");
      return;
    }

    if (loading) {
      return;
    }
    console.log(data);
    setLoading(true);
    try {
      const response = await api.post("/api/v1/user/additional/info", data);
      console.log(response.data.message);
      toast.success("inofrmation updated");
      reset();
    } catch (error) {
      console.log(error.response.data.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={
                  user?.profile?.url ||
                  `https://ui-avatars.com/api/?name=${user?.name}`
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-50"
              />
            </div>

            <div>
              <label
                className="bg-indigo-500 text-sm  p-1 px-2 rounded-xl text-white"
                htmlFor={loading ? "changing.." : "profile"}
              >
                {loading ? "changing..." : "Change Profile"}
              </label>
              <input onChange={dpChangeHandler} type="file" className="hidden" id="profile" />
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {user?.name || "User"}
              </h1>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 mt-1">
                <Mail size={16} />
                <span className="text-sm">
                  {user?.email || "user@example.com"}
                </span>
              </div>

              <div className="mt-3">
                <span
                  className="
                    inline-flex items-center gap-1
                    px-3 py-1
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    text-xs
                    font-semibold
                  "
                >
                  <User size={14} />

                  user
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PERSONAL INFORMATION ================= */}
        <form
          onSubmit={handleSubmit(submitAdditionalDetails)}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm"
        >
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Personal Information
                </h2>

                <p className="text-sm text-slate-500">
                  Update your personal details
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Phone
              </label>

              <div className="relative mt-2">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10 digit number",
                    },
                    required: "*required",
                  })}
                  onChange={() => setChange(true)}
                  type="tel"
                  name="phone"
                  className="
                    w-full
                    pl-10 pr-4 py-3
                    rounded-xl
                    border border-slate-200
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <span className="text-xs text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Address
              </label>

              <div className="relative mt-2">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  onChange={() => setChange(true)}
                  {...register("address", {
                    required: "*required",
                  })}
                  type="text"
                  name="address"
                  className="
                    w-full
                    pl-10 pr-4 py-3
                    rounded-xl
                    border border-slate-200
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <span className="text-xs text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Bio</label>

              <div className="relative mt-2">
                <FileText
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <textarea
                  onChange={() => setChange(true)}
                  {...register("bio", {
                    required: "*required",
                  })}
                  name="bio"
                  rows={4}
                  className="
                    w-full
                    pl-10 pr-4 py-3
                    rounded-xl
                    border border-slate-200
                    outline-none
                    resize-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                  placeholder="Tell us something about yourself..."
                />
                {errors.bio && (
                  <span className="text-xs text-red-500">
                    {errors.bio.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="w-full  justify-center flex ">
              <span className="text-xs text-center w-full text-red-500 ">
                {error}
              </span>
            </div>
          )}

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm
                font-medium
                transition
              "
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>

        {/* ================= SECURITY ================= */}
        <UserSecurity />

        {/* ================= VOLUNTEER ACTIVITY ================= */}
        <VolunteerEvents />
        
        <LogOut/>
      </div>
    </div>
  );
};

export default UserProfile;
