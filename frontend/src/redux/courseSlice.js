import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  courseData: null,
   publishedCourseData:null
};

const courseSlice = createSlice({
  name: "course",
  initialState: initialValue,
  reducers: {
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    setPublishedCourseData: (state, action) => {
      state.publishedCourseData = action.payload;
    },
   
  },
});

export const { setCourseData, setPublishedCourseData} = courseSlice.actions;
export default courseSlice.reducer;
