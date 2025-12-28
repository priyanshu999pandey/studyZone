import React from "react";
import Nav from "../components/Nav";
import homeDark from "../assets/home1.jpg";
import homeLight from "../assets/homeLight.png";
import { FaBookOpen } from "react-icons/fa";
import aiSearch from "../assets/ai.png";
import { GiBurningBook } from "react-icons/gi";
import { SiOpenaccess } from "react-icons/si";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import ExploreCourses from "../components/ExploreCourses";

const Home = () => {
  return (
    <div className="bg-primary dark:bg-surface w-full overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[80vh] sm:h-[60vh] md:h-[80vh] lg:h-screen">

        {/* Light Mode Image */}
        <img
          src={homeLight}
          alt="StudyZone Light Hero"
          className="w-full h-full object-cover block dark:hidden"
        />

        {/* Dark Mode Image */}
        <img
          src={homeDark}
          alt="StudyZone Dark Hero"
          className="w-full h-full object-cover hidden dark:block"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col">
          <Nav />

          {/* Hero Content */}
          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Grow Your Skills to Advance Your Career Path
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-4 py-2 md:px-6 md:py-2 border rounded-xl text-white flex items-center gap-2">
                View All Courses <FaBookOpen />
              </button>

              <button className="px-4 py-2 md:px-6 md:py-2 rounded-xl bg-white text-black flex items-center gap-2">
                Search With AI
                <img src={aiSearch} className="w-5 h-5" alt="AI" />
              </button>
            </div>
          </div>
        </div>
      </div>

        <div>
        <ExploreCourses />
      </div>
      {/* ================= FEATURE SECTION ================= */}
      <div className="dark:text-white py-5 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 place-items-center">

          <FeatureCard icon={<GiBurningBook size={26} />} text="20K+ Online Courses" />
          <FeatureCard icon={<SiOpenaccess size={26} />} text="Lifetime Access" />
          <FeatureCard icon={<GiBurningBook size={26} />} text="Lifetime Support" />
          <FeatureCard icon={<RiUserCommunityFill size={26} />} text="Community Support" />
          <FeatureCard icon={<FaSackDollar size={26} />} text="Value for Money" />

        </div>
      </div>
     
    </div>
  );
};

const FeatureCard = ({ icon, text }) => {
  return (
    <div className="
      w-full 
      max-w-55
      h-16
      flex 
      items-center 
      justify-center 
      gap-3 
      bg-secondary 
      rounded-full 
      px-4
      text-sm
      md:text-base
      text-center
    ">
      <span className="shrink-0">{icon}</span>
      <p className="whitespace-nowrap">{text}</p>
    </div>
  );
};

export default Home;
