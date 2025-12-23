import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    userData:null,
}

const userSlice = createSlice({
    name:"user",
    initialState:initialValue,
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
    }

})

export const {setUserData} = userSlice.actions
export default userSlice.reducer