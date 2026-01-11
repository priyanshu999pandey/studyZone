import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaPlay,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== REVIEW STATE ===== */
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/course/getCourse/${courseId}`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          setCourse(res.data.data);
          setLectures(res.data.data.lectures || []);
          setReviews(res.data.data.reviews || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) getCourse();
  }, [courseId]);

  /* ================= SUBMIT REVIEW ================= */
  const handleSubmitReview = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/review/create/${courseId}`,
        { rating, comment },
        { withCredentials: true }
      );

      if (res.data?.success) {
        setReviews([res.data.data, ...reviews]);
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Course not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 pb-16">

      {/* 🔙 BACK */}
      <div className="max-w-6xl mx-auto pt-6 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/70 dark:bg-surface-muted/70 hover:scale-105 transition"
        >
          <IoArrowBack /> Back
        </button>
      </div>

      {/* ================= HERO ================= */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white">
            {course.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-600">
              {course.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-600">
              {course.level || "Beginner"}
            </span>
            <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-600 flex items-center gap-1">
              <FaUserGraduate />
              {course.enrolledStudents?.length || 0} students
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            {course.description}
          </p>
        </div>

        {/* ENROLL CARD */}
        <div className="lg:sticky lg:top-24 bg-secondary dark:bg-surface-muted rounded-2xl shadow-xl p-5 space-y-4">
          <img
            src={course.thumbnail}
            className="w-full h-52 object-cover rounded-xl"
          />

          <div className="text-3xl font-bold dark:text-white">
            ₹ {course.price || 0}
          </div>

          <button className="w-full py-3 rounded-xl bg-primary hover:scale-105 transition">
            Enroll Now
          </button>
        </div>
      </div>

      {/* ================= LECTURES ================= */}
      <div className="max-w-6xl mx-auto mt-14">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
          Course Content
        </h2>

        <div className="rounded-2xl overflow-hidden border border-white/10">
          {lectures.map((lecture, index) => (
            <div
              key={lecture._id}
              className={`flex items-center justify-between p-4 bg-secondary dark:bg-surface-muted border-b border-white/10 ${
                !lecture.isPreviewFree && "opacity-70"
              }`}
            >
              <div className="flex items-center gap-4">
                {lecture.isPreviewFree ? (
                  <FaPlay className="text-green-500" />
                ) : (
                  <FaLock />
                )}
                <p className="dark:text-white">
                  {index + 1}. {lecture.lectureTitle}
                </p>
              </div>

              {lecture.isPreviewFree && lecture.videoUrl && (
                <video
                  src={lecture.videoUrl}
                  controls
                  className="w-40 rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="max-w-6xl mx-auto mt-16 bg-secondary dark:bg-surface-muted rounded-2xl p-6">
        <h3 className="text-2xl font-semibold mb-6 dark:text-white">
          Student Reviews
        </h3>

        {/* ⭐ ADD REVIEW */}
        <div className="mb-8">
          <p className="font-medium mb-2 dark:text-white">
            Rate this course
          </p>

          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-3 rounded-xl bg-primary dark:bg-surface outline-none"
            rows={4}
          />

          <button
            onClick={handleSubmitReview}
            className="mt-4 px-6 py-2 rounded-xl bg-primary hover:scale-105 transition"
          >
            Submit Review
          </button>
        </div>

        {/* 🧾 REVIEW LIST */}
        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet</p>
          )}

          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-primary dark:bg-surface"
            >
              <div className="flex gap-1 mb-1">
                {[...Array(rev.rating)].map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
