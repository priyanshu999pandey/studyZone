import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  console.log("email",email);

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

//   🔐 Prevent direct access
  useEffect(() => {
    if (!email) {
      navigate("/send-otp");
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Reset password for:", email, newPassword);

    // 👉 API call yahan aayega
     try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          email:email,
          password:newPassword
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res?.data?.success){
       
        toast.success(res?.data?.message);
        navigate("/login");

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
          Reset Password
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-6">

          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="text"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-black/70 text-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || newPassword.length < 8}
            className="w-full flex items-center justify-center py-2 rounded-lg bg-red-700 hover:bg-red-800 transition text-white font-medium disabled:opacity-60"
          >
            {loading ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              "Reset Password"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
