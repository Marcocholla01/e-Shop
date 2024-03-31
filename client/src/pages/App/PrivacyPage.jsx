import React from "react";
import Header from "../../components/Layout/Header";
import Privacy from "../../components/AppComponents/TermsAndPrivacy/Privacy";
import DownloadApp from "../../components/DownloadApp/DownloadApp";
import Footer from "../../components/Layout/Footer";

const PrivacyPage = () => {
  return (
    <div>
      <Header />
      <Privacy />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default PrivacyPage;
