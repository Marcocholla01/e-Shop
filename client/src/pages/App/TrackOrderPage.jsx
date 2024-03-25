import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import TrackOrder from "../../components/AppComponents/order/TrackOrder";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <TrackOrder/>
      <DownloadApp/>
      <Footer/>
    </div>
  );
};

export default TrackOrderPage;
