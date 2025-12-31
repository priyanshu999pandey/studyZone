import { createContext,useContext,useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourseData, setPublishedCourseData } from "../redux/courseSlice";

import axios from "axios";


const CourseContext = createContext(null);

export const useCourseContext = ()=> useContext(CourseContext);

const CourseProvider = ({children}) =>{
    const dispatch = useDispatch();

     const fetchCreatorCourse = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/course/getCreatorCourse`,
        { withCredentials: true }
      );
      //  console.log("course context",res.data);
       dispatch(setCourseData(res?.data?.data));
    } catch (error) {
       console.log("error : ",error)
    }
   };

     const fetchPublishedCourse = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/course/getPublishedCourse`,
        { withCredentials: true }
      );
       console.log("published data",res.data);
       dispatch(setPublishedCourseData(res?.data?.data));
    } catch (error) {
       console.log("error : ",error)
    }
   };


  // 🔥 app load par user fetch
  useEffect(() => {
    fetchCreatorCourse();
    fetchPublishedCourse();
  }, []); 

    return(
        <CourseContext.Provider value={ {
             fetchCreatorCourse,
             fetchPublishedCourse
        }  }>
          {children}
        </CourseContext.Provider>
    )
}

export default CourseProvider