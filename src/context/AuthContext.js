import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//   const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    }
  
    setLoading(false);
  }, []);
//   const Adminlogin = (token) => {
//     // Logic to set admin data after successful login
   
//     localStorage.setItem('adminToken', token);
//      // Set admin token in local storage
//   };

//   const Adminlogout = () => {
//     // Logic to clear admin data after logout
//     setAdmin(null);
//     localStorage.removeItem('adminToken'); // Remove admin token from local storage
//   };
  const login = (token) => {
    localStorage.setItem('authToken', token);
    const decodedUser = jwtDecode(token);
    
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
