import { createSlice } from '@reduxjs/toolkit';

const initialDarkModeState = {
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',

};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialDarkModeState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', state.isDarkMode);
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;