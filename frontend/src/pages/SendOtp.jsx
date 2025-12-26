import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const SendOtp = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)

  const handleSendOtp = async(e) => {
    e.preventDefault();
    console.log("Send OTP to:", email);
    // yahan API call karoge

     try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
        {
          email,
         
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res?.data?.success){
       
        toast.success(res?.data?.message);
        navigate("/verify-otp",{
            state:{
                email:email
            }
        });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      //
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black to-red-800">
      
      {/* Box */}
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Send OTP
        </h2>

        <form onSubmit={handleSendOtp} className="space-y-5">
          
          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/70 text-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Button */}
          <button
          onClick={()=>setLoading((prev)=>!prev)}
            type="submit"
            className="w-full py-2 rounded-lg bg-red-700 hover:bg-red-800 transition text-white font-medium"
          >
            {loading ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              "Send OTP"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default SendOtp;
