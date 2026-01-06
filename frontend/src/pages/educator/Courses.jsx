import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import empty from "../../assets/empty.jpg";
import axios from "axios";
import { useCourseContext } from "../../context/courseContext";

const Courses = () => {
  const navigate = useNavigate();
  const { fetchCreatorCourse, fetchPublishedCourse } = useCourseContext();
  const courses = useSelector((store) => store.course.courseData);

  const handleDeleteCourse = async (courseId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/course/removeCourse/${courseId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        fetchCreatorCourse();
        fetchPublishedCourse();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 pt-6 pb-16">

      {/* 🔙 Back Button */}
      <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-full
            bg-secondary/80 dark:bg-surface-muted/80
            text-black dark:text-white
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

      {/* 📚 Courses Card */}
      <div className="max-w-6xl mx-auto bg-secondary dark:bg-surface-muted rounded-2xl shadow-xl p-6 md:p-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button className="px-6 py-2 rounded-xl bg-primary text-black dark:bg-surface dark:text-white font-medium">
            All Created Courses
          </button>

          <button
            onClick={() => navigate("/create-course")}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-black dark:bg-surface dark:text-white font-medium hover:scale-105 transition"
          >
            <FaPlus />
            Create Course
          </button>
        </div>

        {/* 🚨 EMPTY STATE */}
        {(!courses || courses.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src={empty}
              alt="No courses"
              className="w-40 mb-6 opacity-80"
            />

            <h3 className="text-xl font-semibold text-black dark:text-white">
              Abhi koi course create nahi hai
            </h3>

            <p className="text-sm mt-2 text-gray-700 dark:text-gray-400 max-w-md">
              Aapne abhi tak koi course create nahi kiya hai.  
              Apna pehla course create karke students ke saath share karna shuru
              karein.
            </p>

            <button
              onClick={() => navigate("/create-course")}
              className="
                mt-6
                flex items-center gap-2
                px-6 py-3
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
              Create Your First Course
            </button>
          </div>
        )}

        {/* 📱 MOBILE VIEW */}
        {courses && courses.length > 0 && (
          <>
            <div className="space-y-4 md:hidden">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-primary dark:bg-surface text-black dark:text-white rounded-xl p-4 space-y-3"
                >
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail || empty}
                      alt={course.title}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        ₹{course.price || 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {course.isPublished ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-600 dark:text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                        Draft
                      </span>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/edit-course/${course._id}`)}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-600 text-sm text-gray-700 dark:text-gray-300">
                    <th className="py-3 text-left">Course</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b border-gray-700 hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={course.thumbnail || empty}
                            alt={course.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium dark:text-white">
                            {course.title}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 font-semibold dark:text-white">
                        ₹ {course.price || 0}
                      </td>

                      <td className="py-4">
                        {course.isPublished ? (
                          <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-600 dark:text-green-400">
                            Published
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                            Draft
                          </span>
                        )}
                      </td>

                      <td className="py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/edit-course/${course._id}`)
                            }
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
