import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoutes";

const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"))

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
