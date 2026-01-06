import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  lectureData: null,
   
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState: initialValue,
  reducers: {
    setlectureData: (state, action) => {
      state.lectureData = action.payload;
    },
  },
});

export const { setlectureData } = lectureSlice.actions;
export default lectureSlice.reducer;
