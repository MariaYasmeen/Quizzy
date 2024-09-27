// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to save user details
  const saveUser = (userData) => {
    setUser(userData);
  };

  // Function to logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage if needed
    localStorage.removeItem('user');      // Remove user data from localStorage if needed
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
