import { LogOutIcon } from "lucide-react";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { replace, useNavigate } from "react-router-dom";
import { userContext } from "../../../context/UserContext";
const LogOut = () => {
  const navigate = useNavigate();
  const { user ,setUser} = useContext(userContext);

  async function logOutHandler() {
      try {
          const response = await api.put("/api/v1/auth/logout");
      toast.success(response.data.message);
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
        toast.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <motion.div
      whileTap={{
        scale: 0.95,
      }}
      onClick={logOutHandler}
      className="bg-red-100  border p-3 items-center justify-center text-red-500  flex gap-1 border-slate-200 rounded-xl shadow-sm"
    >
      <LogOutIcon size={20} />
      <span>Logout</span>
    </motion.div>
  );
};

export default LogOut;
