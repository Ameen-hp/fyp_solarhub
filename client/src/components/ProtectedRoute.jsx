import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Named import

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("No token found");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const role = decoded.role;

    console.log("Decoded Role:", role);

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      console.log("Role not allowed");
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.log("Error decoding token", error);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return <Navigate to="/login" replace />;
  }
}
