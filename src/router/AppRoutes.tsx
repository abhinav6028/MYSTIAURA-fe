import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoutes";
import Products from "../pages/Admin/Products/Products";
import CreateProduct from "../pages/Admin/Products/CreateProduct";
import UsersTable from "../pages/Admin/Users/UsersTable";
import Orders from "../pages/Admin/Orders/Orders";
import CreateOrders from "../pages/Admin/Orders/CreateOrders";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import MyCart from "../pages/MyCart/MyCart";
import SelectAdress from "../pages/SelectAdress/SelectAdress";
import Payment from "../pages/Payment/Payment";
import ReviewOrder from "../pages/ReviewOrder/ReviewOrder";


const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const ProductListingPage = lazy(() => import("../pages/private/Inventory"));
const HomePage = lazy(() => import("../pages/private/HomePage"));

function AppRoutes() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* User Routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="inventory" element={<ProductListingPage />} />
          <Route path="productdetailPage" element={<ProductDetailPage />} />
          <Route path="mycart" element={<MyCart />} />
          <Route path="selectadress" element={<SelectAdress />} />
          <Route path="payment" element={<Payment />} />
          <Route path="revieworder" element={<ReviewOrder />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute roles={["admin"]}><Dashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<>ADMIN DASHBOARD</>} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="users/create" element={<>Create Users</>} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/create" element={<CreateOrders />} />
        </Route>

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
      </Routes>

    </Suspense>
  );
}

export default AppRoutes;
