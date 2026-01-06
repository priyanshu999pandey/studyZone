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
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";



const Home = () => {


  
  const courses = useSelector(
    (store) => store.course.publishedCourseData || []
  );

  const courseCardData = courses.filter(
    (c) => c?.isPublished === true
  );

  return (
    <div className="bg-primary dark:bg-surface w-full min-h-screen overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">

        {/* Light Mode */}
        <img
          src={homeLight}
          alt="StudyZone Light Hero"
          className="w-full h-full object-cover block dark:hidden"
        />

        {/* Dark Mode */}
        <img
          src={homeDark}
          alt="StudyZone Dark Hero"
          className="w-full h-full object-cover hidden dark:block"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/90 flex flex-col">
          <Nav />

          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Grow Your Skills to Advance Your Career Path
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to={"/all-courses"} className="px-6 py-3 border rounded-xl text-white flex items-center gap-2" >
                View All Courses <FaBookOpen />
              </Link>

              <button className="px-6 py-3 rounded-xl bg-white text-black flex items-center gap-2">
                Search With AI
                <img src={aiSearch} className="w-5 h-5" alt="AI" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPLORE COURSES ================= */}
      <div className="w-full overflow-x-hidden">
        <ExploreCourses />
      </div>

      {/* ================= FEATURES ================= */}
      <div className="py-10 px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center dark:text-white">
          <FeatureCard icon={<GiBurningBook size={26} />} text="20K+ Online Courses" />
          <FeatureCard icon={<SiOpenaccess size={26} />} text="Lifetime Access" />
          <FeatureCard icon={<GiBurningBook size={26} />} text="Lifetime Support" />
          <FeatureCard icon={<RiUserCommunityFill size={26} />} text="Community Support" />
          <FeatureCard icon={<FaSackDollar size={26} />} text="Value for Money" />
        </div>
      </div>

      {/* ================= POPULAR COURSES ================= */}
      <div className="py-16 px-6 bg-primary dark:bg-surface overflow-x-hidden">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-4">
            Most Popular Courses
          </h2>

          <p className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Explore our most popular courses trusted by thousands of learners to
            build real-world skills and accelerate their careers.
          </p>

          {courseCardData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
              {courseCardData.map((course) => (
                <CourseCard
                  key={course._id}
                  title={course.title}
                  thumbnail={course?.thumbnail}
                  category={course.category}
                  rating={course.rating || 4.5}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No popular courses available right now.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, text }) => {
  return (
    <div
      className="
        w-full 
        max-w-55
        h-16
        flex 
        items-center 
        justify-center 
        gap-3 
        bg-secondary 
        dark:bg-surface-muted
        rounded-full 
        px-4
        text-sm
        md:text-base
        text-center
        text-black
        dark:text-white
      "
    >
      <span>{icon}</span>
      <p className="whitespace-nowrap">{text}</p>
    </div>
  );
};

export default Home;
