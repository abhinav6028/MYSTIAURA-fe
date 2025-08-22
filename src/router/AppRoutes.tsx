import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoutes";
import Products from "../pages/Admin/Products/Products";

const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const ProductListingPage = lazy(() => import("../pages/private/Inventory"));
const HomePage = lazy(() => import("../pages/private/HomePage"));

function AppRoutes() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute roles={["admin"]}><Dashboard /></PrivateRoute>} >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="inventory" element={<ProductListingPage />} />
          <Route path="admin/dashboard" element={<>ADMIN DASHBOARD</>} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<>ADMIN USERS</>} />
          <Route path="admin/orders" element={<>ADMIN ORDERS</>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
