import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import styles from "../styles/style";
import ProfileSidebar from "../components/Profile/ProfileSidebar";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10 bg-[#f5f5f5]`}>
        <ProfileSidebar active={active} setActive={setActive} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProfilePage;
