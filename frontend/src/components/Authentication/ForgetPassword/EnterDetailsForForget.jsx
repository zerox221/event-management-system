import React from "react";
import { ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";
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


  async function forgetPasswordHandler(data) {
    const { email } = data;
    setForgetPasswordEmail(email);
    try {
      const response = await api.post("/api/v1/auth/forget/password/otp", data);
      console.log(response.data.message);
      if (response.data.success) {
        navigate("/forget/password/verfiy");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen  w-screen flex flex-col bar items-center gap-10 p-2 ">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="md:text-2xl text-xl font-semibold ">Forgot Password</h1>
        <span className="text-sm text-neutral-600 text-center">
          Enter your email address to recieve a password recent code.
        </span>
      </div>
      <div className="min-h-60 md:w-70 relative w-full border p-4  border-gray-300 rounded-xl ">
        <form
          onSubmit={handleSubmit(forgetPasswordHandler)}
          className="flex  flex-col gap-8 h-full w-full "
        >
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
          </div>
          <div className="flex flex-col gap-4">
            <button className="p-2 rounded-md text-sm text-white flex gap-1 justify-center  bg-indigo-600">
              <span>Send Email</span>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="w-full flex bottom-3 justify-center absolute ">
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
