import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ActivationPage,
  NotFoundPage,
  ProductPage,
  ProductDetailsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  AboutUs,
  CheckoutPage,
  OrderSuccessPage,
  ProfilePage,
  SellerRegisterPage,
  SellerActivationPage,
  SellerLoginPage,
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllDisountCodes,
  ShopAllOrders,
} from "./Routes/routes";
import { BASE_URL } from "./config";
import axios from "axios";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Routes/AppRoutes/AppProtectedRoutes/ProtectedRoutes";
import SellerProtectedRoute from "./Routes/SellerRoutes/SellerProtectedRoutes/SellerProtectedRoute";
import Loader from "./components/Layout/Loader";

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  // const navigate = useNavigate();
  useEffect(() => {
    // axios
    //   .get(`${BASE_URL}/user/getuser`, { withCredentials: true })
    //   .then((res) => {
    //     toast.success(res.data.message);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   });

    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    //
    // if (isSeller === true) {
    //   <Navigate to={`/shop`} replace />;
    // }
  }, []);

  // console.log(
  //   "isLoading:",
  //   isLoading,
  //   "isSeller:",
  //   isSeller,
  //   "seller: ",
  //   seller
  // );
  return (
    <>
      {isLoading || loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/order/success/:id" element={<OrderSuccessPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />

            {/* SHOP/SELLER ROUTES */}

            <Route path="/seller-register" element={<SellerRegisterPage />} />
            <Route path="/seller-login" element={<SellerLoginPage />} />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="dashboard-create-product"
              element={
                <SellerProtectedRoute>
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="dashboard-products"
              element={
                <SellerProtectedRoute>
                  <ShopAllProducts />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="dashboard-crate-event"
              element={
                <SellerProtectedRoute>
                  <ShopCreateEvent />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="dashboard-all-events"
              element={
                <SellerProtectedRoute>
                  <ShopAllEvents />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="dashboard-all-discount-codes"
              element={
                <SellerProtectedRoute>
                  <ShopAllDisountCodes />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="dashboard-orders"
              element={
                <SellerProtectedRoute>
                  <ShopAllOrders />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/shop/shop-activation/:activation_token"
              element={<SellerActivationPage />}
            />

            {/* NOT FPUND ROUTE */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
