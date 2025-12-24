import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
