import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserOrderDetails from "../../components/AppComponents/order/orderDetails";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const OrderDetailsPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
