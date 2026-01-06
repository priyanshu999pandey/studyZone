import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";

const categories = [
  "All",
  "Web Development",
  "Mobile App Development",
  "UI / UX Design",
  "Data Structures & Algorithms",
  "Machine Learning",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "DevOps",
  "Digital Marketing",
];

const AllCourses = () => {
  const allCourses = useSelector((store) => store.course.courseData);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses =
    selectedCategory === "All"
      ? allCourses
      : allCourses?.filter(
          (course) => course.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-bg dark:bg-primary-dark">

      {/* ================= MAIN LAYOUT ================= */}
      <div
        className="
          grid 
          grid-cols-[140px_1fr]
          sm:grid-cols-[180px_1fr]
          md:grid-cols-[220px_1fr]
          lg:grid-cols-[260px_1fr]
          xl:grid-cols-[280px_1fr]
        "
      >

        {/* ================= SIDEBAR ================= */}
        <aside className="h-screen sticky top-0 bg-secondary dark:bg-surface-muted border-r border-black/5 dark:border-white/10">
          <div className="h-full flex flex-col px-2 sm:px-3 lg:px-5 py-4">

            <h2 className="text-xs sm:text-sm lg:text-lg font-semibold text-black dark:text-white mb-3 lg:mb-4">
              Categories
            </h2>

            {/* Scrollable Categories */}
            <ul className="space-y-1 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    cursor-pointer 
                    px-2 sm:px-3 py-2 
                    rounded-md 
                    text-[10px] sm:text-xs lg:text-sm 
                    font-medium 
                    leading-snug
                    transition-all
                    ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-primary/10"
                    }
                  `}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ================= CONTENT ================= */}
        <main className="p-3 sm:p-5 lg:p-8 w-full overflow-x-hidden">

          {/* Header */}
          <header className="mb-5 sm:mb-7">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-black dark:text-white">
              {selectedCategory === "All"
                ? "All Courses"
                : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
              Learn from curated courses designed for real-world skills and career growth.
            </p>
          </header>

          {/* Courses */}
          {filteredCourses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  title={course.title}
                  category={course.category}
                  thumbnail={course.thumbnail}
                  rating={course.rating}
                />
              ))}
            </div>
          ) : (
            <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
              No courses found 😕
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default AllCourses;
