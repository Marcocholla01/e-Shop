import React from "react";
import Contact from "../../components/AppComponents/contact/Contact";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const ContactPage = () => {
  return (
    <>
      <Header />
      <Contact />
      <DownloadApp/>
      <Footer />
    </>
  );
};

export default ContactPage;
