import { Routes, Route } from "react-router-dom";
import Login from "../pages/public/Login";
import PublicRoute from "./PublicRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

      {/* Private Routes */}
      {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
    </Routes>
  );
}

export default AppRoutes;
