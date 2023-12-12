import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/style";

const ProfilePage = () => {
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}></div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProfilePage;
