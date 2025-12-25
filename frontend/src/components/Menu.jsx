import React from "react";
import { GiSplitCross } from "react-icons/gi";
import DarkModeToggle from "./DarkModeToggle";
import NavButton from "./NavButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { clearUser } from "../redux/userSlice";

const Menu = ({close,user}) => {

        const navigate = useNavigate()
        const dispatch = useDispatch()

     
      const handleLogout = async () => {
        try {
         
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/logout`,
           
            {
              withCredentials: true,
            }
          );
    
          console.log(res.data);
    
          if (res?.data?.success){
            dispatch(clearUser())
            toast.success("logout successfully");
            navigate("/login");
          } else {
            toast.error(res?.data?.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message);
          //
        } 
      };
  return (

    
    

    <div className="fixed top-0 right-0 left-0 bottom-0 bg-secondary dark:bg-surface p-4 transition-all  ">
        <div className="flex justify-end ">
            <GiSplitCross className="text-white text-4xl" onClick={close} />
        </div>
      <div className="p-4 flex flex-col gap-10">
        <Link to={"/my-profile"}
        className="
          px-4 py-2 rounded-full
          bg-white dark:bg-primary
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          text-center
          "
      >
        My Profile
      </Link>

     {
         (user && user.role==="educator") && <Link to={"/dashboard"}
        className="
          px-4 py-2 rounded-full
          bg-white dark:bg-primary
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          text-center
          "
      >
        DashBoard
      </Link>
     }

      
      <div
        className="
          px-4 py-2 rounded-full
          bg-white dark:bg-secondary
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          text-center
          "
      >
        My Courses
      </div>
       {user ? (
            <button
            onClick={handleLogout}
             className="
          px-4 py-2 rounded-full
          bg-white dark:bg-secondary
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          text-center
          "
            >
              Logout
            </button>
          ) : (
           
             <Link to={"/login"}
        className="
          px-4 py-2 rounded-full
          bg-white/40 dark:bg-secondary
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          text-center
          "
      >
        Login
            </Link>
          )}
      
      <DarkModeToggle></DarkModeToggle>
      </div>
       
    </div>
  );
};

export default Menu;
