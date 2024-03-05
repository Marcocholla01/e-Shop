import React from "react";
import OrderDetails from "../../components/seller/OrderDetails";
import DashboardHeader from "../../components/seller/DashboardHeader";
import Footer from "../../components/Layout/Footer";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
