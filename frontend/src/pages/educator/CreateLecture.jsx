import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { setlectureData } from "../../redux/lectureSlice";
import { useCourseContext } from "../../context/CourseContext";
import { useEffect } from "react";

const CreateLecture = () => {
  const {fetchLectures} = useCourseContext()
  
  const lectures = useSelector((store)=>store.lecture.lectureData)
  const navigate = useNavigate();
  const {courseId} = useParams(); // course id (optional if you need later)
  console.log("courseId",courseId);
  const [lectureTitle, setLectureTitle] = useState("");
  console.log("redux-lecture",lectures);

   useEffect(()=>{
    if(courseId){
         fetchLectures(courseId)
    }  
   },[])
 
 
  const handleCreateLecture  = async()=>{

    try {
         const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/lecture/create-lecture/${courseId}`,{lectureTitle},{withCredentials:true})
         
         console.log(res.data);
         if(res.data?.success){
           fetchLectures(courseId)
         }

    } catch (error) {
        console.log(error);
    } 
  }
  

  return (
    <div className="min-h-screen bg-primary dark:bg-surface px-4 pt-6 pb-16">

      {/* 🔙 BACK BUTTON (SAME AS EditCourse) */}
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
      </div>

      {/* 📘 CREATE LECTURE CARD */}
      <div className="max-w-6xl mx-auto bg-secondary dark:bg-surface-muted rounded-2xl shadow-xl p-6 md:p-8">

        <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
          Add Lecture
        </h2>

        {/* FORM */}
        <div className="space-y-6">

          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Lecture Title"
            className="
              w-full px-4 py-3
              rounded-xl
              bg-primary text-black
              dark:bg-surface dark:text-white
              outline-none
            "
          />

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="
                px-6 py-3
                rounded-xl
                border border-gray-600
                bg-primary text-black
                dark:bg-surface dark:text-white
              "
            >
              Cancel
            </button>

            <button
              onClick={handleCreateLecture}
              className="
                px-8 py-3
                rounded-xl
                bg-primary text-black
                dark:bg-surface dark:text-white
                hover:bg-green-800/50 hover:text-green-600
                transition
              "
            >
              Create Lecture
            </button>
          </div>

        </div>

        {/* ================= CREATED LECTURES ================= */}
        {lectures?.length > 0 && (
          <div className="mt-10">

            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
              Lectures
            </h3>

            <div className="space-y-3">
              {lectures.map((lecture, index) => (
                <div
                  key={`${lecture._id}-${index}`}
                  className="
                    flex items-center justify-between
                    px-4 py-3
                    rounded-xl
                    bg-primary dark:bg-surface
                    border border-white/10
                  "
                >
                  <div className="flex justify-center items-center gap-6">
                    <p className="text-xs font-medium text-black dark:text-white">
                      Lecture {index + 1}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      {lecture.lectureTitle}
                    </p>
                  </div>

                  <button
                    className="
                      flex items-center gap-2
                      text-sm font-medium
                      text-blue-600 dark:text-blue-400
                      hover:scale-105
                      transition
                    "
                    onClick={()=>navigate(`/edit-lecture/${lecture._id}`)}
                  >
                    <FaEdit />
                    Edit
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CreateLecture;
