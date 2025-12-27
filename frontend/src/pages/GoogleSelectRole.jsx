import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const GoogleSelectRole = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSelectRole = async (role) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/select-role`,
        { role },
        {
          withCredentials: true,
        }
      );

      console.log("user--",res.data);

      if (res?.data?.success) {
        dispatch(setUserData(res.data.user))
        toast.success("Role selected successfully");
        navigate("/"); 
      } else {
        toast.error(res?.data?.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black to-red-800">
      
      {/* Box */}
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">
        
        <h2 className="text-2xl font-semibold text-white mb-2">
          Select Your Role
        </h2>

        <p className="text-gray-300 mb-6 text-sm">
          Please choose how you want to use StudyZone
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          
          <button
            disabled={loading}
            onClick={() => handleSelectRole("student")}
            className="w-full py-2 rounded-lg bg-red-700 hover:bg-red-800 transition text-white font-medium flex justify-center items-center"
          >
            {loading ? <ClipLoader size={22} color="#fff" /> : "I am a Student"}
          </button>

          <button
            disabled={loading}
            onClick={() => handleSelectRole("educator")}
            className="w-full py-2 rounded-lg bg-red-700 hover:bg-red-800 transition text-white font-medium flex justify-center items-center"
          >
            {loading ? <ClipLoader size={22} color="#fff" /> : "I am an Educator"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default GoogleSelectRole;
