// src/contexts/UserContext.js
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  });

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    console.log("User state has changed:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
