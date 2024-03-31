import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import About from "../../components/AppComponents/AboutUs/About";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const AboutUs = () => {
  return (
    <div>
      <Header />
      <About />
      <DownloadApp/>
      <Footer />
    </div>
  );
};

export default AboutUs;
