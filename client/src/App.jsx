import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./Routes/routes";
import { BASE_URL } from "./config";
import axios from "axios";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
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
  }, []);
  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/order/success/:id" element={<OrderSuccessPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
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
