import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import DashBoard from "./pages/DashBoard";
import { useSelector } from "react-redux";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import GoogleSelectRole from "./pages/GoogleSelectRole";
import EditProfile from "./pages/EditProfile";

const App = () => {
  const user = useSelector((store) => store.user.userData);
  console.log("router user",user)

  return (
    <div className="w-screen min-h-screen bg-primary dark:bg-surface">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={ <Login /> }
        />

        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />

        {/* ✅ PROTECTED ROUTE */}
        <Route
          path="/my-profile"
          element={user ? <MyProfile /> : <Navigate to="/signup" />}
        />

        {/* ✅ ROLE-BASED ROUTE */}
        <Route
          path="/dashboard"
          element={
            user && user.role === "educator" ? (
              <DashBoard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/send-otp" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/select-role" element={<GoogleSelectRole />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default App;
