import React, { useContext, useState } from "react";
import { Mail, MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
const Otp = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const {email,user,setUser} = useContext(userContext);
  console.log("email = ",email);

  async function verifyOtpHandler(data) {
    data.email= email;
    if (loading) {
      return;
    }
    setLoading(true);
    console.log(data);
    data.email = email;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/verify`,
        data,
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setUser(response.data.user);

    navigate(
      response.data.user.role === "organizer"
        ? "/admin"
        : "/user"
    );

    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
    reset();
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(verifyOtpHandler)}
        className="w-[90%] p-5 h-auto flex flex-col gap-5 md:w-100 rounded-md  border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] "
      >
        <div className="flex justify-center flex-col items-center gap-3 ">
          <div className="bg-[#5B4BFF] p-5 rounded-full w-fit">
            <MailCheck size={50} className="text-white" />
          </div>
          <div className="flex flex-col text-center">
            <span className="text-3xl font-medium">Verify your Email</span>
            <span className="text-sm text-gray-500">
            we have sended a 6 digit code to {email}. Enter it
              below to continue
            </span>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Enter Otp</label>
          <input
          onChange={()=> setError(false)}
            {...register("otp", {
              required: "Enter otp",
            })}
            placeholder="Enter otp"
            type="number"
            className="p-3 w-full placeholder:text-gray-600 border border-gray-600 rounded-md"
          />
          {errors.otp && (
            <span className="text-xs text-red-600">{errors.otp.message}</span>
          )}
        </div>
        {error && (
          <div>
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}

        <div className="flex justify-center items-center">
          <button className="p-3 rounded-md bg-[#5B4BFF] w-full text-white/80">
            Verify
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <span>
            Did'nt receive the code ?{" "}
            <span className="text-blue-500">Resend code</span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Otp;
