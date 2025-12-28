import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userData);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 py-10">
      

      {/* Back Button */}
      <div className="max-w-xl mx-auto mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex px-6 py-2 rounded-full items-center gap-2 text-black hover:text-gray-300 transition bg-secondary dark:bg-surface-muted dark:text-white"
        >
          <IoArrowBack size={20} />
          Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="max-w-xl mx-auto bg-secondary text-black dark:bg-surface-muted dark:text-white backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8">

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          {user.photoUrl && user.photoUrl.trim() !== "" ? (
            <img
              src={user.photoUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-28 h-28 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center text-4xl font-bold text-white">
              {firstLetter}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            {user.name}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {user.email}
          </p>

          <p className="text-gray-600 text-sm mt-3">
            {user.description || "No description added"}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Enrolled Courses */}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4 text-center">
            Enrolled Courses
          </h3>

          {user.enrolledCourses?.length > 0 ? (
            <div className="space-y-3">
              {user.enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-secondary px-4 py-3 rounded-xl text-white text-sm shadow-md text-center"
                >
                  {course?.title || "Course"}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
              You are not enrolled in any courses yet.
            </p>
          )}

            <div className="max-w-xl mx-auto mt-6 flex justify-center">
        <button
          onClick={() => navigate("/edit-profile")}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-black dark:hover:bg-red-800 transition dark:dark:bg-surface dark:text-white font-medium"
        >
          <FaEdit />
          Edit Profile
        </button>
      </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
