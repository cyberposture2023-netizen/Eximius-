import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the user data exists in localStorage
  const user = JSON.parse(localStorage.getItem('eximiusUser'));

  // If a user exists, render the child component (the <Outlet />)
  // Otherwise, redirect them to the /login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
