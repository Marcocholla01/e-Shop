import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Payment from "../../components/Payment/Payment";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen ">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2}/>
      <Payment />
      <br />
      <br />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default PaymentPage;
