import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access dark mode state

const Layout = ({ children }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state

  return (
    <div className={`rounded vh-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {/* Add Bootstrap classes and dark mode styles here */}
      {children}
    </div>
  );
};

export default Layout;
