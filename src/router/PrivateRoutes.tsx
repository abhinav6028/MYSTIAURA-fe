import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles: string[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return <>{children}</>;
};

export default PrivateRoute;
