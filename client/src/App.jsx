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
  BestSellingPage,
  EventsPage,
  FAQPage,
} from "./Routes/routes";
import { BASE_URL } from "./config";
import axios from "axios";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

function App() {
  useEffect(() => {
    // axios
    //   .get(`${BASE_URL}/user/getuser`, { withCredentials: true })
    //   .then((res) => {
    //     toast.success(res.data.message);

    // })
    // .catch((error) => {
    //   toast.error(error.response.data.message);
    // });

    Store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

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
  );
}

export default App;
