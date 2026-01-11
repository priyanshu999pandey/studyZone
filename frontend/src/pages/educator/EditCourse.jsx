import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useCourseContext } from "../../context/CourseContext";
import CourseCard from "../../components/CourseCard";

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchCreatorCourse } = useCourseContext();

  /* ================= STATE ================= */
  const [course, setCourse] = useState(null);
  console.log("Course",course);

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: null,
    isPublished: false,
  });

  const [previewImage, setPreviewImage] = useState(null);

  /* ================= CONSTANTS ================= */
  const categories = [
    "Web Development",
    "UI / UX Design",
    "Mobile Development",
    "Data Structures",
    "Machine Learning",
    "AI",
    "Cloud Computing",
    "DevOps",
    "Cyber Security",
    "Digital Marketing",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  /* ================= FETCH COURSE ================= */
  const getCourse = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/course/getCourse/${id}`,
        { withCredentials: true }
      );
      setCourse(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  /* ================= SYNC COURSE → FORM ================= */
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title ?? "",
        subTitle: course.subTitle ?? "",
        description: course.description ?? "",
        category: course.category ?? "",
        level: course.level ?? "",
        price: course.price ?? "",
        thumbnail:course.thumbnail || '',
        isPublished: course.isPublished ?? false,
      });

      if (course.thumbnail) {
        setPreviewImage(course.thumbnail);
      }
    }
  }, [course]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail" && files && files[0]) {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));

      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmitForm = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("subTitle", formData.subTitle);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("level", formData.level);
      data.append("price", formData.price);
      data.append("isPublished", formData.isPublished);

      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/course/editCourse/${id}`,
        data,
        { withCredentials: true }
      );

      fetchCreatorCourse();
      navigate("/courses");
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 pt-6 pb-16">

      {/* 🔙 Back Button (SAME STYLE AS OTHER PAGES) */}
      <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between">
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

        <button
          onClick={() => navigate(`/create-lecture/${id}`)}
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
          Go to lectures page
        </button>
      </div>

      {/* 📘 Edit Course Card */}
      <div className="max-w-6xl mx-auto bg-secondary dark:bg-surface-muted rounded-2xl shadow-xl p-6 md:p-8">

        <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
          Edit Course Details
        </h2>

        {/* PUBLISH / UNPUBLISH */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, isPublished: true }))
            }
            className={`px-4 py-2 rounded-lg transition ${
              formData.isPublished
                ? "bg-green-600 text-white shadow-lg"
                : "bg-green-500/20 text-green-600 dark:text-green-400"
            }`}
          >
            Publish
          </button>

          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, isPublished: false }))
            }
            className={`px-4 py-2 rounded-lg transition ${
              !formData.isPublished
                ? "bg-red-600 text-white shadow-lg"
                : "bg-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            Unpublish
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-6">

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full px-4 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white outline-none"
          />

          <input
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="w-full px-4 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white outline-none"
          />

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course description"
            className="w-full px-4 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white outline-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white"
            >
              <option value="">Select Level</option>
              {levels.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="₹ Price"
              className="px-4 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white"
            />
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-white">
              Course Thumbnail
            </label>

            <div className="w-64 h-40 mb-4 rounded-xl border-2 border-dashed overflow-hidden bg-primary dark:bg-surface flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-scale-down"
                />
              ) : (
                <span className="text-sm">No image selected</span>
              )}
            </div>

            <label
              htmlFor="thumbnail"
              className="inline-block cursor-pointer px-4 py-2 rounded-lg bg-primary text-black dark:bg-surface dark:text-white font-medium hover:scale-105 transition"
            >
              Choose Thumbnail
            </label>

            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-3 rounded-xl border border-gray-600 bg-primary text-black dark:bg-surface dark:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmitForm}
              className="px-8 py-3 rounded-xl bg-primary text-black dark:bg-surface dark:text-white hover:bg-green-800/50 hover:text-green-600"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditCourse;
