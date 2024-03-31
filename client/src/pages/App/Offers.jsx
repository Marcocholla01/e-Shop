import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import OffersComponent from "../../components/AppComponents/Offers/OffersComponent";

const Offers = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <OffersComponent />
      <Footer />
    </div>
  );
};

export default Offers;
