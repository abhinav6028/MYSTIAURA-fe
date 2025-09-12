import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // adjust import path

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }else if(user?.role === "user"){
      return <Navigate to="/user/home" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
