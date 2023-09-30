import { createSlice } from '@reduxjs/toolkit';

const initialDarkModeState = {
  isDarkMode: false, // Initial dark mode state
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialDarkModeState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;