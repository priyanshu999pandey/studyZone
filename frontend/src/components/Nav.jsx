import React, { useState } from "react";
import logo from "../assets/szlogo.png";
import { useDispatch, useSelector } from "react-redux";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from "./Menu";
import NavButton from "./NavButton";
import { clearUser } from "../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


  const user = useSelector((store) => store.user.userData);
  // console.log("userData", user);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  
  const handleLogout = async () => {
    try {
     
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
       
        {
          withCredentials: true,
        }
      );

      // console.log(res.data);

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

  // console.log("Open", open);
  return (
    <header className="px-8 py-4 relative">
      <nav
        className="
        flex items-center justify-between
         px-6 py-3
        rounded-full
         bg-secondary
        dark:bg-surface-muted
        backdrop-blur-xl
        border border-white/10
        shadow-lg shadow-red-950/40
        "
      >
        {/* 🔴 Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
          </div>
          <span className=" text-black dark:text-white font-semibold tracking-wide">
            StudyZone
          </span>
        </div>

        {/* 🔥 Actions */}
        <div className=" hidden lg:flex  items-center gap-4">
          {/* Profile */}
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="
            w-10 h-10 rounded-full
            bg-primary
            
            text-black font-semibold
            flex items-center justify-center
            border border-white/10
            dark:hover:bg-red-950
            transition-all duration-300
            hover:scale-105
            cursor-pointer
            dark:bg-surface
            dark:text-white

            
            "
          >
            P
          </div>

          {/* Buttons */}

          <DarkModeToggle></DarkModeToggle>
          {user && user?.role === "educator" && <NavButton text="Dashboard" to={"/dashboard"} />}

          {user ? (
            <button
            onClick={handleLogout}
 className="
    text-lg
    px-4 py-1 rounded-full
    bg-primary
    text-black
    border border-white/20
    hover:bg-accent
  dark:hover:bg-red-950/50
    dark:bg-surface
    dark:text-white
    transition-all duration-300
    hover:scale-105
    "
            >
              Logout
            </button>
          ) : (
            <NavButton  to={"/login"} text="Login" />
          )}

          
        </div>

        

        <div
          className="lg:hidden"
          onClick={() => setOpenModal((prev) => !prev)}
        >
          <GiHamburgerMenu className="text-2xl" />
        </div>
      </nav>


      <div className="sm:hidden md:hidden lg:block">
          {open  && (
            <div className={`absolute ${user.role==="educator" ? "right-80":"right-50"} top-20 mt-4 z-50`}>
              <div
                className="
        p-4 w-52
        rounded-2xl
        bg-secondary/80 dark:bg-surface-muted/80
        backdrop-blur-xl
        border border-accent/30 dark:border-surface-muted
        shadow-xl shadow-accent/20
        flex flex-col gap-2
        "
              >
                {/* My Profile */}
                <Link to={"/my-profile"}
                  className="
          px-4 py-2 rounded-xl
          bg-white/40 dark:bg-primary/30
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          "
                >
                  My Profile
                </Link>

                {/* My Courses */}
                <div
                  className="
          px-4 py-2 rounded-xl
          bg-white/40 dark:bg-secondary/30
          text-slate-800 dark:text-slate-200
          font-medium
          cursor-pointer
          hover:bg-accent/20 dark:hover:bg-accent/30
          transition-all duration-200
          hover:scale-[1.02]
          "
                >
                  My Courses
                </div>
              </div>
            </div>
          )}
       </div>
      {openModal && <Menu user={user} close={() => setOpenModal(false)}></Menu>}
    </header>
  );
};



export default Nav;
