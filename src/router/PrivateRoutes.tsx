import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // adjust import path

interface PrivateRouteProps {
  children?: React.ReactNode;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if roles are provided)
  if (roles && roles.length > 0 && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Support both <PrivateRoute><Page /></PrivateRoute> and nested <Outlet />
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
