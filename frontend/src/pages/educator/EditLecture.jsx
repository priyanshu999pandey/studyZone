import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

const EditLecture = () => {
    const { lectureId } = useParams();
    const lectureDetails = useSelector((store)=>store.lecture.lectureData);

    const lecture = lectureDetails.filter((lec)=> lec._id === lectureId);
    // console.log("lecture-details",lecture[0].lectureTitle)
    

  const navigate = useNavigate();
  

  const [lectureTitle, setLectureTitle] = useState(lecture[0].lectureTitle);
  const [video, setVideo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= UPDATE LECTURE ================= */
  const handleUpdateLecture = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      formData.append("isPreviewFree", isFree);
      if (video) formData.append("videoUrl", video);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/lecture/edit-lecture/${lectureId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(res.data)

      if (res.data?.success) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 pt-6 pb-16">

      {/* 🔙 BACK BUTTON */}
      <div className="max-w-5xl mx-auto mb-5">
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
            transition
          "
        >
          <IoArrowBack className="text-lg" />
          Back
        </button>
      </div>

      {/* 📘 EDIT LECTURE CARD */}
      <div className="max-w-5xl mx-auto bg-secondary dark:bg-surface-muted rounded-2xl shadow-xl p-6 md:p-8">

        {/* HEADING */}
        <h2 className="text-2xl font-semibold mb-8 text-black dark:text-white">
          Update Lecture
        </h2>

        <div className="space-y-8">

          {/* ================= LECTURE TITLE ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black dark:text-gray-300">
              Lecture Title
            </label>

            <input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter lecture title"
              className="
                w-full px-4 py-3 rounded-xl
                bg-primary text-black
                dark:bg-surface dark:text-white
                outline-none
                border border-transparent
                focus:border-green-500
                focus:ring-2 focus:ring-green-500/30
                transition
              "
            />

            <p className="text-xs text-gray-600 dark:text-gray-400">
              This title will be visible to students
            </p>
          </div>

          {/* ================= VIDEO UPLOAD ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-black dark:text-gray-300">
              Lecture Video
            </label>

            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="
                w-full text-sm
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg
                file:border-0
                file:bg-primary file:text-black
                dark:file:bg-surface dark:file:text-white
                file:shadow-sm
                cursor-pointer
              "
            />

            <p className="text-xs text-gray-600 dark:text-gray-400">
              Supported formats: MP4, WebM (Max 1GB)
            </p>
          </div>

          {/* ================= FREE PREVIEW ================= */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isFree}
              onChange={() => setIsFree(!isFree)}
              className="mt-1 w-5 h-5 accent-green-600 cursor-pointer"
            />

            <div>
              <p className="text-sm font-medium text-black dark:text-gray-300">
                Publish lecture for free
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Students can watch this lecture without purchasing the course
              </p>
            </div>
          </div>

          {/* ================= UPDATE BUTTON ================= */}
          <button
            onClick={handleUpdateLecture}
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-primary text-black
              dark:bg-surface dark:text-white
              hover:bg-green-800/40 hover:text-green-500
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Updating Lecture..." : "Update Lecture"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditLecture;
