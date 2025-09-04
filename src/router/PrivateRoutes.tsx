import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // adjust import path

interface PrivateRouteProps {
  children?: React.ReactNode;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // 🔹 Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Admin shortcut → redirect only if not already at /admin/*
  if (user?.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 🔹 Role check (if roles are provided)
  if (roles && roles.length > 0 && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🔹 Support both <PrivateRoute><Page /></PrivateRoute> and nested <Outlet />
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
