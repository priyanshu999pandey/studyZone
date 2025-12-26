import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import img from "../assets/szlogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student"); // student | educator
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.data))
        toast.success(res?.data?.message);
        navigate(`/`);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      //
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-4xl min-h-130 bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* LEFT – FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-5">
          <div className="w-full max-w-sm">
            <p className="text-sm text-gray-500">Let’s get started</p>

            <h2 className="text-3xl font-bold mt-2 mb-6">Create Account</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className=" focus-within: outline-none w-full mt-1 px-4 py-2 border rounded-lg  focus:ring-2 focus:ring-red-400"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ROLE SELECTION */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Sign up as</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`w-1/2 py-2 rounded-lg border transition
                    ${
                      role === "student"
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole("educator")}
                  className={`w-1/2 py-2 rounded-lg border transition
                    ${
                      role === "educator"
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Educator
                </button>
              </div>
            </div>

            {/* SIGNUP BUTTON */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Sign up"}
            </button>

            {/* OR */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-sm text-gray-500">or continue</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* GOOGLE */}
            <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5"
              />
              Continue with Google
            </button>

            {/* LOGIN */}
            <div className="text-center text-sm mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 font-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-linear-to-br from-black to-red-800">
          <h1 className="text-white text-4xl font-bold text-center px-6">
            <img src={img} className="animate-bounce" />
            Welcome to <br /> Your Journey 🚀
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
