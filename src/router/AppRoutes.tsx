import { Routes, Route, useLocation } from "react-router-dom";
import PublicRoute from "./PublicRoutes";
import { lazy, Suspense, useEffect } from "react";
import PrivateRoute from "./PrivateRoutes";
import Products from "../pages/Admin/Products/Products";
// import CreateProduct from "../pages/Admin/Products/CreateProduct";
import UsersTable from "../pages/Admin/Users/UsersTable";
import Orders from "../pages/Admin/Orders/Orders";
import CreateOrders from "../pages/Admin/Orders/CreateOrders";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SelectAdress from "../pages/SelectAdress/SelectAdress";
import Payment from "../pages/Payment/Payment";
import WishList from "../pages/WishList/WishList";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import DashBoard from "../pages/DashBoard/DashBoard";
import MyOrders from "../pages/OrderHistory/OrderHistory";
import MyProfile from "../pages/MyProfile/MyProfile";

import Loading from "../components/loading";
import LoginSuccess from "../pages/LoginSuccess/LoginSuccess";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndCondition from "../pages/TermsAndCondition/TermsAndCondition";
import RefundPolicy from "../pages/RefundPolicy/RefundPolicy";

const Login = lazy(() => import("../pages/public/Login"));
const Register = lazy(() => import("../pages/public/Register"));
const Dashboard = lazy(() => import("../pages/private/Dashboard"));
const ProductListingPage = lazy(() => import("../pages/private/Inventory"));
const HomePage = lazy(() => import("../pages/private/HomePage"));
const MyCart = lazy(() => import("../pages/private/MyCart"));
const ReviewOrder = lazy(() => import("../pages/private/ReviewOrder"));
const CreateNewProducts = lazy(() => import("../pages/Admin/Products/CreateNewProduct"));
const Category = lazy(() => import("../pages/Admin/category/Category"));
const CategoryForm = lazy(() => import("../pages/Admin/category/CategoryForm"));
const CreateUser = lazy(() => import("../pages/Admin/Users/CreateUser"));

function AppRoutes() {

  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login/:id" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/privacy-policy" element={<PublicRoute><PrivacyPolicy /></PublicRoute>} />
        <Route path="/terms-condition" element={<PublicRoute><TermsAndCondition /></PublicRoute>} />
        <Route path="/login-success" element={<PublicRoute><LoginSuccess /></PublicRoute>} />
        <Route path="/refund-policy" element={<PublicRoute><RefundPolicy /></PublicRoute>} />
        {/* RefundPolicy */}

        <Route path="/" element={<PublicRoute><Dashboard /></PublicRoute>} >
          <Route index path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="inventory" element={<ProductListingPage />} />
          <Route path="inventory/:categoryname" element={<ProductListingPage />} />
          <Route path="productdetailPage/:id" element={<ProductDetailPage />} />
          <Route path="payment" element={<Payment />} />
          <Route path="revieworder" element={<ReviewOrder />} />
          <Route path="inventory/:id" element={<ProductListingPage />} />

          <Route path="mycart" element={<MyCart />} />
          <Route path="wishlist" element={<WishList />} />

          <Route path="selectadress" element={<SelectAdress showItems={true} />} />
          <Route path="selectadress/:id" element={<SelectAdress showItems={true} />} />
          {/* <Route path="selectadress" element={<SelectAdress />} /> */}
          <Route path="payment" element={<Payment />} />
          <Route path="revieworder" element={<ReviewOrder />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myprofile" element={<MyProfile />} />

        </Route >

        {/* Private Routes */}
        <Route path="/user" element={<PrivateRoute roles={["user"]}><Dashboard /></PrivateRoute>} >
          {/* User Routes */}
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="inventory" element={<ProductListingPage />} />
          <Route path="inventory/:categoryname" element={<ProductListingPage />} />
          <Route path="productdetailPage/:id" element={<ProductDetailPage />} />
          <Route path="categories/:id" element={<CategoryPage />} />

          <Route path="mycart" element={<MyCart />} />
          <Route path="wishlist" element={<WishList />} />

          <Route path="selectadress" element={<SelectAdress showItems={true} />} />
          <Route path="selectadress/:id" element={<SelectAdress showItems={true} />} />
          {/* <Route path="selectadress" element={<SelectAdress />} /> */}
          <Route path="payment" element={<Payment />} />
          <Route path="revieworder" element={<ReviewOrder />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myprofile" element={<MyProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute roles={["admin"]}><Dashboard /></PrivateRoute>}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="category" element={<Category />} />
          <Route path="category/create" element={<CategoryForm />} />
          <Route path="category/:id" element={<CategoryForm />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<CreateNewProducts />} />
          <Route path="products/:id" element={<CreateNewProducts />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/update" element={<CreateUser />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/create" element={<CreateOrders />} />
          <Route path="orders/:id" element={<CreateOrders />} />
          <Route path="categories/:id" element={<CategoryPage />} />
        </Route>

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
      </Routes>

    </Suspense>
  );
}

export default AppRoutes;
