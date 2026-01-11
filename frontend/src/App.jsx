import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import DashBoard from "./pages/educator/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import SendOtp from "./pages/SendOtp";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import GoogleSelectRole from "./pages/GoogleSelectRole";
import EditProfile from "./pages/EditProfile";
import Courses from "./pages/educator/Courses";
import CreateCourse from "./pages/educator/CreateCourse";
import EditCourse from "./pages/educator/EditCourse";
import Nav from "./components/Nav";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/educator/CreateLecture";
import EditLecture from "./pages/educator/EditLecture";

import { useEffect } from "react";
import { clearUser, setUserData } from "./redux/userSlice";
import axios from "axios"
import { useState } from "react";
import ViewCourse from "./pages/ViewCourse";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {

  const [user,setUser] = useState("")

  // const {fetchUser} = useUserContext()
  
  // useEffect(()=>{
  //         fetchUser()
  // },[])
     
 

    const dispatch = useDispatch();

  // 🔥 user fetch function
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/getcurrentuser`,
        { withCredentials: true }
      );
      //  console.log("contex clg",res.data);
       setUser(res.data?.data)
      dispatch(setUserData(res?.data?.data));
    } catch (error) {
      dispatch(clearUser());
    }
  };

  // 🔥 app load par user fetch
  useEffect(() => {
    fetchUser();
  }, []);

   

  

  return (
    <div className="w-screen min-h-screen bg-primary dark:bg-surface">
          <ScrollToTop/>
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
        <Route
          path="/courses"
          element={
            user && user.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/create-course"
          element={
            user && user.role === "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/edit-course/:id"
          element={
            user && user.role === "educator" ? (
              <EditCourse/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/create-lecture/:courseId"
          element={
            user && user.role === "educator" ? (
              <CreateLecture/>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/edit-lecture/:lectureId"
          element={
            user && user.role === "educator" ? (
              <EditLecture/>
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
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path={`view-course/:courseId`} element={<ViewCourse />} />
      </Routes>

    </div>
  );
};

export default App;
