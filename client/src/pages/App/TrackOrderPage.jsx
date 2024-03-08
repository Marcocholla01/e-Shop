import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import TrackOrder from "../../components/AppComponents/order/TrackOrder";

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <TrackOrder/>
      <Footer/>
    </div>
  );
};

export default TrackOrderPage;
