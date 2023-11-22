import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();

  return user ? (
    element
  ) : (
    <Navigate to="/Login" replace state={{ from: '/userdashboard' }} />
  );
};

export default PrivateRoute;