import React, { useEffect, useState } from "react";
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
  EventDetailsPage,
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
  ShopPreviewPage,
  ShopDashboardPage,
  ShopCreateProduct,
  SellerEditProductPage,
  ShopAllProducts,
  ShopOrderDetails,
  ShopCreateEvent,
  ShopAllEvents,
  ShopAllDisountCodes,
  ShopAllOrders,
  OtpPage,
  PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
  ShopRefundPage,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopChangePasswordPage,
  PasswordResetPage,
  ResetPasswordPage,
  ShopInboxPage,
  ContactPage,
  SellerInvoicePage,
  SellerSalesPage,
  UserInvoicePage,
  SellerWithdrawalDetailsPage,
  SellerAllWithdrwalsHistory,
  Offers,
  TermsPage,
  PrivacyPage,
  CommingSoon,
  SellerEditEventPage,
  SellerEditDiscountCode,
} from "./Routes/routes";
import {
  AdminDashboardPage,
  AdminAllSellersPage,
  AdminAllUsersPage,
  AdminAllOrdersPage,
  AdminAllProductsPage,
  AdminAllEventsPage,
  AdminWithdrawPage,
  AdminSellersPage,
  AdminUsersPage,
  AdminActiveUsersPage,
  AdminInactiveUsersPage,
  AdminInactiveSellersPage,
  AdminActiveSellersPage,
  AdminAllOrderDetailsPage,
  AdminAllDiscountCodesPage,
  AdminAllRefundsPage,
  AdminInvoicePage,
  AdminAllSales,
  AdminWithdrwaldashboardPage,
  AdminIncompletedWithdrawals,
  AdminCompletedWithdrawals,
  AdminPaymentDetailsPage,
} from "./Routes/AdminRoutes/routes";
import { BASE_URL, backend_url } from "./config";
import axios from "axios";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Routes/AppRoutes/AppProtectedRoutes/ProtectedRoutes";
import SellerProtectedRoute from "./Routes/SellerRoutes/SellerProtectedRoutes/SellerProtectedRoute";
import Loader from "./components/Layout/Loader";
import AdminProtectedRoute from "./Routes/AdminRoutes/AdminProtectedRoutes";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  const [stripeApiKey, setStripeApiKey] = useState(``);

  async function getStripeApiKey() {
    try {
      const response = await axios.get(`${BASE_URL}/payment/stripeapikey`);
      const { data } = response;
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle error appropriately, e.g., logging or showing an error message.
      console.error("Error fetching Stripe API key:", error);
    }
  }

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
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();

    //
    // if (isSeller === true) {
    //   <Navigate to={`/shop`} replace />;
    // }
  }, []);

  // console.log(stripeApiKey);

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
        <Loader className=" " />
      ) : (
        <BrowserRouter>
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  }
                />

                {/* Define other routes here */}

                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/event/:id" element={<EventDetailsPage />} />
                <Route path="/best-selling" element={<BestSellingPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/verify-user" element={<OtpPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/comming-soon" element={<CommingSoon />} />
                <Route
                  path="/password/resset/:token"
                  element={<PasswordResetPage />}
                />
                <Route
                  path="/seller/password/resset/:token"
                  element={<ResetPasswordPage />}
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/order/:id"
                  element={
                    <OrderDetailsPage>
                      <CheckoutPage />
                    </OrderDetailsPage>
                  }
                />
                <Route
                  path="/order/success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccessPage />
                    </ProtectedRoute>
                  }
                />

                {/* <Route path="/order/success" element={<OrderSuccessPage />} /> */}

                <Route
                  path="/user/:id"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/invoice/:id"
                  element={
                    <ProtectedRoute>
                      <UserInvoicePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/track-order/:id"
                  element={
                    <ProtectedRoute>
                      <TrackOrderPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/user/user-activation/:activation_token"
                  element={<ActivationPage />}
                />
                {/* <Route
                  path="/user/:id/verify/:token"
                  element={<ActivationPage />}
                /> */}

                {/* SHOP/SELLER ROUTES */}

                <Route
                  path="/seller-register"
                  element={<SellerRegisterPage />}
                />
                <Route path="/seller-login" element={<SellerLoginPage />} />

                <Route
                  path="/shop/:id"
                  element={
                    <SellerProtectedRoute>
                      <ShopHomePage />
                    </SellerProtectedRoute>
                  }
                />
                <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
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
                  path="/dashboard-edit-product/:id"
                  element={
                    <SellerProtectedRoute>
                      <SellerEditProductPage />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard-edit-event/:id"
                  element={
                    <SellerProtectedRoute>
                      <SellerEditEventPage />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard-edit-discount-code/:id"
                  element={
                    <SellerProtectedRoute>
                      <SellerEditDiscountCode />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard-messages"
                  element={
                    <SellerProtectedRoute>
                      <ShopInboxPage />
                    </SellerProtectedRoute>
                  }
                />

                <Route
                  path="/shop/invoice/:id"
                  element={
                    <AdminProtectedRoute>
                      <SellerInvoicePage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard-shop-sales"
                  element={
                    <AdminProtectedRoute>
                      <SellerSalesPage />
                    </AdminProtectedRoute>
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
                  path="dashboard-refunds"
                  element={
                    <SellerProtectedRoute>
                      <ShopRefundPage />
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
                  path="dashboard-settings/:id"
                  element={
                    <SellerProtectedRoute>
                      <ShopSettingsPage />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="change-password/:id"
                  element={
                    <SellerProtectedRoute>
                      <ShopChangePasswordPage />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="dashboard-withdraw-money"
                  element={
                    <SellerProtectedRoute>
                      <ShopWithdrawMoneyPage />
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
                  path="/seller/withdrawal-details/:id"
                  element={
                    <SellerProtectedRoute>
                      <SellerWithdrawalDetailsPage />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="/dashbord-all-withdrawals/:id"
                  element={
                    <SellerProtectedRoute>
                      <SellerAllWithdrwalsHistory />
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
                  path="shop/order/:id"
                  element={
                    <SellerProtectedRoute>
                      <ShopOrderDetails />
                    </SellerProtectedRoute>
                  }
                />
                <Route
                  path="/shop/shop-activation/:activation_token"
                  element={<SellerActivationPage />}
                />

                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboardPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-sellers"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllSellersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-users"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllUsersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-orders"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllOrdersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-products"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllProductsPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-all-events"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllEventsPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-withdraw-request"
                  element={
                    <AdminProtectedRoute>
                      <AdminWithdrawPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-withdraw-request-dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminWithdrwaldashboardPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-incompleted-withdraw"
                  element={
                    <AdminProtectedRoute>
                      <AdminIncompletedWithdrawals />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-completed-withdraw"
                  element={
                    <AdminProtectedRoute>
                      <AdminCompletedWithdrawals />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/withdrawal-details/:id"
                  element={
                    <AdminProtectedRoute>
                      <AdminPaymentDetailsPage />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin-all-users"
                  element={
                    <AdminProtectedRoute>
                      <AdminUsersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-all-sellers"
                  element={
                    <AdminProtectedRoute>
                      <AdminSellersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-active-users"
                  element={
                    <AdminProtectedRoute>
                      <AdminActiveUsersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-inactive-users"
                  element={
                    <AdminProtectedRoute>
                      <AdminInactiveUsersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-inactive-sellers"
                  element={
                    <AdminProtectedRoute>
                      <AdminInactiveSellersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-active-sellers"
                  element={
                    <AdminProtectedRoute>
                      <AdminActiveSellersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/order/:id"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllOrderDetailsPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-all-discount-codes"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllDiscountCodesPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin-all-refunds"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllRefundsPage />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin/invoice/:id"
                  element={
                    <AdminProtectedRoute>
                      <AdminInvoicePage />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin-sales"
                  element={
                    <AdminProtectedRoute>
                      <AdminAllSales />
                    </AdminProtectedRoute>
                  }
                />

                {/* NotFound route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Elements>
          )}

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
