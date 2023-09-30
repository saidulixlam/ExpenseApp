import { createSlice } from "@reduxjs/toolkit";

// In your authentication slice or a separate module
const token = localStorage.getItem('token');
const initialState = {
  token: token,
  isLoggedIn: !!token, // Set isLoggedIn based on the presence of a token
};



export const authSlice = createSlice({
    name: 'isAuthenticated',
    initialState: initialState,
    reducers: {
        login(state,action) {
            localStorage.setItem('token', action.payload);
            state.token =action.payload
            state.isLoggedIn=true;
        },
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('endpoint');
            state.token = null;
            state.isLoggedIn=false;
        },
         clearImageUrl(state) {
            state.imageUrl = ''; // Reset the imageUrl in the Redux state
        }
    }
})
export const authActions = authSlice.actions;
