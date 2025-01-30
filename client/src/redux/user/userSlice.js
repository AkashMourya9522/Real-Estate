import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false,
            state.error = null,
            state.currentUser = action.payload
        },
        signInFailure:(state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        updateUserStart:(state,action)=>{
            state.loading = true;
        },
        updateUserFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        updateUserSuccess:(state,action)=>{
            state.loading = false;
            state.error = null
            state.currentUser = action.payload
        }
        
    }
})

export const {signInFailure,signInStart,signInSuccess, updateUserSuccess, updateUserFailure, updateUserStart} = userSlice.actions

export default userSlice.reducer