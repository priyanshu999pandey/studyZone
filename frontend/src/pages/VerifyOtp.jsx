import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  // 🔐 Prevent direct access
  useEffect(() => {
    if (!email) {
      navigate("/send-otp");
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalOtp = otp.join("");
    console.log("Verify OTP:", finalOtp, "for", email);

    // 👉 API call yahan aayega

     try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          email,
          otp:finalOtp
         
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res?.data?.success){
       
        toast.success(res?.data?.message);
        navigate("/reset-password",{
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
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleVerifyOtp} className="space-y-6">

          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email || ""}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-black/70 text-gray-400 border border-red-700 cursor-not-allowed"
            />
          </div>

          {/* OTP Boxes */}
          <div>
            <label className="block text-sm text-gray-300 mb-2 text-center">
              Enter 6-digit OTP
            </label>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-12 text-center text-lg font-semibold rounded-lg bg-black/70 text-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || otp.includes("")}
            className="w-full flex items-center justify-center py-2 rounded-lg bg-red-700 hover:bg-red-800 transition text-white font-medium disabled:opacity-60"
          >
            {loading ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              "Verify OTP"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
