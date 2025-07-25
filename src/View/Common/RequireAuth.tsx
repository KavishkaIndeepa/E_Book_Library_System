import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";

interface RequireAuthProps {
  allowedRoles?: string[];
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Not logged in => redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    // Logged in but role not allowed => redirect to unauthorized or home
    return <Navigate to="/" replace />;
  }

  // Authenticated & authorized => render child routes
  return <Outlet />;
}
