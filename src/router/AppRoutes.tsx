import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoutes";

const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const ProductListingPage = lazy(() => import("../pages/private/Inventory"));
const HomePage = lazy(() => import("../pages/private/HomePage"));
const SingleProductDetails = lazy(() => import("../pages/private/ProductDetails"));
const MyCart = lazy(() => import("../pages/private/MyCart"));
const Checkout = lazy(() => import("../pages/private/Checkout"));
const Profile = lazy(() => import("../pages/private/Profile"));
const ReviewOrder = lazy(() => import("../pages/private/ReviewOrder"));

function AppRoutes() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute roles={["users"]}><Dashboard /></PrivateRoute>} >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="inventory" element={<ProductListingPage />} />
          <Route path="product-details" element={<SingleProductDetails />} />
          <Route path="my-cart" element={<MyCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="review" element={<ReviewOrder />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
