import React, { useState } from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ProfileSidebar from "../../components/AppComponents/Profile/ProfileSidebar";
import styles from "../../styles/style";
import SalesInvoice from "../../components/AppComponents/Invoice/SalesInvoice";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const UserInvoicePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
        <div className="w-full min-h-[45vh] bg-white rounded self-center ">
          <SalesInvoice />
        </div>
      </div>
      <br /><br />
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default UserInvoicePage;
