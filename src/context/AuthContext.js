import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? jwtDecode(token) : null;
  });

  const login = (token) => {
    localStorage.setItem('authToken', token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
