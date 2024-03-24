// import { Slice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },

        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateUserStart: (state) => {
            state.loading = true
        },

        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;

            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = true;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = true;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = falssignOut
        }

    }

})


export const { signInFailure , signInStart , signInSuccess, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutUserFailure, signOutUserSuccess,signOutUserStart } = userSlice.actions;

export default userSlice.reducer;
