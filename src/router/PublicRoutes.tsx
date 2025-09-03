import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks"; // adjust import path

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />; // redirect logged-in users
  }

  return <>{children}</>;
};

export default PublicRoute;
