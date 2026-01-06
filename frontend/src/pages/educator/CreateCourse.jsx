  import axios from "axios";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { IoArrowBack } from "react-icons/io5";
  import { useCourseContext } from "../../context/courseContext";

  const CreateCourse = () => {
    const { fetchCreatorCourse } = useCourseContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const categories = [
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

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/course/createCourse`,
          { title, category },
          { withCredentials: true }
        );

        if (res.data.success) {
          fetchCreatorCourse();
          navigate(`/edit-course/${res.data.data._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="min-h-screen bg-primary dark:bg-surface px-4 pt-6 pb-16">

        {/* 🔙 Back Button (same style everywhere) */}
        <div className="max-w-4xl mx-auto mb-4">
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

        {/* 📘 Create Course Card */}
        <div className="max-w-4xl mx-auto bg-secondary dark:bg-surface-muted rounded-2xl shadow-xl p-6 md:p-8">

          {/* HEADER */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 dark:text-white">
            Create Course
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Course Title */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Course Title
              </label>
              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-primary text-black
                  dark:bg-surface dark:text-white
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-primary text-black
                  dark:bg-surface dark:text-white
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat, index) => (
                  <option
                    key={index}
                    value={cat}
                    className="bg-primary text-black dark:bg-surface dark:text-white"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="
                  px-8
                  py-3
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
                Create Course
              </button>

              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="
                  px-8
                  py-3
                  rounded-xl
                  border
                  border-gray-600
                  text-gray-700
                  dark:text-gray-300
                  hover:bg-black/5
                  dark:hover:bg-white/5
                  transition
                "
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  };

  export default CreateCourse;
