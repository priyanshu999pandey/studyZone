import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const Dashboard = () => {
  const navigate = useNavigate();
  const educator = useSelector((store) => store.user.userData);

  if (!educator) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  const firstLetter = educator?.name?.charAt(0)?.toUpperCase() || "E";

  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 pt-6 pb-16">

      {/* 🔙 Back Button */}
      <div className="max-w-5xl mx-auto mb-4">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-full
            bg-secondary/80 dark:bg-surface-muted/80
            text-black dark:text-white
            backdrop-blur-xl
            border border-white/10
            shadow-md
            hover:scale-105
            transition-all duration-300
          "
        >
          <IoArrowBack className="text-lg" />
          Back
        </button>
      </div>

      {/* 📊 Dashboard Card */}
      <div
        className="
          max-w-5xl
          mx-auto
          bg-secondary
          text-black
          dark:bg-surface-muted
          dark:text-white
          backdrop-blur-md
          rounded-2xl
          shadow-xl
          p-6
          md:p-8
        "
      >
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">
          Educator Dashboard
        </h2>

        {/* Educator Info */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* Avatar */}
          {educator.photoUrl ? (
            <img
              src={educator.photoUrl}
              alt={educator.name}
              referrerPolicy="no-referrer"
              className="w-28 h-28 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white">
              {firstLetter}
            </div>
          )}

          {/* Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {educator.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              {educator.description || "No description added"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Earnings + Action */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Earnings */}
          <div className="bg-primary/30 dark:bg-black/20 rounded-xl px-8 py-6 text-center w-full md:w-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Total Earnings
            </p>
            <h4 className="text-3xl font-bold mt-2">
              ₹ {educator.totalEarnings || 0}
            </h4>
          </div>

          {/* Create Course */}
          <button
            onClick={() => navigate("/courses")}
            className="
              flex items-center justify-center gap-2
              px-8 py-3
              rounded-xl
              bg-primary
              text-black
              dark:bg-surface
              dark:text-white
              font-medium
              hover:scale-105
              transition
            "
          >
            <FaPlus />
            Create Course
          </button>
        </div>
      </div>

      {/* 🔽 Future Content Area */}
      <div className="max-w-5xl mx-auto mt-12">
        {/* Analytics / Graphs */}
      </div>
    </div>
  );
};

export default Dashboard;
