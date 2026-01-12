import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import DashBoard from "./pages/educator/DashBoard";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import GoogleSelectRole from "./pages/GoogleSelectRole";
import EditProfile from "./pages/EditProfile";
import Courses from "./pages/educator/Courses";
import CreateCourse from "./pages/educator/CreateCourse";
import EditCourse from "./pages/educator/EditCourse";
import CreateLecture from "./pages/educator/CreateLecture";
import EditLecture from "./pages/educator/EditLecture";
import AllCourses from "./pages/AllCourses";
import ViewCourse from "./pages/ViewCourse";
import ScrollToTop from "./components/ScrollToTop";

import { clearUser, setUserData } from "./redux/userSlice";

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch logged in user from cookie
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/getcurrentuser`
      );

      setUser(res.data.data);
      dispatch(setUserData(res.data.data));
    } catch (error) {
      setUser(null);
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔄 Wait until auth is checked
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-primary dark:bg-surface">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" replace />}
        />

        {/* ✅ Protected */}
        <Route
          path="/my-profile"
          element={user ? <MyProfile /> : <Navigate to="/signup" replace />}
        />

        {/* ✅ Educator only */}
        <Route
          path="/dashboard"
          element={
            user && user.role === "educator" ? (
              <DashBoard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/courses"
          element={
            user && user.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/create-course"
          element={
            user && user.role === "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/edit-course/:id"
          element={
            user && user.role === "educator" ? (
              <EditCourse />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/create-lecture/:courseId"
          element={
            user && user.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/edit-lecture/:lectureId"
          element={
            user && user.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Public */}
        <Route path="/send-otp" element={<SendOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/select-role" element={<GoogleSelectRole />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/view-course/:courseId" element={<ViewCourse />} />
      </Routes>
    </div>
  );
};

export default App;
